import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 中间件：在请求到达页面之前运行
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. API 限流演示
  if (pathname.startsWith('/api/')) {
    const response = NextResponse.next()
    response.headers.set('X-Middleware-Processed', 'true')
    response.headers.set('X-Request-Time', new Date().toISOString())
    
    // 模拟简单的限流
    const userAgent = request.headers.get('user-agent') || 'unknown'
    if (userAgent.includes('bot')) {
      return new Response('Bot access denied', { status: 403 })
    }
    
    return response
  }

  // 2. 路径重写演示
  if (pathname === '/old-dashboard') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // 3. 权限检查演示（模拟）
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('auth-token')
    if (!token) {
      return NextResponse.redirect(new URL('/advanced-routing-demo/login?from=' + pathname, request.url))
    }
  }

  // 4. 地理位置重定向演示
  if (pathname === '/geo-demo') {
    const country = request.headers.get('cf-ipcountry') || 'US' // Cloudflare header
    const response = NextResponse.next()
    response.headers.set('X-Country', country)
    return response
  }

  // 5. A/B 测试演示
  if (pathname === '/ab-test') {
    const variant = Math.random() > 0.5 ? 'A' : 'B'
    const response = NextResponse.next()
    response.cookies.set('ab-variant', variant)
    return response
  }

  return NextResponse.next()
}

// 配置中间件匹配的路径
export const config = {
  matcher: [
    /*
     * 匹配所有请求路径，除了以下开头的：
     * - _next/static (静态文件)
     * - _next/image (图片优化文件)
     * - favicon.ico (网站图标)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
