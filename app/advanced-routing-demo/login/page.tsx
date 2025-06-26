import Link from 'next/link'
import { Login } from '../components/Login'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="mb-6">
          <Link 
            href="/advanced-routing-demo"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回演示页面
          </Link>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-xl border dark:border-gray-700 p-8">
          <Login />
          
          <div className="mt-6 bg-yellow-50/80 dark:bg-yellow-950/50 border border-yellow-200/60 dark:border-yellow-800/60 rounded-lg p-4 backdrop-blur-sm">
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">📄 独立登录页面</h3>
            <p className="text-yellow-700 dark:text-yellow-200 text-sm">
              这是登录的独立页面版本。当您直接访问 /login URL 或刷新页面时显示。
              从演示页面点击登录链接时，会在模态框中显示相同的登录表单。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
