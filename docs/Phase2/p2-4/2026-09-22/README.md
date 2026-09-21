# P2-4：回归与部署验收

日期：2026-09-22。自动化与文档交付已完成；本提交准备发布，线上结果与实机验收仍待记录，不将 P2-4 标为全部完成。

## 本地结果

| 检查 | 结果 |
| --- | --- |
| `npm run check` | Lint、13 项单元测试、生产构建通过 |
| 完整 `npm run test:e2e` | 132 项通过、12 项按既有条件跳过、0 失败 |
| Kaiwu 跨引擎新增流程 | 桌面／手机 Chromium、Firefox、桌面／手机 WebKit 均达到 ready，并通过中文、键盘进入和退出导航 |
| 静态托管 | 根路径、`/Vite-Homepage-24/`、实际 Pages `/Vite-Homepage/` 共 27 项路由通过 |
| 旧域名清理 | 所有静态检查页面均无旧域名及其子域链接 |
| 依赖审计 | 0 漏洞；Three.js 仍固定 `0.147.0` |

12 项跳过为移动项目重复的 11 个尺寸矩阵用例及鼠标 hover 用例；尺寸矩阵已在桌面测试项目显式设置视口执行。未更新或放宽原视觉截图基线，Windows Chromium 原首页／Works／Projects 截图检查通过。

证据：[完整浏览器结果](browser-tests.json)、[静态检查](static-host.json)、[依赖审计](dependency-audit.json)。

## 发布准备

核实远端规范仓库已为 `Pannic17/Vite-Homepage`，当前线上地址为 `https://pannic17.github.io/Vite-Homepage/`，旧 remote URL 由 GitHub 重定向。既有 Pages 工作流使用 configure-pages 的实际 base path，最近已发布提交为 `64a8983`。

本步更新 README 的线上地址与 Kaiwu 维护说明，新增 [Phase 2 发布与回滚说明](../../deployment.md)，并把实际发布前缀纳入静态检查。发布必须使用当前源码重新构建的 artifact；线上完成状态以 Actions 和浏览器验收证据为准。

首次发布提交 `cf29a7e` 的 [Pages 运行](https://github.com/Pannic17/Vite-Homepage/actions/runs/35624395208) 未部署：Linux CI 中 124 项通过、18 项跳过、2 项失败。两个失败均为三轮 Kaiwu 生命周期组合用例超出默认 30 秒总时限，分别停在后台观察等待和恢复前台等待；没有资源清理断言失败。将该组合用例总预算设为 120 秒，保留每次模型 ready 的 30 秒限制和全部清理／暂停断言，随后重新验证。Linux 另跳过 6 项 Windows 专属像素截图，故跳过总数为 18。

## 实机验收矩阵

| 环境 | 状态 | 剩余动作 |
| --- | --- | --- |
| Windows 上 Playwright Chromium／Firefox／WebKit | 已通过自动化 | 本地引擎模拟结果，不代表以下真机 |
| iPhone／iPad Safari | 未执行，无可控制的真机 | 检查首次加载、旋转缩放、横竖屏、后台恢复、退出重入、中英与失败重试 |
| Android Chrome | 未执行，无可控制的真机 | 检查模型／纹理、触控、内存压力、后台恢复、退出重入 |

## 已知限制

默认模型资源请求仍约 19 MB；高级后处理、非零 HDR 旋转和旧查看器效果对照仍未完成。旧 dist 的少量跟踪项未作为本次发布输入。未通过的实机或效果项继续保留为待验收，不以本地或线上冒烟代替。
