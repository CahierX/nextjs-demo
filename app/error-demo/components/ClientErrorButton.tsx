'use client'

import { useState } from 'react'

// 这个组件会在渲染时出错，可以被错误边界捕获
function ErrorComponent(): never {
  throw new Error('这是一个客户端渲染错误演示')
}

export function ClientErrorButton() {
  const [shouldError, setShouldError] = useState(false)

  const handleEventError = () => {
    // 这种错误不会被错误边界捕获，但会在控制台显示
    try {
      throw new Error('这是一个事件处理器错误（控制台可见）')
    } catch (error) {
      console.error('事件处理器错误:', error)
      alert('事件处理器错误: ' + (error as Error).message + '\n请查看控制台获取详细信息')
    }
  }

  const handleRenderError = () => {
    // 这会触发组件重新渲染并抛出错误，可以被错误边界捕获
    setShouldError(true)
  }

  // 如果设置为出错，渲染时就会抛出错误
  if (shouldError) {
    return <ErrorComponent />
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handleEventError}
        className="block w-full px-3 py-1 bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded text-sm hover:bg-blue-300 dark:hover:bg-blue-700 transition-colors"
      >
        触发事件错误 (控制台) →
      </button>
      <button
        onClick={handleRenderError}
        className="block w-full px-3 py-1 bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 rounded text-sm hover:bg-purple-300 dark:hover:bg-purple-700 transition-colors"
      >
        触发渲染错误 (边界捕获) →
      </button>
    </div>
  )
}
