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

  db.run(createUsersTable, (err) => {
    if (err) {
      console.error('Error creating users table:', err.message);
    } else {
      console.log('Users table created successfully');
    }
  });
}

// 数据库操作辅助函数
export const dbPromise = {
  // 查询所有记录
  all: (sql: string, params: (string | number | null)[] = []): Promise<unknown[]> => {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  // 查询单条记录
  get: (sql: string, params: (string | number | null)[] = []): Promise<unknown> => {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  // 执行插入、更新、删除操作
  run: (sql: string, params: (string | number | null)[] = []): Promise<sqlite3.RunResult> => {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve(this);
      });
    });
  }
};

// 用户数据模型
export interface User {
  id?: number;
  name: string;
  email: string;
  age?: number;
  created_at?: string;
  updated_at?: string;
}
