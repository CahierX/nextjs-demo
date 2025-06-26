import { Suspense } from 'react'
import DemoHeader from '@/app/components/DemoHeader'

// ISR 配置：每30秒重新验证
export const revalidate = 30

interface Post {
  id: number
  title: string
  content: string
  publishedAt: string
  views: number
}

// 模拟数据获取
async function fetchPosts(): Promise<Post[]> {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // 生成动态内容
  const currentTime = new Date().toLocaleString('zh-CN')
  
  return [
    {
      id: 1,
      title: '什么是 ISR (Incremental Static Regeneration)?',
      content: 'ISR 允许你创建或更新静态页面，而无需重新构建整个网站。',
      publishedAt: currentTime,
      views: Math.floor(Math.random() * 1000) + 100
    },
    {
      id: 2,
      title: 'ISR 的优势',
      content: '结合了静态生成的性能优势和服务器端渲染的灵活性。',
      publishedAt: currentTime,
      views: Math.floor(Math.random() * 800) + 50
    },
    {
      id: 3,
      title: 'ISR 使用场景',
      content: '适用于内容更新频率不高，但需要保持相对新鲜的页面。',
      publishedAt: currentTime,
      views: Math.floor(Math.random() * 600) + 75
    }
  ]
}

// ISR 组件
async function PostList() {
  const posts = await fetchPosts()
  
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <article key={post.id} className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3">{post.title}</h2>
          <p className="text-gray-600 mb-4">{post.content}</p>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>📅 发布时间: {post.publishedAt}</span>
            <span>👁️ 浏览量: {post.views}</span>
          </div>
        </article>
      ))}
    </div>
  )
}

export default function ISRTestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DemoHeader 
        title="🔄 ISR 演示 (Incremental Static Regeneration)" 
        description="增量静态再生演示 - 页面每30秒自动重新生成，提供最新内容"
      />
      
      <div className="max-w-4xl mx-auto p-8">{/* 技术说明 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-800 mb-3">💡 ISR 技术特点</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-700 text-sm">
            <div>
              <h3 className="font-semibold mb-2">工作原理：</h3>
              <ul className="space-y-1">
                <li>• 首次构建时生成静态页面</li>
                <li>• 设置重新验证间隔 (revalidate = 30秒)</li>
                <li>• 后台自动重新生成内容</li>
                <li>• 用户始终获得快速响应</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">使用场景：</h3>
              <ul className="space-y-1">
                <li>• 博客文章和新闻网站</li>
                <li>• 电商产品页面</li>
                <li>• 数据仪表板</li>
                <li>• 内容管理系统</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 实时状态显示 */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-green-800">📊 页面状态</h3>
              <p className="text-green-700 text-sm">
                重新验证间隔: 30秒 | 页面类型: ISR | 生成时间: {new Date().toLocaleString('zh-CN')}
              </p>
            </div>
            <div className="text-green-600">
              <svg className="w-6 h-6 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
          </div>
        </div>

        {/* 文章列表 */}
        <Suspense fallback={
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">正在加载 ISR 内容...</p>
          </div>
        }>
          <PostList />
        </Suspense>

        {/* 操作说明 */}
        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-semibold text-yellow-800 mb-3">🧪 测试 ISR 功能</h3>
          <div className="text-yellow-700 text-sm space-y-2">
            <p>1. <strong>观察内容变化</strong>: 页面显示的发布时间和浏览量会动态更新</p>
            <p>2. <strong>测试重新验证</strong>: 等待30秒后刷新页面，观察内容是否更新</p>
            <p>3. <strong>性能测试</strong>: 注意页面加载速度 - ISR 页面像静态页面一样快速</p>
            <p>4. <strong>后台更新</strong>: 即使有用户正在访问，内容也会在后台自动更新</p>
          </div>
        </div>
      </div>
    </div>
  )
}