# CLAUDE.md

此文件为 Claude Code (claude.ai/code) 在处理本仓库代码时提供指导。您需要使用英文编写文本。

## 关键开发命令
- 构建：`npm run build`
- 启动：`npm start`

## 架构
- 使用 `express` 进行路由（参见 `src/server.ts`）
- 使用 `esbuild` 进行 CLI 分发打包
- 插件从 `$HOME/.ktai-router/plugins` 加载
