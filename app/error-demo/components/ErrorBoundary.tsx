'use client'

import React from 'react'

interface Props {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; reset: () => void; errorId?: string }>
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
  errorId: string | null
  retryKey: number
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { 
      hasError: false, 
      error: null, 
      errorId: null,
      retryKey: 0
    }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    return { hasError: true, error, errorId }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary 捕获到错误:', error, errorInfo)
    
    // 调用外部错误处理函数
    this.props.onError?.(error, errorInfo)
    
    // 在生产环境中，这里应该发送错误到监控服务
    if (process.env.NODE_ENV === 'production') {
      // 示例：发送到错误监控服务
      // errorReportingService.captureException(error, {
      //   extra: errorInfo,
      //   tags: { component: 'ErrorBoundary' }
      // })
    }
  }

  handleReset = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorId: null,
      retryKey: this.state.retryKey + 1
    })
  }

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return (
        <FallbackComponent 
          error={this.state.error} 
          reset={this.handleReset}
          errorId={this.state.errorId || undefined}
        />
      )
    }

    // 使用 key 来强制重新创建子组件，确保重试能清除所有状态
    return (
      <React.Fragment key={this.state.retryKey}>
        {this.props.children}
      </React.Fragment>
    )
  }
}

function DefaultErrorFallback({ 
  error, 
  reset, 
  errorId 
}: { 
  error: Error; 
  reset: () => void; 
  errorId?: string 
}) {
  return (
    <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg border border-red-200 dark:border-red-800">
      <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2">
        ❌ 组件错误
      </h3>
      <p className="text-red-700 dark:text-red-400 mb-3 text-sm">
        {error.message}
      </p>
      {errorId && (
        <p className="text-xs text-red-600 dark:text-red-500 mb-3 font-mono">
          错误ID: {errorId}
        </p>
      )}
      <div className="flex gap-2">
        <button
          onClick={reset}
          className="px-3 py-1 bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 rounded text-sm hover:bg-red-300 dark:hover:bg-red-700 transition-colors"
        >
          🔄 重试
        </button>
        {process.env.NODE_ENV === 'development' && (
          <button
            onClick={() => console.error('错误详情:', error)}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            📋 查看详情
          </button>
        )}
      </div>
    </div>
  )
}

export default ErrorBoundary
