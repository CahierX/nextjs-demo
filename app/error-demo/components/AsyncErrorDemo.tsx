'use client'

import { useState } from 'react'

export function AsyncErrorDemo() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle')
  const [error, setError] = useState<string | null>(null)

  const triggerAsyncError = async () => {
    setStatus('loading')
    setError(null)
    
    try {
      // 模拟异步操作
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('异步操作失败：网络连接超时'))
        }, 2000)
      })
      setStatus('success')
    } catch (err) {
      // 异步错误需要手动捕获和处理
      const errorMessage = err instanceof Error ? err.message : '未知错误'
      setError(errorMessage)
      setStatus('error')
      console.error('异步错误:', err)
    }
  }

  const triggerPromiseError = () => {
    setStatus('loading')
    setError(null)
    
    // 这种未捕获的 Promise 错误也不会被错误边界捕获
    Promise.reject(new Error('未捕获的 Promise 错误'))
      .catch(err => {
        const errorMessage = err instanceof Error ? err.message : '未知错误'
        setError(errorMessage)
        setStatus('error')
        console.error('Promise 错误:', err)
      })
  }

  const triggerSetTimeoutError = () => {
    setStatus('loading')
    setError(null)
    
    // setTimeout 中的错误也不会被错误边界捕获
    setTimeout(() => {
      try {
        throw new Error('setTimeout 中的错误')
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : '未知错误'
        setError(errorMessage)
        setStatus('error')
        console.error('setTimeout 错误:', err)
      }
    }, 1000)
  }

  const reset = () => {
    setStatus('idle')
    setError(null)
  }

  if (status === 'error' && error) {
    return (
      <div className="bg-orange-100 dark:bg-orange-900/30 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
        <h3 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">
          ⚠️ 异步错误 (需手动处理)
        </h3>
        <p className="text-orange-700 dark:text-orange-400 mb-3 text-sm">
          {error}
        </p>
        <button
          onClick={reset}
          className="px-3 py-1 bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 rounded text-sm hover:bg-orange-300 dark:hover:bg-orange-700 transition-colors"
        >
          🔄 重置
        </button>
      </div>
    )
  }

  if (status === 'loading') {
    return (
      <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
          <span className="text-blue-800 dark:text-blue-300">处理异步操作...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <button
        onClick={triggerAsyncError}
        className="block w-full px-3 py-1 bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 rounded text-sm hover:bg-orange-300 dark:hover:bg-orange-700 transition-colors"
      >
        触发异步错误 (async/await) →
      </button>
      <button
        onClick={triggerPromiseError}
        className="block w-full px-3 py-1 bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 rounded text-sm hover:bg-yellow-300 dark:hover:bg-yellow-700 transition-colors"
      >
        触发 Promise 错误 →
      </button>
      <button
        onClick={triggerSetTimeoutError}
        className="block w-full px-3 py-1 bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 rounded text-sm hover:bg-purple-300 dark:hover:bg-purple-700 transition-colors"
      >
        触发 setTimeout 错误 →
      </button>
    </div>
  )
}
