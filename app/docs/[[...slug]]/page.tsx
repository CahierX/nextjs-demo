import Link from 'next/link'
import { notFound } from 'next/navigation'

// 模拟文档数据结构
const docsStructure = {
  '': {
    title: '文档首页',
    content: `# 欢迎使用文档系统

这是一个基于 Next.js 可选捕获所有路由的文档系统演示。

## 特性

- 支持多级路径
- 动态路由生成
- SEO 友好
- 响应式设计

## 快速开始

请选择左侧的文档分类开始阅读。
    `
  },
  'getting-started': {
    title: '快速开始',
    content: `# 快速开始

## 安装

\`\`\`bash
npm install next-docs
\`\`\`

## 基本配置

\`\`\`javascript
// next.config.js
module.exports = {
  docs: {
    enabled: true
  }
}
\`\`\`
    `
  },
  'getting-started/installation': {
    title: '安装指南',
    content: `# 安装指南

## 系统要求

- Node.js 18.0 或更高版本
- npm 或 yarn 包管理器

## 安装步骤

1. 创建新项目
\`\`\`bash
npx create-next-app@latest my-docs
\`\`\`

2. 安装依赖
\`\`\`bash
cd my-docs
npm install
\`\`\`

3. 启动开发服务器
\`\`\`bash
npm run dev
\`\`\`
    `
  },
  'api': {
    title: 'API 参考',
    content: `# API 参考

## 核心 API

### useRouter

用于访问路由对象的 Hook。

\`\`\`javascript
import { useRouter } from 'next/router'

function MyComponent() {
  const router = useRouter()
  
  return <div>当前路径: {router.pathname}</div>
}
\`\`\`

### Link

用于客户端导航的组件。

\`\`\`javascript
import Link from 'next/link'

<Link href="/about">
  <a>关于我们</a>
</Link>
\`\`\`
    `
  },
  'api/routing': {
    title: '路由 API',
    content: `# 路由 API

## 动态路由

Next.js 支持动态路由，使用方括号语法。

### 基本动态路由

\`pages/posts/[id].js\` 匹配 \`/posts/1\`, \`/posts/abc\` 等。

### 捕获所有路由

\`pages/posts/[...slug].js\` 匹配 \`/posts/a\`, \`/posts/a/b\` 等。

### 可选捕获所有路由

\`pages/posts/[[...slug]].js\` 匹配 \`/posts\`, \`/posts/a\`, \`/posts/a/b\` 等。

## 路由对象

\`\`\`javascript
{
  pathname: '/posts/[id]',
  query: { id: '1' },
  asPath: '/posts/1'
}
\`\`\`
    `
  },
  'advanced': {
    title: '高级功能',
    content: `# 高级功能

## 中间件

Next.js 12+ 支持中间件功能。

\`\`\`javascript
// middleware.js
export function middleware(request) {
  // 中间件逻辑
}
\`\`\`

## 国际化

内置国际化支持。

\`\`\`javascript
// next.config.js
module.exports = {
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en'
  }
}
\`\`\`
    `
  },
  'advanced/middleware': {
    title: '中间件详解',
    content: `# 中间件详解

中间件允许你在请求完成之前运行代码。

## 基本用法

\`\`\`javascript
// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  // 检查用户认证
  if (!request.cookies.get('token')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: '/dashboard/:path*'
}
\`\`\`

## 高级匹配

\`\`\`javascript
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}
\`\`\`
    `
  }
}

interface DocsPageProps {
  params: Promise<{
    slug?: string[]
  }>
}

export async function generateStaticParams() {
  // 生成所有可能的文档路径
  const paths = Object.keys(docsStructure).map(path => ({
    slug: path === '' ? undefined : path.split('/'),
  }))
  
  return paths
}

export async function generateMetadata({ params }: DocsPageProps) {
  const resolvedParams = await params
  const slug = resolvedParams.slug?.join('/') || ''
  const doc = docsStructure[slug as keyof typeof docsStructure]
  
  if (!doc) {
    return {
      title: '文档未找到',
    }
  }

  return {
    title: `${doc.title} | 文档中心`,
    description: `${doc.title}的详细说明和使用指南`,
  }
}

export default async function DocsPage({ params }: DocsPageProps) {
  const resolvedParams = await params
  const slug = resolvedParams.slug?.join('/') || ''
  const doc = docsStructure[slug as keyof typeof docsStructure]

  if (!doc) {
    notFound()
  }

  // 获取所有文档分类用于侧边栏
  const categories = [
    { path: '', title: '文档首页', level: 0 },
    { path: 'getting-started', title: '快速开始', level: 0 },
    { path: 'getting-started/installation', title: '安装指南', level: 1 },
    { path: 'api', title: 'API 参考', level: 0 },
    { path: 'api/routing', title: '路由 API', level: 1 },
    { path: 'advanced', title: '高级功能', level: 0 },
    { path: 'advanced/middleware', title: '中间件详解', level: 1 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* 顶部导航 */}
      <nav className="bg-white/10 backdrop-blur-sm border-b border-white/20 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/advanced-routing-demo"
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>返回路由演示</span>
            </Link>
            
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
            
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              📖 文档中心
            </h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              路径: /{slug || 'docs'}
            </div>
            <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-gray-700 dark:text-gray-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto flex">
        {/* 侧边栏 */}
        <aside className="w-64 p-6 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border-r border-white/20 min-h-screen">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              📚 文档导航
            </h2>
            
            <nav className="space-y-1">
              {categories.map((category) => (
                <Link
                  key={category.path}
                  href={`/docs${category.path ? `/${category.path}` : ''}`}
                  className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                    slug === category.path
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 font-medium'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-800 dark:hover:text-gray-200'
                  } ${category.level > 0 ? 'ml-4' : ''}`}
                >
                  {category.level > 0 && '├ '}
                  {category.title}
                </Link>
              ))}
            </nav>
          </div>
          
          {/* 演示说明 */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
              💡 可选捕获所有路由
            </h3>
            <p className="text-xs text-blue-700 dark:text-blue-400">
              使用 [[...slug]] 语法，可以匹配多级路径，包括根路径。
            </p>
          </div>
        </aside>

        {/* 主内容区 */}
        <main className="flex-1 p-6">
          <div className="max-w-4xl">
            {/* 面包屑导航 */}
            {slug && (
              <nav className="mb-6">
                <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>
                    <Link href="/docs" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      文档
                    </Link>
                  </li>
                  {slug.split('/').map((segment, index, array) => {
                    const path = array.slice(0, index + 1).join('/')
                    const isLast = index === array.length - 1
                    
                    return (
                      <li key={path} className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {isLast ? (
                          <span className="text-gray-800 dark:text-gray-200 font-medium">
                            {segment}
                          </span>
                        ) : (
                          <Link
                            href={`/docs/${path}`}
                            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            {segment}
                          </Link>
                        )}
                      </li>
                    )
                  })}
                </ol>
              </nav>
            )}

            {/* 文档内容 */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {doc.content.split('\n').map((line, index) => {
                  if (line.startsWith('# ')) {
                    return (
                      <h1 key={index} className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                        {line.substring(2)}
                      </h1>
                    )
                  } else if (line.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">
                        {line.substring(3)}
                      </h2>
                    )
                  } else if (line.startsWith('### ')) {
                    return (
                      <h3 key={index} className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">
                        {line.substring(4)}
                      </h3>
                    )
                  } else if (line.startsWith('```')) {
                    return (
                      <div key={index} className="bg-gray-900 rounded-lg p-4 my-4 overflow-x-auto">
                        <pre className="text-green-400 text-sm">
                          <code>{line.substring(3)}</code>
                        </pre>
                      </div>
                    )
                  } else if (line.startsWith('- ')) {
                    return (
                      <li key={index} className="text-gray-700 dark:text-gray-300 mb-1">
                        {line.substring(2)}
                      </li>
                    )
                  } else if (line.trim()) {
                    return (
                      <p key={index} className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                        {line}
                      </p>
                    )
                  }
                  return null
                })}
              </div>
            </div>

            {/* 页面导航 */}
            <div className="mt-8 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                最后更新: {new Date().toLocaleDateString('zh-CN')}
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-1 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>编辑此页</span>
                </button>
                
                <button className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <span>分享</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
