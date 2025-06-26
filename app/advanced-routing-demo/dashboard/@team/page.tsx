export default function TeamPage() {
  const teamMembers = [
    { name: '张三', role: '前端开发', avatar: '👨‍💻', status: '在线', statusColor: 'green', department: '技术部' },
    { name: '李四', role: '后端开发', avatar: '👩‍💻', status: '忙碌', statusColor: 'yellow', department: '技术部' },
    { name: '王五', role: 'UI设计师', avatar: '🎨', status: '离线', statusColor: 'gray', department: '设计部' },
    { name: '赵六', role: '产品经理', avatar: '📋', status: '在线', statusColor: 'green', department: '产品部' },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case '在线': return '🟢'
      case '忙碌': return '🟡'
      case '离线': return '⚪'
      default: return '⚪'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">团队成员</h3>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {teamMembers.filter(m => m.status === '在线').length} 人在线
          </span>
        </div>
      </div>
      
      <div className="space-y-3">
        {teamMembers.map((member, index) => (
          <div 
            key={index} 
            className="group bg-gradient-to-r from-gray-50 to-white dark:from-gray-700/50 dark:to-gray-600/50 hover:from-gray-100 hover:to-gray-50 dark:hover:from-gray-600/50 dark:hover:to-gray-500/50 p-4 rounded-lg transition-all duration-300 hover:shadow-md border border-gray-200/50 dark:border-gray-600/50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <span className="text-xl">{member.avatar}</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                    <span className="text-xs">{getStatusIcon(member.status)}</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-semibold text-gray-800 dark:text-gray-200">{member.name}</p>
                    <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded-full">
                      {member.department}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  member.statusColor === 'green' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : member.statusColor === 'yellow'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {member.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs">👥</span>
          </div>
          <div>
            <h4 className="font-semibold text-green-800 dark:text-green-300 mb-1">
              @team 槽组件
            </h4>
            <p className="text-green-700 dark:text-green-400 text-sm">
              这是团队信息槽的内容，可以独立更新而不影响分析数据。支持实时状态更新和成员管理功能。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
