# P2-2：链接替换与页面体验

日期：2026-09-21。完成本阶段交付，未推送或发布。

## 已交付

- 首页／About 身份介绍改为 `KaiwuArt` 站内链接；Projects 品牌入口和“查看详情”指向 `/projects/kaiwu`，使用 RouterLink，保留部署前缀且不打开新标签页。
- 3D Viewer 标签指向 `/projects/kaiwu/viewer`；App、Websites、Backend、Chain 四项作为文字标签保留，不再产生无效链接。
- profile 和 Kaiwu 内容定义使用明确的 `destination.kind`、`to`，更新内容契约与历史外链测试，仅豁免已退役的 Kaiwu 域名，其他历史外链仍需保留。
- 页面继续提供默认示例、模型 URL、远程 JSON 和本地 JSON。远程配置按配置地址解析相对资源，本地配置使用会话存储，刷新可恢复。
- 区分并翻译 URL 无效、配置字段无效、JSON 解析失败、网络／跨域失败、配置丢失、存储禁用、未支持效果、超时和模型资源错误。用户可重试或返回配置页重新选择文件。
- 本地文件在导航前验证；允许重新选择同一文件。空 URL 由必填表单校验，非法 query 在查看器显示错误。30 秒加载期限避免永久 loading，超时后作废旧任务并释放已创建场景。
- Kaiwu 页面添加明确的键盘焦点样式，改善黑色 Logo 在深色背景上的可见性；保留原 homepage 构图与 Projects 品牌布局。
- 运行时源码 `src` 已无 `kaiwuart.cn`。历史文档与测试中的禁止域名规则保留。

## 验证

- `npm run check`：Lint、13 项单元测试与生产构建通过。
- `npx playwright test kaiwu.spec.js kaiwu-links.spec.js portfolio-visual.spec.js --project=desktop-chromium --project=mobile-chromium`：13 项通过，1 项移动端鼠标 hover 用例按原设计跳过。
- 用例覆盖中英 Projects → 详情 → 示例 → 返回、首页／About 站内入口、三个输入方式、Enter 提交、刷新恢复、JSON 错误即时切换语言、缺失／禁用会话存储、模拟网络失败重试，以及虚拟时钟推进触发超时。
- 静态托管检查覆盖根路径和默认子路径共 18 项路由，逐页检查 DOM 链接不得指向旧域名或其子域；验证新页面直接打开与刷新。结果见 [static-host.json](static-host.json)。

证据：[浏览器结果](browser-tests.json)、[桌面中文 Projects](desktop-projects-cn.png)、[手机中文 Projects](mobile-projects-cn.png)。

本次网络错误测试使用 Playwright 模拟失败，不代表已验证任意第三方 COS 服务的实际 CORS 配置；提示不将所有网络错误武断归因为 CORS。原始旧查看器视觉基线、高级效果、完整生命周期性能和实机浏览器矩阵仍属于后续阶段。Three.js 固定为 `0.147.0`，未变更依赖。

## 复现与提交

使用项目要求的 Node.js 版本运行上述命令及：

```powershell
node scripts/check-static-host.mjs --output docs/Phase2/p2-2/2026-09-21
```

本阶段代码、测试、文档和证据随同一次英文 Git commit 交付；实际 commit hash 在交付回复中记录。
