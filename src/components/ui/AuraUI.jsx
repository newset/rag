import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './aura.css';

export const theme = {
  colors: {
    bg: '#09090B',
    bgSurface: '#111113',
    bgCard: '#18181B',
    bgCardHover: '#1E1E22',
    border: 'rgba(255,255,255,0.07)',
    borderHover: 'rgba(255,255,255,0.14)',
    accent: '#A78BFA',
    accentGlow: 'rgba(167,139,250,0.15)',
    accentSoft: 'rgba(167,139,250,0.08)',
    teal: '#2DD4BF',
    coral: '#FB7185',
    amber: '#FCD34D',
    textPrimary: '#FAFAFA',
    textSecondary: '#A1A1AA',
    textMuted: '#52525B',
  },
  font: {
    display: "'DM Serif Display', Georgia, serif",
    body: "'DM Sans', system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
};

export function AuraStyleProvider({ children }) {
  return (
    <div className="aura-root">
      <NoiseBg />
      <GlowOrbs />
      <div className="aura-content-layer">{children}</div>
    </div>
  );
}

export function NoiseBg() {
  return <div className="aura-noise" aria-hidden="true" />;
}

export function GlowOrbs() {
  return (
    <div className="aura-orbs" aria-hidden="true">
      <div className="aura-orb aura-orb-1" />
      <div className="aura-orb aura-orb-2" />
      <div className="aura-orb aura-orb-3" />
    </div>
  );
}

export function BrandLogo({ to = '/', onClick, name = 'NEWSET', compact = false }) {
  const content = (
    <>
      <span className="aura-brand-mark">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M8 2L14 5.5V10.5L8 14L2 10.5V5.5L8 2Z" stroke="white" strokeWidth="1.5" />
          <circle cx="8" cy="8" r="2" fill="white" />
        </svg>
      </span>
      {!compact && <span className="aura-brand-name">{name}</span>}
    </>
  );

  if (onClick) {
    return <button className="aura-brand" onClick={onClick} type="button">{content}</button>;
  }
  return <Link className="aura-brand" to={to}>{content}</Link>;
}

export function AuraNavbar({ items, currentPage, setPage, name = 'NEWSET' }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    handler();
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const defaultItems = [
    { label: '首页', to: '/' },
    { label: '作品', to: '/works' },
    { label: '标签', to: '/tags' },
    { label: '关于', to: '/resume' }
  ];
  const navItems = items || defaultItems;

  return (
    <header className={`aura-navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="aura-navbar-inner">
        <BrandLogo name={name} onClick={setPage ? () => setPage('home') : undefined} />
        <nav className="aura-nav-links" aria-label="主导航">
          {navItems.map(item => (
            item.to ? (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => `aura-nav-link ${isActive ? 'active' : ''}`} end={item.to === '/'}>
                {item.label}
              </NavLink>
            ) : (
              <button
                key={item.page}
                type="button"
                className={`aura-nav-link ${currentPage === item.page ? 'active' : ''}`}
                onClick={() => setPage?.(item.page)}
              >
                {item.label}
              </button>
            )
          ))}
        </nav>
        <Link className="aura-nav-cta" to="/admin">写作后台 →</Link>
      </div>
    </header>
  );
}

export function AuraFooter({ setPage, name = 'NEWSET' }) {
  const productLinks = setPage
    ? [
        { label: '产品', page: 'home' },
        { label: '技能库', page: 'skills' },
        { label: '定价', page: 'pricing' },
        { label: '文档', page: 'docs' },
      ]
    : [
        { label: '首页', to: '/' },
        { label: '标签', to: '/tags' },
        { label: '关于', to: '/about' },
        { label: '简历', to: '/resume' },
      ];

  const renderLink = item => item.to ? (
    <Link key={item.label} to={item.to} className="aura-footer-link">{item.label}</Link>
  ) : (
    <button key={item.label} type="button" className="aura-footer-link" onClick={() => setPage?.(item.page)}>{item.label}</button>
  );

  return (
    <footer className="aura-footer">
      <div className="aura-container">
        <div className="aura-footer-grid">
          <div>
            <BrandLogo name={name} to="/" />
            <p className="aura-footer-desc">基于 GitHub Issues 的个人知识库与博客系统，以暗色、精致、组件化的 Aura 视觉语言呈现内容。</p>
          </div>
          <div>
            <p className="section-label">站点</p>
            <div className="aura-footer-list">{productLinks.map(renderLink)}</div>
          </div>
          <div>
            <p className="section-label">内容</p>
            <div className="aura-footer-list">
              <Link className="aura-footer-link" to="/">文章</Link>
              <Link className="aura-footer-link" to="/tags">标签云</Link>
              <a className="aura-footer-link" href="https://github.com/newset/rag" target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>
          <div>
            <p className="section-label">系统</p>
            <div className="aura-footer-list">
              <Link className="aura-footer-link" to="/ui">UIPage</Link>
              <Link className="aura-footer-link" to="/admin">Admin</Link>
            </div>
          </div>
        </div>
        <div className="aura-divider" />
        <div className="aura-footer-bottom">
          <span>© 2026 {name}. Powered by GitHub Issues.</span>
          <span>React · Vite · Aura UI</span>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({ label, title, highlight, description, children, align = 'center' }) {
  return (
    <section className={`aura-page-hero aura-page-hero-${align}`}>
      {label && <span className="aura-tag aura-hero-tag"><span className="aura-live-dot" />{label}</span>}
      <h1>{title}{highlight && <><br /><span className="shimmer-text">{highlight}</span></>}</h1>
      {description && <p>{description}</p>}
      {children}
    </section>
  );
}

export function SectionHeader({ label, title, children }) {
  return (
    <div className="aura-section-header">
      {label && <p className="section-label">{label}</p>}
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

export function AuraButton({ children, variant = 'primary', as: Comp = 'button', className = '', ...props }) {
  const cls = `aura-btn aura-btn-${variant} ${className}`.trim();
  if (Comp === Link) return <Link className={cls} {...props}>{children}</Link>;
  return <Comp className={cls} {...props}>{children}</Comp>;
}

export function AuraCard({ children, className = '', hover = false, ...props }) {
  return <div className={`aura-card ${hover ? 'card-hover' : ''} ${className}`.trim()} {...props}>{children}</div>;
}

export function AuraTag({ children, color, className = '', ...props }) {
  return <span className={`aura-tag ${className}`.trim()} style={color ? { '--tag-color': color } : undefined} {...props}>{children}</span>;
}

export function EmptyState({ title = '暂无内容', description }) {
  return (
    <div className="aura-empty">
      <div className="aura-empty-icon">✦</div>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </div>
  );
}

export function PostArtwork({ tone = 'accent', symbol = '✦', large = false }) {
  return (
    <div className={`aura-post-art aura-post-art-${tone} ${large ? 'large' : ''}`}>
      <div className="aura-post-art-pattern" />
      <div className="aura-post-art-symbol">{symbol}</div>
    </div>
  );
}
