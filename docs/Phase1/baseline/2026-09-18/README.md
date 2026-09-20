# 阶段 0：重构前基线

日期：2026-09-18（Asia/Shanghai）。本目录记录重构前的真实状态，截图不代表已认可的正确设计。

## 范围与回退点

- 原分支：`master`，原 HEAD：`6469019`。
- 开始阶段 0 前，已通过独立临时 Git index 保存完整源码快照，未切换当前分支或改动用户暂存区。
- 本地回退分支：`codex/phase-0-checkpoint`。
- 快照提交：`c36432a0ede75550aa19715a8e2c2c863e327f7b`（英文提交说明）。该分支尚未推送。
- 快照包含此前 Vite 8.3.0 / Vue 插件 6.0.9 升级、两份锁文件、Node 说明、四个 Vue 文件中的 CSS 注释修复、Windows 启动入口及 Roadmap。
- 阶段 0 仅增加测试、采集工具与证据，不修复业务页面。`src/`、`index.html`、`vite.config.js` 与快照之间无新增差异。
- 开发工具新增 Playwright、Lighthouse 13.4.1 和 chrome-launcher；为匹配 Lighthouse，package.json 与 Windows 启动脚本将 Node 最低要求统一为 22.19，推荐 24 LTS。生产依赖版本未变化。
- 构建输出到忽略目录 `.baseline-dist/`，避免修改已有 Git 跟踪的 `dist/`。

需要检查旧版本时，可创建独立工作目录，不覆盖当前未提交改动：

```sh
git worktree add ../vite-homepage-phase0 codex/phase-0-checkpoint
```

快照是源码节点，不包含 node_modules；在新目录按其 README 安装依赖。不得用未经核对的 `reset --hard` 覆盖后续工作。

## 测试条件与证据索引

| 项目 | 条件 |
| --- | --- |
| 系统 | Windows 10 Enterprise，10.0.19045 |
| CPU / 内存 | Intel Core i7-13700F，24 个逻辑处理器，约 32 GiB |
| Node / Playwright | Node 24.19.0；Playwright 1.63.0 |
| 截图与生命周期浏览器 | 本机 Chrome 125.0.6422.113，headless；不是最新浏览器兼容认证 |
| Lighthouse / 额外冒烟 | 本机 Edge 152.0.4191.66；性能三轮均使用同一浏览器 |
| 桌面 | 1440×900，DPR 1 |
| 手机模拟 | 390×844，DPR 1，touch + isMobile；不是 iPhone/Android 真机 |
| 页面 | 生产构建，`http://127.0.0.1:4175/Vite-Homepage-24/` |
| 截图条件 | 每个页面新 browser context，中英文各一组；无网络/CPU 限速；动画保持运行 |
| 3D 实际渲染后端 | ANGLE / SwiftShader 软件渲染，不能代表本机 RTX 4080 或手机 GPU 的性能 |
| 采集时间 | 截图与生命周期约 00:32；Lighthouse 在重试后补采，精确 UTC 时间见 JSON |

源码摘要（`src/`、`index.html`、`vite.config.js`，算法见采集脚本）：

```text
3b7082c8d9d5c611256c72fe248ce48aab770c6d78282bd4146a0deeed8407c4
```

- [页面、控制台、资源和布局原始记录](pages.json)
- [24 张截图索引](screenshots.md)
- [20 次切页的资源与帧率记录](lifecycle.json)
- [Lighthouse 三次测量摘要](lighthouse-summary.json)
- [Lighthouse HTML 报告 1](lighthouse/mobile-1.html)、[报告 2](lighthouse/mobile-2.html)、[报告 3](lighthouse/mobile-3.html)
- [public 资源清单](assets.json)
- [外链探测结果](external-links.json)
- [页面和内容清单](inventory.md)
- [测试运行摘要](tests.md)
- [依赖审计原始结果](audit.json)

## 已复现问题

“自动复现”表示已有期望正确行为的测试；测试中的 expected failure 不表示问题已修复。其余条目依据采集数据或明确的源码路径记录。

| ID / 优先级 | 页面与条件、复现步骤 | 当前实际结果 | 期望结果 / 下一阶段 |
| --- | --- | --- | --- |
| B01 / P0 | 首页，桌面和手机模拟；进入后改变窗口尺寸 | 文档重新加载，注入的文档标记丢失；已自动复现 | 原文档保留，内容与相机随尺寸更新；阶段 1 |
| B02 / P1 | 浏览器语言 en-US；首页点中文，再刷新 | 返回英文；已自动复现 | 用户选择持久化；阶段 3 |
| B03 / P1 | 直接访问 `/works/gcs` | 渲染 WORKS 列表，没有 GCS 详情结构；已自动复现 | 展示详情或明确缺失内容状态；阶段 1/3 |
| B04 / P1 | `/works/gcs`，两尺寸两语言 | 8 张列表封面 `naturalWidth=0`；错误 URL 指向 `/Vite-Homepage-24/works/image/...`。本地 SPA 回退返回 200，不能仅靠 HTTP 状态发现破图 | 子路由资源正确定位且可解码；阶段 1 |
| B05 / P0 | 首页与 Works 连续往返 20 次，每次访问后测量 | WebGL 上下文累计创建 2→42，DOM 事件监听 45→663；出现 11 次上下文过多警告 | 释放旧渲染资源及监听，不持续累积；阶段 1 |
| B06 / P1 | 同一切页实验，离开首页进入 Works | `window.onresize`、`document.ondblclick` 仍为函数；隐藏 GUI DOM 仍存在 | 页面级事件和调试 UI 随场景清理；阶段 1 |
| B07 / P1 | 手机 390×844，访问 About | 大字 CONSTRUCTION 撑宽内容；记录的布局宽度 487px，大于请求的 390px；截图明显裁切 | 长标题换行且不扩大布局视口；阶段 2 |
| B08 / P1 | 桌面首页 1440×900，查看截图 | 3D 模型覆盖品牌标题和部分介绍正文 | 装饰与阅读区域分离；阶段 2/4 |
| B09 / P1 | 中文页面、刷新与导航 | 页面仍保持 `html.lang=en`，多段介绍、Works 标题与 TEST 等硬编码文案不随语言切换 | 文档语言和显示内容一致，明确未翻译内容；阶段 3 |
| B10 / P1 | About 或详情直达；检查 SubRight 及路由 | “HOME”执行历史后退而非首页导航；无独立未知路由回退；此次仅源码确认，不声称所有历史条件都已浏览器实测 | HOME 总能回首页，BACK 有明确回退，未知路由有 404；阶段 1 |
| B11 / P1 | Works/Projects 的交互结构与图片记录 | 点击 div 导航、封面缺 alt、部分卡片看似可点却没有目标；Kaiwu Details 仅输出日志 | 有语义、键盘可用、无目标不误导；阶段 2/3 |
| B12 / P2 | `/about`、`/test`、GCS 详情源码 | About 待建设；测试页是空白占位内容且首页公开 TEST；GCS 正文缺失 | 明确正式/测试入口与待补内容，不编造文案；阶段 3 |

## 布局、网络与控制台

- 24 个页面样本均未捕获 `pageerror`；这不等于没有逻辑或视觉错误。
- 首页存在 `GPU stall due to ReadPixels` 警告；软件渲染与截图可能影响此警告，不直接认定为真实设备故障。
- 20 次切页时存在 WebGL 上下文上限警告，具有独立的资源累积证据。
- 当前 `/works`、`/projects` 的图片在生产子路径下正常解码，不能把源码中的绝对路径一律判为实际破图；已确认破图集中在 `/works/gcs` 的相对路径。
- 主要截图样本没有检测到普通页面横向溢出；About 的移动布局视口被撑宽，不能用 `scrollWidth === innerWidth` 误判为正常。
- 尚未完成平板、320px 窄屏、横屏、200% 缩放和读屏器矩阵；这些是后续适配阶段的回归项目。

## 性能与资源基线

构建成功，105 个模块。主 JS 原始体积 745,541 bytes（745.54 kB）；采集脚本用 Node `gzipSync` 默认参数得到 215,304 bytes。Vite CLI 显示约 216.98 kB gzip，压缩算法/参数口径不同；后续对比固定使用脚本中的口径。

public 共 25 个文件、21,338,512 bytes（约 21.34 MB），不代表首屏全部下载。`cat.gltf` 约 2.59 MB，`Construction.png` 约 2.62 MB，`Split!.png` 约 2.48 MB，`CourseWork.png` 约 2.32 MB。单文件明细见 assets.json。

最终 `npm audit` 为 4 项原有 vue-i18n 链路漏洞（3 moderate、1 high），未引入额外审计项。曾为旧 Node 兼容尝试 Lighthouse 12，但其额外依赖漏洞不适合保留，最终采用 13.4.1 并提高开发运行时要求。原有业务依赖漏洞按阶段 1 处理，本阶段不进行业务依赖迁移。

### 3D 与生命周期

5.005 秒采样期间，298 次 RAF 回调对应观测到有 WebGL draw 调用的帧，约 59.54 fps，帧间隔 P95 16.8ms。这是软件渲染、本机无节流、单次短样本，不能外推到移动设备或长时间效果链性能。

| 指标 | 初次首页 | 第 5 次返回首页 | 第 10 次 | 第 20 次 |
| --- | ---: | ---: | ---: | ---: |
| WebGL 上下文累计创建 | 2 | 12 | 22 | 42 |
| DOM canvas | 1 | 1 | 1 | 1 |
| GUI 元素（含嵌套 GUI） | 3 | 18 | 33 | 63 |
| DOM 事件监听数 | 45 | 228 | 373 | 663 |
| DOM 节点数 | 129 | 745 | 1,015 | 1,555 |
| GC 后 JS 堆 bytes | 3,955,888 | 6,239,968 | 7,120,540 | 8,425,828 |

通过 CDP 在每次内存采样前触发 GC；仅在测试页面注入计数器，不改业务源码。计数器记录的是**累计创建**，不是同时活动的 GPU 上下文数；GUI 计数包含子面板；没有测 GPU 显存。DOM、监听和堆的共同增长及浏览器告警支持“清理不足”结论，不能只看页面上始终只有一个 canvas。

### Lighthouse

三次冷启动、独立 Edge profile、默认移动网络/CPU 模拟，完整设置与每轮结果存于 lighthouse-summary.json。指标为实验室估算，无真实用户 INP。首页的自动可访问性高分不能代表整个网站或作品卡片通过可访问性审查。

具体三次值及中位数见 [性能摘要](performance.md)。采集期间未同时运行另一套浏览器测试；既有用户开发服务保持运行。动态 3D、后台系统负载和模拟算法会造成波动，后续仍需同环境复测。

## 如何复现

使用兼容 Node（本次为 24.19.0），在仓库根目录执行：

```sh
npm ci
npx playwright install chromium
npm run test:e2e
npm run baseline:capture
npm run baseline:lighthouse
```

默认采集到 `baseline-latest.local/`，不覆盖本目录的历史证据。测试自动在独立端口 4175 构建和预览；若端口已被占用会失败，不复用未知服务。测试服务退出后自动关闭。不要同时运行这三条浏览器命令。

如果下载浏览器受阻，可显式使用已安装的浏览器；本次截图与初轮测试使用如下 PowerShell 配置：

```powershell
$env:PLAYWRIGHT_CHANNEL = 'chrome'
$env:CHROME_PATH = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
npm run test:e2e
npm run baseline:capture
npm run baseline:lighthouse
```

额外 Edge 检查可设置 `$env:PLAYWRIGHT_CHANNEL = 'msedge'` 后运行测试。本次成功完成的 Lighthouse 三轮使用 `$env:CHROME_PATH = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'`。记录每次实际版本，不把系统浏览器视为版本固定的 Playwright bundled Chromium。Lighthouse 用 `CHROME_PATH`，Playwright 用 `PLAYWRIGHT_CHANNEL`，两者须分别设置。

HTML 测试报告在 `playwright-report/`，失败 trace 和 JSON 在 `test-results/`。这些为可再生文件，默认不进 Git。Lighthouse 的独立临时 profile 位于 `.lighthouse-profiles.local/`；Windows 文件占用导致自动清理有竞态，因此保留为忽略目录，不使用个人浏览器 profile。

## 阶段 0 的边界

- 已完成源码回退点、内容/资源清单、24 张截图、缺陷记录、构建体积、3D 与重复切页采样、Lighthouse 和最小冒烟基础设施。
- 没有修改业务页面，没有把已知失败截图设置为视觉回归正确基准，也没有开始阶段 1 修复。
- 外链有网络受限项；GitHub Pages 线上深链接、Firefox/WebKit、真实移动设备、无 WebGL 降级、加载中离开页面等尚未在本阶段全部实测，后续需补验证。
- 未推送、未部署。下一步优先处理 B01、B05、B06，再处理 B03/B04 的详情与资源路径。
