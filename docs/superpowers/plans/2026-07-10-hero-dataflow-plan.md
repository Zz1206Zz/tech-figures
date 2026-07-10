# Hero Section 垂直数据流瀑布实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 hero section 中间区域添加垂直数据流瀑布和全息数据面板，填充空白区域，提升赛博朋克科技感。

**Architecture:** 在现有 hero-section-original.html 中添加 CSS 样式、HTML 结构和 JavaScript 逻辑。使用 DOM 元素 + CSS animation 实现数据流滚动，CSS 动画实现数据面板效果，原生 JavaScript 动态生成数据流内容。

**Tech Stack:** 原生 HTML / CSS / JavaScript，无外部依赖

## Global Constraints

- 只修改一个文件：`e:\1\hero-section-original.html`
- 纯被动动画，无鼠标交互
- 移动端（<768px）隐藏
- 性能友好，不影响页面流畅度
- z-index 介于文字（z-index: 3）和人物图片（z-index: 2）之间
- 整体半透明，不抢主视觉
- 保留所有现有效果
- 颜色使用橙黄色系，与现有风格一致

---

## 文件结构

**修改文件：**
- `e:\1\hero-section-original.html`
  - CSS 样式区（在现有 cool effects 样式后添加）
  - HTML 结构区（在 character-bottom-right 之前添加）
  - JavaScript 区（在现有 effect 脚本后添加）

---

### Task 1: 添加数据流容器和基础 CSS 样式

**Files:**
- Modify: `e:\1\hero-section-original.html` (CSS 部分)

**Interfaces:**
- Produces: `.dataflow-container` 容器样式，`.data-stream` 单条流基础样式，`@keyframes stream-scroll` 滚动动画

**Goal:** 建立数据流的容器和基础样式框架，为后续内容填充做准备。

- [ ] **Step 1: 在 CSS 中添加数据流容器样式**

在 `/* ===== ULTRA COOL EFFECTS ===== */` 之前找到合适位置（机械效果样式之后），添加：

```css
        /* ===== DATAFLOW EFFECTS ===== */
        .dataflow-container {
            position: absolute;
            left: 42%;
            top: 15%;
            width: 280px;
            height: 70vh;
            z-index: 2;
            pointer-events: none;
            opacity: 0.7;
        }
        .dataflow-streams {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0 10px;
            box-sizing: border-box;
            mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
            -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
        }
        .data-stream {
            width: 14px;
            height: 100%;
            overflow: hidden;
            position: relative;
            font-family: var(--font-mono);
            font-size: 11px;
            line-height: 1.4;
            writing-mode: vertical-rl;
            text-orientation: upright;
            letter-spacing: 2px;
        }
        .data-stream-content {
            position: absolute;
            top: -100%;
            left: 0;
            width: 100%;
            animation: stream-scroll linear infinite;
        }
        @keyframes stream-scroll {
            0% { transform: translateY(0); }
            100% { transform: translateY(200%); }
        }
```

- [ ] **Step 2: 添加不同速度和透明度的变体样式**

继续添加：

```css
        .data-stream.slow .data-stream-content { animation-duration: 20s; }
        .data-stream.medium .data-stream-content { animation-duration: 12s; }
        .data-stream.fast .data-stream-content { animation-duration: 7s; }
        
        .data-stream.opacity-1 { color: rgba(255,200,150,0.1); }
        .data-stream.opacity-2 { color: rgba(255,200,150,0.2); }
        .data-stream.opacity-3 { color: rgba(255,200,150,0.35); }
        .data-stream.opacity-4 { color: rgba(255,220,180,0.5); }
        
        .data-stream .highlight {
            color: #fff;
            text-shadow: 0 0 6px rgba(255,200,150,0.8);
        }
```

- [ ] **Step 3: 添加移动端隐藏样式**

在移动端媒体查询中添加：

```css
            .dataflow-container {
                display: none !important;
            }
```

---

### Task 2: 添加中央全息数据面板 CSS 样式

**Files:**
- Modify: `e:\1\hero-section-original.html` (CSS 部分，紧接 Task 1 样式后)

**Interfaces:**
- Produces: `.holo-panel` 面板样式，面板内部各元素样式，扫描线、发光边框等特效

**Goal:** 实现中央全息数据面板的视觉样式。

- [ ] **Step 1: 添加面板容器样式**

```css
        .holo-panel {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 200px;
            padding: 16px 14px;
            background: rgba(255,170,100,0.06);
            border: 1px solid rgba(255,200,150,0.25);
            border-radius: 4px;
            font-family: var(--font-mono);
            color: rgba(255,220,180,0.8);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            box-shadow: 
                0 0 20px rgba(255,170,100,0.1),
                inset 0 0 20px rgba(255,170,100,0.05);
            z-index: 3;
        }
        .holo-panel::before,
        .holo-panel::after {
            content: '';
            position: absolute;
            width: 12px;
            height: 12px;
            border: 1px solid rgba(255,200,150,0.5);
        }
        .holo-panel::before {
            top: -1px;
            left: -1px;
            border-right: none;
            border-bottom: none;
        }
        .holo-panel::after {
            bottom: -1px;
            right: -1px;
            border-left: none;
            border-top: none;
        }
        .holo-panel-corner-tr,
        .holo-panel-corner-bl {
            position: absolute;
            width: 12px;
            height: 12px;
            border: 1px solid rgba(255,200,150,0.5);
        }
        .holo-panel-corner-tr {
            top: -1px;
            right: -1px;
            border-left: none;
            border-bottom: none;
        }
        .holo-panel-corner-bl {
            bottom: -1px;
            left: -1px;
            border-right: none;
            border-top: none;
        }
```

- [ ] **Step 2: 添加面板内部元素样式**

```css
        .holo-panel-header {
            font-size: 10px;
            font-weight: 600;
            color: rgba(255,220,180,0.95);
            margin-bottom: 10px;
            padding-bottom: 8px;
            border-bottom: 1px solid rgba(255,200,150,0.15);
            letter-spacing: 0.1em;
            text-transform: uppercase;
        }
        .holo-panel-header .status-dot {
            display: inline-block;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #7FFF7F;
            margin-right: 6px;
            box-shadow: 0 0 6px #7FFF7F;
            animation: status-blink 2s ease-in-out infinite;
        }
        @keyframes status-blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
        }
        .holo-panel-body {
            font-size: 9px;
            line-height: 1.8;
        }
        .holo-panel-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 4px;
        }
        .holo-panel-label {
            color: rgba(255,200,150,0.5);
        }
        .holo-panel-value {
            color: rgba(255,220,180,0.85);
        }
        .holo-panel-progress-bar {
            width: 100%;
            height: 4px;
            background: rgba(255,200,150,0.1);
            border-radius: 2px;
            margin-top: 6px;
            overflow: hidden;
        }
        .holo-panel-progress-fill {
            height: 100%;
            background: linear-gradient(to right, rgba(255,170,100,0.6), rgba(255,220,180,0.9));
            border-radius: 2px;
            animation: progress-pulse 3s ease-in-out infinite;
        }
        @keyframes progress-pulse {
            0%, 100% { width: 65%; }
            50% { width: 85%; }
        }
```

- [ ] **Step 3: 添加扫描线和故障闪烁效果**

```css
        .holo-panel-scanline {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(to right, transparent, rgba(255,220,180,0.4), transparent);
            animation: scanline-move 4s linear infinite;
            pointer-events: none;
        }
        @keyframes scanline-move {
            0% { top: 0; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }
        .holo-panel-glow {
            position: absolute;
            top: -20px;
            left: -20px;
            right: -20px;
            bottom: -20px;
            background: radial-gradient(ellipse at center, rgba(255,170,100,0.08) 0%, transparent 70%);
            pointer-events: none;
            animation: glow-pulse 4s ease-in-out infinite;
        }
        @keyframes glow-pulse {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.05); }
        }
        .holo-panel {
            animation: panel-flicker 8s ease-in-out infinite;
        }
        @keyframes panel-flicker {
            0%, 95%, 97%, 100% { opacity: 1; }
            96% { opacity: 0.85; }
            98% { opacity: 0.9; }
        }
```

---

### Task 3: 添加 HTML 结构（数据流 + 数据面板）

**Files:**
- Modify: `e:\1\hero-section-original.html` (HTML 部分)

**Interfaces:**
- Consumes: Task 1 & 2 中定义的 CSS 类名
- Produces: `.dataflow-container` HTML 结构，包含 7 条数据流和中央全息面板

**Goal:** 在页面中添加数据流和数据面板的 HTML 结构。

- [ ] **Step 1: 在 character-bottom-right 之前添加 dataflow 容器**

找到 `<!-- CHARACTER: Bottom-Right` 注释之前，插入：

```html
            <!-- ===== DATAFLOW EFFECTS ===== -->
            <div class="dataflow-container">
                <div class="dataflow-streams" id="dataflow-streams">
                    <!-- Streams will be generated by JavaScript -->
                </div>
                
                <!-- Holographic Data Panel -->
                <div class="holo-panel">
                    <div class="holo-panel-glow"></div>
                    <div class="holo-panel-scanline"></div>
                    <div class="holo-panel-corner-tr"></div>
                    <div class="holo-panel-corner-bl"></div>
                    
                    <div class="holo-panel-header">
                        <span class="status-dot"></span>SYS.STATUS
                    </div>
                    
                    <div class="holo-panel-body">
                        <div class="holo-panel-row">
                            <span class="holo-panel-label">CPU</span>
                            <span class="holo-panel-value" id="holo-cpu">67%</span>
                        </div>
                        <div class="holo-panel-row">
                            <span class="holo-panel-label">MEM</span>
                            <span class="holo-panel-value" id="holo-mem">4.2G</span>
                        </div>
                        <div class="holo-panel-row">
                            <span class="holo-panel-label">NET</span>
                            <span class="holo-panel-value" id="holo-net">128ms</span>
                        </div>
                        <div class="holo-panel-progress-bar">
                            <div class="holo-panel-progress-fill"></div>
                        </div>
                    </div>
                </div>
            </div>
```

---

### Task 4: 添加 JavaScript 生成动态数据流内容

**Files:**
- Modify: `e:\1\hero-section-original.html` (JavaScript 部分)

**Interfaces:**
- Consumes: HTML 中的 `#dataflow-streams` 容器
- Produces: 7 条动态生成的数据流，内容随机，速度和透明度各异

**Goal:** 用 JavaScript 动态生成数据流内容，确保每次加载都有不同的随机效果。

- [ ] **Step 1: 在 Lightning Effect 之后添加数据流脚本**

在 `// ===== 8. Lightning Effect =====` 的 IIFE 之后、`// ===== 9. Mouse Reveal Effect` 之前，添加：

```javascript
        // ===== 8.5. Dataflow Streams Effect =====
        (function() {
            if (window.innerWidth < 768) return;

            var container = document.getElementById('dataflow-streams');
            if (!container) return;

            var chars = '0123456789ABCDEF';
            var words = ['SYSTEM', 'DATA', 'SIGNAL', 'QUANTUM', 'NEURAL', 'PULSE', 'MATRIX', 'NEXUS', 'FLUX', 'OMEGA', 'SYNC', 'NODE'];
            var speeds = ['slow', 'medium', 'fast', 'medium', 'slow', 'fast', 'medium'];
            var opacities = ['opacity-1', 'opacity-2', 'opacity-3', 'opacity-2', 'opacity-4', 'opacity-1', 'opacity-3'];
            var streamCount = 7;

            function generateStreamContent() {
                var content = '';
                var length = 80;
                for (var i = 0; i < length; i++) {
                    if (Math.random() < 0.08) {
                        var word = words[Math.floor(Math.random() * words.length)];
                        content += '<span class="highlight">' + word + '</span>';
                        i += word.length - 1;
                    } else if (Math.random() < 0.15) {
                        content += chars.charAt(Math.floor(Math.random() * chars.length));
                    } else {
                        content += chars.charAt(Math.floor(Math.random() * 10));
                    }
                }
                return content + content;
            }

            for (var i = 0; i < streamCount; i++) {
                var stream = document.createElement('div');
                stream.className = 'data-stream ' + speeds[i] + ' ' + opacities[i];
                
                var content = document.createElement('div');
                content.className = 'data-stream-content';
                content.innerHTML = generateStreamContent();
                content.style.animationDelay = (-Math.random() * 20) + 's';
                
                stream.appendChild(content);
                container.appendChild(stream);
            }

            var holoCpu = document.getElementById('holo-cpu');
            var holoMem = document.getElementById('holo-mem');
            var holoNet = document.getElementById('holo-net');
            
            if (holoCpu && holoMem && holoNet) {
                setInterval(function() {
                    holoCpu.textContent = Math.floor(50 + Math.random() * 40) + '%';
                    holoMem.textContent = (3 + Math.random() * 3).toFixed(1) + 'G';
                    holoNet.textContent = Math.floor(80 + Math.random() * 100) + 'ms';
                }, 2000);
            }
        })();
```

---

### Task 5: 验证效果和微调

**Files:**
- Modify: `e:\1\hero-section-original.html` (如有需要)

**Goal:** 验证效果，确保所有元素正常显示，性能良好。

- [ ] **Step 1: 刷新页面验证效果**

在浏览器中打开 http://localhost:8090/hero-section-original.html
检查：
- 7 条数据流是否都在滚动
- 速度和透明度是否有差异
- 白色高亮词是否随机出现
- 中央数据面板是否显示
- 扫描线、发光边框、角标是否正常
- 数据数值是否每2秒变化
- 文字内容是否清晰（不被数据流遮挡）
- 人物图片是否完整（不被数据流覆盖）
- 移动端（缩小窗口到 <768px）是否隐藏

- [ ] **Step 2: 如有问题，微调参数**

根据实际效果调整：
- 位置：修改 `.dataflow-container` 的 `left` 和 `top`
- 大小：修改 `width` 和 `height`
- 透明度：修改 `opacity` 值
- 数据流数量：修改 `streamCount`
- 动画速度：修改 animation-duration 值

- [ ] **Step 3: 提交代码**

```bash
git add hero-section-original.html
git commit -m "feat: 添加垂直数据流瀑布和全息数据面板"
```

---

## 自检清单

**Spec Coverage:**
- [x] 垂直数据流（6-8条）— Task 1 + Task 4 实现 7 条
- [x] 不同速度和透明度 — speeds/opacities 数组定义
- [x] 顶部底部渐隐 — mask-image 实现
- [x] 中央全息数据面板 — Task 2 + Task 3 实现
- [x] 扫描线效果 — .holo-panel-scanline
- [x] 故障闪烁 — panel-flicker 动画
- [x] 边框发光脉动 — glow-pulse 动画
- [x] 四角装饰 — ::before/::after + corner 元素
- [x] 进度条动画 — progress-pulse
- [x] 数据数值动态变化 — setInterval 更新
- [x] 移动端隐藏 — 媒体查询
- [x] 不遮挡文字 — z-index 控制
- [x] 纯被动动画 — 无鼠标事件监听

**Placeholder Scan:** 无 TBD/TODO
**Type Consistency:** 类名和 ID 在 CSS、HTML、JS 中一致
