/* eslint-disable perfectionist/sort-interfaces */
import type { JSX } from 'vue/jsx-runtime';

import type { ExtractPropTypes, VNodeChild } from 'vue';

import { dialogProps } from 'element-plus';

/**
 * 对话框关闭原因
 *
 * @description 对话框关闭原因可用于判断是否正常关闭和取消关闭
 *
 * - `cancel`：取消关闭
 * - `close`：点击关闭按钮关闭
 * - `ok`：确认关闭
 */
export type BusDialogCloseReason = 'cancel' | 'close' | 'ok';

export interface BusDialogProps {
  /**
   * 对话框标题
   *
   * @defaultValue `'提示'`
   */
  title?: string;

  /**
   * 对话框宽度
   *
   * @defaultValue `400`
   */
  width?: number;

  /**
   * `<el-dialog>` 的属性
   */
  dialogConfig?: Partial<ExtractPropTypes<typeof dialogProps>>;

  /**
   * 对话框底部按钮配置
   *
   * @defaultValue `['cancel', 'ok']`
   * @description 按钮配置决定了对话框底部按钮的显示顺序和内容
   *
   * - `cancel`：取消按钮
   * - `ok`：确认按钮
   */
  actions?: Array<'cancel' | 'ok'>;

  /**
   * 【确定】按钮的文本
   *
   * @defaultValue `确定`
   */
  okText?: string;

  /**
   * 【取消】按钮的文本
   *
   * @defaultValue `取消`
   */
  cancelText?: string;

  /**
   * 对话框主体内容
   *
   * @description 适用于作为提示框，显示简单的文本
   */
  content?: string;

  /**
   * 渲染对话框头部
   *
   * @description 渲染对话框头部，用于自定义对话框头部内容
   * @remarks 优先级高于使用 portal-vue 指定的内容 `${uid}-bus-dialog-header`
   *
   * @param resolve 成功关闭对话框方法（`resolve({ reason: 'ok', data: '...'})`）
   * @param reject 取消关闭对话框方法（`reject({ reason: 'cancel', data: '...'})`）
   * @returns 对话框头部内容
   */
  renderHeader?: (
    resolve: (v: BusDialogResult | Promise<BusDialogResult>) => void,
    reject: (value?: any) => void,
  ) => JSX.Element | string | VNodeChild;

  /**
   * 渲染对话框主体内容
   *
   * @description 渲染对话框主体内容，用于自定义对话框主体内容
   * @remarks 优先级高于使用 portal-vue 指定的内容 `${uid}-bus-dialog-content`
   *
   * @param resolve 成功关闭对话框方法（`resolve({ reason: 'ok', data: '...'})`）
   * @param reject 取消关闭对话框方法（`reject({ reason: 'cancel', data: '...'})`）
   * @returns 对话框主体内容
   */
  render?: (
    resolve: (v: BusDialogResult | Promise<BusDialogResult>) => void,
    reject: (value?: any) => void,
  ) => JSX.Element | string | VNodeChild;

  /**
   * 渲染对话框底部
   *
   * @description 渲染对话框底部，用于自定义对话框底部内容
   * @remarks 优先级高于使用 portal-vue 指定的内容 `${uid}-bus-dialog-footer`
   *
   * @param resolve 成功关闭对话框方法（`resolve({ reason: 'ok', data: '...'})`）
   * @param reject 取消关闭对话框方法（`reject({ reason: 'cancel', data: '...'})`）
   * @returns 对话框底部内容
   */
  renderFooter?: (
    resolve: (v: BusDialogResult | Promise<BusDialogResult>) => void,
    reject: (value?: any) => void,
  ) => JSX.Element | string | VNodeChild;

  /**
   * 对话框关闭前的拦截函数
   *
   * @param resolve 成功关闭对话框方法（`resolve({ reason: 'ok', data: '...'})`）
   * @param reject 取消关闭对话框方法（`reject({ reason: 'cancel', data: '...'})`）
   * @returns 返回 `false` 阻止关闭，返回 `true`、`undefined` 或 `Promise<void>` 允许关闭。也可以通过 `resolve`/`reject` 手动控制关闭
   */
  beforeClose?: (
    resolve: (v: BusDialogResult) => void,
    reject: (v: BusDialogResult) => void,
  ) => boolean | Promise<boolean | undefined> | Promise<void> | undefined;

  /**
   * 【确认】按钮的回调函数
   *
   * @param resolve 成功关闭对话框方法（`resolve({ reason: 'ok', data: '...'})`）
   * @param reject 取消关闭对话框方法（`reject({ reason: 'cancel', data: '...'})`）
   */
  okHandler?: (
    resolve: (v: BusDialogResult) => void,
    reject: (v: BusDialogResult) => void,
  ) => Promise<void> | void;

  /**
   * 【取消】按钮的回调函数
   *
   * @param resolve 成功关闭对话框方法（`resolve({ reason: 'ok', data: '...'})`）
   * @param reject 取消关闭对话框方法（`reject({ reason: 'cancel', data: '...'})`）
   */
  cancelHandler?: (
    resolve: (v: BusDialogResult) => void,
    reject: (v: BusDialogResult) => void,
  ) => Promise<void> | void;
}

/**
 * 对话框关闭原因及传递的参数
 *
 * @description 对话框关闭原因及传递的参数，用于在对话框关闭时传递参数
 *
 * - `data`：对话框关闭时传递的参数
 * - `reason`：关闭原因
 */
export interface BusDialogResult {
  /**
   * 对话框关闭时传递的参数
   */
  data?: any;

  /**
   * 关闭原因
   */
  reason: BusDialogCloseReason;
}
