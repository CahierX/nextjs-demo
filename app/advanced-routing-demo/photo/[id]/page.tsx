import Link from 'next/link'
import { Photo } from '../../components/PhotoSimple'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function PhotoPage({ params }: PageProps) {
  const { id } = await params
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-2xl mx-auto px-4">
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
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-xl border dark:border-gray-700 p-6">
          <Photo id={id} />
          
          <div className="mt-6 bg-yellow-50/80 dark:bg-yellow-950/50 border border-yellow-200/60 dark:border-yellow-800/60 rounded-lg p-4 backdrop-blur-sm">
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">📄 完整页面模式</h3>
            <p className="text-yellow-700 dark:text-yellow-200 text-sm">
              这是照片的完整页面版本。当您直接访问URL或刷新页面时，会看到这个版本。
              从演示页面点击链接时，会在模态框中显示相同的内容。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
