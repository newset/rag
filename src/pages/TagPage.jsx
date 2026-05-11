import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useApp } from '../App';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';
import '../pages.css';

const ITEMS_PER_PAGE = 10;

export default function TagPage() {
  const { id: tagName } = useParams();
  const { issues } = useApp();
  const [currentPage, setCurrentPage] = useState(1);

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
          <>
            {(() => {
              const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
              const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
              const endIndex = startIndex + ITEMS_PER_PAGE;
              const paginatedItems = filtered.slice(startIndex, endIndex);

              return (
                <>
                  {paginatedItems.map(issue => (
                    <PostCard key={issue.number} issue={issue} />
                  ))}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </>
              );
            })()}
          </>
        )}
      </section>
    </div>
  );
}