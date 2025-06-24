import { NextResponse } from 'next/server';
import { UserService } from '@/lib/userService';

// GET 请求 - 获取用户统计信息
export async function GET() {
  try {
    const totalUsers = await UserService.getUserCount();
    const allUsers = await UserService.getAllUsers();
    
    // 计算年龄统计
    const ageStats = allUsers.reduce((acc, user) => {
      if (user.age) {
        acc.totalAge += user.age;
        acc.count += 1;
        acc.ages.push(user.age);
      }
      return acc;
    }, { totalAge: 0, count: 0, ages: [] as number[] });

    const averageAge = ageStats.count > 0 ? Math.round(ageStats.totalAge / ageStats.count) : 0;
    const maxAge = ageStats.ages.length > 0 ? Math.max(...ageStats.ages) : 0;
    const minAge = ageStats.ages.length > 0 ? Math.min(...ageStats.ages) : 0;

    // 按月份统计注册用户
    const monthlyStats = allUsers.reduce((acc, user) => {
      if (user.created_at) {
        const month = new Date(user.created_at).toISOString().substring(0, 7);
        acc[month] = (acc[month] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json({
      success: true,
      data: {
        totalUsers,
        ageStats: {
          average: averageAge,
          max: maxAge,
          min: minAge,
          totalWithAge: ageStats.count
        },
        monthlyRegistrations: monthlyStats,
        recentUsers: allUsers.slice(0, 5) // 最近5个用户
      }
    });

  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch statistics' 
      },
      { status: 500 }
    );
  }
}
