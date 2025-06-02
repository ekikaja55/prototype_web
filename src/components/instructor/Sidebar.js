'use client'
import React from 'react';
import { 
  X,
  Upload,
  MessageSquare,
  Settings,
  Book,
  Home,
  BarChart3,
  Users,
  Video
} from 'lucide-react';

const InstructorSidebar = ({ sidebarOpen, setSidebarOpen, activeTab, setActiveTab }) => {
  const menuItems = [
    {
      id: 'courses',
      label: 'Courses',
      icon: Book,
      description: 'Manage your courses'
    },
    {
      id: 'community',
      label: 'Community',
      icon: MessageSquare,
      description: 'Engage with students'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      description: 'Account preferences'
    }
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  return (
    <>
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 min-h-screen  bg-white shadow-lg transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:z-auto`}>
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900"> Dashboard</span>
          </div>
          
          {/* Close button for mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-8">
          <div className="px-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Main Menu
            </p>
          </div>
          
          <div className="mt-4 space-y-1 px-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 mr-3 ${
                    isActive ? 'text-blue-700' : 'text-gray-400'
                  }`} />
                  <div className="text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Quick Stats */}
     

        {/* Footer */}
     
      </div>
    </>
  );
};

export default InstructorSidebar;