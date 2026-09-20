# 内容与语言维护

## 新增或修改作品

`src/content/portfolio.js` 是列表和详情的内容入口；`src/lang/en.js`、`src/lang/cn.js` 保存文案。`works`／`projects` 按 catalog 中的原始顺序展示。技术名、品牌名可以在两种语言中保持原名。

每条内容提供稳定 `id`、`collection`、`titleKey`、`introKey`、`cover`、`categoryKey`、`tags`、`dateKey` 和单一 `destination`。`introKey: null` 表示没有完整介绍，页面显示待补充提示；不要用编造的正文填空。

导航有三种互斥状态：

```js
{kind: 'none'}
{kind: 'external', href: 'https://example.com/project'}
{kind: 'internal', to: '/works/example'}
```

站内详情再提供 `detail`：

```js
detail: {
  path: '/works/example',
  parent: '/works',
  paragraphKeys: ['detail.example.overview'],
  status: 'complete', // 正文尚未提供时用 pending，paragraphKeys 留空
}
```

通用 `ProjectDetail` 使用相同封面、标题、分类、日期和标签。详情路由与静态 HTML 入口自动从数据生成，无需新增 Vue 页面或手工修改路由表。旧 `/works/gcs` 保留。新增后运行 `npm run test:unit` 和 `npm run test:static` 检查翻译 key、资源、目标路由与深链接。

public 资源使用 `image/…` 形式，不拼接部署前缀；渲染时由 `publicAsset` 处理 BASE_URL。标签中技术名称用字符串，可翻译标签用 `{key: 'tags.installment'}`。共享 `TagList` 负责在列表与详情中一致显示。

Kaiwu 的海报、功能链接和文案 key 也在 catalog 中；特殊的海报布局仍由 `KaiwuSection` 渲染。`src/content/profile.js` 集中维护官网和联系方式；Home、About 复用 `ProfileIdentity` 与 `ContactLinks`。

## 语言状态

唯一状态是 `i18n.global.locale`，仅支持 `en-US`／`zh-CN`。启动时优先使用有效的 `localStorage.locale`；否则中文浏览器使用中文，其他语言回退英文。读取或写入存储受限时，应用仍可启动和在当前页面切换语言。

切换后同步存储、`html.lang` 和页面标题；路由变化也更新标题。翻译缺项回退英文，两种语言 key 的一致性由单元测试验证。新增文案应同时补充中英文，不能依赖缺项回退作为正常内容。

## 开发页与缺失内容

- TEST 入口和 `/test` 路由只在 Vite 开发模式可用；生产环境不生成 `/test/index.html`，静态托管直达时返回 HTTP 404，应用显示可返回首页的 404 页。
- Vite preview 本身的 SPA 回退可能返回 HTTP 200，因此 HTTP 状态验证使用 `test:static` 的普通文件服务器。
- GCS 已有介绍保留，详细正文仍显示待整理。
- Resonance 原介绍只有 `An `，不构成可展示的完整句子；与原本空白的 Anybody Problem、SPLIT!、AI Tester 一起标记介绍待补充，原有外链保留。
- Kaiwu 多个功能链接原本均指向同一 3D viewer。迁移保留这些 URL，没有替用户猜测其他地址；需要补充具体目标时修改 catalog。
- About 的学历、角色、介绍和联系方式均来自原首页，没有添加未提供的经历。

本阶段已删除无引用的 `MenuSection` 兼容层、`AniButtom`、模板组件、旧 GCS 专用视图及 22 个不可达的实验效果／shader 文件。未使用的拼写错误组件直接删除，不创建无用途的替代组件。可在 `codex/phase-3-checkpoint` 查看阶段 2 原实现。
