# 重构前截图索引

24 张全页截图：6 个路由 × 2 种尺寸 × 2 种语言。桌面 1440×900，手机模拟 390×844，DPR 1，Chrome 125。截图包含当前缺陷；没有作为 Playwright 像素断言的 golden snapshot。

3D 动画与随机效果保持运行，后续比对需区分动画帧变化和布局退化。About 的手机全页截图宽度会被溢出内容撑大，这本身就是 B07 的证据。

| 页面 | 桌面英文 | 桌面中文 | 手机英文 | 手机中文 |
| --- | --- | --- | --- | --- |
| 首页 | [查看](screenshots/desktop-en-US-home.png) | [查看](screenshots/desktop-zh-CN-home.png) | [查看](screenshots/mobile-en-US-home.png) | [查看](screenshots/mobile-zh-CN-home.png) |
| Works | [查看](screenshots/desktop-en-US-works.png) | [查看](screenshots/desktop-zh-CN-works.png) | [查看](screenshots/mobile-en-US-works.png) | [查看](screenshots/mobile-zh-CN-works.png) |
| Projects | [查看](screenshots/desktop-en-US-projects.png) | [查看](screenshots/desktop-zh-CN-projects.png) | [查看](screenshots/mobile-en-US-projects.png) | [查看](screenshots/mobile-zh-CN-projects.png) |
| 详情原型 /test | [查看](screenshots/desktop-en-US-test.png) | [查看](screenshots/desktop-zh-CN-test.png) | [查看](screenshots/mobile-en-US-test.png) | [查看](screenshots/mobile-zh-CN-test.png) |
| GCS 详情地址（实际显示错误列表） | [查看](screenshots/desktop-en-US-works-gcs.png) | [查看](screenshots/desktop-zh-CN-works-gcs.png) | [查看](screenshots/mobile-en-US-works-gcs.png) | [查看](screenshots/mobile-zh-CN-works-gcs.png) |
| About | [查看](screenshots/desktop-en-US-about.png) | [查看](screenshots/desktop-zh-CN-about.png) | [查看](screenshots/mobile-en-US-about.png) | [查看](screenshots/mobile-zh-CN-about.png) |
