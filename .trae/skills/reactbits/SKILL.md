---
name: "reactbits"
description: "从 React Bits 网站获取组件源码并集成到 React 项目中。当用户要求使用 React Bits 组件、添加炫酷UI动效、或提到 reactbits/react-bits 时调用。"
---

# React Bits 组件集成技能

从 React Bits 官网（https://www.reactbits.dev）获取高质量开源 React 组件的完整源码，并正确集成到项目中。

## 何时使用

- 用户要求添加 React Bits 组件（如 GridScan, ShinyText, SplitText, Counter, TiltedCard 等）
- 用户想要炫酷的 UI 动效/背景/文字动画
- 用户提到 "react bits"、"reactbits" 或具体组件名称
- 需要给网站增加科技感/未来感动效

## 标准流程

### 1. 访问组件文档页

```
https://www.reactbits.dev/<category>/<component-name>
```

常用分类：
- `backgrounds/` - 背景效果（GridMotion, GridScan, Aurora, Hyperspeed 等）
- `text-animations/` - 文字动画（ShinyText, SplitText, BlurText, GradientText 等）
- `components/` - 交互组件（Counter, Dock, TiltedCard, Magnetic 等）
- `animations/` - 动画组件（InfiniteMenu, Lanyard, ImageTrail 等）

### 2. 获取完整源码

使用 WebFetch 抓取组件页面，提取：
- **完整的 JSX/TSX 代码**（不能截断，必须完整复制）
- **CSS 样式文件**
- **依赖列表**（页面上的 Dependencies 部分）
- **Props 说明**（参数表）
- **使用示例**

如果代码被截断，使用滚动或其他方式获取完整代码。**绝不使用不完整的代码**。

### 3. 创建组件文件

在 `src/components/<ComponentName>/` 目录下创建：
- `ComponentName.jsx` 或 `ComponentName.tsx`
- `ComponentName.css`

文件结构示例：
```
src/
  components/
    GridScan/
      GridScan.jsx
      GridScan.css
    ShinyText/
      ShinyText.jsx
      ShinyText.css
```

### 4. 代码适配

- **默认导出**：统一使用 `export default ComponentName`
- **CSS 类名**：使用 BEM 风格，前缀与组件名一致
- **Props 兼容**：保留所有原始 props，添加合理默认值
- **依赖安装**：先检查项目是否已有依赖，没有则安装

### 5. 集成验证

- 导入组件到 App.jsx
- 检查控制台有无报错
- 验证组件功能正常
- 确保响应式适配

## 常见组件依赖速查

| 组件 | 主要依赖 | 复杂度 |
|------|---------|--------|
| ShinyText | 无（纯CSS） | 低 |
| SplitText | gsap, @gsap/react, ScrollTrigger | 中 |
| Counter | framer-motion | 中 |
| TiltedCard | 无（纯React） | 低 |
| GridScan | three, postprocessing, face-api.js | 高 |
| GridMotion | three.js | 高 |
| Dock | framer-motion | 中 |
| BorderGlow | 无（纯CSS） | 低 |

## 注意事项

1. **完整复制代码**：不能省略任何部分，shader 代码尤其要完整
2. **检查依赖版本**：与项目已有版本保持兼容
3. **TypeScript 适配**：JS 项目用 `.jsx`，TS 项目用 `.tsx`
4. **移动端降级**：复杂 Three.js 组件在移动端可降级为静态效果
5. **性能考量**：重型 3D 组件注意性能优化（降低 opacity、限制帧率）
