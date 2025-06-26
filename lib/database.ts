import sqlite3 from 'sqlite3';
import path from 'path';

// 数据库文件路径
const dbPath = path.join(process.cwd(), 'database.sqlite');

// 创建数据库连接
export const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// 初始化数据库表
function initializeDatabase() {
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      age INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  const createPostsTable = `
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      published BOOLEAN DEFAULT FALSE,
      author_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (author_id) REFERENCES users (id)
    )
  `;

  const createTodosTable = `
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      completed BOOLEAN DEFAULT FALSE,
      user_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `;

  const createFilesTable = `
    CREATE TABLE IF NOT EXISTS files (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      size INTEGER NOT NULL,
      type TEXT NOT NULL,
      path TEXT NOT NULL,
      uploaded_by INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (uploaded_by) REFERENCES users (id)
    )
  `;

  const createAnalyticsTable = `
    CREATE TABLE IF NOT EXISTS analytics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_type TEXT NOT NULL,
      event_data TEXT,
      user_id INTEGER,
      ip_address TEXT,
      user_agent TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `;

  // 新增的生产环境表
  const createProductsTable = `
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price DECIMAL(10,2) NOT NULL,
      stock INTEGER DEFAULT 0,
      category TEXT,
      image_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  const createOrdersTable = `
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      total_amount DECIMAL(10,2) NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `;

  const createOrderItemsTable = `
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders (id),
      FOREIGN KEY (product_id) REFERENCES products (id)
    )
  `;

  const createCommentsTable = `
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      content TEXT NOT NULL,
      parent_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (post_id) REFERENCES posts (id),
      FOREIGN KEY (user_id) REFERENCES users (id),
      FOREIGN KEY (parent_id) REFERENCES comments (id)
    )
  `;



  const tables = [
    { name: 'users', sql: createUsersTable },
    { name: 'posts', sql: createPostsTable },
    { name: 'todos', sql: createTodosTable },
    { name: 'files', sql: createFilesTable },
    { name: 'analytics', sql: createAnalyticsTable },
    { name: 'products', sql: createProductsTable },
    { name: 'orders', sql: createOrdersTable },
    { name: 'order_items', sql: createOrderItemsTable },
    { name: 'comments', sql: createCommentsTable },
  ];

  tables.forEach(({ name, sql }) => {
    db.run(sql, (err) => {
      if (err) {
        console.error(`Error creating ${name} table:`, err.message);
      } else {
        console.log(`${name} table created successfully`);
      }
    });
  });

  // 插入一些示例数据
  insertSampleData();
}

// 插入示例数据
function insertSampleData() {
  // 检查是否已有数据
  db.get('SELECT COUNT(*) as count FROM users', (err, row: { count: number }) => {
    if (err) {
      console.error('Error checking users:', err);
      return;
    }
    
    if (row.count === 0) {
      // 插入示例用户
      const sampleUsers = [
        { name: '张三', email: 'zhangsan@example.com', age: 25 },
        { name: '李四', email: 'lisi@example.com', age: 30 },
        { name: '王五', email: 'wangwu@example.com', age: 28 },
      ];

      sampleUsers.forEach(user => {
        db.run('INSERT INTO users (name, email, age) VALUES (?, ?, ?)', 
          [user.name, user.email, user.age]);
      });

      // 插入示例文章
      setTimeout(() => {
        const samplePosts = [
          { title: 'Next.js 入门指南', content: '这是一篇关于 Next.js 的入门文章...', published: true, author_id: 1 },
          { title: 'React Server Components', content: '深入了解 React Server Components...', published: true, author_id: 2 },
          { title: 'TypeScript 最佳实践', content: '分享 TypeScript 开发经验...', published: false, author_id: 1 },
        ];

        samplePosts.forEach(post => {
          db.run('INSERT INTO posts (title, content, published, author_id) VALUES (?, ?, ?, ?)', 
            [post.title, post.content, post.published, post.author_id]);
        });
      }, 100);

      // 插入示例待办事项
      setTimeout(() => {
        const sampleTodos = [
          { text: '学习 Next.js Server Actions', completed: false, user_id: 1 },
          { text: '完善项目文档', completed: true, user_id: 1 },
          { text: '优化数据库查询', completed: false, user_id: 2 },
          { text: '编写单元测试', completed: false, user_id: 3 },
        ];

        sampleTodos.forEach(todo => {
          db.run('INSERT INTO todos (text, completed, user_id) VALUES (?, ?, ?)', 
            [todo.text, todo.completed, todo.user_id]);
        });
      }, 200);

      // 插入示例产品数据
      setTimeout(() => {
        const sampleProducts = [
          { name: 'MacBook Pro', description: '苹果笔记本电脑', price: 15999.00, stock: 10, category: '电脑', image_url: '/images/macbook.jpg' },
          { name: 'iPhone 15', description: '最新款苹果手机', price: 7999.00, stock: 20, category: '手机', image_url: '/images/iphone.jpg' },
          { name: 'AirPods Pro', description: '无线降噪耳机', price: 1999.00, stock: 30, category: '配件', image_url: '/images/airpods.jpg' },
          { name: 'iPad Air', description: '轻薄平板电脑', price: 4999.00, stock: 15, category: '平板', image_url: '/images/ipad.jpg' },
        ];

        sampleProducts.forEach(product => {
          db.run('INSERT INTO products (name, description, price, stock, category, image_url) VALUES (?, ?, ?, ?, ?, ?)', 
            [product.name, product.description, product.price, product.stock, product.category, product.image_url]);
        });
      }, 300);

      // 插入示例评论数据
      setTimeout(() => {
        const sampleComments = [
          { post_id: 1, user_id: 2, content: '很好的文章，学到了很多！' },
          { post_id: 1, user_id: 3, content: '感谢分享，对新手很有帮助。' },
          { post_id: 2, user_id: 1, content: 'Server Components 确实是个好特性。' },
          { post_id: 1, user_id: 1, content: '谢谢大家的支持！', parent_id: 1 },
        ];

        sampleComments.forEach(comment => {
          db.run('INSERT INTO comments (post_id, user_id, content, parent_id) VALUES (?, ?, ?, ?)', 
            [comment.post_id, comment.user_id, comment.content, comment.parent_id]);
        });
      }, 400);
    }
  });
}

// 数据库操作辅助函数
export const dbPromise = {
  // 查询所有记录
  all: (sql: string, params: (string | number | boolean | null)[] = []): Promise<unknown[]> => {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  // 查询单条记录
  get: (sql: string, params: (string | number | boolean | null)[] = []): Promise<unknown> => {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  // 执行插入、更新、删除操作
  run: (sql: string, params: (string | number | boolean | null)[] = []): Promise<sqlite3.RunResult> => {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve(this);
      });
    });
  }
};

// 数据模型
export interface User {
  id?: number;
  name: string;
  email: string;
  age?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Post {
  id?: number;
  title: string;
  content: string;
  published: boolean;
  author_id?: number;
  author_name?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Todo {
  id?: number;
  text: string;
  completed: boolean;
  user_id?: number;
  user_name?: string;
  created_at?: string;
  updated_at?: string;
}

export interface FileRecord {
  id?: number;
  name: string;
  size: number;
  type: string;
  path: string;
  uploaded_by?: number;
  uploader_name?: string;
  created_at?: string;
}

// 新增数据模型
export interface Product {
  id?: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category?: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Order {
  id?: number;
  user_id: number;
  user_name?: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at?: string;
  updated_at?: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id?: number;
  order_id: number;
  product_id: number;
  product_name?: string;
  quantity: number;
  price: number;
}

export interface Comment {
  id?: number;
  post_id: number;
  user_id: number;
  user_name?: string;
  content: string;
  parent_id?: number;
  replies?: Comment[];
  created_at?: string;
  updated_at?: string;
}



export interface Analytics {
  id?: number;
  event_type: string;
  event_data?: string;
  user_id?: number;
  ip_address?: string;
  user_agent?: string;
  created_at?: string;
}

// 数据库操作类
export class DatabaseService {
  // 用户操作
  static async getUsers(): Promise<User[]> {
    const users = await dbPromise.all('SELECT * FROM users ORDER BY created_at DESC');
    return users as User[];
  }

  static async getUserById(id: number): Promise<User | null> {
    const user = await dbPromise.get('SELECT * FROM users WHERE id = ?', [id]);
    return user as User || null;
  }

  static async createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
    const result = await dbPromise.run(
      'INSERT INTO users (name, email, age) VALUES (?, ?, ?)',
      [user.name, user.email, user.age || null]
    );
    return result.lastID!;
  }

  static async updateUser(id: number, user: Partial<User>): Promise<void> {
    await dbPromise.run(
      'UPDATE users SET name = ?, email = ?, age = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [user.name || '', user.email || '', user.age || null, id]
    );
  }

  static async deleteUser(id: number): Promise<void> {
    await dbPromise.run('DELETE FROM users WHERE id = ?', [id]);
  }

  // 文章操作
  static async getPosts(): Promise<Post[]> {
    const posts = await dbPromise.all(`
      SELECT p.*, u.name as author_name 
      FROM posts p 
      LEFT JOIN users u ON p.author_id = u.id 
      ORDER BY p.created_at DESC
    `);
    return posts as Post[];
  }

  static async getPostById(id: number): Promise<Post | null> {
    const post = await dbPromise.get(`
      SELECT p.*, u.name as author_name 
      FROM posts p 
      LEFT JOIN users u ON p.author_id = u.id 
      WHERE p.id = ?
    `, [id]);
    return post as Post || null;
  }

  static async createPost(post: Omit<Post, 'id' | 'created_at' | 'updated_at' | 'author_name'>): Promise<number> {
    const result = await dbPromise.run(
      'INSERT INTO posts (title, content, published, author_id) VALUES (?, ?, ?, ?)',
      [post.title, post.content, post.published, post.author_id || null]
    );
    return result.lastID!;
  }

  static async updatePost(id: number, post: Partial<Post>): Promise<void> {
    await dbPromise.run(
      'UPDATE posts SET title = ?, content = ?, published = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [post.title || '', post.content || '', post.published ?? false, id]
    );
  }

  static async deletePost(id: number): Promise<void> {
    await dbPromise.run('DELETE FROM posts WHERE id = ?', [id]);
  }

  // 待办事项操作
  static async getTodos(): Promise<Todo[]> {
    const todos = await dbPromise.all(`
      SELECT t.*, u.name as user_name 
      FROM todos t 
      LEFT JOIN users u ON t.user_id = u.id 
      ORDER BY t.created_at DESC
    `);
    return todos as Todo[];
  }

  static async createTodo(todo: Omit<Todo, 'id' | 'created_at' | 'updated_at' | 'user_name'>): Promise<number> {
    const result = await dbPromise.run(
      'INSERT INTO todos (text, completed, user_id) VALUES (?, ?, ?)',
      [todo.text, todo.completed, todo.user_id || null]
    );
    return result.lastID!;
  }

  static async updateTodo(id: number, todo: Partial<Todo>): Promise<void> {
    await dbPromise.run(
      'UPDATE todos SET text = ?, completed = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [todo.text || '', todo.completed ?? false, id]
    );
  }

  static async deleteTodo(id: number): Promise<void> {
    await dbPromise.run('DELETE FROM todos WHERE id = ?', [id]);
  }

  static async batchUpdateTodos(ids: number[], action: 'complete' | 'incomplete' | 'delete'): Promise<void> {
    const placeholders = ids.map(() => '?').join(',');
    
    switch (action) {
      case 'complete':
        await dbPromise.run(
          `UPDATE todos SET completed = 1, updated_at = CURRENT_TIMESTAMP WHERE id IN (${placeholders})`,
          ids
        );
        break;
      case 'incomplete':
        await dbPromise.run(
          `UPDATE todos SET completed = 0, updated_at = CURRENT_TIMESTAMP WHERE id IN (${placeholders})`,
          ids
        );
        break;
      case 'delete':
        await dbPromise.run(`DELETE FROM todos WHERE id IN (${placeholders})`, ids);
        break;
    }
  }

  // 文件操作
  static async createFileRecord(file: Omit<FileRecord, 'id' | 'created_at' | 'uploader_name'>): Promise<number> {
    const result = await dbPromise.run(
      'INSERT INTO files (name, size, type, path, uploaded_by) VALUES (?, ?, ?, ?, ?)',
      [file.name, file.size, file.type, file.path, file.uploaded_by || null]
    );
    return result.lastID!;
  }

  static async getFiles(): Promise<FileRecord[]> {
    const files = await dbPromise.all(`
      SELECT f.*, u.name as uploader_name 
      FROM files f 
      LEFT JOIN users u ON f.uploaded_by = u.id 
      ORDER BY f.created_at DESC
    `);
    return files as FileRecord[];
  }

  // 分析数据操作
  static async createAnalyticsEvent(event: Omit<Analytics, 'id' | 'created_at'>): Promise<number> {
    const result = await dbPromise.run(
      'INSERT INTO analytics (event_type, event_data, user_id, ip_address, user_agent) VALUES (?, ?, ?, ?, ?)',
      [event.event_type, event.event_data || null, event.user_id || null, event.ip_address || null, event.user_agent || null]
    );
    return result.lastID!;
  }

  static async getAnalytics(limit: number = 100): Promise<Analytics[]> {
    const events = await dbPromise.all(
      'SELECT * FROM analytics ORDER BY created_at DESC LIMIT ?',
      [limit]
    );
    return events as Analytics[];
  }

  static async getAnalyticsStats(): Promise<{
    totalEvents: number;
    eventsByType: { event_type: string; count: number }[];
    recentEvents: Analytics[];
  }> {
    const totalEvents = await dbPromise.get('SELECT COUNT(*) as count FROM analytics') as { count: number };
    const eventsByType = await dbPromise.all(`
      SELECT event_type, COUNT(*) as count 
      FROM analytics 
      GROUP BY event_type 
      ORDER BY count DESC
    `) as { event_type: string; count: number }[];
    const recentEvents = await dbPromise.all(
      'SELECT * FROM analytics ORDER BY created_at DESC LIMIT 10'
    ) as Analytics[];

    return {
      totalEvents: totalEvents.count,
      eventsByType,
      recentEvents
    };
  }
}

// 完整的数据库操作助手类
export class DatabaseHelper {
  // 产品相关方法
  static async getAllProducts(): Promise<Product[]> {
    const products = await dbPromise.all('SELECT * FROM products ORDER BY created_at DESC');
    return products as Product[];
  }

  static async getProductById(id: number): Promise<Product | null> {
    const product = await dbPromise.get('SELECT * FROM products WHERE id = ?', [id]);
    return product as Product | null;
  }

  static async createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
    const result = await dbPromise.run(
      'INSERT INTO products (name, description, price, stock, category, image_url) VALUES (?, ?, ?, ?, ?, ?)',
      [product.name, product.description || '', product.price, product.stock || 0, product.category || '', product.image_url || '']
    );
    return result.lastID!;
  }

  static async updateProduct(id: number, product: Partial<Product>): Promise<void> {
    const fields = Object.keys(product).filter(key => key !== 'id');
    const values = fields.map(key => (product as Record<string, string | number | boolean | null>)[key]);
    const setClause = fields.map(key => `${key} = ?`).join(', ');
    
    await dbPromise.run(
      `UPDATE products SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [...values, id]
    );
  }

  static async deleteProduct(id: number): Promise<void> {
    await dbPromise.run('DELETE FROM products WHERE id = ?', [id]);
  }

  // 用户相关方法
  static async getUsersWithPagination(page: number = 1, pageSize: number = 10): Promise<{
    users: User[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }> {
    const offset = (page - 1) * pageSize;
    
    const total = await dbPromise.get('SELECT COUNT(*) as count FROM users') as { count: number };
    const users = await dbPromise.all(
      'SELECT * FROM users ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [pageSize, offset]
    ) as User[];

    return {
      users,
      total: total.count,
      page,
      pageSize,
      totalPages: Math.ceil(total.count / pageSize)
    };
  }

  static async getUserById(id: number): Promise<User | null> {
    const user = await dbPromise.get('SELECT * FROM users WHERE id = ?', [id]);
    return user as User | null;
  }

  static async createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
    const result = await dbPromise.run(
      'INSERT INTO users (name, email, age) VALUES (?, ?, ?)',
      [user.name, user.email, user.age || null]
    );
    return result.lastID!;
  }

  // 评论相关方法
  static async getCommentsWithUsers(postId: number): Promise<Comment[]> {
    const comments = await dbPromise.all(`
      SELECT c.*, u.name as user_name 
      FROM comments c 
      JOIN users u ON c.user_id = u.id 
      WHERE c.post_id = ? 
      ORDER BY c.created_at ASC
    `, [postId]) as Comment[];

    // 构建评论树结构
    const commentMap = new Map<number, Comment>();
    const rootComments: Comment[] = [];

    comments.forEach(comment => {
      comment.replies = [];
      commentMap.set(comment.id!, comment);
      
      if (comment.parent_id) {
        const parent = commentMap.get(comment.parent_id);
        if (parent) {
          parent.replies!.push(comment);
        }
      } else {
        rootComments.push(comment);
      }
    });

    return rootComments;
  }

  static async createComment(comment: Omit<Comment, 'id' | 'created_at' | 'updated_at' | 'user_name' | 'replies'>): Promise<number> {
    const result = await dbPromise.run(
      'INSERT INTO comments (post_id, user_id, content, parent_id) VALUES (?, ?, ?, ?)',
      [comment.post_id, comment.user_id, comment.content, comment.parent_id || null]
    );
    return result.lastID!;
  }

  // 订单相关方法
  static async createOrder(order: Omit<Order, 'id' | 'created_at' | 'updated_at' | 'user_name' | 'items'>): Promise<number> {
    const result = await dbPromise.run(
      'INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)',
      [order.user_id, order.total_amount, order.status]
    );
    return result.lastID!;
  }

  static async getOrdersWithItems(userId?: number): Promise<Order[]> {
    const whereClause = userId ? 'WHERE o.user_id = ?' : '';
    const params = userId ? [userId] : [];
    
    const orders = await dbPromise.all(`
      SELECT 
        o.*,
        u.name as user_name,
        GROUP_CONCAT(
          json_object(
            'id', oi.id,
            'product_id', oi.product_id,
            'product_name', p.name,
            'quantity', oi.quantity,
            'price', oi.price
          )
        ) as items_json
      FROM orders o
      JOIN users u ON o.user_id = u.id
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      ${whereClause}
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `, params);

    return (orders as Record<string, unknown>[]).map((order) => ({
      ...order,
      items: order.items_json ? JSON.parse(`[${order.items_json}]`) : []
    })) as Order[];
  }

  // 分析相关方法
  static async createAnalyticsEvent(event: Omit<Analytics, 'id' | 'created_at'>): Promise<number> {
    const result = await dbPromise.run(
      'INSERT INTO analytics (event_type, event_data, user_id, ip_address, user_agent) VALUES (?, ?, ?, ?, ?)',
      [event.event_type, event.event_data || null, event.user_id || null, event.ip_address || null, event.user_agent || null]
    );
    return result.lastID!;
  }

  static async getAnalytics(limit: number = 100): Promise<Analytics[]> {
    const events = await dbPromise.all(
      'SELECT * FROM analytics ORDER BY created_at DESC LIMIT ?',
      [limit]
    );
    return events as Analytics[];
  }

  static async getAnalyticsSummary(): Promise<{
    totalEvents: number;
    eventsByType: Record<string, number>;
    recentEvents: Analytics[];
  }> {
    const totalEvents = await dbPromise.get('SELECT COUNT(*) as count FROM analytics') as { count: number };
    const eventsByType = await dbPromise.all(`
      SELECT event_type, COUNT(*) as count 
      FROM analytics 
      GROUP BY event_type 
      ORDER BY count DESC
    `) as { event_type: string; count: number }[];
    const recentEvents = await dbPromise.all(
      'SELECT * FROM analytics ORDER BY created_at DESC LIMIT 10'
    ) as Analytics[];

    // 转换为对象格式
    const eventsByTypeObj: Record<string, number> = {};
    eventsByType.forEach(item => {
      eventsByTypeObj[item.event_type] = item.count;
    });

    return {
      totalEvents: totalEvents.count,
      eventsByType: eventsByTypeObj,
      recentEvents
    };
  }
}
