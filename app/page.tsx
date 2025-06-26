import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* 顶部导航 */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
              <Link href="/" className="font-bold text-3xl text-center w-full block text-gray-900 dark:text-white">
                🌐 Next.js 全功能演示
              </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            集成用户管理系统，数据统计功能，渲染模式演示等完整功能的 Next.js 应用
          </p>
        </div>

        {/* 功能页面导航 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🔗 功能页面导航
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/hybrid-demo"
              className="group bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-2xl">🎯</div>
                <div className="text-xs bg-white/20 px-2 py-1 rounded">演示</div>
              </div>
              <h3 className="font-semibold text-lg mb-2">渲染模式演示</h3>
              <p className="text-sm text-pink-100">SSR、CSR、SSG、ISR 对比演示</p>
            </Link>

            <Link
              href="/dashboard"
              className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-2xl">📊</div>
                <div className="text-xs bg-white/20 px-2 py-1 rounded">CSR</div>
              </div>
              <h3 className="font-semibold text-lg mb-2">数据仪表板</h3>
              <p className="text-sm text-blue-100">客户端渲染的数据统计面板</p>
            </Link>

            <Link
              href="/dashboard-ssr"
              className="group bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-2xl">🚀</div>
                <div className="text-xs bg-white/20 px-2 py-1 rounded">SSR</div>
              </div>
              <h3 className="font-semibold text-lg mb-2">SSR 仪表板</h3>
              <p className="text-sm text-indigo-100">服务端渲染的数据统计面板</p>
            </Link>

            <Link
              href="/user-management"
              className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-2xl">👥</div>
                <div className="text-xs bg-white/20 px-2 py-1 rounded">CRUD</div>
              </div>
              <h3 className="font-semibold text-lg mb-2">用户管理</h3>
              <p className="text-sm text-green-100">完整的用户增删改查功能</p>
            </Link>

            <Link
              href="/csr-demo"
              className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-2xl">🎨</div>
                <div className="text-xs bg-white/20 px-2 py-1 rounded">CSR</div>
              </div>
              <h3 className="font-semibold text-lg mb-2">CSR 演示</h3>
              <p className="text-sm text-orange-100">客户端渲染示例和说明</p>
            </Link>

            <Link
              href="/ssr-demo"
              className="group bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-2xl">⚡</div>
                <div className="text-xs bg-white/20 px-2 py-1 rounded">SSR</div>
              </div>
              <h3 className="font-semibold text-lg mb-2">SSR 演示</h3>
              <p className="text-sm text-purple-100">服务端渲染示例和说明</p>
            </Link>

            <Link
              href="/code-difference"
              className="group bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-2xl">🔄</div>
                <div className="text-xs bg-white/20 px-2 py-1 rounded">对比</div>
              </div>
              <h3 className="font-semibold text-lg mb-2">代码对比</h3>
              <p className="text-sm text-teal-100">不同渲染方式的代码差异</p>
            </Link>

            <Link
              href="/middleware-demo"
              className="group bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-2xl">🛡️</div>
                <div className="text-xs bg-white/20 px-2 py-1 rounded">中间件</div>
              </div>
              <h3 className="font-semibold text-lg mb-2">Middleware 演示</h3>
              <p className="text-sm text-cyan-100">请求拦截、权限验证、A/B测试</p>
            </Link>

            <Link
              href="/server-actions-demo"
              className="group bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-2xl">⚡</div>
                <div className="text-xs bg-white/20 px-2 py-1 rounded">Actions</div>
              </div>
              <h3 className="font-semibold text-lg mb-2">Server Actions</h3>
              <p className="text-sm text-violet-100">表单处理、文件上传、批量操作</p>
            </Link>

            <Link
              href="/streaming-demo"
              className="group bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-2xl">🌊</div>
                <div className="text-xs bg-white/20 px-2 py-1 rounded">流式</div>
              </div>
              <h3 className="font-semibold text-lg mb-2">Streaming 渲染</h3>
              <p className="text-sm text-emerald-100">流式渲染、Suspense、并行数据</p>
            </Link>

            <Link
              href="/error-demo"
              className="group bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-2xl">🚨</div>
                <div className="text-xs bg-white/20 px-2 py-1 rounded">错误处理</div>
              </div>
              <h3 className="font-semibold text-lg mb-2">错误边界</h3>
              <p className="text-sm text-rose-100">错误处理、Loading UI、错误恢复</p>
            </Link>

            <Link
              href="/advanced-routing-demo"
              className="group bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-2xl">🛣️</div>
                <div className="text-xs bg-white/20 px-2 py-1 rounded">高级路由</div>
              </div>
              <h3 className="font-semibold text-lg mb-2">高级路由特性</h3>
              <p className="text-sm text-amber-100">并行路由、拦截路由、路由组</p>
            </Link>

            <Link
              href="/metadata-demo"
              className="group bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-2xl">🏷️</div>
                <div className="text-xs bg-white/20 px-2 py-1 rounded">SEO</div>
              </div>
              <h3 className="font-semibold text-lg mb-2">元数据 API</h3>
              <p className="text-sm text-slate-100">SEO优化、社交媒体分享、动态元数据</p>
            </Link>

            <Link
              href="/swr-demo"
              className="group bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-2xl">📊</div>
                <div className="text-xs bg-white/20 px-2 py-1 rounded">SWR</div>
              </div>
              <h3 className="font-semibold text-lg mb-2">SWR 数据获取</h3>
              <p className="text-sm text-sky-100">缓存、重新验证、实时数据、分页</p>
            </Link>
          </div>
        </div>

        {/* 新增功能特性说明 */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🚀 生产级特性
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">数据管理</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                SWR 数据缓存、SQLite 数据库、实时分析、分页查询
              </p>
            </div>


            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">安全性</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                中间件验证、错误处理、输入验证、API 限流
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">性能优化</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                代码分割、缓存策略、流式渲染、图片优化
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="text-3xl mb-3">📱</div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">用户体验</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                响应式设计、加载状态、错误边界、骨架屏
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
