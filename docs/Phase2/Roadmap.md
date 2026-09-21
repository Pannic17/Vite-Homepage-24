# Phase 2 Roadmap：Kaiwu 页面整合

日期：2026-09-21

状态：P2-0 最小加载验证和 P2-1 页面／资源迁入已完成；旧查看器视觉基线待补，P2-2 至 P2-4 尚未完成。详见 [P2-0 验证报告](p2-0/2026-09-21/README.md) 和 [P2-1 交付报告](p2-1/2026-09-21/README.md)。

## 1. 目标与边界

将 `E:\Projects\kaiwu-view` 的网页功能迁入当前 homepage 工程，成为同一站点下可访问、可维护的页面；将 Kaiwu 的“查看详情”指向迁入后的 `pages/Home.vue` 页面，移除网站中指向 `kaiwuart.cn` 及其子路径的链接。

- 延续 homepage 的 Vue 3、Vite、路由、双语和静态部署体系。
- **Three.js 版本约束（用户确认，2026-09-21）：全工程只使用 homepage 原有的 `three@0.147.0`（r147），精确锁定版本。kaiwu-view 的 `0.136.0` 代码必须向 r147 适配；本期不升级、不降级，也不通过依赖别名、嵌套安装、CDN 或复制旧引擎引入第二个版本。**
- 保留已有首页构图、全屏 3D、文字与导航顺序，以及 Projects 的 Kaiwu 品牌排版；页面整合不扩展为首页重设计。
- 本期整合 Web 页面与必要的查看器、模型和资源，不迁移 Android/iOS、Capacitor 或旧工程的完整构建链。
- 原 `kaiwu-view` 工程作为迁移来源保留；完成后 homepage 必须能独立安装、构建，不依赖本机绝对路径。
- Phase 1 历史报告和基线中的旧域名保留作为历史记录；上线页面、运行时代码及当前测试不再以旧域名为有效目标。
- 本文属于新的项目 Phase 2，与 `docs/Phase1/phase2/` 中的旧重构子阶段区分。

## 2. 已确认的现状

| 位置 | 现状 | Phase 2 处理 |
| --- | --- | --- |
| `src/content/profile.js`、`src/components/ProfileIdentity.vue` | 身份介绍显示并新窗口链接到旧域名 | 品牌名称改为 KaiwuArt，转到站内 Kaiwu 入口，使用站内导航 |
| `src/content/portfolio.js`、`src/components/KaiwuSection.vue` | 品牌链接和“查看详情”指向旧域名；五个功能链接全部指向旧 `/3d-viewer` | 分开定义详情入口与查看器入口；无实际页面的功能改为文字 |
| `tests/e2e/portfolio-visual.spec.js`、`tests/unit/content.test.js` | 测试包含旧外链断言或链接结构校验 | 更新站内链接及内容模型断言 |
| 源工程 `src/pages/Home.vue` | 模型 URL、远程 JSON、本地 JSON 三种输入；跳转 `/viewer` | 作为 Kaiwu 详情／工具入口迁入，补充默认示例入口 |
| 源工程 `src/pages/Jump.vue` | 仅标题与 Logo，未实现跳转逻辑 | 不作为主入口；默认不生成无功能页面，确需兼容时重定向到 Kaiwu 首页 |
| 源工程 `src/viewer/viewer.vue` | 独立 3D 查看器；支持默认配置及 `type`、`url` 查询参数 | 随页面迁入，保持输入到展示的完整流程 |
| 两个工程的路由 | 来源使用 Hash 路由；homepage 使用带 BASE_URL 的 History 路由 | 使用 homepage 的单一路由实例 |
| 两个工程的依赖 | 来源 Three.js 为 `0.136.0`，homepage 为 `0.147.0`；来源含旧 examples 导入和自定义后处理 | 固定使用 homepage 的 `0.147.0`，适配来源代码；核心、loaders、controls 和官方 passes 均使用同一安装包 |
| 来源静态资源 | `/image/`、`/model/`、`/hdr/` 使用根路径，部分按钮引用 COS；页面引用的 `model_doc.pdf` 未在文件清单中找到 | 资源隔离、适配部署前缀；按钮优先使用本地资源；缺失文档补齐前不显示下载链接 |
| homepage `vite.config.js` | 已生成静态路由入口，但未知页面映射默认使用 `ProjectDetail` | 新路由必须同步调整页面 chunk 映射，不能只添加路由路径 |

## 3. 页面与链接设计

以下为建议的站内路由，相对于应用部署前缀；不把文件夹名 `pages` 直接当作公网 URL。

| 用户入口／来源 | 目标 | 行为 |
| --- | --- | --- |
| Projects → Kaiwu → 查看详情 | `/projects/kaiwu` | 展示由源 `pages/Home.vue` 迁入的页面 |
| 个人介绍中的 KaiwuArt | `/projects/kaiwu` | 同标签页站内导航 |
| Kaiwu 标题区旧域名链接 | `/projects/kaiwu` | 文案改为 KaiwuArt 或双语站内入口文案 |
| Kaiwu → 3D Viewer | `/projects/kaiwu/viewer` | 无参数即可展示本地默认模型 |
| Kaiwu 页面三种输入 | `/projects/kaiwu/viewer` | 校验后传入模型／配置，失败时给出可恢复提示 |
| Mobile App、Websites、Cloud & Backend、NFT & Zhixin Chain | 无链接 | 保留现有介绍标签；源工程没有对应详情页，不将它们全部导向查看器 |
| 源 `/jump` | 默认不迁入导航 | 如发现实际调用，再增加 `/projects/kaiwu/jump` → `/projects/kaiwu` 兼容重定向 |

例如默认部署下，“查看详情”实际地址为 `/Vite-Homepage-24/projects/kaiwu`。使用命名路由／RouterLink 生成路径，避免遗漏或重复部署前缀。

建议目录：

```text
src/views/KaiwuHome.vue            # pages/Home.vue 的迁入入口
src/views/KaiwuViewer.vue          # 查看器页面外壳
src/features/kaiwu/               # 查看器逻辑、配置、必要的辅助模块
public/kaiwu/                     # 模型、纹理、HDR、图标及示例配置
docs/Phase2/                      # roadmap、迁移记录与验收证据
```

## 4. 实施里程碑

依赖顺序：P2-0 → P2-1 → P2-2 → P2-3 → P2-4。旧链接切换与有效目标页面一起交付，避免中间版本出现死链。

### P2-0：迁移清单与兼容性验证

- [x] 记录两仓库版本、源页面、实际 import 依赖、默认模型、配置格式和资源大小。
- [x] 在 homepage 工具链中验证最小查看器加载路径；完成 examples 文件检查、GUI 实例化、TS 转译及自定义后处理源码审查，效果级兼容留待迁移验收。
- [x] 严格以 `three@0.147.0` 为唯一兼容目标，完成最小探针适配；完整源代码适配按下方专项计划继续，不以更改引擎版本解决。
- [x] 确认 PDF 缺失、COS 图标本地候选及示例 JSON 资源地址；页面采用时验证候选外观。
- [x] 留存迁移前首页、Projects，以及 r147 默认模型探针的截图和资源加载记录。
- [ ] 补齐未经修改的旧查看器视觉基线：来源未安装依赖，本次未引入旧引擎；探针截图不代替原效果对照。

交付：迁移清单、依赖处理结论、最小示例验证记录。退出条件：默认模型可在目标工具链加载，或已定位明确阻塞及解决路径；阻塞未解决前不进入整体交付。

### P2-1：页面与资源迁入

- [x] 迁入 KaiwuHome、KaiwuViewer 及基础渲染必需 helper；未引入无用模板和原生 App 依赖，高级效果按专项计划后续适配。
- [x] 注册懒加载路由，同步 `src/routePaths.js`、`productionPaths` 和 `vite.config.js` 的静态入口／预加载映射。
- [x] 将模型、BIN、纹理、HDR 和图标放入 `public/kaiwu/`，保持 glTF 相对引用有效。
- [x] 统一资源 URL 解析：内置资源尊重 BASE_URL，用户输入的绝对 URL 保留其语义；远程 JSON 的相对资源路径以配置文件地址解析。
- [x] 移除组件中的 `<body>` 标签与全局样式污染，加入返回 Projects、回首页的明确入口。

交付：站内两个可独立访问的页面。退出条件：默认模型可用，直接打开和刷新均能加载页面与资源。

### P2-2：链接替换与页面体验

- [ ] 修改 profile、portfolio、ProfileIdentity、KaiwuSection，按链接表切换所有旧域名入口。
- [ ] 将站内目标与外链在数据模型中明确区分，更新对应的内容校验。
- [ ] 将迁入页面标题、字段、按钮、加载状态和错误提示接入现有中英文语言体系。
- [ ] 保留三种输入方式，补充“查看示例”；移动端输入不溢出，按钮支持键盘与清晰焦点。
- [ ] 校验非法 JSON、空输入、错误参数和资源加载失败；避免永久 loading。
- [ ] 保留 `type=1/2` 的 URL 输入语义；本地 JSON 改用页面间状态／会话存储传递，避免把整份配置塞入查询字符串；刷新恢复或明确提示重新选择文件。
- [ ] 对用户自定义远程资源的 CORS／网络错误提供说明和重试，本地默认示例不依赖这些服务。

交付：完整的“Projects → 查看详情 → 输入／示例 → 查看器 → 返回”流程。退出条件：中英桌面与移动端均可完成，运行页面中没有旧域名链接。

### P2-3：3D 生命周期与性能

- [ ] 将源代码模块级共享状态和可变 PRESET 改为实例状态及配置副本，防止多次访问串扰。
- [ ] 清理 RAF、resize／touch 监听、controls、GUI、renderer、材质、纹理和后处理资源；处理加载中离开页面的竞态。
- [ ] 移除直接改写 `window.createImageBitmap` 的全局行为，验证局部兼容方案。
- [ ] 查看器离开后停止渲染，后台暂停；WebGL 不可用时显示可读回退。
- [ ] 只在进入查看器时加载重型代码和模型；Kaiwu 输入页与 homepage 首屏不预加载查看器模型／HDR。
- [ ] 对比迁移前后首页加载及查看器资源开销，记录实际值；默认示例先保证稳定，再启用经过验证的高级效果。

交付：资源清理和性能对比记录。退出条件：反复进出查看器不会累积 canvas、GUI、监听或持续动画，也不破坏 homepage 3D。

### P2-4：回归与部署验收

- [ ] 更新旧链接测试，新增两条路由、三种输入、默认示例、失败恢复和返回导航的行为测试。
- [ ] 加入 DOM 链接检查，禁止指向 `kaiwuart.cn` 及其子域的 URL；历史文档不纳入运行时禁用扫描。
- [ ] 执行 `npm run check`、`npm run test:e2e` 和 `npm run test:static`；静态测试同时覆盖根路径与默认子路径。
- [ ] 扩展静态校验：两个新页面的 HTML 入口、正确预加载 chunk、刷新、模型及附属资源无 404。
- [ ] 检查首页／About／Works／Projects 原有行为与外观；新增页面验收桌面、手机、中英和键盘操作。
- [ ] 实机检查 iOS Safari 与 Android Chrome 的模型加载、触控和退出重入；未实测项明确留待验收，不以模拟器代替实机结论。
- [ ] 更新 README、部署说明与迁移报告，记录构建版本、验证结果和已知限制。
- [ ] 发布后验证线上详情跳转、深链刷新和模型加载；异常时回退本次发布版本。

交付：Phase 2 验收报告和可部署构建。退出条件：自动化检查通过，线上及实机验收状态如实记录，未解决问题不标记为完成。

## 5. 完成标准

1. 网站可点击入口不再访问旧域名；KaiwuArt 品牌与项目介绍仍保留。
2. “查看详情”打开从 `kaiwu-view/pages/Home.vue` 迁入的站内页面，3D Viewer 打开实际查看器。
3. 本地默认模型、模型 URL、远程 JSON、本地 JSON 均有可验证的成功路径和失败提示。
4. 新页面遵循 homepage 的语言、导航、部署前缀和静态路由体系。
5. 当前工程可独立构建，不依赖 `E:\Projects\kaiwu-view` 或原站服务才能运行默认示例。
6. 原首页布局与 3D 行为无回归，查看器按需加载并在离开时清理。
7. `package.json` 精确声明 `three: "0.147.0"`，锁文件与完整依赖树只解析到该版本；构建模块中无第二份引擎来源，homepage 与 Kaiwu 共用同一 Three.js 模块。

## 6. Three.js r147 专项迁移计划

本节细化 P2-0、P2-1、P2-3 和 P2-4。P2-0 已确认单一版本，并完成默认角度下的 r147 模型／HDR 最小探针；正式迁入、旧效果对比和完整生命周期验收仍待实施。源码检查确认来源存在旧导入、自定义 PMREM 和后处理，当前 homepage 安装包未找到 `RoughnessMipmapper.js`。

| 步骤 | 对应阶段 | 具体迁移工作 | 验收依据 |
| --- | --- | --- | --- |
| T1：固定单一依赖 | P2-0 | 保留 homepage 的精确版本及锁文件中的 r147 解析；不复制来源 package-lock、node_modules 或旧引擎源码。检查新增依赖的 peerDependencies，未使用的 `postprocessing` 包不迁入，需要的依赖必须兼容 r147 | `npm ls three --all` 无其他版本、invalid 或 extraneous；锁文件所有 Three.js 安装项均为 `0.147.0` |
| T2：统一导入 | P2-0／P2-1 | 将来源 `three/` 统一为 `three`；examples 导入补齐 `.js` 并核对 r147 文件及导出。GLTFLoader、RGBELoader、OrbitControls、EffectComposer、RenderPass、ShaderPass、GUI 和 Stats 使用当前安装包 | 构建无模块解析／导出错误；运行时无重复 Three.js 警告 |
| T3：适配模型与环境光 | P2-0／P2-1 | 移除缺失的 RoughnessMipmapper 导入、实例化、调用和释放路径，用 r147 标准模型加载与材质流程验证粗糙度。对比来源自定义 PMREM 与 r147 的 `THREE.PMREMGenerator`，优先使用后者；若存在必须保留的定制效果，逐项移植为依赖 r147 公共 API 的辅助实现 | 默认 glTF、BIN、纹理和 HDR 可加载；与来源截图对比材质粗糙度、反射、曝光，差异有记录和处理结论 |
| T4：适配渲染与后处理 | P2-1／P2-3 | 先完成基础 renderer 与 controls；检查色彩编码、tone mapping、灯光、阴影和 render target 参数，使用 r147 实际 API，避免套用更新版本接口。逐个核对自定义 Bloom、SSAO、SSR、SSAA 及 shader 的 uniforms、Pass 接口、深度纹理与尺寸更新；通用实现优先复用 r147 官方模块，必要的定制 shader 单独维护 | 默认场景、旋转缩放、播放暂停、重置可用；启用的效果无 shader 编译错误、黑屏或重复 gamma 校正；未兼容效果明确记录，不静默丢弃 |
| T5：隔离场景生命周期 | P2-3 | 引擎模块共用，场景、renderer、controls、GUI 和配置按页面实例隔离；将共享 PRESET 复制后再修改，完成 RAF、事件、异步回调和 GPU 资源释放 | 首页与查看器反复切换、加载中退出、修改配置后重入均无串扰；离开页面后无残留渲染 |
| T6：锁定回归基线 | P2-4 | 执行干净安装、依赖树检查、现有自动化和新增查看器测试；检查构建模块来源，排除 alias、CDN、复制源码造成的第二份引擎。保存首页和 Kaiwu 的同场景截图与控制台记录 | r147 单一来源、所有检查通过；首页外观及交互保持原基线，Kaiwu 默认模型和三种输入通过验收 |

执行顺序：T1 → T2 → T3 最小默认模型 → T4 渲染与效果 → T5 生命周期 → T6 完整回归。T3 通过后再切换正式入口。

兼容性受阻时，继续在 r147 上改写对应辅助模块或寻找等效实现；无法保留的功能列为明确阻塞并说明影响，不擅自更改版本或将缺失功能标为完成。仅共用引擎模块不意味着共用 renderer，也不要求合并首页与 Kaiwu 的场景实现。

## 7. 风险与执行约定

| 风险 | 处理 |
| --- | --- |
| 旧 Three.js 和自定义后处理兼容工作超出预期 | 固定 r147，在 P2-0 提前验证；适配或替换辅助实现，核心展示通过后逐项恢复高级功能，不调整引擎版本 |
| 模型、HDR、纹理体积大 | 记录大小、按需加载，测量后决定压缩与默认画质 |
| 原远程图标或自定义模型不可用 | 本地化默认体验，远程输入提供明确错误反馈 |
| History 路由在 Pages 刷新失败 | 同步生成静态入口与正确 chunk 映射，测试两种 base |
| 源查看器全局状态影响首页 | 实例化状态、清理副作用、反复进入退出验证 |

每个里程碑保存可核查结果，提交信息使用英文。推荐按依赖顺序拆分提交，避免一次提交同时包含依赖调整、迁移、链接替换和所有验收变更。工期在 P2-0 兼容性验证后估算；当前不将未验证的技术风险折算成承诺日期。

Phase 1 设计与工程背景参见 [Phase 1 Roadmap](../Phase1/Roadmap.md)。本期关于旧域名链接的替换要求优先于 Phase 1 中保留旧链接的历史约定。
