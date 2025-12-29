/* eslint-disable perfectionist/sort-interfaces */

export interface BusStepsOption {
  /** 标签 */
  label: string;
  /** 值 */
  value: number;
  /**
   * 步骤状态
   *
   * @defaultValue `''`
   * @description 步骤状态，可选值为 `''`、`finish`、`process`、`wait`
   *
   * - `''`：未开始
   * - `finish`：已完成
   * - `process`：进行中
   * - `wait`：未开始
   */
  status?: '' | 'finish' | 'process' | 'wait';
}

export interface BusStepsProps {
  /**
   * 步骤选项
   *
   * @description 步骤选项，用于配置步骤的标签和值
   * @defaultValue `[]`
   */
  options: BusStepsOption[];
  /**
   * 步骤项最小间距
   *
   * @defaultValue `16`
   */
  space?: number;
}
