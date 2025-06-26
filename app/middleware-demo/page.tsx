import { cookies, headers } from 'next/headers'
import Link from 'next/link'
import { ApiTestButton, HeaderInspectButton } from './components/InteractiveButtons'
import DemoHeader from '@/app/components/DemoHeader'

export const metadata = {
  title: 'Middleware 演示 | Next.js 特性',
  description: '演示 Next.js 中间件的各种用法',
}

export default async function MiddlewareDemo() {
  const headersList = await headers()
  const cookieStore = await cookies()
  
  const middlewareProcessed = headersList.get('X-Middleware-Processed')
  const requestTime = headersList.get('X-Request-Time')
  const country = headersList.get('X-Country')
  const abVariant = cookieStore.get('ab-variant')?.value

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900">
      <DemoHeader 
        title="🛡️ Middleware 演示" 
        description="演示 Next.js 中间件的各种用法，包括请求处理、响应修改、重定向等"
      />
      
      <div className="max-w-4xl mx-auto p-8">
        <div className="space-y-6">{/* 中间件状态 */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              🔍 中间件执行状态
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 dark:text-green-300">处理状态</h3>
                <p className="text-green-700 dark:text-green-400">
                  {middlewareProcessed ? '✅ 已处理' : '❌ 未处理'}
                </p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 dark:text-blue-300">请求时间</h3>
                <p className="text-blue-700 dark:text-blue-400 text-sm">
                  {requestTime || '未记录'}
                </p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 dark:text-purple-300">地理位置</h3>
                <p className="text-purple-700 dark:text-purple-400">
                  {country || '未检测'}
                </p>
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-300">A/B 测试</h3>
                <p className="text-yellow-700 dark:text-yellow-400">
                  变体: {abVariant || '未设置'}
                </p>
              </div>
            </div>
          </div>

          {/* 中间件演示功能 */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              🧪 中间件演示功能
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {/* 重定向演示 */}
              <div className="bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2">
                  🔄 路径重定向
                </h3>
                <p className="text-sm text-red-700 dark:text-red-400 mb-3">
                  访问旧路径会自动重定向到新路径
                </p>
                <a
                  href="/old-dashboard"
                  className="inline-block px-3 py-1 bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 rounded text-sm hover:bg-red-300 dark:hover:bg-red-700 transition-colors"
                >
                  测试重定向 →
                </a>
              </div>

              {/* API 限流演示 */}
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                  🚦 API 限流
                </h3>
                <p className="text-sm text-green-700 dark:text-green-400 mb-3">
                  API 请求会被中间件处理和限流
                </p>
                <ApiTestButton />
              </div>

              {/* A/B 测试演示 */}
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
                  🎲 A/B 测试
                </h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-400 mb-3">
                  刷新页面查看不同的测试变体
                </p>
                <Link
                  href="/ab-test"
                  className="inline-block px-3 py-1 bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 rounded text-sm hover:bg-yellow-300 dark:hover:bg-yellow-700 transition-colors"
                >
                  A/B 测试页 →
                </Link>
              </div>

              {/* 地理位置演示 */}
              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                  🌍 地理位置
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-400 mb-3">
                  基于地理位置的内容定制
                </p>
                <Link
                  href="/geo-demo"
                  className="inline-block px-3 py-1 bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded text-sm hover:bg-blue-300 dark:hover:bg-blue-700 transition-colors"
                >
                  地理演示 →
                </Link>
              </div>

              {/* 权限检查演示 */}
              <div className="bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">
                  🔐 权限检查
                </h3>
                <p className="text-sm text-purple-700 dark:text-purple-400 mb-3">
                  访问受保护路由的权限验证
                </p>
                <Link
                  href="/admin"
                  className="inline-block px-3 py-1 bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 rounded text-sm hover:bg-purple-300 dark:hover:bg-purple-700 transition-colors"
                >
                  管理员页 →
                </Link>
              </div>

              {/* 请求头修改 */}
              <div className="bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30 p-4 rounded-lg">
                <h3 className="font-semibold text-indigo-800 dark:text-indigo-300 mb-2">
                  📋 请求头修改
                </h3>
                <p className="text-sm text-indigo-700 dark:text-indigo-400 mb-3">
                  中间件可以修改请求和响应头
                </p>
                <HeaderInspectButton />
              </div>
            </div>
          </div>

          {/* 代码示例 */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              💻 中间件代码示例
            </h2>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
{`// middleware.ts
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // API 限流
  if (pathname.startsWith('/api/')) {
    const response = NextResponse.next()
    response.headers.set('X-Middleware-Processed', 'true')
    return response
  }
  
  // 路径重写
  if (pathname === '/old-dashboard') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  // 权限检查
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('auth-token')
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  
  return NextResponse.next()
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
