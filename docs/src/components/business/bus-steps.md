---
outline: deep
---

# Vben BusSteps 步骤条

这是一个轻量级的步骤条组件，用于展示一个任务的进度。主要适用于表格穿梭框组件 `<bus-table-transfer>`（待开发） 或者树型穿梭框组件 `<bus-tree-transfer>`（待开发） 配合使用。如果有复杂的需求请考虑使用基础组件库的 `<el-steps>` 组件进行调整。

## 基础用法

默认情况下步骤条不会占据任何宽度，只设置了最小分隔线宽度（通过 `space` 属性设置），因此需要手动设置宽度来占据可用空间。

<preview path="@/demos/bus-steps/basic/index.vue" />

## 步骤跳转

组件没有提供【上一步】和【下一步】的方法来切换步骤，如果需要实现该功能，可参考下面示例的 2 种方式：

<preview path="@/demos/bus-steps/more/index.vue" />

## Props

| 属性名  | 描述           | 类型     | 默认值 |
| ------- | -------------- | -------- | ------ |
| v-model | 控制显示第几步 | `number` | `1`    |
| space   | 步骤项最小间距 | `number` | `16`   |
| options | 步骤条配置信息 | `Object` | `[]`   |

## Exposes

| 名称    | 说明         | 类型       |
| ------- | ------------ | ---------- |
| setStep | 设置当前步骤 | `Function` |


## 类型定义

::: details 显示类型声明

```ts
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
```

:::

