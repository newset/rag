import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { useApp } from '../App';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';
import { EmptyState } from '../components/ui/AuraUI';
import '../pages.css';

const ITEMS_PER_PAGE = 10;

export default function TagPage() {
  const { id: tagName } = useParams();
  const { issues } = useApp();
  const [currentPage, setCurrentPage] = useState(1);
  const filtered = issues.filter(issue => issue.labels.includes(tagName));
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="tag-page aura-page">
      <header className="tag-hero aura-container">
        <Link to="/tags" className="back-button">← 返回标签云</Link>
        <span className="aura-tag">标签</span>
        <h1>{tagName}</h1>
        <p>{filtered.length} 篇文章正在这个主题下形成上下文。</p>
      </header>
      <section className="post-list post-grid aura-container">
        {filtered.length === 0 ? (
          <EmptyState title="该标签下没有文章" description="换一个标签看看。" />
        ) : (
          <>
            {paginatedItems.map(issue => <PostCard key={issue.number} issue={issue} />)}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </>
        )}
      </section>
    </div>
  );
}
