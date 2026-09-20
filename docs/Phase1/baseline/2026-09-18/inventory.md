# 页面、内容与链接清单

## 路由

所有站内路径当前以 `/Vite-Homepage-24/` 为部署前缀。

| 路径 | 定位 | 当前内容/状态 | 保留要求 |
| --- | --- | --- | --- |
| `/` | 正式首页 | 身份介绍、语言、社交、导航、3D、公开 TEST 按钮 | 保留身份、视觉主题与社交目标 |
| `/about` | 正式入口、内容未完成 | 标题与 UNDER CONSTRUCTION | 后续填充真实内容，保留 URL |
| `/works` | 正式作品列表 | 8 个作品卡片 | 保留作品顺序、媒体、现有外链 |
| `/projects` | 正式项目列表 | Kaiwu 特殊展示 + 6 个项目卡片 | 保留既有内容与分类 |
| `/works/gcs` | 已声明的详情、当前失效 | 仍显示列表，8 张破图；GCS 源码仅详情框架 | 修复路由与实际内容，不删除旧入口 |
| `/test` | 原型/测试页 | Test Page 头部、200vh 灰色占位 | 后续与正式站入口分离 |
| 未知路径 | 未定义 | 源码无 catch-all 路由 | 后续增加明确 404 |

本地 preview 可回退到 HTML，不代表 GitHub Pages 线上直达与刷新已经通过。当前阶段没有更改任何 URL。

## 作品与项目

| 页面 | 名称 | 链接/详情 | 缺失或注意事项 |
| --- | --- | --- | --- |
| Works | CatNet | 未配置 | 无详情目标 |
| Works | Chronoscape | 卡片未绑定 `/works/gcs` | 已声明的路由也未正确渲染 |
| Works | O Galaxy | 未配置 | 介绍硬编码中文 |
| Works | PokemonPad | `https://pannic17.github.io/C1-Final/` | 介绍硬编码中文 |
| Works | Resonance | `https://github.com/Pannic17/PCOMP-Final-Resonance/` | 介绍仅 `An `，内容不完整 |
| Works | AI Shijing Paintings | `https://github.com/Pannic17/C3-Final` | 英文硬编码介绍 |
| Works | Ai, Art & hAsh | `https://github.com/Pannic17/C2-Final` | 英文长介绍 |
| Works | Anybody Problem | 未配置 | intro 为空 |
| Projects | 开物 KaiwuArt | `https://kaiwuart.cn/`、`https://kaiwuart.cn/3d-viewer` | Details 按钮仅日志；多个不同产品入口实际指向同一 URL |
| Projects | 状元街区 / Miniature Mansion | 未配置 | 中英文介绍存在，详情缺失 |
| Projects | 比恋 AI / Bilian AI | 未配置 | 中英文介绍存在，详情缺失 |
| Projects | SPLIT! | 未配置 | intro 为空 |
| Projects | Homepage | 未配置 | 中英文介绍存在 |
| Projects | CCI Coursework | 未配置 | 中英文介绍存在 |
| Projects | AI Tester | 未配置 | intro 为空，标为开发中 |

## 外链可达性

2026-09-18 本机 Node fetch 探测，GET、允许重定向、每条最长 12 秒。详细时间见 external-links.json。

| 目标 | 结果 | 结论 |
| --- | --- | --- |
| PokemonPad GitHub Pages | HTTP 200 | HTTP 可达，不代表游戏功能已测 |
| GitHub 个人页 | 超时 | 未确认，不能判死链 |
| GitHub 三个作品仓库 | 连接失败 | 未确认，不能判死链 |
| Kaiwu 首页及 3D viewer | 连接失败 | 未确认，需有网络条件时人工复核 |
| Instagram | 连接失败 | 未确认，可能受访问条件影响 |
| `mailto:pannic1984@outlook.com` | 仅验证 DOM 链接存在 | 未发送邮件或验证邮箱收信 |

## 资源

- public 25 个文件，含模型、图片、图标和 PDF；大小明细见 assets.json。
- 所有 24 个页面样本均记录实际图片 URL、解码成功与否及 alt。
- `/works` 与 `/projects` 的列表图片在本地生产子路径测试中正常；`/works/gcs` 的 8 张封面错误寻址至 `works/image/`。
- 无资源删除。`eevee.gltf`、PDF、模板图标等是否仍需保留，须在后续清理阶段确认引用与业务需求。
- `dist` 中仍有 6 个被 Git 跟踪的文件，此阶段使用单独构建目录，不修改部署策略。
