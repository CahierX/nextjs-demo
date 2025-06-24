import { dbPromise, User } from './database';

export class UserService {
  // 获取所有用户
  static async getAllUsers(): Promise<User[]> {
    const sql = 'SELECT * FROM users ORDER BY created_at DESC';
    const users = await dbPromise.all(sql);
    return users as User[];
  }

  // 根据 ID 获取用户
  static async getUserById(id: number): Promise<User | null> {
    const sql = 'SELECT * FROM users WHERE id = ?';
    const user = await dbPromise.get(sql, [id]);
    return user as User | null;
  }

  // 创建用户
  static async createUser(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
    const sql = 'INSERT INTO users (name, email, age) VALUES (?, ?, ?)';
    const ageValue = userData.age !== undefined ? userData.age : null;
    const result = await dbPromise.run(sql, [userData.name, userData.email, ageValue]);
    
    if (result.lastID) {
      const newUser = await this.getUserById(result.lastID);
      if (newUser) {
        return newUser;
      }
    }
    throw new Error('Failed to create user');
  }

  // 更新用户
  static async updateUser(id: number, userData: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>): Promise<User | null> {
    const updates: string[] = [];
    const values: (string | number | null)[] = [];

    if (userData.name !== undefined) {
      updates.push('name = ?');
      values.push(userData.name);
    }
    if (userData.email !== undefined) {
      updates.push('email = ?');
      values.push(userData.email);
    }
    if (userData.age !== undefined) {
      updates.push('age = ?');
      values.push(userData.age || null);
    }

    if (updates.length === 0) {
      return this.getUserById(id);
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    const sql = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
    await dbPromise.run(sql, values);
    
    return this.getUserById(id);
  }

  // 删除用户
  static async deleteUser(id: number): Promise<boolean> {
    const sql = 'DELETE FROM users WHERE id = ?';
    const result = await dbPromise.run(sql, [id]);
    return result.changes ? result.changes > 0 : false;
  }

  // 根据邮箱查找用户
  static async getUserByEmail(email: string): Promise<User | null> {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const user = await dbPromise.get(sql, [email]);
    return user as User | null;
  }

  // 获取用户总数
  static async getUserCount(): Promise<number> {
    const sql = 'SELECT COUNT(*) as count FROM users';
    const result = await dbPromise.get(sql);
    return (result as { count: number }).count;
  }
}
