import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* 顶部导航 */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
                🌐 Next.js 全功能演示
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/hybrid-demo"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                🎯 渲染模式演示
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
            🎯 Next.js 全功能演示平台
          </h1>
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
          </div>
        </div>
      </div>
    </div>
  );
}
