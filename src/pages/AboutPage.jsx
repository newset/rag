import { PageHero, SectionHeader } from '../components/ui/AuraUI';
import '../pages.css';

export default function AboutPage() {
  return (
    <div className="about-page aura-page">
      <PageHero label="About" title="关于这个" highlight="Issue Blog" description="轻量、透明、可迁移：把 GitHub Issue 变成写作、归档、讨论和发布的一体化系统。" />

      <article className="about-article aura-container prose-panel">
        <SectionHeader label="Overview" title="简介">
          这是一个基于 GitHub Issue 的轻量级博客系统，所有文章都存储在 GitHub Issue 中。
        </SectionHeader>

        <section className="feature-strip">
          {[
            ['📝', '文章管理', '直接使用 GitHub Issue 发布和编辑文章'],
            ['🏷️', '标签系统', '使用 Issue Label 进行分类'],
            ['🔍', '搜索筛选', '按标签、年月、关键词快速查询'],
            ['💬', '评论功能', '使用 GitHub Issue 评论系统'],
          ].map(([icon, title, desc]) => (
            <div className="mini-feature" key={title}>
              <span>{icon}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
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
            <li>填写 GitHub Personal Access Token</li>
            <li>Token 需要 <code>public_repo</code> 或 <code>repo</code> 权限</li>
            <li>登录后可在文章下发表评论</li>
          </ol>
        </section>

        <section>
          <h2>开源</h2>
          <p>源代码位于 <a href="https://github.com/newset/rag" target="_blank" rel="noreferrer">GitHub 仓库</a>。欢迎提交 Issue 或 Pull Request。</p>
        </section>
      </article>
    </div>
  );
}
