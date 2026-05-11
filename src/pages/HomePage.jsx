import '../App.css';

import { useState, useEffect } from 'react';
import { useApp } from '../App';
import LoginCard from '../components/LoginCard';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';

const ITEMS_PER_PAGE = 10;

export default function HomePage() {
  const { issues, loading } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    filterIssues();
    setCurrentPage(1); // Reset to first page when filters change
  }, [issues, searchQuery, selectedTag, selectedMonth]);

  function collectTags() {
    const tags = new Set();
    issues.forEach(issue => issue.labels.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort((a, b) => a.localeCompare(b, 'zh-CN'));
  }

  function collectMonths() {
    const months = new Set();
    issues.forEach(issue => {
      const date = new Date(issue.created_at);
      months.add(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`);
    });
    return Array.from(months).sort((a, b) => b.localeCompare(a));
  }

  function filterIssues() {
    let result = issues;

    if (selectedTag) {
      result = result.filter(issue => issue.labels.includes(selectedTag));
    }

    if (selectedMonth) {
      result = result.filter(issue => {
        const date = new Date(issue.created_at);
        const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        return month === selectedMonth;
      });
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(issue => {
        const haystack = `${issue.title} ${issue.body}`.toLowerCase();
        return haystack.includes(q);
      });
    }

    setFiltered(result);
  }

  const tags = collectTags();
  const months = collectMonths();

  return (
    <div className="home-page">
      <section className="toolbar">
        <div className="filter-row">
          <div className="filter-item">
            <label htmlFor="searchInput">搜索</label>
            <input
              id="searchInput"
              type="search"
              placeholder="标题或内容搜索"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="filter-item">
            <label htmlFor="tagSelect">标签</label>
            <select
              id="tagSelect"
              value={selectedTag}
              onChange={e => setSelectedTag(e.target.value)}
            >
              <option value="">全部标签</option>
              {tags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
          <div className="filter-item">
            <label htmlFor="monthSelect">年月</label>
            <select
              id="monthSelect"
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
            >
              <option value="">全部年月</option>
              {months.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <div className="content-grid">
        <section className="post-list">
          {loading ? (
            <div className="loading">加载中...</div>
          ) : filtered.length === 0 ? (
            <div className="empty">没有符合条件的文章。</div>
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

        <aside className="side-panel">
          <LoginCard />
          <div className="card help-card">
            <h2>使用说明</h2>
            <ul>
              <li>文章来源：当前仓库 Issue（排除 PR）。</li>
              <li>标签来源：Issue label。</li>
              <li>留言使用 GitHub Issue 评论，需要登录并提供 Token。</li>
              <li>选择文章后可查看评论和发布新留言。</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}