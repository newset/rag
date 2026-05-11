import { useState } from 'react';
import { useApp } from '../App';
import AdminBlogEditor from '../components/AdminBlogEditor';
import '../pages.css';

export default function AdminPage() {
  const { user, token } = useApp();
  const [inputToken, setInputToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(!!token && !!user);
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

      if (!response.ok) {
        throw new Error('Token 无效或已过期');
      }

      const userData = await response.json();
      
      // Check if user is the repo owner or has appropriate permissions
      if (userData.login !== 'newset') {
        throw new Error('只有仓库所有者可以访问此功能');
      }

      localStorage.setItem('rag_admin_token', inputToken);
      setIsAuthenticated(true);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('rag_admin_token');
    setInputToken('');
    setIsAuthenticated(false);
    setError('');
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-page">
        <div className="admin-login">
          <h1>管理后台</h1>
          <div className="login-form">
            <label htmlFor="token">GitHub Personal Access Token</label>
            <input
              id="token"
              type="password"
              value={inputToken}
              onChange={(e) => setInputToken(e.target.value)}
              placeholder="输入你的 GitHub Personal Access Token"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            <p className="help-text">
              需要 <code>public_repo</code> 或 <code>repo</code> 权限。
              <a href="https://github.com/settings/tokens" target="_blank" rel="noreferrer">
                创建新 Token
              </a>
            </p>
            {error && <div className="error-message">{error}</div>}
            <button onClick={handleLogin} className="login-button">
              登录
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>管理后台</h1>
        <button onClick={handleLogout} className="logout-button">
          退出登录
        </button>
      </div>
      <AdminBlogEditor token={inputToken} />
    </div>
  );
}