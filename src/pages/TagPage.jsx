import { useParams } from 'react-router-dom';
import { useApp } from '../App';
import PostCard from '../components/PostCard';
import '../pages.css';

export default function TagPage() {
  const { id: tagName } = useParams();
  const { issues } = useApp();

  const filtered = issues.filter(issue => issue.labels.includes(tagName));

  return (
    <div className="tag-page">
      <div className="page-header">
        <h2>标签：{tagName}</h2>
        <p>{filtered.length} 篇文章</p>
      </div>

      <section className="post-list">
        {filtered.length === 0 ? (
          <div className="empty">该标签下没有文章。</div>
        ) : (
          filtered.map(issue => (
            <PostCard key={issue.number} issue={issue} />
          ))
        )}
      </section>
    </div>
  );
}