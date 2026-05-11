import { useState, useEffect } from 'react';

export default function CommentsList({ issueNumber, comments, setComments }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!comments || comments.length === 0) {
      loadComments();
    }
  }, [issueNumber]);

  const loadComments = async () => {
    setLoading(true);
    try {
      const token = import.meta.env.VITE_GITHUB_TOKEN;
      const headers = token ? { Authorization: `token ${token}` } : {};
      const response = await fetch(`https://api.github.com/repos/newset/rag/issues/${issueNumber}/comments`, {
        headers
      });
      const data = await response.json();
      setComments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to load comments:', error);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="comment-card"><p>加载评论中...</p></div>;
  }

  if (!comments || !Array.isArray(comments) || comments.length === 0) {
    return <div className="comment-card"><p>暂无评论，快来发表第一个评论。</p></div>;
  }

  return (
    <div id="commentsList">
      {comments.map(comment => (
        <div key={comment.id} className="comment-card">
          <header>
            <span>{comment.user.login}</span>
            <span>{new Date(comment.created_at).toLocaleDateString('zh-CN')}</span>
          </header>
          <p>{comment.body.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br />')}</p>
        </div>
      ))}
    </div>
  );
}