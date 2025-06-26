import { Suspense } from 'react'
import { DatabaseService } from '@/lib/database'
import DemoHeader from '@/app/components/DemoHeader'

// 从数据库获取用户统计数据
async function UserStatsData({ delay }: { delay: number }) {
  // 添加延迟以演示流式渲染
  await new Promise(resolve => setTimeout(resolve, delay))
  
  try {
    const users = await DatabaseService.getUsers()
    const totalUsers = users.length
    const recentUsers = users.slice(0, 3)
    
    return (
      <div className="bg-white/30 dark:bg-gray-700/30 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
          👥 用户统计 (延迟 {delay}ms)
        </h3>
        <div className="space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            总用户数: {totalUsers}
          </p>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">最近用户:</p>
            {recentUsers.map(user => (
              <div key={user.id} className="text-xs text-gray-500 dark:text-gray-400">
                • {user.name} ({user.email})
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('获取用户数据失败:', error)
    return (
      <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg">
        <h3 className="font-semibold text-red-800 dark:text-red-300">
          获取用户数据失败
        </h3>
      </div>
    )
  }
}

// 从数据库获取文章数据
async function PostsData({ delay }: { delay: number }) {
  await new Promise(resolve => setTimeout(resolve, delay))
  
  try {
    const posts = await DatabaseService.getPosts()
    const publishedPosts = posts.filter(p => p.published)
    const draftPosts = posts.filter(p => !p.published)
    
    return (
      <div className="bg-white/30 dark:bg-gray-700/30 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
          📄 文章统计 (延迟 {delay}ms)
        </h3>
        <div className="space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            已发布: {publishedPosts.length} | 草稿: {draftPosts.length}
          </p>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">最新文章:</p>
            {posts.slice(0, 3).map(post => (
              <div key={post.id} className="text-xs text-gray-500 dark:text-gray-400">
                • {post.title} ({post.published ? '已发布' : '草稿'})
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('获取文章数据失败:', error)
    return (
      <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg">
        <h3 className="font-semibold text-red-800 dark:text-red-300">
          获取文章数据失败
        </h3>
      </div>
    )
  }
}

// 从数据库获取待办事项数据
async function TodosData({ delay }: { delay: number }) {
  await new Promise(resolve => setTimeout(resolve, delay))
  
  try {
    const todos = await DatabaseService.getTodos()
    const completedTodos = todos.filter(t => t.completed)
    const pendingTodos = todos.filter(t => !t.completed)
    
    return (
      <div className="bg-white/30 dark:bg-gray-700/30 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
          ✅ 待办统计 (延迟 {delay}ms)
        </h3>
        <div className="space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            已完成: {completedTodos.length} | 待完成: {pendingTodos.length}
          </p>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">最近任务:</p>
            {todos.slice(0, 3).map(todo => (
              <div key={todo.id} className="text-xs text-gray-500 dark:text-gray-400">
                • {todo.text} ({todo.completed ? '✅' : '⏳'})
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('获取待办数据失败:', error)
    return (
      <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg">
        <h3 className="font-semibold text-red-800 dark:text-red-300">
          获取待办数据失败
        </h3>
      </div>
    )
  }
}

// 分析数据
async function AnalyticsData({ delay }: { delay: number }) {
  await new Promise(resolve => setTimeout(resolve, delay))
  
  try {
    const stats = await DatabaseService.getAnalyticsStats()
    
    return (
      <div className="bg-white/30 dark:bg-gray-700/30 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
          📊 分析统计 (延迟 {delay}ms)
        </h3>
        <div className="space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            总事件数: {stats.totalEvents}
          </p>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">事件类型:</p>
            {stats.eventsByType.slice(0, 3).map(event => (
              <div key={event.event_type} className="text-xs text-gray-500 dark:text-gray-400">
                • {event.event_type}: {event.count}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('获取分析数据失败:', error)
    return (
      <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg">
        <h3 className="font-semibold text-red-800 dark:text-red-300">
          获取分析数据失败
        </h3>
      </div>
    )
  }
}

function LoadingCard() {
  return (
    <div className="bg-white/20 dark:bg-gray-700/20 p-4 rounded-lg animate-pulse">
      <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded mb-3"></div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        <div className="space-y-1 mt-3">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded w-5/6"></div>
          <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded w-4/6"></div>
          <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded w-3/6"></div>
        </div>
      </div>
    </div>
  )
}

// 嵌套流式组件
function NestedStreamingContent() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        🔄 嵌套流式渲染
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Suspense fallback={<LoadingCard />}>
          <UserStatsData delay={1000} />
          <div className="mt-4 pl-4 border-l-2 border-blue-300 dark:border-blue-700">
            <Suspense fallback={<LoadingCard />}>
              <PostsData delay={2000} />
            </Suspense>
          </div>
        </Suspense>
        
        <Suspense fallback={<LoadingCard />}>
          <TodosData delay={1500} />
          <div className="mt-4 pl-4 border-l-2 border-green-300 dark:border-green-700">
            <Suspense fallback={<LoadingCard />}>
              <AnalyticsData delay={3000} />
            </Suspense>
          </div>
        </Suspense>
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Streaming 演示 | Next.js 特性',
  description: '演示 Next.js 流式渲染和 Suspense 的用法',
}

export default function StreamingDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-green-900">
      <DemoHeader 
        title="🌊 Streaming 演示" 
        description="演示 React 18 Suspense 和 Next.js 流式渲染功能，实现更好的用户体验"
      />
      
      <div className="max-w-6xl mx-auto p-8">
        <div className="space-y-8">{/* 即时可见内容 */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              ⚡ 即时加载内容
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              这部分内容立即显示，不需要等待任何数据获取。用户可以立即看到页面结构和导航。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 dark:text-blue-300">🚀 快速响应</h3>
                <p className="text-sm text-blue-700 dark:text-blue-400 mt-2">
                  页面外壳立即显示，提升用户体验
                </p>
              </div>
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 dark:text-green-300">📊 渐进式</h3>
                <p className="text-sm text-green-700 dark:text-green-400 mt-2">
                  数据准备好后逐步显示内容
                </p>
              </div>
              <div className="bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 dark:text-purple-300">🎯 优化SEO</h3>
                <p className="text-sm text-purple-700 dark:text-purple-400 mt-2">
                  保持服务端渲染的SEO优势
                </p>
              </div>
            </div>
          </div>

          {/* 并行流式渲染 */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              🔀 并行数据获取
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              多个数据源并行获取，哪个先完成就先显示哪个。观察不同的加载时间：
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Suspense fallback={<LoadingCard />}>
                <UserStatsData delay={500} />
              </Suspense>
              
              <Suspense fallback={<LoadingCard />}>
                <PostsData delay={1500} />
              </Suspense>
              
              <Suspense fallback={<LoadingCard />}>
                <TodosData delay={3000} />
              </Suspense>
            </div>
          </div>

          {/* 嵌套流式渲染 */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <Suspense fallback={
              <div className="animate-pulse">
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-4 w-1/3"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <LoadingCard />
                  <LoadingCard />
                </div>
              </div>
            }>
              <NestedStreamingContent />
            </Suspense>
          </div>

          {/* 流式渲染优势 */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              💡 Streaming 的优势
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  ✅ 优势
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• <strong>更快的首屏渲染：</strong>不等待所有数据即可显示页面框架</li>
                  <li>• <strong>更好的用户体验：</strong>用户可以立即与页面交互</li>
                  <li>• <strong>并行数据获取：</strong>多个数据源同时获取，互不阻塞</li>
                  <li>• <strong>渐进式加载：</strong>数据准备好后立即显示</li>
                  <li>• <strong>减少白屏时间：</strong>避免长时间的空白页面</li>
                  <li>• <strong>保持SEO优势：</strong>仍然是服务端渲染</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  🎯 最佳实践
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• <strong>合理的边界：</strong>在合适的组件层级使用 Suspense</li>
                  <li>• <strong>有意义的加载状态：</strong>提供清晰的加载指示器</li>
                  <li>• <strong>错误边界：</strong>处理数据获取失败的情况</li>
                  <li>• <strong>缓存策略：</strong>合理使用缓存避免重复请求</li>
                  <li>• <strong>性能监控：</strong>监控实际的用户体验指标</li>
                  <li>• <strong>渐进增强：</strong>确保基础功能在慢网络下可用</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 代码示例 */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              💻 实现代码
            </h2>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
{`// 基础流式渲染
<Suspense fallback={<Loading />}>
  <SlowDataComponent />
</Suspense>

// 并行数据获取
<div className="grid grid-cols-3 gap-4">
  <Suspense fallback={<Loading />}>
    <FastData />
  </Suspense>
  <Suspense fallback={<Loading />}>
    <MediumData />
  </Suspense>
  <Suspense fallback={<Loading />}>
    <SlowData />
  </Suspense>
</div>

// 嵌套流式渲染
<Suspense fallback={<OuterLoading />}>
  <OuterComponent>
    <Suspense fallback={<InnerLoading />}>
      <InnerComponent />
    </Suspense>
  </OuterComponent>
</Suspense>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
