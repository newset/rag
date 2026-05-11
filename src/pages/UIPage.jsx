import { useState, useEffect, useRef } from "react";
import { AuraStyleProvider, AuraNavbar, AuraFooter, theme } from "../components/ui/AuraUI";

// Theme primitives are extracted to ../components/ui/AuraUI.

// ─── Hero Section ─────────────────────────────────────────────────────────────
const Hero = ({ setPage }) => (
  <section style={{ padding: "160px 24px 100px", textAlign: "center", position: "relative" }}>
    {/* Decorative top line */}
    <div style={{
      position: "absolute", top: 100, left: "50%", transform: "translateX(-50%)",
      width: 1, height: 60,
      background: "linear-gradient(to bottom, transparent, rgba(167,139,250,0.5))",
    }} />

    <div className="fade-up" style={{ marginBottom: 24 }}>
      <span className="tag">
        <span style={{
          width: 6, height: 6, borderRadius: "50%",
          background: theme.colors.teal, display: "inline-block",
          animation: "pulse-ring 1.5s ease infinite",
        }} />
        现已支持 AI 多模态生成
      </span>
    </div>

    <h1 className="fade-up-2" style={{
      fontFamily: theme.font.display,
      fontSize: "clamp(48px, 7vw, 88px)",
      fontWeight: 400,
      lineHeight: 1.05,
      letterSpacing: "-0.03em",
      maxWidth: 900, margin: "0 auto 28px",
    }}>
      构建令人难忘的
      <br />
      <span className="shimmer-text">网站体验</span>
    </h1>

    <p className="fade-up-3" style={{
      fontSize: "clamp(16px, 2vw, 20px)",
      color: theme.colors.textSecondary,
      maxWidth: 560, margin: "0 auto 48px",
      lineHeight: 1.7, fontWeight: 300,
    }}>
      用 AI 驱动的组件系统，在几秒内创造极致视觉设计。无需设计背景，导出到任何平台。
    </p>

    <div className="fade-up-4" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
      <button className="btn-primary" style={{ padding: "14px 28px", fontSize: 15 }}>
        立即免费体验
      </button>
      <button className="btn-ghost" style={{ padding: "14px 28px", fontSize: 15 }}
        onClick={() => setPage("skills")}>
        浏览技能库 →
      </button>
    </div>

    <p className="fade-up-5" style={{
      marginTop: 24, fontSize: 13, color: theme.colors.textMuted,
    }}>
      已有 166,000+ 创作者信赖 · 无需信用卡
    </p>

    {/* Hero Preview Card */}
    <div className="fade-up-5" style={{
      marginTop: 80, maxWidth: 900, margin: "80px auto 0",
      position: "relative",
    }}>
      <div style={{
        position: "absolute", inset: -1,
        borderRadius: 20,
        background: "linear-gradient(135deg, rgba(167,139,250,0.3), rgba(45,212,191,0.2), rgba(251,113,133,0.15))",
        filter: "blur(1px)",
      }} />
      <div style={{
        position: "relative",
        background: theme.colors.bgCard,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: 20,
        overflow: "hidden",
      }}>
        {/* Fake browser chrome */}
        <div style={{
          padding: "14px 20px",
          borderBottom: `1px solid ${theme.colors.border}`,
          display: "flex", alignItems: "center", gap: 12,
          background: theme.colors.bgSurface,
        }}>
          <div style={{ display: "flex", gap: 6 }}>
            {["#FF5F57","#FEBC2E","#28C840"].map(c => (
              <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
            ))}
          </div>
          <div style={{
            flex: 1, background: "rgba(255,255,255,0.04)",
            borderRadius: 6, padding: "5px 12px",
            fontSize: 12, color: theme.colors.textMuted,
            maxWidth: 360, margin: "0 auto",
            border: `1px solid ${theme.colors.border}`,
          }}>
            aura.build/my-project
          </div>
        </div>

        {/* Preview content */}
        <div style={{ padding: 32, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {[
            { label: "Hero Section", color: theme.colors.accent, h: 120 },
            { label: "Feature Cards", color: theme.colors.teal, h: 120 },
            { label: "Testimonials", color: theme.colors.coral, h: 120 },
          ].map(item => (
            <div key={item.label} style={{
              background: `${item.color}12`,
              border: `1px solid ${item.color}25`,
              borderRadius: 12, height: item.h,
              display: "flex", alignItems: "flex-end",
              padding: 14,
            }}>
              <span style={{ fontSize: 12, color: item.color, fontWeight: 500 }}>{item.label}</span>
            </div>
          ))}
          {[
            { label: "CTA Block", color: theme.colors.amber, h: 80, span: 2 },
            { label: "Footer", color: theme.colors.textMuted, h: 80, span: 1 },
          ].map(item => (
            <div key={item.label} style={{
              gridColumn: item.span === 2 ? "span 2" : "span 1",
              background: `${item.color}12`,
              border: `1px solid ${item.color}25`,
              borderRadius: 12, height: item.h,
              display: "flex", alignItems: "flex-end",
              padding: 14,
            }}>
              <span style={{ fontSize: 12, color: item.color, fontWeight: 500 }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ─── Logos Strip ─────────────────────────────────────────────────────────────
const LogoStrip = () => {
  const logos = ["Vercel", "Notion", "Linear", "Figma", "Stripe", "Supabase", "OpenAI", "Framer"];
  return (
    <section style={{ padding: "40px 24px 80px", textAlign: "center" }}>
      <p className="section-label" style={{ marginBottom: 32 }}>
        深受全球创作者与团队的信赖
      </p>
      <div style={{
        display: "flex", flexWrap: "wrap", gap: 32,
        justifyContent: "center", alignItems: "center",
      }}>
        {logos.map(l => (
          <span key={l} style={{
            fontSize: 14, fontWeight: 600, color: theme.colors.textMuted,
            letterSpacing: "0.05em", textTransform: "uppercase",
          }}>{l}</span>
        ))}
      </div>
    </section>
  );
};

// ─── Feature Grid ─────────────────────────────────────────────────────────────
const features = [
  {
    icon: "⚡",
    title: "AI 秒级生成",
    desc: "输入一句描述，AI 即刻生成完整页面结构和设计风格，比传统方式快 10 倍。",
    color: theme.colors.accent,
    tag: "核心能力",
  },
  {
    icon: "🎨",
    title: "自定义主题系统",
    desc: "灵活的 Token 体系，从颜色、字体到间距，一键切换品牌风格。",
    color: theme.colors.teal,
    tag: "设计系统",
  },
  {
    icon: "📦",
    title: "200+ 组件库",
    desc: "精心设计的组件覆盖所有场景，支持 React、Vue、HTML 多框架导出。",
    color: theme.colors.coral,
    tag: "组件",
  },
  {
    icon: "🔧",
    title: "可视化编辑器",
    desc: "所见即所得，拖拽调整布局、样式和内容，无需写一行 CSS。",
    color: theme.colors.amber,
    tag: "编辑器",
  },
  {
    icon: "🚀",
    title: "一键发布部署",
    desc: "与 Vercel、Netlify、GitHub Pages 深度集成，从构建到上线零摩擦。",
    color: "#60A5FA",
    tag: "发布",
  },
  {
    icon: "🤝",
    title: "实时协作",
    desc: "多人同时编辑、评论、审批，像 Figma 一样的设计协作体验。",
    color: "#34D399",
    tag: "团队",
  },
];

const FeatureGrid = () => (
  <section style={{ padding: "80px 24px", maxWidth: 1200, margin: "0 auto" }}>
    <div style={{ textAlign: "center", marginBottom: 64 }}>
      <p className="section-label" style={{ marginBottom: 16 }}>核心功能</p>
      <h2 style={{
        fontFamily: theme.font.display,
        fontSize: "clamp(32px, 5vw, 52px)",
        fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.1,
      }}>
        一切你需要的能力<br />
        <em style={{ color: theme.colors.textSecondary, fontStyle: "italic" }}>唾手可得</em>
      </h2>
    </div>

    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
      gap: 16,
    }}>
      {features.map((f, i) => (
        <FeatureCard key={i} {...f} />
      ))}
    </div>
  </section>
);

const FeatureCard = ({ icon, title, desc, color, tag }) => (
  <div
    className="card-hover"
    style={{
      background: theme.colors.bgCard,
      border: `1px solid ${theme.colors.border}`,
      borderRadius: 16, padding: "28px 28px 24px",
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: `${color}15`,
        border: `1px solid ${color}25`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 20,
      }}>
        {icon}
      </div>
      <span style={{
        fontSize: 11, fontWeight: 600, letterSpacing: "0.06em",
        color: color, textTransform: "uppercase",
        background: `${color}12`, padding: "3px 10px", borderRadius: 100,
        border: `1px solid ${color}25`,
      }}>
        {tag}
      </span>
    </div>
    <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 10, letterSpacing: "-0.01em" }}>
      {title}
    </h3>
    <p style={{ fontSize: 14, color: theme.colors.textSecondary, lineHeight: 1.7 }}>
      {desc}
    </p>
  </div>
);

// ─── Stats Bar ────────────────────────────────────────────────────────────────
const StatsBar = () => {
  const stats = [
    { value: "166K+", label: "活跃用户" },
    { value: "2.4M+", label: "已生成页面" },
    { value: "200+", label: "组件模板" },
    { value: "4.9★", label: "用户评分" },
  ];
  return (
    <section style={{
      padding: "0 24px 80px", maxWidth: 1200, margin: "0 auto",
    }}>
      <div style={{
        background: theme.colors.bgCard,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: 20, padding: "40px 48px",
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
        gap: 0, position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.4,
          background: "radial-gradient(ellipse at 50% 0%, rgba(167,139,250,0.12), transparent 70%)",
        }} />
        {stats.map((s, i) => (
          <div key={i} style={{
            textAlign: "center", padding: "8px 0",
            borderRight: i < 3 ? `1px solid ${theme.colors.border}` : "none",
            position: "relative",
          }}>
            <div style={{
              fontFamily: theme.font.display,
              fontSize: 40, fontWeight: 400,
              letterSpacing: "-0.03em",
              background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.6) 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              {s.value}
            </div>
            <div style={{ fontSize: 13, color: theme.colors.textMuted, marginTop: 4, fontWeight: 500 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  {
    text: "Aura 彻底改变了我的工作流。以前需要一周的落地页，现在一个下午就搞定，质量还更高。",
    name: "张晓明", role: "独立产品设计师", avatar: "张",
  },
  {
    text: "作为非技术创始人，Aura 让我第一次感觉自己能真正掌控产品的视觉表达，太赋能了。",
    name: "李雅婷", role: "SaaS 创始人", avatar: "李",
  },
  {
    text: "我们团队用 Aura 替代了复杂的设计→开发流程，交付速度提升了 3 倍，协作摩擦降到最低。",
    name: "陈浩然", role: "前端技术负责人", avatar: "陈",
  },
];

const Testimonials = () => (
  <section style={{ padding: "80px 24px", maxWidth: 1200, margin: "0 auto" }}>
    <div style={{ textAlign: "center", marginBottom: 56 }}>
      <p className="section-label" style={{ marginBottom: 16 }}>用户声音</p>
      <h2 style={{
        fontFamily: theme.font.display,
        fontSize: "clamp(28px, 4vw, 44px)",
        fontWeight: 400, letterSpacing: "-0.025em",
      }}>
        他们都爱上了 Aura
      </h2>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
      {testimonials.map((t, i) => (
        <div key={i} className="card-hover" style={{
          background: theme.colors.bgCard,
          border: `1px solid ${theme.colors.border}`,
          borderRadius: 16, padding: 28,
        }}>
          <div style={{ marginBottom: 20 }}>
            {[1,2,3,4,5].map(s => (
              <span key={s} style={{ color: theme.colors.amber, fontSize: 14, marginRight: 2 }}>★</span>
            ))}
          </div>
          <p style={{ fontSize: 15, color: theme.colors.textSecondary, lineHeight: 1.75, marginBottom: 24 }}>
            "{t.text}"
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 38, height: 38, borderRadius: "50%",
              background: `${theme.colors.accent}22`,
              border: `1px solid ${theme.colors.accent}35`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, fontWeight: 600, color: theme.colors.accent,
            }}>
              {t.avatar}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{t.name}</div>
              <div style={{ fontSize: 12, color: theme.colors.textMuted }}>{t.role}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

// ─── CTA Section ──────────────────────────────────────────────────────────────
const CTASection = () => (
  <section style={{ padding: "80px 24px 120px", maxWidth: 1200, margin: "0 auto" }}>
    <div style={{
      position: "relative",
      background: theme.colors.bgCard,
      border: `1px solid ${theme.colors.border}`,
      borderRadius: 24, padding: "72px 48px",
      textAlign: "center", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)",
        width: 400, height: 400,
        background: "radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />
      <p className="section-label" style={{ marginBottom: 20, position: "relative" }}>开始构建</p>
      <h2 style={{
        fontFamily: theme.font.display,
        fontSize: "clamp(32px, 5vw, 56px)",
        fontWeight: 400, letterSpacing: "-0.025em",
        lineHeight: 1.1, marginBottom: 24, position: "relative",
      }}>
        今天就开始创造<br />
        <span className="shimmer-text">下一个爆款产品</span>
      </h2>
      <p style={{
        fontSize: 17, color: theme.colors.textSecondary,
        maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.7,
        position: "relative",
      }}>
        加入 166,000+ 创作者的行列，用 AI 重新定义你的创作速度。
      </p>
      <div style={{ display: "flex", gap: 14, justifyContent: "center", position: "relative" }}>
        <button className="btn-primary" style={{ padding: "14px 32px", fontSize: 15 }}>
          免费注册，立即开始
        </button>
        <button className="btn-ghost" style={{ padding: "14px 28px", fontSize: 15 }}>
          查看演示
        </button>
      </div>
    </div>
  </section>
);

// ─── Skills Page ──────────────────────────────────────────────────────────────
const skillsData = [
  {
    category: "布局 Layout",
    color: theme.colors.accent,
    items: [
      { name: "Hero Section", desc: "多种风格的首屏设计，支持居中、左对齐、全屏等布局" },
      { name: "Split Layout", desc: "左右分栏布局，适合图文并排展示" },
      { name: "Bento Grid", desc: "不规则网格布局，现代感十足" },
      { name: "Sidebar Layout", desc: "侧边栏 + 主内容区的经典应用布局" },
    ],
  },
  {
    category: "内容 Content",
    color: theme.colors.teal,
    items: [
      { name: "Feature Cards", desc: "功能特性展示卡片，支持图标、标题、描述" },
      { name: "Testimonial Block", desc: "用户评价展示，头像 + 星级 + 引用文字" },
      { name: "Pricing Table", desc: "定价方案对比，含高亮推荐计划" },
      { name: "FAQ Accordion", desc: "常见问题折叠展示，减少页面高度占用" },
    ],
  },
  {
    category: "交互 Interactive",
    color: theme.colors.coral,
    items: [
      { name: "Animated Counter", desc: "数字滚动动效，适合展示统计数据" },
      { name: "Hover Cards", desc: "悬停展示详情卡，减少认知负担" },
      { name: "Tab Switcher", desc: "标签页切换，在有限空间展示多内容" },
      { name: "Progress Steps", desc: "步骤进度指示，引导用户完成流程" },
    ],
  },
  {
    category: "表单 Forms",
    color: theme.colors.amber,
    items: [
      { name: "Email Capture", desc: "简洁的邮件订阅组件，高转化设计" },
      { name: "Contact Form", desc: "联系表单，带字段验证和发送状态" },
      { name: "Search Bar", desc: "搜索输入框，支持即时过滤" },
      { name: "Newsletter Block", desc: "时事通讯注册区块，带社会证明文案" },
    ],
  },
];

const SkillsPage = () => {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [search, setSearch] = useState("");

  const categories = ["全部", ...skillsData.map(s => s.category)];
  const filtered = skillsData.filter(s =>
    activeCategory === "全部" || s.category === activeCategory
  );

  return (
    <div style={{ minHeight: "100vh", paddingTop: 80 }}>
      {/* Header */}
      <div style={{ padding: "80px 24px 48px", textAlign: "center", maxWidth: 800, margin: "0 auto" }}>
        <span className="tag" style={{ marginBottom: 24, display: "inline-flex" }}>技能库 Skills</span>
        <h1 style={{
          fontFamily: theme.font.display,
          fontSize: "clamp(36px, 6vw, 64px)",
          fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1.05,
          marginBottom: 20,
        }}>
          每个组件<br />
          <span className="shimmer-text">都是一个超能力</span>
        </h1>
        <p style={{ fontSize: 18, color: theme.colors.textSecondary, lineHeight: 1.7 }}>
          超过 200 个精心设计的技能模块，覆盖布局、内容、交互、表单等所有核心场景。
        </p>
      </div>

      {/* Search + Filter */}
      <div style={{ padding: "0 24px 48px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                style={{
                  background: activeCategory === c ? theme.colors.accent : "transparent",
                  color: activeCategory === c ? "#09090B" : theme.colors.textSecondary,
                  border: activeCategory === c ? "none" : `1px solid ${theme.colors.border}`,
                  borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 500,
                  cursor: "pointer", fontFamily: theme.font.body, transition: "all 0.2s",
                }}
              >
                {c}
              </button>
            ))}
          </div>
          <input
            placeholder="搜索技能..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              background: theme.colors.bgCard,
              border: `1px solid ${theme.colors.border}`,
              borderRadius: 10, padding: "9px 16px", fontSize: 14,
              color: theme.colors.textPrimary, fontFamily: theme.font.body,
              outline: "none", width: 220,
            }}
          />
        </div>

        {/* Skills Grid */}
        {filtered.map(group => (
          <div key={group.category} style={{ marginBottom: 56 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 3, height: 20, borderRadius: 2, background: group.color }} />
              <h2 style={{ fontSize: 16, fontWeight: 600, color: group.color }}>{group.category}</h2>
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 14,
            }}>
              {group.items
                .filter(item => !search || item.name.includes(search) || item.desc.includes(search))
                .map(item => (
                  <SkillCard key={item.name} {...item} color={group.color} />
                ))
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SkillCard = ({ name, desc, color }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? theme.colors.bgCardHover : theme.colors.bgCard,
        border: `1px solid ${hovered ? `${color}30` : theme.colors.border}`,
        borderRadius: 14, padding: "20px 20px 16px",
        cursor: "pointer", transition: "all 0.2s",
        transform: hovered ? "translateY(-2px)" : "none",
      }}
    >
      <div style={{
        width: 36, height: 36, borderRadius: 10, marginBottom: 14,
        background: `${color}15`,
        border: `1px solid ${color}25`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ width: 14, height: 14, borderRadius: 3, background: color, opacity: 0.7 }} />
      </div>
      <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8, letterSpacing: "-0.01em" }}>
        {name}
      </h3>
      <p style={{ fontSize: 13, color: theme.colors.textSecondary, lineHeight: 1.65 }}>
        {desc}
      </p>
      {hovered && (
        <div style={{ marginTop: 16, fontSize: 12, color: color, fontWeight: 500 }}>
          查看详情 →
        </div>
      )}
    </div>
  );
};

// ─── Pricing Page ─────────────────────────────────────────────────────────────
const plans = [
  {
    name: "Free",
    price: "免费",
    sub: "永久有效",
    desc: "适合个人项目和初期探索",
    color: theme.colors.textMuted,
    features: ["5 个项目", "50 次 AI 生成", "基础组件库", "PNG 导出", "社区支持"],
    cta: "免费开始",
    highlight: false,
  },
  {
    name: "Pro",
    price: "¥99",
    sub: "/ 月",
    desc: "适合专业创作者和自由职业者",
    color: theme.colors.accent,
    features: ["无限项目", "无限 AI 生成", "完整组件库", "代码导出 (React/Vue)", "自定义域名", "优先支持"],
    cta: "开始 14 天试用",
    highlight: true,
  },
  {
    name: "Team",
    price: "¥299",
    sub: "/ 月",
    desc: "适合设计和开发团队协作",
    color: theme.colors.teal,
    features: ["5 个团队席位", "共享组件库", "实时协作编辑", "设计系统管理", "团队模板", "专属客户成功"],
    cta: "联系销售",
    highlight: false,
  },
];

const PricingPage = () => (
  <div style={{ minHeight: "100vh", paddingTop: 80 }}>
    <div style={{ padding: "80px 24px 60px", textAlign: "center", maxWidth: 700, margin: "0 auto" }}>
      <span className="tag" style={{ marginBottom: 24, display: "inline-flex" }}>定价方案</span>
      <h1 style={{
        fontFamily: theme.font.display,
        fontSize: "clamp(36px, 6vw, 60px)",
        fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 20,
      }}>
        简单透明的定价
      </h1>
      <p style={{ fontSize: 18, color: theme.colors.textSecondary }}>
        从免费开始，随团队成长按需升级。所有方案均含 14 天退款保障。
      </p>
    </div>

    <div style={{
      padding: "0 24px 120px", maxWidth: 1100, margin: "0 auto",
      display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20,
    }}>
      {plans.map(plan => (
        <div key={plan.name} style={{
          background: theme.colors.bgCard,
          border: `${plan.highlight ? "1.5" : "1"}px solid ${plan.highlight ? `${plan.color}50` : theme.colors.border}`,
          borderRadius: 20, padding: 32, position: "relative",
          boxShadow: plan.highlight ? `0 0 40px ${plan.color}15` : "none",
        }}>
          {plan.highlight && (
            <div style={{
              position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
              background: plan.color, color: "#09090B",
              fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
              padding: "4px 16px", borderRadius: 100,
            }}>
              最受欢迎
            </div>
          )}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: plan.color, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
              {plan.name}
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
              <span style={{ fontFamily: theme.font.display, fontSize: 44, fontWeight: 400, letterSpacing: "-0.03em" }}>
                {plan.price}
              </span>
              <span style={{ color: theme.colors.textMuted, fontSize: 14 }}>{plan.sub}</span>
            </div>
            <p style={{ fontSize: 14, color: theme.colors.textSecondary }}>{plan.desc}</p>
          </div>
          <div className="divider" style={{ marginBottom: 24 }} />
          <ul style={{ listStyle: "none", marginBottom: 32 }}>
            {plan.features.map(f => (
              <li key={f} style={{
                display: "flex", alignItems: "center", gap: 10,
                fontSize: 14, color: theme.colors.textSecondary,
                padding: "7px 0",
              }}>
                <span style={{ color: plan.color, fontSize: 16, lineHeight: 1 }}>✓</span>
                {f}
              </li>
            ))}
          </ul>
          <button
            style={{
              width: "100%",
              background: plan.highlight ? plan.color : "transparent",
              color: plan.highlight ? "#09090B" : theme.colors.textPrimary,
              border: plan.highlight ? "none" : `1px solid ${theme.colors.border}`,
              borderRadius: 12, padding: "13px 0", fontSize: 14, fontWeight: 600,
              cursor: "pointer", fontFamily: theme.font.body, transition: "all 0.2s",
            }}
          >
            {plan.cta}
          </button>
        </div>
      ))}
    </div>
  </div>
);

// ─── Docs Page ───────────────────────────────────────────────────────────────
const docSections = [
  {
    title: "快速开始",
    icon: "🚀",
    articles: ["安装与配置", "创建你的第一个项目", "连接到代码仓库", "部署到生产环境"],
  },
  {
    title: "设计系统",
    icon: "🎨",
    articles: ["主题 Token 体系", "自定义颜色和字体", "响应式断点", "暗色模式适配"],
  },
  {
    title: "组件 API",
    icon: "📦",
    articles: ["Button 组件", "Card 组件", "Navigation 导航", "Form 表单组件"],
  },
  {
    title: "AI 功能",
    icon: "⚡",
    articles: ["提示词最佳实践", "批量生成策略", "样式迁移功能", "AI 修复工具"],
  },
];

const DocsPage = () => {
  const [activeDoc, setActiveDoc] = useState(null);

  return (
    <div style={{ minHeight: "100vh", paddingTop: 80, display: "flex" }}>
      {/* Sidebar */}
      <aside style={{
        width: 260, flexShrink: 0,
        borderRight: `1px solid ${theme.colors.border}`,
        padding: "40px 24px", position: "sticky", top: 64, height: "calc(100vh - 64px)",
        overflowY: "auto",
      }}>
        <p className="section-label" style={{ marginBottom: 24 }}>文档目录</p>
        {docSections.map(section => (
          <div key={section.title} style={{ marginBottom: 28 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              fontSize: 13, fontWeight: 600, marginBottom: 10, color: theme.colors.textPrimary,
            }}>
              <span>{section.icon}</span>
              {section.title}
            </div>
            <ul style={{ listStyle: "none" }}>
              {section.articles.map(a => (
                <li key={a}>
                  <button
                    onClick={() => setActiveDoc(a)}
                    style={{
                      display: "block", width: "100%", textAlign: "left",
                      background: activeDoc === a ? theme.colors.accentSoft : "transparent",
                      color: activeDoc === a ? theme.colors.accent : theme.colors.textSecondary,
                      border: "none", borderRadius: 7, padding: "7px 12px",
                      fontSize: 13, cursor: "pointer", fontFamily: theme.font.body,
                      transition: "all 0.15s",
                    }}
                  >
                    {a}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: "60px 64px", maxWidth: 840 }}>
        {!activeDoc ? (
          <>
            <h1 style={{
              fontFamily: theme.font.display,
              fontSize: 48, fontWeight: 400, letterSpacing: "-0.03em",
              marginBottom: 16,
            }}>
              开发者文档
            </h1>
            <p style={{ fontSize: 17, color: theme.colors.textSecondary, marginBottom: 56, lineHeight: 1.7 }}>
              了解如何集成 Aura 到你的工作流，从主题配置到组件 API，完整参考文档。
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {docSections.map(s => (
                <div
                  key={s.title}
                  className="card-hover"
                  onClick={() => setActiveDoc(s.articles[0])}
                  style={{
                    background: theme.colors.bgCard,
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: 14, padding: 24,
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 13, color: theme.colors.textMuted }}>
                    {s.articles.length} 篇文章
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <button
              onClick={() => setActiveDoc(null)}
              style={{
                background: "none", border: "none", color: theme.colors.textMuted,
                fontSize: 13, cursor: "pointer", fontFamily: theme.font.body,
                marginBottom: 32, padding: 0, display: "flex", alignItems: "center", gap: 6,
              }}
            >
              ← 返回文档首页
            </button>
            <h1 style={{
              fontFamily: theme.font.display,
              fontSize: 40, fontWeight: 400, letterSpacing: "-0.025em", marginBottom: 24,
            }}>
              {activeDoc}
            </h1>
            <div style={{
              background: theme.colors.bgCard, border: `1px solid ${theme.colors.border}`,
              borderRadius: 12, padding: "16px 20px", marginBottom: 32,
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <span style={{ fontSize: 12, color: theme.colors.amber }}>ℹ</span>
              <span style={{ fontSize: 13, color: theme.colors.textSecondary }}>
                此页面为演示内容，完整文档请访问 aura.build/docs
              </span>
            </div>
            {["概述", "安装", "配置", "示例代码"].map(section => (
              <div key={section} style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 16, letterSpacing: "-0.01em" }}>
                  {section}
                </h2>
                <div style={{
                  background: `${theme.colors.bgSurface}`,
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: 10, padding: 20,
                  fontFamily: theme.font.mono, fontSize: 13,
                  color: theme.colors.textSecondary, lineHeight: 1.8,
                }}>
                  <span style={{ color: theme.colors.accent }}>// {activeDoc} · {section}</span>
                  <br />
                  <span style={{ color: theme.colors.teal }}>import</span>
                  {" "}{"{"} {activeDoc.split(" ")[0]} {"}"}{" "}
                  <span style={{ color: theme.colors.teal }}>from</span>
                  {" "}<span style={{ color: theme.colors.coral }}>'@aura/components'</span>
                </div>
              </div>
            ))}
          </>
        )}
      </main>
    </div>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────
// Footer extracted to ../components/ui/AuraUI.


// ─── Markdown Renderer ────────────────────────────────────────────────────────
// 轻量级自定义 Markdown 渲染，无需外部依赖
const MarkdownRenderer = ({ content }) => {
  const lines = content.trim().split("\n");
  const elements = [];
  let i = 0;
  let keyIdx = 0;
  const key = () => keyIdx++;

  const parseInline = (text) => {
    // 处理行内元素：bold, italic, code, link
    const parts = [];
    let remaining = text;
    let pKey = 0;

    // 匹配各种行内模式
    const patterns = [
      { re: /\*\*(.+?)\*\*/g,  render: (m, g) => <strong key={pKey++} style={{ color: "#FAFAFA", fontWeight: 600 }}>{g}</strong> },
      { re: /\*(.+?)\*/g,      render: (m, g) => <em key={pKey++} style={{ fontStyle: "italic", color: "#C4B5FD" }}>{g}</em> },
      { re: /`([^`]+)`/g,      render: (m, g) => (
        <code key={pKey++} style={{
          fontFamily: theme.font.mono, fontSize: "0.85em",
          background: "rgba(167,139,250,0.12)", color: "#C4B5FD",
          padding: "1px 6px", borderRadius: 4,
          border: "1px solid rgba(167,139,250,0.2)",
        }}>{g}</code>
      )},
      { re: /\[(.+?)\]\((.+?)\)/g, render: (m, g1, g2) => (
        <a key={pKey++} href={g2} style={{ color: "#A78BFA", borderBottom: "1px solid rgba(167,139,250,0.3)" }}>{g1}</a>
      )},
    ];

    // 简化处理：逐字符扫描
    let result = remaining;
    // 粗体
    result = result.replace(/\*\*(.+?)\*\*/g, (_, g) => `__BOLD__${g}__ENDBOLD__`);
    result = result.replace(/\*(.+?)\*/g, (_, g) => `__EM__${g}__ENDEM__`);
    result = result.replace(/`([^`]+)`/g, (_, g) => `__CODE__${g}__ENDCODE__`);
    result = result.replace(/\[(.+?)\]\((.+?)\)/g, (_, g1, g2) => `__LINK__${g1}__SEP__${g2}__ENDLINK__`);

    const tokens = result.split(/(__BOLD__|__ENDBOLD__|__EM__|__ENDEM__|__CODE__|__ENDCODE__|__LINK__|__SEP__|__ENDLINK__)/);
    const out = [];
    let mode = null;
    let buf = [];
    let linkText = "";

    tokens.forEach((tok) => {
      if (tok === "__BOLD__") { mode = "bold"; buf = []; }
      else if (tok === "__ENDBOLD__") {
        out.push(<strong key={pKey++} style={{ color: "#FAFAFA", fontWeight: 600 }}>{buf.join("")}</strong>);
        mode = null; buf = [];
      } else if (tok === "__EM__") { mode = "em"; buf = []; }
      else if (tok === "__ENDEM__") {
        out.push(<em key={pKey++} style={{ fontStyle: "italic", color: "#C4B5FD" }}>{buf.join("")}</em>);
        mode = null; buf = [];
      } else if (tok === "__CODE__") { mode = "code"; buf = []; }
      else if (tok === "__ENDCODE__") {
        out.push(<code key={pKey++} style={{
          fontFamily: theme.font.mono, fontSize: "0.85em",
          background: "rgba(167,139,250,0.12)", color: "#C4B5FD",
          padding: "1px 6px", borderRadius: 4,
          border: "1px solid rgba(167,139,250,0.2)",
        }}>{buf.join("")}</code>);
        mode = null; buf = [];
      } else if (tok === "__LINK__") { mode = "link"; buf = []; }
      else if (tok === "__SEP__" && mode === "link") { linkText = buf.join(""); buf = []; mode = "linkhref"; }
      else if (tok === "__ENDLINK__") {
        out.push(<a key={pKey++} href={buf.join("")} style={{ color: "#A78BFA", borderBottom: "1px solid rgba(167,139,250,0.3)" }}>{linkText}</a>);
        mode = null; buf = []; linkText = "";
      } else if (mode) { buf.push(tok); }
      else if (tok) { out.push(tok); }
    });

    return out.length ? out : text;
  };

  while (i < lines.length) {
    const line = lines[i];

    // 空行
    if (!line.trim()) { i++; continue; }

    // 代码块
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      elements.push(
        <div key={key()} style={{ margin: "28px 0", borderRadius: 12, overflow: "hidden", border: `1px solid rgba(255,255,255,0.08)` }}>
          {lang && (
            <div style={{
              background: "#111113", padding: "8px 16px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <span style={{ fontSize: 11, color: "#A78BFA", fontFamily: theme.font.mono, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" }}>{lang}</span>
              <span style={{ fontSize: 11, color: "#52525B" }}>复制</span>
            </div>
          )}
          <pre style={{
            background: "#0D0D0F", padding: "20px", margin: 0,
            overflowX: "auto", lineHeight: 1.75,
          }}>
            <code style={{ fontFamily: theme.font.mono, fontSize: 13, color: "#E4E4E7" }}>
              {codeLines.map((l, ci) => (
                <span key={ci}>
                  {l
                    .replace(/(".*?")/g, '<S>"$1"</S>')
                    .replace(/(\/\/.*$)/g, '<C>$1</C>')
                    .split(/(<S>.*?<\/S>|<C>.*?<\/C>)/)
                    .map((part, pi) => {
                      if (part.startsWith("<S>")) return <span key={pi} style={{ color: "#86EFAC" }}>{part.slice(3, -4)}</span>;
                      if (part.startsWith("<C>")) return <span key={pi} style={{ color: "#6B7280", fontStyle: "italic" }}>{part.slice(3, -4)}</span>;
                      // keyword highlight
                      const keywords = /\b(import|export|from|const|let|var|function|return|interface|type|extends|implements|class|new|if|else|for|while|async|await|true|false|null|undefined)\b/g;
                      const parts2 = part.split(keywords);
                      return parts2.map((p2, p2i) =>
                        keywords.test(p2) ? <span key={p2i} style={{ color: "#C4B5FD" }}>{p2}</span> : p2
                      );
                    })
                  }
                  {"\n"}
                </span>
              ))}
            </code>
          </pre>
        </div>
      );
      continue;
    }

    // 分割线
    if (/^---+$/.test(line.trim())) {
      elements.push(<hr key={key()} style={{ border: "none", borderTop: `1px solid rgba(255,255,255,0.08)`, margin: "40px 0" }} />);
      i++; continue;
    }

    // 引用块
    if (line.startsWith("> ")) {
      const quoteLines = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <blockquote key={key()} style={{
          borderLeft: `3px solid #A78BFA`,
          margin: "28px 0", padding: "16px 20px",
          background: "rgba(167,139,250,0.06)",
          borderRadius: "0 10px 10px 0",
        }}>
          {quoteLines.map((ql, qi) => (
            <p key={qi} style={{ fontSize: 15, color: "#C4B5FD", lineHeight: 1.8, fontStyle: "italic", margin: 0 }}>
              {parseInline(ql)}
            </p>
          ))}
        </blockquote>
      );
      continue;
    }

    // 表格
    if (line.includes("|") && lines[i + 1]?.includes("---")) {
      const headers = line.split("|").map(h => h.trim()).filter(Boolean);
      i += 2; // skip separator
      const rows = [];
      while (i < lines.length && lines[i].includes("|")) {
        rows.push(lines[i].split("|").map(c => c.trim()).filter(Boolean));
        i++;
      }
      elements.push(
        <div key={key()} style={{ margin: "28px 0", overflowX: "auto", borderRadius: 10, border: `1px solid rgba(255,255,255,0.08)` }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ background: "#111113" }}>
                {headers.map((h, hi) => (
                  <th key={hi} style={{
                    padding: "10px 16px", textAlign: "left",
                    color: "#A78BFA", fontWeight: 600, fontSize: 12,
                    letterSpacing: "0.04em", textTransform: "uppercase",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} style={{ borderBottom: ri < rows.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                  {row.map((cell, ci) => (
                    <td key={ci} style={{ padding: "10px 16px", color: "#A1A1AA", lineHeight: 1.6 }}>
                      {parseInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // 无序列表
    if (/^[-*] /.test(line) || /^\s*[-*] /.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*[-*] /.test(lines[i])) {
        const isChecked = lines[i].includes("- [x] ");
        const isUnchecked = lines[i].includes("- [ ] ");
        const text = lines[i].replace(/^\s*[-*] /, "").replace(/^\[[ x]\] /, "");
        items.push({ text, isChecked, isUnchecked });
        i++;
      }
      elements.push(
        <ul key={key()} style={{ margin: "16px 0 20px", paddingLeft: 0, listStyle: "none" }}>
          {items.map((item, ii) => (
            <li key={ii} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8, fontSize: 15, color: "#A1A1AA", lineHeight: 1.7 }}>
              {item.isChecked ? (
                <span style={{ width: 18, height: 18, borderRadius: 4, background: "#A78BFA", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 3, fontSize: 11 }}>✓</span>
              ) : item.isUnchecked ? (
                <span style={{ width: 18, height: 18, borderRadius: 4, border: "1px solid rgba(255,255,255,0.15)", display: "inline-block", flexShrink: 0, marginTop: 3 }} />
              ) : (
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#A78BFA", flexShrink: 0, marginTop: 9 }} />
              )}
              <span>{parseInline(item.text)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // 有序列表
    if (/^\d+\. /.test(line)) {
      const items = [];
      let startNum = parseInt(line.match(/^(\d+)/)[1]);
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\. /, ""));
        i++;
      }
      elements.push(
        <ol key={key()} style={{ margin: "16px 0 20px", paddingLeft: 0, listStyle: "none" }}>
          {items.map((item, ii) => (
            <li key={ii} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 8, fontSize: 15, color: "#A1A1AA", lineHeight: 1.7 }}>
              <span style={{
                width: 22, height: 22, borderRadius: 6,
                background: "rgba(167,139,250,0.1)",
                border: "1px solid rgba(167,139,250,0.2)",
                color: "#A78BFA", fontSize: 11, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, marginTop: 2,
              }}>{startNum + ii}</span>
              <span>{parseInline(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // 标题
    const h1 = line.match(/^# (.+)/);
    const h2 = line.match(/^## (.+)/);
    const h3 = line.match(/^### (.+)/);

    if (h1) {
      elements.push(
        <h1 key={key()} style={{ fontFamily: theme.font.display, fontSize: "clamp(28px,4vw,40px)", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1.15, margin: "48px 0 20px", color: "#FAFAFA" }}>
          {parseInline(h1[1])}
        </h1>
      );
      i++; continue;
    }
    if (h2) {
      elements.push(
        <h2 key={key()} style={{ fontFamily: theme.font.display, fontSize: "clamp(20px,3vw,28px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.2, margin: "44px 0 16px", color: "#FAFAFA" }}>
          {parseInline(h2[1])}
        </h2>
      );
      i++; continue;
    }
    if (h3) {
      elements.push(
        <h3 key={key()} style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.01em", margin: "32px 0 12px", color: "#E4E4E7" }}>
          {parseInline(h3[1])}
        </h3>
      );
      i++; continue;
    }

    // 普通段落
    const paraLines = [];
    while (i < lines.length && lines[i].trim() && !lines[i].startsWith("#") && !lines[i].startsWith(">") && !lines[i].startsWith("```") && !/^[-*] /.test(lines[i]) && !/^\d+\. /.test(lines[i]) && !lines[i].includes("|") && !/^---+$/.test(lines[i].trim())) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length) {
      elements.push(
        <p key={key()} style={{ fontSize: 15, color: "#A1A1AA", lineHeight: 1.85, margin: "0 0 20px" }}>
          {parseInline(paraLines.join(" "))}
        </p>
      );
    }
  }

  return <div>{elements}</div>;
};

const blogPosts = [
  {
    id: 1,
    title: "用 Aura 建立统一的内容系统",
    excerpt: "从视觉 token、暗色卡片到文章阅读体验，拆解如何让博客与产品页面保持一致。",
    content: `# 用 Aura 建立统一的内容系统

Aura 的核心是少量稳定 token、克制的暗色 surface，以及可复用的内容卡片。

## 组件化

- 导航、背景、页头与卡片都抽成共享组件
- 页面只组合内容，不重复设计语言

> 好的设计系统会让不同页面像同一套产品。`,
    category: "设计系统", categoryColor: theme.colors.accent, tags: ["Aura", "设计系统", "React"], date: "2026-05-11", readTime: "6 min", featured: true,
    author: { name: "NEWSET", role: "Creator", avatar: "N" },
  },
  {
    id: 2, title: "Issue Blog 的数据流", excerpt: "使用 GitHub Issues 管理文章、标签和评论的轻量实践。",
    content: `# Issue Blog 的数据流

文章来自 Issue，标签来自 Label，评论来自 Comment。`,
    category: "开发技巧", categoryColor: theme.colors.teal, tags: ["GitHub", "Blog"], date: "2026-05-10", readTime: "4 min",
    author: { name: "NEWSET", role: "Builder", avatar: "N" },
  },
  {
    id: 3, title: "暗色界面的排版层级", excerpt: "用 display 字体、低对比辅助文字和柔和边框建立阅读节奏。",
    content: `# 暗色界面的排版层级

暗色界面尤其依赖间距和层级。`,
    category: "设计", categoryColor: theme.colors.coral, tags: ["Typography", "UI"], date: "2026-05-09", readTime: "5 min",
    author: { name: "NEWSET", role: "Designer", avatar: "N" },
  },
];

// ─── Blog List Page ───────────────────────────────────────────────────────────
const BlogListPage = ({ setPage, setCurrentPost }) => {
  const [activeTag, setActiveTag] = useState("全部");

  const allTags = ["全部", ...new Set(blogPosts.flatMap(p => p.tags))];
  const featured = blogPosts.find(p => p.featured);
  const rest = blogPosts.filter(p => !p.featured).filter(p =>
    activeTag === "全部" || p.tags.includes(activeTag)
  );

  const openPost = (post) => {
    setCurrentPost(post);
    setPage("blog-post");
  };

  return (
    <div style={{ minHeight: "100vh", paddingTop: 80 }}>
      {/* Header */}
      <div style={{ padding: "72px 24px 56px", textAlign: "center", maxWidth: 680, margin: "0 auto" }}>
        <span className="tag" style={{ marginBottom: 20, display: "inline-flex" }}>博客 Blog</span>
        <h1 style={{
          fontFamily: theme.font.display,
          fontSize: "clamp(38px,6vw,64px)",
          fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 18,
        }}>
          思考、教程<br />
          <span className="shimmer-text">与深度洞察</span>
        </h1>
        <p style={{ fontSize: 17, color: theme.colors.textSecondary, lineHeight: 1.7 }}>
          来自 Aura 团队关于设计、工程与 AI 的一手经验分享。
        </p>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 100px" }}>
        {/* Featured Post */}
        {featured && (
          <div
            onClick={() => openPost(featured)}
            style={{
              background: theme.colors.bgCard,
              border: `1px solid ${theme.colors.border}`,
              borderRadius: 20, overflow: "hidden", marginBottom: 48,
              cursor: "pointer", transition: "all 0.25s ease",
              display: "grid", gridTemplateColumns: "1fr 1fr",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(167,139,250,0.3)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = theme.colors.border; e.currentTarget.style.transform = "none"; }}
          >
            {/* Cover placeholder */}
            <div style={{
              background: "linear-gradient(135deg, rgba(167,139,250,0.12) 0%, rgba(45,212,191,0.08) 100%)",
              minHeight: 320, display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", inset: 0,
                backgroundImage: `repeating-linear-gradient(45deg, rgba(167,139,250,0.04) 0px, rgba(167,139,250,0.04) 1px, transparent 1px, transparent 12px)`,
              }} />
              <div style={{
                width: 80, height: 80, borderRadius: 20,
                background: "linear-gradient(135deg, #A78BFA, #2DD4BF)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 36, animation: "float 4s ease infinite",
              }}>✦</div>
            </div>

            {/* Content */}
            <div style={{ padding: "40px 44px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 20 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: featured.categoryColor, textTransform: "uppercase", letterSpacing: "0.06em", background: `${featured.categoryColor}12`, padding: "3px 10px", borderRadius: 100, border: `1px solid ${featured.categoryColor}25` }}>
                  {featured.category}
                </span>
                <span style={{ fontSize: 11, color: theme.colors.textMuted }}>精选</span>
              </div>
              <h2 style={{ fontFamily: theme.font.display, fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 16 }}>
                {featured.title}
              </h2>
              <p style={{ fontSize: 14, color: theme.colors.textSecondary, lineHeight: 1.7, marginBottom: 28 }}>
                {featured.excerpt}
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: "rgba(167,139,250,0.15)", border: "1px solid rgba(167,139,250,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 600, color: theme.colors.accent,
                  }}>{featured.author.avatar}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{featured.author.name}</div>
                    <div style={{ fontSize: 11, color: theme.colors.textMuted }}>{featured.date} · {featured.readTime}</div>
                  </div>
                </div>
                <span style={{ fontSize: 13, color: theme.colors.accent }}>阅读全文 →</span>
              </div>
            </div>
          </div>
        )}

        {/* Tag Filter */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 36 }}>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              style={{
                background: activeTag === tag ? theme.colors.accent : "transparent",
                color: activeTag === tag ? "#09090B" : theme.colors.textSecondary,
                border: activeTag === tag ? "none" : `1px solid ${theme.colors.border}`,
                borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 500,
                cursor: "pointer", fontFamily: theme.font.body, transition: "all 0.15s",
              }}
            >{tag}</button>
          ))}
        </div>

        {/* Post Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
          {rest.map(post => (
            <BlogCard key={post.id} post={post} onClick={() => openPost(post)} />
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Blog Card ────────────────────────────────────────────────────────────────
const BlogCard = ({ post, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? theme.colors.bgCardHover : theme.colors.bgCard,
        border: `1px solid ${hovered ? "rgba(167,139,250,0.25)" : theme.colors.border}`,
        borderRadius: 16, overflow: "hidden", cursor: "pointer",
        transition: "all 0.22s ease",
        transform: hovered ? "translateY(-3px)" : "none",
      }}
    >
      {/* Mini cover */}
      <div style={{
        height: 140,
        background: `linear-gradient(135deg, ${post.categoryColor}10 0%, ${post.categoryColor}06 100%)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
        borderBottom: `1px solid ${theme.colors.border}`,
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `repeating-linear-gradient(135deg, ${post.categoryColor}08 0px, ${post.categoryColor}08 1px, transparent 1px, transparent 10px)`,
        }} />
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: `${post.categoryColor}20`,
          border: `1px solid ${post.categoryColor}35`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22,
        }}>
          {post.category === "设计系统" ? "✦" :
           post.category === "开发技巧" ? "⌘" :
           post.category === "设计" ? "◈" : "◎"}
        </div>
      </div>

      <div style={{ padding: "20px 22px 22px" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
          <span style={{
            fontSize: 10, fontWeight: 700, color: post.categoryColor,
            textTransform: "uppercase", letterSpacing: "0.07em",
            background: `${post.categoryColor}12`, padding: "2px 9px",
            borderRadius: 100, border: `1px solid ${post.categoryColor}25`,
          }}>{post.category}</span>
          <span style={{ fontSize: 11, color: theme.colors.textMuted }}>{post.readTime}</span>
        </div>

        <h3 style={{
          fontFamily: theme.font.display,
          fontSize: "clamp(15px,2vw,18px)", fontWeight: 400,
          letterSpacing: "-0.015em", lineHeight: 1.3, marginBottom: 10,
          color: hovered ? "#FAFAFA" : "#E4E4E7",
          transition: "color 0.2s",
        }}>
          {post.title}
        </h3>

        <p style={{ fontSize: 13, color: theme.colors.textSecondary, lineHeight: 1.65, marginBottom: 18 }}>
          {post.excerpt}
        </p>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
          {post.tags.slice(0, 3).map(tag => (
            <span key={tag} style={{
              fontSize: 10, color: theme.colors.textMuted, fontWeight: 500,
              background: "rgba(255,255,255,0.04)", border: `1px solid ${theme.colors.border}`,
              padding: "2px 8px", borderRadius: 100,
            }}>{tag}</span>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{
            width: 26, height: 26, borderRadius: "50%",
            background: `${post.categoryColor}20`,
            border: `1px solid ${post.categoryColor}30`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 600, color: post.categoryColor,
          }}>{post.author.avatar}</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600 }}>{post.author.name}</div>
            <div style={{ fontSize: 11, color: theme.colors.textMuted }}>{post.date}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Blog Post Page ───────────────────────────────────────────────────────────
const BlogPostPage = ({ post, setPage }) => {
  const [progress, setProgress] = useState(0);
  const related = blogPosts.filter(p => p.id !== post.id).slice(0, 2);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? Math.round((scrolled / total) * 100) : 0);
    };
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ minHeight: "100vh", paddingTop: 64 }}>
      {/* Reading progress bar */}
      <div style={{
        position: "fixed", top: 64, left: 0, right: 0, height: 2, zIndex: 99,
        background: "rgba(255,255,255,0.05)",
      }}>
        <div style={{
          height: "100%", width: `${progress}%`,
          background: "linear-gradient(90deg, #A78BFA, #2DD4BF)",
          transition: "width 0.1s linear",
        }} />
      </div>

      {/* Back button */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px 0" }}>
        <button
          onClick={() => setPage("blog")}
          style={{
            background: "none", border: "none", color: theme.colors.textMuted,
            fontSize: 13, cursor: "pointer", fontFamily: theme.font.body,
            display: "flex", alignItems: "center", gap: 6, padding: 0,
            transition: "color 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.color = theme.colors.textPrimary}
          onMouseLeave={e => e.currentTarget.style.color = theme.colors.textMuted}
        >
          ← 返回博客
        </button>
      </div>

      {/* Article Header */}
      <header style={{ maxWidth: 760, margin: "0 auto", padding: "44px 24px 0" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 20 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, color: post.categoryColor,
            textTransform: "uppercase", letterSpacing: "0.06em",
            background: `${post.categoryColor}12`, padding: "3px 11px",
            borderRadius: 100, border: `1px solid ${post.categoryColor}25`,
          }}>{post.category}</span>
          <span style={{ fontSize: 12, color: theme.colors.textMuted }}>{post.readTime} 阅读</span>
        </div>

        <h1 style={{
          fontFamily: theme.font.display,
          fontSize: "clamp(28px,5vw,48px)",
          fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1.1,
          marginBottom: 20,
        }}>
          {post.title}
        </h1>

        <p style={{ fontSize: 18, color: theme.colors.textSecondary, lineHeight: 1.7, marginBottom: 32 }}>
          {post.excerpt}
        </p>

        {/* Author + Meta */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingBottom: 28, borderBottom: `1px solid ${theme.colors.border}`,
          flexWrap: "wrap", gap: 16,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 42, height: 42, borderRadius: "50%",
              background: `${post.categoryColor}18`,
              border: `1px solid ${post.categoryColor}30`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 15, fontWeight: 600, color: post.categoryColor,
            }}>{post.author.avatar}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{post.author.name}</div>
              <div style={{ fontSize: 12, color: theme.colors.textMuted }}>{post.author.role}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <span style={{ fontSize: 13, color: theme.colors.textMuted }}>{post.date}</span>
            <div style={{ display: "flex", gap: 6 }}>
              {post.tags.map(tag => (
                <span key={tag} style={{
                  fontSize: 11, color: theme.colors.textMuted, fontWeight: 500,
                  background: "rgba(255,255,255,0.04)", border: `1px solid ${theme.colors.border}`,
                  padding: "2px 9px", borderRadius: 100,
                }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Cover art */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "36px 24px 0" }}>
        <div style={{
          height: 320, borderRadius: 18,
          background: `linear-gradient(135deg, ${post.categoryColor}12 0%, rgba(45,212,191,0.07) 50%, rgba(251,113,133,0.06) 100%)`,
          border: `1px solid ${theme.colors.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden",
          marginBottom: 8,
        }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `repeating-linear-gradient(45deg, ${post.categoryColor}05 0px, ${post.categoryColor}05 1px, transparent 1px, transparent 14px)`,
          }} />
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 16, position: "relative",
          }}>
            <div style={{
              width: 80, height: 80, borderRadius: 20,
              background: `${post.categoryColor}20`,
              border: `1px solid ${post.categoryColor}35`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 36, animation: "float 5s ease infinite",
            }}>
              {post.category === "设计系统" ? "✦" :
               post.category === "开发技巧" ? "⌘" :
               post.category === "设计" ? "◈" : "◎"}
            </div>
            <span style={{ fontSize: 13, color: post.categoryColor, fontWeight: 500, letterSpacing: "0.04em" }}>
              {post.category}
            </span>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <article style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px 64px" }}>
        <MarkdownRenderer content={post.content} />
      </article>

      {/* Article Footer */}
      <div style={{
        maxWidth: 760, margin: "0 auto 80px", padding: "0 24px",
      }}>
        <div style={{
          background: theme.colors.bgCard, border: `1px solid ${theme.colors.border}`,
          borderRadius: 16, padding: "28px 32px",
          display: "flex", alignItems: "center", gap: 20,
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: "50%",
            background: `${post.categoryColor}18`,
            border: `1px solid ${post.categoryColor}30`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, fontWeight: 600, color: post.categoryColor, flexShrink: 0,
          }}>{post.author.avatar}</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>关于作者：{post.author.name}</div>
            <div style={{ fontSize: 13, color: theme.colors.textSecondary, lineHeight: 1.6 }}>
              {post.author.role}，专注于{post.category}领域。在 Aura 团队负责核心产品体验设计与工程实践。
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {related.length > 0 && (
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 100px" }}>
          <div style={{ marginBottom: 28 }}>
            <p className="section-label" style={{ marginBottom: 8 }}>继续阅读</p>
            <h2 style={{ fontFamily: theme.font.display, fontSize: 28, fontWeight: 400, letterSpacing: "-0.02em" }}>
              相关文章
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
            {related.map(p => (
              <BlogCard key={p.id} post={p} onClick={() => {
                setPage("blog-post-loading");
                setTimeout(() => {
                  window.scrollTo(0, 0);
                }, 10);
              }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [currentPost, setCurrentPost] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const renderPage = () => {
    switch (page) {
      case "skills":    return <SkillsPage />;
      case "pricing":   return <PricingPage />;
      case "docs":      return <DocsPage />;
      case "blog":      return <BlogListPage setPage={setPage} setCurrentPost={setCurrentPost} />;
      case "blog-post": return currentPost ? <BlogPostPage post={currentPost} setPage={setPage} /> : <BlogListPage setPage={setPage} setCurrentPost={setCurrentPost} />;
      default:
        return (
          <>
            <Hero setPage={setPage} />
            <LogoStrip />
            <FeatureGrid />
            <StatsBar />
            <Testimonials />
            <CTASection />
          </>
        );
    }
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <AuraStyleProvider>
        <AuraNavbar currentPage={page} setPage={setPage} name="Aura" items={[
          { label: "产品", page: "home" },
          { label: "技能", page: "skills" },
          { label: "定价", page: "pricing" },
          { label: "文档", page: "docs" },
          { label: "博客", page: "blog" },
        ]} />
        <main>{renderPage()}</main>
        <AuraFooter setPage={setPage} name="Aura" />
      </AuraStyleProvider>
    </div>
  );
}