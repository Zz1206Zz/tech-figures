export const siteConfig = {
  name: "曾学长",
  nameEn: "ZENG XUEZHANG",
  systemName: "AI LEARNING SYSTEM",
  location: "广州增城",
  price: "60-100元/小时",
};

export const heroStatus = [
  { label: "在线可咨询", status: "online" },
  { label: "广州增城", status: "location" },
  { label: "数学·物理·英语", status: "subjects" },
];

export const heroTypingTexts = [
  "数学辅导",
  "物理辅导",
  "英语辅导",
  "AI 赋能学习",
];

export const stats = [
  { value: 608, label: "2026高考总分", suffix: "分", accent: "default" },
  { value: 137, label: "英语单科", suffix: "分", accent: "primary" },
  { value: 3, label: "辅导科目", suffix: "科", accent: "success" },
  { value: "AI+", label: "智能学习赋能", suffix: "", accent: "warn" },
];

export const aboutInfo = [
  {
    icon: "MapPin",
    title: "所在地区",
    desc: "广州市增城区，可线下授课，也支持线上远程辅导",
  },
  {
    icon: "GraduationCap",
    title: "当前身份",
    desc: "2026届高考生，刚走出高考考场，对最新命题趋势和考点记忆犹新",
  },
  {
    icon: "BookOpen",
    title: "辅导范围",
    desc: "小学、初中、高中：数学、物理、英语全科辅导",
  },
  {
    icon: "Monitor",
    title: "授课方式",
    desc: "线上一对一 · 线下面对面 · 灵活选择",
  },
];

export const methods = [
  {
    step: "01",
    title: "分析题型",
    desc: "教你识别题目类型，快速定位考点，知道出题人在考什么",
  },
  {
    step: "02",
    title: "拆解思路",
    desc: "把复杂问题拆解成小步骤，每一步都有逻辑可循，不再凭感觉做题",
  },
  {
    step: "03",
    title: "举一反三",
    desc: "掌握方法后能迁移到未知题型，真正学会「钓鱼」而不是只拿到「鱼」",
  },
];

export const subjects = [
  {
    id: "math",
    icon: "Sigma",
    title: "数学辅导",
    desc: "覆盖小学到高中数学，包括代数、几何、函数、概率统计、微积分等。擅长总结题型规律，用清晰的逻辑链帮学生建立解题框架。",
  },
  {
    id: "physics",
    icon: "Atom",
    title: "物理辅导",
    desc: "精通力学、电磁学、热学、光学等物理核心模块。擅长用生活化的比喻和直观分析帮学生理解物理原理，建立物理模型思维。",
  },
  {
    id: "english",
    icon: "Languages",
    title: "英语辅导",
    desc: "高考英语137分实战经验。覆盖语法精讲、阅读理解提分技巧、写作模板与高级表达、听力训练方法等。",
  },
];

export const aiShowcase = {
  title: "AI 自主建站能力",
  description: "从需求分析到设计实现，全程借助 AI 独立完成。快速学习新技术栈，将创意转化为实际产品。",
  badges: ["AI 生成", "快速学习", "创造力"],
  codeLines: [
    "// 曾学长 · AI 学习系统",
    "import { useState, useEffect } from 'react'",
    "import gsap from 'gsap'",
    "",
    "export default function CyberResume() {",
    "  const [isReady, setIsReady] = useState(false)",
    "  ",
    "  useEffect(() => {",
    "    gsap.to('.hero-title', {",
    "      opacity: 1,",
    "      y: 0,",
    "      duration: 0.8,",
    "      ease: 'power2.out'",
    "    })",
    "    setIsReady(true)",
    "  }, [])",
    "",
    "  return (",
    "    <div className='cyber-resume'>",
    "      <h1 className='hero-title'>",
    "        你好，我是曾学长",
    "      </h1>",
    "      <p>高考608分 · 英语137分</p>",
    "      <p>AI 赋能 · 方法大于刷题</p>",
    "    </div>",
    "  )",
    "}",
  ],
};

export const strengths = [
  {
    icon: "Zap",
    title: "AI 自主建站能力",
    desc: "从需求到上线，借助 AI 独立完成网站开发，创造力和学习力强劲，持续探索新技术。",
    highlight: true,
  },
  {
    icon: "TrendingUp",
    title: "最新鲜的高考经验",
    desc: "2026年刚考完高考，对最新题型、命题方向、应试策略记忆犹新，给你最贴近当前高考的辅导。",
  },
  {
    icon: "Globe",
    title: "英语实力过硬",
    desc: "高考英语137分，语法基础扎实，阅读理解和写作都有自己的方法论，全方位提升英语水平。",
  },
  {
    icon: "Target",
    title: "授人以渔的教学理念",
    desc: "不搞题海战术，不教死记硬背。注重方法传授和思维训练，让学生真正具备独立解题能力。",
  },
  {
    icon: "Bot",
    title: "AI 赋能，效率翻倍",
    desc: "熟练运用AI工具辅助教学，为学生定制个性化学习方案、智能错题分析，让学习更高效。",
  },
  {
    icon: "Handshake",
    title: "年龄相近，沟通零障碍",
    desc: "作为刚考完高考的学长，和学生之间没有代沟，更懂学生的困惑和卡点在哪里。",
  },
];

export const quoteData = {
  text: "没有提不上去的分，只要方法通了，就能解决一切。",
  author: "曾学长",
};

export const contactData = {
  title: "随时欢迎咨询",
  description: "如果你或你的孩子需要数学、物理、英语辅导，或者只是想聊聊学习方法，欢迎扫码添加微信。",
  qrImage: "/assets/wechat-qr.jpg",
  qrText: "微信扫一扫添加",
  infoTags: ["广州增城", "线上线下均可", "60-100元/小时", "首节优惠试听"],
};

export const navItems = [
  { id: "hero", label: "主控台", icon: "Terminal" },
  { id: "stats", label: "数据面板", icon: "BarChart3" },
  { id: "about", label: "关于我", icon: "User" },
  { id: "method", label: "教学法", icon: "Lightbulb" },
  { id: "subjects", label: "辅导科目", icon: "BookMarked" },
  { id: "ai-showcase", label: "AI 能力", icon: "Sparkles" },
  { id: "strengths", label: "核心优势", icon: "ShieldCheck" },
  { id: "quote", label: "教学理念", icon: "Quote" },
  { id: "contact", label: "联系方式", icon: "MessageCircle" },
];
