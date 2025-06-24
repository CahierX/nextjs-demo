'use client';

import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
  created_at: string;
  updated_at: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // 表单状态
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: ''
  });

  // 获取所有用户
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users');
      const result = await response.json();
      
      if (result.success) {
        setUsers(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to fetch users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  // 创建用户
  const createUser = async (userData: { name: string; email: string; age?: number }) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        await fetchUsers(); // 重新获取用户列表
        setShowAddForm(false);
        resetForm();
        alert('User created successfully!');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to create user');
      console.error('Error creating user:', err);
    }
  };

  // 更新用户
  const updateUser = async (id: number, userData: { name: string; email: string; age?: number }) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        await fetchUsers(); // 重新获取用户列表
        setEditingUser(null);
        resetForm();
        alert('User updated successfully!');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to update user');
      console.error('Error updating user:', err);
    }
  };

  // 删除用户
  const deleteUser = async (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (result.success) {
        await fetchUsers(); // 重新获取用户列表
        alert('User deleted successfully!');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to delete user');
      console.error('Error deleting user:', err);
    }
  };

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      setError('Name and email are required');
      return;
    }

    const userData = {
      name: formData.name,
      email: formData.email,
      age: formData.age ? parseInt(formData.age) : undefined
    };

    if (editingUser) {
      await updateUser(editingUser.id, userData);
    } else {
      await createUser(userData);
    }
  };

  // 重置表单
  const resetForm = () => {
    setFormData({ name: '', email: '', age: '' });
    setError(null);
  };

  // 开始编辑用户
  const startEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      age: user.age?.toString() || ''
    });
    setShowAddForm(true);
    setError(null);
  };

  // 取消编辑
  const cancelEdit = () => {
    setEditingUser(null);
    setShowAddForm(false);
    resetForm();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
              >
                Add New User
              </button>
            </div>

            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {/* 添加/编辑用户表单 */}
            {showAddForm && (
              <div className="mb-6 bg-gray-50 p-6 rounded-lg border">
                <h2 className="text-lg font-medium mb-4">
                  {editingUser ? 'Edit User' : 'Add New User'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                      Age
                    </label>
                    <input
                      type="number"
                      id="age"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      min="1"
                      max="150"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
                    >
                      {editingUser ? 'Update User' : 'Add User'}
                    </button>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* 用户列表 */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Age
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.age || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button
                            onClick={() => startEdit(user)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteUser(user.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* 统计信息 */}
            <div className="mt-6 text-sm text-gray-600">
              Total users: {users.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
