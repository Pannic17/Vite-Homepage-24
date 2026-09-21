# P2-3：3D 生命周期与性能

验证日期：2026-09-21；交付整理：2026-09-22。基础查看器生命周期与按需渲染已完成；保持 Three.js `0.147.0`，未推送或发布。

## 实现

- 创建场景时深拷贝配置，renderer、scene、camera、controls、纹理与观察器均由当前实例持有。
- 静止时仅在加载、尺寸改变、交互或重置后绘制；播放时持续绘制。后台取消 RAF，回到前台按播放状态恢复，不再后台空转。
- 卸载、初始化失败、加载失败或上下文丢失均走幂等清理：取消 RAF、解绑 visibility/context/controls 事件、disconnect ResizeObserver、释放模型几何体／材质／纹理、PMREM render target、controls 和 renderer，并释放图形上下文、移除 canvas。
- 记录加载器创建的纹理，失败时也清理；迟到的 HDR、glTF 和纹理回调只释放资源，不启动新渲染。Three.js 子资源请求可能继续完成，采用过期结果隔离，不声称所有底层请求均可中止。
- 使用查看器实例内的 TextureLoader 为 glTF 解码图片，不修改 `window.createImageBitmap`，不影响 homepage 的加载器。浏览器测试验证加载前后该全局函数身份不变。
- WebGL 不可用或上下文丢失时展示中英文说明、重试和返回入口。未启用 GUI／高级后处理，因此没有迁入旧工程的 GUI 和 passes 常驻资源。

## 生命周期验证

[生命周期测试记录](lifecycle-tests.json)：桌面与移动 Chromium 共 6 项通过。

1. 每个视口反复进入／离开 3 次：退出后 canvas／GUI 为 0、待执行 RAF 为 0，visibility 监听和 ResizeObserver 恢复至进入前数量，所有旧 WebGL context 均处于 lost 状态。
2. 静止状态无待执行帧；播放时绘制，模拟后台 visibility 后计数停止，恢复前台后继续。最后返回 homepage，首页模型仍正常 ready，只有一个 canvas。
3. 延迟模型 BIN 请求，导航离开后才放行：不会重建 canvas 或 RAF，重新进入可用。
4. 模拟所有 WebGL context 名称不可用，再恢复后重试；主动触发 context loss，再重试。两种路径均显示明确回退并恢复。

首次回退测试漏拦截 r147 的 `experimental-webgl` 入口，实际成功创建了兼容 context，因而测试失败；修正测试覆盖范围后通过。未以修改产品行为绕过失败。

`npm run check` 的 Lint、13 项单元测试、生产构建通过；新增测量脚本也通过 Lint。配置与输入回归、首页后台暂停复测共 8 项通过，见 [回归测试记录](regression-tests.json)。

## 三轮性能采样

由 [measure-kaiwu.mjs](../../../../scripts/measure-kaiwu.mjs) 在同一当前依赖环境下构建归档版本与工作区，各场景使用三个独立浏览器 context。homepage 迁移前版本为 `653fee2`，查看器本步前版本为 `3c9db7f`。完整资源列表、截图和中位数见 [performance.json](performance.json)。

| 场景 | JS gzip 估算（字节） | 全部资源编码体积（字节） | 就绪时间中位数 | 500 ms 观察窗口内 RAF 回调 |
| --- | ---: | ---: | ---: | ---: |
| 迁移前首页静态 | 75,502 | 86,787 | 33.9 ms | 0 |
| 当前首页静态 | 77,818 | 89,105 | 49.9 ms | 0 |
| 迁移前首页动画 | 209,213 | 2,814,456 | 201.0 ms | 31 |
| 当前首页动画 | 213,157 | 2,818,298 | 247.7 ms | 17 |
| 当前 Kaiwu 配置页 | 79,829 | 133,242 | 39.7 ms | 0 |
| P2-2 查看器（未播放） | 210,902 | 19,180,233 | 1,534.4 ms | 4 |
| 当前查看器（未播放） | 211,457 | 19,180,787 | 1,936.9 ms | 0 |

这些是本机无网络限速的 headless Chromium 结果。就绪时间不是 LCP，RAF 数不是 GPU 帧率，gzip 为文件计算值。两次测量的耗时与首页回调数量有波动，本轮并未证明加载提速，也不将它们推广为真实设备性能。

可确定的变化：首页静态 JS gzip 相比迁移前增加 2,316 字节（约 3.1%），动画模式增加 3,944 字节（约 1.9%）；首页和配置页均没有请求 Kaiwu 模型／HDR，配置页也没有加载 scene chunk。查看器未播放时从持续调度变为 0 个空闲回调。基础示例请求仍约 19.18 MB，模型压缩／减面需要额外画质与设备验证，本步未擅自修改原资源。

截图：[当前查看器](after-kaiwu-viewer.png)、[本步前查看器](previous-kaiwu-viewer.png)、[迁移前静态首页](before-home-static.png)、[当前静态首页](after-home-static.png)。默认模型截图已检查，材质与模型可见。

## 边界与下一步

- 本次仪器检查覆盖上下文释放、DOM、监听、观察器与调度；不是 JS heap／驱动显存长期压力测试。iOS Safari、Android 真机仍在 P2-4 验收。
- 非零 HDR 旋转、旧自定义 SSR／SSAO 等高级效果继续明确提示未支持，未在缺少兼容与画质证据时启用。此结论不能当成旧版完整效果等价。
- P2-3 退出条件针对当前基础查看器已满足；P2-4 继续完整回归、实机和发布验证。

复现：使用 Node.js 24.19.0 执行 `node scripts/measure-kaiwu.mjs`；脚本将历史源码展开到被忽略的 `.kaiwu-measure.local/`，只链接当前 node_modules，使用 4187 端口，不安装第二个 Three.js 版本。生命周期测试使用 `npx playwright test kaiwu-lifecycle.spec.js --project=desktop-chromium --project=mobile-chromium`。
