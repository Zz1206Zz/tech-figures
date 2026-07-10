---
name: "surge-deploy"
description: "Surge.sh 静态网站一键部署工具。当用户要求上线/部署网站、发布到 Surge、或更新已部署的网站时调用。自动处理认证、文件准备和部署。"
---

# Surge Deploy - 网站一键部署

将静态网站部署到 Surge.sh，国内无需代理即可访问，完全免费。

## 适用场景

- 用户要求"上线网站"、"部署网站"、"发布到网上"
- 用户明确提到 Surge 部署
- 用户要求更新已部署的网站内容
- 用户想要一个无需代理、国内可访问的免费托管

## 部署前置条件

1. Surge 账号已注册（邮箱 + 密码）
2. surge CLI 已全局安装（`npm install -g surge`）
3. 项目在 e:\1\ 目录下

## 部署步骤

### 第 1 步：准备部署文件

将需要部署的文件复制到 `e:\1\deploy\` 目录：

```powershell
New-Item -ItemType Directory -Force -Path e:\1\deploy | Out-Null
Remove-Item -Recurse -Force e:\1\deploy\* -ErrorAction SilentlyContinue
Copy-Item e:\1\index.html e:\1\deploy\ -Force
Copy-Item e:\1\hero-section-original.html e:\1\deploy\ -Force
Copy-Item e:\1\assets e:\1\deploy\assets -Recurse -Force
```

根据实际项目调整要复制的文件。

### 第 2 步：获取 Surge Token（认证）

**重要：不要用 `surge login` 交互式登录，管道输入无效。**

直接通过 API 获取 token 并写入 `.netrc` 文件：

```powershell
$email = "zztutor2026@proton.me"
$password = "ZengTutor2026!"

# 调用 Surge API 获取 token
$response = Invoke-WebRequest -Uri "https://surge.surge.sh/token" -Method POST -Headers @{
    Authorization = "Basic " + [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("$email`:$password"))
} -UseBasicParsing -TimeoutSec 30

$token = ($response.Content | ConvertFrom-Json).token

# 写入 ~/.netrc 文件（Surge 从此文件读取认证）
$netrcPath = "$env:USERPROFILE\.netrc"
$content = "machine surge.surge.sh`n  login $email`n  password $token`n"
Set-Content -Path $netrcPath -Value $content -NoNewline -Encoding ASCII
```

验证认证：

```powershell
surge whoami
```

### 第 3 步：部署

```powershell
surge e:\1\deploy tech-figures.surge.sh
```

根据项目修改域名（domain）。

### 第 4 步：验证部署

```powershell
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12
$response = Invoke-WebRequest -Uri "https://tech-figures.surge.sh" -UseBasicParsing -TimeoutSec 20
# 检查状态码是否为 200，内容是否匹配预期
```

## 常见问题

### 认证失败

- 检查邮箱密码是否正确
- 确认 `.netrc` 文件格式正确（machine / login / password 各一行）
- 文件路径：`C:\Users\<用户名>\.netrc`

### 部署后网站显示 "project not found"

- 说明部署没有真正成功
- 重新执行第 2 步获取 token，确保 `surge whoami` 显示正确的邮箱
- 然后重新部署

### Surge 未安装

```powershell
npm install -g surge
```

### 端口占用或本地服务器

部署不需要本地服务器，直接部署静态文件即可。

## 账号信息

| 项目 | 值 |
|------|-----|
| 邮箱 | zztutor2026@proton.me |
| 密码 | ZengTutor2026! |
| 默认域名 | tech-figures.surge.sh |

## 技术原理

Surge CLI 使用 `~/.netrc` 文件存储认证 token，而非交互式输入。
- 认证 API：`POST https://surge.surge.sh/token`（Basic Auth：邮箱 + 密码）
- 返回：`{ "email": "...", "token": "..." }`
- 将 token 写入 `.netrc` 的 `machine surge.surge.sh` 条目
- `surge` 命令自动读取该文件进行认证
