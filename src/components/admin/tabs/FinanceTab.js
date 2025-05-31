'use client'
import React, { useState } from 'react';
import { 
    DollarSign, 
    TrendingUp, 
    CreditCard, 
    Users, 
    Calendar,
    Download,
    Filter
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const FinanceTab = ({ chartData }) => {
    const [dateFilter, setDateFilter] = useState('7d');
    const [selectedMetric, setSelectedMetric] = useState('revenue');

    const financeStats = [
        {
            title: 'Total Revenue',
            value: 'Rp 2.1M',
            change: '+23.1%',
            trend: 'up',
            icon: DollarSign,
            color: 'green'
        },
        {
            title: 'Monthly Growth',
            value: '+15.2%',
            change: '+3.2%',
            trend: 'up',
            icon: TrendingUp,
            color: 'blue'
        },
        {
            title: 'Active Subscriptions',
            value: '8,547',
            change: '+12.5%',
            trend: 'up',
            icon: Users,
            color: 'purple'
        },
        {
            title: 'Avg. Transaction',
            value: 'Rp 145K',
            change: '+8.3%',
            trend: 'up',
            icon: CreditCard,
            color: 'orange'
        }
    ];

    const recentTransactions = [
        {
            id: 1,
            user: 'Manachika',
            course: 'Basketball Fundamentals',
            amount: 'Rp 150K',
            date: '2024-06-01',
            status: 'completed',
            method: 'Bank Transfer'
        },
        {
            id: 2,
            user: 'Bayu Aditya',
            course: 'Swimming for Beginners',
            amount: 'Rp 120K',
            date: '2024-06-01',
            status: 'completed',
            method: 'E-Wallet'
        },
        {
            id: 3,
            user: 'Dani Pratama',
            course: 'Basic Martial Arts',
            amount: 'Rp 180K',
            date: '2024-05-31',
            status: 'pending',
            method: 'Credit Card'
        },
        {
            id: 4,
            user: 'Sari Indah',
            course: 'Tennis Skills & Techniques',
            amount: 'Rp 160K',
            date: '2024-05-31',
            status: 'completed',
            method: 'Bank Transfer'
        },
        {
            id: 5,
            user: 'Ananda Putri',
            course: 'Basketball Fundamentals',
            amount: 'Rp 150K',
            date: '2024-05-30',
            status: 'failed',
            method: 'E-Wallet'
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'failed':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const StatCard = ({ stat }) => {
        const IconComponent = stat.icon;
        return (
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                        <div className="flex items-center mt-2">
                            <span className={`text-sm font-medium ${
                                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                            }`}>
                                {stat.change}
                            </span>
                            <span className="text-sm text-gray-500 ml-1">vs last month</span>
                        </div>
                    </div>
                    <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                        <IconComponent className={`w-6 h-6 text-${stat.color}-600`} />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Financial Overview</h2>
                    <p className="text-gray-600 mt-1">Track revenue, transactions, and financial metrics</p>
                </div>
                <div className="flex items-center gap-3">
                    <select
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="7d">Last 7 days</option>
                        <option value="30d">Last 30 days</option>
                        <option value="90d">Last 90 days</option>
                        <option value="1y">Last year</option>
                    </select>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {financeStats.map((stat, index) => (
                    <StatCard key={index} stat={stat} />
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
                        <select
                            value={selectedMetric}
                            onChange={(e) => setSelectedMetric(e.target.value)}
                            className="px-3 py-1 border border-gray-200 rounded-md text-sm"
                        >
                            <option value="revenue">Revenue</option>
                            <option value="users">Users</option>
                            <option value="courses">Courses</option>
                        </select>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line 
                                type="monotone" 
                                dataKey={selectedMetric} 
                                stroke="#3B82F6" 
                                strokeWidth={2}
                                dot={{ fill: '#3B82F6' }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Monthly Comparison */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Comparison</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="revenue" fill="#10B981" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            View All
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    User
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Course
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Method
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {recentTransactions.map((transaction) => (
                                <tr key={transaction.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-medium text-gray-900">{transaction.user}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{transaction.course}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-medium text-gray-900">{transaction.amount}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-600">{transaction.method}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-600">{transaction.date}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                                            {transaction.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FinanceTab;