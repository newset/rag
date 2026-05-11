# RAG 博客

这是一个基于 React + Vite 的博客网站，文章内容直接来自当前仓库 `newset/rag` 的 Issue。Issue 的 Label 被映射为博客标签，支持：

- 按标签过滤
- 按年月筛选
- Issue 评论作为文章留言
- 登录后可发表评论（通过 GitHub Token 登录）

## 环境配置

1. 复制 `.env` 文件并配置 GitHub Personal Access Token：
   ```bash
   cp .env .env.local
   ```

2. 编辑 `.env.local` 文件，设置你的 GitHub Token：
   ```
   VITE_GITHUB_TOKEN=your_github_personal_access_token_here
   ```

   **注意：** Token 需要 `public_repo` 权限用于读取仓库数据。

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 部署

1. 将仓库推送到 GitHub。
2. 在仓库设置中启用 GitHub Pages，选择 `gh-pages` 分支作为发布源。
3. 访问 `https://newset.github.io/rag/` 查看博客。

## 目录结构

```
src/
├── components/     # 可复用组件
├── pages/         # 页面组件
├── App.jsx        # 主应用组件
├── main.jsx       # 应用入口
├── index.css      # 全局样式
├── App.css        # 应用样式
└── pages.css      # 页面样式
```

## 使用说明

1. 打开博客首页，可直接浏览当前仓库的 Issue 文章。
2. 使用标签、年月和搜索框筛选文章。
3. 点击文章标题进入详情页，查看留言。
4. 若要发表评论，请在登录区填写 GitHub Personal Access Token，并点击登录。
5. 登录后可在文章详情页发布留言。
