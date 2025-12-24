/* eslint-disable perfectionist/sort-interfaces */
export interface BusPageHeaderTab {
  /** 选项卡标题 */
  label: string;
  /** 选项卡值 */
  value: string;
}

export interface BusPageHeaderProps {
  /**
   * 页面标题
   *
   * @description 如果没有提供 `title` 属性，则以默认选项卡的方式显示
   */
  title?: string;

  /**
   * 第一个选项卡的标签文本
   */
  firstTabLabel?: string;

  /**
   * 默认选中的选项卡的值
   *
   * @description 默认选中第一个选项卡（申请信息）
   * @defaultValue `'0'`
   */
  defaultTab?: string;

  /**
   * 选项卡列表
   *
   * @description 如果没有提供 `title` 属性，则显示选项卡
   * @defaultValue `[
   *   {
   *     label: '申请信息',
   *     value: '0',
   *   },
   *   {
   *     label: '流程图',
   *     value: '1',
   *   },
   * ]
   */
  tabConfig?: BusPageHeaderTab[];

  /**
   * 选项卡改变前的拦截函数
   *
   * @param value 选项卡值
   * @returns 返回 `false` 阻止改变，返回 `true` 允许改变
   */
  beforeChange?: (value: string) => Promise<boolean>;

  /**
   * 选项卡改变后的拦截函数
   *
   * @param value 选项卡值
   */
  afterChange?: (value: string) => Promise<void> | void;
}
