---
outline: deep
---

# Vben BusPageHeader 页面头部

BusPageHeader 组件用于提供一个带有【返回】按钮和页面标题或者选项卡（默认为**申请信息**和**流程图**两个选项卡）的详情页面头部（Header）的功能。

::: info 说明

- 组件的诞生背景是企业管理系统中各种需要走流程的功能的**创建**，**编辑**和**详情**页面。
- 这里所谓的**流程**是指在管理系统中一些功能的创建和编辑是需要别人进行**审批**、**复核**、**处理**等操作，然后流转到下一个节点。一个流程可以发起多笔，经过多个部门和人员的处理后到**完结**才算成功，当然也可以被**退回**或者**撤回**。
- 组件会用在后续的组件 BusPage（待开发） 中。

:::

组件提供了两种显示方式（以采购系统中供应商入库申请为例）：

- **返回按钮 + 页面标题**：适用于无流程的预先通过后端导入的**编辑**与**查看**页面。
- **返回按钮 + 选项卡**：适用于有流程的供应商**申请**、**草稿编辑**和**详情**页面。

## 基础用法

<preview path="@/demos/bus-page-header/basic/index.vue" />

## 高级用法

默认情况下通过组件提供的插槽 `extra` 来添加表单的【保存】或【提交】以及其它按钮，但是针对默认提供的选项卡功能在实际交互中有一个明显的不合理地方：如果切换到**流程图**选项卡后，点击【提交】按钮，此时如果未通过表单验证还需要切换回**申请信息**选项卡。

针对这一场景，可以使用 portal-vue 来实现针对每一个选项卡插入不同的内容。这里我们可以保留原有的 `extral` 插槽，用于支持原有的功能，然后通过在默认插槽获取到 `uid`，并通过指定 portal-target 的目标位置 `${uid}-${tab}-extral` 来动态插入内容到指定的选项卡。

::: info 说明

- `extral` 插槽内容和 portal-vue 指定的内容是共存的，可以通过 portal-vue 的 `order` 属性来指定顺序（默认 `extral` 插入的内容 `order` 为 `5`）
- `${uid}-${tab}-extral` 模板字符串中的 `tab` 为选项卡的 `value` 值。

:::

<preview path="@/demos/bus-page-header/portal/index.vue" />

## 自定义选项卡

组件提供了 `tabConfig` 属性来覆盖默认的选项卡配置；当然如果只是第一个选项卡的名称不一样，可以直接设置 `firstLabelText` 来调整。

<preview path="@/demos/bus-page-header/custom/index.vue" />

## 选项卡切换事件

考虑到选项卡在切换时重新渲染表单的场景，在点击选项卡时我们需要立即反馈给用户（比如显示一个加载状态），组件提供了两个函数 `beforeChange` 和 `afterChange` 来允许用户注入显示加载指示器，前者异步函数需要返回 `true` 继续执行，后者只需要调用来执行关闭加载操作即可。

<preview path="@/demos/bus-page-header/loading/index.vue" />

## 页面回退（返回）说明

组件提供了一个 `back` 事件来处理返回的逻辑。这里可以根据实际需求将 Vue Router 相关功能直接集成在组件内部：通过查询参数 `backPath` 或浏览器历史来返回到上一个页面，通过查询参数 `backName` 在微前端架构下回到指定应用的页面中。

## API

::: info 说明

以下内容均由 AI 根据组件实现代码和上面的文档内容生成。

:::

```vue
<template>
  <BusPageHeader
    :title="title"
    :first-tab-label="firstTabLabel"
    :default-tab="defaultTab"
    :tab-config="tabConfig"
    :before-change="beforeChange"
    :after-change="afterChange"
    @tab-change="handleTabChange"
    @back="handleBack"
  >
    <template #extra>
      <!-- 额外内容 -->
    </template>
    <template #default="{ uid }">
      <!-- 使用 portal-vue 动态插入内容 -->
      <Portal :to="`${uid}-${tab}-extra`">
        <!-- 内容 -->
      </Portal>
    </template>
  </BusPageHeader>
</template>
```

### Props

| 属性名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 页面标题 | `string` | - |
| firstTabLabel | 第一个选项卡的标签文本 | `string` | `'申请信息'` |
| defaultTab | 默认选中的选项卡的值 | `string` | `'0'` |
| tabConfig | 选项卡列表 | `BusPageHeaderTab[]` | `[{ label: '申请信息', value: '0' }, { label: '流程图', value: '1' }]` |
| beforeChange | 选项卡改变前的拦截函数 | `(value: string) => Promise<boolean>` | - |
| afterChange | 选项卡改变后的拦截函数 | `(value: string) => Promise<void> \| void` | - |

::: info 说明

- 如果提供了 `title` 属性，则显示**返回按钮 + 页面标题**模式
- 如果没有提供 `title` 属性，则显示**返回按钮 + 选项卡**模式
- `beforeChange` 返回 `false` 可以阻止选项卡切换
- `afterChange` 支持同步和异步函数

:::

### Events

| 事件名 | 描述 | 参数 |
| --- | --- | --- |
| tabChange | 选项卡改变时触发 | `(value: string) => void` |
| back | 返回按钮点击时触发 | `() => void` |

### Slots

| 插槽名 | 描述 | 参数 |
| --- | --- | --- |
| extra | 右侧额外内容区域 | - |
| default | 默认插槽，用于 portal-vue 动态插入内容 | `{ uid: string }` |

::: info 说明

- `extra` 插槽：当提供了 `title` 时，直接渲染插槽内容；当使用选项卡模式时，通过 portal-vue 自动插入到 `${uid}-${activeTab}-extra` 目标位置
- `default` 插槽：提供 `uid` 参数，用于通过 portal-vue 动态插入内容到指定选项卡的额外区域
- Portal 目标位置格式：`${uid}-${tab}-extra`，其中 `tab` 为选项卡的 `value` 值
- 可以通过 portal-vue 的 `order` 属性来控制渲染顺序（`extra` 插槽默认 `order` 为 `5`）

:::

### Portal

通过组件提供的 Portal 传送目标位置，可以灵活地为每个选项卡设置不同的额外内容。

| 目标位置 | 描述 | 支持多个来源 | 参数 |
| --- | --- | --- | --- |
| `${uid}-${tab}-extra` | 用于指定特定选项卡的额外内容 | 是 | - |

::: info 说明

- `${uid}` 为组件实例的唯一标识符，通过默认插槽的 `uid` 参数获取
- `${tab}` 为选项卡的 `value` 值（如 `'0'`、`'1'` 等）
- 可以通过 `order` 属性来控制多个来源的渲染顺序

:::

## 类型说明

::: details 显示类型声明

```ts
/* eslint-disable perfectionist/sort-interfaces */

/**
 * 选项卡配置
 */
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
```

:::

