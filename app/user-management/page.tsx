"use client";

import { useState, useEffect } from "react";
import DemoHeader from "@/app/components/DemoHeader";

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
        name: "",
        email: "",
        age: "",
    });

    // 获取所有用户
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/users");
            const result = await response.json();
            setUsers(result.users);
        } catch (err) {
            setError("Failed to fetch users");
            console.error("Error fetching users:", err);
        } finally {
            setLoading(false);
        }
    };

    // 创建用户
    const createUser = async (userData: { name: string; email: string; age?: number }) => {
        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const result = await response.json();

            if (!result.error) {
                await fetchUsers(); // 重新获取用户列表
                setShowAddForm(false);
                resetForm();
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError("Failed to create user");
            console.error("Error creating user:", err);
        }
    };

    // 更新用户
    const updateUser = async (id: number, userData: { name: string; email: string; age?: number }) => {
        try {
            const response = await fetch(`/api/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const result = await response.json();

            if (result.success) {
                await fetchUsers(); // 重新获取用户列表
                setEditingUser(null);
                resetForm();
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError("Failed to update user");
            console.error("Error updating user:", err);
        }
    };

    // 删除用户
    const deleteUser = async (id: number) => {
        if (!confirm("Are you sure you want to delete this user?")) {
            return;
        }

        try {
            const response = await fetch(`/api/users/${id}`, {
                method: "DELETE",
            });

            const result = await response.json();

            if (result.success) {
                await fetchUsers(); // 重新获取用户列表
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError("Failed to delete user");
            console.error("Error deleting user:", err);
        }
    };

    // 处理表单提交
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email) {
            setError("Name and email are required");
            return;
        }

        const userData = {
            name: formData.name,
            email: formData.email,
            age: formData.age ? parseInt(formData.age) : undefined,
        };

        if (editingUser) {
            await updateUser(editingUser.id, userData);
        } else {
            await createUser(userData);
        }
    };

    // 重置表单
    const resetForm = () => {
        setFormData({ name: "", email: "", age: "" });
        setError(null);
    };

    // 开始编辑用户
    const startEdit = (user: User) => {
        setEditingUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            age: user.age?.toString() || "",
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
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-purple-900 flex items-center justify-center">
                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                    <div className="flex items-center space-x-3">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                        <div className="text-xl text-gray-700 dark:text-gray-300">加载用户数据...</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-purple-900">
            <DemoHeader
                title="👥 用户管理"
                description="创建、编辑和管理系统用户，包含完整的 CRUD 操作和实时管理功能"
            />

            <div className="max-w-6xl mx-auto p-8">
                {/* 功能标签 */}
                <div className="flex flex-wrap gap-2 mb-8">
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs rounded-full">
                        CRUD操作
                    </span>
                    <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400 text-xs rounded-full">
                        实时管理
                    </span>
                </div>

                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                                <span className="text-white text-lg">👥</span>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">用户列表</h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400">管理所有系统用户</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="group px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-105">
                            <div className="flex items-center space-x-2">
                                <span>➕</span>
                                <span>添加新用户</span>
                            </div>
                        </button>
                    </div>

                    {error && (
                        <div className="mb-6 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 backdrop-blur-sm border border-red-200 dark:border-red-800/30 rounded-xl p-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                                    <span className="text-red-600 dark:text-red-400">⚠️</span>
                                </div>
                                <div className="text-red-700 dark:text-red-400 font-medium">{error}</div>
                            </div>
                        </div>
                    )}

                    {/* 添加/编辑用户表单 */}
                    {showAddForm && (
                        <div className="mb-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-white/30 dark:border-gray-700/30">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white text-lg">{editingUser ? "✏️" : "➕"}</span>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                        {editingUser ? "编辑用户" : "添加新用户"}
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {editingUser ? "更新用户信息" : "创建新的系统用户"}
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            姓名 *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="请输入用户姓名"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            邮箱 *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="请输入邮箱地址"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="age"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        年龄
                                    </label>
                                    <input
                                        type="number"
                                        id="age"
                                        value={formData.age}
                                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                        className="w-full bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="请输入年龄（可选）"
                                        min="1"
                                        max="150"
                                    />
                                </div>

                                <div className="flex flex-wrap gap-3 pt-4">
                                    <button
                                        type="submit"
                                        className="group px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center space-x-2">
                                        <span>{editingUser ? "💾" : "➕"}</span>
                                        <span>{editingUser ? "更新用户" : "添加用户"}</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={cancelEdit}
                                        className="group px-6 py-3 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center space-x-2">
                                        <span>❌</span>
                                        <span>取消</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* 用户列表 */}
                    <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 dark:border-gray-700/30">
                        <div className="px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                                        <span className="text-white text-sm">📊</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            用户数据表
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            共 {users.length} 位用户
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full">
                                        实时数据
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200/30 dark:divide-gray-700/30">
                                <thead className="bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-700/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                            <div className="flex items-center space-x-2">
                                                <span>🆔</span>
                                                <span>ID</span>
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                            <div className="flex items-center space-x-2">
                                                <span>👤</span>
                                                <span>姓名</span>
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                            <div className="flex items-center space-x-2">
                                                <span>📧</span>
                                                <span>邮箱</span>
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                            <div className="flex items-center space-x-2">
                                                <span>🎂</span>
                                                <span>年龄</span>
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                            <div className="flex items-center space-x-2">
                                                <span>📅</span>
                                                <span>创建时间</span>
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                            <div className="flex items-center space-x-2">
                                                <span>⚙️</span>
                                                <span>操作</span>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm divide-y divide-gray-200/30 dark:divide-gray-700/30">
                                    {users.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center">
                                                <div className="flex flex-col items-center space-y-3">
                                                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                                        <span className="text-2xl">👥</span>
                                                    </div>
                                                    <div className="text-gray-500 dark:text-gray-400">
                                                        <p className="text-lg font-medium">暂无用户数据</p>
                                                        <p className="text-sm">
                                                            点击&ldquo;添加新用户&rdquo;按钮开始创建用户
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        users.map((user) => (
                                            <tr
                                                key={user.id}
                                                className="hover:bg-white/30 dark:hover:bg-gray-700/30 transition-colors duration-200">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                                            {user.id}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                                        {user.name}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-700 dark:text-gray-300">
                                                        {user.email}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-700 dark:text-gray-300">
                                                        {user.age ? (
                                                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs">
                                                                {user.age} 岁
                                                            </span>
                                                        ) : (
                                                            <span className="text-gray-400 dark:text-gray-500">-</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-700 dark:text-gray-300">
                                                        {new Date(user.created_at).toLocaleDateString("zh-CN")}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center space-x-2">
                                                        <button
                                                            onClick={() => startEdit(user)}
                                                            className="group px-3 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white rounded-lg text-xs font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center space-x-1">
                                                            <span>✏️</span>
                                                            <span>编辑</span>
                                                        </button>
                                                        <button
                                                            onClick={() => deleteUser(user.id)}
                                                            className="group px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg text-xs font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center space-x-1">
                                                            <span>🗑️</span>
                                                            <span>删除</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* 统计信息 */}
                    <div className="mt-6 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-gray-700/30">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                                    <span className="text-white text-xl">📈</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">系统统计</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">用户管理系统数据概览</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">{users.length}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">总用户数</div>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200/30 dark:border-gray-700/30">
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded-full">
                                    RESTful API
                                </span>
                                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full">
                                    实时更新
                                </span>
                                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs rounded-full">
                                    表单验证
                                </span>
                                <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs rounded-full">
                                    SQLite数据库
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 技术说明区域 */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-gray-700/30">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                <span className="text-white text-sm">🛠️</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">功能特性</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li className="flex items-center space-x-2">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                <span>完整的CRUD操作（增删改查）</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                <span>表单验证和错误处理</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                                <span>响应式设计和深色模式</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                                <span>实时数据更新</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-gray-700/30">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                                <span className="text-white text-sm">⚡</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">技术栈</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li className="flex items-center space-x-2">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                <span>Next.js 15 App Router</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                <span>TypeScript + React Hooks</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                                <span>SQLite数据库</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                                <span>Tailwind CSS样式</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
