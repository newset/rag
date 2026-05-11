import { createContext, useContext, useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TagPage from './pages/TagPage';
import BlogPage from './pages/BlogPage';
import AboutPage from './pages/AboutPage';
import ResumePage from './pages/ResumePage';
import TagsPage from './pages/TagsPage';
import AdminPage from './pages/AdminPage';
import UIPage from './pages/UIPage';
import './App.css';
import { AuraFooter, AuraNavbar, AuraStyleProvider } from './components/ui/AuraUI';

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
    const envToken = import.meta.env.VITE_GITHUB_TOKEN;
    const headers = { ...options.headers };
    if (envToken && !headers.Authorization) {
      headers.Authorization = `token ${envToken}`;
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
        <AuraStyleProvider>
          <AuraNavbar />
          <main className="main-content aura-main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tag/:id" element={<TagPage />} />
              <Route path="/blog/:id" element={<BlogPage />} />
              <Route path="/tags" element={<TagsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/resume" element={<ResumePage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/ui" element={<UIPage />} />
            </Routes>
          </main>
          <AuraFooter />
        </AuraStyleProvider>
      </HashRouter>
    </AppContext.Provider>
  );
}
