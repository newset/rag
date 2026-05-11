import { useState, useEffect } from 'react';
import { useApp } from '../App';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import { EmptyState, PageHero } from '../components/ui/AuraUI';
import '../pages.css';

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
    setCurrentPage(1);
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

    if (selectedTag) result = result.filter(issue => issue.labels.includes(selectedTag));
    if (selectedMonth) {
      result = result.filter(issue => {
        const date = new Date(issue.created_at);
        const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        return month === selectedMonth;
      });
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(issue => `${issue.title} ${issue.body}`.toLowerCase().includes(q));
    }

    setFiltered(result);
  }

  const tags = collectTags();
  const months = collectMonths();
  const totalComments = issues.reduce((sum, issue) => sum + (issue.comments || 0), 0);

  return (
    <div className="home-page aura-page">
      <PageHero
        label="GitHub Issue Blog"
        title="记录想法、代码"
        highlight="与长期知识"
        description="一个以 Issue 为数据库的个人内容系统：文章、标签、评论和后台管理，都统一在 Aura 暗色组件语言中。"
      >
        <div className="home-stats">
          <div><strong>{issues.length}</strong><span>篇文章</span></div>
          <div><strong>{tags.length}</strong><span>个标签</span></div>
          <div><strong>{totalComments}</strong><span>条留言</span></div>
        </div>
      </PageHero>

      <div className="aura-container page-stack">
        <section className="toolbar aura-filter-panel">
          <div className="filter-row">
            <div className="filter-item">
              <label htmlFor="searchInput">搜索</label>
              <input id="searchInput" type="search" placeholder="标题或内容搜索" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            <div className="filter-item">
              <label htmlFor="tagSelect">标签</label>
              <select id="tagSelect" value={selectedTag} onChange={e => setSelectedTag(e.target.value)}>
                <option value="">全部标签</option>
                {tags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
              </select>
            </div>
            <div className="filter-item">
              <label htmlFor="monthSelect">年月</label>
              <select id="monthSelect" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
                <option value="">全部年月</option>
                {months.map(month => <option key={month} value={month}>{month}</option>)}
              </select>
            </div>
          </div>
        </section>

        <section className="post-list post-grid">
          {loading ? (
            <Loading />
          ) : filtered.length === 0 ? (
            <EmptyState title="没有符合条件的文章" description="换个关键词、标签或月份再试试。" />
          ) : (
            <>
              {(() => {
                const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
                const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
                const paginatedItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
                return (
                  <>
                    {paginatedItems.map(issue => <PostCard key={issue.number} issue={issue} />)}
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                  </>
                );
              })()}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
