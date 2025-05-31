'use client'
import React from 'react';
import { Menu, Bell } from 'lucide-react';

const Header = ({ activeTab, setSidebarOpen }) => {
    return (
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
            <div className="flex items-center justify-between h-16 px-6">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden p-2 rounded-md hover:bg-gray-100"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <h1 className="text-xl font-semibold text-gray-900 capitalize">
                        {activeTab}
                    </h1>
                </div>

                <div className="flex items-center space-x-4">
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                        <Bell className="w-5 h-5" />
                    </button>
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">A</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;