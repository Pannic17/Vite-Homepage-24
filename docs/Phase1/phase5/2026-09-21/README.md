# 阶段 5：回归、工具与交付

2026-09-21 已完成本地工程与自动化部分。保留原首页构图、作品／项目 hover、语言栏对齐；键盘焦点使用轻量下划线，不恢复全包边框。

## 已交付

- ESLint 与 npm run check；npm/package-lock 作为唯一依赖安装入口，固定推荐 Node 24.19.0。
- Chromium 全量回归、Firefox/WebKit 核心路径，6 张 Windows 英文像素基线。
- URL 基路径单元测试、图片回退、语言持久化、键盘和减少运动回归。
- 隔离源码副本的全新安装／构建／开发模式验证脚本。
- Windows/Linux CI、构建预览 artifact、master 推送自动构建和发布 Pages 工作流。
- Pages 远端已切换 GitHub Actions 来源；工作流尚未推送，尚未触发新版部署。
- 清理无用音频实例与 shader 导入，不改变原有效果。

## 验证结果

| 检查 | 结果 | 记录 |
| --- | --- | --- |
| lint／单元测试／构建 | 通过，10 项单元测试 | clean-check.log |
| 五个浏览器项目 | 109 通过，12 条件跳过 | tests-all-engines.json |
| 静态部署路径 | 14 通过 | static-host.json |
| 全新安装与开发模式 | 全部 exit 0 | clean-install.json、clean-install.log、clean-development.log |
| 依赖审计 | 0 漏洞 | audit.json |
| 浏览器版本与旧站点 | 三引擎版本、HTTP 200 | environment.json |
| Pages 设置切换 | workflow 模式 | pages-settings.json |

像素基线位于 tests/e2e/visual.spec.js-snapshots。产品字体未改变；English／Arial 仅用于消除截图环境差异，中文另有几何和交互测试。测试默认禁止自动创建基线，修改基线必须显式执行更新命令并人工查看。

## 剩余验收

[设备矩阵](device-matrix.md) 中 macOS、iOS、Android 真机尚未验证；Windows WebKit 不替代 Safari。远端 CI 和首次 Pages 发布待本轮文件推送后核验。原模型继续保留，压缩模型未通过真机视觉验收前不替换。

旧 dist 解除 Git 跟踪被自动审批拒绝（仅返回 blocked by policy），仍待处理；发布工作流从源码重新构建。详见 [部署与回滚](../../deployment.md)。

本轮未提交或推送代码。本地进入阶段 5 前的回退节点：codex/phase-5-checkpoint。
