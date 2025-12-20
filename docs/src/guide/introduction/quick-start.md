# 快速开始指南

本指南将帮助您快速了解项目并开始开发。

## 环境准备

### 1. 安装 Node.js 和 pnpm

```bash
# 确保 Node.js >= 20.12.0
node --version

# 安装 pnpm
npm i -g corepack
corepack enable
```

### 2. 克隆项目

```bash
git clone https://github.com/xjxl520303/vben-business-components.git
cd vben-business-components
```

### 3. 安装依赖

```bash
pnpm install
```

## 项目设置

### 1. 配置 Git Remote

添加官方仓库为 upstream，以便后续同步更新：

```bash
# 添加 upstream
git remote add upstream https://github.com/vbenjs/vue-vben-admin.git

# 验证配置
git remote -v
# 应该看到：
# origin    https://github.com/your-org/vben-business-components.git (你的仓库)
# upstream  https://github.com/vbenjs/vue-vben-admin.git (官方仓库)
```

### 2. 检查同步状态

```bash
# 检查与官方仓库的同步状态
pnpm tsx scripts/check-sync-status.ts
```

## 开发工作流

### 启动开发服务器

```bash
# Element Plus 演示应用（主要开发目标）
pnpm dev:ele

# 文档站点
pnpm dev:docs
```

访问：
- 演示应用：http://localhost:5173
- 文档站点：http://localhost:5174

### 创建新组件

1. **创建组件目录**
   ```bash
   mkdir -p packages/effects/common-ui/src/components/vben-example
   cd packages/effects/common-ui/src/components/vben-example
   ```

2. **使用模板创建组件**
   ```bash
   # 复制组件模板
   cp ../../../../../../scripts/templates/component-template.vue vben-example.vue
   
   # 复制演示配置模板
   cp ../../../../../../scripts/templates/component-demo.config.ts demo.config.ts
   
   # 创建导出文件
   echo "export { default as VbenExample } from './vben-example.vue';" > index.ts
   ```

3. **创建演示页面**
   ```bash
   mkdir -p apps/web-ele/src/views/demos/components/vben-example
   # 创建演示页面文件
   ```

4. **创建文档**
   ```bash
   cp scripts/templates/component-doc.md docs/src/components/common-ui/vben-example.md
   ```

5. **更新路由**
   手动更新 `apps/web-ele/src/router/routes/modules/demos.ts`，添加新组件的路由。

### 运行测试

```bash
# 类型检查
pnpm check:type

# 代码检查
pnpm lint

# 单元测试
pnpm test:unit
```

## 同步官方更新

### 检查同步状态

```bash
pnpm tsx scripts/check-sync-status.ts
```

### 执行同步

```bash
# 同步 main 分支
./scripts/sync-upstream.sh

# 同步指定分支
./scripts/sync-upstream.sh v5.5.9
```

### 处理冲突

如果同步时出现冲突：

1. 查看冲突文件：
   ```bash
   git status
   ```

2. 解决冲突：
   - 核心功能冲突：优先保留官方版本
   - 业务组件冲突：优先保留我们的定制版本
   - 配置冲突：手动合并

3. 完成合并：
   ```bash
   git add <resolved-files>
   git commit
   ```

## 下一步

### 1. 阅读详细文档

- [项目规划文档](./PLAN.md) - 了解完整的项目规划和实施计划
- [贡献指南](./CONTRIBUTING.md) - 了解如何贡献代码

### 2. 探索现有组件

查看 `packages/effects/common-ui/src/components/` 目录下的现有组件，了解组件开发模式。

### 3. 查看演示示例

访问演示应用，查看现有组件的演示和文档。

### 4. 开始开发

选择一个需要开发的组件，按照开发流程开始工作。

## 常用命令

```bash
# 开发
pnpm dev:ele          # 启动 Element Plus 演示应用
pnpm dev:docs         # 启动文档站点

# 构建
pnpm build:ele        # 构建 Element Plus 应用
pnpm build:docs       # 构建文档站点

# 检查
pnpm check:type       # 类型检查
pnpm lint             # 代码检查
pnpm test:unit        # 单元测试

# 同步
pnpm tsx scripts/check-sync-status.ts  # 检查同步状态
./scripts/sync-upstream.sh            # 同步官方代码
```

---

祝您开发愉快！🎉
