'use client';

import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  lastUpdated: string;
}

export function ISRComponent() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRevalidated, setLastRevalidated] = useState<string>('');

  // 模拟 ISR 数据获取
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const now = new Date().toLocaleString('zh-CN');
        const mockUsers = [
          { id: 1, name: 'ISR用户1', email: 'isr1@example.com', lastUpdated: now },
          { id: 2, name: 'ISR用户2', email: 'isr2@example.com', lastUpdated: now },
          { id: 3, name: 'ISR用户3', email: 'isr3@example.com', lastUpdated: now },
        ];
        
        setUsers(mockUsers);
        setLastRevalidated(now);
      } catch {
        // 错误处理
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRevalidate = () => {
    setLoading(true);
    // 模拟重新验证
    setTimeout(() => {
      const now = new Date().toLocaleString('zh-CN');
      setUsers(prev => prev.map(user => ({ ...user, lastUpdated: now })));
      setLastRevalidated(now);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
        <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200">
          🔄 ISR (Incremental Static Regeneration)
        </h3>
      </div>
      
      <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-4 text-sm font-mono">
        <div className="text-gray-400">{`// ISR 增量静态再生成`}</div>
        <div className="text-yellow-400">export async function</div> <span className="text-blue-400">getStaticProps</span>() {'{'}
        <br />
        &nbsp;&nbsp;<span className="text-yellow-400">return</span> {'{'}
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;props: {'{ data }'},
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">revalidate</span>: <span className="text-orange-400">60</span> <span className="text-gray-400">{`// 60秒后重新生成`}</span>
        <br />
        &nbsp;&nbsp;{'}'};
        <br />
        {'}'}
      </div>
      
      {loading && (
        <div className="flex items-center gap-2 text-purple-600 dark:text-purple-300 mb-4">
          <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          <span>正在更新数据...</span>
        </div>
      )}
      
      {!loading && (
        <>
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-purple-600 dark:text-purple-300">
              🔄 静态生成 + 按需更新，兼顾性能和新鲜度
            </div>
            <button
              onClick={handleRevalidate}
              className="px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700 transition-colors"
            >
              重新验证
            </button>
          </div>
          
          <div className="space-y-3">
            {users.map((user) => (
              <div key={user.id} className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{user.email}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  更新时间: {user.lastUpdated}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-xs text-purple-600 dark:text-purple-300">
            ⚡ 适合电商产品页面，内容定期更新但不频繁变化
          </div>
          
          {lastRevalidated && (
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              最后重新验证: {lastRevalidated}
            </div>
          )}
        </>
      )}
    </div>
  );
}
