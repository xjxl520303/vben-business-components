/* eslint-disable perfectionist/sort-interfaces */
export interface BusGroupProps {
  /**
   * 分组标题
   *
   * @description 分组的标题文本
   */
  title?: string;

  /**
   * 分组描述信息
   *
   * @description 分组的描述信息
   */
  description?: string;

  /**
   * 是否默认折叠分组
   *
   * @description 是否默认折叠分组
   * @defaultValue `false`
   */
  defaultFolded?: boolean;
}
