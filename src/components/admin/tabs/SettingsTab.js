'use client'
import React, { useState } from 'react';
import { 
    User, 
    Shield, 
    Bell, 
    Globe, 
    Database, 
    Mail,
    Smartphone,
    Eye,
    EyeOff,
    Save,
    Upload
} from 'lucide-react';

const SettingsTab = () => {
    const [activeSection, setActiveSection] = useState('general');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        // General Settings
        siteName: 'MySports.id',
        siteDescription: 'Premier sports learning platform in Indonesia',
        contactEmail: 'admin@mysports.id',
        supportPhone: '+62 812-3456-7890',
        
        // Admin Profile
        adminName: 'Administrator',
        adminEmail: 'admin@mysports.id',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        
        // Notifications
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: false,
        weeklyReports: true,
        
        // System Settings
        maintenanceMode: false,
        autoBackup: true,
        userRegistration: true,
        courseAutoApproval: false,
        
        // Email Settings
        smtpHost: 'smtp.gmail.com',
        smtpPort: '587',
        smtpUsername: 'noreply@mysports.id',
        smtpPassword: '',
        
        // Payment Settings
        paymentGateway: 'midtrans',
        paymentTestMode: false,
        merchantId: '',
        clientKey: '',
        serverKey: ''
    });

    const settingSections = [
        { id: 'general', label: 'General', icon: Globe },
        { id: 'profile', label: 'Admin Profile', icon: User },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'system', label: 'System', icon: Database },
        { id: 'email', label: 'Email Settings', icon: Mail },
        { id: 'security', label: 'Security', icon: Shield }
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleToggle = (field) => {
        setFormData(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleSave = () => {
        // Handle save logic here
        alert('Settings saved successfully!');
    };

    const renderGeneralSettings = () => (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site Name
                    </label>
                    <input
                        type="text"
                        value={formData.siteName}
                        onChange={(e) => handleInputChange('siteName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Email
                    </label>
                    <input
                        type="email"
                        value={formData.contactEmail}
                        onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Description
                </label>
                <textarea
                    value={formData.siteDescription}
                    onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Support Phone
                </label>
                <input
                    type="tel"
                    value={formData.supportPhone}
                    onChange={(e) => handleInputChange('supportPhone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
        </div>
    );

    const renderProfileSettings = () => (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Admin Profile</h3>
            
            <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">A</span>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Change Avatar
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Admin Name
                    </label>
                    <input
                        type="text"
                        value={formData.adminName}
                        onChange={(e) => handleInputChange('adminName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Admin Email
                    </label>
                    <input
                        type="email"
                        value={formData.adminEmail}
                        onChange={(e) => handleInputChange('adminEmail', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={formData.currentPassword}
                            onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={formData.newPassword}
                        onChange={(e) => handleInputChange('newPassword', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>
        </div>
    );

    const renderNotificationSettings = () => (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
            
            <div className="space-y-4">
                {[
                    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
                    { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive browser push notifications' },
                    { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Receive notifications via SMS' },
                    { key: 'weeklyReports', label: 'Weekly Reports', desc: 'Receive weekly summary reports' }
                ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <h4 className="font-medium text-gray-900">{item.label}</h4>
                            <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData[item.key]}
                                onChange={() => handleToggle(item.key)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderSystemSettings = () => (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">System Settings</h3>
            
            <div className="space-y-4">
                {[
                    { key: 'maintenanceMode', label: 'Maintenance Mode', desc: 'Enable maintenance mode for the site' },
                    { key: 'autoBackup', label: 'Auto Backup', desc: 'Automatically backup data daily' },
                    { key: 'userRegistration', label: 'User Registration', desc: 'Allow new user registrations' },
                    { key: 'courseAutoApproval', label: 'Course Auto Approval', desc: 'Automatically approve new courses' }
                ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <h4 className="font-medium text-gray-900">{item.label}</h4>
                            <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData[item.key]}
                                onChange={() => handleToggle(item.key)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderEmailSettings = () => (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Email Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        SMTP Host
                    </label>
                    <input
                        type="text"
                        value={formData.smtpHost}
                        onChange={(e) => handleInputChange('smtpHost', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        SMTP Port
                    </label>
                    <input
                        type="text"
                        value={formData.smtpPort}
                        onChange={(e) => handleInputChange('smtpPort', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        SMTP Username
                    </label>
                    <input
                        type="text"
                        value={formData.smtpUsername}
                        onChange={(e) => handleInputChange('smtpUsername', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        SMTP Password
                    </label>
                    <input
                        type="password"
                        value={formData.smtpPassword}
                        onChange={(e) => handleInputChange('smtpPassword', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>
        </div>
    );

    const renderSecuritySettings = () => (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                    <Shield className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
                    <div>
                        <h4 className="text-sm font-medium text-yellow-800">Security Notice</h4>
                        <p className="text-sm text-yellow-700 mt-1">
                            Keep your admin credentials secure and update passwords regularly.
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="space-y-4">
                <button className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-600 mt-1">Add an extra layer of security to your account</p>
                    <span className="text-sm text-blue-600 mt-2 inline-block">Configure →</span>
                </button>
                
                <button className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    <h4 className="font-medium text-gray-900">Login History</h4>
                    <p className="text-sm text-gray-600 mt-1">View recent login attempts and sessions</p>
                    <span className="text-sm text-blue-600 mt-2 inline-block">View History →</span>
                </button>
                
                <button className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    <h4 className="font-medium text-gray-900">API Keys</h4>
                    <p className="text-sm text-gray-600 mt-1">Manage API keys for third-party integrations</p>
                    <span className="text-sm text-blue-600 mt-2 inline-block">Manage Keys →</span>
                </button>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeSection) {
            case 'general':
                return renderGeneralSettings();
            case 'profile':
                return renderProfileSettings();
            case 'notifications':
                return renderNotificationSettings();
            case 'system':
                return renderSystemSettings();
            case 'email':
                return renderEmailSettings();
            case 'security':
                return renderSecuritySettings();
            default:
                return renderGeneralSettings();
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
                    <p className="text-gray-600 mt-1">Manage your application settings and preferences</p>
                </div>
                <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                    <Save className="w-4 h-4" />
                    Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Settings Navigation */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm p-4">
                        <nav className="space-y-2">
                            {settingSections.map((section) => {
                                const IconComponent = section.icon;
                                return (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                                            activeSection === section.id
                                                ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                                                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                    >
                                        <IconComponent className="w-4 h-4 mr-3 flex-shrink-0" />
                                        {section.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </div>

                {/* Settings Content */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsTab;