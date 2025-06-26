// 这个页面会故意抛出错误来演示错误边界
export default async function ServerErrorPage() {
  // 只在运行时（非构建时）抛出错误
  if (process.env.NODE_ENV !== 'production' || typeof window !== 'undefined') {
    // 模拟服务器错误
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 抛出错误
    throw new Error('模拟的服务器错误：数据库连接失败')
  }
  
  // 构建时显示的内容
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          服务器错误演示
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          这个页面会在运行时抛出错误来演示错误处理机制。
        </p>
      </div>
    </div>
  )
}
