interface PhotoProps {
  id: string
}

const photos = {
  '1': {
    title: '美丽的日落',
    description: '在海边拍摄的壮观日落景色，橙红色的天空倒映在平静的海面上。',
    photographer: 'John Doe',
    location: '马尔代夫',
    gradient: 'from-orange-400 via-pink-500 to-purple-600',
    emoji: '🌅'
  },
  '2': {
    title: '山间晨雾',
    description: '清晨时分，薄雾缭绕在青山之间，营造出神秘而宁静的氛围。',
    photographer: 'Jane Smith',
    location: '瑞士阿尔卑斯山',
    gradient: 'from-green-400 via-teal-500 to-blue-600',
    emoji: '🏔️'
  }
}

export function Photo({ id }: PhotoProps) {
  const photo = photos[id as keyof typeof photos]
  
  if (!photo) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">照片未找到</h2>
        <p className="text-gray-700 dark:text-gray-300">请检查照片ID是否正确</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* 使用渐变背景替代真实图片 */}
      <div className={`aspect-video bg-gradient-to-br ${photo.gradient} rounded-lg overflow-hidden relative flex items-center justify-center`}>
        {/* 装饰性emoji */}
        <div className="text-8xl opacity-30">{photo.emoji}</div>
        
        {/* 位置信息覆盖层 */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <span className="text-white text-sm">📍 {photo.location}</span>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{photo.title}</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{photo.description}</p>
        
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>📸 {photo.photographer}</span>
          <span>📍 {photo.location}</span>
        </div>
      </div>
      
      <div className="bg-blue-50/80 dark:bg-blue-950/50 border border-blue-200/60 dark:border-blue-800/60 rounded-lg p-4 backdrop-blur-sm">
        <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">💡 拦截路由演示</h3>
        <p className="text-blue-700 dark:text-blue-200 text-sm">
          这个照片在模态框中显示，但URL已更新为 /advanced-routing-demo/photo/{id}。
          如果你刷新页面，将看到照片的完整页面版本。
        </p>
      </div>
    </div>
  )
}
