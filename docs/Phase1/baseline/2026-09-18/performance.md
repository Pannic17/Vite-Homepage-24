# Lighthouse 性能基线

2026-09-18；Lighthouse 13.4.1；Windows 本机 Edge 152.0.4191.66（报告 UA 为 HeadlessChrome/152.0.0.0 / Edg/152.0.0.0）。完整报告和时间见同目录 lighthouse/ 与 lighthouse-summary.json。

之前 Chrome 125 的尝试出现第二轮卡住，已停止；此处只汇总完整重跑的三轮 Edge 数据，不把不同浏览器的轮次混合取中位数。

## 固定条件

- 生产构建、localhost HTTP、每次启动独立 browser profile，未复用个人浏览器。
- Lighthouse 默认移动模拟：412×823，DPR 1.75。
- throttlingMethod：simulate；RTT 150ms，吞吐量 1638.4 Kbps，CPU slowdown multiplier 4。
- 此配置与截图所用的 390×844 无节流条件不同；不能直接比较两者的加载时间。
- 首页保持现有 3D 动画、模型和所有脚本，无人为禁用或 mock。
- 无真实访客数据；不提供 INP 达标结论。

## 结果

| 指标 | 第 1 次 | 第 2 次 | 第 3 次 | 中位数 |
| --- | ---: | ---: | ---: | ---: |
| Performance | 72 | 72 | 72 | 72 |
| FCP | 2,103.06 ms | 2,110.86 ms | 2,102.19 ms | 2,103.06 ms |
| LCP | 14,967.59 ms | 14,977.29 ms | 14,965.28 ms | 14,967.59 ms |
| TBT | 126 ms | 119 ms | 123 ms | 123 ms |
| CLS | 0 | 0 | 0 | 0 |
| Accessibility | 100 | 100 | 100 | 100 |
| Best Practices | 100 | 100 | 100 | 100 |
| SEO | 91 | 91 | 91 | 91 |

LCP 元素为首页 `p#m-intro`。约 14.97 秒是模拟网络与 CPU 下的估算；报告的原始 trace 分解与模拟指标使用不同口径，不能将其视为本机真实等待时间，也不能直接证明某一个函数耗时 14 秒。后续应结合 trace 和真机测试确认同步脚本、模型初始化与布局变化各自的影响。

现有 LCP 明显超出 Roadmap 的 2.5 秒拟定目标。后续优先验证“正文先呈现、3D 延后加载”和缩放刷新移除后的收益，而不是只改变打包告警阈值。

Accessibility 100 仅是首页的自动检查结果，不涵盖列表点击 div、缺少 alt、键盘导航、读屏器或完整网站审查。

## 工具选择与复现限制

最终采用 Lighthouse 13.4.1，开发工具要求 Node >=22.19，推荐 Node 24 LTS；放弃旧 Lighthouse 12 是为了不引入额外依赖漏洞。npm 锁文件记录精确安装版本，正式对比应使用相同依赖和浏览器版本。新版浏览器、Lighthouse 或测试主机改变时需要重新建立基线。

参考工具文档：[Playwright 配置](https://playwright.dev/docs/test-configuration)、[Lighthouse 程序化调用](https://github.com/GoogleChrome/lighthouse/blob/main/docs/readme.md)。这些是测量工具说明，本报告中的数值来自本仓库实际运行。
