import { NextResponse } from 'next/server';

export interface ISRUser {
  id: number;
  name: string;
  email: string;
  lastUpdated: string;
  version: number;
}

// 模拟数据库或外部 API
let dataVersion = 1;
const baseUsers = [
  { id: 1, name: 'ISR用户1', email: 'isr1@example.com' },
  { id: 2, name: 'ISR用户2', email: 'isr2@example.com' },
  { id: 3, name: 'ISR用户3', email: 'isr3@example.com' },
];

export async function GET() {
  // 模拟外部 API 延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const now = new Date().toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  
  const users: ISRUser[] = baseUsers.map(user => ({
    ...user,
    lastUpdated: now,
    version: dataVersion
  }));
  
  // 每次请求增加版本号，模拟数据变化
  dataVersion++;
  
  return NextResponse.json({
    users,
    timestamp: now,
    version: dataVersion - 1,
    message: `数据版本 ${dataVersion - 1} - ${now} 生成`
  });
}

// 添加 revalidate 标签支持
export async function POST() {
  return NextResponse.json({ 
    message: 'ISR revalidation triggered',
    timestamp: new Date().toISOString()
  });
}
