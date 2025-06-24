import { Suspense } from 'react';
import Link from 'next/link';
import { UserService } from '@/lib/userService';
import { CSRComponent } from './components/CSRComponent';
import { SSGComponent } from './components/SSGComponent';
import { ISRComponent } from './components/ISRComponent';

// 🔥 配置 ISR：60秒重新验证
export const revalidate = 60;

// 🔥 SSR 数据获取
async function fetchServerData() {
  const users = await UserService.getAllUsers();
  return users.slice(0, 3); // 只取前3个用户
}

// 🔥 SSR 组件
async function SSRComponent() {
  const users = await fetchServerData();
  
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
        <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200">
          🚀 SSR (Server-Side Rendering)
        </h3>
      </div>
      
      <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-4 text-sm font-mono">
        <div className="text-gray-400">{`// SSR 服务器端渲染`}</div>
        <div className="text-yellow-400">async function</div> <span className="text-blue-400">SSRComponent</span>() {'{'}
        <br />
        &nbsp;&nbsp;<span className="text-purple-400">const</span> users = <span className="text-yellow-400">await</span> fetchServerData();
        <br />
        &nbsp;&nbsp;<span className="text-yellow-400">return</span> {'<div>'}渲染结果{'</div>'};
        <br />
        {'}'}
      </div>
      
      <div className="space-y-3">
        <div className="text-sm text-blue-600 dark:text-blue-300 mb-2">
          ✅ 数据在服务器端获取，HTML 直接包含数据
        </div>
        {users.map((user) => (
          <div key={user.id} className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
            <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">{user.email}</div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-xs text-blue-600 dark:text-blue-300">
        🔄 每次请求都在服务器端执行，SEO 友好，首屏加载快
      </div>
    </div>
  );
}

// 🔥 主页面组件
export default function HybridDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* 顶部导航 */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
                🌐 Next.js 渲染模式演示
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                🏠 首页
              </Link>
              <Link
                href="/code-difference"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                📊 代码对比
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🎯 Next.js 混合渲染模式对比
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            在同一个页面展示 SSR、CSR、SSG、ISR 等不同渲染方式的特点和使用场景
          </p>
        </div>

        {/* 渲染方式对比网格 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* SSR 组件 */}
          <Suspense fallback={
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-6">
              <div className="animate-pulse">
                <div className="h-6 bg-blue-200 dark:bg-blue-700 rounded w-1/2 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-blue-200 dark:bg-blue-700 rounded"></div>
                  <div className="h-4 bg-blue-200 dark:bg-blue-700 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          }>
            <SSRComponent />
          </Suspense>

          {/* CSR 组件 */}
          <CSRComponent />

          {/* SSG 组件 */}
          <SSGComponent />

          {/* ISR 组件 */}
          <ISRComponent />
        </div>

        {/* 特性对比表 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            📊 渲染方式特性对比
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">渲染方式</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">执行时机</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">SEO</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">首屏加载</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">交互性</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">最佳场景</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-700">
                <tr>
                  <td className="py-3 px-4 font-medium text-blue-600 dark:text-blue-400">SSR</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">服务器端</td>
                  <td className="py-3 px-4 text-green-600 dark:text-green-400">✅ 优秀</td>
                  <td className="py-3 px-4 text-green-600 dark:text-green-400">✅ 快</td>
                  <td className="py-3 px-4 text-yellow-600 dark:text-yellow-400">⚡ 延迟</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">动态内容，SEO要求高</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-orange-600 dark:text-orange-400">CSR</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">客户端</td>
                  <td className="py-3 px-4 text-red-600 dark:text-red-400">❌ 差</td>
                  <td className="py-3 px-4 text-red-600 dark:text-red-400">❌ 慢</td>
                  <td className="py-3 px-4 text-green-600 dark:text-green-400">✅ 即时</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">交互丰富的应用</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-green-600 dark:text-green-400">SSG</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">构建时</td>
                  <td className="py-3 px-4 text-green-600 dark:text-green-400">✅ 优秀</td>
                  <td className="py-3 px-4 text-green-600 dark:text-green-400">✅ 极快</td>
                  <td className="py-3 px-4 text-yellow-600 dark:text-yellow-400">⚡ 延迟</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">静态内容，博客</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-purple-600 dark:text-purple-400">ISR</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">增量更新</td>
                  <td className="py-3 px-4 text-green-600 dark:text-green-400">✅ 优秀</td>
                  <td className="py-3 px-4 text-green-600 dark:text-green-400">✅ 快</td>
                  <td className="py-3 px-4 text-yellow-600 dark:text-yellow-400">⚡ 延迟</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">准静态内容，电商</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
