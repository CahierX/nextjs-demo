'use client'; // 🔥 这个指令让组件在客户端渲染

import { useState, useEffect } from 'react';

// 定义用户数据类型
interface User {
  id: number;
  name: string;
  email: string;
  company: string;
  joinDate: string;
}

/**
 * CSR 示例页面
 * 🔥 关键点：这是一个客户端渲染的页面
 * - 在浏览器中执行
 * - 初始 HTML 基本为空
 * - JavaScript 加载后获取数据并渲染
 */
export default function CSRDemoPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState<string>('');

  // 模拟客户端数据获取
  const fetchUserData = async (): Promise<User[]> => {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return [
      {
        id: 1,
        name: '张三',
        email: 'zhangsan@example.com',
        company: '科技有限公司',
        joinDate: '2023-01-15'
      },
      {
        id: 2,
        name: '李四',
        email: 'lisi@example.com',
        company: '创新科技',
        joinDate: '2023-03-20'
      },
      {
        id: 3,
        name: '王五',
        email: 'wangwu@example.com',
        company: '数字科技',
        joinDate: '2023-05-10'
      }
    ];
  };

  // 🔥 useEffect 在客户端执行
  useEffect(() => {
    console.log('🔥 CSR: 组件在客户端执行，开始获取数据...');
    
    // 获取当前时间
    setCurrentTime(new Date().toLocaleString('zh-CN'));
    
    // 获取用户数据
    fetchUserData().then(data => {
      setUsers(data);
      setLoading(false);
      console.log('🔥 CSR: 数据获取完成，组件重新渲染');
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            CSR 渲染页面示例
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            这是一个客户端渲染 (CSR) 的示例页面，数据在浏览器中获取和渲染。
          </p>
          <div className="mt-4 text-sm text-red-500 dark:text-red-400">
            💡 <strong>试试看：</strong> 右键查看页面源代码，你会发现内容很少！
          </div>
        </div>

        {/* 客户端时间显示 */}
        <div className="mb-8">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-800 dark:text-red-200 font-medium">
                客户端渲染时间: {currentTime || '加载中...'}
              </span>
            </div>
            <p className="text-red-600 dark:text-red-300 text-sm mt-1">
              此时间在客户端生成，页面源代码中看不到
            </p>
          </div>
        </div>

        {/* CSR vs SSR 对比 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            🔥 CSR vs SSR 对比
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* CSR 特点 */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">
                CSR (客户端渲染)
              </h3>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    初始 HTML 基本为空
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    JavaScript 下载后开始渲染
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    用户需要等待 loading 状态
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    SEO 不友好
                  </p>
                </div>
              </div>
            </div>

            {/* SSR 特点 */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-green-600 dark:text-green-400">
                SSR (服务端渲染)
              </h3>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    HTML 包含完整内容
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    用户立即看到内容
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    更好的用户体验
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    SEO 友好
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 用户列表 */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            用户列表 (客户端渲染)
          </h2>
          
          {loading ? (
            // 🔥 加载状态 - 用户会看到这个 loading
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 animate-pulse">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // 🔥 数据加载完成后显示
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {users.map(user => (
                <div key={user.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {user.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {user.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400 text-sm">公司:</span>
                      <span className="text-gray-900 dark:text-white text-sm font-medium">
                        {user.company}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400 text-sm">入职日期:</span>
                      <span className="text-gray-900 dark:text-white text-sm font-medium">
                        {user.joinDate}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 测试指南 */}
        <div className="mt-12 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-4">
            🧪 如何验证 CSR 的特点？
          </h3>
          <div className="space-y-2 text-sm text-red-700 dark:text-red-300">
            <p>• <strong>查看源代码：</strong> 右键 → 查看页面源代码，内容很少</p>
            <p>• <strong>网络面板：</strong> 可以看到数据是通过 AJAX 请求获取的</p>
            <p>• <strong>加载过程：</strong> 可以明显看到 loading 状态</p>
            <p>• <strong>禁用 JavaScript：</strong> 页面将无法显示动态内容</p>
            <p>• <strong>控制台日志：</strong> 查看浏览器控制台的客户端日志</p>
          </div>
        </div>

        {/* 页面底部信息 */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-red-100 dark:bg-red-800 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-700 dark:text-red-300 text-sm">
              页面在客户端渲染
            </span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">
            🔍 查看页面源代码，你会发现内容很少，主要是 JavaScript 代码
          </p>
        </div>
      </div>
    </div>
  );
}
