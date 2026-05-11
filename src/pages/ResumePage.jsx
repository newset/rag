import { PageHero } from '../components/ui/AuraUI';
import '../pages.css';

const sections = [
  ['基本信息', ['姓名：【待补充】', '职位方向：【待补充】', '所在地：【待补充】', '联系方式：【待补充】']],
  ['个人简介', ['【待补充：用 2-3 句话介绍你的核心能力、经验年限和职业目标。】']],
  ['工作经历', ['公司名称 / 职位 / 时间：【待补充】', '主要职责：【待补充】', '关键成果：【待补充】']],
  ['项目经历', ['项目名称：【待补充】', '项目描述：【待补充】', '个人贡献：【待补充】', '技术栈：【待补充】']],
  ['教育背景', ['学校 / 专业 / 学历 / 时间：【待补充】']],
  ['技能清单', ['编程语言：【待补充】', '框架与工具：【待补充】', '其他能力：【待补充】']],
];

export default function ResumePage() {
  return (
    <div className="resume-page aura-page">
      <PageHero label="Resume" title="个人简历" highlight="与能力地图" description="以 Aura 组件重新组织的简历页面，保留可编辑内容占位，同时统一暗色视觉和卡片节奏。" />
      <article className="resume-grid aura-container">
        {sections.map(([title, items], index) => (
          <section className="resume-card" key={title}>
            <span className="resume-index">{String(index + 1).padStart(2, '0')}</span>
            <h2>{title}</h2>
            <ul>
              {items.map(item => <li key={item}>{item}</li>)}
            </ul>
          </section>
        ))}
      </article>
    </div>
  );
}
