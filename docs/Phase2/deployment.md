# Phase 2 发布与验收

保持现有 GitHub Actions／GitHub Pages 发布流程。当前远端规范仓库为 `Pannic17/Vite-Homepage`，线上前缀为 `/Vite-Homepage/`；本地默认仍为 `/Vite-Homepage-24/`。`pages.yml` 从 configure-pages 输出读取实际前缀，在 master 推送后执行检查、审计、浏览器测试和静态部署验证，再重新构建并发布。静态检查覆盖根路径、旧默认前缀和实际线上前缀。

## 发布前

1. 使用 `.node-version` 中的 Node 版本、`npm ci` 安装锁定依赖；Three.js 仍为 `0.147.0`。
2. 执行 `npm run check`、`npm run test:e2e`、`npm run test:static` 和 `npm audit --audit-level=high`。
3. 核对默认模型、三种输入、两种语言、键盘操作和错误恢复。记录跳过项与真实设备未验证项，不能将浏览器模拟等同真机。
4. 提交源代码、资源、测试和交付文档。每步交付执行英文 Git commit；发布步骤单独记录对应源码 SHA 和 Actions URL。

`npm run build` 会写入 dist。仓库仍有少量历史 dist 跟踪项，因此本地验收使用 `.check-dist.local/`；发布以 CI 从源码重新构建的 artifact 为准，不手动混入旧产物。

## 发布后检查

- `/`、`/about/`、`/works/`、`/projects/` 和 `/works/gcs/` 原有导航及资源可用。
- `/projects/kaiwu/`、`/projects/kaiwu/viewer/` 直接访问和刷新返回有效页面，无脚本／模型／纹理 404。
- 身份介绍、品牌入口、“查看详情”和 Viewer 标签均为站内链接，无 `kaiwuart.cn` 入口。
- `/kaiwu/default.json` 及引用资源可加载，默认模型实际可见。
- 配置页不加载模型／HDR；查看器退出后无残留 canvas。
- 中文／英文切换、错误提示和“返回项目”正常。

实际执行结果记录在 [P2-4 验收报告](p2-4/2026-09-22/README.md)。缺少设备或发布验证时保留未完成状态。

## 回滚

对造成问题的提交使用 `git revert`，经同一验证流程后发布。P2-3 源码检查点为 `e9bd627`；若故障源于本次验收变更，可作为排查参照，但它同样需要 CI 构建验证。不要覆盖共享历史或直接使用旧 dist。回滚后再次验证上述深链接与默认模型。
