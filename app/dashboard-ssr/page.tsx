import { UserService } from '@/lib/userService';
import { User as DatabaseUser } from '@/lib/database';

interface Stats {
  totalUsers: number;
  ageStats: {
    average: number;
    max: number;
    min: number;
    totalWithAge: number;
  };
  monthlyRegistrations: Record<string, number>;
  recentUsers: DatabaseUser[];
}

// 服务端数据获取函数
async function getStats(): Promise<Stats> {
  try {
    const totalUsers = await UserService.getUserCount();
    const allUsers = await UserService.getAllUsers();
    
    // 计算年龄统计
    const ageStats = allUsers.reduce((acc, user) => {
      if (user.age) {
        acc.totalAge += user.age;
        acc.count += 1;
        acc.ages.push(user.age);
      }
      return acc;
    }, { totalAge: 0, count: 0, ages: [] as number[] });

    const averageAge = ageStats.count > 0 ? Math.round(ageStats.totalAge / ageStats.count) : 0;
    const maxAge = ageStats.ages.length > 0 ? Math.max(...ageStats.ages) : 0;
    const minAge = ageStats.ages.length > 0 ? Math.min(...ageStats.ages) : 0;

    // 按月份统计注册用户
    const monthlyStats = allUsers.reduce((acc, user) => {
      if (user.created_at) {
        const month = new Date(user.created_at).toISOString().substring(0, 7);
        acc[month] = (acc[month] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return {
      totalUsers,
      ageStats: {
        average: averageAge,
        max: maxAge,
        min: minAge,
        totalWithAge: ageStats.count
      },
      monthlyRegistrations: monthlyStats,
      recentUsers: allUsers.slice(0, 5) // 最近5个用户
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw new Error('Failed to fetch statistics');
  }
}

// 服务端渲染组件
export default async function DashboardSSR() {
  const stats = await getStats();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard (SSR)</h1>
          <p className="mt-2 text-gray-600">服务端渲染的数据仪表板 - 更快的首屏加载</p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">👥</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">总用户数</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.totalUsers}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">📊</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">平均年龄</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.ageStats.average > 0 ? `${stats.ageStats.average} 岁` : '暂无数据'}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">🎂</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">年龄范围</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.ageStats.min > 0 && stats.ageStats.max > 0 
                        ? `${stats.ageStats.min} - ${stats.ageStats.max}` 
                        : '暂无数据'}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">🆔</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">有年龄信息</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.ageStats.totalWithAge}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 月度注册统计 */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">月度注册统计</h3>
              {Object.keys(stats.monthlyRegistrations).length > 0 ? (
                <div className="space-y-3">
                  {Object.entries(stats.monthlyRegistrations)
                    .sort(([a], [b]) => b.localeCompare(a))
                    .slice(0, 6)
                    .map(([month, count]) => (
                    <div key={month} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {new Date(month + '-01').toLocaleDateString('zh-CN', { 
                          year: 'numeric', 
                          month: 'long' 
                        })}
                      </span>
                      <div className="flex items-center">
                        <div 
                          className="bg-blue-200 rounded-full h-2 mr-3" 
                          style={{ width: `${Math.max(count * 20, 20)}px` }}
                        ></div>
                        <span className="text-sm font-medium text-gray-900">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">暂无注册数据</p>
              )}
            </div>
          </div>

          {/* 最近用户 */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">最近注册用户</h3>
              {stats.recentUsers.length > 0 ? (
                <div className="space-y-4">
                  {stats.recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      <div className="flex-shrink-0 text-sm text-gray-400">
                        {user.age && `${user.age} 岁`}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">暂无用户</p>
              )}
            </div>
          </div>
        </div>

        {/* 快速操作 */}
        <div className="mt-8 bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">快速操作</h3>
            <div className="flex flex-wrap gap-4">
              <a
                href="/user-management"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                用户管理
              </a>
              <a
                href="/dashboard"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                客户端版本
              </a>
              <form action="/dashboard-ssr" method="GET" className="inline">
                <button
                  type="submit"
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  刷新数据
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* SSR 说明 */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="text-lg font-medium text-blue-900 mb-2">🚀 服务端渲染优势</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 更快的首屏加载时间（数据在服务端预取）</li>
            <li>• 更好的 SEO 支持（搜索引擎可以直接爬取内容）</li>
            <li>• 减少客户端 JavaScript 负担</li>
            <li>• 更好的缓存策略支持</li>
            <li>• 在网络较慢的环境下表现更佳</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
