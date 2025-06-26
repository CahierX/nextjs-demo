import Link from 'next/link'
import DemoHeader from '@/app/components/DemoHeader'

export const metadata = {
  title: '高级路由演示 | Next.js 特性',
  description: '演示 Next.js 拦截路由与并行路由的强大功能',
}

export default function AdvancedRoutingDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-gray-900 dark:to-cyan-900">
      <DemoHeader 
        title="🛤️ 高级路由演示" 
        description="演示 Next.js 拦截路由与并行路由的强大功能"
      />
      
      <div className="max-w-6xl mx-auto p-8">
        <div className="space-y-8">{/* 页面介绍 */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              🌟 Next.js 高级路由特性
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              探索 Next.js App Router 的强大功能：拦截路由与并行路由，让您的应用具备更加灵活和动态的用户体验。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                  🔀 拦截路由
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  在不离开当前页面的情况下，以模态框形式显示其他路由内容
                </p>
              </div>
              <div className="bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">
                  📊 并行路由
                </h3>
                <p className="text-sm text-purple-700 dark:text-purple-400">
                  在同一页面同时渲染多个独立的路由组件
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 拦截路由演示 */}
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                🚀 拦截路由演示
              </h2>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-sm rounded-full mb-2">
                  Intercepting Routes
                </span>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  点击下面的链接，内容将以模态框形式显示，而不会导航到新页面。同时URL会更新，支持直接访问和刷新。
                </p>
              </div>
              <div className="space-y-3">
                <Link 
                  href="/advanced-routing-demo/photo/1"
                  className="group block px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <div className="flex items-center justify-between">
                    <span>📸 风景照片 #1</span>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded">模态框</span>
                  </div>
                </Link>
                <Link 
                  href="/advanced-routing-demo/photo/2"
                  className="group block px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <div className="flex items-center justify-between">
                    <span>📸 城市照片 #2</span>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded">模态框</span>
                  </div>
                </Link>
                <Link 
                  href="/advanced-routing-demo/login"
                  className="group block px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <div className="flex items-center justify-between">
                    <span>🔐 用户登录</span>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded">模态框</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* 并行路由演示 */}
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                📊 并行路由演示
              </h2>
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 text-sm rounded-full mb-2">
                  Parallel Routes
                </span>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  在仪表板页面中，我们同时展示分析数据和团队信息，每个部分都是独立的路由组件，具有自己的加载状态和错误处理。
                </p>
              </div>
              
              <Link 
                href="/advanced-routing-demo/dashboard"
                className="group block px-6 py-4 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">🎯 查看仪表板演示</div>
                    <div className="text-sm text-purple-100 mt-1">
                      体验并行路由的强大功能
                    </div>
                  </div>
                  <div className="text-2xl group-hover:translate-x-1 transition-transform">
                    →
                  </div>
                </div>
              </Link>

              <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">
                  📋 并行路由特性
                </h4>
                <ul className="text-sm text-purple-700 dark:text-purple-400 space-y-1">
                  <li>• 同时显示多个独立组件</li>
                  <li>• 各自的加载和错误状态</li>
                  <li>• 条件渲染和动态切换</li>
                  <li>• SEO 友好的 URL 结构</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 技术详解 */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
              � 技术实现详解
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm mr-3">
                    1
                  </span>
                  拦截路由实现
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">文件结构约定</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">(.)folder</code> - 同级目录</li>
                    <li>• <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">(..)folder</code> - 上一级目录</li>
                    <li>• <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">(...)folder</code> - 根目录</li>
                    <li>• <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">(....)folder</code> - 上两级目录</li>
                  </ul>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">核心特性</h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                    <li>• 模态框式内容展示</li>
                    <li>• URL 状态同步</li>
                    <li>• 支持浏览器前进后退</li>
                    <li>• 深度链接支持</li>
                    <li>• 页面刷新保持状态</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center text-sm mr-3">
                    2
                  </span>
                  并行路由实现
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">命名槽约定</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">@analytics</code> - 分析组件槽</li>
                    <li>• <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">@team</code> - 团队组件槽</li>
                    <li>• <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">@modal</code> - 模态框组件槽</li>
                    <li>• <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">default.tsx</code> - 默认回退组件</li>
                  </ul>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">应用场景</h4>
                  <ul className="text-sm text-purple-700 dark:text-purple-400 space-y-1">
                    <li>• 仪表板多面板展示</li>
                    <li>• 社交媒体 Feed 流</li>
                    <li>• 电商网站商品与推荐</li>
                    <li>• 新闻网站内容分类</li>
                    <li>• 后台管理系统模块</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 最佳实践 */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
              ✨ 最佳实践与使用建议
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-3">
                  🎯 何时使用拦截路由
                </h3>
                <ul className="text-sm text-green-700 dark:text-green-400 space-y-2">
                  <li>• 图片画廊预览</li>
                  <li>• 用户登录/注册表单</li>
                  <li>• 商品快速查看</li>
                  <li>• 评论和回复弹窗</li>
                  <li>• 分享和设置面板</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-3">
                  📊 何时使用并行路由
                </h3>
                <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-2">
                  <li>• 仪表板数据展示</li>
                  <li>• 多维度内容呈现</li>
                  <li>• 实时数据监控</li>
                  <li>• 条件性内容渲染</li>
                  <li>• 独立的加载状态</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-3">
                  ⚡ 性能优化建议
                </h3>
                <ul className="text-sm text-purple-700 dark:text-purple-400 space-y-2">
                  <li>• 合理使用 Suspense</li>
                  <li>• 组件级错误边界</li>
                  <li>• 路由预加载策略</li>
                  <li>• 缓存和状态管理</li>
                  <li>• SEO 友好的回退</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}