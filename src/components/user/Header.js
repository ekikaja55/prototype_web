'use client'
import React, { useState } from "react";
import {
  Menu,
  Bell,
  Search,
  User,
  Settings,
  LogOut,
  MessageSquare,
  Trophy,
} from "lucide-react";

const UserHeader = ({ activeTab, setSidebarOpen, userProfile }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const getTabTitle = (tab) => {
    const titles = {
      overview: "Dashboard Overview",
      courses: "My Learning Journey",
      community: "Sports Community",
      transactions: "Transaction History",
      settings: "Account Settings",
    };
    return titles[tab] || "Dashboard";
  };

  const getTabDescription = (tab) => {
    const descriptions = {
      overview: "Track your progress and achievements",
      courses: "Continue your sports training",
      community: "Connect and share with fellow athletes",
      transactions: "View your payment history",
      settings: "Manage your account preferences",
    };
    return descriptions[tab] || "Welcome to your dashboard";
  };

  const notifications = [
    {
      id: 1,
      type: "course",
      title: "New lesson available",
      message: "Tennis Pro Academy - Serve Techniques is now available",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      type: "community",
      title: "New comment on your post",
      message: "Someone commented on your training progress post",
      time: "5 hours ago",
      unread: true,
    },
    {
      id: 3,
      type: "achievement",
      title: "Achievement unlocked!",
      message: 'You earned the "Consistent Learner" badge',
      time: "1 day ago",
      unread: false,
    },
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case "course":
        return <div className="w-2 h-2 bg-blue-500 rounded-full"></div>;
      case "community":
        return <MessageSquare className="w-4 h-4 text-green-500" />;
      case "achievement":
        return <Trophy className="w-4 h-4 text-yellow-500" />;
      default:
        return <div className="w-2 h-2 bg-gray-400 rounded-full"></div>;
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left Side */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Page Title */}
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {getTabTitle(activeTab)}
            </h1>
            <p className="text-sm text-gray-500 hidden sm:block">
              {getTabDescription(activeTab)}
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:block relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-64 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <Bell className="w-5 h-5" />
              {notifications.some((n) => n.unread) && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">
                      Notifications
                    </h3>
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                      {notifications.filter((n) => n.unread).length} new
                    </span>
                  </div>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer ${
                        notification.unread ? "bg-blue-50/30" : ""
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            {notification.time}
                          </p>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t border-gray-100">
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-900">Budi Sudarso</p>
                <p className="text-xs text-gray-500">Member</p>
              </div>
            </button>

            {/* Profile Dropdown */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Sari Indah</p>
                      <p className="text-sm text-gray-500">
                        sari.indah@example.com
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <User className="w-4 h-4 mr-3" />
                    View Profile
                  </button>
                  <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <Settings className="w-4 h-4 mr-3" />
                    Account Settings
                  </button>
                  <hr className="my-2" />
                  <button className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
