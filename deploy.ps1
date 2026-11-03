# ==============================================================================
# One-Click Deploy Script for Pavithran V's 3D Portfolio
# ==============================================================================

Write-Host "🚀 Checking Git repository status..." -ForegroundColor Cyan

# Ensure branch is main
git branch -M main

# Check if origin remote is set
$origin = git remote get-url origin 2>$null
if (-not $origin) {
    Write-Host "Setting remote origin to https://github.com/pavi-stark/portfolio.git" -ForegroundColor Yellow
    git remote add origin https://github.com/pavi-stark/portfolio.git
}

Write-Host "📦 Pushing code to GitHub..." -ForegroundColor Cyan
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Successfully pushed to https://github.com/pavi-stark/portfolio!" -ForegroundColor Green
    Write-Host "🌐 GitHub Pages URL: https://pavi-stark.github.io/portfolio/" -ForegroundColor Magenta
    Write-Host "GitHub Actions will automatically deploy your site from the root folder in ~60 seconds." -ForegroundColor White
} else {
    Write-Host "`n⚠️ Push failed. Please make sure you have created the empty repository at:" -ForegroundColor Yellow
    Write-Host "https://github.com/new (Name: portfolio)" -ForegroundColor Cyan
}
