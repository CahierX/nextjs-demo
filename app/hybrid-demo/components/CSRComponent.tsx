'use client';

import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

export function CSRComponent() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 模拟客户端数据获取
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // 模拟 API 调用
        const mockUsers = [
          { id: 1, name: '客户端用户1', email: 'csr1@example.com' },
          { id: 2, name: '客户端用户2', email: 'csr2@example.com' },
          { id: 3, name: '客户端用户3', email: 'csr3@example.com' },
        ];
        
        setUsers(mockUsers);
      } catch {
        setError('加载失败');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
        <h3 className="text-xl font-bold text-orange-800 dark:text-orange-200">
          🎨 CSR (Client-Side Rendering)
        </h3>
      </div>
      
      <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-4 text-sm font-mono">
        <div className="text-gray-400">{`// CSR 客户端渲染`}</div>
        <div className="text-yellow-400">{`'use client';`}</div>
        <br />
        <div className="text-purple-400">const</div> [users, setUsers] = <span className="text-blue-400">useState</span>([]);
        <br />
        <div className="text-blue-400">useEffect</div>(() {`=>`} {'{'}
        <br />
        &nbsp;&nbsp;<span className="text-yellow-400">fetchData</span>();
        <br />
        {'}'}, []);
      </div>
      
      {loading && (
        <div className="flex items-center gap-2 text-orange-600 dark:text-orange-300 mb-4">
          <div className="w-4 h-4 border-2 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
          <span>正在加载客户端数据...</span>
        </div>
      )}
      
      {error && (
        <div className="text-red-600 dark:text-red-400 mb-4">
          ❌ {error}
        </div>
      )}
      
      {!loading && !error && (
        <>
          <div className="space-y-3">
            <div className="text-sm text-orange-600 dark:text-orange-300 mb-2">
              ⚡ 数据在客户端获取，JavaScript 加载后才显示内容
            </div>
            {users.map((user) => (
              <div key={user.id} className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{user.email}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-xs text-orange-600 dark:text-orange-300">
            🔄 适合交互丰富的应用，但SEO较差，首屏加载慢
          </div>
        </>
      )}
    </div>
  );
}
