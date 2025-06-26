export default function DashboardPage() {
  return (
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white text-lg">📊</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">仪表板概览</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            并行路由演示 - 多组件同时渲染
          </p>
        </div>
      </div>
      
      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          欢迎来到并行路由演示！这个页面同时显示了多个独立的组件：分析数据和团队信息。
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded-full">
            Parallel Routes
          </span>
          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs rounded-full">
            独立渲染
          </span>
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full">
            实时数据
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="group bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">总用户数</h3>
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-sm">👥</span>
            </div>
          </div>
          <p className="text-3xl font-bold mb-2">12,345</p>
          <p className="text-blue-100 text-sm flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            较上月 +15%
          </p>
        </div>
        
        <div className="group bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">总收入</h3>
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-sm">💰</span>
            </div>
          </div>
          <p className="text-3xl font-bold mb-2">¥98,765</p>
          <p className="text-green-100 text-sm flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            较上月 +8%
          </p>
        </div>
        
        <div className="group bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">活跃项目</h3>
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-sm">🚀</span>
            </div>
          </div>
          <p className="text-3xl font-bold mb-2">23</p>
          <p className="text-purple-100 text-sm flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            较上月 +3
          </p>
        </div>
      </div>

      <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs">ℹ️</span>
          </div>
          <div>
            <h4 className="font-semibold text-indigo-800 dark:text-indigo-300 mb-1">
              并行路由特性演示
            </h4>
            <p className="text-indigo-700 dark:text-indigo-400 text-sm">
              下方的分析数据和团队信息是通过并行路由独立渲染的。你可以尝试点击导航栏中的&ldquo;分析&rdquo;或&ldquo;团队&rdquo;链接，
              观察它们如何独立更新而不影响其他部分的内容。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
