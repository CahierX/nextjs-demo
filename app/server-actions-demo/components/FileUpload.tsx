'use client'

import { useState, useTransition } from 'react'
import { uploadFile } from '@/lib/actions'

export default function FileUpload() {
  const [isPending, startTransition] = useTransition()
  const [uploadResult, setUploadResult] = useState<{
    success: boolean
    file?: { name: string; size: number; type: string; uploadTime: string }
    error?: string
  } | null>(null)
  const [dragOver, setDragOver] = useState(false)

  const handleUpload = async (formData: FormData) => {
    startTransition(async () => {
      try {
        const result = await uploadFile(formData)
        setUploadResult(result)
      } catch (error) {
        setUploadResult({ 
          success: false, 
          error: error instanceof Error ? error.message : '上传失败' 
        })
      }
    })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      const formData = new FormData()
      formData.append('file', files[0])
      handleUpload(formData)
    }
  }

  return (
    <div className="space-y-4">
      {/* 上传结果 */}
      {uploadResult && (
        <div className={`p-3 rounded-lg ${
          uploadResult.success
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
        }`}>
          {uploadResult.success ? (
            <div>
              <p className="font-semibold">文件上传成功！</p>
              {uploadResult.file && (
                <div className="mt-2 text-sm">
                  <p>文件名: {uploadResult.file.name}</p>
                  <p>大小: {(uploadResult.file.size / 1024).toFixed(2)} KB</p>
                  <p>类型: {uploadResult.file.type}</p>
                  <p>上传时间: {new Date(uploadResult.file.uploadTime).toLocaleString()}</p>
                </div>
              )}
            </div>
          ) : (
            <p>{uploadResult.error}</p>
          )}
        </div>
      )}

      {/* 拖拽上传区域 */}
      <form action={handleUpload} className="space-y-4">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragOver
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-300 dark:border-gray-600'
          } ${isPending ? 'opacity-50 pointer-events-none' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="text-4xl">📁</div>
            <p className="text-gray-600 dark:text-gray-400">
              拖拽文件到此处或点击选择文件
            </p>
            <input
              type="file"
              name="file"
              className="hidden"
              id="file-upload"
              disabled={isPending}
            />
            <label
              htmlFor="file-upload"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
            >
              选择文件
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? '上传中...' : '上传文件'}
        </button>
      </form>

      {/* 上传进度指示器 */}
      {isPending && (
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
        </div>
      )}

      {/* 功能说明 */}
      <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
          📤 文件上传特性
        </h3>
        <ul className="text-sm text-yellow-700 dark:text-yellow-400 space-y-1">
          <li>• 支持拖拽上传</li>
          <li>• 使用 Server Actions 处理文件</li>
          <li>• 自动进度指示</li>
          <li>• 详细的文件信息反馈</li>
          <li>• 错误处理和状态管理</li>
        </ul>
      </div>
    </div>
  )
}
