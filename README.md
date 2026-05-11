# RAG 博客

这是一个基于 GitHub Pages 的静态博客网站，文章内容直接来自当前仓库 `newset/rag` 的 Issue。Issue 的 Label 被映射为博客标签，支持：

- 按标签过滤
- 按年月筛选
- Issue 评论作为文章留言
- 登录后可发表评论（通过 GitHub Token 登录）

## 部署

1. 将仓库推送到 GitHub。
2. 在仓库设置中启用 GitHub Pages，选择 `main` 分支根目录作为发布源。
3. 访问 `https://newset.github.io/rag/` 查看博客。

## 目录结构

- `index.html` - 主页面
- `styles.css` - 样式
- `app.js` - 前端逻辑

## 使用说明

1. 打开博客首页，可直接浏览当前仓库的 Issue 文章。
2. 使用标签、年月和搜索框筛选文章。
3. 点击文章标题进入详情页，查看留言。
4. 若要发表评论，请在登录区填写 GitHub Personal Access Token，并点击登录。
5. 登录后可在文章详情页发布留言。
