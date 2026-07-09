---
name: "reatbits"
description: "从 React Bits 官网获取任意组件的完整源码并正确集成到 React 项目中。支持背景效果、文字动画、交互组件、动画组件等全品类组件。当用户要求使用 React Bits 组件、添加炫酷UI动效、或提到 reactbits/reatbits/具体组件名时调用。"
---

# ReatBits - React Bits 全组件集成技能

从 React Bits 官网（https://www.reactbits.dev）获取任意高质量开源 React 组件的完整源码，并按照标准流程正确集成到项目中。

## 何时使用

- 用户要求添加任何 React Bits 组件（GridScan、ShinyText、SplitText、TiltedCard、Counter、Dock、Aurora、GridMotion 等）
- 用户想要炫酷的科技感/未来感/高级感 UI 动效
- 用户提到 "react bits"、"reactbits"、"reatbits" 或具体组件名称
- 需要给网站增加背景效果、文字动画、交互动效
- 不确定用什么组件，想要推荐合适的 React Bits 组件

## 通用集成流程（适用于所有组件）

### 第一步：确定组件和访问地址

**官网地址格式：**
```
https://www.reactbits.dev/<category>/<component-kebab-name>
```

**先查阅下方「组件全库索引」**，找到组件对应的分类路径和依赖信息。

### 第二步：获取完整源码

使用浏览器或 WebFetch 打开组件页面，必须获取以下全部内容：

| 内容 | 说明 | 重要性 |
|------|------|--------|
| JSX/TSX 组件代码 | 完整的组件源码，不能有任何省略 | ⭐⭐⭐⭐⭐ |
| CSS 样式代码 | 组件对应的样式文件 | ⭐⭐⭐⭐⭐ |
| Dependencies 列表 | 需要安装的 npm 包 | ⭐⭐⭐⭐⭐ |
| Props 说明表 | 组件的所有参数和默认值 | ⭐⭐⭐⭐ |
| 使用示例代码 | 官网的 Demo 用法 | ⭐⭐⭐ |

> ⚠️ **铁则：代码不完整绝不集成。** 尤其是 shader 代码、长字符串、大段逻辑，必须 100% 完整复制。

### 第三步：安装依赖

先检查项目 `package.json`，已有依赖跳过，没有的安装：
```bash
npm install <package1> <package2> ...
```

### 第四步：创建组件文件

统一文件结构：
```
src/
  components/
    <ComponentName>/
      <ComponentName>.jsx    # 或 .tsx
      <ComponentName>.css
```

**命名规范：**
- 文件夹名：大驼峰（PascalCase），与组件名一致
- 文件名：与组件名一致
- CSS 类名前缀：组件名的小驼峰（kebab-case）

### 第五步：代码适配

1. **导出方式**：统一 `export default ComponentName`，同时保留 named export
2. **CSS 引入**：组件内 `import './ComponentName.css'`
3. **默认值**：保留官网所有默认 props
4. **TypeScript**：JS 项目用 `.jsx`，TS 项目用 `.tsx`，类型按需补
5. **路径修正**：确保所有 import 路径正确

### 第六步：集成到项目

1. 在目标页面/组件中 import
2. 传入合适的 props（参考官网示例 + 项目风格调整）
3. 检查控制台有无报错
4. 验证交互效果是否正常
5. 检查响应式和移动端表现

### 第七步：验证清单

- [ ] 控制台无报错
- [ ] 组件渲染正常，没有白屏/黑屏
- [ ] 交互效果符合预期
- [ ] 响应式适配正常
- [ ] 没有明显性能问题
- [ ] 与其他组件/动画无冲突

---

## 组件全库索引

### 一、背景效果（Backgrounds）

| 组件名 | 路径 | 主要依赖 | 复杂度 | 说明 |
|--------|------|---------|--------|------|
| **GridScan** | `backgrounds/gridscan` | three, postprocessing, face-api.js | 高 | 3D网格扫描线背景，支持鼠标跟随和人脸识别 |
| **GridMotion** | `backgrounds/grid-motion` | three | 高 | 动态3D网格背景，波浪运动效果 |
| **Aurora** | `backgrounds/aurora` | 无（纯CSS/Canvas） | 中 | 极光渐变流动背景 |
| **Hyperspeed** | `backgrounds/hyperspeed` | three | 高 | 超光速穿越星轨效果 |
| **Voxel Grid** | `backgrounds/voxel-grid` | three | 高 | 3D体素网格背景 |
| **Hero Canvas** | `backgrounds/hero-canvas` | three | 中 | Canvas粒子/波形英雄区背景 |

### 二、文字动画（Text Animations）

| 组件名 | 路径 | 主要依赖 | 复杂度 | 说明 |
|--------|------|---------|--------|------|
| **ShinyText** | `text-animations/shiny-text` | 无（纯CSS） | 低 | 文字扫光闪光效果 |
| **SplitText** | `text-animations/split-text` | gsap, @gsap/react, ScrollTrigger | 中 | 逐字/逐词入场动画，支持滚动触发 |
| **BlurText** | `text-animations/blur-text` | framer-motion | 中 | 模糊渐入文字效果 |
| **GradientText** | `text-animations/gradient-text` | 无（纯CSS） | 低 | 渐变流动文字 |
| **Typewriter** | `text-animations/typewriter` | 无（纯React） | 低 | 打字机效果 |
| **Wavy Text** | `text-animations/wavy-text` | framer-motion | 中 | 波浪起伏文字 |

### 三、交互组件（Components）

| 组件名 | 路径 | 主要依赖 | 复杂度 | 说明 |
|--------|------|---------|--------|------|
| **TiltedCard** | `components/tilted-card` | 无（纯React+CSS） | 低 | 鼠标跟随3D倾斜卡片 |
| **Counter** | `components/counter` | framer-motion | 中 | 数字滚动计数动画 |
| **Dock** | `components/dock` | framer-motion | 中 | macOS风格Dock菜单放大效果 |
| **Magnetic** | `components/magnetic` | 无（纯React） | 低 | 磁吸按钮效果 |
| **BorderGlow** | `components/border-glow` | 无（纯CSS） | 低 | 边框发光悬停效果 |
| **Scroll Progress** | `components/scroll-progress` | 无（纯React） | 低 | 页面滚动进度条 |
| **Scroll Velocity** | `components/scroll-velocity` | 无（纯React） | 低 | 跟随滚动速度的文字条 |
| **Custom Cursor** | `components/custom-cursor` | 无（纯React） | 低 | 自定义光标样式 |

### 四、动画组件（Animations）

| 组件名 | 路径 | 主要依赖 | 复杂度 | 说明 |
|--------|------|---------|--------|------|
| **InfiniteMenu** | `animations/infinite-menu` | framer-motion | 中 | 无限循环滚动菜单 |
| **Lanyard** | `animations/lanyard` | framer-motion | 中 | 挂绳式卡片摇摆效果 |
| **ImageTrail** | `animations/image-trail` | gsap | 高 | 鼠标拖尾图片效果 |
| **Text Scramble** | `animations/text-scramble` | 无（纯React） | 中 | 文字乱码渐变效果 |

---

## 常用组件详细集成参考

### 参考一：GridScan（3D网格扫描背景）

**依赖：** `three`, `postprocessing`, `face-api.js`

**文件结构：**
```
src/components/GridScan/GridScan.jsx
src/components/GridScan/GridScan.css
```

**代码结构要点：**
- 两个 shader 字符串：`vert`（顶点着色器）、`frag`（片段着色器，很长！）
- 工具函数：`srgbColor`（颜色转换）
- 组件用 hooks：`useRef`（容器/渲染器/材质等）、`useState`（模型加载状态等）
- 多个 `useEffect`：鼠标交互、Three.js 初始化、人脸模型加载、人脸检测、摄像头启动

**关键 Props：**
| Prop | 默认值 | 说明 |
|------|--------|------|
| `sensitivity` | 0.55 | 鼠标跟随灵敏度 0-1 |
| `linesColor` | '#2F293A' | 网格线颜色 |
| `scanColor` | '#FF9FFC' | 扫描线颜色 |
| `scanOpacity` | 0.4 | 扫描线透明度 |
| `gridScale` | 0.1 | 网格密度（越小越密） |
| `enablePost` | true | 启用后期处理（bloom+色差） |
| `bloomIntensity` | 0 | 泛光强度 |
| `enableWebcam` | false | 启用摄像头人脸追踪 |

**推荐配置（深色科技风）：**
```jsx
<GridScan
  sensitivity={0.4}
  lineThickness={0.8}
  linesColor="#1a1a2e"
  gridScale={0.08}
  scanColor="#0071e3"
  scanOpacity={0.25}
  enablePost={true}
  bloomIntensity={0.3}
  bloomThreshold={0.2}
  bloomSmoothing={0.9}
  chromaticAberration={0.001}
  noiseIntensity={0.008}
  scanGlow={0.6}
  scanSoftness={2.5}
  scanDuration={3.0}
  scanDelay={1.5}
  scanDirection="pingpong"
  lineStyle="solid"
  lineJitter={0.05}
/>
```

**常见坑：**
- 不显示 → 父容器没有宽高，必须设置 `width:100%; height:100%`
- 性能差 → 降低 `scanOpacity`、关闭 `enablePost`
- 遮挡内容 → 用 `z-index` 控制层级，背景放 z-index:0

---

### 参考二：ShinyText（闪光文字）

**依赖：** 无（纯 CSS + React）

**文件结构：**
```
src/components/ShinyText/ShinyText.jsx
src/components/ShinyText/ShinyText.css
```

**代码结构要点：**
- 纯 CSS 动画实现，用 `background-clip: text` + `linear-gradient` + `@keyframes`
- 组件很简单，接收 `text`、`speed`、`shineColor`、`className` 等 props

**关键 Props：**
| Prop | 默认值 | 说明 |
|------|--------|------|
| `text` | '' | 文字内容 |
| `speed` | 3 | 扫光速度（秒） |
| `shineColor` | '#ffffff' | 闪光颜色 |
| `className` | '' | 自定义类名 |

---

### 参考三：SplitText（逐字/逐词动画）

**依赖：** `gsap`, `@gsap/react`, `gsap/ScrollTrigger`

**文件结构：**
```
src/components/SplitText/SplitText.jsx
src/components/SplitText/SplitText.css
```

**代码结构要点：**
- 用 `useGSAP` hook 管理 GSAP 动画
- 支持 `splitType`: 'chars' / 'words' / 'lines'
- 支持 `triggerOnLoad`（入场即触发）和滚动触发（ScrollTrigger）
- 支持 `from` / `to` 自定义动画状态
- 每个字符/词包在 `.split-child` span 里

**关键 Props：**
| Prop | 默认值 | 说明 |
|------|--------|------|
| `text` | '' | 文字内容 |
| `splitType` | 'chars' | 拆分方式：chars / words / lines |
| `delay` | 50 | 每个单元错开时间（毫秒） |
| `duration` | 1.25 | 动画时长（秒） |
| `triggerOnLoad` | false | 入场即触发，不等滚动 |
| `startDelay` | 0 | 整体延迟（秒） |
| `rootMargin` | '-100px' | 滚动触发边界 |
| `from` | {opacity:0, y:40} | 起始状态 |
| `to` | {opacity:1, y:0} | 结束状态 |

**常见坑：**
- 与其他动画冲突 → 确保只在一个地方控制该元素的动画
- 中文拆分 → `splitType="chars"` 中文每个字都是一个 char，没问题
- 换行问题 → `lines` 模式需要固定宽度才准确

---

### 参考四：TiltedCard（3D倾斜卡片）

**依赖：** 无（纯 React + CSS transforms）

**文件结构：**
```
src/components/TiltedCard/TiltedCard.jsx
src/components/TiltedCard/TiltedCard.css
```

**代码结构要点：**
- 监听鼠标移动，计算 `rotateX` / `rotateY`
- 用 `perspective` + `rotateX/Y` 实现3D效果
- 支持 `scaleOnHover`（悬停放大）
- 支持 `rotateAmplitude`（倾斜幅度）

**关键 Props：**
| Prop | 默认值 | 说明 |
|------|--------|------|
| `rotateAmplitude` | 10 | 倾斜角度幅度 |
| `scaleOnHover` | 1.05 | 悬停放大倍数 |
| `speed` | 400 | 过渡动画时长（ms） |
| `className` | '' | 自定义类名 |

**常见坑：**
- 内容撑不开 → 给内部容器加 `height: 100%`
- 移动端无效果 → 触摸设备自动禁用，正常

---

### 参考五：Counter（数字滚动计数）

**依赖：** `framer-motion`

**文件结构：**
```
src/components/Counter/Counter.jsx
src/components/Counter/Counter.css
```

**代码结构要点：**
- 用 `framer-motion` 的 `useMotionValue` + `useTransform` + `animate`
- 支持按位拆分（个位/十位/百位分别滚动）
- 支持 `prefix` / `suffix` 前后缀

**关键 Props：**
| Prop | 默认值 | 说明 |
|------|--------|------|
| `value` | 0 | 目标数值 |
| `duration` | 2 | 动画时长（秒） |
| `fontSize` | 48 | 字号（px） |
| `textColor` | '#000' | 文字颜色 |
| `fontWeight` | 700 | 字重 |
| `prefix` | '' | 前缀 |
| `suffix` | '' | 后缀 |

---

## 按场景推荐组件

| 场景 | 推荐组件 | 说明 |
|------|---------|------|
| 英雄区背景 | GridScan / GridMotion / Aurora | 科技感拉满的3D背景 |
| 标题文字动效 | SplitText + ShinyText | 入场逐字 + 持续闪光 |
| 数据展示 | Counter + TiltedCard | 数字滚动 + 卡片倾斜 |
| 导航栏 | Dock | macOS风格放大效果 |
| 按钮 | Magnetic + BorderGlow | 磁吸 + 发光边框 |
| 滚动装饰 | ScrollProgress + ScrollVelocity | 进度条 + 速度文字 |
| 卡片列表 | TiltedCard | 3D悬停交互 |
| 菜单展示 | InfiniteMenu | 无限滚动菜单 |
| 图片展示 | ImageTrail | 鼠标拖尾图片 |

---

## 常见问题与解决方案

### 1. 组件不显示 / 白屏 / 黑屏

**排查顺序：**
1. 检查父容器是否有宽高（尤其是背景类组件）
2. 检查控制台有无报错
3. 检查 import 路径是否正确
4. 检查依赖是否安装
5. 检查组件名拼写是否正确

### 2. 性能问题（卡顿、掉帧、发热）

**通用优化方案：**
- Three.js 类组件：降低 opacity、关闭 postprocessing、降低 devicePixelRatio
- 减少同时运行的动画数量
- 移动端降级：复杂组件在移动端简化或关闭
- 用 `will-change` 提示浏览器优化

### 3. 层级问题（遮挡内容 / 被遮挡）

**标准 z-index 层级规划：**
```
背景层（GridScan等）  → z-index: 0
装饰层（光晕、噪点）    → z-index: 1 ~ 9
内容层                  → z-index: 10 ~ 99
导航、弹窗、浮层         → z-index: 100+
```

### 4. 响应式适配

**策略：**
- 简单组件：用 CSS media query 调整样式
- 复杂3D组件：移动端降低参数或降级为静态图
- 文字动画：小屏幕字号自动缩小
- 悬停交互：触摸设备自动禁用 hover 效果

### 5. 与 React 19 兼容

React Bits 组件基本都是 hooks 写法，React 19 完全兼容。注意：
- `useRef`、`useEffect`、`useState` 用法不变
- 第三方库（three、gsap、framer-motion）确保版本兼容
- 如遇问题，先检查库的版本是否支持 React 19

### 6. 动画冲突

**现象：** 同时给一个元素加了多个动画，效果混乱。

**解决：**
- 优先用 React Bits 组件自带的动画，不要额外加 CSS 动画
- SplitText 和 CSS fadeIn 二选一，不要叠加
- 如果需要多个动画，用 GSAP timeline 统一管理

### 7. 代码不完整怎么办

**如果页面上代码被截断：**
1. 尝试滚动页面找完整代码
2. 检查是否有 "Copy" 按钮，点击复制
3. 检查是否有 Tab 切换（JSX / CSS 等）
4. 用浏览器 DevTools  Elements 面板找完整代码
5. 实在不行就去 GitHub 仓库找源码

---

## 集成前检查清单

- [ ] 已确认组件名称和官网路径
- [ ] 已获取完整的 JSX/TSX 代码（无省略号）
- [ ] 已获取完整的 CSS 代码
- [ ] 已获取依赖列表并安装
- [ ] 已获取 Props 说明
- [ ] 已创建正确的文件结构
- [ ] 导出方式正确（default + named）
- [ ] import 路径正确
- [ ] 控制台无报错
- [ ] 交互效果正常
- [ ] 响应式表现正常

---

## 注意事项

1. **完整复制代码**：尤其是 shader、长字符串、大段逻辑，必须 100% 完整
2. **依赖版本兼容**：先看项目已有版本，尽量保持一致，避免版本冲突
3. **TypeScript 适配**：JS 项目用 `.jsx`，TS 项目用 `.tsx`，类型定义按需补
4. **移动端降级**：重型 3D 组件在移动端注意性能，可降级简化
5. **性能优先**：动画和3D效果要控制数量，避免过度使用导致卡顿
6. **z-index 规划**：集成前先想清楚层级，避免后期到处改 z-index
7. **命名规范**：组件名大驼峰，CSS类名小驼峰/kebab-case，保持一致
8. **渐进增强**：先保证功能正常，再加动效，动效是加分项不是必须项
