# Surge 自动登录和部署脚本
# 使用 Start-Process 重定向标准输入

$inputFile = "e:\1\surge_input.txt"
"zztutor2026@proton.me`r`nZengTutor2026!" | Out-File -FilePath $inputFile -Encoding ASCII -NoNewline

# 登录
$process = Start-Process -FilePath "surge" -ArgumentList "login" -RedirectStandardInput $inputFile -NoNewWindow -Wait -PassThru
Write-Host "Login exit code: $($process.ExitCode)"

# 检查是否登录成功
$whoami = surge whoami
Write-Host "Whoami: $whoami"

# 如果登录成功，部署
if ($whoami -notmatch "Not Authenticated") {
    Write-Host "Deploying..."
    surge e:\deploy tech-figures.surge.sh
} else {
    Write-Host "Login failed, trying alternative method..."
}
