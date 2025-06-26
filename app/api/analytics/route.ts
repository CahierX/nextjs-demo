import { NextRequest, NextResponse } from 'next/server';
import { DatabaseHelper } from '@/lib/database';

// GET /api/analytics - 获取分析数据
export async function GET() {
  try {
    const analytics = await DatabaseHelper.getAnalyticsSummary();
    return NextResponse.json(analytics);
  } catch (error) {
    console.error('获取分析数据失败:', error);
    return NextResponse.json(
      { error: '获取分析数据失败' },
      { status: 500 }
    );
  }
}

// POST /api/analytics - 创建分析事件
export async function POST(request: NextRequest) {
  try {
    const eventData = await request.json();
    
    // 获取客户端信息
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    const eventId = await DatabaseHelper.createAnalyticsEvent({
      event_type: eventData.event_type,
      event_data: eventData.event_data,
      user_id: eventData.user_id,
      ip_address: ip,
      user_agent: userAgent,
    });

    return NextResponse.json(
      { id: eventId, message: '事件记录成功' },
      { status: 201 }
    );
  } catch (error) {
    console.error('创建分析事件失败:', error);
    return NextResponse.json(
      { error: '创建分析事件失败' },
      { status: 500 }
    );
  }
}
