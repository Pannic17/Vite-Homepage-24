# 阶段 4：3D 增强与加载性能

日期：2026-09-20。保留用户确认的首页构图、Works／Projects 原版角标 hover 和 Kaiwu 连续海报。键盘与点击均不产生全包焦点边框。本地回退节点为 `codex/phase-4-checkpoint`，包含阶段 4 开始前尚未提交的视觉修复；本阶段未部署。

## 实现

- 路由组件按需加载；`useHomeScene` 先让正文与静态图绘制，再在空闲时导入场景。非首页直接访问不请求 Three.js 或模型。离开页面／关闭动画会使待完成的导入失效，并销毁已有场景。
- 每个静态 HTML 入口只预加载当前路由及其同步依赖和样式，缩短正文首屏的串行请求链；不遍历动态 import，不提前请求 3D。404 使用 NotFound 的预加载。
- 场景为页面持有的实例，提供 `resize/pause/resume/setQuality/dispose`。暂停与恢复不重建模型；容器变化更新相机、绘制缓冲区、composer 和效果分辨率。模型下载可取消，解析完成后的过期结果会释放。
- 首页底部提供动画开关和质量选择；`home-scene-quality` 保存偏好，存储受限时仍可操作。Auto 遵循减少运动和省流量偏好；用户可明确开启动画。系统减少运动偏好在运行时变化也会生效。
- 页面隐藏暂停帧循环，返回前台恢复。WebGL context 丢失释放实例并显示静态图，用户可开启动画重试，没有无限自动重试。
- 后处理效果在实际触发时才分配 render target；低档不创建 composer。高档保留原版八种效果，中档只保留 Shift／Sobel 增强；生产路径没有调试 GUI。

| 档位 | DPR 上限 | 目标帧率 | 后处理 |
| --- | ---: | ---: | --- |
| 静态 | — | 0 | 不导入 3D、不创建 WebGL |
| 低 | 0.75 | 30 | 直接绘制场景 |
| 中 | 1 | 30 | RGB shift 基础链，按需 Shift／Sobel |
| 高 | 1.5 | 60 | 原有基础链和八种按需效果 |

自动初选依据减少运动、省流量、CPU 并发数和内存提示，不依据设备名称或屏幕宽度。缺失提示时采用中档。运行时先预热 5 秒，再连续观察两个 5 秒窗口；绘制帧率持续低于目标的 72% 时降低一档，最终可转静态。只降不自动升，暂停会重置采样，避免后台间隔造成误判。手动高档也受持续低帧率保护。这是保守工程策略，不等同于真机性能保证。

## 图片与模型

18 张封面和海报生成 320／640／960px WebP（不放大原图），使用 `picture/srcset/sizes`，保留原图作为不支持 WebP 时的回退。真实宽高预留布局空间；Works 首图、首页静态图和 Kaiwu 首屏海报优先加载，其他列表图原生懒加载。转换使用开发依赖 Sharp，运行时不加载 Sharp。

| 图片统计 | 字节 |
| --- | ---: |
| 18 张原图合计 | 16,321,600 |
| 每张最大尺寸 WebP 合计 | 1,347,238 |
| 最大单个变体 | 190,502 |

最大单张低于 200 kB 目标。原图仍在仓库与构建产物中，所以这里是浏览器选择 WebP 后的请求体积，不是仓库缩减。`source` 显式不参与布局，避免 `picture { display: contents }` 使空 source 占用 Grid 单元；测试检查左图右文及四张海报紧邻排列。

原模型 `cat.gltf` 为 2,593,854 字节，gzip 估算 1,049,514 字节；一个 mesh、55,552 个顶点、83,328 个索引，没有外部纹理。评估的无损 GLB 为 1,945,352 字节、gzip 776,544 字节，转换前后的顶点／索引逐字节相同。Node 中五轮交替解析中位数约为 GLTF 39.85ms、GLB 1.44ms，详见 [评估数据](model-evaluation.json)。这不代表手机浏览器解码时间，且未完成模型渲染图像／真机验证；本阶段保留原模型，不引入 Draco／meshopt 解码器或有损几何变化。

## 加载预算和 Lighthouse

[请求与构建数据](performance.json) 列出每条路由实际请求的 JS 和各块 gzip 估算。静态模式用于隔离核心页面脚本，3D 成本单列。

本表按 Vite preview 的实际请求统计；其无尾斜杠地址使用首页 HTML 回退，因此非首页数据也包含首页预加载依赖，没有从预算中扣除。普通静态托管的每路由 HTML 不预加载其他页面，已在两个部署 base 下另行验证。

| 内容 | gzip 字节 |
| --- | ---: |
| 首页核心 JS | 约 75,500 |
| About 核心 JS | 约 76,500 |
| Works 核心 JS | 约 77,700 |
| Projects 核心 JS | 约 78,200 |
| GCS 详情核心 JS | 约 77,400 |
| 延后加载的 3D JS | 约 134,000（精确值见 JSON） |
| 模型 | 1,049,514（托管端 gzip 需另验） |

核心页面均低于 150 kB 目标。3D JS 原始体积约 528 kB，因此 Vite 的 500 kB 告警仍保留，没有提高告警阈值。首次开启动画仍需下载原模型，缓存与 HTTP 压缩策略由托管服务决定。

与阶段 0 使用相同的 Edge 152.0.4191.66、Lighthouse 13.4.1、localhost 生产预览、独立冷缓存 profile，默认移动模拟网络（RTT 150ms、吞吐约 1.64Mbps）及 4 倍 CPU 节流，三轮取中位数。动画默认开启，没有拦截模型或人为静态化 Lighthouse。

| 指标 | 阶段 0 中位数 | 本阶段中位数 |
| --- | ---: | ---: |
| Performance | 72 | 98 |
| FCP | 2,103ms | 1,663ms |
| LCP | 14,968ms | 2,120ms |
| TBT | 123ms | 45.5ms |
| CLS | 0 | 0 |

本轮 LCP ≤ 2.5s、CLS ≤ 0.1 目标通过。最终三轮性能分数均为 98，LCP 分别为 2.120／2.177／2.114 秒；完整结果见 [汇总](lighthouse-summary.json) 和 `lighthouse/`。预加载优化前曾出现约 2.97 秒的中位数，最终结果使用加入当前路由预加载后的完整三轮，不挑选不同轮次拼接。实验室估算不能代表真实用户 INP 或手机 GPU 帧率。差异包含阶段 1–4 累计变化，不单独归因于某一行代码。

## 验证与复现

- Edge 全量：88 通过、12 有意跳过、0 失败；跳过为移动项目重复尺寸矩阵及鼠标专属 hover。
- Chrome 全量：88 通过、12 有意跳过、0 失败。加入无效质量偏好校验和路由预加载后，最终阶段 4／hover 专项 17 项通过、1 项有意跳过；根路径／子路径静态托管 14 项通过，包括静态预加载不包含 3D 的检查。
- 依赖审计 0 漏洞；构建通过，保留延迟 3D 包的体积告警。
- 单元测试：9 通过，含质量选择、持续低帧率和暂停后重新预热。
- 20 次切页继续通过：进入首页仅一个活动 canvas／帧循环，离开后为零，双击事件不累积；下载中和解析中切页不会重启渲染。
- 新增覆盖：非首页无 3D 请求、动态模块加载中离开、静态偏好／省流量、开关持久化、运行时减少运动、后台暂停恢复、DPR 上限、低帧率降级、WebP 原图回退及 Grid 几何布局。
- 截图使用静态模式固定动画状态：`home/works/projects-1440.png` 与 `*-390.png`。桌面移动视口模拟不代表 iOS／Android 真机。

复现（Node >=22.19，浏览器任务顺序执行）：

```powershell
$env:PLAYWRIGHT_CHANNEL = 'msedge'
npm run test:unit
npm run test:e2e
node scripts/measure-phase4.mjs phase4-latest.local
node scripts/evaluate-model.mjs phase4-latest.local
node scripts/check-static-host.mjs --output phase4-latest.local
$env:CHROME_PATH = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
npm run baseline:lighthouse -- --output phase4-latest.local
```

构建写入独立验证目录，不覆盖已跟踪的 `dist/`。重新生成图片用 `npm run images:optimize`。Safari、Firefox、iOS／Android 真机、中低档 GPU 稳定 30fps、真实 INP 和发布配置仍由阶段 5 验证；本阶段没有远端推送或发布。
