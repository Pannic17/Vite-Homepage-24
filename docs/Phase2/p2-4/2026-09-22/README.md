# P2-4：回归与部署验收

日期：2026-09-22。按用户最新要求以上线为目标：生产构建和线上关键流程为 P2-4 交付门槛；完整回归与真机验收保留为后续项，不阻塞发布。

## 本次发布修复

最新失败运行 [35652515566](https://github.com/Pannic17/Vite-Homepage/actions/runs/35652515566) 对应 `fa828c9`。`npm ci`、`npm run check`（含构建）和审计均成功，完整 E2E 为 123 通过、18 跳过、5 失败，因此后续正式构建和部署被跳过。

- 桌面／移动 Chromium 生命周期用例：示例已改为 `debug=1`，调试 GUI 的 `.listen()` 保持 18 个 RAF，旧用例仍要求全页面 RAF 为 0。
- 桌面／移动 Chromium 触控尺寸用例：视觉更新后部分链接高度为 25.1875px，低于旧 44px 断言。
- Firefox 回退路径：导航和错误提示同时存在“模型配置”链接，未限定范围的定位器触发 strict mode violation。

上述问题没有被标记为测试通过。Pages 流程移除完整测试与审计门禁，仅保留依赖安装、实际 base 的生产构建、artifact 上传和部署；完整检查保留在手动 `Verify site` 中。没有改动现有视觉和入口设计，没有新增测试用例。

使用 Node 24.19.0、`/Vite-Homepage/` 前缀本地构建成功，Three.js 依赖树只有 `0.147.0`。已有线上验收脚本同步到当前调试查看器入口，并等待退出导航完成再检查 canvas。该脚本对本地产物的 7 条路由、详情跳转、调试 GUI、模型加载、刷新、中英切换、退出和默认配置检查通过。线上发布结果在完成后补录。

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
