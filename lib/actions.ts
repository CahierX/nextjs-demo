'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { DatabaseService } from './database'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

// Todo 相关 Server Actions
export async function addTodo(formData: FormData) {
  const text = formData.get('text') as string
  
  if (!text || text.trim().length === 0) {
    throw new Error('Todo text is required')
  }
  
  try {
    const todoId = await DatabaseService.createTodo({
      text: text.trim(),
      completed: false,
      user_id: 1 // 默认用户ID，实际应用中应该从session获取
    });
    
    const newTodo = await DatabaseService.getTodos();
    const createdTodo = newTodo.find(t => t.id === todoId);
    
    // 重新验证缓存
    revalidatePath('/server-actions-demo')
    
    return { success: true, todo: createdTodo }
  } catch (error) {
    console.error('添加Todo失败:', error)
    throw new Error('添加Todo失败')
  }
}

export async function toggleTodo(id: number) {
  try {
    // 获取当前状态
    const todos = await DatabaseService.getTodos();
    const todo = todos.find(t => t.id === id);
    
    if (!todo) {
      throw new Error('Todo not found');
    }
    
    // 切换状态
    await DatabaseService.updateTodo(id, { completed: !todo.completed });
    
    revalidatePath('/server-actions-demo')
    return { success: true }
  } catch (error) {
    console.error('切换Todo状态失败:', error)
    throw new Error('切换Todo状态失败')
  }
}

export async function deleteTodo(id: number) {
  try {
    await DatabaseService.deleteTodo(id);
    revalidatePath('/server-actions-demo')
    return { success: true }
  } catch (error) {
    console.error('删除Todo失败:', error)
    throw new Error('删除Todo失败')
  }
}

export async function getTodos() {
  try {
    return await DatabaseService.getTodos();
  } catch (error) {
    console.error('获取Todos失败:', error)
    return []
  }
}

// 文章相关 Server Actions
const postSchema = z.object({
  title: z.string().min(1, '标题不能为空').max(100, '标题不能超过100字符'),
  content: z.string().min(1, '内容不能为空').max(1000, '内容不能超过1000字符'),
  published: z.boolean().optional().default(false)
})

export async function createPost(prevState: { message?: string; errors?: Record<string, string[]>; success?: boolean } | null, formData: FormData) {
  try {
    const validatedFields = postSchema.safeParse({
      title: formData.get('title'),
      content: formData.get('content'),
      published: formData.get('published') === 'on'
    })

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: '验证失败，请检查输入'
      }
    }

    const { title, content, published } = validatedFields.data

    await DatabaseService.createPost({
      title,
      content,
      published,
      author_id: 1 // 默认作者ID，实际应用中应该从session获取
    });

    revalidateTag('posts')
    revalidatePath('/server-actions-demo')
    
    return {
      message: published ? '文章发布成功！' : '文章保存为草稿！',
      success: true
    }
  } catch (error) {
    console.error('创建文章失败:', error)
    return {
      message: '操作失败，请重试',
      success: false
    }
  }
}

export async function updatePost(id: number, formData: FormData) {
  try {
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const published = formData.get('published') === 'on'

    await DatabaseService.updatePost(id, { title, content, published });

    revalidateTag('posts')
    revalidatePath('/server-actions-demo')
    
    return { success: true }
  } catch (error) {
    console.error('更新文章失败:', error)
    throw new Error('更新文章失败')
  }
}

export async function deletePost(id: number) {
  try {
    await DatabaseService.deletePost(id);
    revalidateTag('posts')
    revalidatePath('/server-actions-demo')
    redirect('/server-actions-demo')
  } catch (error) {
    console.error('删除文章失败:', error)
    throw new Error('删除文章失败')
  }
}

export async function getPosts() {
  try {
    return await DatabaseService.getPosts();
  } catch (error) {
    console.error('获取文章失败:', error)
    return []
  }
}

// 文件上传 Server Action
export async function uploadFile(formData: FormData) {
  const file = formData.get('file') as File
  
  if (!file) {
    throw new Error('No file provided')
  }
  
  try {
    // 创建上传目录
    const uploadDir = path.join(process.cwd(), 'uploads')
    await mkdir(uploadDir, { recursive: true })
    
    // 生成唯一文件名
    const timestamp = Date.now()
    const filename = `${timestamp}-${file.name}`
    const filepath = path.join(uploadDir, filename)
    
    // 保存文件
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filepath, buffer)
    
    // 保存文件记录到数据库
    const fileId = await DatabaseService.createFileRecord({
      name: file.name,
      size: file.size,
      type: file.type,
      path: filepath,
      uploaded_by: 1 // 默认用户ID
    });
    
    return { 
      success: true, 
      file: {
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadTime: new Date().toISOString()
      }
    }
  } catch (error) {
    console.error('文件上传失败:', error)
    throw new Error('文件上传失败')
  }
}

// 批量操作 Server Action
export async function batchUpdateTodos(formData: FormData) {
  const action = formData.get('action') as string
  const selectedIds = formData.getAll('selected') as string[]
  
  if (selectedIds.length === 0) {
    throw new Error('No todos selected')
  }
  
  try {
    const ids = selectedIds.map(id => parseInt(id))
    
    await DatabaseService.batchUpdateTodos(ids, action as 'complete' | 'incomplete' | 'delete');
    
    revalidatePath('/server-actions-demo')
    return { success: true, affected: ids.length }
  } catch (error) {
    console.error('批量操作失败:', error)
    throw new Error('批量操作失败')
  }
}
