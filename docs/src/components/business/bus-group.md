---
outline: deep
---

# Vben BusGroup 表单内容分组

BusGroup 组件用于在表单中对字段进行分组显示，可以将相关的表单字段组织在一起，提供更好的视觉层次和用户体验。

::: info 说明

- 组件主要用于表单场景，将相关的表单字段组织在一起
- 默认支持折叠/展开功能，通过点击左侧的图标可以折叠或展开分组内容
- 支持通过 `description` 属性或 `desc` 插槽显示描述信息
- 支持通过 `extra` 插槽在分组头部添加额外内容（如操作按钮）
- 主题样式请根据实际情况进行调整

:::

## 基础用法

最简单的使用方式就是设置 `title` 属性来显示分组标题，使用 `description` 来设置描述内容。

<preview path="@/demos/bus-group/basic/index.vue" />

## 默认折叠

通过设置 `defaultFolded` 属性为 `true`，可以让分组默认处于折叠状态。

<preview path="@/demos/bus-group/default-folded/index.vue" />

## API

::: info 说明

以下内容均由 AI 根据组件实现代码和上面的文档内容生成。

:::

```vue
<template>
  <BusGroup
    :title="title"
    :description="description"
    :default-folded="defaultFolded"
  >
    <template #desc>
      <!-- 自定义描述内容 -->
    </template>
    <template #extra>
      <!-- 额外内容 -->
    </template>
    <!-- 分组内容 -->
  </BusGroup>
</template>
```

### Props

| 属性名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 分组标题 | `string` | - |
| description | 分组描述信息 | `string` | - |
| defaultFolded | 是否默认折叠分组 | `boolean` | `false` |

### Slots

| 插槽名 | 描述 | 作用域参数 |
| --- | --- | --- |
| default | 分组内容 | - |
| desc | 自定义描述内容（会覆盖 `description` 属性） | - |
| extra | 分组头部右侧额外内容 | - |

## 类型定义

::: details 显示类型声明

```ts
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
```

:::
