import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '@/lib/database'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params
    const id = parseInt(idStr)
    
    if (isNaN(id)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid ID',
        message: 'Post ID must be a number'
      }, { status: 400 })
    }

    const post = await DatabaseService.getPostById(id)
    
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
        timestamp: new Date().toISOString()
      }
    })
    
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal Server Error',
      message: 'Failed to fetch post'
    }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params
    const id = parseInt(idStr)
    
    if (isNaN(id)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid ID',
        message: 'Post ID must be a number'
      }, { status: 400 })
    }

    const body = await request.json()
    const { title, content, published } = body

    if (!title || !content) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields',
        message: 'Title and content are required'
      }, { status: 400 })
    }

    const updatedPost = await DatabaseService.updatePost(id, {
      title,
      content,
      published: Boolean(published)
    })

    return NextResponse.json({
      success: true,
      message: 'Post updated successfully',
      data: updatedPost,
      meta: {
        timestamp: new Date().toISOString()
      }
    })
    
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal Server Error',
      message: 'Failed to update post'
    }, { status: 500 })
  }
}
