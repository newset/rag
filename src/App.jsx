import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TagPage from './pages/TagPage';
import BlogPage from './pages/BlogPage';
import AboutPage from './pages/AboutPage';
import AdminPage from './pages/AdminPage';
import { ReactNode, createContext, useState, useContext, useEffect } from 'react';
import './App.css';

const OWNER = 'newset';
const REPO = 'rag';
const API_BASE = 'https://api.github.com';

const AppContext = createContext(null);

export function useApp() {
  return useContext(AppContext);
}

export default function App() {
  const [issues, setIssues] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('rag_blog_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIssues();
    if (token) checkLogin(token);
  }, []);

  async function fetchJson(url, options = {}) {
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    const headers = { ...options.headers };
    if (token && !headers.Authorization) {
      headers.Authorization = `token ${token}`;
    }
    const response = await fetch(url, { ...options, headers });
    const text = await response.text();
    const data = text ? JSON.parse(text) : null;
    if (!response.ok) throw new Error(data?.message || `请求失败：${response.status}`);
    return data;
  }

  async function fetchAllIssues() {
    const allIssues = [];
    let page = 1;
    while (true) {
      const url = `${API_BASE}/repos/${OWNER}/${REPO}/issues?state=all&per_page=100&page=${page}`;
      const pageIssues = await fetchJson(url);
      if (!pageIssues.length) break;
      allIssues.push(...pageIssues.filter(issue => !issue.pull_request));
      if (pageIssues.length < 100) break;
      page += 1;
    }
    return allIssues;
  }

  async function loadIssues() {
    try {
      const data = await fetchAllIssues();
      setIssues(data.map(issue => ({
        number: issue.number,
        title: issue.title,
        body: issue.body || '',
        created_at: issue.created_at,
        updated_at: issue.updated_at,
        labels: issue.labels.map(label => label.name),
        url: issue.html_url,
        comments: issue.comments,
      })));
    } catch (error) {
      console.error('Failed to load issues:', error);
    } finally {
      setLoading(false);
    }
  }

  async function checkLogin(tok) {
    try {
      const userData = await fetchJson(`${API_BASE}/user`, {
        headers: { Authorization: `token ${tok}` },
      });
      setUser(userData);
      setToken(tok);
      localStorage.setItem('rag_blog_token', tok);
    } catch (error) {
      setUser(null);
      setToken(null);
      localStorage.removeItem('rag_blog_token');
    }
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem('rag_blog_token');
  }

  const value = {
    issues,
    user,
    token,
    loading,
    checkLogin,
    logout,
    fetchJson,
    apiBase: API_BASE,
    owner: OWNER,
    repo: REPO,
  };

  return (
    <AppContext.Provider value={value}>
      <HashRouter>
        <div className="app">
          <header className="site-header">
            <div>
              <h1>
                <Link to="/">RAG 博客</Link>
              </h1>
              <p>使用 GitHub Issue 作为文章，Label 作为标签，支持多种筛选和留言功能。</p>
            </div>
            <nav className="site-nav">
              <Link to="/">首页</Link>
              <Link to="/about">关于</Link>
              <Link to="/admin">管理</Link>
              <a href="https://github.com/newset/rag" target="_blank" rel="noreferrer">源码</a>
            </nav>
          </header>

          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tag/:id" element={<TagPage />} />
              <Route path="/blog/:id" element={<BlogPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>

          <footer className="site-footer">
            <p>© 2024 RAG 博客 | 基于 <a href="https://github.com" target="_blank" rel="noreferrer">GitHub Issue</a></p>
          </footer>
        </div>
      </HashRouter>
    </AppContext.Provider>
  );
}