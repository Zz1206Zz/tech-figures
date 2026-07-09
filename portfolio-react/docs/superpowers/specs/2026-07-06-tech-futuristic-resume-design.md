# 科技未来感简历网站设计文档

## 概述

将现有的 React + Vite 简历网站升级为"国奖级"科技未来感作品。通过集成 React Bits 精选组件和 GSAP ScrollTrigger 动画，打造沉浸式交互体验，同时保持简历内容的清晰可读性。

## 目标

- 视觉冲击力达到国奖评审级别
- 每个动效都有明确目的：强化简历内容表达，非炫技
- 展示强烈的 AI 学习能力（结尾声明）
- 性能可接受（60fps，移动端降级）

## 技术栈

- React 19 + Vite
- three.js + postprocessing（GridScan 背景）
- GSAP + @gsap/react + ScrollTrigger（滚动动画）
- framer-motion（Counter 数字计数）
- React Bits 组件（Split Text, Shiny Text, Counter, Tilted Card, Scroll Velocity, Border Glow）

## 组件清单与职责

### 1. GridScan（已有，保留优化）
- **位置**：全局固定背景 `position: fixed`
- **参数调整**：`scanColor` 改为蓝紫渐变，`bloomIntensity` 提升至 0.6
- **交互**：鼠标跟随透视，扫描线循环

### 2. Split Text（新增）
- **依赖**：gsap, @gsap/react
- **用途**：
  - Hero 标题"你好，我是曾学长"逐字浮现
  - 各章节标题滚动触发逐字/逐词浮现
- **参数**：`splitType="chars"`, `duration=1.25`, `ease="power3.out"`

### 3. Shiny Text（新增）
- **依赖**：无（纯 CSS）
- **用途**：
  - 章节标签（"关于我"、"教学方法"等）闪光效果
  - 重点关键词高亮
- **参数**：`speed=2.5`, `shineColor="#0071e3"`

### 4. Counter（新增）
- **依赖**：framer-motion
- **用途**：数据卡片数字从 0 滚动到目标值（608、137）
- **触发**：ScrollTrigger 进入视口时启动

### 5. Tilted Card（新增）
- **依赖**：motion
- **用途**：科目卡片（数学/物理/英语）3D 倾斜悬停
- **参数**：`rotateAmplitude=8`, `scaleOnHover=1.05`

### 6. Scroll Velocity Text（新增）
- **依赖**：gsap
- **用途**：章节间滚动速度文字横幅（如"数学 · 物理 · 英语 · AI赋能"）
- **效果**：文字随滚动速度左右移动

### 7. Border Glow（新增）
- **依赖**：无（纯 CSS）
- **用途**：卡片悬停时边框发光效果

## GSAP ScrollTrigger 动画

### 全局
- **滚动进度条**：顶部 2px 细线，宽度随滚动进度变化
- **自定义光标**：带蓝色发光的圆形光标，悬停按钮时放大

### Hero 区
- **钉住（Pin）**：首屏钉住 1 屏高度，滚动时标题视差上移+淡出
- **入场动画**：eyebrow → 标题(Split Text) → 副标题 → 按钮依次淡入

### 数据区
- **Counter 触发**：滚到视图时数字从 0 计数到目标值
- **卡片入场**：4 张卡片从下方错落滑入

### 章节通用
- **标题**：Split Text 滚动触发逐字浮现
- **内容**：从下方 30px 滑入 + 淡入，`stagger=0.15`
- **横幅**：章节间 Scroll Velocity 文字

### 磁性按钮
- CTA 按钮跟随鼠标位置轻微偏移（±8px）

## 新增结尾模块：AI 声明

在"联系我"板块下方新增一个全宽模块：

```
┌─────────────────────────────────────┐
│                                     │
│    ✨ 以上网站均由我一人通过AI完成    │
│                                     │
│  从设计到代码，从动画到部署          │
│  AI 不是替代人类，而是放大人类能力    │
│  这正是我想教给你的学习方式           │
│                                     │
└─────────────────────────────────────┘
```

- 背景：蓝紫渐变光晕
- 文字：Shiny Text 闪光效果
- 入场：ScrollTrigger 淡入 + 缩放

## 页面结构（更新后）

```
App
├── GridScan（固定背景）
├── 噪点层
├── 滚动进度条
├── 自定义光标
├── Nav（毛玻璃导航栏）
├── Main
│   ├── Hero（钉住 + Split Text + 磁性按钮）
│   ├── Stats（Counter 数字滚动）
│   ├── Scroll Velocity 横幅
│   ├── About（Split Text 标题 + 卡片滑入）
│   ├── Scroll Velocity 横幅
│   ├── Method（Tilted Card + Border Glow）
│   ├── Scroll Velocity 横幅
│   ├── AI Section（渐变光晕 + Shiny Text）
│   ├── Subjects（Tilted Card）
│   ├── Scroll Velocity 横幅
│   ├── Why（列表滑入）
│   ├── Contact（居中卡片）
│   └── AI Declaration（新增结尾声明）✨
└── Footer
```

## 性能策略

- GridScan `opacity: 0.4`，降低 GPU 负载
- 移动端禁用 GridScan，改用静态渐变背景
- ScrollTrigger 使用 `markers: false`，`once: true`（动画只触发一次）
- 图片/组件懒加载
- `will-change: transform` 仅在动画元素上使用

## 移动端适配

- GridScan → 静态深色背景
- Tilted Card → 关闭倾斜，保留悬停放大
- 自定义光标 → 禁用
- Scroll Velocity → 简化为静态文字
- Split Text → 保留（性能影响小）

## 文件结构

```
src/
├── components/
│   ├── GridScan/          (已有)
│   ├── SplitText/         (新增)
│   ├── ShinyText/         (新增)
│   ├── Counter/           (新增)
│   ├── TiltedCard/        (新增)
│   ├── ScrollVelocity/    (新增)
│   ├── BorderGlow/        (新增)
│   ├── MagneticButton/    (新增)
│   ├── CustomCursor/      (新增)
│   └── ScrollProgress/    (新增)
├── hooks/
│   └── useScrollAnimation.js  (新增 - GSAP ScrollTrigger 封装)
├── App.jsx                (重写)
├── App.css                (重写)
└── main.jsx
```

## 验收标准

1. 首屏加载 3 秒内完成
2. 所有动画 60fps（桌面端）
3. 移动端可正常浏览，无卡顿
4. 所有 React Bits 组件正确渲染
5. GSAP ScrollTrigger 动画触发准确
6. 结尾 AI 声明模块清晰可见
7. 响应式适配 320px-1920px
