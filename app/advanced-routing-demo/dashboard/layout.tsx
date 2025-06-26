import Link from 'next/link'

export const metadata = {
  title: '并行路由仪表板 | Next.js 高级路由',
  description: '体验 Next.js 并行路由的强大功能，同时展示多个独立组件',
}

export default function DashboardLayout({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-purple-900">
      {/* 导航栏 */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link 
                href="/advanced-routing-demo"
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors mr-4"
              >
                ← 返回演示
              </Link>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                📊 并行路由仪表板
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <Link 
                href="/advanced-routing-demo/dashboard"
                className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                概览
              </Link>
              <Link 
                href="/advanced-routing-demo/dashboard/analytics"
                className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                分析
              </Link>
              <Link 
                href="/advanced-routing-demo/dashboard/team"
                className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                团队
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容区域 */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* 子页面内容 */}
        <div className="mb-8">
          {children}
        </div>

        {/* 并行路由内容 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 分析槽 */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-white/20">
            <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">📈</span>
                </div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">分析数据</h2>
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded-full">
                  @analytics
                </span>
              </div>
            </div>
            <div className="p-6">
              {analytics}
            </div>
          </div>

          {/* 团队槽 */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-white/20">
            <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">👥</span>
                </div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">团队信息</h2>
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full">
                  @team
                </span>
              </div>
            </div>
            <div className="p-6">
              {team}
            </div>
          </div>
        </div>

        {/* 技术说明 */}
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6 flex items-center">
            <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white text-sm">💡</span>
            </span>
            并行路由技术要点
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-3">🎯 槽 (Slots) 概念</h4>
              <ul className="space-y-2 text-blue-700 dark:text-blue-400 text-sm">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  <span><code className="bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded">@analytics</code> 和 <code className="bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded">@team</code> 是命名槽</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  <span>作为 props 传递给父布局组件</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  <span>可以独立导航和渲染，互不影响</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-3">⚡ 导航行为</h4>
              <ul className="space-y-2 text-purple-700 dark:text-purple-400 text-sm">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  <span>软导航：保持其他槽的状态不变</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  <span>硬导航：使用 default.js 作为回退</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  <span>支持独立的错误和加载状态处理</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
