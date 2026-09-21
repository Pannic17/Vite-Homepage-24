# P2-1：页面、路由与资源迁入

日期：2026-09-21。已完成站内页面和基础查看器迁入，未部署。

## 页面与实现

- `/projects/kaiwu`：由来源 Home 页面迁入模型 URL、远程 JSON、本地 JSON 三种入口，增加默认示例和明确的首页／Projects 导航。
- `/projects/kaiwu/viewer`：基础 r147 查看器，支持模型旋转缩放、自动旋转、暂停、重置和加载失败提示。
- 路由使用 homepage 的 History 路由和懒加载；两个页面均生成真实静态 HTML 入口，并预加载对应页面 chunk。3D 模块继续动态加载，配置页不加载模型或 HDR。
- `src/features/kaiwu/` 将来源 ThreeHelper／CameraHelper／InitHelper 的必要基础流程适配为实例化模块；使用 r147 GLTFLoader、RGBELoader、OrbitControls 和官方 PMREM，没有复制旧引擎或原生 App 构建链。
- 页面使用局部样式类，无嵌套 body 和原工程全局 CSS；基础文案接入现有双语状态。P2-2 继续完善整体文案和链接。
- `public/kaiwu/` 包含猫头鹰模型、BIN、15 张纹理、默认 HDR、Logo、背景及基础示例配置，共 21 个文件、19,708,891 字节。保留 glTF 相对引用，不依赖来源工程目录运行。
- 内置地址尊重 BASE_URL；远程 JSON 相对资源以最终响应 URL 解析。本地 JSON 的旧 `/model/`、`/hdr/`、`/image/` 地址映射到站内 Kaiwu 资源目录。
- 本地 JSON 使用 sessionStorage 传递，刷新可恢复；解析或存储不可用时显示错误，不将整份 JSON 放入 URL。

默认部署入口分别为 `/Vite-Homepage-24/projects/kaiwu` 和 `/Vite-Homepage-24/projects/kaiwu/viewer`。示例 JSON 为 `/Vite-Homepage-24/kaiwu/default.json`。

## 验证

- `npm run check`：Lint、12 项单元测试及生产构建通过。
- `scripts/check-static-host.mjs`：根路径和 `/Vite-Homepage-24/` 共 18 项路由检查通过；新增页面直接打开、刷新、正确预加载和查看器 ready 状态均通过。检查使用普通静态文件服务器，无 SPA 成功状态重写。
- 新增浏览器用例覆盖桌面／移动端的轻量配置页、默认示例、刷新、播放／重置、退出导航、本地配置恢复、错误参数，以及模型 URL 和远程 JSON 相对资源解析；执行结果见 [browser-tests.json](browser-tests.json)。
- 人工检查移动端配置页与查看器截图，页面无横向溢出，模型实际显示。
- `npm ls three --all` 仍仅有 `three@0.147.0`。未修改 package.json 或 package-lock.json。

证据：[静态托管报告](static-host.json)、[桌面配置页](desktop-kaiwu-home.png)、[桌面查看器](desktop-kaiwu-viewer.png)、[手机配置页](mobile-kaiwu-home.png)、[手机查看器](mobile-kaiwu-viewer.png)。

## 后续边界

本次没有切换 Projects 或身份介绍中的旧外链；按路线图在 P2-2 统一替换。源 Jump 页面无实际功能，未建立空白页面。

自定义后处理、非零 HDR 旋转、旧 GUI 和自定义灯光编辑尚未迁入。对于配置中开启高级后处理或非零 HDR 旋转的情况，当前明确报错；基础示例配置关闭这些功能。原 `2.json` 含高级配置，未直接作为可用示例发布。当前不宣称支持旧配置所有字段或达到旧查看器完整效果等价。

已加入基础 RAF、controls、观察器、GPU 资源释放和异步卸载保护；P2-3 仍需系统验证生命周期、后台暂停策略、设备性能和高级效果。没有完成实机、完整浏览器矩阵或线上发布验收。
