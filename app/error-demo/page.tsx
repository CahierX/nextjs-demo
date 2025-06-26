import Link from 'next/link'
import { ClientErrorButton } from './components/ClientErrorButton'
import { AsyncErrorDemo } from './components/AsyncErrorDemo'
import { DatabaseService } from '@/lib/database'
import DemoHeader from '@/app/components/DemoHeader'
import ErrorBoundary from './components/ErrorBoundary'

export const metadata = {
  title: '错误处理演示 | Next.js 特性',
  description: '演示 Next.js 错误边界和错误处理的各种方法',
}

// 禁用静态生成，因为这个页面需要运行时数据库连接
export const dynamic = 'force-dynamic'

// 从数据库获取数据的组件，可能会失败
async function DatabaseComponent({ shouldFail }: { shouldFail: boolean }) {
  // 在构建时跳过数据库操作
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build') {
    return (
      <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
          🔄 构建模式
        </h3>
        <p className="text-blue-700 dark:text-blue-400">
          在构建时跳过数据库连接，运行时将正常加载数据。
        </p>
      </div>
    )
  }

  await new Promise(resolve => setTimeout(resolve, 1000))
  
  if (shouldFail) {
    throw new Error('数据库连接失败：无法获取用户数据')
  }
  
  try {
    const users = await DatabaseService.getUsers()
    const posts = await DatabaseService.getPosts()
    const todos = await DatabaseService.getTodos()
    
    return (
      <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg">
        <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">
          ✅ 数据库数据加载成功
        </h3>
        <p className="text-green-700 dark:text-green-400 mb-3">
          成功从 SQLite 数据库获取了真实数据！
        </p>
        <div className="space-y-2 text-sm text-green-600 dark:text-green-500">
          <div>👥 用户数量: {users.length}</div>
          <div>📄 文章数量: {posts.length}</div>
          <div>✅ 待办事项: {todos.length}</div>
          <div className="mt-2">
            <strong>最新用户:</strong> {users.slice(-1)[0]?.name || '无'}
          </div>
          <div>
            <strong>最新文章:</strong> {posts.slice(-1)[0]?.title || '无'}
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('数据库查询错误:', error)
    throw new Error('数据库查询失败：' + (error as Error).message)
  }
}

export default function ErrorDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 dark:from-gray-900 dark:to-red-900">
      <DemoHeader 
        title="🚨 错误处理演示" 
        description="演示 Next.js 错误边界和错误处理的各种方法"
      />
      
      <div className="max-w-6xl mx-auto p-8">
        <div className="space-y-8">
          {/* 成功案例 */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              ✅ 正常工作的组件
            </h2>
            <DatabaseComponent shouldFail={false} />
          </div>

          {/* 错误案例 */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              ❌ 会出错的组件
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              这个组件会抛出错误，但被局部错误边界捕获，不会影响整个页面。查看 <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">ErrorBoundary.tsx</code> 文件的处理。
            </p>
            <ErrorBoundary>
              <DatabaseComponent shouldFail={true} />
            </ErrorBoundary>
          </div>

          {/* 错误类型说明 */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              🔍 Next.js 错误处理机制
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  📁 文件级错误边界
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• <strong>error.tsx：</strong>页面级错误边界</li>
                  <li>• <strong>global-error.tsx：</strong>全局错误边界</li>
                  <li>• <strong>not-found.tsx：</strong>404 页面</li>
                  <li>• <strong>loading.tsx：</strong>加载状态</li>
                  <li>• <strong>ErrorBoundary组件：</strong>局部错误边界</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  🛠️ 错误处理最佳实践
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• <strong>错误边界：</strong>在合适的层级设置错误边界</li>
                  <li>• <strong>渲染错误：</strong>错误边界可捕获渲染期间的错误</li>
                  <li>• <strong>事件错误：</strong>需要在事件处理器中手动处理</li>
                  <li>• <strong>异步错误：</strong>使用 try-catch 和 Promise.catch</li>
                  <li>• <strong>错误上报：</strong>将错误发送到监控服务</li>
                  <li>• <strong>错误ID：</strong>为每个错误生成唯一标识</li>
                  <li>• <strong>用户友好：</strong>提供有用的错误信息</li>
                  <li>• <strong>重试机制：</strong>允许用户重试失败的操作</li>
                  <li>• <strong>降级策略：</strong>提供备用的UI或功能</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 错误边界限制说明 */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              ⚠️ 错误边界的限制
            </h2>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 mb-4">
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
                🚨 错误边界无法捕获的错误类型
              </h3>
              <ul className="space-y-1 text-sm text-yellow-700 dark:text-yellow-400">
                <li>• 事件处理器中的错误（如 onClick 中的错误）</li>
                <li>• 异步代码中的错误（如 setTimeout、Promise 中的错误）</li>
                <li>• 服务端渲染期间的错误</li>
                <li>• 错误边界自身抛出的错误</li>
              </ul>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                ✅ 错误边界可以捕获的错误类型
              </h3>
              <ul className="space-y-1 text-sm text-green-700 dark:text-green-400">
                <li>• 组件渲染期间的错误</li>
                <li>• 生命周期方法中的错误</li>
                <li>• 构造函数中的错误</li>
                <li>• 子组件树中的错误</li>
              </ul>
            </div>
          </div>

          {/* 不同错误类型 */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              🎯 错误类型演示
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* 服务器错误 */}
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2">
                  🔥 服务器错误 (500)
                </h3>
                <p className="text-sm text-red-700 dark:text-red-400 mb-3">
                  数据获取失败，数据库连接错误等
                </p>
                <Link
                  href="/error-demo/server-error"
                  className="inline-block px-3 py-1 bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 rounded text-sm hover:bg-red-300 dark:hover:bg-red-700 transition-colors"
                >
                  触发服务器错误 →
                </Link>
              </div>

              {/* 404 错误 */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
                  🔍 页面未找到 (404)
                </h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-400 mb-3">
                  访问不存在的页面或资源
                </p>
                <Link
                  href="/non-existent-page"
                  className="inline-block px-3 py-1 bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 rounded text-sm hover:bg-yellow-300 dark:hover:bg-yellow-700 transition-colors"
                >
                  访问不存在页面 →
                </Link>
              </div>

              {/* 客户端错误 */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                  ⚡ 客户端错误
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-400 mb-3">
                  演示事件错误和渲染错误的区别
                </p>
                <ErrorBoundary>
                  <ClientErrorButton />
                </ErrorBoundary>
              </div>

              {/* 异步错误 */}
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                <h3 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">
                  🕐 异步错误
                </h3>
                <p className="text-sm text-orange-700 dark:text-orange-400 mb-3">
                  Promise、setTimeout 等异步错误
                </p>
                <AsyncErrorDemo />
              </div>
            </div>
          </div>

          {/* 生产环境最佳实践 */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              🚀 生产环境错误处理最佳实践
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  📊 错误监控服务
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• <strong>Sentry：</strong>功能完善的错误监控平台</li>
                  <li>• <strong>Rollbar：</strong>实时错误跟踪和调试</li>
                  <li>• <strong>Bugsnag：</strong>移动和Web应用错误监控</li>
                  <li>• <strong>LogRocket：</strong>会话录制和错误分析</li>
                  <li>• <strong>Datadog：</strong>全栈监控和日志分析</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  🔧 错误处理策略
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• <strong>优雅降级：</strong>功能失败时提供替代方案</li>
                  <li>• <strong>重试机制：</strong>自动重试临时性错误</li>
                  <li>• <strong>断路器：</strong>防止级联故障</li>
                  <li>• <strong>用户通知：</strong>及时告知用户错误状态</li>
                  <li>• <strong>错误分类：</strong>区分用户错误和系统错误</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                💡 集成示例：Sentry
              </h4>
              <div className="bg-gray-900 rounded-lg p-3 overflow-x-auto">
                <pre className="text-green-400 text-xs">
{`// 在 ErrorBoundary 中集成 Sentry
import * as Sentry from '@sentry/nextjs'

componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
  Sentry.captureException(error, {
    contexts: {
      react: {
        componentStack: errorInfo.componentStack,
      },
    },
    tags: {
      component: 'ErrorBoundary',
    },
  })
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* 错误边界代码示例 */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              💻 错误边界代码示例
            </h2>
            <div className="space-y-4">
              
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  📄 改进版 ErrorBoundary.tsx
                </h3>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
{`'use client'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      hasError: false, 
      error: null, 
      errorId: null,
      retryKey: 0
    }
  }

  static getDerivedStateFromError(error) {
    const errorId = \`error_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`
    return { hasError: true, error, errorId }
  }

  componentDidCatch(error, errorInfo) {
    // 发送到错误监控服务
    console.error('ErrorBoundary 捕获到错误:', error, errorInfo)
    
    // 生产环境中发送到 Sentry 等监控服务
    if (process.env.NODE_ENV === 'production') {
      // Sentry.captureException(error, { extra: errorInfo })
    }
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} reset={this.handleReset} />
    }
    return <React.Fragment key={this.state.retryKey}>{this.props.children}</React.Fragment>
  }
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  📄 error.tsx
                </h3>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
{`'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">出错了！</h2>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          重试
        </button>
      </div>
    </div>
  )
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  📄 异步错误处理示例
                </h3>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
{`// 异步错误需要手动处理
const handleAsyncOperation = async () => {
  try {
    const result = await someAsyncOperation()
    return result
  } catch (error) {
    // 记录错误
    console.error('异步操作失败:', error)
    
    // 发送到监控服务
    if (process.env.NODE_ENV === 'production') {
      // Sentry.captureException(error)
    }
    
    // 更新 UI 状态
    setError(error.message)
    setLoading(false)
  }
}

// Promise 错误处理
promise
  .then(result => handleSuccess(result))
  .catch(error => handleError(error))

// 或者使用全局错误处理
window.addEventListener('unhandledrejection', event => {
  console.error('未处理的 Promise 错误:', event.reason)
  // 发送到监控服务
})`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
