'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DemoHeader from '@/app/components/DemoHeader';

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center">
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-white/20">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <div className="text-xl text-gray-700 dark:text-gray-300">加载中...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center">
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-white/20">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">⚠️</span>
            </div>
            <div className="text-red-600 dark:text-red-400">错误: {error}</div>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center">
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-white/20">
          <div className="text-gray-600 dark:text-gray-400">暂无数据</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      <DemoHeader 
        title="📊 数据仪表板" 
        description="客户端渲染的用户统计和活动概览，展示完整的数据可视化功能"
      />
      
      <div className="max-w-7xl mx-auto p-8">
        {/* 功能标签 */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded-full">
            CSR
          </span>
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full">
            实时数据
          </span>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="group bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg">👥</span>
              </div>
              <div className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-full">
                总计
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">总用户数</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalUsers}</p>
            </div>
          </div>

          <div className="group bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg">📊</span>
              </div>
              <div className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full">
                平均值
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">平均年龄</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.ageStats.average > 0 ? `${stats.ageStats.average}岁` : '暂无'}
              </p>
            </div>
          </div>

          <div className="group bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg">🎂</span>
              </div>
              <div className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-2 py-1 rounded-full">
                范围
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">年龄范围</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.ageStats.min > 0 && stats.ageStats.max > 0 
                  ? `${stats.ageStats.min}-${stats.ageStats.max}` 
                  : '暂无'}
              </p>
            </div>
          </div>

          <div className="group bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg">🆔</span>
              </div>
              <div className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-2 py-1 rounded-full">
                有效
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">有年龄信息</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.ageStats.totalWithAge}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 月度注册统计 */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">📈</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">月度注册统计</h3>
            </div>
            {Object.keys(stats.monthlyRegistrations).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(stats.monthlyRegistrations)
                  .sort(([a], [b]) => b.localeCompare(a))
                  .slice(0, 6)
                  .map(([month, count]) => (
                  <div key={month} className="flex items-center justify-between p-3 bg-white/30 dark:bg-gray-700/30 rounded-lg">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {new Date(month + '-01').toLocaleDateString('zh-CN', { 
                        year: 'numeric', 
                        month: 'long' 
                      })}
                    </span>
                    <div className="flex items-center space-x-3">
                      <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${Math.min((count / Math.max(...Object.values(stats.monthlyRegistrations))) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400 min-w-[2rem]">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm">暂无注册数据</p>
            )}
          </div>

          {/* 最近用户 */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">👤</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">最近用户</h3>
            </div>
            {stats.recentUsers.length > 0 ? (
              <div className="space-y-4">
                {stats.recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center space-x-4 p-3 bg-white/30 dark:bg-gray-700/30 rounded-lg hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all duration-200">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-200 truncate">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                    </div>
                    <div className="flex-shrink-0">
                      {user.age && (
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded-full">
                          {user.age}岁
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm">暂无用户数据</p>
            )}
          </div>
        </div>

        {/* 快速操作 */}
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">⚡</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">快速操作</h3>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/user-management"
              className="group px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="flex items-center space-x-2">
                <span>👥</span>
                <span>用户管理</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
            <button
              onClick={fetchStats}
              className="group px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="flex items-center space-x-2">
                <span>🔄</span>
                <span>刷新数据</span>
              </div>
            </button>
            <Link
              href="/dashboard-ssr"
              className="group px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="flex items-center space-x-2">
                <span>🚀</span>
                <span>SSR版本</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
