'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { Product, User, Analytics } from '@/lib/database';
import DemoHeader from '@/app/components/DemoHeader';

// SWR 配置和 fetcher 函数
const fetcher = (url: string) => fetch(url).then(res => {
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }
  return res.json();
});

// 商品列表组件
function ProductList() {
  const { data: products, error, isLoading, mutate } = useSWR<Product[]>('/api/products', fetcher, {
    refreshInterval: 30000, // 30秒自动刷新
    revalidateOnFocus: true, // 窗口聚焦时重新验证
    revalidateOnReconnect: true, // 网络重连时重新验证
  });

  const [isCreating, setIsCreating] = useState(false);

  const createProduct = async () => {
    setIsCreating(true);
    try {
      const newProduct = {
        name: `新产品 ${Date.now()}`,
        description: '这是一个通过 SWR 创建的新产品',
        price: Math.floor(Math.random() * 10000) + 1000,
        stock: Math.floor(Math.random() * 100),
        category: '电子产品',
      };

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        // 乐观更新：立即更新本地数据
        mutate();
      }
    } catch (error) {
      console.error('创建产品失败:', error);
    } finally {
      setIsCreating(false);
    }
  };

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <span className="text-red-600 dark:text-red-400 text-sm">❌</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-red-800 dark:text-red-200 font-semibold text-lg">加载失败</h3>
            <p className="text-red-600 dark:text-red-400 mt-1">错误信息: {error.message}</p>
            <button 
              onClick={() => mutate()} 
              className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              🔄 重试
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🛍️</span>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">商品列表</h2>
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded-full">
            SWR
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={createProduct}
            disabled={isCreating}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            <span>{isCreating ? '⏳' : '➕'}</span>
            <span>{isCreating ? '创建中...' : '创建商品'}</span>
          </button>
          <button
            onClick={() => mutate()}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            🔄 刷新
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products?.map((product) => (
            <div key={product.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md dark:hover:shadow-gray-700/50 transition-shadow bg-gray-50 dark:bg-gray-700/30">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{product.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-green-600 dark:text-green-400">¥{product.price}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">库存: {product.stock}</span>
              </div>
              <div className="mt-2">
                <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full">
                  {product.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">🔥 SWR 特性</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-700 dark:text-blue-300">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>数据每30秒自动刷新</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>窗口聚焦时重新验证</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>支持乐观更新</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>智能错误处理</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 用户列表组件（带分页）
function UserList() {
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const { data, error, isLoading } = useSWR<{
    users: User[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }>(`/api/users?page=${page}&pageSize=${pageSize}`, fetcher);

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
        <div className="flex items-center space-x-2 text-red-800 dark:text-red-200">
          <span className="text-lg">❌</span>
          <span className="font-semibold">加载用户失败</span>
        </div>
        <p className="text-red-600 dark:text-red-400 mt-1 text-sm">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <span className="text-2xl">👥</span>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">用户列表</h2>
        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs rounded-full">
          分页
        </span>
      </div>
      
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {data?.users?.map((user) => (
              <div key={user.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-700/30">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">{user.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">年龄: {user.age}</p>
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {new Date(user.created_at || '').toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 分页控件 */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              显示 {((page - 1) * pageSize) + 1}-{Math.min(page * pageSize, data?.total || 0)} 
              / 共 {data?.total || 0} 条
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300"
              >
                ← 上一页
              </button>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-lg font-medium">
                {page} / {data?.totalPages || 1}
              </span>
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={page >= (data?.totalPages || 1)}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300"
              >
                下一页 →
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// 实时分析数据组件
function RealTimeAnalytics() {
  const { data: analytics, error, isLoading, mutate } = useSWR<{
    totalEvents: number;
    recentEvents: Analytics[];
    eventsByType: Record<string, number>;
  }>('/api/analytics', fetcher, {
    refreshInterval: 5000, // 5秒刷新一次
  });

  const triggerEvent = async (eventType: string) => {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_type: eventType,
          event_data: JSON.stringify({ timestamp: Date.now(), source: 'demo' }),
        }),
      });
      // 触发数据刷新
      mutate();
    } catch (error) {
      console.error('触发事件失败:', error);
    }
  };

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
        <div className="flex items-center space-x-2 text-red-800 dark:text-red-200">
          <span className="text-lg">📊</span>
          <span className="font-semibold">加载分析数据失败</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">📊</span>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">实时分析</h2>
          <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-xs rounded-full">
            5秒刷新
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => triggerEvent('page_view')}
            className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors"
          >
            📄 页面访问
          </button>
          <button
            onClick={() => triggerEvent('user_action')}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
          >
            🖱️ 用户操作
          </button>
          <button
            onClick={() => triggerEvent('error')}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors"
          >
            ⚠️ 错误事件
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="animate-pulse">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 dark:bg-gray-700 h-20 rounded-lg"></div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">📈</span>
                <div>
                  <h3 className="text-blue-800 dark:text-blue-200 font-semibold">总事件数</h3>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{analytics?.totalEvents || 0}</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">👀</span>
                <div>
                  <h3 className="text-green-800 dark:text-green-200 font-semibold">页面访问</h3>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {analytics?.eventsByType?.page_view || 0}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🎯</span>
                <div>
                  <h3 className="text-purple-800 dark:text-purple-200 font-semibold">用户操作</h3>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {analytics?.eventsByType?.user_action || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-gray-800 dark:text-gray-100 flex items-center space-x-2">
              <span>🕒</span>
              <span>最近事件</span>
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {analytics?.recentEvents?.length ? analytics.recentEvents.map((event, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">
                      {event.event_type === 'page_view' ? '📄' : 
                       event.event_type === 'user_action' ? '🖱️' : 
                       event.event_type === 'error' ? '⚠️' : '📝'}
                    </span>
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-100">{event.event_type}</span>
                      {event.event_data && (
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                          {JSON.parse(event.event_data).source}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(event.created_at || '').toLocaleTimeString()}
                  </span>
                </div>
              )) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <span className="text-4xl">📭</span>
                  <p className="mt-2">暂无事件数据</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// 主页面组件
export default function SwrDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DemoHeader 
        title="SWR 数据获取演示"
        description="体验生产级的数据获取、缓存和同步解决方案"
      />

      <div className="container mx-auto px-4 py-8">
        {/* 特性介绍 */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🔥</span>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-3">生产级特性展示</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-blue-800 dark:text-blue-200 text-sm">自动数据缓存和重新验证</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-blue-800 dark:text-blue-200 text-sm">乐观更新和错误处理</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-blue-800 dark:text-blue-200 text-sm">实时数据更新和分页</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-blue-800 dark:text-blue-200 text-sm">网络状态感知</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-blue-800 dark:text-blue-200 text-sm">数据预取和后台更新</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-blue-800 dark:text-blue-200 text-sm">智能错误重试机制</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 功能演示网格 */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="space-y-8">
            <ProductList />
            <RealTimeAnalytics />
          </div>
          <div>
            <UserList />
          </div>
        </div>

        {/* 最佳实践说明 */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          <div className="text-center mb-8">
            <span className="text-4xl">🎯</span>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-2">SWR 最佳实践</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">生产环境中的关键使用技巧</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🗄️</span>
              </div>
              <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">缓存策略</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 使用合适的缓存键</li>
                <li>• 设置合理的刷新间隔</li>
                <li>• 利用 stale-while-revalidate</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">错误处理</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 提供友好的错误界面</li>
                <li>• 支持重试机制</li>
                <li>• 处理网络断线情况</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">性能优化</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 数据预取和懒加载</li>
                <li>• 乐观更新减少等待</li>
                <li>• 合理的分页大小</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">用户体验</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 加载状态指示器</li>
                <li>• 骨架屏提升感知性能</li>
                <li>• 实时数据更新通知</li>
              </ul>
            </div>
          </div>

          {/* 代码示例 */}
          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">💡 核心代码示例</h4>
            <pre className="text-sm text-gray-600 dark:text-gray-400 overflow-x-auto">
{`const { data, error, isLoading, mutate } = useSWR(
  '/api/products', 
  fetcher, 
  {
    refreshInterval: 30000,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  }
);`}
            </pre>
          </div>
        </div>

        {/* 技术栈信息 */}
        <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
          <p className="flex items-center justify-center space-x-2">
            <span>🔧</span>
            <span>技术栈: Next.js + SWR + SQLite + TypeScript + Tailwind CSS</span>
          </p>
        </div>
      </div>
    </div>
  );
}
