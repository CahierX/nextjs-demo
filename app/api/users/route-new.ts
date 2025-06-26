import { NextRequest, NextResponse } from 'next/server';
import { DatabaseHelper } from '@/lib/database';

// GET /api/users - 获取用户列表（支持分页）
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    
    // 验证参数
    if (page < 1 || pageSize < 1 || pageSize > 100) {
      return NextResponse.json(
        { error: '无效的分页参数' },
        { status: 400 }
      );
    }

    console.log('获取用户列表，参数:', { page, pageSize });
    
    const result = await DatabaseHelper.getUsersWithPagination(page, pageSize);
    
    console.log('用户查询结果:', result);
    
    // 记录分析事件（可选的，如果失败不应该影响主要功能）
    try {
      await DatabaseHelper.createAnalyticsEvent({
        event_type: 'users_list_viewed',
        event_data: JSON.stringify({ page, pageSize }),
      });
    } catch (analyticsError) {
      console.warn('记录分析事件失败:', analyticsError);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('获取用户列表失败:', error);
    return NextResponse.json(
      { 
        error: '获取用户列表失败',
        details: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    );
  }
}

// POST /api/users - 创建新用户
export async function POST(request: NextRequest) {
  try {
    const userData = await request.json();
    
    // 数据验证
    if (!userData.name || !userData.email) {
      return NextResponse.json(
        { error: '用户名和邮箱为必填项' },
        { status: 400 }
      );
    }

    // 邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      return NextResponse.json(
        { error: '邮箱格式无效' },
        { status: 400 }
      );
    }

    const userId = await DatabaseHelper.createUser({
      name: userData.name,
      email: userData.email,
      age: userData.age,
    });

    // 记录分析事件
    await DatabaseHelper.createAnalyticsEvent({
      event_type: 'user_created',
      event_data: JSON.stringify({ 
        user_id: userId,
        user_name: userData.name 
      }),
    });

    return NextResponse.json(
      { id: userId, message: '用户创建成功' },
      { status: 201 }
    );
  } catch (error) {
    console.error('创建用户失败:', error);
    
    // 检查是否是唯一约束错误（邮箱重复）
    if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
      return NextResponse.json(
        { error: '该邮箱已被使用' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: '创建用户失败' },
      { status: 500 }
    );
  }
}
