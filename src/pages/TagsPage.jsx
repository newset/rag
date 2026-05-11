import { Link } from 'react-router-dom';
import { useApp } from '../App';
import { EmptyState, PageHero } from '../components/ui/AuraUI';
import '../pages.css';

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
    <div className="tags-page aura-page">
      <PageHero label="Tags" title="所有主题" highlight="一览无余" description="按 Issue Label 自动聚合的主题索引，快速进入感兴趣的知识脉络。" />
      <div className="aura-container">
        {tags.length === 0 ? (
          <EmptyState title="暂无标签" description="文章同步完成后会自动生成标签云。" />
        ) : (
          <div className="tag-cloud">
            {tags.map(([tag, count], index) => (
              <Link key={tag} className="tag-cloud-item" style={{ '--tag-index': index }} to={`/tag/${encodeURIComponent(tag)}`}>
                <span>{tag}</span>
                <strong>{count}</strong>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
