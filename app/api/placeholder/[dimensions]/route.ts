import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ dimensions: string }> }
) {
  const { searchParams } = new URL(request.url)
  const text = searchParams.get('text') || 'Image'
  const bgColor = searchParams.get('bg') || '4f46e5'
  const textColor = searchParams.get('color') || 'ffffff'
  
  // 解析尺寸
  const { dimensions } = await params
  const [width, height] = dimensions.split('x').map(d => parseInt(d) || 400)
  
  // 创建 SVG 占位图
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#${bgColor}"/>
      <text x="50%" y="50%" 
            dominant-baseline="middle" 
            text-anchor="middle" 
            fill="#${textColor}" 
            font-family="Arial, sans-serif" 
            font-size="${Math.min(width, height) / 10}">
        ${text}
      </text>
      <text x="50%" y="60%" 
            dominant-baseline="middle" 
            text-anchor="middle" 
            fill="#${textColor}" 
            font-family="Arial, sans-serif" 
            font-size="${Math.min(width, height) / 20}" 
            opacity="0.7">
        ${width} × ${height}
      </text>
    </svg>
  `
  
  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
