const OWNER = 'newset';
const REPO = 'rag';
const API_BASE = 'https://api.github.com';

const state = {
  issues: [],
  comments: {},
  currentIssue: null,
  user: null,
  token: null,
};

const elements = {
  searchInput: document.getElementById('searchInput'),
  tagSelect: document.getElementById('tagSelect'),
  monthSelect: document.getElementById('monthSelect'),
  posts: document.getElementById('posts'),
  postDetail: document.getElementById('postDetail'),
  detailMeta: document.getElementById('detailMeta'),
  detailBody: document.getElementById('detailBody'),
  detailTags: document.getElementById('detailTags'),
  backButton: document.getElementById('backButton'),
  commentsCount: document.getElementById('commentsCount'),
  commentsList: document.getElementById('commentsList'),
  commentInput: document.getElementById('commentInput'),
  postCommentButton: document.getElementById('postCommentButton'),
  authStatus: document.getElementById('authStatus'),
  authForm: document.getElementById('authForm'),
  authActions: document.getElementById('authActions'),
  loginName: document.getElementById('loginName'),
  loginButton: document.getElementById('loginButton'),
  logoutButton: document.getElementById('logoutButton'),
  tokenInput: document.getElementById('tokenInput'),
  toastMessage: document.getElementById('toastMessage'),
};

function showToast(message, timeout = 2800) {
  elements.toastMessage.textContent = message;
  elements.toastMessage.classList.remove('hidden');
  setTimeout(() => elements.toastMessage.classList.add('hidden'), timeout);
}

function formatDate(iso) {
  const date = new Date(iso);
  return date.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

function getMonthKey(iso) {
  const date = new Date(iso);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function extractText(markdown) {
  return markdown
    .replace(/\n{2,}/g, ' ')
    .replace(/[#>*`\-_\[\]\(\)]/g, '')
    .trim();
}

function renderMarkdown(text) {
  if (!text) return '';
  const html = text
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

function getStoredToken() {
  return localStorage.getItem('rag_blog_token');
}

function setStoredToken(token) {
  if (token) localStorage.setItem('rag_blog_token', token);
  else localStorage.removeItem('rag_blog_token');
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) {
    throw new Error(data?.message || `请求失败：${response.status}`);
  }
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
    const issues = await fetchAllIssues();
    state.issues = issues.map(issue => ({
      number: issue.number,
      title: issue.title,
      body: issue.body || '',
      created_at: issue.created_at,
      updated_at: issue.updated_at,
      labels: issue.labels.map(label => label.name),
      url: issue.html_url,
      comments: issue.comments,
    }));
    renderFilters();
    applyFilters();
    handleHashChange();
  } catch (error) {
    showToast(`文章加载失败：${error.message}`);
    elements.posts.innerHTML = `<div class="post-card"><p>无法获取文章数据，请检查 GitHub API 访问权限。</p></div>`;
  }
}

function collectTags() {
  const tags = new Set();
  state.issues.forEach(issue => issue.labels.forEach(tag => tags.add(tag)));
  return Array.from(tags).sort((a, b) => a.localeCompare(b, 'zh-CN'));
}

function collectMonths() {
  const months = new Set();
  state.issues.forEach(issue => months.add(getMonthKey(issue.created_at)));
  return Array.from(months).sort((a, b) => b.localeCompare(a));
}

function renderFilters() {
  const tags = collectTags();
  const months = collectMonths();
  elements.tagSelect.innerHTML = '<option value="">全部标签</option>' + tags.map(tag => `<option value="${tag}">${tag}</option>`).join('');
  elements.monthSelect.innerHTML = '<option value="">全部年月</option>' + months.map(month => `<option value="${month}">${month}</option>`).join('');
}

function applyFilters() {
  const keyword = elements.searchInput.value.trim().toLowerCase();
  const selectedTag = elements.tagSelect.value;
  const selectedMonth = elements.monthSelect.value;

  const filtered = state.issues.filter(issue => {
    if (selectedTag && !issue.labels.includes(selectedTag)) return false;
    if (selectedMonth && getMonthKey(issue.created_at) !== selectedMonth) return false;
    if (!keyword) return true;
    const haystack = `${issue.title} ${issue.body}`.toLowerCase();
    return haystack.includes(keyword);
  });
  renderPostList(filtered);
}

function renderPostList(items) {
  if (!items.length) {
    elements.posts.innerHTML = '<div class="post-card"><p>没有符合条件的文章。</p></div>';
    return;
  }
  elements.posts.innerHTML = items.map(issue => {
    const excerpt = extractText(issue.body).slice(0, 160) + (issue.body.length > 160 ? '…' : '');
    const tags = issue.labels.map(label => `<span class="tag-pill">${label}</span>`).join('');
    const date = formatDate(issue.created_at);
    return `
      <article class="post-card" data-number="${issue.number}">
        <h3>${issue.title}</h3>
        <p>${excerpt || '无正文内容，点击查看详情。'}</p>
        <div class="post-meta">
          <span>${date}</span>
          <span>${issue.comments} 条留言</span>
          ${tags}
        </div>
      </article>
    `;
  }).join('');

  document.querySelectorAll('.post-card').forEach(card => {
    card.addEventListener('click', () => {
      const issueNumber = Number(card.dataset.number);
      openPost(issueNumber);
    });
  });
}

function renderAuth() {
  if (state.user) {
    elements.authStatus.textContent = '已登录 GitHub。';
    elements.authForm.classList.add('hidden');
    elements.authActions.classList.remove('hidden');
    elements.loginName.textContent = state.user.login;
  } else {
    elements.authStatus.textContent = '登录后才能发表评论。';
    elements.authForm.classList.remove('hidden');
    elements.authActions.classList.add('hidden');
  }
}

async function checkLogin(token) {
  if (!token) {
    state.user = null;
    state.token = null;
    setStoredToken(null);
    renderAuth();
    return;
  }

  try {
    const user = await fetchJson(`${API_BASE}/user`, {
      headers: { Authorization: `token ${token}` },
    });
    state.user = user;
    state.token = token;
    setStoredToken(token);
    renderAuth();
    showToast(`登录成功，欢迎 ${user.login}`);
  } catch (error) {
    state.user = null;
    state.token = null;
    setStoredToken(null);
    renderAuth();
    showToast('登录失败，请检查 Token 是否正确。');
  }
}

async function fetchComments(issueNumber) {
  const url = `${API_BASE}/repos/${OWNER}/${REPO}/issues/${issueNumber}/comments?per_page=100`;
  const comments = await fetchJson(url);
  state.comments[issueNumber] = comments;
  return comments;
}

function renderComments(issueNumber) {
  const comments = state.comments[issueNumber] || [];
  elements.commentsCount.textContent = `${comments.length} 条留言`;
  if (!comments.length) {
    elements.commentsList.innerHTML = '<div class="comment-card"><p>暂无留言，快来发表第一个评论。</p></div>';
    return;
  }
  elements.commentsList.innerHTML = comments.map(comment => `
    <div class="comment-card">
      <header>
        <span>${comment.user.login}</span>
        <span>${formatDate(comment.created_at)}</span>
      </header>
      <p>${comment.body.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br />')}</p>
    </div>
  `).join('');
}

async function openPost(issueNumber) {
  const issue = state.issues.find(item => item.number === issueNumber);
  if (!issue) return;
  state.currentIssue = issue;
  elements.postDetail.classList.remove('hidden');
  elements.postDetail.scrollIntoView({ behavior: 'smooth' });

  elements.detailMeta.textContent = `发布于 ${formatDate(issue.created_at)} · ${issue.comments} 条留言`;
  elements.detailBody.innerHTML = renderMarkdown(issue.body);
  elements.detailTags.innerHTML = issue.labels.map(tag => `<span class="tag-pill">${tag}</span>`).join('');

  await fetchComments(issueNumber);
  renderComments(issueNumber);
  window.location.hash = `post-${issueNumber}`;
}

function closePost() {
  state.currentIssue = null;
  elements.postDetail.classList.add('hidden');
  window.location.hash = '';
}

async function postComment() {
  if (!state.user || !state.token) {
    showToast('请先登录后再发表评论。');
    return;
  }
  const content = elements.commentInput.value.trim();
  if (!content) {
    showToast('留言内容不能为空。');
    return;
  }
  elements.postCommentButton.disabled = true;
  const issueNumber = state.currentIssue.number;
  try {
    await fetchJson(`${API_BASE}/repos/${OWNER}/${REPO}/issues/${issueNumber}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${state.token}`,
      },
      body: JSON.stringify({ body: content }),
    });
    elements.commentInput.value = '';
    showToast('留言发布成功。');
    await fetchComments(issueNumber);
    renderComments(issueNumber);
  } catch (error) {
    showToast(`留言失败：${error.message}`);
  } finally {
    elements.postCommentButton.disabled = false;
  }
}

function handleHashChange() {
  const hash = window.location.hash.replace('#', '');
  if (hash.startsWith('post-')) {
    const issueNumber = Number(hash.replace('post-', ''));
    if (!Number.isNaN(issueNumber)) openPost(issueNumber);
  }
}

function initEventListeners() {
  elements.searchInput.addEventListener('input', applyFilters);
  elements.tagSelect.addEventListener('change', applyFilters);
  elements.monthSelect.addEventListener('change', applyFilters);
  elements.backButton.addEventListener('click', closePost);
  elements.loginButton.addEventListener('click', () => checkLogin(elements.tokenInput.value.trim()));
  elements.logoutButton.addEventListener('click', () => checkLogin(null));
  elements.postCommentButton.addEventListener('click', postComment);
  window.addEventListener('hashchange', handleHashChange);
}

async function initialize() {
  initEventListeners();
  const token = getStoredToken();
  if (token) {
    await checkLogin(token);
  } else {
    renderAuth();
  }
  await loadIssues();
}

initialize();
