import { Link } from 'react-router-dom';
import { useApp } from '../App';

export default function TagsPage() {
  const { issues = [] } = useApp();

  const tagCount = issues.reduce((acc, issue) => {
    issue.labels.forEach(label => {
      acc[label] = (acc[label] || 0) + 1;
    });
    return acc;
  }, {});

  const tags = Object.entries(tagCount).sort((a, b) => b[1] - a[1]);

  return (
    <div className="blog-list-page">
      <h2>标签</h2>
      {tags.length === 0 ? (
        <div className="empty">暂无标签。</div>
      ) : (
        <div className="tag-list" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {tags.map(([tag, count]) => (
            <Link key={tag} className="tag-pill" to={`/tag/${encodeURIComponent(tag)}`}>
              {tag} ({count})
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
