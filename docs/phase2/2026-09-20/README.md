# 阶段 2：共享布局与响应式 UI

完成日期：2026-09-20（Asia/Shanghai；JSON 时间为 UTC）。

## 变更

- 新增 `styles/tokens.css`、全局基础样式、`SiteLayout` 和 `SiteHeader`。统一最大容器宽度、rem/clamp 字号、边距、颜色与焦点；页头在自然流中排列，不再固定覆盖正文。
- Works、Projects 和 About 共用布局。删除页头测高 composable 和占位元素；About 的待建设文案能够在窄屏换行，没有编造个人介绍。
- 新增 `ProjectCard`，原 `MenuSection` 暂作兼容入口。卡片采用单栏／双栏 Grid、完整换行标题、自然高度正文和标签列表；移除绝对定位、随机 ID、Three.js UUID 引入及 resize 测高。
- 卡片标题区分站内链接、外链和无详情状态。只有真实链接可聚焦／点击，无链接作品不会显示虚假点击手势。原有项目、封面、介绍和有效链接保留。
- Kaiwu 展示改为可换行页头、手机两列／桌面四列海报和换行链接。去掉只打印日志的“Click For Details”按钮，保留官网和既有功能链接。
- 首页正文与 3D 独立分区：桌面左右排列，手机先读正文和导航，再显示模型。取消全屏装饰覆盖、25vh 空白和禁止文字选择；模型加载时也有静态封面。
- 详情和测试页共用自然流 `PageHeader`。移除测试页 200vh 占位及横向裁剪；GCS 继续使用已有介绍和待完善提示。
- 导航使用 RouterLink，动作使用 button；补齐跳到正文、焦点轮廓、语言按钮按下状态、44px 独立控件及安全区边距。移除全局 `--vsr` 和对应 resize 监听。

## 验证

Windows 本地生产预览。Chrome 125.0.6422.113、Edge 152.0.4191.66；无 CPU／网络节流，DPR 1。

| 项目 | 结果与证据 |
| --- | --- |
| Edge 完整端到端 | 53 正常通过、2 预期失败、11 有意跳过；[JSON](tests-edge.json) |
| Chrome 完整端到端 | 53 正常通过、2 预期失败、11 有意跳过；[JSON](tests-chrome.json) |
| 响应式矩阵 | 每个浏览器 11 种视口 × 7 路由 × 2 语言，共 154 次页面布局检查；未检测到横向溢出或标题／正文容器裁剪 |
| 键盘与触控 | Tab、Shift+Tab、Enter、Space、跳到正文、焦点样式、语言按下状态、详情返回、44px 独立控件均通过 |
| 文字放大 | 640×450 有效视口、根字号 200%，所有 7 路由内容和关键控件可达 |
| 长内容压力检查 | 320px 下超长无空格标题与 URL，字号 100%／200% 时页面宽度均为 320px；[记录](visual-checks.json) |
| 生命周期回归 | 两种浏览器／桌面与触屏模拟中，20 次首页往返、延迟下载／解析和异常回退继续通过 |
| 资源释放单元测试 | 1 项通过，共享 GLTF 资源仅释放一次 |
| 静态部署 | 根路径和项目子路径共 14 项通过；[记录](static-host.json) |
| 生产构建 | 99 模块，主 JS 709.02 kB，gzip 207.58 kB；仍有大块提示，拆分在阶段 4 |

11 种视口为：320×568、360×800、390×844、430×932、768×1024、1024×768、844×390、1280×720、1440×900、1920×1080、2560×1440。路由为：首页、About、Works、Projects、GCS、Test 和未知页面。语言为 en-US 和 zh-CN。

测试报告中的 55 项符合预期包含 2 项语言持久化预期失败，不代表这项功能已修复。11 项跳过是避免在 mobile 项目重复执行已由 desktop 项目显式调整尺寸的完整矩阵；手机触屏配置的导航、生命周期和控件测试实际执行。

200% 检查采用文字放大和有效视口模拟，不冒充所有浏览器的原生缩放测试。iOS Safari、Android 真机、Firefox／WebKit、屏幕阅读器和安全区真机表现仍需阶段 5 验证。减少运动下的 3D 暂停和动画开关留在阶段 4；本次只关闭 CSS 过渡增强。

## 截图

归档 20 张固定静态回退的布局截图：两种语言 × 桌面 1440／手机宽度 390 × 首页、About、Works、Projects、GCS。图片在 `screenshots/`，来自 Edge 响应式测试；它们是观察证据，不是自动批准的视觉金图。另有 2 张模型实际加载成功的首页截图和 1 张静态托管详情截图。

- [桌面首页：实际 3D](home-live-1440.png)、[手机首页：实际 3D](home-live-390.png)
- [桌面 Works](screenshots/1440-works-en-US.png)、[手机 Works 中文](screenshots/390-works-zh-CN.png)
- [桌面 Projects](screenshots/1440-projects-en-US.png)、[手机 Projects 中文](screenshots/390-projects-zh-CN.png)
- [手机 About](screenshots/390-about-en-US.png)、[手机 GCS 中文](screenshots/390-works-gcs-zh-CN.png)

已人工查看首页桌面／手机、Works 手机和 Projects 桌面截图；模型位于独立区域，卡片文案自然展开，海报未覆盖正文。

## 复现与回退

Node >=22.19.0，推荐 Node 24。浏览器检查按顺序运行，均使用独立构建目录，未改动已跟踪的旧 dist。

```powershell
$env:PLAYWRIGHT_CHANNEL = 'msedge' # 第二轮改为 chrome
npm run test:unit
npm run test:e2e
npm run test:static
node scripts/capture-phase2.mjs
```

不指定 channel 时先安装 Playwright Chromium。完整测试报告写入 `test-results/results.json`；响应式截图按测试名称写入 `test-results/`；额外实景截图默认写入 `phase2-latest.local/`。历史阶段 0–1 证据未覆盖。

开始前建立本地 `codex/phase-2-checkpoint`，对应 `d29608a09faac79cee5df17949a55eb7611d4d8c`。阶段 2 修改保留在工作区，尚未提交、推送或部署。下一阶段继续内容数据化、语言持久化和完整翻译；现有混合语言和缺失介绍不在本次伪造补全。
