<div align="center">
  <a href="https://github.com/anncwb/vue-vben-admin">
    <img alt="VbenAdmin Logo" width="215" src="https://unpkg.com/@vbenjs/static-source@0.1.7/source/logo-v1.webp">
  </a>
  <br>
  <br>

[![license](https://img.shields.io/github/license/anncwb/vue-vben-admin.svg)](LICENSE)

  <h1>Vben Admin Components</h1>
</div>

## 📖 项目介绍

> **⚠️ 项目迁移通知**  
> 本项目已迁移至 [https://github.com/xjxl520303/element-plus-lab](https://github.com/xjxl520303/element-plus-lab)，后续更新将在新仓库进行。本仓库将仅作历史保留，建议访问新仓库获取最新版本。

Vben Business Components 是在 [vue-vben-admin](https://github.com/vbenjs/vue-vben-admin) 的基础上添加了管理系统中一些常用的业务组件，专注于 **Element Plus** UI 框架的常用业务组件开发与分享。

本项目的初衷在于分享在企业管理系统中积累的一些基于 Element Plus 的业务公共组件，以及公司基于 Element plus 二次开发添加的额外基础组件，除此之外也分享基于 portal-vue 的开发模式探索。

项目中并未用到 Vben Admin 提供的通用组件，但是借鉴了其中部分组件的实现思路并与原来在公司内部的实现版本进行了优化。项目提供的组件可能会和 Vben Admin 提供的通用组件存在功能相似但是实现方式及 API 有所差异，但二者并不冲突。

项目中不会去罗列一些其他 Admin 项目演示的各种第三方库提供的功能，只根据实际业务组件的封装需求才会提及相关库。

项目目前还在不断迭代完善中，内容会经常变动，所以仅作参考。

## 🧩 已实现组件列表

目前项目已实现部分业务通用组件，后续将持续补充更多组件。组件列表如下：

| 组件名称     | 说明                         | 使用基础库      | 适用场景               |
| ------------ | ---------------------------- | --------------- | ---------------------- |
| [BusDialog](/packages/business/src/bus-dialog/use-bus-dialog.tsx) | ElDialog 对话框封装 | Vueuse/portal-vue | 通用性强 & 使用简单 & 功能强大，可作为其他对话框场景二次封装的底层组件 |
| [BusGroup](/packages/business/src/bus-group/index.vue) | 表单内容分组组件 | - | 用于在表单中对字段进行分组显示，支持折叠/展开功能，提供清晰的视觉层次和用户体验 |
| [BusPageHeader](/packages/business/src/bus-page-header/index.vue) | 页面头部组件 | portal-vue | 适用于企业管理系统中需要走流程的功能的创建、编辑和详情页面，提供返回按钮、页面标题或选项卡功能 |
| [BusSteps](/packages/business/src/bus-steps/index.vue) | 步骤条组件 | - | 用于显示步骤流程，引导用户按照步骤完成操作 |

更多组件开发中，敬请期待！如有建议欢迎提交 issue 或 PR 共同完善。

## 🚀 快速开始

### 环境要求

- Node.js >= 20.12.0
- pnpm >= 10.0.0

### 安装

```bash
# 克隆项目
git clone https://github.com/xjxl520303/vben-business-components.git
cd vben-business-components

# 安装依赖
npm i -g corepack
corepack enable
pnpm install
```

### 开发

```bash
# 启动 Element Plus 演示应用
pnpm dev:ele

# 启动文档站点
pnpm dev:docs
```

### 构建

```bash
# 构建 Element Plus 应用
pnpm build:ele

# 构建文档站点
pnpm build:docs
```

## 📁 项目结构

```
vben-business-components/
├── apps/
│   ├── web-ele/              # Element Plus 演示应用（主要）
│   ├── backend-mock/         # Mock 服务
│   └── docs/                 # 文档站点
├── packages/
│   ├── business/             # 业务组件
│   └── ...
```

<!-- ## 📦 组件列表 -->

## 🤝 贡献

我们欢迎所有形式的贡献！

- 🐛 报告 Bug
- 💡 提出新功能建议
- 📝 改进文档
- 🔧 提交 Pull Request

## 📄 许可证

本项目采用 [MIT](./LICENSE) 许可证。

## 🙏 致谢

- [vue-vben-admin](https://github.com/vbenjs/vue-vben-admin) - A modern vue admin panel built with Vue3, Shadcn UI, Vite, TypeScript, and Monorepo. It's fast! 
- [Element Plus](https://element-plus.org/) - A Vue.js 3 UI library
- [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) - A utility-first CSS framework for rapid UI development. 
- [portal-vue](https://github.com/LinusBorg/portal-vue) - A Portal Component for Vue 3, to render DOM outside of a component, anywhere in the document.
- [Vueuse](https://github.com/vueuse/vueuse) - Collection of essential Vue Composition Utilities for Vue 3 
- [Mockoon](https://github.com/mockoon/mockoon) - Mockoon is the easiest and quickest way to run mock APIs locally. No remote deployment, no account required, open source. 

## 📞 联系方式

- GitHub Issues: [提交问题](https://github.com/xjxl520303/vben-business-components/issues)
- Discussions: [参与讨论](https://github.com/xjxl520303/vben-business-components/discussions)

---

<div align="center">
  <p>如果这个项目对你有帮助，请给一个 ⭐️ Star</p>
</div>
