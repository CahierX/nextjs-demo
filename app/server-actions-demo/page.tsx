import { Suspense } from 'react'
import Link from 'next/link'
import { getTodos, getPosts } from '@/lib/actions'
import TodoList from './components/TodoList'
import PostForm from './components/PostForm'
import FileUpload from './components/FileUpload'
import BatchActions from './components/BatchActions'
import DemoHeader from '@/app/components/DemoHeader'

export const metadata = {
  title: 'Server Actions 演示 | Next.js 特性',
  description: '演示 Next.js Server Actions 的各种用法',
}

export default async function ServerActionsDemo() {
  const [todos, posts] = await Promise.all([
    getTodos(),
    getPosts()
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-purple-900">
      <DemoHeader 
        title="⚡ Server Actions 演示" 
        description="演示 Next.js Server Actions 的各种用法"
      />
      
      <div className="max-w-6xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">{/* Todo 管理 */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              📝 Todo 管理
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              使用 Server Actions 进行 CRUD 操作，无需 API 路由
            </p>
            <Suspense fallback={<div className="animate-pulse">加载中...</div>}>
              <TodoList initialTodos={todos} />
            </Suspense>
          </div>

          {/* 文章创建 */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              📄 文章创建
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              使用 useFormState 和 Server Actions 处理表单验证
            </p>
            <PostForm />
          </div>

          {/* 文件上传 */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              📤 文件上传
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              使用 Server Actions 处理文件上传
            </p>
            <FileUpload />
          </div>

          {/* 批量操作 */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              🔄 批量操作
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              演示复杂的表单处理和批量操作
            </p>
            <BatchActions todos={todos} />
          </div>
        </div>

        {/* 文章列表 */}
        <div className="mt-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            📚 文章列表
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map(post => (
              <div key={post.id} className="bg-white/30 dark:bg-gray-700/30 p-4 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                    {post.title}
                  </h3>
                  <span className={`px-2 py-1 text-xs rounded ${
                    post.published 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {post.published ? '已发布' : '草稿'}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  {post.content.substring(0, 100)}...
                </p>
                <div className="flex space-x-2">
                  <Link
                    href={`/server-actions-demo/post/${post.id}`}
                    className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
                  >
                    查看
                  </Link>
                  <Link
                    href={`/server-actions-demo/post/${post.id}/edit`}
                    className="text-yellow-600 dark:text-yellow-400 text-sm hover:underline"
                  >
                    编辑
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 特性说明 */}
        <div className="mt-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            🎯 Server Actions 特性
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                🔒 类型安全
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                完全的 TypeScript 支持，编译时类型检查
              </p>
            </div>
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                🚀 性能优化
              </h3>
              <p className="text-sm text-green-700 dark:text-green-400">
                自动优化，减少客户端 JavaScript 包大小
              </p>
            </div>
            <div className="bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">
                🔄 缓存重验证
              </h3>
              <p className="text-sm text-purple-700 dark:text-purple-400">
                智能缓存管理，自动重验证相关页面
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
                🛡️ 安全性
              </h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-400">
                服务器端执行，防止敏感逻辑暴露
              </p>
            </div>
            <div className="bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 p-4 rounded-lg">
              <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2">
                📱 渐进增强
              </h3>
              <p className="text-sm text-red-700 dark:text-red-400">
                JavaScript 禁用时仍可正常工作
              </p>
            </div>
            <div className="bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30 p-4 rounded-lg">
              <h3 className="font-semibold text-indigo-800 dark:text-indigo-300 mb-2">
                🎨 简化开发
              </h3>
              <p className="text-sm text-indigo-700 dark:text-indigo-400">
                无需创建 API 路由，直接在组件中调用
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
