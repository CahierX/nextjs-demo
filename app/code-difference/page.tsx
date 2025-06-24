import { Suspense } from 'react';
import Link from 'next/link';

// 🔥 SSR: 服务器端数据获取函数
async function fetchUserDataSSR() {
  console.log('🔥 SSR: 在服务器端获取数据...');
  // 模拟数据库查询或 API 调用
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    { id: 1, name: '张三', email: 'zhangsan@example.com', role: '开发工程师' },
    { id: 2, name: '李四', email: 'lisi@example.com', role: '产品经理' },
    { id: 3, name: '王五', email: 'wangwu@example.com', role: '设计师' }
  ];
}

// 🔥 SSR: 服务器组件 - 异步函数，直接 await 数据
async function SSRUserList() {
  // 关键点1: 直接 await 获取数据，无需 useState
  const users = await fetchUserDataSSR();
  
  // 关键点2: 数据已经准备好，直接渲染
  return (
    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4">
        🔥 SSR 版本 - 服务器端渲染
      </h3>
      
      {/* 代码展示 */}
      <div className="bg-gray-800 text-green-400 p-4 rounded-lg mb-4 text-sm font-mono">
        <div className="text-gray-400">{'//'} SSR 代码结构</div>
        <div className="text-blue-400">async function</div> SSRUserList() {'{'}
        <br />
        &nbsp;&nbsp;<span className="text-purple-400">const</span> users = <span className="text-blue-400">await</span> fetchUserDataSSR();
        <br />
        &nbsp;&nbsp;<span className="text-blue-400">return</span> {'<div>'}...{'</div>'};
        <br />
        {'}'}
      </div>
      
      <div className="space-y-3">
        {users.map(user => (
          <div key={user.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{user.name}</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{user.email}</p>
              </div>
              <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs">
                {user.role}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-sm text-green-700 dark:text-green-300">
        ✅ 数据在服务器端获取，HTML 中直接包含内容
      </div>
    </div>
  );
}

// 代码对比展示组件
function CodeComparison() {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      {/* CSR 代码示例 */}
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-4">
          📱 CSR 代码结构
        </h3>
        <div className="bg-gray-800 text-red-400 p-4 rounded-lg text-sm font-mono">
          <div className="text-gray-400">{'//'} CSR 需要状态管理</div>
          <div className="text-purple-400">const</div> [users, setUsers] = <span className="text-blue-400">useState</span>([]);
          <br />
          <div className="text-purple-400">const</div> [loading, setLoading] = <span className="text-blue-400">useState</span>(<span className="text-yellow-400">true</span>);
          <br /><br />
          
          <div className="text-blue-400">useEffect</div>(() =&gt; {'{'}
          <br />
          &nbsp;&nbsp;<span className="text-blue-400">fetch</span>(&apos;/api/users&apos;)
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;.<span className="text-blue-400">then</span>(res =&gt; res.json())
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;.<span className="text-blue-400">then</span>(data =&gt; {'{'}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">setUsers</span>(data);
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">setLoading</span>(<span className="text-yellow-400">false</span>);
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;{'}'});
          <br />
          {'}'}, []);
        </div>
        <div className="mt-4 text-sm text-red-700 dark:text-red-300">
          ❌ 需要管理加载状态，用户会看到 loading
        </div>
      </div>

      {/* SSR 代码示例 */}
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4">
          🚀 SSR 代码结构
        </h3>
        <div className="bg-gray-800 text-green-400 p-4 rounded-lg text-sm font-mono">
          <div className="text-gray-400">{'//'} SSR 直接获取数据</div>
          <div className="text-blue-400">async function</div> ServerComponent() {'{'}
          <br />
          &nbsp;&nbsp;<div className="text-purple-400">const</div> users = <span className="text-blue-400">await</span> <span className="text-blue-400">fetchUsers</span>();
          <br /><br />
          &nbsp;&nbsp;<span className="text-blue-400">return</span> (
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;{'<div>'}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'{'}users.map(user =&gt; ...){'}'} 
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;{'</div>'}
          <br />
          &nbsp;&nbsp;);
          <br />
          {'}'}
        </div>
        <div className="mt-4 text-sm text-green-700 dark:text-green-300">
          ✅ 无需状态管理，数据直接可用
        </div>
      </div>
    </div>
  );
}

// 执行流程对比
function ExecutionFlowComparison() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        🔄 执行流程对比
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* CSR 流程 */}
        <div>
          <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
            CSR 执行流程
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center text-red-600 dark:text-red-300 font-bold text-sm">1</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                服务器返回空白 HTML + JavaScript
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center text-red-600 dark:text-red-300 font-bold text-sm">2</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                React 组件挂载，显示 loading 状态
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center text-red-600 dark:text-red-300 font-bold text-sm">3</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                useEffect 执行，发起 API 请求
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center text-red-600 dark:text-red-300 font-bold text-sm">4</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                数据返回，setState 触发重新渲染
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center text-red-600 dark:text-red-300 font-bold text-sm">5</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                用户看到最终内容
              </div>
            </div>
          </div>
        </div>

        {/* SSR 流程 */}
        <div>
          <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-4">
            SSR 执行流程
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center text-green-600 dark:text-green-300 font-bold text-sm">1</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                服务器接收请求
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center text-green-600 dark:text-green-300 font-bold text-sm">2</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                服务器执行 await fetchData()
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center text-green-600 dark:text-green-300 font-bold text-sm">3</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                服务器渲染完整 HTML
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center text-green-600 dark:text-green-300 font-bold text-sm">4</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                浏览器接收完整 HTML
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center text-green-600 dark:text-green-300 font-bold text-sm">5</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                用户立即看到内容
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 主页面组件
export default function CodeDifferencePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* 导航 */}
        <div className="mb-8">
          <Link 
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← 返回主页
          </Link>
        </div>

        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🔥 SSR vs CSR 代码对比
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            通过实际代码和执行流程，理解服务端渲染和客户端渲染的本质区别
          </p>
        </div>

        {/* 核心区别总结 */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
            💡 核心区别总结
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-red-700 dark:text-red-300 mb-2">客户端渲染 (CSR)</h3>
              <ul className="text-sm text-red-600 dark:text-red-400 space-y-1">
                <li>• 使用 <code className="bg-red-100 dark:bg-red-800 px-1 rounded">useState</code> 管理状态</li>
                <li>• 使用 <code className="bg-red-100 dark:bg-red-800 px-1 rounded">useEffect</code> 获取数据</li>
                <li>• 组件多次渲染（loading → loaded）</li>
                <li>• 需要 <code className="bg-red-100 dark:bg-red-800 px-1 rounded">&apos;use client&apos;</code> 声明</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">服务端渲染 (SSR)</h3>
              <ul className="text-sm text-green-600 dark:text-green-400 space-y-1">
                <li>• 直接 <code className="bg-green-100 dark:bg-green-800 px-1 rounded">await</code> 获取数据</li>
                <li>• 异步函数组件</li>
                <li>• 组件只渲染一次</li>
                <li>• 默认服务器组件，无需声明</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 代码对比 */}
        <CodeComparison />

        {/* 执行流程对比 */}
        <ExecutionFlowComparison />

        {/* 实际效果展示 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            🎯 实际效果展示
          </h2>
          
          <div className="mb-6">
            <div className="flex gap-4 mb-4">
              <Link 
                href="/csr-demo"
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                体验 CSR 版本 →
              </Link>
              <Link 
                href="/ssr-demo"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                体验 SSR 版本 →
              </Link>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              💡 打开两个页面，查看源代码对比差异，并观察加载过程
            </p>
          </div>

          {/* SSR 实际示例 */}
          <Suspense fallback={
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-6 animate-pulse">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-4"></div>
              <div className="space-y-3">
                {[1,2,3].map(i => (
                  <div key={i} className="h-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
                ))}
              </div>
            </div>
          }>
            <SSRUserList />
          </Suspense>
        </div>

        {/* 关键理解点 */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-4">
            🎯 关键理解点
          </h3>
          <div className="space-y-3 text-sm text-yellow-700 dark:text-yellow-300">
            <div className="flex items-start space-x-2">
              <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
              <div>
                <strong>数据获取时机</strong>：CSR 在组件挂载后获取，SSR 在组件渲染前获取
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
              <div>
                <strong>状态管理</strong>：CSR 需要 useState 管理状态，SSR 数据直接可用
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
              <div>
                <strong>渲染次数</strong>：CSR 多次渲染（状态变化），SSR 一次渲染（数据已准备）
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
              <div>
                <strong>用户体验</strong>：CSR 用户看到 loading，SSR 用户立即看到内容
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'SSR vs CSR 代码对比 - Next.js 示例',
  description: '通过实际代码对比理解服务端渲染和客户端渲染的区别',
};
