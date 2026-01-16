/* eslint-disable n/no-unsupported-features/es-syntax */
/* eslint-disable unicorn/no-nested-ternary */
import type { TemplatePromiseProps } from '@vueuse/core';

import type { BusDialogProps, BusDialogResult } from './types';

import { ref } from 'vue';

import { createTemplatePromise } from '@vueuse/core';
import { ElButton, ElDialog } from 'element-plus';
import { PortalTarget, Wormhole } from 'portal-vue';
import { ulid } from 'ulid';

type PromiseState = 'fulfilled' | 'pending' | 'rejected';

/**
 * 获取 Promise 状态
 * @param p Promise 对象
 * @returns Promise 状态
 */
async function getPromiseState(p: Promise<unknown>): Promise<PromiseState> {
  return await Promise.race([
    Promise.resolve(p).then(
      (): PromiseState => 'fulfilled',
      (): PromiseState => 'rejected',
    ),
    Promise.resolve().then((): PromiseState => 'pending'),
  ]);
}

/**
 * `ELDialog` 封装
 * @param keepInstance 是否保持实例（不销毁 `ElDialog` 组件，可以多次打开同一个对话框）
 * @param targetName `ElDialog` 组件放置位置 `portal-vue` 目标名称，默认为 `bus-dialog`
 */
export function useBusDialog(keepInstance = false, targetName = 'bus-dialog') {
  /** 对话框是否可见 */
  const visible = ref(false);
  /** 对话框参数 */
  const instanceArgs = ref<BusDialogProps | undefined>(undefined);

  let {
    promise,
    resolve: instanceResolve,
    reject: instanceReject,
  } = Promise.withResolvers<BusDialogResult | undefined>();

  const sender = ulid();
  const InnerDialog = createTemplatePromise<
    BusDialogResult,
    [BusDialogProps?]
  >();

  // 包装 resolve 和 reject，确保关闭 portal
  const createCloseHandler = (
    originalResolve: (v: BusDialogResult | Promise<BusDialogResult>) => void,
    originalReject: (value?: any) => void,
  ) => {
    const wrappedResolve = (
      value: BusDialogResult | Promise<BusDialogResult>,
    ) => {
      !keepInstance &&
        Wormhole.close({
          to: targetName,
          from: sender,
        });
      originalResolve(value);
    };

    const wrappedReject = (value?: any) => {
      !keepInstance &&
        Wormhole.close({
          to: targetName,
          from: sender,
        });
      originalReject(value);
    };

    return { wrappedResolve, wrappedReject };
  };

  // 对话框公共属性
  const setCommonProps = (props: BusDialogProps | undefined) => {
    return {
      closable: false,
      maskClosable: false,
      destroyOnClose: !keepInstance, // 当关闭 Dialog 时，销毁其中的元素
      closeOnClickModal: false,
      appendToBody: true,
      title: props?.title || '提示',
      width: props?.width || 400,
      ...props?.dialogConfig,
    };
  };

  // 创建 beforeClose 处理器
  const createBeforeCloseHandler = (
    beforeClose: BusDialogProps['beforeClose'],
    wrappedResolve: (value: BusDialogResult | Promise<BusDialogResult>) => void,
    wrappedReject: (value?: any) => void,
    done: () => void,
  ) => {
    return async () => {
      if (beforeClose) {
        try {
          // 使用标志跟踪是否手动调用了 resolve/reject
          let isManuallyClosed = false;

          // 包装 resolve 和 reject，设置标志
          const beforeCloseResolve = (
            value: BusDialogResult | Promise<BusDialogResult>,
          ) => {
            isManuallyClosed = true;
            wrappedResolve(value);
            done();
          };

          const beforeCloseReject = () => {
            isManuallyClosed = true;
          };

          const result = await beforeClose(
            beforeCloseResolve,
            beforeCloseReject,
          );

          // 如果手动调用了 resolve/reject，不再执行后续逻辑
          if (isManuallyClosed) return;

          // 如果返回 false，阻止关闭
          if (result === false) return;
        } catch {
          return;
        }
      }
      // 默认关闭流程
      wrappedReject({ reason: 'close' });
      done();
    };
  };

  // 插槽公共逻辑
  const setSlotCommonLogic = (
    props: BusDialogProps | undefined,
    resolve: (value: BusDialogResult | Promise<BusDialogResult>) => void,
    reject: (value?: any) => void,
  ) => {
    // 动态检查 portal 内容
    const isUsePortalHeader =
      Wormhole.getContentForTarget(`${sender}-bus-dialog-header`).length > 0;
    const isUsePortalFooter =
      Wormhole.getContentForTarget(`${sender}-bus-dialog-footer`).length > 0;

    return {
      ...(props?.renderHeader
        ? {
            header: props.renderHeader(resolve, reject),
          }
        : isUsePortalHeader
          ? {
              header: (
                <PortalTarget
                  multiple={true}
                  name={`${sender}-bus-dialog-header`}
                  slotProps={{
                    resolve,
                    reject,
                    props,
                  }}
                />
              ),
            }
          : null),
      default: () => {
        if (props?.render) {
          return props.render(resolve, reject);
        }

        if (props?.content) {
          return <div>{props.content}</div>;
        }

        return (
          <PortalTarget
            multiple={true}
            name={`${sender}-bus-dialog-content`}
            slotProps={{
              resolve,
              reject,
              props,
            }}
          ></PortalTarget>
        );
      },
      footer: () => {
        const result = [];
        // 默认对话框底部操作按钮
        const actions = props?.actions || ['cancel', 'ok'];
        if (props?.renderFooter) {
          return props.renderFooter(resolve, reject);
        } else if (isUsePortalFooter) {
          return (
            <PortalTarget
              multiple={true}
              name={`${sender}-bus-dialog-footer`}
              slotProps={{
                resolve,
                reject,
                props,
              }}
            />
          );
        } else {
          if (actions?.includes('cancel')) {
            result.push(
              <ElButton
                onClick={() =>
                  props?.cancelHandler
                    ? props?.cancelHandler(resolve, reject)
                    : reject({ reason: 'cancel' })
                }
              >
                {props?.cancelText || '取消'}
              </ElButton>,
            );
          }

          if (actions?.includes('ok')) {
            result.push(
              <ElButton
                onClick={() =>
                  props?.okHandler
                    ? props?.okHandler(resolve, reject)
                    : resolve({ reason: 'ok' })
                }
                type="primary"
              >
                {props?.okText || '确定'}
              </ElButton>,
            );
          }
        }

        return result;
      },
    };
  };

  const BusDialog = () => {
    if (keepInstance) {
      const resolve = (value: BusDialogResult | Promise<BusDialogResult>) => {
        visible.value = false;
        instanceResolve(value);
        // 重置 promise 为 pending 状态，以便下次打开时使用
        const newPromise = Promise.withResolvers<BusDialogResult | undefined>();
        promise = newPromise.promise;
        instanceResolve = newPromise.resolve;
        instanceReject = newPromise.reject;
      };
      const reject = async (value?: any) => {
        visible.value = false;
        instanceReject(value);
        // 重置 promise 为 pending 状态，以便下次打开时使用
        const newPromise = Promise.withResolvers<BusDialogResult | undefined>();
        promise = newPromise.promise;
        instanceResolve = newPromise.resolve;
        instanceReject = newPromise.reject;
      };
      const { wrappedResolve, wrappedReject } = createCloseHandler(
        resolve,
        reject,
      );
      return (
        <ElDialog
          beforeClose={async (done) => {
            if ((await getPromiseState(promise)) === 'pending') {
              await createBeforeCloseHandler(
                instanceArgs.value?.beforeClose,
                wrappedResolve,
                wrappedReject,
                done,
              )();
            }
          }}
          v-model={visible.value}
          {...setCommonProps(instanceArgs.value)}
        >
          {setSlotCommonLogic(
            instanceArgs.value,
            wrappedResolve,
            wrappedReject,
          )}
        </ElDialog>
      );
    } else {
      return (
        <InnerDialog>
          {{
            default: (
              slotProps: TemplatePromiseProps<
                BusDialogResult,
                [BusDialogProps]
              >,
            ) => {
              const { resolve, reject, isResolving, args } = slotProps;
              const { wrappedResolve, wrappedReject } = createCloseHandler(
                resolve,
                reject,
              );

              return (
                <ElDialog
                  beforeClose={async (done) => {
                    if (!isResolving) {
                      await createBeforeCloseHandler(
                        args[0]?.beforeClose,
                        wrappedResolve,
                        wrappedReject,
                        done,
                      )();
                    }
                  }}
                  modelValue={true}
                  {...{
                    closable: false,
                    maskClosable: false,
                    destroyOnClose: true,
                    closeOnClickModal: false,
                    appendToBody: true,
                    title: args[0]?.title || '提示',
                    width: args[0]?.width || 400,
                    ...args[0]?.dialogConfig,
                  }}
                >
                  {setSlotCommonLogic(
                    args[0] as BusDialogProps,
                    wrappedResolve,
                    wrappedReject,
                  )}
                </ElDialog>
              );
            },
          }}
        </InnerDialog>
      );
    }
  };

  return {
    /**
     * 组件唯一标识符，用于 portal-vue 指定内容
     */
    dialogUid: sender,

    /**
     * 对话框头部 portal-vue 目标名称，用于指定对话框头部内容
     */
    headerPortalName: `${sender}-bus-dialog-header`,

    /**
     * 对话框主体 portal-vue 目标名称，用于指定对话框主体内容
     */
    contentPortalName: `${sender}-bus-dialog-content`,

    /**
     * 对话框底部 portal-vue 目标名称，用于指定对话框底部内容
     */
    footerPortalName: `${sender}-bus-dialog-footer`,

    /**
     * 【打开】对话框
     */
    openDialog: async (args?: BusDialogProps) => {
      Wormhole.open({
        to: targetName,
        from: sender,
        content: BusDialog as any,
      });

      if (!keepInstance) {
        return await InnerDialog.start(args);
      }

      instanceArgs.value = args;
      visible.value = true;
      return promise;
    },
  };
}
