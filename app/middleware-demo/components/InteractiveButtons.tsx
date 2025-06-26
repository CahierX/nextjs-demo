'use client'

export function ApiTestButton() {
  const handleApiTest = async () => {
    try {
      const response = await fetch('/api/stats')
      const data = await response.json()
      console.log('API 响应:', data)
      alert('API 测试成功！查看控制台获取详细信息。')
    } catch (error) {
      console.error('API 测试失败:', error)
      alert('API 测试失败，请查看控制台获取错误信息。')
    }
  }

  return (
    <button
      onClick={handleApiTest}
      className="inline-block px-3 py-1 bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 rounded text-sm hover:bg-green-300 dark:hover:bg-green-700 transition-colors"
    >
      测试 API →
    </button>
  )
}

export function HeaderInspectButton() {
  const handleInspectHeaders = () => {
    const headers = Object.fromEntries(
      Array.from(document.querySelectorAll('meta[name]')).map(meta => [
        (meta as HTMLMetaElement).name,
        (meta as HTMLMetaElement).content
      ])
    )
    console.log('页面头部信息:', headers)
    console.log('请求头信息:', {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      cookieEnabled: navigator.cookieEnabled
    })
    alert('请求头信息已输出到控制台，请按 F12 查看。')
  }

  return (
    <button
      onClick={handleInspectHeaders}
      className="inline-block px-3 py-1 bg-indigo-200 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200 rounded text-sm hover:bg-indigo-300 dark:hover:bg-indigo-700 transition-colors"
    >
      查看请求头 →
    </button>
  )
}
