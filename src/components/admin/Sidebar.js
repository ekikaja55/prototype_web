'use client'
import React from 'react';
import Link from 'next/link';
import {
    Activity,
    Users,
    BookOpen,
    MessageSquare,
    DollarSign,
    Settings,
    Trophy,
    X,
    GraduationCap
} from 'lucide-react';

const Sidebar = ({
    sidebarOpen,
    setSidebarOpen,
    activeTab,
    setActiveTab,
    setShowUserDetail,
    setShowCreateCourse,
    setShowEditCourse
}) => {
    const sidebarItems = [
        { id: 'overview', label: 'Overview', icon: Activity },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'courses', label: 'Courses', icon: BookOpen },
        { id: 'instructors', label: 'Instructors', icon: GraduationCap },
        { id: 'community', label: 'Community', icon: MessageSquare },
        { id: 'finance', label: 'Finance', icon: DollarSign },
        { id: 'settings', label: 'Settings', icon: Settings }
    ];

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        setSidebarOpen(false);
        setShowUserDetail(false);
        setShowCreateCourse(false);
        setShowEditCourse(false);
    };

    return (
        <div className={`fixed inset-y-0 left-0 z-50 w-64 min-h-[100vh] overflow-y-hidden bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
                <Link href="/" className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        MySports.id
                    </span>
                </Link>
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
                                onClick={() => handleTabChange(item.id)}
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

            {/* Back to Main Site Link */}
            <div className="p-3 border-t border-gray-200">
                <Link 
                    href="/"
                    className="w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
                >
                    <Trophy className="w-5 h-5 mr-3 flex-shrink-0" />
                    Back to Main Site
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;