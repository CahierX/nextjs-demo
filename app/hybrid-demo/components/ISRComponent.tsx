import { RevalidateButton } from './RevalidateButton';

interface User {
  id: number;
  name: string;
  email: string;
  lastUpdated: string;
  version: number;
}

interface ISRData {
  users: User[];
  timestamp: string;
  version: number;
  message: string;
}

// ISR 配置：10秒后重新验证
export const revalidate = 10;

async function getISRData(): Promise<ISRData> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/isr-data`, {
      next: { 
        revalidate: revalidate,
        tags: ['isr-data'] 
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch ISR data');
    }
    
    return response.json();
  } catch (error) {
    console.error('ISR data fetch error:', error);
    // 返回fallback数据
    const now = new Date().toLocaleString('zh-CN');
    return {
      users: [
        { id: 1, name: 'ISR用户1', email: 'isr1@example.com', lastUpdated: now, version: 0 },
      ],
      timestamp: now,
      version: 0,
      message: 'Fallback data - API unavailable'
    };
  }
}

export async function ISRComponent() {
  const data = await getISRData();

  return (
    <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
        <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200">
          🔄 ISR (Incremental Static Regeneration)
        </h3>
      </div>
      
      <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-4 text-sm font-mono">
        <div className="text-gray-400">{`// App Router ISR 配置`}</div>
        <div className="text-yellow-400">export const</div> <span className="text-blue-400">revalidate</span> = <span className="text-orange-400">{revalidate}</span>; <span className="text-gray-400">{`// ${revalidate}秒自动重新验证`}</span>
        <br /><br />
        <div className="text-yellow-400">async function</div> <span className="text-blue-400">getData</span>() {'{'}
        <br />
        &nbsp;&nbsp;<span className="text-yellow-400">return</span> <span className="text-blue-400">fetch</span>(<span className="text-green-400">&apos;/api/data&apos;</span>, {'{'}
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">next</span>: {'{ '}<span className="text-purple-400">revalidate</span>: <span className="text-orange-400">{revalidate}</span> {'}'}
        <br />
        &nbsp;&nbsp;{'}'});
        <br />
        {'}'}
      </div>
      
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium text-green-800 dark:text-green-200">
            真实 ISR 状态
          </span>
        </div>
        <div className="text-xs text-green-700 dark:text-green-300 space-y-1">
          <div>• 服务端组件，数据在构建时/运行时获取</div>
          <div>• 每60秒自动重新验证页面</div>
          <div>• 数据版本: {data.version}</div>
          <div>• 生成时间: {data.timestamp}</div>
        </div>
      </div>
      
      <div className="space-y-3">
        {data.users.map((user) => (
          <div key={user.id} className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
            <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">{user.email}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              更新时间: {user.lastUpdated}
            </div>
            <div className="text-xs text-purple-600 dark:text-purple-300 mt-1">
              版本: {user.version}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-xs text-purple-600 dark:text-purple-300">
        ⚡ 真实 ISR：静态生成 + {revalidate}秒自动重新验证
      </div>
      
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        {data.message}
      </div>
      
      <RevalidateButton />
    </div>
  );
}
