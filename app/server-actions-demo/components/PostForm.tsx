'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { createPost } from '@/lib/actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <div className="flex gap-2">
      <button
        type="submit"
        name="published"
        value="off"
        disabled={pending}
        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {pending ? '保存中...' : '保存草稿'}
      </button>
      <button
        type="submit"
        name="published"
        value="on"
        disabled={pending}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {pending ? '发布中...' : '发布文章'}
      </button>
    </div>
  )
}

export default function PostForm() {
  const [state, formAction] = useFormState(createPost, null)

  return (
    <div className="space-y-4">
      {state?.message && (
        <div className={`p-3 rounded-lg ${
          state.success
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
        }`}>
          {state.message}
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            文章标题
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="输入文章标题..."
          />
          {state?.errors?.title && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {state.errors.title[0]}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            文章内容
          </label>
          <textarea
            id="content"
            name="content"
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="输入文章内容..."
          />
          {state?.errors?.content && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {state.errors.content[0]}
            </p>
          )}
        </div>

        <SubmitButton />
      </form>

      {/* 使用说明 */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
          💡 Server Actions 特性演示
        </h3>
        <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
          <li>• 使用 useFormState 处理表单状态</li>
          <li>• 使用 useFormStatus 显示提交状态</li>
          <li>• 服务端数据验证和错误处理</li>
          <li>• 自动缓存重验证</li>
          <li>• 渐进增强：JavaScript 禁用时仍可工作</li>
        </ul>
      </div>
    </div>
  )
}
