'use client'
import React from 'react';
import { BarChart3, BookOpen, MessageSquare, CreditCard, Settings, Home, Trophy, User, X } from 'lucide-react';

const UserSidebar = ({ sidebarOpen, setSidebarOpen, activeTab, setActiveTab }) => {
    const menuItems = [
        {
            id: 'overview',
            label: 'Overview',
            icon: Home,
            description: 'Dashboard home'
        },
        {
            id: 'courses',
            label: 'My Courses',
            icon: BookOpen,
            description: 'Learning progress'
        },
        {
            id: 'community',
            label: 'Community',
            icon: MessageSquare,
            description: 'Connect with others'
        },
        {
            id: 'transactions',
            label: 'Transactions',
            icon: CreditCard,
            description: 'Payment history'
        },
        {
            id: 'settings',
            label: 'Settings',
            icon: Settings,
            description: 'Account settings'
        }
    ];

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
        setSidebarOpen(false);
    };

    return (
        <>
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:translate-x-0 lg:static lg:inset-0`}>
                
                {/* Header */}
                <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <Trophy className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-xl font-bold text-gray-900">MySports</h1>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-1 text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* User Profile Section */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Budi Sudarso</h3>
                            <p className="text-sm text-gray-500">Sports Enthusiast</p>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center space-x-4 text-sm">
                        <div className="text-center">
                            <div className="font-bold text-blue-600">3</div>
                            <div className="text-gray-500">Courses</div>
                        </div>
                        <div className="text-center">
                            <div className="font-bold text-green-600">85%</div>
                            <div className="text-gray-500">Progress</div>
                        </div>
                        <div className="text-center">
                            <div className="font-bold text-purple-600">12</div>
                            <div className="text-gray-500">Badges</div>
                        </div>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="mt-6 px-3">
                    <div className="space-y-2">
                        {menuItems.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleTabClick(item.id)}
                                    className={`w-full flex items-center px-3 py-3 text-left text-sm font-medium rounded-xl transition-colors duration-200 ${
                                        activeTab === item.id
                                            ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-l-4 border-blue-600'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                >
                                    <IconComponent className={`w-5 h-5 mr-3 ${
                                        activeTab === item.id ? 'text-blue-600' : 'text-gray-400'
                                    }`} />
                                    <div className="flex-1">
                                        <div className="font-medium">{item.label}</div>
                                        <div className="text-xs text-gray-400 mt-0.5">{item.description}</div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </nav>

                {/* Progress Card */}
                <div className="mx-3 mt-8 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">Weekly Goal</h4>
                        <Trophy className="w-5 h-5" />
                    </div>
                    <div className="text-sm opacity-90 mb-3">Complete 5 hours of training</div>
                    <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                        <div className="bg-white rounded-full h-2 w-3/4"></div>
                    </div>
                    <div className="text-xs opacity-90">3.8 / 5.0 hours completed</div>
                </div>

                {/* Quick Stats */}
                <div className="mx-3 mt-4 p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-3">This Week</h4>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Lessons Completed</span>
                            <span className="font-medium">8</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Practice Hours</span>
                            <span className="font-medium">12.5h</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Community Posts</span>
                            <span className="font-medium">3</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserSidebar;