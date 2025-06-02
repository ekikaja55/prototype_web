'use client'
import React, { useState } from 'react';
import { 
  Menu, 
  Bell, 
  Search, 
  Settings, 
  User, 
  LogOut,
  Upload,
  MessageSquare,
  Book,
  ChevronDown
} from 'lucide-react';

const InstructorHeader = ({ activeTab, setSidebarOpen, instructorProfile }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const getTabTitle = (tab) => {
    switch (tab) {
      case 'courses':
        return 'Course Management';
      case 'community':
        return 'Community Hub';
      case 'settings':
        return 'Account Settings';
      default:
        return 'Dashboard';
    }
  };

  const getTabIcon = (tab) => {
    switch (tab) {
      case 'courses':
        return <Upload className="w-5 h-5" />;
      case 'community':
        return <MessageSquare className="w-5 h-5" />;
      case 'settings':
        return <Settings className="w-5 h-5" />;
      default:
        return <Book className="w-5 h-5" />;
    }
  };

  const notifications = [
    {
      id: 1,
      title: 'New student enrolled',
      message: 'John Doe enrolled in Basketball Fundamentals',
      time: '5 minutes ago',
      type: 'enrollment'
    },
    {
      id: 2,
      title: 'Video upload completed',
      message: 'Your lesson "Dribbling Techniques" has been processed',
      time: '1 hour ago',
      type: 'upload'
    },
    {
      id: 3,
      title: 'Student question',
      message: 'Sarah asked a question in Football Training course',
      time: '2 hours ago',
      type: 'question'
    }
  ];

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 bg-white border-b border-gray-200 z-30">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Side */}
        <div className="flex items-center">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Page Title */}
          <div className="flex items-center ml-4 lg:ml-0">
            <div className="p-2 bg-blue-100 rounded-lg mr-3">
              {getTabIcon(activeTab)}
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {getTabTitle(activeTab)}
              </h1>
              <p className="text-sm text-gray-500">
                Manage your courses and connect with students
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search courses, students..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-100 relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400"></span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Notifications</h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex space-x-3 p-2 hover:bg-gray-50 rounded-md">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Bell className="w-4 h-4 text-blue-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                          <p className="text-sm text-gray-500">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      View all notifications
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <img
                src={instructorProfile?.avatar || '/api/placeholder/32/32'}
                alt={instructorProfile?.name || 'Instructor'}
                className="w-8 h-8 rounded-full"
              />
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-gray-900">
                  {instructorProfile?.name || 'Instructor'}
                </div>
                <div className="text-xs text-gray-500">
                  {instructorProfile?.role || 'Sports Instructor'}
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {/* Profile Dropdown Menu */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">
                      {instructorProfile?.name || 'Instructor'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {instructorProfile?.email || 'instructor@example.com'}
                    </p>
                  </div>
                  
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <User className="w-4 h-4 mr-2" />
                    View Profile
                  </button>
                  
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </button>
                  
                  <div className="border-t border-gray-200">
                    <button className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showNotifications || showProfile) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowNotifications(false);
            setShowProfile(false);
          }}
        />
      )}
    </header>
  );
};

export default InstructorHeader;