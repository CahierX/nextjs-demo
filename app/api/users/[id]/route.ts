import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/lib/userService';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET 请求 - 根据 ID 获取用户
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid user ID' 
        },
        { status: 400 }
      );
    }

    const user = await UserService.getUserById(userId);
    
    if (!user) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'User not found' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user
    });

  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch user' 
      },
      { status: 500 }
    );
  }
}

// PUT 请求 - 更新用户
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid user ID' 
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, email, age } = body;

    // 检查用户是否存在
    const existingUser = await UserService.getUserById(userId);
    if (!existingUser) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'User not found' 
        },
        { status: 404 }
      );
    }

    // 如果要更新邮箱，检查邮箱是否已被其他用户使用
    if (email && email !== existingUser.email) {
      const userWithEmail = await UserService.getUserByEmail(email);
      if (userWithEmail && userWithEmail.id !== userId) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Email already exists' 
          },
          { status: 409 }
        );
      }
    }

    const updatedUser = await UserService.updateUser(userId, { name, email, age });
    
    return NextResponse.json({
      success: true,
      data: updatedUser
    });

  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update user' 
      },
      { status: 500 }
    );
  }
}

// DELETE 请求 - 删除用户
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid user ID' 
        },
        { status: 400 }
      );
    }

    const deleted = await UserService.deleteUser(userId);
    
    if (!deleted) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'User not found' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete user' 
      },
      { status: 500 }
    );
  }
}
