'use client'

import { useState } from 'react'

export function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`登录演示 - 用户名: ${formData.username}`)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">用户登录</h2>
        <p className="text-gray-700 dark:text-gray-300">这是一个拦截路由模态框演示</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            用户名
          </label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="请输入用户名"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            密码
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="请输入密码"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors font-medium shadow-sm hover:shadow-md"
        >
          登录
        </button>
      </form>

      <div className="bg-green-50/80 dark:bg-green-950/50 border border-green-200/60 dark:border-green-800/60 rounded-lg p-4 backdrop-blur-sm">
        <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">💡 拦截路由特点</h3>
        <ul className="text-green-700 dark:text-green-200 text-sm space-y-1">
          <li>• URL 更新为 /advanced-routing-demo/login</li>
          <li>• 在模态框中显示，保持上下文</li>
          <li>• 支持浏览器前进/后退按钮</li>
          <li>• 刷新页面将显示完整登录页面</li>
        </ul>
      </div>
    </div>
  )
}
