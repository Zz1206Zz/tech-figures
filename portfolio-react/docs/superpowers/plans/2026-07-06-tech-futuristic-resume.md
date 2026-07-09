# 科技未来感简历网站实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将现有 React 简历网站升级为国奖级科技未来感作品，集成 React Bits 组件和 GSAP 动画

**Architecture:** 在现有 portfolio-react 项目基础上，新增 7 个 React Bits 组件 + 3 个自定义组件 + GSAP ScrollTrigger 动画系统，重写 App.jsx 整合所有效果

**Tech Stack:** React 19, Vite, three.js, GSAP + ScrollTrigger, framer-motion, motion

## Global Constraints

- 保持纯黑背景 + Apple 系统色彩方案
- 所有动画桌面端 60fps，移动端降级
- GridScan 背景保持 opacity 0.4-0.6
- 中文内容，代码注释中文
- 保留原有简历内容不变

---

### Task 1: 安装依赖

**Files:**
- Modify: `e:\1\portfolio-react\package.json`

- [ ] **Step 1: 安装 GSAP 和动画依赖**

Run: `npm install gsap @gsap/react framer-motion motion`

- [ ] **Step 2: 验证安装成功**

Run: `npm ls gsap framer-motion motion`
Expected: 所有包已安装，无错误

---

### Task 2: 创建 React Bits 组件 — ShinyText

**Files:**
- Create: `e:\1\portfolio-react\src\components\ShinyText\ShinyText.jsx`
- Create: `e:\1\portfolio-react\src\components\ShinyText\ShinyText.css`

**Interfaces:**
- Produces: `<ShinyText text="" color="" shineColor="" speed={2} />`

- [ ] **Step 1: 创建 ShinyText 组件（纯 CSS 闪光文字效果）**

- [ ] **Step 2: 创建 ShinyText.css 样式**

---

### Task 3: 创建 React Bits 组件 — SplitText

**Files:**
- Create: `e:\1\portfolio-react\src\components\SplitText\SplitText.jsx`
- Create: `e:\1\portfolio-react\src\components\SplitText\SplitText.css`

**Interfaces:**
- Produces: `<SplitText text="" splitType="chars" delay={50} duration={1.25} />`
- Consumes: gsap, @gsap/react, ScrollTrigger

- [ ] **Step 1: 创建 SplitText 组件（GSAP 逐字浮现，ScrollTrigger 触发）**

- [ ] **Step 2: 创建 SplitText.css 样式**

---

### Task 4: 创建 React Bits 组件 — Counter

**Files:**
- Create: `e:\1\portfolio-react\src\components\Counter\Counter.jsx`
- Create: `e:\1\portfolio-react\src\components\Counter\Counter.css`

**Interfaces:**
- Produces: `<Counter value={608} fontSize={56} textColor="#0071e3" />`
- Consumes: framer-motion

- [ ] **Step 1: 创建 Counter 组件（数字滚动计数，IntersectionObserver 触发）**

- [ ] **Step 2: 创建 Counter.css 样式**

---

### Task 5: 创建 React Bits 组件 — TiltedCard

**Files:**
- Create: `e:\1\portfolio-react\src\components\TiltedCard\TiltedCard.jsx`
- Create: `e:\1\portfolio-react\src\components\TiltedCard\TiltedCard.css`

**Interfaces:**
- Produces: `<TiltedCard rotateAmplitude={8} scaleOnHover={1.05}>...</TiltedCard>`
- Consumes: react hooks (无外部依赖)

- [ ] **Step 1: 创建 TiltedCard 组件（3D 倾斜悬停效果）**

- [ ] **Step 2: 创建 TiltedCard.css 样式**

---

### Task 6: 创建 React Bits 组件 — ScrollVelocity

**Files:**
- Create: `e:\1\portfolio-react\src\components\ScrollVelocity\ScrollVelocity.jsx`
- Create: `e:\1\portfolio-react\src\components\ScrollVelocity\ScrollVelocity.css`

**Interfaces:**
- Produces: `<ScrollVelocity text="数学 · 物理 · 英语" speed={2} />`
- Consumes: gsap, ScrollTrigger

- [ ] **Step 1: 创建 ScrollVelocity 组件（滚动速度文字横幅）**

- [ ] **Step 2: 创建 ScrollVelocity.css 样式**

---

### Task 7: 创建自定义组件 — MagneticButton, CustomCursor, ScrollProgress

**Files:**
- Create: `e:\1\portfolio-react\src\components\MagneticButton\MagneticButton.jsx`
- Create: `e:\1\portfolio-react\src\components\CustomCursor\CustomCursor.jsx`
- Create: `e:\1\portfolio-react\src\components\CustomCursor\CustomCursor.css`
- Create: `e:\1\portfolio-react\src\components\ScrollProgress\ScrollProgress.jsx`
- Create: `e:\1\portfolio-react\src\components\ScrollProgress\ScrollProgress.css`

- [ ] **Step 1: 创建 MagneticButton（磁性按钮，鼠标跟随偏移）**

- [ ] **Step 2: 创建 CustomCursor（自定义发光光标）**

- [ ] **Step 3: 创建 ScrollProgress（顶部滚动进度条）**

---

### Task 8: 创建 GSAP 滚动动画 Hook

**Files:**
- Create: `e:\1\portfolio-react\src\hooks\useScrollAnimation.js`

**Interfaces:**
- Produces: `useScrollAnimation(ref, options)` - 通用滚动动画封装

- [ ] **Step 1: 创建 useScrollAnimation hook（封装 GSAP ScrollTrigger）**

---

### Task 9: 重写 App.jsx 整合所有组件

**Files:**
- Modify: `e:\1\portfolio-react\src\App.jsx`

- [ ] **Step 1: 导入所有新组件**

- [ ] **Step 2: 在 Hero 区使用 SplitText + MagneticButton**

- [ ] **Step 3: 在 Stats 区使用 Counter**

- [ ] **Step 4: 在章节间插入 ScrollVelocity 横幅**

- [ ] **Step 5: 在 Method/Subjects 区使用 TiltedCard**

- [ ] **Step 6: 在章节标签使用 ShinyText**

- [ ] **Step 7: 添加 ScrollProgress 和 CustomCursor**

- [ ] **Step 8: 添加结尾 AI 声明模块**

---

### Task 10: 重写 App.css 适配新组件

**Files:**
- Modify: `e:\1\portfolio-react\src\App.css`

- [ ] **Step 1: 更新样式适配所有新组件**

- [ ] **Step 2: 添加移动端降级样式**

---

### Task 11: 构建测试与验证

- [ ] **Step 1: 运行 npm run build 验证无错误**

- [ ] **Step 2: 启动 dev server 预览效果**

- [ ] **Step 3: 验证所有组件正常渲染**
