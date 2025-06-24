import { Suspense } from 'react';

// 定义用户数据类型
interface User {
  id: number;
  name: string;
  email: string;
  company: string;
  joinDate: string;
}

// 模拟 API 数据获取函数
async function fetchUserData(): Promise<User[]> {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 模拟从 API 获取的数据
  return [
    {
      id: 1,
      name: '张三',
      email: 'zhangsan@example.com',
      company: '科技有限公司',
      joinDate: '2023-01-15'
    },
    {
      id: 2,
      name: '李四',
      email: 'lisi@example.com',
      company: '创新科技',
      joinDate: '2023-03-20'
    },
    {
      id: 3,
      name: '王五',
      email: 'wangwu@example.com',
      company: '数字科技',
      joinDate: '2023-05-10'
    }
  ];
}

// 获取当前服务器时间
async function getServerTime(): Promise<string> {
  return new Date().toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

// 用户卡片组件
function UserCard({ user }: { user: User }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
          {user.name.charAt(0)}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {user.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {user.email}
          </p>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400 text-sm">公司:</span>
          <span className="text-gray-900 dark:text-white text-sm font-medium">
            {user.company}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400 text-sm">入职日期:</span>
          <span className="text-gray-900 dark:text-white text-sm font-medium">
            {user.joinDate}
          </span>
        </div>
      </div>
    </div>
  );
}

// 加载中组件
function LoadingCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>
    </div>
  );
}

// 用户列表组件（服务器组件）
async function UserList() {
  const users = await fetchUserData();
  
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

// 服务器时间组件（服务器组件）
async function ServerTime() {
  const serverTime = await getServerTime();
  
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-blue-800 dark:text-blue-200 font-medium">
          服务器渲染时间: {serverTime}
        </span>
      </div>
      <p className="text-blue-600 dark:text-blue-300 text-sm mt-1">
        此时间在服务器端生成，页面每次访问都会更新
      </p>
    </div>
  );
}

// 主页面组件（默认导出，服务器组件）
export default function SSRDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            SSR 渲染页面示例
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            这是一个服务端渲染 (SSR) 的示例页面，展示如何在 Next.js App Router 中使用服务器组件来获取数据并渲染页面。
          </p>
        </div>

        {/* 服务器时间显示 */}
        <div className="mb-8">
          <Suspense fallback={
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
            </div>
          }>
            <ServerTime />
          </Suspense>
        </div>

        {/* 功能特性说明 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            SSR 特性展示
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">服务端数据获取</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    数据在服务器端预先获取，用户看到完整渲染的页面
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">SEO 友好</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    搜索引擎可以直接抓取完整的页面内容
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">更快的首屏加载</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    减少客户端 JavaScript 执行时间
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">实时数据</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    每次请求都获取最新的服务器数据
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 用户列表 */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            用户列表 (服务端渲染)
          </h2>
          <Suspense fallback={
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map(i => <LoadingCard key={i} />)}
            </div>
          }>
            <UserList />
          </Suspense>
        </div>

        {/* 页面底部信息 */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-700 dark:text-gray-300 text-sm">
              页面在服务器端完全渲染
            </span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">
            查看页面源代码，你会发现所有内容都已经在 HTML 中渲染完成
          </p>
        </div>
      </div>
    </div>
  );
}

// 添加页面元数据
export const metadata = {
  title: 'SSR 渲染页面示例 - Next.js',
  description: '展示 Next.js App Router 中服务端渲染 (SSR) 功能的示例页面',
  keywords: 'Next.js, SSR, 服务端渲染, React, 示例',
};
