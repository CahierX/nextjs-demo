interface User {
  id: number;
  name: string;
  email: string;
}

// 模拟在构建时获取的数据
const staticUsers: User[] = [
  { id: 1, name: 'SSG用户1', email: 'ssg1@example.com' },
  { id: 2, name: 'SSG用户2', email: 'ssg2@example.com' },
  { id: 3, name: 'SSG用户3', email: 'ssg3@example.com' },
];

export function SSGComponent() {
  const buildTime = new Date().toLocaleString('zh-CN');
  
  return (
    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <h3 className="text-xl font-bold text-green-800 dark:text-green-200">
          📄 SSG (Static Site Generation)
        </h3>
      </div>
      
      <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-4 text-sm font-mono">
        <div className="text-gray-400">{`// SSG 静态站点生成`}</div>
        <div className="text-yellow-400">export async function</div> <span className="text-blue-400">getStaticProps</span>() {'{'}
        <br />
        &nbsp;&nbsp;<span className="text-purple-400">const</span> data = <span className="text-yellow-400">await</span> fetchData();
        <br />
        &nbsp;&nbsp;<span className="text-yellow-400">return</span> {'{ props: { data } }'};
        <br />
        {'}'}
      </div>
      
      <div className="space-y-3">
        <div className="text-sm text-green-600 dark:text-green-300 mb-2">
          🏗️ 数据在构建时预生成，HTML 文件静态化
        </div>
        {staticUsers.map((user) => (
          <div key={user.id} className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
            <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">{user.email}</div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-xs text-green-600 dark:text-green-300">
        ⚡ 页面加载极快，SEO优秀，适合静态内容如博客文章
      </div>
      
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        构建时间: {buildTime}
      </div>
    </div>
  );
}
