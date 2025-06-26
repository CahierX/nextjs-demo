export default function TeamDetailPage() {
  const recentActivities = [
    { name: '张三', action: '完成了登录模块开发', time: '2小时前', avatar: '👨‍💻', type: 'development' },
    { name: '李四', action: '提交了API文档', time: '4小时前', avatar: '👩‍💻', type: 'documentation' },
    { name: '王五', action: '更新了UI设计稿', time: '6小时前', avatar: '🎨', type: 'design' },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'development': return '💻'
      case 'documentation': return '📝'
      case 'design': return '🎨'
      default: return '📋'
    }
  }

  return (
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
          <span className="text-white text-lg">👥</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">团队管理</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            团队协作与项目管理中心
          </p>
        </div>
      </div>
      
      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          这是专门的团队管理页面，展示了并行路由中主内容区域的独立导航能力。
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs rounded-full">
            项目管理
          </span>
          <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs rounded-full">
            团队协作
          </span>
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full">
            实时活动
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl p-5 border border-purple-200/50 dark:border-purple-700/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-purple-800 dark:text-purple-300">项目统计</h3>
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">📊</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-white/50 dark:bg-gray-700/30 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-purple-700 dark:text-purple-400">进行中项目</span>
              </div>
              <span className="font-bold text-lg text-purple-600 dark:text-purple-400">8</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/50 dark:bg-gray-700/30 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-purple-700 dark:text-purple-400">已完成项目</span>
              </div>
              <span className="font-bold text-lg text-purple-600 dark:text-purple-400">15</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/50 dark:bg-gray-700/30 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <span className="text-purple-700 dark:text-purple-400">团队效率</span>
              </div>
              <span className="font-bold text-lg text-green-600 dark:text-green-400 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                92%
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-5 border border-orange-200/50 dark:border-orange-700/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-orange-800 dark:text-orange-300">近期活动</h3>
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">⚡</span>
            </div>
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-white/50 dark:bg-gray-700/30 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">{activity.avatar}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-orange-800 dark:text-orange-300">{activity.name}</span>
                    <span className="text-xs">{getActivityIcon(activity.type)}</span>
                  </div>
                  <p className="text-sm text-orange-700 dark:text-orange-400">{activity.action}</p>
                  <p className="text-xs text-orange-600 dark:text-orange-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-5 border border-green-200/50 dark:border-green-700/50">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-sm">👥</span>
          </div>
          <div>
            <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">
              团队协作亮点
            </h3>
            <p className="text-green-700 dark:text-green-400 text-sm">
              当前页面专注于团队管理功能，同时右侧的分析数据和团队信息槽保持独立更新。
              这种设计模式非常适合复杂的仪表板应用！
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
