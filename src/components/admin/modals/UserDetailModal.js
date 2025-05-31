'use client'
import React, { useState } from 'react';
import { 
    X, 
    User, 
    Mail, 
    Phone, 
    Calendar, 
    BookOpen, 
    DollarSign,
    Activity,
    CheckCircle,
    XCircle,
    AlertTriangle,
    Download
} from 'lucide-react';

const UserDetailModal = ({ user, onClose, updateUserStatus }) => {
    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
        { id: 'overview', label: 'Overview', icon: User },
        { id: 'courses', label: 'Courses', icon: BookOpen },
        { id: 'transactions', label: 'Transactions', icon: DollarSign },
        { id: 'activity', label: 'Activity', icon: Activity }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'member':
                return 'bg-green-100 text-green-800';
            case 'visitor':
                return 'bg-blue-100 text-blue-800';
            case 'suspended':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusOptions = () => {
        return [
            { value: 'member', label: 'Member', color: 'green' },
            { value: 'visitor', label: 'Visitor', color: 'blue' },
            { value: 'suspended', label: 'Suspended', color: 'red' }
        ];
    };

    const handleStatusChange = (newStatus) => {
        updateUserStatus(user.id, newStatus);
    };

    const mockCourses = [
        {
            id: 1,
            title: 'Basketball Fundamentals',
            progress: 75,
            status: 'active',
            enrolledDate: '2024-01-15',
            completionDate: null
        },
        {
            id: 2,
            title: 'Swimming for Beginners',
            progress: 100,
            status: 'completed',
            enrolledDate: '2024-02-01',
            completionDate: '2024-04-15'
        },
        {
            id: 3,
            title: 'Basic Martial Arts',
            progress: 45,
            status: 'active',
            enrolledDate: '2024-03-10',
            completionDate: null
        }
    ];

    const mockTransactions = [
        {
            id: 1,
            course: 'Basketball Fundamentals',
            amount: 'Rp 150K',
            date: '2024-01-15',
            status: 'completed',
            method: 'Bank Transfer'
        },
        {
            id: 2,
            course: 'Swimming for Beginners',
            amount: 'Rp 120K',
            date: '2024-02-01',
            status: 'completed',
            method: 'E-Wallet'
        },
        {
            id: 3,
            course: 'Basic Martial Arts',
            amount: 'Rp 180K',
            date: '2024-03-10',
            status: 'completed',
            method: 'Credit Card'
        }
    ];

    const mockActivity = [
        {
            id: 1,
            action: 'Completed lesson: Dribbling Basics',
            date: '2024-06-01 10:30',
            type: 'lesson'
        },
        {
            id: 2,
            action: 'Enrolled in Basketball Fundamentals',
            date: '2024-01-15 14:20',
            type: 'enrollment'
        },
        {
            id: 3,
            action: 'Updated profile information',
            date: '2024-05-28 09:15',
            type: 'profile'
        },
        {
            id: 4,
            action: 'Completed Swimming for Beginners course',
            date: '2024-04-15 16:45',
            type: 'completion'
        }
    ];

    const renderOverview = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <div>
                            <p className="text-sm text-gray-600">Email</p>
                            <p className="font-medium">{user.email}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <div>
                            <p className="text-sm text-gray-600">Phone</p>
                            <p className="font-medium">{user.phone}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div>
                            <p className="text-sm text-gray-600">Joined Date</p>
                            <p className="font-medium">{user.joined}</p>
                        </div>
                    </div>
                </div>
                
                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <BookOpen className="w-5 h-5 text-gray-400" />
                        <div>
                            <p className="text-sm text-gray-600">Courses Enrolled</p>
                            <p className="font-medium">{user.coursesEnrolled}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                        <DollarSign className="w-5 h-5 text-gray-400" />
                        <div>
                            <p className="text-sm text-gray-600">Total Spent</p>
                            <p className="font-medium">{user.totalSpent}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                        <Activity className="w-5 h-5 text-gray-400" />
                        <div>
                            <p className="text-sm text-gray-600">Last Active</p>
                            <p className="font-medium">{user.lastActive}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {user.paymentReceipt && (
                <div className="border-t pt-6">
                    <h4 className="font-medium text-gray-900 mb-3">Payment Receipt</h4>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">{user.paymentReceipt}</span>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            Download
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

    const renderCourses = () => (
        <div className="space-y-4">
            {mockCourses.map((course) => (
                <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{course.title}</h4>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            course.status === 'completed' 
                                ? 'bg-green-100 text-green-800'
                                : 'bg-blue-100 text-blue-800'
                        }`}>
                            {course.status}
                        </span>
                    </div>
                    
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${course.progress}%` }}
                            ></div>
                        </div>
                        
                        <div className="flex justify-between text-sm text-gray-600 mt-3">
                            <span>Enrolled: {course.enrolledDate}</span>
                            {course.completionDate && (
                                <span>Completed: {course.completionDate}</span>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderTransactions = () => (
        <div className="space-y-4">
            {mockTransactions.map((transaction) => (
                <div key={transaction.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{transaction.course}</h4>
                        <span className="font-bold text-green-600">{transaction.amount}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{transaction.date}</span>
                        <div className="flex items-center gap-2">
                            <span>{transaction.method}</span>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                                {transaction.status}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderActivity = () => (
        <div className="space-y-4">
            {mockActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 mt-2 rounded-full ${
                        activity.type === 'completion' ? 'bg-green-500' :
                        activity.type === 'enrollment' ? 'bg-blue-500' :
                        activity.type === 'lesson' ? 'bg-purple-500' :
                        'bg-gray-500'
                    }`}></div>
                    <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return renderOverview();
            case 'courses':
                return renderCourses();
            case 'transactions':
                return renderTransactions();
            case 'activity':
                return renderActivity();
            default:
                return renderOverview();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg">{user.avatar}</span>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                                    {user.status}
                                </span>
                                <select
                                    value={user.status}
                                    onChange={(e) => handleStatusChange(e.target.value)}
                                    className="text-xs border border-gray-300 rounded px-2 py-1"
                                >
                                    {getStatusOptions().map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6">
                        {tabs.map((tab) => {
                            const IconComponent = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                                        activeTab === tab.id
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    <IconComponent className="w-4 h-4" />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Content */}
                <div className="p-6 max-h-[60vh] overflow-y-auto">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default UserDetailModal;