'use client';

import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
  created_at: string;
  updated_at: string;
}

interface Stats {
  totalUsers: number;
  ageStats: {
    average: number;
    max: number;
    min: number;
    totalWithAge: number;
  };
  monthlyRegistrations: Record<string, number>;
  recentUsers: User[];
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 获取统计数据
  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/stats');
      const result = await response.json();
      
      if (result.success) {
        setStats(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to fetch statistics');
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">No data available</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">Overview of user statistics and recent activity</p>
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
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
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
                    <dt className="text-sm font-medium text-gray-500 truncate">Average Age</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.ageStats.average > 0 ? `${stats.ageStats.average} years` : 'N/A'}
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
                    <dt className="text-sm font-medium text-gray-500 truncate">Age Range</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.ageStats.min > 0 && stats.ageStats.max > 0 
                        ? `${stats.ageStats.min} - ${stats.ageStats.max}` 
                        : 'N/A'}
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
                    <dt className="text-sm font-medium text-gray-500 truncate">With Age Info</dt>
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
              <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Registrations</h3>
              {Object.keys(stats.monthlyRegistrations).length > 0 ? (
                <div className="space-y-3">
                  {Object.entries(stats.monthlyRegistrations)
                    .sort(([a], [b]) => b.localeCompare(a))
                    .slice(0, 6)
                    .map(([month, count]) => (
                    <div key={month} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {new Date(month + '-01').toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long' 
                        })}
                      </span>
                      <div className="flex items-center">
                        <div className="bg-blue-200 rounded-full h-2 mr-3" style={{ width: `${Math.max(count * 20, 20)}px` }}></div>
                        <span className="text-sm font-medium text-gray-900">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No registration data available</p>
              )}
            </div>
          </div>

          {/* 最近用户 */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Users</h3>
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
                        {user.age && `${user.age} years`}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No users found</p>
              )}
            </div>
          </div>
        </div>

        {/* 快速操作 */}
        <div className="mt-8 bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="flex space-x-4">
              <a
                href="/user-management"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
              >
                Manage Users
              </a>
              <button
                onClick={fetchStats}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md font-medium"
              >
                Refresh Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
