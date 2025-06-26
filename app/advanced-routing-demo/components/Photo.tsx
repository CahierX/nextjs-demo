import Image from 'next/image'

interface PhotoProps {
  id: string
}

const photos = {
  '1': {
    title: '美丽的日落',
    description: '在海边拍摄的壮观日落景色，橙红色的天空倒映在平静的海面上。',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop&auto=format',
    photographer: 'John Doe',
    location: '马尔代夫',
    gradient: 'from-orange-400 to-pink-600'
  },
  '2': {
    title: '山间晨雾',
    description: '清晨时分，薄雾缭绕在青山之间，营造出神秘而宁静的氛围。',
    url: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=500&h=300&fit=crop&auto=format',
    photographer: 'Jane Smith',
    location: '瑞士阿尔卑斯山',
    gradient: 'from-green-400 to-blue-600'
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
      <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden relative">
        {/* 渐变背景作为备用 */}
        <div className={`absolute inset-0 bg-gradient-to-br ${photo.gradient} opacity-80`}></div>
        
        {/* 图片 */}
        <Image 
          src={photo.url} 
          alt={photo.title}
          fill
          className="object-cover"
          onError={(e) => {
            // 如果图片加载失败，隐藏图片显示渐变背景
            e.currentTarget.style.display = 'none';
          }}
        />
        
        {/* 图片位置信息覆盖层 */}
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
      
      <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">💡 拦截路由演示</h3>
        <p className="text-blue-700 dark:text-blue-200 text-sm">
          这个照片在模态框中显示，但URL已更新为 /advanced-routing-demo/photo/{id}。
          如果你刷新页面，将看到照片的完整页面版本。
        </p>
      </div>
    </div>
  )
}
