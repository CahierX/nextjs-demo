#!/bin/bash

# 元数据验证脚本
# 使用方法: ./check-metadata.sh http://localhost:3000/metadata-demo

if [ $# -eq 0 ]; then
    echo "使用方法: $0 <URL>"
    echo "示例: $0 http://localhost:3000/metadata-demo"
    exit 1
fi

URL=$1
echo "🔍 正在分析: $URL"
echo "=================================="

# 使用curl获取页面内容
CONTENT=$(curl -s "$URL")

echo "📊 元数据检查结果:"
echo ""

# 检查标题
TITLE=$(echo "$CONTENT" | grep -o '<title[^>]*>[^<]*</title>' | sed 's/<[^>]*>//g')
if [ -n "$TITLE" ]; then
    TITLE_LENGTH=${#TITLE}
    echo "✅ 标题: $TITLE (长度: $TITLE_LENGTH 字符)"
    if [ $TITLE_LENGTH -gt 60 ]; then
        echo "   ⚠️  标题过长，建议控制在60字符以内"
    elif [ $TITLE_LENGTH -lt 10 ]; then
        echo "   ⚠️  标题过短，建议至少10字符"
    fi
else
    echo "❌ 未找到标题标签"
fi

echo ""

# 检查描述
DESCRIPTION=$(echo "$CONTENT" | grep -o '<meta[^>]*name="description"[^>]*>' | grep -o 'content="[^"]*"' | sed 's/content="//;s/"//')
if [ -n "$DESCRIPTION" ]; then
    DESC_LENGTH=${#DESCRIPTION}
    echo "✅ 描述: $DESCRIPTION (长度: $DESC_LENGTH 字符)"
    if [ $DESC_LENGTH -gt 160 ]; then
        echo "   ⚠️  描述过长，建议控制在160字符以内"
    elif [ $DESC_LENGTH -lt 50 ]; then
        echo "   ⚠️  描述过短，建议至少50字符"
    fi
else
    echo "❌ 未找到描述标签"
fi

echo ""

# 检查Open Graph
echo "🌐 Open Graph 检查:"
OG_TITLE=$(echo "$CONTENT" | grep -o '<meta[^>]*property="og:title"[^>]*>' | grep -o 'content="[^"]*"' | sed 's/content="//;s/"//')
OG_DESC=$(echo "$CONTENT" | grep -o '<meta[^>]*property="og:description"[^>]*>' | grep -o 'content="[^"]*"' | sed 's/content="//;s/"//')
OG_IMAGE=$(echo "$CONTENT" | grep -o '<meta[^>]*property="og:image"[^>]*>' | grep -o 'content="[^"]*"' | sed 's/content="//;s/"//')
OG_URL=$(echo "$CONTENT" | grep -o '<meta[^>]*property="og:url"[^>]*>' | grep -o 'content="[^"]*"' | sed 's/content="//;s/"//')

[ -n "$OG_TITLE" ] && echo "✅ og:title: $OG_TITLE" || echo "❌ 缺少 og:title"
[ -n "$OG_DESC" ] && echo "✅ og:description: $OG_DESC" || echo "❌ 缺少 og:description"
[ -n "$OG_IMAGE" ] && echo "✅ og:image: $OG_IMAGE" || echo "❌ 缺少 og:image"
[ -n "$OG_URL" ] && echo "✅ og:url: $OG_URL" || echo "⚠️  建议设置 og:url"

echo ""

# 检查Twitter Cards
echo "🐦 Twitter Cards 检查:"
TWITTER_CARD=$(echo "$CONTENT" | grep -o '<meta[^>]*name="twitter:card"[^>]*>' | grep -o 'content="[^"]*"' | sed 's/content="//;s/"//')
TWITTER_TITLE=$(echo "$CONTENT" | grep -o '<meta[^>]*name="twitter:title"[^>]*>' | grep -o 'content="[^"]*"' | sed 's/content="//;s/"//')
TWITTER_DESC=$(echo "$CONTENT" | grep -o '<meta[^>]*name="twitter:description"[^>]*>' | grep -o 'content="[^"]*"' | sed 's/content="//;s/"//')

[ -n "$TWITTER_CARD" ] && echo "✅ twitter:card: $TWITTER_CARD" || echo "❌ 缺少 twitter:card"
[ -n "$TWITTER_TITLE" ] && echo "✅ twitter:title: $TWITTER_TITLE" || echo "⚠️  建议设置 twitter:title"
[ -n "$TWITTER_DESC" ] && echo "✅ twitter:description: $TWITTER_DESC" || echo "⚠️  建议设置 twitter:description"

echo ""

# 检查图标
echo "🔗 图标检查:"
FAVICON=$(echo "$CONTENT" | grep -o '<link[^>]*rel="icon"[^>]*>')
APPLE_ICON=$(echo "$CONTENT" | grep -o '<link[^>]*rel="apple-touch-icon"[^>]*>')

[ -n "$FAVICON" ] && echo "✅ 找到网站图标" || echo "⚠️  建议添加网站图标"
[ -n "$APPLE_ICON" ] && echo "✅ 找到Apple触摸图标" || echo "⚠️  建议添加Apple触摸图标"

echo ""
echo "📋 验证完成！"
echo ""
echo "💡 建议使用以下在线工具进一步验证:"
echo "   • Facebook调试器: https://developers.facebook.com/tools/debug/"
echo "   • Twitter验证器: https://cards-dev.twitter.com/validator"
echo "   • Google结构化数据: https://search.google.com/test/rich-results"
