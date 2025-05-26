'use client';
import React, { useState, useEffect } from 'react';
import {
    Users,
    Trophy,
    BookOpen,
    TrendingUp,
    Calendar,
    Bell,
    Search,
    Filter,
    MoreHorizontal,
    Plus,
    Download,
    Eye,
    Edit,
    Trash2,
    Settings,
    Activity,
    DollarSign,
    Star,
    MessageSquare,
    Shield,
    ChevronDown,
    Menu,
    X
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const page = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedTimeframe, setSelectedTimeframe] = useState('7days');

    // Mock data
    const stats = [
        { title: 'Total Users', value: '12,547', change: '+12.5%', trend: 'up', icon: Users, color: 'blue' },
        { title: 'Active Courses', value: '156', change: '+8.2%', trend: 'up', icon: BookOpen, color: 'green' },
        { title: 'Revenue', value: 'Rp 2.1M', change: '+23.1%', trend: 'up', icon: DollarSign, color: 'purple' },
        { title: 'Success Rate', value: '94.2%', change: '+2.3%', trend: 'up', icon: Trophy, color: 'orange' }
    ];

    const chartData = [
        { name: 'Jan', users: 4000, revenue: 2400, courses: 240 },
        { name: 'Feb', users: 3000, revenue: 1398, courses: 220 },
        { name: 'Mar', users: 2000, revenue: 9800, courses: 290 },
        { name: 'Apr', users: 2780, revenue: 3908, courses: 200 },
        { name: 'May', users: 1890, revenue: 4800, courses: 181 },
        { name: 'Jun', users: 2390, revenue: 3800, courses: 250 },
        { name: 'Jul', users: 3490, revenue: 4300, courses: 210 }
    ];

    const pieData = [
        { name: 'Basketball', value: 400, color: '#3B82F6' },
        { name: 'Football', value: 300, color: '#10B981' },
        { name: 'Swimming', value: 200, color: '#F59E0B' },
        { name: 'Tennis', value: 150, color: '#EF4444' },
        { name: 'Others', value: 100, color: '#8B5CF6' }
    ];

    const recentUsers = [
        { id: 1, name: 'Prima Fikri Salim', email: 'prima@example.com', status: 'Active', joined: '2 days ago', avatar: 'PF' },
        { id: 2, name: 'Ananda Putri', email: 'ananda@example.com', status: 'Inactive', joined: '5 days ago', avatar: 'AP' },
        { id: 3, name: 'Bayu Aditya', email: 'bayu@example.com', status: 'Active', joined: '1 week ago', avatar: 'BA' },
        { id: 4, name: 'Sari Indah', email: 'sari@example.com', status: 'Active', joined: '2 weeks ago', avatar: 'SI' }
    ];

    const popularCourses = [
        { id: 1, title: 'Basketball Fundamentals', students: 2140, rating: 4.8, revenue: 'Rp 320K', status: 'Active' },
        { id: 2, title: 'Swimming for Beginners', students: 1890, rating: 4.7, revenue: 'Rp 280K', status: 'Active' },
        { id: 3, title: 'Basic Martial Arts', students: 2400, rating: 4.9, revenue: 'Rp 400K', status: 'Active' },
        { id: 4, title: 'Tennis Skills & Techniques', students: 1600, rating: 4.8, revenue: 'Rp 250K', status: 'Draft' }
    ];

    const sidebarItems = [
        { id: 'overview', label: 'Overview', icon: Activity },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'courses', label: 'Courses', icon: BookOpen },
        { id: 'analytics', label: 'Analytics', icon: TrendingUp },
        { id: 'community', label: 'Community', icon: MessageSquare },
        { id: 'finance', label: 'Finance', icon: DollarSign },
        { id: 'settings', label: 'Settings', icon: Settings }
    ];

    const Card = ({ children, className = '' }) => (
        <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}>
            {children}
        </div>
    );

    const StatCard = ({ stat }) => {
        const IconComponent = stat.icon;
        const colorClasses = {
            blue: 'bg-blue-50 text-blue-600',
            green: 'bg-green-50 text-green-600',
            purple: 'bg-purple-50 text-purple-600',
            orange: 'bg-orange-50 text-orange-600'
        };

        return (
            <Card className="p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                        <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                        <div className="flex items-center">
                            <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                {stat.change}
                            </span>
                            <span className="text-sm text-gray-500 ml-2">vs last period</span>
                        </div>
                    </div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ml-4 ${colorClasses[stat.color]}`}>
                        <IconComponent className="w-6 h-6" />
                    </div>
                </div>
            </Card>
        );
    };

    const Sidebar = () => (
        <div className={`fixed inset-y-0 left-0 z-50 w-64 min-h-[100vh] overflow-y-hidden  bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        MySports.id
                    </span>
                </div>
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="lg:hidden p-1 rounded-md hover:bg-gray-100"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            <nav className="mt-6 px-3 flex-1">
                <div className="space-y-1">
                    {sidebarItems.map((item) => {
                        const IconComponent = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveTab(item.id);
                                    setSidebarOpen(false);
                                }}
                                className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === item.id
                                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 border-r-2 border-blue-600'
                                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <IconComponent className="w-5 h-5 mr-3 flex-shrink-0" />
                                {item.label}
                            </button>
                        );
                    })}
                </div>
            </nav>

            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <Shield className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">Admin</p>
                        <p className="text-xs text-gray-500 truncate">Super Administrator</p>
                    </div>
                </div>
            </div>
        </div>
    );

    const Header = () => (
        <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center justify-between px-4 lg:px-6 py-4">
                <div className="flex items-center space-x-4 flex-1 min-w-0">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden p-2 rounded-md hover:bg-gray-100 flex-shrink-0"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <div className="min-w-0">
                        <h1 className="text-xl lg:text-2xl font-bold text-gray-900 capitalize truncate">
                            {activeTab === 'overview' ? 'Dashboard Overview' : activeTab}
                        </h1>
                        <p className="text-sm text-gray-500 hidden sm:block">Welcome back! Here's what's happening with MySports.id</p>
                    </div>
                </div>

                <div className="flex items-center space-x-2 lg:space-x-4 flex-shrink-0">
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-32 lg:w-48"
                        />
                    </div>

                    <select
                        value={selectedTimeframe}
                        onChange={(e) => setSelectedTimeframe(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs lg:text-sm"
                    >
                        <option value="7days">Last 7 days</option>
                        <option value="30days">Last 30 days</option>
                        <option value="90days">Last 90 days</option>
                        <option value="1year">Last year</option>
                    </select>

                    <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                </div>
            </div>
        </header>
    );

    const OverviewContent = () => (
        <div className="space-y-6 max-w-full">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {stats.map((stat, index) => (
                    <StatCard key={index} stat={stat} />
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <Card className="p-4 lg:p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">User Growth</h3>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View Details</button>
                    </div>
                    <div className="h-64 lg:h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                                <YAxis stroke="#6b7280" fontSize={12} />
                                <Tooltip />
                                <Area type="monotone" dataKey="users" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className="p-4 lg:p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Course Categories</h3>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
                    </div>
                    <div className="h-64 lg:h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    labelLine={false}
                                    fontSize={12}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            {/* Tables Row */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <Card className="p-4 lg:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Recent Users</h3>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center">
                            <Plus className="w-4 h-4 mr-2" />
                            Add User
                        </button>
                    </div>
                    <div className="space-y-4">
                        {recentUsers.map((user) => (
                            <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="flex items-center space-x-3 flex-1 min-w-0">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                                        {user.avatar}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="font-medium text-gray-900 truncate">{user.name}</p>
                                        <p className="text-sm text-gray-500 truncate">{user.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 flex-shrink-0">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                        }`}>
                                        {user.status}
                                    </span>
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="p-4 lg:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Popular Courses</h3>
                        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Course
                        </button>
                    </div>
                    <div className="space-y-4">
                        {popularCourses.map((course) => (
                            <div key={course.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium text-gray-900 flex-1 min-w-0 truncate pr-2">{course.title}</h4>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${course.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {course.status}
                                    </span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm text-gray-600">
                                    <span className="flex-shrink-0">{course.students} students</span>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                                            <span>{course.rating}</span>
                                        </div>
                                        <span className="font-medium text-green-600">{course.revenue}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <OverviewContent />;
            case 'users':
                return (
                    <Card className="p-6">
                        <h3 className="text-xl font-semibold mb-4">User Management</h3>
                        <p className="text-gray-600">Detailed user management interface would go here...</p>
                    </Card>
                );
            case 'courses':
                return (
                    <Card className="p-6">
                        <h3 className="text-xl font-semibold mb-4">Course Management</h3>
                        <p className="text-gray-600">Course creation and management tools would go here...</p>
                    </Card>
                );
            default:
                return (
                    <Card className="p-6">
                        <h3 className="text-xl font-semibold mb-4 capitalize">{activeTab}</h3>
                        <p className="text-gray-600">This section is under development.</p>
                    </Card>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div className="lg:ml-70  flex flex-col top-0 absolute">
                <Header />
                <main className="flex-1 p-4 lg:p-6">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default page;