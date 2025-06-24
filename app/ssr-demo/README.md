# SSR 渲染页面示例详解

## 什么是 SSR？

SSR（Server-Side Rendering）是服务端渲染技术，页面的 HTML 在服务器端完全生成后发送给浏览器。

## 本示例的 SSR 特性

### 1. 服务器组件 (Server Components)
```tsx
// 这是一个服务器组件，在服务器端执行
async function UserList() {
  const users = await fetchUserData(); // 在服务器端获取数据
  return <div>...</div>; // 在服务器端渲染
}
```

### 2. 数据获取
- `fetchUserData()`: 模拟从 API 获取用户数据
- `getServerTime()`: 获取服务器当前时间
- 这些函数在服务器端执行，不会发送到客户端

### 3. 预渲染内容
- 用户访问页面时，所有数据已经在 HTML 中
- 查看页面源代码可以看到完整的内容
- 搜索引擎可以直接抓取到完整内容

## SSR 的优势

### 1. SEO 友好
- 搜索引擎爬虫可以直接获取完整的 HTML 内容
- 不需要等待 JavaScript 执行

### 2. 更快的首屏加载
- 用户立即看到内容，无需等待 JavaScript 下载和执行
- 特别适合内容为主的网站

### 3. 更好的性能表现
- 减少了客户端的计算负担
- 对于低性能设备更友好

### 4. 实时数据
- 每次请求都会获取最新的服务器数据
- 适合显示动态内容

## Next.js App Router 中的 SSR

### 服务器组件 (默认)
```tsx
// 默认情况下，App Router 中的组件都是服务器组件
export default function Page() {
  return <div>在服务器端渲染</div>;
}
```

### 客户端组件
```tsx
'use client'; // 明确声明为客户端组件

export default function ClientComponent() {
  return <div>在客户端渲染</div>;
}
```

### 混合使用
```tsx
import ClientComponent from './ClientComponent';

// 服务器组件
export default function Page() {
  return (
    <div>
      <h1>服务器端渲染的标题</h1>
      <ClientComponent /> {/* 客户端组件 */}
    </div>
  );
}
```

## 何时使用 SSR？

### 适合 SSR 的场景：
- 内容网站（博客、新闻网站）
- 电商产品页面
- 需要 SEO 的页面
- 首屏加载性能要求高的页面

### 不适合 SSR 的场景：
- 高度交互的应用（如仪表板）
- 个人化内容很多的页面
- 实时更新的应用

## 性能注意事项

### 1. 服务器负载
- SSR 会增加服务器的计算负担
- 需要考虑服务器的处理能力

### 2. 缓存策略
- 可以使用 Next.js 的缓存机制
- 静态生成 (SSG) 可能更适合某些场景

### 3. 数据获取优化
- 避免在服务器端进行耗时的数据获取
- 使用并行数据获取
- 考虑使用 Suspense 来处理加载状态

## 调试和测试

### 1. 查看服务器端渲染结果
- 在浏览器中查看页面源代码
- 确认内容已经在 HTML 中

### 2. 性能监控
- 使用 Next.js 内置的性能监控
- 监控服务器响应时间

### 3. SEO 测试
- 使用 Google Search Console
- 验证搜索引擎可以正确抓取内容
