import { Link } from 'react-router-dom';
import { PostArtwork } from './ui/AuraUI';
import '../pages.css';

const tones = ['accent', 'teal', 'coral', 'amber'];
const symbols = ['✦', '⌘', '◈', '◎'];

export default function PostCard({ issue }) {
  function formatDate(iso) {
    const date = new Date(iso);
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
  }

  function extractText(markdown = '') {
    return markdown.replace(/\n{2,}/g, ' ').replace(/[#>*`\-_\[\]\(\)]/g, '').trim();
  }

  const excerpt = extractText(issue.body).slice(0, 160) + (issue.body.length > 160 ? '…' : '');
  const tone = tones[issue.number % tones.length];
  const symbol = symbols[issue.number % symbols.length];
  const primaryTag = issue.labels[0] || 'Article';

  return (
    <article className="post-card aura-blog-card">
      <Link to={`/blog/${issue.number}`} className="post-card-link" aria-label={`阅读 ${issue.title}`}>
        <PostArtwork tone={tone} symbol={symbol} />
        <div className="post-card-body">
          <div className="post-kicker">
            <span className="tag-pill">{primaryTag}</span>
            <span>{formatDate(issue.created_at)}</span>
          </div>
          <h3>{issue.title}</h3>
          <p>{excerpt || '无正文内容，点击查看详情。'}</p>
        </div>
      </Link>
      <div className="post-meta">
        <span>{issue.comments} 条留言</span>
        {issue.labels.slice(0, 4).map(label => (
          <Link key={label} to={`/tag/${encodeURIComponent(label)}`} className="tag-pill">
            {label}
          </Link>
        ))}
      </div>
    </article>
  );
}
