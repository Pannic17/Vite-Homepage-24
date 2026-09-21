# P2-0：迁移预检与最小渲染验证

日期：2026-09-21。结论：r147 最小加载验证通过，可进入 P2-1；旧版完整查看器的视觉基线仍有缺口，不宣称全功能迁移兼容已通过。

## 范围与版本

- homepage 源码版本：`653fee2b77c258433b0dfb929ed98327ef8c773a`。
- kaiwu-view 源码版本：`7abf71ac0b2e9ee5432bc6dcb58013545bca3d43`；来源工程保持只读。
- 当前 `npm ls three --all` 仅有 `three@0.147.0`；锁文件也仅有一个 Three.js 安装项，版本为 `0.147.0`。
- 未修改 package.json、锁文件、正式页面、路由或生产资源。临时探针位于被忽略的 `.phase2-preflight.local/`，通过当前 Vite 构建，不接入生产页面。
- 实际验证环境：Node.js 24.19.0、Vite 8.3.0、Playwright Chromium、SwiftShader。系统默认 Node 20.11.0 无法运行当前 Vite；执行时使用已安装的 Node 24，无需安装新依赖。

## 迁移清单

完整机器可读清单见 [inventory.json](inventory.json)：包含来源 package.json、源文件导入、42 个静态资源及大小、glTF 依赖引用、`2.json` 配置。

| 来源 | 迁移结论 |
| --- | --- |
| `src/pages/Home.vue` | 迁入 KaiwuHome；保留模型 URL、远程 JSON、本地 JSON 三种输入 |
| `src/pages/Jump.vue` | 只有标题和 Logo；不作为主入口，兼容需求另行确认 |
| `src/viewer/viewer.vue` | 迁入查看器外壳；改为实例状态、完整错误状态与清理逻辑 |
| `ThreeHelper.js`、`CameraHelper.js`、`LightHelper.js`、`InitHelper.js` | 按实际调用迁入并适配 r147；消除模块级 renderer／scene／camera 状态 |
| `GUIHelper.ts` | 可经当前 Vite 的 Oxc 转译；尚未做 TypeScript 类型检查 |
| `DebugHelper.ts`、`touchHelper.ts` | 已验证可转译；当前 viewer 主调用链未发现引用，默认不迁入 |
| `PostHelper.js`、`Postproceesing/*` | 按效果逐项核对；保留必要定制，不能把“编译成功”当成渲染兼容 |
| `public/model/owl_gltf/*`、`public/hdr/xmas.hdr` | 默认示例必需，所有 glTF 引用文件存在且浏览器实际加载成功 |
| 其余 HDR、图片与 `2.json` | 按配置引用选择迁入，避免整包复制；JSON 内根路径须统一适配部署前缀 |
| Android、Capacitor、App 链接关联文件、HelloWorld | 不属于本次网页迁移 |

静态资源总计 **36,638,375 字节**（约 34.94 MiB）。最大文件是模型 `1.bin`（10,926,544 字节），其次是 `image/background.png`（7,896,865 字节）。后者不能因为文件存在就默认纳入首屏；源查看器实际默认背景为 `background.jpg`。

配置契约包括 `modelPath`、`hdrPath`、`bgPath`、`rotation`、`hdrAngle`、`autoPlay`、`ambientIntensity`、`hdrExposure`、`toneMapping`、`camera` 和 `postprocessing`。来源构造函数会强制关闭 `enablePostprocessing`，故样例 JSON 中设为 true 不代表原查看器实际启用。迁移时应显式定义支持字段、默认值和不支持字段提示。

## 依赖与兼容性结论

检查详情见 [compatibility.json](compatibility.json)。

| 检查项 | 结果及处理 |
| --- | --- |
| `three/` 与无扩展名 examples 导入 | 统一为 `three` 和带 `.js` 的当前包路径；规范化后唯一缺失文件为 RoughnessMipmapper |
| `RoughnessMipmapper` | r147 不存在；探针不使用它，默认模型仍正常渲染。迁移需删除对应导入、生成和释放调用，材质差异留待视觉对比 |
| GLTFLoader、RGBELoader、OrbitControls、GUI、Composer、RenderPass、ShaderPass | r147 探针完成构建与实例化；基础 renderer 已实际绘制。Composer 的实例化不代表全部后处理效果验证通过 |
| 来源自定义 PMREM | 添加了 `fromEquirectangular(texture, angle)` 及旋转 shader；官方 PMREM 的第二参数不能当作此角度直接传入。探针只验证默认角度 0，非零角度需单独适配和验收 |
| TypeScript helper | 三个 `.ts` 文件经 Oxc 转译通过，无需搬入旧 vue-tsc／Webpack 链；类型和完整集成尚未验收 |
| axios | 当前只用于 JSON GET，计划使用 fetch 加状态码检查及 AbortController，无需复制旧 axios |
| file-saver／FileSaver／blob | 配置导出可使用浏览器 Blob、对象 URL 和 download；不迁入重复包，注意释放对象 URL |
| npm `postprocessing` | 源码实际导入的是 three/examples 和本地 passes，未发现该包被引用，不迁入 |
| Sass、sass-loader、Webpack、Capacitor | 不复制旧工程依赖清单；仅按实际迁入页面需要添加依赖，目前探针未新增任何依赖 |

`model_doc.pdf` 不存在于来源 public 清单：迁入页面先去掉无效下载入口，补齐真实文档后再启用。远程 COS 播放／暂停／重置图标可分别以来源 `public/image/play.png`、`pause.png`、`reset.png` 为本地候选；画质按钮可评估 `high.png`、`low.png`，最终外观需页面整合时确认。

## 实测证据

| 项目 | 结果 |
| --- | --- |
| 根路径 `/` 最小生产构建与渲染 | 通过 |
| 子路径 `/Vite-Homepage-24/` 最小生产构建与渲染 | 通过 |
| 模型网格／单帧三角形 | 5 个网格／367,500 个三角形 |
| 非黑像素 | 122,470；另已人工查看截图，确认猫头鹰、纹理与反射可见 |
| WebGL 错误／浏览器错误／资源 404 | 两次探针均为 0 |
| homepage 当前生产构建 | 通过，保存四张桌面／手机首页与 Projects 截图及加载记录 |
| ESLint | 通过 |
| 现有单元测试 | 10/10 通过 |

浏览器和资源证据：[probe-results.json](probe-results.json)、[homepage-baseline.json](homepage-baseline.json)。本次没有运行完整 E2E、实机或 GPU 性能验收；SwiftShader 结果只能证明此环境下基础渲染可用。构建提示存在大于 500 kB 的 chunk，后续按路由懒加载处理，本次不修改首页打包策略。

截图：

- [r147 默认示例：根路径](r147-default-root.png)、[子路径](r147-default-subpath.png)。
- [首页：桌面](home-1440.png)、[手机](home-390.png)。
- [Projects：桌面](projects-1440.png)、[手机](projects-390.png)。

**基线缺口：**来源工程没有 node_modules，本次未安装或引入旧 r136 引擎，因此未取得未经修改的旧查看器运行截图。上述默认示例图是 r147 最小探针，不是旧页面截图，也不能证明自定义后处理与原效果等价。旧版视觉对照保留为待补项；默认模型在目标工具链实际加载的 P2-0 退出条件已满足。

## 下一步与复现

P2-1 可开始迁入页面、注册懒加载路由及命名空间资源。保持 r147；优先完成默认角度、基础渲染及三种输入。非零 HDR 旋转、自定义 SSR／SSAO 等仍需逐项适配，不把探针直接当成完整查看器发布。

使用符合项目要求的 Node，在仓库根目录执行：

```powershell
node scripts/phase2-preflight.mjs E:/Projects/kaiwu-view
npm run lint
npm run test:unit
npm ls three --all
```

脚本需要本机已安装的 Playwright Chromium，临时占用 4186 和 4175 端口，完成后关闭服务器。证据输出固定到本目录，重复执行会更新证据；读取来源工程，仅在当前工程写入探针与报告文件。
