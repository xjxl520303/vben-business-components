# 关于 Vben Admin Components

Vben Admin Components 是基于 [Vben Admin](https://github.com/vbenjs/vue-vben-admin) `5.5.9` 版本进行二次开发，用于分享基于 Element Plus 的管理系统中组件封装思路和案例。

::: info 说明

虽然当前项目是基于 Element Plus 进行业务组件的封装，但是开发思路可以借鉴到其他 UI 框架中。

:::

::: warning 注意

- 本项目并没有去同步后续**通用组件**的变更内容，因为并未使用这些组件。

:::

## 项目特色

- 以 Vben Admin 项目为基石，仅添加一个包和相关文档
- 分享在企业管理系统开发过程中业务组件封装经验，供学习和交流
- 介绍基于 portal-vue 的开发模式

## 项目的改动点

- 删除了目录 `apps/` 中除 Element Plus 外的其他 UI 组件库。
- `docs/` 中删除了与当前项目无关的说明文档。
- 替换原项目中有关贡献者相关的信息。

## 如何应用到原有的 Vben Admin 项目或其他项目中

所有业务组件库的代码放置在 `packages/business` 目录中，文档位于 `docs/src/components/business` 目录中，只需要复制到 Vben Admin 项目中并安装相关依赖即可。

对于非 Vben Admin 的项目，需要注意代码中依赖的 TypeScript 类型，如果对应项目中没有则需要自行拷贝。
