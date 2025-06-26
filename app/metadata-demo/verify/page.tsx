'use client'

import { useEffect, useState } from 'react'
import DemoHeader from '@/app/components/DemoHeader'

interface MetaTag {
  name?: string
  property?: string
  content?: string
  href?: string
  rel?: string
  charset?: string
  httpEquiv?: string
  type?: string
  sizes?: string
  [key: string]: string | undefined
}

export default function MetadataVerifyPage() {
  const [metaTags, setMetaTags] = useState<MetaTag[]>([])
  const [structuredData, setStructuredData] = useState<Record<string, unknown>[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const extractMetadata = () => {
      // 提取所有 meta 标签
      const metas = Array.from(document.querySelectorAll('meta')).map(meta => ({
        name: meta.getAttribute('name') || undefined,
        property: meta.getAttribute('property') || undefined,
        content: meta.getAttribute('content') || undefined,
        charset: meta.getAttribute('charset') || undefined,
        httpEquiv: meta.getAttribute('http-equiv') || undefined,
      }))

      // 提取 title
      const title = document.title
      if (title) {
        metas.unshift({ 
          name: 'title', 
          content: title,
          property: undefined,
          charset: undefined,
          httpEquiv: undefined
        })
      }

      // 提取 link 标签（图标、规范链接等）
      const links = Array.from(document.querySelectorAll('link[rel]')).map(link => ({
        rel: link.getAttribute('rel') || undefined,
        href: link.getAttribute('href') || undefined,
        type: link.getAttribute('type') || undefined,
        sizes: link.getAttribute('sizes') || undefined,
      }))

      setMetaTags([...metas, ...links])

      // 提取结构化数据
      const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
      const structuredDataArray = scripts.map(script => {
        try {
          return JSON.parse(script.textContent || '')
        } catch {
          return null
        }
      }).filter(Boolean)

      setStructuredData(structuredDataArray)
      setLoading(false)
    }

    // 延迟执行以确保所有元数据都已加载
    setTimeout(extractMetadata, 1000)
  }, [])

  const getMetaByType = (type: string) => {
    return metaTags.filter(tag => 
      tag.name?.includes(type) || 
      tag.property?.includes(type) ||
      tag.rel?.includes(type)
    )
  }

  const validateMeta = () => {
    const issues: string[] = []
    
    // 检查必需的基本元数据
    const title = metaTags.find(tag => tag.name === 'title')
    if (!title || !title.content || title.content.length < 10 || title.content.length > 60) {
      issues.push('标题长度应在10-60字符之间')
    }

    const description = metaTags.find(tag => tag.name === 'description')
    if (!description || !description.content || description.content.length < 50 || description.content.length > 160) {
      issues.push('描述长度应在50-160字符之间')
    }

    // 检查Open Graph
    const ogTitle = metaTags.find(tag => tag.property === 'og:title')
    const ogDescription = metaTags.find(tag => tag.property === 'og:description')
    const ogImage = metaTags.find(tag => tag.property === 'og:image')
    
    if (!ogTitle) issues.push('缺少 og:title')
    if (!ogDescription) issues.push('缺少 og:description')
    if (!ogImage) issues.push('缺少 og:image')

    // 检查Twitter Cards
    const twitterCard = metaTags.find(tag => tag.name === 'twitter:card')
    if (!twitterCard) issues.push('缺少 twitter:card')

    return issues
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
        <DemoHeader 
          title="🔍 元数据验证工具" 
          description="正在分析当前页面的元数据..."
        />
        <div className="max-w-6xl mx-auto p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">正在提取元数据...</p>
          </div>
        </div>
      </div>
    )
  }

  const issues = validateMeta()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      <DemoHeader 
        title="🔍 元数据验证工具" 
        description="分析当前页面的元数据实现，检查SEO和社交媒体优化"
      />
      
      <div className="max-w-6xl mx-auto p-8 space-y-8">
        {/* 验证结果概览 */}
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            📊 元数据验证结果
          </h2>
          {issues.length === 0 ? (
            <div className="bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg p-4">
              <div className="flex items-center">
                <span className="text-green-600 dark:text-green-400 text-xl mr-2">✅</span>
                <span className="text-green-800 dark:text-green-300 font-semibold">
                  所有关键元数据配置正确！
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded-lg p-4">
              <div className="flex items-start">
                <span className="text-yellow-600 dark:text-yellow-400 text-xl mr-2">⚠️</span>
                <div>
                  <p className="text-yellow-800 dark:text-yellow-300 font-semibold mb-2">
                    发现 {issues.length} 个需要优化的问题：
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-yellow-700 dark:text-yellow-400">
                    {issues.map((issue, index) => (
                      <li key={index}>{issue}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 基本SEO元数据 */}
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            🎯 基本SEO元数据
          </h2>
          <div className="space-y-4">
            {['title', 'description', 'keywords', 'author', 'viewport'].map(type => {
              const tags = getMetaByType(type)
              return (
                <div key={type} className="border-l-4 border-blue-400 pl-4">
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300 capitalize mb-2">
                    {type}
                  </h3>
                  {tags.length > 0 ? (
                    tags.map((tag, index) => (
                      <div key={index} className="bg-gray-100 dark:bg-gray-700 rounded p-2 text-sm mb-2">
                        <code className="text-gray-800 dark:text-gray-200">
                          {Object.entries(tag)
                            .filter(([, value]) => value)
                            .map(([key, value]) => `${key}="${value}"`)
                            .join(' ')}
                        </code>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-sm">未找到相关标签</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Open Graph 元数据 */}
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            📱 Open Graph 元数据
          </h2>
          <div className="space-y-2">
            {getMetaByType('og:').map((tag, index) => (
              <div key={index} className="bg-blue-50 dark:bg-blue-900/30 rounded p-2">
                <code className="text-blue-800 dark:text-blue-300 text-sm">
                  {Object.entries(tag)
                    .filter(([, value]) => value)
                    .map(([key, value]) => `${key}="${value}"`)
                    .join(' ')}
                </code>
              </div>
            ))}
          </div>
        </div>

        {/* Twitter Cards */}
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            🐦 Twitter Cards
          </h2>
          <div className="space-y-2">
            {getMetaByType('twitter:').map((tag, index) => (
              <div key={index} className="bg-cyan-50 dark:bg-cyan-900/30 rounded p-2">
                <code className="text-cyan-800 dark:text-cyan-300 text-sm">
                  {Object.entries(tag)
                    .filter(([, value]) => value)
                    .map(([key, value]) => `${key}="${value}"`)
                    .join(' ')}
                </code>
              </div>
            ))}
          </div>
        </div>

        {/* 图标和链接 */}
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            🔗 图标和链接
          </h2>
          <div className="space-y-2">
            {metaTags.filter(tag => tag.rel).map((tag, index) => (
              <div key={index} className="bg-purple-50 dark:bg-purple-900/30 rounded p-2">
                <code className="text-purple-800 dark:text-purple-300 text-sm">
                  {Object.entries(tag)
                    .filter(([, value]) => value)
                    .map(([key, value]) => `${key}="${value}"`)
                    .join(' ')}
                </code>
              </div>
            ))}
          </div>
        </div>

        {/* 结构化数据 */}
        {structuredData.length > 0 && (
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              🏗️ 结构化数据 (JSON-LD)
            </h2>
            {structuredData.map((data, index) => (
              <div key={index} className="bg-gray-100 dark:bg-gray-700 rounded p-4 mb-4">
                <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        )}

        {/* 验证工具推荐 */}
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            🛠️ 推荐验证工具
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href={`https://www.heymeta.com/?url=${window.location.href}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                HeyMeta
              </h3>
              <p className="text-sm text-green-700 dark:text-green-400">
                综合元数据检查工具
              </p>
            </a>
            
            <a
              href={`https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                Facebook 调试器
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                检查 Open Graph 标签
              </p>
            </a>
            
            <a
              href={`https://cards-dev.twitter.com/validator`}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30 rounded-lg hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">
                Twitter 验证器
              </h3>
              <p className="text-sm text-purple-700 dark:text-purple-400">
                验证 Twitter 卡片
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
