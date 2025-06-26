'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 在实际应用中，这里可以将错误发送到错误报告服务
    console.error('错误边界捕获到错误:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 dark:from-gray-900 dark:to-red-900 flex items-center justify-center p-8">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 max-w-md w-full text-center border border-white/20">
        <div className="text-6xl mb-4">💥</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          哎呀，出错了！
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {error.message || '发生了意外错误'}
        </p>
        
        {process.env.NODE_ENV === 'development' && (
          <details className="text-left mb-6 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <summary className="cursor-pointer font-semibold text-gray-700 dark:text-gray-300 mb-2">
              错误详情 (开发模式)
            </summary>
            <pre className="text-xs text-gray-600 dark:text-gray-400 overflow-auto">
              {error.stack}
            </pre>
          </details>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={reset}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            🔄 重试
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
          >
            🏠 返回首页
          </button>
        </div>
        
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
          错误ID: {error.digest || 'unknown'}
        </p>
      </div>
    </div>
  )
}
