import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Users, BookOpen, DollarSign, Trophy } from 'lucide-react';

const OverviewTab = ({ stats, chartData, pieData }) => {
    const getIcon = (iconName) => {
        const icons = {
            Users,
            BookOpen,
            DollarSign,
            Trophy
        };
        return icons[iconName] || Users;
    };

    const getColorClasses = (color) => {
        const colors = {
            blue: 'bg-blue-50 text-blue-600 border-blue-200',
            green: 'bg-green-50 text-green-600 border-green-200',
            purple: 'bg-purple-50 text-purple-600 border-purple-200',
            orange: 'bg-orange-50 text-orange-600 border-orange-200'
        };
        return colors[color] || colors.blue;
    };

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const IconComponent = getIcon(stat.icon);
                    return (
                        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                                </div>
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${getColorClasses(stat.color)}`}>
                                    <IconComponent className="w-6 h-6" />
                                </div>
                            </div>
                            <div className="flex items-center mt-4">
                                {stat.trend === 'up' ? (
                                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                                ) : (
                                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                                )}
                                <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                    {stat.change}
                                </span>
                                <span className="text-sm text-gray-500 ml-1">from last month</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Line Chart */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Overview</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line 
                                    type="monotone" 
                                    dataKey="users" 
                                    stroke="#3B82F6" 
                                    strokeWidth={2}
                                    name="Users"
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="revenue" 
                                    stroke="#10B981" 
                                    strokeWidth={2}
                                    name="Revenue"
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="courses" 
                                    stroke="#F59E0B" 
                                    strokeWidth={2}
                                    name="Courses"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Sports</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-100">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">New user registered</p>
                            <p className="text-xs text-gray-500">Sari Indah joined MySports.id</p>
                        </div>
                        <span className="text-xs text-gray-400">2 hours ago</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-100">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">New course published</p>
                            <p className="text-xs text-gray-500">Tennis Skills & Techniques is now live</p>
                        </div>
                        <span className="text-xs text-gray-400">4 hours ago</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-100">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <DollarSign className="w-4 h-4 text-purple-600" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Payment received</p>
                            <p className="text-xs text-gray-500">Dani Pratama completed course payment</p>
                        </div>
                        <span className="text-xs text-gray-400">1 day ago</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewTab;