import { NextRequest, NextResponse } from 'next/server'

// 模拟数据
const sampleData = {
  users: [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' },
  ],
  posts: [
    { id: 1, title: 'First Post', content: 'Hello World' },
    { id: 2, title: 'Second Post', content: 'Next.js is awesome' },
  ],
  stats: {
    totalRequests: 1250,
    activeUsers: 89,
    serverLoad: 0.45,
    uptime: '7 days, 12 hours'
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params
  const searchParams = request.nextUrl.searchParams
  
  // 模拟延迟
  await new Promise(resolve => setTimeout(resolve, 500))

  try {
    // 根据路径返回不同的数据
    if (slug.length === 1) {
      const resource = slug[0]
      
      switch (resource) {
        case 'users':
          return NextResponse.json({
            success: true,
            data: sampleData.users,
            meta: {
              total: sampleData.users.length,
              path: `/api/dynamic/${resource}`,
              timestamp: new Date().toISOString()
            }
          })
          
        case 'posts':
          return NextResponse.json({
            success: true,
            data: sampleData.posts,
            meta: {
              total: sampleData.posts.length,
              path: `/api/dynamic/${resource}`,
              timestamp: new Date().toISOString()
            }
          })
          
        case 'stats':
          return NextResponse.json({
            success: true,
            data: sampleData.stats,
            meta: {
              path: `/api/dynamic/${resource}`,
              timestamp: new Date().toISOString()
            }
          })
          
        case 'test':
          // 支持查询参数
          const format = searchParams.get('format') || 'json'
          const limit = parseInt(searchParams.get('limit') || '10')
          
          const testData = {
            message: 'This is a test endpoint',
            parameters: {
              format,
              limit,
              timestamp: new Date().toISOString()
            },
            request: {
              method: request.method,
              url: request.url,
              headers: Object.fromEntries(request.headers.entries())
            }
          }
          
          if (format === 'xml') {
            return new NextResponse(
              `<?xml version="1.0" encoding="UTF-8"?>
<response>
  <success>true</success>
  <message>${testData.message}</message>
  <timestamp>${testData.parameters.timestamp}</timestamp>
</response>`, 
              {
                headers: {
                  'Content-Type': 'application/xml',
                  'X-API-Version': '1.0'
                }
              }
            )
          }
          
          return NextResponse.json({
            success: true,
            data: testData,
            meta: {
              path: `/api/dynamic/${resource}`,
              timestamp: new Date().toISOString()
            }
          })
          
        default:
          return NextResponse.json({
            success: false,
            error: 'Resource not found',
            message: `Unknown resource: ${resource}`,
            availableResources: ['users', 'posts', 'stats', 'test']
          }, { status: 404 })
      }
    }
    
    // 嵌套路径处理
    if (slug.length === 2) {
      const [resource, id] = slug
      
      if (resource === 'users') {
        const user = sampleData.users.find(u => u.id === parseInt(id))
        if (!user) {
          return NextResponse.json({
            success: false,
            error: 'User not found',
            message: `User with ID ${id} does not exist`
          }, { status: 404 })
        }
        
        return NextResponse.json({
          success: true,
          data: user,
          meta: {
            path: `/api/dynamic/${resource}/${id}`,
            timestamp: new Date().toISOString()
          }
        })
      }
      
      if (resource === 'posts') {
        const post = sampleData.posts.find(p => p.id === parseInt(id))
        if (!post) {
          return NextResponse.json({
            success: false,
            error: 'Post not found',
            message: `Post with ID ${id} does not exist`
          }, { status: 404 })
        }
        
        return NextResponse.json({
          success: true,
          data: post,
          meta: {
            path: `/api/dynamic/${resource}/${id}`,
            timestamp: new Date().toISOString()
          }
        })
      }
    }
    
    // 更深层次的嵌套
    if (slug.length > 2) {
      return NextResponse.json({
        success: true,
        message: 'Deep nested route',
        data: {
          fullPath: slug.join('/'),
          segments: slug,
          depth: slug.length
        },
        meta: {
          path: `/api/dynamic/${slug.join('/')}`,
          timestamp: new Date().toISOString()
        }
      })
    }
    
    // 根路径
    return NextResponse.json({
      success: true,
      message: 'Welcome to the dynamic API',
      data: {
        availableEndpoints: [
          '/api/dynamic/users',
          '/api/dynamic/posts',
          '/api/dynamic/stats',
          '/api/dynamic/test',
          '/api/dynamic/users/[id]',
          '/api/dynamic/posts/[id]'
        ],
        documentation: 'https://your-docs.com/api'
      },
      meta: {
        path: '/api/dynamic',
        timestamp: new Date().toISOString()
      }
    })
    
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal Server Error',
      message: 'An unexpected error occurred'
    }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params
  
  try {
    const body = await request.json()
    
    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 800))
    
    if (slug.length === 1 && slug[0] === 'users') {
      // 创建用户
      const newUser = {
        id: sampleData.users.length + 1,
        ...body,
        createdAt: new Date().toISOString()
      }
      
      return NextResponse.json({
        success: true,
        message: 'User created successfully',
        data: newUser,
        meta: {
          path: `/api/dynamic/${slug[0]}`,
          method: 'POST',
          timestamp: new Date().toISOString()
        }
      }, { status: 201 })
    }
    
    if (slug.length === 1 && slug[0] === 'posts') {
      // 创建文章
      const newPost = {
        id: sampleData.posts.length + 1,
        ...body,
        createdAt: new Date().toISOString()
      }
      
      return NextResponse.json({
        success: true,
        message: 'Post created successfully',
        data: newPost,
        meta: {
          path: `/api/dynamic/${slug[0]}`,
          method: 'POST',
          timestamp: new Date().toISOString()
        }
      }, { status: 201 })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Method not allowed for this resource',
      message: `POST method is not supported for /${slug.join('/')}`
    }, { status: 405 })
    
  } catch (error) {
    console.error('POST Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Bad Request',
      message: 'Invalid JSON body'
    }, { status: 400 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params
  
  try {
    const body = await request.json()
    
    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 600))
    
    if (slug.length === 2) {
      const [resource, id] = slug
      
      return NextResponse.json({
        success: true,
        message: `${resource} updated successfully`,
        data: {
          id: parseInt(id),
          ...body,
          updatedAt: new Date().toISOString()
        },
        meta: {
          path: `/api/dynamic/${resource}/${id}`,
          method: 'PUT',
          timestamp: new Date().toISOString()
        }
      })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Invalid resource path',
      message: 'PUT method requires resource ID'
    }, { status: 400 })
    
  } catch (error) {
    console.error('PUT Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Bad Request',
      message: 'Invalid JSON body'
    }, { status: 400 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params
  
  try {
    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 400))
    
    if (slug.length === 2) {
      const [resource, id] = slug
      
      return NextResponse.json({
        success: true,
        message: `${resource} deleted successfully`,
        data: {
          id: parseInt(id),
          deletedAt: new Date().toISOString()
        },
        meta: {
          path: `/api/dynamic/${resource}/${id}`,
          method: 'DELETE',
          timestamp: new Date().toISOString()
        }
      })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Invalid resource path',
      message: 'DELETE method requires resource ID'
    }, { status: 400 })
    
  } catch (error) {
    console.error('DELETE Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal Server Error',
      message: 'Failed to delete resource'
    }, { status: 500 })
  }
}
