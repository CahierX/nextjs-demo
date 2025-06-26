export default function AnalyticsDetailPage() {
  return (
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
          <span className="text-white text-lg">📊</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">详细分析报告</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            深度数据分析与可视化展示
          </p>
        </div>
      </div>
      
      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          这是专门的分析页面，展示了并行路由中主内容区域的变化。
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded-full">
            流量分析
          </span>
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full">
            用户来源
          </span>
          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs rounded-full">
            实时数据
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-5 border border-blue-200/50 dark:border-blue-700/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300">流量趋势</h3>
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">📈</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-white/50 dark:bg-gray-700/30 rounded-lg">
              <span className="text-blue-700 dark:text-blue-400">今日访问</span>
              <span className="font-bold text-lg text-blue-600 dark:text-blue-400">2,345</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/50 dark:bg-gray-700/30 rounded-lg">
              <span className="text-blue-700 dark:text-blue-400">昨日访问</span>
              <span className="font-bold text-lg text-blue-600 dark:text-blue-400">2,156</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/50 dark:bg-gray-700/30 rounded-lg">
              <span className="text-blue-700 dark:text-blue-400">增长率</span>
              <span className="font-bold text-lg text-green-600 dark:text-green-400 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                +8.8%
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-5 border border-green-200/50 dark:border-green-700/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-green-800 dark:text-green-300">用户来源</h3>
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">👥</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-white/50 dark:bg-gray-700/30 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-green-700 dark:text-green-400">直接访问</span>
              </div>
              <span className="font-bold text-lg text-green-600 dark:text-green-400">45%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/50 dark:bg-gray-700/30 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-green-700 dark:text-green-400">搜索引擎</span>
              </div>
              <span className="font-bold text-lg text-green-600 dark:text-green-400">32%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/50 dark:bg-gray-700/30 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                <span className="text-green-700 dark:text-green-400">社交媒体</span>
              </div>
              <span className="font-bold text-lg text-green-600 dark:text-green-400">23%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-5 border border-yellow-200/50 dark:border-yellow-700/50">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-sm">📊</span>
          </div>
          <div>
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
              并行路由特性演示
            </h3>
            <p className="text-yellow-700 dark:text-yellow-400 text-sm">
              注意观察：当您导航到这个分析页面时，右侧的分析槽和团队槽保持独立显示。
              这就是并行路由的强大之处 - 不同的槽可以独立导航和渲染！
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
