import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/lib/userService';

// GET 请求 - 获取所有用户
export async function GET() {
  try {
    const users = await UserService.getAllUsers();
    return NextResponse.json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch users' 
      },
      { status: 500 }
    );
  }
}

// POST 请求 - 创建新用户
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, age } = body;

    // 基本验证
    if (!name || !email) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Name and email are required' 
        },
        { status: 400 }
      );
    }

    // 检查邮箱是否已存在
    const existingUser = await UserService.getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Email already exists' 
        },
        { status: 409 }
      );
    }

    const newUser = await UserService.createUser({ name, email, age });
    return NextResponse.json({
      success: true,
      data: newUser
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create user' 
      },
      { status: 500 }
    );
  }
}
