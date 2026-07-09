# 智能翻译浏览器扩展 设计文档

## 项目概述

一款基于 Chrome Extension Manifest V3 的浏览器翻译扩展，同时支持 Edge 和 Chrome 浏览器。旨在提供比浏览器自带翻译更好的翻译体验，支持多引擎切换、多种取词方式、侧边栏展示和全文网页翻译。

## 功能需求

### 核心功能

1. **划词/取词翻译**
   - 划词翻译：选中文字后点击图标翻译
   - 悬浮取词：鼠标悬停自动翻译（可配置延迟）
   - 快捷键翻译：选中文字后按快捷键翻译（默认 Alt+T）
   - 所有触发方式可在设置中独立开关

2. **侧边栏翻译面板**
   - 上半区显示原文，下半区显示译文
   - 顶部支持翻译引擎快速切换
   - 支持语言方向一键交换
   - 支持全文网页翻译控制

3. **全文网页翻译**
   - 一键翻译整个网页
   - 支持原文/译文切换显示
   - 支持段落对照模式

4. **多翻译引擎支持**
   - 有道翻译
   - 百度翻译
   - DeepL 翻译
   - 统一抽象接口，易于扩展新引擎
   - 用户自行配置各引擎 API Key

### 非目标功能（v1 不做）

- 翻译历史记录
- 收藏夹/生词本
- 发音功能
- OCR 图片翻译

## 技术架构

### 整体架构

```
┌─────────────────────────────────────────────────────┐
│                     浏览器扩展                        │
├──────────┬──────────┬──────────┬──────────┬─────────┤
│ Background │ Content  │  Side    │  Popup   │ Options │
│  Service   │ Script   │  Panel   │  弹窗    │  设置页 │
│  Worker    │ (注入页面)│ 侧边栏   │         │         │
├──────────┴──────────┴──────────┴──────────┴─────────┤
│              翻译引擎抽象层                           │
│     (有道 / 百度 / DeepL / ... 可切换)               │
└─────────────────────────────────────────────────────┘
```

### 模块职责

| 模块 | 职责 |
|------|------|
| **Background Service Worker** | 后台中枢，负责调用翻译 API、消息中转、缓存管理 |
| **Content Script** | 注入到每个网页，监听划词/悬浮/快捷键事件，触发翻译 |
| **Side Panel** | 侧边栏面板，展示翻译结果、引擎切换、全文翻译控制 |
| **Popup** | 点击扩展图标的快捷弹窗，快速开关主要功能 |
| **Options 页面** | 详细设置页，配置 API Key、默认引擎、交互方式等 |

### 翻译引擎抽象层设计

**基类接口：**

```javascript
class BaseTranslator {
  constructor(config) {}
  
  async translate(text, sourceLang, targetLang) {
    // 返回: { text: string, detectedLang?: string, alternatives?: string[] }
  }
  
  getName() { /* 返回引擎名称 */ }
  
  validateConfig() { /* 验证配置是否有效 */ }
}
```

每个具体引擎继承基类并实现 `translate` 方法。切换引擎时，通过工厂方法创建对应实例。

## 数据流向

```
用户操作 → Content Script → 消息发送 → Background Service Worker
                                              ↓
                                    翻译引擎抽象层
                                              ↓
                                    具体翻译 API 请求
                                              ↓
                                    缓存结果（可选）
                                              ↓
Side Panel ← 消息发送 ← Background Service Worker
```

## 错误处理

| 错误类型 | 处理策略 |
|---------|---------|
| API 请求失败 | 自动重试 1 次，失败后提示错误并建议切换引擎 |
| 网络错误 | 提示检查网络连接 |
| API Key 未配置 | 引导用户前往设置页配置 |
| 翻译文本过长 | 自动截断或分段翻译，并提示用户 |
| 引擎不支持语种 | 提示当前引擎不支持该语言对，建议切换引擎 |

## 缓存策略

- **缓存键**：`{引擎}:{源语言}:{目标语言}:{文本hash}`
- **缓存时长**：24 小时
- **存储位置**：Chrome Storage local
- **缓存上限**：500 条，超出时 FIFO 淘汰最旧记录
- **作用**：减少 API 调用次数，提升重复翻译的响应速度

## 项目结构

```
translator-extension/
├── manifest.json              # 扩展配置文件 (MV3)
├── src/
│   ├── background/
│   │   └── service-worker.js  # 后台服务，API调用、消息中转、缓存
│   ├── content/
│   │   ├── content.js         # 内容脚本，划词/取词检测
│   │   └── content.css        # 内容脚本注入样式
│   ├── sidepanel/
│   │   ├── sidepanel.html     # 侧边栏页面
│   │   ├── sidepanel.js       # 侧边栏逻辑
│   │   └── sidepanel.css      # 侧边栏样式
│   ├── popup/
│   │   ├── popup.html         # 快捷弹窗页面
│   │   ├── popup.js           # 弹窗逻辑
│   │   └── popup.css          # 弹窗样式
│   ├── options/
│   │   ├── options.html       # 设置页面
│   │   ├── options.js         # 设置逻辑
│   │   └── options.css        # 设置页面样式
│   └── shared/
│       ├── translators/       # 翻译引擎实现
│       │   ├── base.js        # 翻译引擎基类
│       │   ├── youdao.js      # 有道翻译
│       │   ├── baidu.js       # 百度翻译
│       │   └── deepl.js       # DeepL翻译
│       ├── cache.js           # 缓存管理
│       ├── config.js          # 配置管理
│       └── utils.js           # 工具函数
└── icons/                     # 扩展图标
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## 关键技术点

1. **Manifest V3**：使用最新的扩展规范，Service Worker 替代 background page
2. **Side Panel API**：使用 Chrome 原生侧边栏 API，提供更好的沉浸式体验
3. **消息通信**：使用 `chrome.runtime.sendMessage` 和 `chrome.tabs.sendMessage` 进行模块间通信
4. **存储**：使用 `chrome.storage.local` 存储配置和缓存
5. **内容脚本注入**：通过 `content_scripts` 配置注入到所有网页

## 兼容性

- Chrome 114+（Side Panel API 支持）
- Edge 114+（基于 Chromium，兼容 Chrome 扩展）

## 后续可扩展方向

- 翻译历史记录与搜索
- 生词本/收藏夹功能
- 文本朗读（TTS）
- PDF 翻译
- OCR 图片翻译
- 更多翻译引擎接入
