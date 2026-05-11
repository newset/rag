import { useState } from 'react';
import { useApp } from '../App';

export default function LoginCard() {
  const { user, token, setUser, setToken } = useApp();
  const [inputToken, setInputToken] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!inputToken.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('https://api.github.com/user', {
        headers: { Authorization: `token ${inputToken}` },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setToken(inputToken);
        localStorage.setItem('rag_blog_token', inputToken);
        setInputToken('');
      } else {
        alert('登录失败，请检查 Token 是否正确。');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('登录失败，请检查网络连接。');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('rag_blog_token');
  };

  return (
    <div className="card" id="loginCard">
      <h2>留言登录</h2>
      {user ? (
        <div className="auth-actions">
          <p>已登录：<span>{user.login}</span></p>
          <button onClick={handleLogout}>退出登录</button>
        </div>
      ) : (
        <div className="auth-form">
          <label htmlFor="tokenInput">GitHub 访问令牌</label>
          <input
            id="tokenInput"
            type="password"
            value={inputToken}
            onChange={(e) => setInputToken(e.target.value)}
            placeholder="请输入 GitHub Personal Access Token"
          />
          <p className="hint">只需 `public_repo` 或 `repo` 权限即可发表评论。</p>
          <button onClick={handleLogin} disabled={loading || !inputToken.trim()}>
            {loading ? '登录中...' : '登录'}
          </button>
        </div>
      )}
    </div>
  );
}