---
name: "github-upload"
description: "一键上传项目到 GitHub。自动检测代理、初始化 git、创建公开仓库、推送代码。用户说'上传到 GitHub'、'发布到 GitHub'、'push 到 GitHub' 时调用。"
---

# GitHub 一键上传

将当前工作目录的项目自动上传到用户的 GitHub 公开仓库。

## 前置信息（从用户记忆读取）

从 `user_profile.md` 的 "GitHub Configuration" 部分读取：
- **Username**: GitHub 用户名
- **Email**: Git 提交用的邮箱
- **Personal Access Token**: 用于认证推送的 token
- **Default visibility**: public（公开仓库）

## 执行流程

### 1. 检查并配置代理

1. 读取 Windows 系统代理：
   ```powershell
   Get-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings" | Select-Object ProxyServer, ProxyEnable
   ```
2. 如果 `ProxyEnable` 为 1 且有 `ProxyServer`，提取 host:port
3. 配置 git 代理：
   ```bash
   git config --global http.proxy http://<host>:<port>
   git config --global https.proxy http://<host>:<port>
   ```
4. 测试连接：`Invoke-WebRequest -Uri "https://github.com" -Method Head -TimeoutSec 10 -UseBasicParsing`
5. 如果连不上，提示用户打开 palantir 软件连接代理

### 2. 准备仓库名

- 如果用户指定了仓库名，用用户指定的
- 如果没指定，用当前文件夹名作为仓库名
- 仓库名格式：小写字母、数字、连字符，不能有空格和中文

### 3. 初始化本地 git（如果还没有）

1. 检查当前目录是否已有 `.git` 文件夹
2. 如果没有：
   ```bash
   git init
   git config user.email "<用户邮箱>"
   git config user.name "<用户名>"
   git add .
   git commit -m "Initial commit"
   ```
3. 如果已有 git 仓库但没提交：
   ```bash
   git add .
   git commit -m "Update project files"
   ```

### 4. 检查远程仓库是否已存在

- 尝试访问 `https://github.com/<用户名>/<仓库名>`
- 如果已存在，跳过创建步骤
- 如果不存在，通过浏览器或 API 创建公开仓库

### 5. 创建远程仓库（如果需要）

**推荐方式：通过浏览器自动化创建**
1. 用 integrated_browser 打开 https://github.com/new
2. 如果未登录，用用户账号密码登录
3. 填写仓库名，选择 Public，不勾选任何初始化选项
4. 点击创建
5. 获取仓库地址

### 6. 推送代码

1. 添加远程仓库（如果还没有）：
   ```bash
   git remote add origin https://<token>@github.com/<用户名>/<仓库名>.git
   ```
   注意：token 直接放在 URL 里认证
2. 切换到 main 分支：`git branch -M main`
3. 推送：`git push -u origin main`
4. 如果推送失败，检查代理和 token 是否正确

### 7. 验证结果

1. 用浏览器打开仓库页面确认代码已上传
2. 告诉用户仓库地址

## 注意事项

- **Token 安全**：不要在对话中明文输出 token，只在命令中使用
- **默认公开**：用户没说的话一律创建公开仓库
- **已有仓库**：如果 remote 已存在，直接 push 就行，不要重复创建
- **代理优先**：推送前必须确保代理可用，国内网络直连 GitHub 经常超时
- **提交信息**：用简洁的中文提交信息，描述清楚上传的是什么
