# Next.js 数据库 CRUD 演示项目

这是一个完整的 Next.js 项目，演示了如何连接数据库并实现 CRUD（创建、读取、更新、删除）操作。

## 项目特性

- 🗄️ **数据库连接**: 使用 SQLite 数据库
- 🔗 **RESTful API**: 完整的用户管理 API 接口
- 🎨 **现代化 UI**: 使用 Tailwind CSS 构建美观的用户界面
- 📊 **数据统计**: 用户统计和数据可视化
- 🚀 **TypeScript**: 全项目使用 TypeScript 确保类型安全

## 项目结构

```
app/
├── api/                      # API 路由
│   ├── users/               # 用户相关 API
│   │   ├── route.ts         # 获取所有用户、创建用户
│   │   └── [id]/route.ts    # 获取、更新、删除单个用户
│   └── stats/
│       └── route.ts         # 统计数据 API
├── dashboard/               # 数据仪表板页面
├── user-management/         # 用户管理页面
└── ...

lib/
├── database.ts              # 数据库连接和配置
└── userService.ts           # 用户服务层
```

## 数据库表结构

### users 表
| 字段 | 类型 | 描述 |
|------|------|------|
| id | INTEGER | 主键，自增 |
| name | TEXT | 用户姓名，必填 |
| email | TEXT | 用户邮箱，必填，唯一 |
| age | INTEGER | 用户年龄，可选 |
| created_at | DATETIME | 创建时间，自动设置 |
| updated_at | DATETIME | 更新时间，自动设置 |

## API 接口

### 用户管理接口

#### 获取所有用户
```
GET /api/users
```

响应：
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "张三",
      "email": "zhangsan@example.com",
      "age": 25,
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### 创建用户
```
POST /api/users
Content-Type: application/json

{
  "name": "李四",
  "email": "lisi@example.com",
  "age": 30
}
```

#### 获取单个用户
```
GET /api/users/1
```

#### 更新用户
```
PUT /api/users/1
Content-Type: application/json

{
  "name": "李四（已更新）",
  "email": "lisi_updated@example.com",
  "age": 31
}
```

#### 删除用户
```
DELETE /api/users/1
```

### 统计接口

#### 获取用户统计
```
GET /api/stats
```

响应：
```json
{
  "success": true,
  "data": {
    "totalUsers": 10,
    "ageStats": {
      "average": 28,
      "max": 45,
      "min": 18,
      "totalWithAge": 8
    },
    "monthlyRegistrations": {
      "2024-01": 5,
      "2024-02": 3
    },
    "recentUsers": [...]
  }
}
```

## 页面功能

### 1. 数据仪表板 (`/dashboard`)
- 用户总数统计
- 年龄统计（平均年龄、年龄范围）
- 月度注册趋势
- 最近注册用户列表
- 快速操作按钮

### 2. 用户管理 (`/user-management`)
- 查看所有用户列表
- 添加新用户表单
- 编辑用户信息
- 删除用户
- 数据验证和错误处理

## 技术栈

- **框架**: Next.js 15
- **数据库**: SQLite3
- **样式**: Tailwind CSS
- **类型**: TypeScript
- **构建工具**: Turbopack

## 安装和运行

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 打开浏览器访问：
```
http://localhost:3000
```

## 主要特点

### 数据库设计
- 使用 SQLite 作为轻量级数据库
- 支持自动初始化表结构
- 包含数据验证和约束

### API 设计
- RESTful API 设计规范
- 统一的响应格式
- 完整的错误处理
- 数据验证和约束检查

### 前端功能
- 响应式设计，支持移动端
- 实时数据更新
- 用户友好的表单验证
- 美观的数据展示

### 代码质量
- TypeScript 类型安全
- 清晰的代码结构
- 错误边界处理
- 统一的代码风格

## 扩展建议

1. **认证系统**: 添加用户登录和权限管理
2. **数据导出**: 支持 CSV/Excel 数据导出
3. **搜索过滤**: 添加用户搜索和过滤功能
4. **分页**: 为大量数据添加分页功能
5. **数据备份**: 添加数据备份和恢复功能
6. **实时更新**: 使用 WebSocket 实现实时数据更新

这个项目展示了一个完整的 Next.js 全栈应用的基本架构，适合作为学习和开发参考。
