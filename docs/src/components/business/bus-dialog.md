---
outline: deep
---

# Bus Dialog 业务对话框

业务对话框组件，基于 `portal-vue` 和 `ulid` 实现的业务级对话框组件。

> 如果文档内没有参数说明，可以尝试在在线示例内寻找

::: info 写在前面

如果你觉得现有组件的封装不够理想，或者不完全符合你的需求，大可以直接使用原生组件，亦或亲手封装一个适合的组件。框架提供的组件并非束缚，使用与否，完全取决于你的需求与自由。

:::

::: tip README

下方示例代码中的，存在一些国际化、主题色未适配问题，这些问题只在文档内会出现，实际使用并不会有这些问题，可忽略，不必纠结。

:::

## 基础用法

使用 `BusDialog` 创建最基础的业务对话框。

```vue
<template>
  <BusDialog v-model="visible" title="业务对话框">
    <p>这是对话框内容</p>
  </BusDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { BusDialog } from '@vben/business';

const visible = ref(false);
</script>
```

<preview path="@/demos/bus-dialog/ContainerTsxPreview.tsx" />

## API

### Props

| 属性名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 对话框显示状态 | `boolean` | `false` |
| title | 对话框标题 | `string` | - |
| width | 对话框宽度 | `string \| number` | `50%` |
| closeOnClickModal | 点击遮罩关闭对话框 | `boolean` | `true` |
| closeOnPressEscape | 按 ESC 关闭对话框 | `boolean` | `true` |
| showClose | 显示关闭按钮 | `boolean` | `true` |
| appendToBody | 是否挂载到 body | `boolean` | `true` |
| destroyOnClose | 关闭时销毁内容 | `boolean` | `false` |
| zIndex | 对话框层级 | `number` | `2000` |

### Events

| 事件名 | 描述 | 类型 |
| --- | --- | --- |
| update:modelValue | 对话框显示状态变化时触发 | `(value: boolean) => void` |
| open | 对话框打开时触发 | `() => void` |
| opened | 对话框打开动画结束后触发 | `() => void` |
| close | 对话框关闭时触发 | `() => void` |
| closed | 对话框关闭动画结束后触发 | `() => void` |

### Slots

| 插槽名 | 描述 |
| --- | --- |
| default | 对话框内容 |
| header | 自定义头部内容 |
| footer | 自定义底部内容 |
| title | 自定义标题内容 |
