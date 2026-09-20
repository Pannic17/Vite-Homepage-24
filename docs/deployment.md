# GitHub Pages 构建与发布

站点：https://pannic17.github.io/Vite-Homepage-24/

2026-09-21 已将仓库 Pages 设置从 gh-pages 分支发布切换为 GitHub Actions（build_type: workflow），记录见 [设置核对](phase5/2026-09-21/pages-settings.json)。既有站点 HTTP 200。工作流尚未提交或推送，远端首次构建和发布尚未验证。

## 自动构建

将本轮源代码和 .github/workflows/pages.yml 提交并推送到 master 后，每次 master 推送自动触发 Build and publish Pages，也支持 Actions 页面手动运行。

工作流依次安装锁定依赖、执行 lint／单元测试／检查构建、依赖审计、三引擎端到端测试、静态路径检查，再重新构建 dist 并上传 Pages artifact。只有 build 成功才运行 deploy。发布权限仅给 deploy 作业：pages: write、id-token: write，环境为 github-pages。默认 GITHUB_TOKEN 即可，不需要新增个人令牌。

Vite 的项目路径为 /Vite-Homepage-24/。静态路由入口随构建生成，测试覆盖根路径与项目子路径，以及详情直达、刷新和不存在的路径。修改仓库名或自定义域名时应同步调整 base 并复测。

独立 Verify site 工作流覆盖 Windows/Linux × Node 22.19/24.19，并上传 site-preview-{sha} 供下载核对；浏览器检查报告保留 14 天。Pages 作业自身执行发布所需检查，不依赖另一个工作流的完成顺序。

## 预览与上线核对

本地运行 npm run check，再运行 npm run preview -- --outDir .check-dist.local。人工核对首页原构图、Works/Projects 的原版 hover、语言切换对齐，以及触屏操作。真机未验证项见 [设备矩阵](phase5/2026-09-21/device-matrix.md)。

首次推送后，在仓库 Actions 确认 Build and publish Pages 的 build/deploy 均成功，访问站点与 /works/gcs/ 深链接，确认资源无 404。当前没有远端成功运行记录，不能将本地通过等同线上通过。

## 回滚

推荐对引入问题的提交执行 git revert，推送 master，让同一流程重新验证并发布。保留回滚提交以便追踪。

紧急情况下，旧 gh-pages 分支仍保留：可在仓库 Settings → Pages 将来源切回 Deploy from a branch，选择 gh-pages 与根目录。该分支代表旧版，不保证包含本轮修复；恢复自动发布时再切回 GitHub Actions 并重新运行工作流。

本地重构前快照为 codex/phase-5-checkpoint；它不是本轮交付版本。

## 已知限制

旧 dist 仍有 Git 跟踪记录。解除跟踪操作被自动审批拒绝，仅返回 blocked by policy，未给出详细原因，因此未重试或绕过。CI 总是从源码清理并重新生成发布目录，不将旧 dist 作为发布输入。后续应解除旧构建产物跟踪。

配置依据：[GitHub Pages 自定义工作流文档](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。
