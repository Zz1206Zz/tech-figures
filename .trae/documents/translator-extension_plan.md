# 智能翻译浏览器扩展 - 实现计划

## 一、项目调研结论

**项目背景：** 用户需要一款比浏览器自带翻译更好用的翻译工具，以浏览器扩展形式存在，支持多种取词方式和多翻译引擎切换。

**技术选型：**
- Chrome Extension Manifest V3（同时支持 Edge 和 Chrome）
- 原生 HTML/CSS/JavaScript（无需框架，轻量快速）
- Chrome Side Panel API 实现侧边栏
- chrome.storage.local 存储配置和缓存

**项目现状：** 从零开始，当前目录为空项目。

## 二、需要修改/新建的文件

### 新建文件（共 21 个）

**配置文件：**
1. `translator-extension/manifest.json` - 扩展清单文件

**后台模块：**
2. `translator-extension/src/background/service-worker.js` - 后台服务

**内容脚本：**
3. `translator-extension/src/content/content.js` - 内容脚本
4. `translator-extension/src/content/content.css` - 内容脚本样式

**侧边栏：**
5. `translator-extension/src/sidepanel/sidepanel.html` - 侧边栏页面
6. `translator-extension/src/sidepanel/sidepanel.js` - 侧边栏逻辑
7. `translator-extension/src/sidepanel/sidepanel.css` - 侧边栏样式

**快捷弹窗：**
8. `translator-extension/src/popup/popup.html` - 弹窗页面
9. `translator-extension/src/popup/popup.js` - 弹窗逻辑
10. `translator-extension/src/popup/popup.css` - 弹窗样式

**设置页面：**
11. `translator-extension/src/options/options.html` - 设置页面
12. `translator-extension/src/options/options.js` - 设置逻辑
13. `translator-extension/src/options/options.css` - 设置页面样式

**共享模块：**
14. `translator-extension/src/shared/translators/base.js` - 翻译引擎基类
15. `translator-extension/src/shared/translators/youdao.js` - 有道翻译
16. `translator-extension/src/shared/translators/baidu.js` - 百度翻译
17. `translator-extension/src/shared/translators/deepl.js` - DeepL 翻译
18. `translator-extension/src/shared/cache.js` - 缓存管理
19. `translator-extension/src/shared/config.js` - 配置管理
20. `translator-extension/src/shared/utils.js` - 工具函数

**图标：**
21. `translator-extension/icons/` - 图标目录（生成占位图标）

## 三、实现步骤

### 第一阶段：项目基础搭建

**步骤 1.1：创建项目目录结构和 manifest.json**
- 创建所有目录
- 编写 manifest.json（配置 MV3、权限、侧边栏、内容脚本等）
- 生成简单的 SVG 图标（16/48/128 三种尺寸）

**步骤 1.2：实现共享基础模块**
- `config.js` - 配置读写（默认配置、读取、保存）
- `utils.js` - 工具函数（文本 hash、语言检测、消息封装等）
- `cache.js` - 缓存管理（读写缓存、LRU 淘汰策略）
- `translators/base.js` - 翻译引擎基类（定义统一接口）

### 第二阶段：翻译引擎实现

**步骤 2.1：实现有道翻译引擎**
- 实现 `youdao.js`
- 对接有道智云翻译 API
- 处理签名生成（有道 API 需要 appKey + secret 签名）

**步骤 2.2：实现百度翻译引擎**
- 实现 `baidu.js`
- 对接百度翻译 API
- 处理签名生成（百度 API 需要 appid + secret 签名）

**步骤 2.3：实现 DeepL 翻译引擎**
- 实现 `deepl.js`
- 对接 DeepL API
- 处理 API Key 认证

### 第三阶段：后台服务（Background）

**步骤 3.1：实现 Service Worker**
- 消息监听（接收来自 content script / side panel / popup 的消息）
- 翻译请求处理（调用翻译引擎、查询缓存、返回结果）
- 引擎工厂方法（根据配置创建翻译引擎实例）
- 配置变更监听

### 第四阶段：内容脚本（Content Script）

**步骤 4.1：实现划词翻译**
- 监听鼠标选中事件
- 选中文字后显示翻译小图标
- 点击图标触发翻译，发送消息到 background
- 打开侧边栏展示结果

**步骤 4.2：实现悬浮取词**
- 监听鼠标悬停事件
- 可配置延迟（默认 500ms）
- 获取鼠标所在位置的文本
- 自动触发翻译

**步骤 4.3：实现快捷键翻译**
- 监听键盘事件（默认 Alt+T）
- 获取当前选中的文本
- 触发翻译

**步骤 4.4：实现全文网页翻译**
- 接收来自侧边栏的翻译指令
- 遍历页面文本节点，批量翻译并替换
- 支持原文/译文切换
- 保存原文以便恢复

### 第五阶段：侧边栏面板（Side Panel）

**步骤 5.1：实现侧边栏 UI**
- 顶部：引擎切换下拉框、语言方向交换按钮
- 中部上半区：原文展示区
- 中部下半区：译文展示区
- 底部：全文翻译按钮、设置入口

**步骤 5.2：实现侧边栏交互逻辑**
- 监听来自 background 的翻译结果消息
- 切换翻译引擎
- 交换源语言/目标语言
- 触发全文网页翻译
- 手动输入文本翻译

### 第六阶段：弹窗和设置页

**步骤 6.1：实现 Popup 弹窗**
- 扩展图标点击后弹出
- 快捷开关：划词翻译、悬浮取词、快捷键翻译
- 快速打开侧边栏按钮
- 跳转到设置页按钮

**步骤 6.2：实现 Options 设置页**
- 翻译引擎配置（API Key 设置、默认引擎选择）
- 交互方式配置（各触发方式开关、悬浮延迟）
- 快捷键配置
- 缓存管理（查看缓存大小、清空缓存）
- 语言设置（默认源语言、默认目标语言）

### 第七阶段：集成测试与优化

**步骤 7.1：端到端测试**
- 在 Chrome 中加载扩展测试
- 在 Edge 中加载扩展测试
- 测试各翻译引擎是否正常工作
- 测试各种取词方式
- 测试侧边栏展示
- 测试全文翻译
- 测试配置持久化

**步骤 7.2：优化与修复**
- 性能优化（缓存命中率、翻译响应速度）
- UI 样式优化
- 错误边界处理
- 边界情况处理（超长文本、空文本等）

## 四、潜在依赖与注意事项

### 外部依赖
- **有道智云 API**：需要用户注册并获取 appKey 和 secret（有免费额度）
- **百度翻译 API**：需要用户注册并获取 appid 和 secret（有免费额度）
- **DeepL API**：需要用户注册并获取 API Key（免费版有额度限制）

### 技术注意事项
1. **Manifest V3 限制**：
   - Service Worker 会休眠，不能保持长连接
   - 不能使用 `document` 或 `window` 对象
   - 不能使用 XMLHttpRequest，必须用 fetch

2. **Content Script 隔离**：
   - 内容脚本和页面 JS 运行在隔离环境
   - 共享 DOM 但不共享 JS 作用域
   - 通过 DOM 事件或 chrome.runtime.sendMessage 通信

3. **跨域问题**：
   - 翻译 API 请求在 background service worker 中发起，不受跨域限制
   - content script 不能直接请求跨域 API

4. **Side Panel API**：
   - 需要 Chrome/Edge 114+ 版本支持
   - 通过 `chrome.sidePanel` API 控制
   - 需要在 manifest 中声明 `sidePanel` 权限

5. **存储限制**：
   - `chrome.storage.local` 单条数据上限 ~5MB
   - 缓存需要控制大小，定期清理

### 风险与应对
| 风险 | 影响 | 应对策略 |
|------|------|---------|
| 翻译 API 免费额度用完 | 翻译不可用 | 支持多引擎切换，用户可以换其他引擎 |
| Side Panel API 版本兼容 | 低版本浏览器无法使用 | 检测浏览器版本，降级用弹窗替代 |
| 网页结构复杂导致全文翻译异常 | 部分文本翻译不到 | 提供手动选择翻译功能，逐步优化 |
| Service Worker 休眠导致消息延迟 | 翻译响应慢 | 每次请求前唤醒 SW，使用缓存加速 |

## 五、验证方式

1. **加载扩展**：在 Chrome/Edge 的扩展管理页面开启开发者模式，加载 `translator-extension` 目录
2. **配置 API Key**：打开设置页，配置至少一个翻译引擎的 API Key
3. **划词翻译测试**：在任意网页选中文字，点击翻译图标，查看侧边栏结果
4. **悬浮取词测试**：鼠标悬停在单词上，验证自动翻译
5. **快捷键测试**：选中文字按 Alt+T，验证快捷键翻译
6. **引擎切换测试**：在侧边栏切换不同翻译引擎，对比结果
7. **全文翻译测试**：点击"翻译此页"，验证网页全文翻译
8. **缓存测试**：重复翻译同一段文字，验证响应速度变快
