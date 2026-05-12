import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { rehypeMermaid, MermaidBlock } from 'react-markdown-mermaid';
import { useApp } from '../App';
import CommentsList from '../components/CommentsList';
import CommentForm from '../components/CommentForm';
import TagLink from '../components/TagLink';
import { EmptyState, PostArtwork } from '../components/ui/AuraUI';
import '../pages.css';

export default function BlogPage() {
  const { id: issueNumber } = useParams();
  const { issues, apiBase, owner, repo, user } = useApp();
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);

  const issue = issues.find(i => i.number === Number(issueNumber)) || {
    title: '测试文章',
    body: `
# 测试表格和 Mermaid

## 表格测试

| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 数据1 | 数据2 | 数据3 |
| 数据4 | 数据5 | 数据6 |

## Mermaid 图表测试

\`\`\`mermaid
graph TD
  A[开始] --> B[结束]
\`\`\`
    `,
    created_at: new Date().toISOString(),
    labels: [{ name: 'test' }],
    comments: 0
  };

  useEffect(() => {
    if (issue) fetchComments();
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

  function formatDate(iso) {
    const date = new Date(iso);
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
  }

  if (!issue) {
    return <div className="aura-container"><EmptyState title="文章不存在" description="可能还在从 GitHub 加载，或该 Issue 已被删除。" /></div>;
  }

  return (
    <div className="blog-page aura-page">
      <div className="blog-reading-progress" />
      <header className="article-hero aura-container">
        <Link to="/" className="back-button">← 返回文章列表</Link>
        <div className="article-kicker">
          {(issue.labels[0]) && <TagLink tag={issue.labels[0]} />}
          <span>{formatDate(issue.created_at)}</span>
          <span>{comments.length || issue.comments} 条留言</span>
        </div>
        <h1>{issue.title}</h1>
      </header>

      <div className="article-cover aura-container">
        {/* <PostArtwork large tone="accent" symbol="✦" /> */}
      </div>

      <article className="blog-article aura-container">
        <div className="article-body markdown-body">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeMermaid]}
            components={{
              MermaidBlock
            }}
          >
            {issue.body || ''}
          </ReactMarkdown>
        </div>
        <div className="article-tags">
          {issue.labels.map(label => <TagLink key={label} tag={label} />)}
        </div>
      </article>

      <section className="comments-section aura-container">
        <div className="comments-header">
          <div>
            <p className="section-label">Discussion</p>
          </div>
          <span>{comments.length || issue.comments} 条</span>
        </div>
        {loadingComments ? (
          <div className="loading">加载留言中...</div>
        ) : (
          <>
            <CommentsList issueNumber={issue.number} comments={comments} />
            <CommentForm issueNumber={issue.number} onCommentAdded={fetchComments} />
          </>
        )}
      </section>
    </div>
  );
}
