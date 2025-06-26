import { Metadata } from 'next'
import Link from 'next/link'
import DemoHeader from '@/app/components/DemoHeader'

// 动态元数据生成
export async function generateMetadata(): Promise<Metadata> {
  // 模拟从数据库或API获取数据
  const siteData = {
    title: '元数据API演示',
    description: '学习Next.js元数据API的各种用法和最佳实践',
    image: '/meta-image.jpg',
    author: 'Next.js 专家',
    publishedTime: new Date().toISOString(),
  }

  return {
    title: {
      default: siteData.title,
      template: '%s | Next.js 元数据演示'
    },
    description: siteData.description,
    keywords: ['Next.js', '元数据', 'SEO', 'Meta Tags', 'Open Graph'],
    authors: [{ name: siteData.author }],
    creator: siteData.author,
    publisher: 'Next.js 演示站',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://nextjs-demo.com'),
    alternates: {
      canonical: '/metadata-demo',
      languages: {
        'en-US': '/en/metadata-demo',
        'zh-CN': '/zh/metadata-demo',
      },
    },
    openGraph: {
      title: siteData.title,
      description: siteData.description,
      url: '/metadata-demo',
      siteName: 'Next.js 演示站',
      images: [
        {
          url: siteData.image,
          width: 1200,
          height: 630,
          alt: siteData.title,
        },
      ],
      locale: 'zh_CN',
      type: 'article',
      publishedTime: siteData.publishedTime,
      authors: [siteData.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteData.title,
      description: siteData.description,
      creator: '@nextjs',
      images: [siteData.image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
    other: {
      'theme-color': '#3b82f6',
      'color-scheme': 'light dark',
    },
  }
}

// 模拟不同类型的页面数据
const demoPages = [
  {
    id: 1,
    title: '博客文章示例',
    description: '这是一篇关于Next.js的博客文章，展示文章类型的元数据',
    type: 'article',
    image: '/blog-1.jpg',
    publishedTime: '2024-01-15',
    author: 'John Doe',
    tags: ['Next.js', 'React', '前端开发'],
  },
  {
    id: 2,
    title: '产品页面示例',
    description: '展示产品页面的元数据配置，包括价格、可用性等',
    type: 'product',
    image: '/product-1.jpg',
    price: '$99.99',
    availability: 'in stock',
    brand: 'NextJS Store',
  },
  {
    id: 3,
    title: '个人简介示例',
    description: '个人资料页面的元数据设置示例',
    type: 'profile',
    image: '/profile-1.jpg',
    firstName: 'Jane',
    lastName: 'Smith',
    jobTitle: '前端开发工程师',
  },
]

export default function MetadataDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      <DemoHeader 
        title="🏷️ 元数据 API 演示" 
        description="学习Next.js元数据API的各种用法和最佳实践，包括SEO优化、Open Graph、Twitter Cards等"
      />
      
      <div className="max-w-6xl mx-auto p-8">
        <div className="space-y-8">{/* 当前页面元数据展示 */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              📋 当前页面元数据
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              查看浏览器开发者工具的 HTML head 部分，或使用以下工具检查元数据：
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                  🔍 SEO 检查工具
                </h3>
                <p className="text-sm text-green-700 dark:text-green-400 mb-3">
                  使用在线工具检查SEO元数据
                </p>
                <a
                  href="https://www.heymeta.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-3 py-1 bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 rounded text-sm hover:bg-green-300 dark:hover:bg-green-700 transition-colors"
                >
                  检查元数据 →
                </a>
              </div>

              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                  📱 社交媒体预览
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-400 mb-3">
                  查看在社交媒体上的分享效果
                </p>
                <a
                  href="https://developers.facebook.com/tools/debug/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-3 py-1 bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded text-sm hover:bg-blue-300 dark:hover:bg-blue-700 transition-colors"
                >
                  Facebook 调试 →
                </a>
              </div>

              <div className="bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">
                  🐦 Twitter 卡片
                </h3>
                <p className="text-sm text-purple-700 dark:text-purple-400 mb-3">
                  验证Twitter卡片显示效果
                </p>
                <a
                  href="https://cards-dev.twitter.com/validator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-3 py-1 bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 rounded text-sm hover:bg-purple-300 dark:hover:bg-purple-700 transition-colors"
                >
                  Twitter 验证 →
                </a>
              </div>
            </div>
          </div>

          {/* 不同类型页面的元数据示例 */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              🎯 不同类型页面示例
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              点击下面的链接查看不同类型页面的元数据配置：
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {demoPages.map(page => (
                <div key={page.id} className="bg-white/30 dark:bg-gray-700/30 p-4 rounded-lg border border-white/20">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                      {page.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded ${
                      page.type === 'article' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                        : page.type === 'product'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                    }`}>
                      {page.type}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {page.description}
                  </p>
                  <div className="flex space-x-2">
                    <Link
                      href={`/metadata-demo/${page.type}/${page.id}`}
                      className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
                    >
                      查看页面 →
                    </Link>
                    <Link
                      href={`/metadata-demo/${page.type}/${page.id}/source`}
                      className="text-green-600 dark:text-green-400 text-sm hover:underline"
                    >
                      查看代码 →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 元数据API特性 */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              🚀 Next.js 元数据 API 特性
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  ✨ 主要特性
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• <strong>类型安全：</strong>完整的 TypeScript 支持</li>
                  <li>• <strong>动态生成：</strong>基于数据动态生成元数据</li>
                  <li>• <strong>自动优化：</strong>自动去重和优化meta标签</li>
                  <li>• <strong>SEO友好：</strong>支持所有主要的SEO元数据</li>
                  <li>• <strong>社交媒体：</strong>Open Graph 和 Twitter 卡片</li>
                  <li>• <strong>多语言：</strong>支持国际化和多语言</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  🎯 使用场景
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• <strong>博客文章：</strong>文章标题、描述、作者信息</li>
                  <li>• <strong>电商产品：</strong>产品名称、价格、可用性</li>
                  <li>• <strong>用户资料：</strong>个人信息、社交链接</li>
                  <li>• <strong>动态内容：</strong>基于URL参数生成元数据</li>
                  <li>• <strong>多版本：</strong>不同语言版本的元数据</li>
                  <li>• <strong>品牌统一：</strong>全站一致的品牌信息</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 代码示例 */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              💻 代码实现示例
            </h2>
            <div className="space-y-4">
              
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  📄 静态元数据
                </h3>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
{`export const metadata: Metadata = {
  title: '我的页面',
  description: '页面描述',
  openGraph: {
    title: '我的页面',
    description: '页面描述',
    images: ['/og-image.jpg'],
  },
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  🔄 动态元数据
                </h3>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
{`export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.id)
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
      publishedTime: post.publishedDate,
    },
  }
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  🌐 模板和继承
                </h3>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
{`// layout.tsx
export const metadata: Metadata = {
  title: {
    template: '%s | 我的网站',
    default: '我的网站',
  },
}

// page.tsx
export const metadata: Metadata = {
  title: '关于我们', // 最终显示: "关于我们 | 我的网站"
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* 本地验证工具 */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              🔧 本地验证工具
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              使用内置工具验证当前页面的元数据实现：
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/metadata-demo/verify"
                className="block p-4 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                  🔍 元数据分析器
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  实时分析当前页面的所有元数据标签
                </p>
              </Link>
              
              <div className="p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg">
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                  📱 移动端测试
                </h3>
                <p className="text-sm text-green-700 dark:text-green-400 mb-3">
                  使用浏览器开发者工具模拟移动设备
                </p>
                <code className="text-xs bg-green-200 dark:bg-green-800 px-2 py-1 rounded">
                  F12 → Device Toolbar
                </code>
              </div>

              <Link
                href="/metadata-demo/best-practices"
                className="block p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">
                  📋 最佳实践指南
                </h3>
                <p className="text-sm text-purple-700 dark:text-purple-400">
                  生产环境元数据配置的完整检查清单
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
