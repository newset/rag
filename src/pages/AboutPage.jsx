import '../pages.css';

export default function AboutPage() {
  return (
    <div className="about-page">
      <article className="about-article">
        <h1>关于本博客</h1>
        
        <section>
          <h2>简介</h2>
          <p>这是一个基于 GitHub Issue 的轻量级博客系统，所有文章都存储在 GitHub Issue 中。</p>
        </section>

        <section>
          <h2>特性</h2>
          <ul>
            <li>📝 文章管理：直接使用 GitHub Issue 发布和编辑文章</li>
            <li>🏷️ 标签系统：使用 Issue Label 进行分类</li>
            <li>🔍 搜索和筛选：按标签、年月、关键词快速查询</li>
            <li>💬 评论功能：使用 GitHub Issue 评论系统，支持登录后发表评论</li>
            <li>🚀 自动部署：通过 GitHub Actions 自动部署到 GitHub Pages</li>
          </ul>
        </section>

        <section>
          <h2>技术栈</h2>
          <ul>
            <li><strong>前端：</strong> React + React Router + Vite</li>
            <li><strong>API：</strong> GitHub REST API</li>
            <li><strong>部署：</strong> GitHub Pages + GitHub Actions</li>
          </ul>
        </section>

        <section>
          <h2>如何使用</h2>
          <h3>发布文章</h3>
          <ol>
            <li>在 <a href="https://github.com/newset/rag" target="_blank" rel="noreferrer">GitHub 仓库</a> 中创建一个新的 Issue</li>
            <li>Issue 标题作为文章标题</li>
            <li>Issue 内容作为文章正文（支持 Markdown）</li>
            <li>添加 Label 作为文章标签</li>
            <li>保存后博客会自动更新</li>
          </ol>

          <h3>发表评论</h3>
          <ol>
            <li>点击文章查看详情页</li>
            <li>在右侧登录区填写 GitHub Personal Access Token</li>
            <li>Token 需要 <code>public_repo</code> 或 <code>repo</code> 权限</li>
            <li>登录后可在文章下发表评论</li>
          </ol>
        </section>

        <section>
          <h2>获取 GitHub Token</h2>
          <ol>
            <li>访问 <a href="https://github.com/settings/tokens" target="_blank" rel="noreferrer">GitHub Token 设置</a></li>
            <li>点击 "Generate new token" → "Generate new token (classic)"</li>
            <li>填写 Token 名称（如 "rag-blog"）</li>
            <li>在 "Select scopes" 中勾选 <code>public_repo</code> 或 <code>repo</code></li>
            <li>点击 "Generate token" 并复制保存</li>
            <li>在博客登录表单中粘贴 Token</li>
          </ol>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            ⚠️ Token 仅在这个页面存储于浏览器本地，不会上传到服务器。
          </p>
        </section>

        <section>
          <h2>开源</h2>
          <p>
            本项目是开源的，源代码在 
            <a href="https://github.com/newset/rag" target="_blank" rel="noreferrer"> GitHub 仓库</a> 中。
            有任何问题或建议，欢迎提交 Issue 或 Pull Request。
          </p>
        </section>
      </article>
    </div>
  );
}