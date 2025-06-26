'use client'

import { useState, useTransition } from 'react'
import { addTodo, toggleTodo, deleteTodo } from '@/lib/actions'
import { Todo } from '@/lib/database'

interface TodoListProps {
  initialTodos: Todo[]
}

export default function TodoList({ initialTodos }: TodoListProps) {
  const [todos, setTodos] = useState(initialTodos)
  const [isPending, startTransition] = useTransition()
  const [newTodoText, setNewTodoText] = useState('')

  const handleAddTodo = async (formData: FormData) => {
    startTransition(async () => {
      try {
        const result = await addTodo(formData)
        if (result.success && result.todo) {
          setTodos(prev => [result.todo!, ...prev])
          setNewTodoText('')
        }
      } catch (error) {
        console.error('Failed to add todo:', error)
      }
    })
  }

  const handleToggleTodo = async (id: number) => {
    startTransition(async () => {
      try {
        await toggleTodo(id)
        setTodos(prev => prev.map(todo => 
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ))
      } catch (error) {
        console.error('Failed to toggle todo:', error)
      }
    })
  }

  const handleDeleteTodo = async (id: number) => {
    startTransition(async () => {
      try {
        await deleteTodo(id)
        setTodos(prev => prev.filter(todo => todo.id !== id))
      } catch (error) {
        console.error('Failed to delete todo:', error)
      }
    })
  }

  return (
    <div className="space-y-4">
      {/* 添加新 Todo */}
      <form action={handleAddTodo} className="flex gap-2">
        <input
          type="text"
          name="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="添加新任务..."
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
          disabled={isPending}
        />
        <button
          type="submit"
          disabled={isPending || !newTodoText.trim()}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? '添加中...' : '添加'}
        </button>
      </form>

      {/* Todo 列表 */}
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {todos.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            暂无任务，添加一个开始吧！
          </p>
        ) : (
          todos.map(todo => (
            <div
              key={todo.id}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                todo.completed
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                  : 'bg-white/30 dark:bg-gray-700/30 border-gray-200 dark:border-gray-600'
              }`}
            >
              <button
                onClick={() => handleToggleTodo(todo.id!)}
                disabled={isPending}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  todo.completed
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-300 dark:border-gray-600 hover:border-purple-500'
                }`}
              >
                {todo.completed && '✓'}
              </button>
              
              <span
                className={`flex-1 transition-all ${
                  todo.completed
                    ? 'text-green-700 dark:text-green-400 line-through'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {todo.text}
              </span>
              
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {todo.created_at ? new Date(todo.created_at).toLocaleTimeString() : ''}
              </span>
              
              <button
                onClick={() => handleDeleteTodo(todo.id!)}
                disabled={isPending}
                className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1 transition-colors"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>

      {/* 统计信息 */}
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
        <span>总计: {todos.length}</span>
        <span>已完成: {todos.filter(t => t.completed).length}</span>
        <span>待办: {todos.filter(t => !t.completed).length}</span>
      </div>
    </div>
  )
}
