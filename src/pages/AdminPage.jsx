import { useState } from 'react';
import { useApp } from '../App';
import AdminBlogEditor from '../components/AdminBlogEditor';
import { PageHero } from '../components/ui/AuraUI';
import '../pages.css';

export default function AdminPage() {
  const { user, token } = useApp();
  const [inputToken, setInputToken] = useState('');
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem('rag_admin_token') || token || '');
  const [isAuthenticated, setIsAuthenticated] = useState(!!(localStorage.getItem('rag_admin_token') || (token && user)));
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!inputToken.trim()) {
      setError('请输入 Personal Token');
      return;
    }

    try {
      const response = await fetch('https://api.github.com/user', {
        headers: { Authorization: `token ${inputToken}` },
      });
      if (!response.ok) throw new Error('Token 无效或已过期');
      const userData = await response.json();
      if (userData.login !== 'newset') throw new Error('只有仓库所有者可以访问此功能');
      localStorage.setItem('rag_admin_token', inputToken);
      setAdminToken(inputToken);
      setIsAuthenticated(true);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('rag_admin_token');
    setInputToken('');
    setAdminToken('');
    setIsAuthenticated(false);
    setError('');
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-page aura-page">
        <PageHero label="Admin" title="管理后台" highlight="安全入口" description="使用 GitHub Personal Access Token 编辑 Issue 文章。Token 只保存在浏览器本地。" />
        <div className="admin-login">
          <div className="login-form">
            <label htmlFor="token">GitHub Personal Access Token</label>
            <input id="token" type="password" value={inputToken} onChange={(e) => setInputToken(e.target.value)} placeholder="输入你的 GitHub Personal Access Token" onKeyDown={(e) => e.key === 'Enter' && handleLogin()} />
            <p className="help-text">需要 <code>public_repo</code> 或 <code>repo</code> 权限。<a href="https://github.com/settings/tokens" target="_blank" rel="noreferrer">创建新 Token</a></p>
            {error && <div className="error-message">{error}</div>}
            <button onClick={handleLogin} className="login-button">登录</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page aura-page">
      <div className="admin-header aura-container">
        <div>
          <p className="section-label">Admin Console</p>
          <h1>管理后台</h1>
        </div>
        <button onClick={handleLogout} className="logout-button">退出登录</button>
      </div>
      <AdminBlogEditor token={adminToken} />
    </div>
  );
}
