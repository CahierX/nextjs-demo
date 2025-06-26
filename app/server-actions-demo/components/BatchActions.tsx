'use client'

import { useState, useTransition } from 'react'
import { batchUpdateTodos } from '@/lib/actions'
import { Todo } from '@/lib/database'

interface BatchActionsProps {
  todos: Todo[]
}

export default function BatchActions({ todos: initialTodos }: BatchActionsProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<{ success: boolean; message: string; affected?: number } | null>(null)

  const handleSelectAll = () => {
    if (selectedIds.length === initialTodos.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(initialTodos.map(t => t.id!).filter(id => id !== undefined))
    }
  }

  const handleSelectTodo = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    )
  }

  const handleBatchAction = async (formData: FormData) => {
    if (selectedIds.length === 0) {
      setResult({ success: false, message: '请先选择要操作的任务' })
      return
    }

    startTransition(async () => {
      try {
        // 添加选中的ID到formData
        selectedIds.forEach(id => {
          formData.append('selected', id.toString())
        })
        
        const result = await batchUpdateTodos(formData)
        
        setResult({
          success: true,
          message: `成功操作了 ${result.affected} 个任务`,
          affected: result.affected
        })
        
        // 清空选择
        setSelectedIds([])
        
        // 3秒后清除结果
        setTimeout(() => setResult(null), 3000)
      } catch (error) {
        setResult({
          success: false,
          message: error instanceof Error ? error.message : '操作失败'
        })
      }
    })
  }

  return (
    <div className="space-y-4">
      {/* 操作结果 */}
      {result && (
        <div className={`p-3 rounded-lg ${
          result.success
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
        }`}>
          {result.message}
        </div>
      )}

      {/* 选择统计 */}
      <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          已选择 {selectedIds.length} / {initialTodos.length} 个任务
        </span>
        <button
          onClick={handleSelectAll}
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        >
          {selectedIds.length === initialTodos.length ? '取消全选' : '全选'}
        </button>
      </div>

      {/* 任务列表 */}
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {initialTodos.map(todo => (
          <div
            key={todo.id}
            className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
              selectedIds.includes(todo.id!)
                ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700'
                : 'bg-white/30 dark:bg-gray-700/30 border-gray-200 dark:border-gray-600 hover:bg-white/50 dark:hover:bg-gray-700/50'
            }`}
            onClick={() => handleSelectTodo(todo.id!)}
          >
            <input
              type="checkbox"
              checked={selectedIds.includes(todo.id!)}
              onChange={() => handleSelectTodo(todo.id!)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            
            <div className="flex-1">
              <span className={`${todo.completed ? 'line-through text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}>
                {todo.text}
              </span>
            </div>
            
            <span className={`px-2 py-1 text-xs rounded ${
              todo.completed 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
            }`}>
              {todo.completed ? '已完成' : '待办'}
            </span>
          </div>
        ))}
      </div>

      {/* 批量操作按钮 */}
      <form action={handleBatchAction} className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <button
            type="submit"
            name="action"
            value="complete"
            disabled={isPending || selectedIds.length === 0}
            className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
          >
            {isPending ? '处理中...' : '标记完成'}
          </button>
          
          <button
            type="submit"
            name="action"
            value="incomplete"
            disabled={isPending || selectedIds.length === 0}
            className="px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
          >
            {isPending ? '处理中...' : '标记未完成'}
          </button>
          
          <button
            type="submit"
            name="action"
            value="delete"
            disabled={isPending || selectedIds.length === 0}
            className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
          >
            {isPending ? '删除中...' : '删除选中'}
          </button>
        </div>
      </form>

      {/* 功能说明 */}
      <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
        <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">
          🔄 批量操作特性
        </h3>
        <ul className="text-sm text-purple-700 dark:text-purple-400 space-y-1">
          <li>• 支持多选和全选操作</li>
          <li>• 单个 Server Action 处理批量数据</li>
          <li>• 实时反馈操作结果</li>
          <li>• 优化的用户交互体验</li>
          <li>• 自动状态管理和错误处理</li>
        </ul>
      </div>
    </div>
  )
}
