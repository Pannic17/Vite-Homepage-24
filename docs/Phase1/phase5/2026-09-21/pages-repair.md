# Pages 自动发布排查

2026-09-21 核对：Pages API 返回 build_type: workflow；master push 已触发工作流。

首个运行 https://github.com/Pannic17/Vite-Homepage-24/actions/runs/35537580592 在端到端测试失败：desktop-chromium 的 20 次路由往返资源释放测试耗尽 90 秒总时限，停止在第 59 行导航点击。其余 102 项通过，18 项按平台条件跳过。build 后续步骤与 deploy 因此跳过，不能把未发布归因于没有触发。

排查时后续运行正在测试，最新运行处于 pending：Pages 的 concurrency 禁止同时发布，属于等待前一运行完成。

修复：仅将 CI 上这项 20 轮 WebGL 压力测试的总预算改为 240 秒，适应托管运行器的软件渲染成本。本机仍为 90 秒，保留全部 20 轮、资源释放和导航断言，不跳过测试，不自动重试掩盖失败。Pages 工作流增加 always 上传浏览器报告、失败截图和 trace，便于定位后续异常。

是否发布成功应以修复提交对应的远端 build/deploy 结果为准。

修复提交 94c6ddd 的远端 build/deploy 已成功，103 项端到端通过、18 项平台条件跳过；桌面 20 轮压力测试实际耗时约 1.8 分钟，超过原 90 秒预算。

上线核对又发现仓库已改名为 Pannic17/Vite-Homepage，Pages 地址变为 /Vite-Homepage/，而产物仍使用旧的 /Vite-Homepage-24/。将 configure-pages 移到发布构建前，并将其 base_path 输出传入 VITE_BASE_PATH，避免仓库改名后资源引用失效。开发与测试的默认路径不变。
