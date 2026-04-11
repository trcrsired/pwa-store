#!/bin/bash

# 获取提交信息，默认为当前日期时间
msg=${1:-"Update blog $(date +'%Y-%m-%d %H:%M:%S')"}

echo -e "\033[0;32m>> 开始生成包装文件...\033[0m"

# ========== 你要加的命令 ==========
python scripts/generate_wrappers.py ~/pwa-store
# ==================================

echo -e "\033[0;32m>> 生成完成，开始部署到 GitHub...\033[0m"

# 1. 暂存所有更改
git add .

# 2. 提交更改
git commit -m "$msg"

# 3. 推送到远程仓库
git push origin main

echo -e "\033[0;32m>> 部署完成！GitHub Pages 正在构建中...\033[0m"
