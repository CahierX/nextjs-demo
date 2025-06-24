# SSR vs CSR 代码对比详解

## 🎯 核心区别

### 客户端渲染 (CSR)
```tsx
'use client'; // 必须声明为客户端组件

import { useState, useEffect } from 'react';

export default function CSRExample() {
  // 1. 使用 useState 管理状态
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. 使用 useEffect 在客户端获取数据
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch('/api/users');
        const result = await response.json();
        setData(result); // 更新状态，触发重新渲染
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // 3. 根据状态渲染不同内容
  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;
  
  return (
    <div>
      <h1>用户列表 (客户端渲染)</h1>
      {data?.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### 服务器渲染 (SSR)
```tsx
// 默认就是服务器组件，无需声明

// 1. 直接定义异步函数获取数据
async function fetchUsers() {
  const response = await fetch('https://api.example.com/users');
  return response.json();
}

// 2. 组件本身就是异步的
export default async function SSRExample() {
  // 3. 直接 await 获取数据，无需状态管理
  const users = await fetchUsers();
  
  // 4. 数据已经准备好，直接渲染
  return (
    <div>
      <h1>用户列表 (服务器渲染)</h1>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

## 🔄 执行时机对比

### CSR 执行流程
```
1. 服务器返回基本 HTML：
   <div id="root"></div>
   
2. 浏览器下载 JavaScript

3. React 开始渲染：
   - 初始状态：loading = true, data = null
   - 显示："加载中..."
   
4. useEffect 执行：
   - 发起 API 请求
   - 等待响应
   
5. 数据返回，更新状态：
   - setData(result)
   - setLoading(false)
   
6. 组件重新渲染：
   - 显示实际数据
```

### SSR 执行流程
```
1. 服务器接收请求

2. 服务器执行组件：
   - await fetchUsers() 
   - 获取数据
   - 渲染完整 HTML
   
3. 服务器返回完整 HTML：
   <div>
     <h1>用户列表</h1>
     <div>用户1</div>
     <div>用户2</div>
   </div>
   
4. 浏览器直接显示内容

5. JavaScript 加载后进行 hydration
```

## 📊 渲染时间对比

### CSR 时间线
```
0ms    - 页面加载开始
100ms  - HTML 接收完成（基本为空）
500ms  - JavaScript 下载完成
600ms  - React 开始渲染（显示 loading）
800ms  - API 请求发起
1200ms - 数据返回
1250ms - 最终内容显示 ⭐
```

### SSR 时间线
```
0ms    - 页面加载开始
800ms  - 服务器获取数据并渲染
900ms  - 完整 HTML 返回
950ms  - 内容立即显示 ⭐
1200ms - JavaScript 下载完成
1250ms - Hydration 完成（可交互）
```

## 🧪 实际代码示例

### 同一个功能的两种实现

#### CSR 版本
```tsx
'use client';

export default function UserListCSR() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 在浏览器中执行
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);     // 触发重新渲染
        setLoading(false);  // 触发重新渲染
      });
  }, []);

  // 组件会渲染多次：
  // 第1次：loading=true, users=[]
  // 第2次：loading=false, users=[...]
  return (
    <div>
      {loading ? (
        <p>正在加载用户...</p>
      ) : (
        users.map(user => <div key={user.id}>{user.name}</div>)
      )}
    </div>
  );
}
```

#### SSR 版本
```tsx
async function fetchUsers() {
  // 在服务器中执行
  const res = await fetch('https://api.example.com/users');
  return res.json();
}

export default async function UserListSSR() {
  // 在服务器端等待数据
  const users = await fetchUsers();
  
  // 组件只渲染一次，数据已经准备好
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

## 🔍 关键理解点

### 1. 状态管理
- **CSR**: 需要 `useState` 管理加载状态、数据状态、错误状态
- **SSR**: 无需状态管理，数据直接可用

### 2. 数据获取时机
- **CSR**: 在 `useEffect` 中，组件挂载后执行
- **SSR**: 在组件函数中，组件渲染前执行

### 3. 渲染次数
- **CSR**: 多次渲染（loading → data loaded）
- **SSR**: 一次渲染（数据已准备好）

### 4. 代码位置
- **CSR**: 代码运行在浏览器中
- **SSR**: 代码运行在服务器中

### 5. HTML 内容
- **CSR**: 初始 HTML 基本为空
- **SSR**: 初始 HTML 包含完整内容
