# Phase 2 发布与验收

保持现有 GitHub Actions／GitHub Pages 发布流程。当前远端规范仓库为 `Pannic17/Vite-Homepage`，线上前缀为 `/Vite-Homepage/`；本地默认仍为 `/Vite-Homepage-24/`。`pages.yml` 从 configure-pages 输出读取实际前缀，在 master 推送后执行 `npm ci`、配置 Pages 前缀、生产构建并发布。完整回归保留在手动触发的 `Verify site`，与部署独立，不阻塞上线。安装或生产构建失败仍会停止发布。

## 发布前

1. 使用 `.node-version` 中的 Node 版本、`npm ci` 安装锁定依赖；Three.js 仍为 `0.147.0`。
2. 使用实际部署前缀执行生产构建；按需运行现有检查，不新增完整测试门禁。
3. 核对主要路由、详情跳转、默认模型和刷新；完整回归及真机未验证项记录为后续项。
4. 提交源代码、资源、测试和交付文档。每步交付执行英文 Git commit；发布步骤单独记录对应源码 SHA 和 Actions URL。

`npm run build` 会写入 dist。仓库仍有少量历史 dist 跟踪项，因此本地验收使用 `.check-dist.local/`；发布以 CI 从源码重新构建的 artifact 为准，不手动混入旧产物。

## 发布后检查

- `/`、`/about/`、`/works/`、`/projects/` 和 `/works/gcs/` 原有导航及资源可用。
- `/projects/kaiwu/`、`/projects/kaiwu/viewer/` 直接访问和刷新返回有效页面，无脚本／模型／纹理 404。
- 身份介绍、品牌入口、“查看详情”和 Viewer 标签均为站内链接，无 `kaiwuart.cn` 入口。
- `/kaiwu/default.json` 及引用资源可加载，默认模型实际可见。
- 配置页不加载模型／HDR；查看器退出后无残留 canvas。
- 中文／英文切换、错误提示和“返回项目”正常。

线上可用 `node scripts/verify-kaiwu-live.mjs` 执行已有的轻量验收；可选第一个参数指定站点 URL，第二个指定证据输出目录。

实际执行结果记录在 [P2-4 验收报告](p2-4/2026-09-22/README.md)。缺少设备或发布验证时保留未完成状态。

## 回滚

对造成问题的提交使用 `git revert`，经同一验证流程后发布。P2-3 源码检查点为 `e9bd627`；若故障源于本次验收变更，可作为排查参照，但它同样需要 CI 构建验证。不要覆盖共享历史或直接使用旧 dist。回滚后再次验证上述深链接与默认模型。
