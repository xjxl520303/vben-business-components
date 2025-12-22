/* eslint-disable unicorn/no-nested-ternary */
import type { TemplatePromiseProps } from '@vueuse/core';

import type { BusDialogProps, BusDialogResult } from './types';

import { createTemplatePromise } from '@vueuse/core';
import { ElButton, ElDialog } from 'element-plus';
import { PortalTarget, Wormhole } from 'portal-vue';
import { ulid } from 'ulid';

export function useBusDialog() {
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
      Wormhole.close({
        to: 'bus-dialog',
        from: sender,
      });
      originalResolve(value);
    };

    const wrappedReject = (value?: any) => {
      Wormhole.close({
        to: 'bus-dialog',
        from: sender,
      });
      originalReject(value);
    };

    return { wrappedResolve, wrappedReject };
  };

  const BusDialog = () => (
    <InnerDialog>
      {{
        default: (
          slotProps: TemplatePromiseProps<BusDialogResult, [BusDialogProps]>,
        ) => {
          const { resolve, reject, isResolving, args } = slotProps;
          const { wrappedResolve, wrappedReject } = createCloseHandler(
            resolve,
            reject,
          );
          // 默认对话框底部操作按钮
          const actions = args[0]?.actions || ['cancel', 'ok'];
          // 是否通过 portal-vue 指定对话框头部内容
          const isUsePortalHeader =
            Wormhole.getContentForTarget(`${sender}-bus-dialog-header`).length >
            0;
          // 是否通过 portal-vue 指定对话框底部内容
          const isUsePortalFooter =
            Wormhole.getContentForTarget(`${sender}-bus-dialog-footer`).length >
            0;

          return (
            <ElDialog
              beforeClose={async (done) => {
                if (!isResolving) {
                  if (args[0]?.beforeClose) {
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

                      const result = await args[0]?.beforeClose(
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
              {{
                ...(args[0]?.renderHeader
                  ? {
                      header: args[0]?.renderHeader(
                        wrappedResolve,
                        wrappedReject,
                      ),
                    }
                  : isUsePortalHeader
                    ? {
                        header: (
                          <PortalTarget
                            multiple={true}
                            name={`${sender}-bus-dialog-header`}
                            slotProps={{
                              resolve: wrappedResolve,
                              reject: wrappedReject,
                              args,
                            }}
                          />
                        ),
                      }
                    : null),
                default: () => {
                  if (args[0]?.render) {
                    return args[0]?.render(wrappedResolve, wrappedReject);
                  }

                  if (args[0]?.content) {
                    return <div>{args[0]?.content}</div>;
                  }

                  return (
                    <PortalTarget
                      multiple={true}
                      name={`${sender}-bus-dialog-content`}
                      slotProps={{
                        resolve: wrappedResolve,
                        reject: wrappedReject,
                        args,
                      }}
                    ></PortalTarget>
                  );
                },
                footer: () => {
                  const result = [];
                  if (args[0]?.renderFooter) {
                    return args[0]?.renderFooter(wrappedResolve, wrappedReject);
                  } else if (isUsePortalFooter) {
                    return (
                      <PortalTarget
                        multiple={true}
                        name={`${sender}-bus-dialog-footer`}
                        slotProps={{
                          resolve: wrappedResolve,
                          reject: wrappedReject,
                          args,
                        }}
                      />
                    );
                  } else {
                    if (actions.includes('cancel')) {
                      result.push(
                        <ElButton
                          onClick={() =>
                            args[0]?.cancelHandler
                              ? args[0]?.cancelHandler(
                                  wrappedResolve,
                                  wrappedReject,
                                )
                              : wrappedReject({ reason: 'cancel' })
                          }
                        >
                          {args[0]?.cancelText || '取消'}
                        </ElButton>,
                      );
                    }

                    if (actions.includes('ok')) {
                      result.push(
                        <ElButton
                          onClick={() =>
                            args[0]?.okHandler
                              ? args[0]?.okHandler(
                                  wrappedResolve,
                                  wrappedReject,
                                )
                              : wrappedResolve({ reason: 'ok' })
                          }
                          type="primary"
                        >
                          {args[0]?.okText || '确定'}
                        </ElButton>,
                      );
                    }
                  }

                  return result;
                },
              }}
            </ElDialog>
          );
        },
      }}
    </InnerDialog>
  );

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
        to: 'bus-dialog',
        from: sender,
        content: BusDialog as any,
      });

      return await InnerDialog.start(args);
    },
  };
}
