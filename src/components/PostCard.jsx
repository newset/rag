import { Link } from 'react-router-dom';
import '../pages.css';

export default function PostCard({ issue }) {
  function formatDate(iso) {
    const date = new Date(iso);
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
  }

  function extractText(markdown) {
    return markdown
      .replace(/\n{2,}/g, ' ')
      .replace(/[#>*`\-_\[\]\(\)]/g, '')
      .trim();
  }

  const excerpt = extractText(issue.body).slice(0, 160) + (issue.body.length > 160 ? '…' : '');

  return (
    <article className="post-card">
      <Link to={`/blog/${issue.number}`} className="post-card-link">
        <h3>{issue.title}</h3>
        <p>{excerpt || '无正文内容，点击查看详情。'}</p>
      </Link>
      <div className="post-meta">
        <span>{formatDate(issue.created_at)}</span>
        <span>{issue.comments} 条留言</span>
        {issue.labels.map(label => (
          <Link key={label} to={`/tag/${encodeURIComponent(label)}`} className="tag-pill">
            {label}
          </Link>
        ))}
      </div>
    </article>
  );
}