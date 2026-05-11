import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useApp } from '../App';
import CommentsList from '../components/CommentsList';
import CommentForm from '../components/CommentForm';
import TagLink from '../components/TagLink';
import '../pages.css';

export default function BlogPage() {
  const { id: issueNumber } = useParams();
  const { issues, apiBase, owner, repo, user } = useApp();
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);

  const issue = issues.find(i => i.number === Number(issueNumber));

  useEffect(() => {
    if (issue) {
      fetchComments();
    }
  }, [issue]);

  async function fetchComments() {
    try {
      const url = `${apiBase}/repos/${owner}/${repo}/issues/${issue.number}/comments?per_page=100`;
      const response = await fetch(url);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Failed to load comments:', error);
    } finally {
      setLoadingComments(false);
    }
  }

  function renderMarkdown(text) {
    if (!text) return '';
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/^###\s*(.*)$/gm, '<h3>$1</h3>')
      .replace(/^##\s*(.*)$/gm, '<h2>$1</h2>')
      .replace(/^#\s*(.*)$/gm, '<h1>$1</h1>')
      .replace(/^\s*\*\s+(.*)$/gm, '<li>$1</li>')
      .replace(/\n<li>(.*?)<\/li>/g, '<ul><li>$1</li></ul>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
      .replace(/\n/g, '<br />');
    return html;
  }

  function formatDate(iso) {
    const date = new Date(iso);
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
  }

  if (!issue) {
    return <div className="empty">文章不存在。</div>;
  }

  return (
    <div className="blog-page">
      <article className="blog-article">
        <header className="article-header">
          <h1>{issue.title}</h1>
          <div className="article-meta">
            <span>发布于 {formatDate(issue.created_at)}</span>
            <span>{comments.length} 条留言</span>
          </div>
        </header>

        <div className="article-body" dangerouslySetInnerHTML={{ __html: renderMarkdown(issue.body) }} />

        <div className="article-tags">
          {issue.labels.map(label => (
            <TagLink key={label} tag={label} />
          ))}
        </div>
      </article>

      <section className="comments-section">
        <h2>留言</h2>
        {loadingComments ? (
          <div className="loading">加载留言中...</div>
        ) : (
          <>
            <CommentsList comments={comments} />
            {user ? (
              <CommentForm issue={issue} onCommentAdded={() => fetchComments()} />
            ) : (
              <div className="login-prompt">
                <p>登录后才能发表评论。请在右侧登录。</p>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}