export default function AnalyticsPage() {
  const analyticsData = [
    { label: '页面浏览量', value: '45,267', color: 'blue', trend: '+12.5%', icon: '📊' },
    { label: '独立访客', value: '12,845', color: 'green', trend: '+8.3%', icon: '👤' },
    { label: '平均停留时间', value: '3分42秒', color: 'purple', trend: '+15.2%', icon: '⏱️' },
    { label: '跳出率', value: '34.5%', color: 'orange', trend: '-5.1%', icon: '📉' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">网站分析数据</h3>
        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded-full">
          实时更新
        </span>
      </div>
      
      <div className="space-y-3">
        {analyticsData.map((item, index) => (
          <div 
            key={index}
            className="group bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-600/50 hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-600/50 dark:hover:to-gray-500/50 p-4 rounded-lg transition-all duration-300 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 bg-gradient-to-r ${
                  item.color === 'blue' ? 'from-blue-500 to-blue-600' :
                  item.color === 'green' ? 'from-green-500 to-green-600' :
                  item.color === 'purple' ? 'from-purple-500 to-purple-600' :
                  'from-orange-500 to-orange-600'
                } rounded-lg flex items-center justify-center`}>
                  <span className="text-white text-sm">{item.icon}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">{item.label}</p>
                  <p className={`text-2xl font-bold ${
                    item.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                    item.color === 'green' ? 'text-green-600 dark:text-green-400' :
                    item.color === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                    'text-orange-600 dark:text-orange-400'
                  }`}>
                    {item.value}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.trend.startsWith('+') 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {item.trend}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs">📊</span>
          </div>
          <div>
            <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">
              @analytics 槽组件
            </h4>
            <p className="text-blue-700 dark:text-blue-400 text-sm">
              这是分析数据槽的内容，独立于其他组件进行渲染和导航。数据更新不会影响团队信息或主页面内容。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
