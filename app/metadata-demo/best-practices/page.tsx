import DemoHeader from '@/app/components/DemoHeader'
import Link from 'next/link'

export default function MetadataBestPracticesPage() {
  const bestPractices = [
    {
      category: '基础SEO',
      items: [
        {
          title: '页面标题优化',
          description: '每个页面都应该有独特的标题，长度控制在50-60字符',
          status: 'critical',
          code: `export const metadata: Metadata = {
  title: '简洁有力的页面标题 - 品牌名',
  // 避免过长或重复的标题
}`
        },
        {
          title: '元描述优化',
          description: '描述应该在150-160字符之间，包含关键词',
          status: 'critical',
          code: `export const metadata: Metadata = {
  description: '准确描述页面内容的摘要，包含主要关键词，吸引用户点击',
}`
        },
        {
          title: '结构化数据',
          description: '使用JSON-LD格式添加结构化数据',
          status: 'recommended',
          code: `export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '文章标题',
    author: { '@type': 'Person', name: '作者名' }
  }
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 页面内容 */}
    </>
  )
}`
        }
      ]
    },
    {
      category: '社交媒体优化',
      items: [
        {
          title: 'Open Graph 标签',
          description: '确保设置完整的Open Graph元数据',
          status: 'critical',
          code: `export const metadata: Metadata = {
  openGraph: {
    title: '分享时显示的标题',
    description: '分享时显示的描述',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: '图片描述'
    }],
    url: 'https://example.com/page',
    type: 'website'
  }
}`
        },
        {
          title: 'Twitter Cards',
          description: '配置Twitter卡片以优化Twitter分享效果',
          status: 'recommended',
          code: `export const metadata: Metadata = {
  twitter: {
    card: 'summary_large_image',
    title: 'Twitter显示的标题',
    description: 'Twitter显示的描述',
    images: ['/twitter-image.jpg']
  }
}`
        }
      ]
    },
    {
      category: '技术SEO',
      items: [
        {
          title: '规范URL',
          description: '设置canonical URL避免重复内容',
          status: 'critical',
          code: `export const metadata: Metadata = {
  alternates: {
    canonical: 'https://example.com/canonical-url'
  }
}`
        },
        {
          title: '多语言支持',
          description: '为多语言网站设置hreflang标签',
          status: 'recommended',
          code: `export const metadata: Metadata = {
  alternates: {
    languages: {
      'en-US': '/en/page',
      'zh-CN': '/zh/page',
      'x-default': '/page'
    }
  }
}`
        },
        {
          title: 'Robots元标签',
          description: '控制搜索引擎如何索引页面',
          status: 'recommended',
          code: `export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large'
    }
  }
}`
        }
      ]
    },
    {
      category: '性能优化',
      items: [
        {
          title: '预加载关键资源',
          description: '预加载关键字体、图片等资源',
          status: 'recommended',
          code: `export const metadata: Metadata = {
  other: {
    'preload-font': 'url(/fonts/main.woff2) as font type="font/woff2" crossorigin',
    'preconnect-google': 'https://fonts.gstatic.com'
  }
}`
        },
        {
          title: '图标优化',
          description: '提供多种尺寸的图标文件',
          status: 'recommended',
          code: `export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  }
}`
        }
      ]
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'recommended':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'critical':
        return '必需'
      case 'recommended':
        return '推荐'
      default:
        return '可选'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-purple-900">
      <DemoHeader 
        title="📋 元数据最佳实践" 
        description="生产环境元数据配置的完整指南和检查清单"
      />
      
      <div className="max-w-6xl mx-auto p-8">
        <div className="space-y-8">
          {/* 概览 */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              🎯 生产环境检查清单
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {bestPractices.reduce((acc, cat) => 
                    acc + cat.items.filter(item => item.status === 'critical').length, 0
                  )}
                </div>
                <div className="text-sm text-red-700 dark:text-red-400">必需项目</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {bestPractices.reduce((acc, cat) => 
                    acc + cat.items.filter(item => item.status === 'recommended').length, 0
                  )}
                </div>
                <div className="text-sm text-yellow-700 dark:text-yellow-400">推荐项目</div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {bestPractices.reduce((acc, cat) => acc + cat.items.length, 0)}
                </div>
                <div className="text-sm text-green-700 dark:text-green-400">总计项目</div>
              </div>
            </div>
          </div>

          {/* 最佳实践分类 */}
          {bestPractices.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
                {category.category}
              </h2>
              
              <div className="space-y-6">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="border-l-4 border-purple-400 pl-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        {item.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {getStatusText(item.status)}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {item.description}
                    </p>
                    
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-green-400 text-sm">
                        <code>{item.code}</code>
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* 验证工具 */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              🛠️ 验证工具和资源
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg">
                <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                  📱 移动友好测试
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-400 mb-3">
                  Google移动友好性测试工具
                </p>
                <a
                  href="https://search.google.com/test/mobile-friendly"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
                >
                  测试移动友好性 →
                </a>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg">
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                  🔍 结构化数据测试
                </h3>
                <p className="text-sm text-green-700 dark:text-green-400 mb-3">
                  Google结构化数据测试工具
                </p>
                <a
                  href="https://search.google.com/test/rich-results"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 dark:text-green-400 text-sm hover:underline"
                >
                  测试结构化数据 →
                </a>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30 rounded-lg">
                <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">
                  ⚡ 页面速度测试
                </h3>
                <p className="text-sm text-purple-700 dark:text-purple-400 mb-3">
                  Google PageSpeed Insights
                </p>
                <a
                  href="https://pagespeed.web.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 dark:text-purple-400 text-sm hover:underline"
                >
                  测试页面速度 →
                </a>
              </div>
            </div>
          </div>

          {/* 常见问题 */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              ❓ 常见问题和解决方案
            </h2>
            
            <div className="space-y-4">
              <details className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer text-gray-700 dark:text-gray-300">
                  为什么我的Open Graph图片不显示？
                </summary>
                <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  <p>可能的原因和解决方法：</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>图片URL必须是绝对路径（包含完整域名）</li>
                    <li>图片尺寸建议为1200x630像素</li>
                    <li>图片格式应为JPG或PNG</li>
                    <li>图片文件大小不超过5MB</li>
                    <li>确保图片URL可以公开访问</li>
                  </ul>
                </div>
              </details>
              
              <details className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer text-gray-700 dark:text-gray-300">
                  如何处理动态内容的元数据？
                </summary>
                <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  <p>使用 generateMetadata 函数动态生成：</p>
                  <pre className="bg-gray-800 text-green-400 p-2 rounded mt-2 text-xs overflow-x-auto">
{`export async function generateMetadata({ params }) {
  const data = await fetchData(params.id)
  
  return {
    title: data.title,
    description: data.description,
    openGraph: {
      images: [data.image]
    }
  }
}`}
                  </pre>
                </div>
              </details>
              
              <details className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer text-gray-700 dark:text-gray-300">
                  元数据更新后什么时候生效？
                </summary>
                <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  <p>不同平台的缓存时间不同：</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Facebook: 24小时，可用调试工具强制刷新</li>
                    <li>Twitter: 几分钟到几小时</li>
                    <li>Google: 几天到几周</li>
                    <li>LinkedIn: 几小时到几天</li>
                  </ul>
                </div>
              </details>
            </div>
          </div>

          {/* 返回链接 */}
          <div className="text-center">
            <Link
              href="/metadata-demo"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              ← 返回元数据演示
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
