import { useState } from 'react';
import { useApp } from '../App';

export default function CommentForm({ issueNumber, onCommentAdded }) {
  const { user, token } = useApp();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !token || !content.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`https://api.github.com/repos/newset/rag/issues/${issueNumber}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${token}`,
        },
        body: JSON.stringify({ body: content }),
      });

      if (response.ok) {
        setContent('');
        onCommentAdded && onCommentAdded();
      } else {
        alert('评论发布失败');
      }
    } catch (error) {
      console.error('Failed to post comment:', error);
      alert('评论发布失败');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="comment-form">
        <p>请先登录后再发表评论。</p>
      </div>
    );
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        placeholder="输入评论内容..."
        required
      />
      <button type="submit" disabled={loading || !content.trim()}>
        {loading ? '发布中...' : '发布评论'}
      </button>
    </form>
  );
}