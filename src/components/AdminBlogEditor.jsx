import { useState, useEffect } from 'react';
import { useApp } from '../App';

export default function AdminBlogEditor({ token }) {
  const { issues } = useApp();
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [labels, setLabels] = useState([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (selectedIssue) {
      setTitle(selectedIssue.title);
      setBody(selectedIssue.body);
      setLabels(selectedIssue.labels);
    }
  }, [selectedIssue]);

  const handleSave = async () => {
    if (!selectedIssue || !token) return;

    setSaving(true);
    try {
      const response = await fetch(
        `https://api.github.com/repos/newset/rag/issues/${selectedIssue.number}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${token}`,
          },
          body: JSON.stringify({
            title,
            body,
            labels: labels.map(label => typeof label === 'string' ? label : label.name),
          }),
        }
      );

      if (!response.ok) {
        throw new Error('保存失败，请检查权限。');
      }

      setMessage('保存成功！');
      setTimeout(() => setMessage(''), 2000);
    } catch (error) {
      setMessage(`保存失败: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleAddLabel = (e) => {
    const newLabel = e.target.value.trim();
    if (newLabel && !labels.includes(newLabel)) {
      setLabels([...labels, newLabel]);
      e.target.value = '';
    }
  };

  const handleRemoveLabel = (label) => {
    setLabels(labels.filter(l => l !== (typeof label === 'string' ? label : label.name)));
  };

  return (
    <div className="blog-editor">
      <div className="editor-sidebar">
        <h2>选择文章</h2>
        <div className="issues-list">
          {issues.map(issue => (
            <div
              key={issue.number}
              className={`issue-item ${selectedIssue?.number === issue.number ? 'active' : ''}`}
              onClick={() => setSelectedIssue(issue)}
            >
              <div className="issue-title">{issue.title}</div>
              <div className="issue-number">#{issue.number}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="editor-main">
        {selectedIssue ? (
          <>
            <div className="editor-header">
              <h2>编辑文章</h2>
              <button onClick={handleSave} disabled={saving} className="save-button">
                {saving ? '保存中...' : '保存'}
              </button>
            </div>

            {message && (
              <div className={`message ${message.includes('成功') ? 'success' : 'error'}`}>
                {message}
              </div>
            )}

            <div className="editor-form">
              <div className="form-group">
                <label htmlFor="title">标题</label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="文章标题"
                />
              </div>

              <div className="form-group">
                <label htmlFor="body">内容 (Markdown)</label>
                <textarea
                  id="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="使用 Markdown 格式编写内容"
                  rows={20}
                />
              </div>

              <div className="form-group">
                <label htmlFor="labels">标签</label>
                <div className="labels-input">
                  <input
                    id="labels"
                    type="text"
                    placeholder="输入标签，按 Enter 添加"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddLabel(e);
                      }
                    }}
                  />
                  <div className="labels-list">
                    {labels.map(label => (
                      <span key={typeof label === 'string' ? label : label.name} className="label-tag">
                        {typeof label === 'string' ? label : label.name}
                        <button
                          type="button"
                          onClick={() => handleRemoveLabel(label)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>操作</label>
                <a
                  href={`https://github.com/newset/rag/issues/${selectedIssue.number}`}
                  target="_blank"
                  rel="noreferrer"
                  className="external-link"
                >
                  在 GitHub 上打开
                </a>
              </div>
            </div>
          </>
        ) : (
          <div className="empty-state">
            <p>请选择一篇文章来编辑</p>
          </div>
        )}
      </div>
    </div>
  );
}