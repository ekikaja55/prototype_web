'use client';
import { useState, useEffect } from 'react';
import { Trophy, Shield, ChevronDown, X, Menu } from 'lucide-react';
import Link from 'next/link';
const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMenuOpen && !event.target.closest('nav')) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isMenuOpen]);

    // Close admin dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isAdminDropdownOpen && !event.target.closest('.admin-dropdown')) {
                setIsAdminDropdownOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isAdminDropdownOpen]);

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Courses', href: '/courses' },
        { name: 'Community', href: '/community' },
        { name: 'About Us', href: '/about' }
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrollY > 50
            ? 'bg-white/80 backdrop-blur-xl shadow-xl border-b border-white/20'
            : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3">
                        <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <Trophy className="w-6 h-6 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
                        </div>
                        <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                            MySports.id
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link key={item.name} href={item.href} className="relative text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium group">
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}

                        {/* Admin Dropdown */}
                        <div className="relative admin-dropdown">
                            <button
                                onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
                                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                            >
                                <Shield className="w-4 h-4" />
                                <span>Admin</span>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isAdminDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isAdminDropdownOpen && (
                                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in slide-in-from-top-2 duration-200">
                                    <Link href="/admin/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                        Dashboard
                                    </Link>
                                    <Link href="/admin/users" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                        User Management
                                    </Link>
                                    <Link href="/admin/courses" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                        Course Management
                                    </Link>
                                    <hr className="my-1 border-gray-100" />
                                    <Link href="/admin/settings" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                        Settings
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <Link href="/auth" className="text-gray-700 hover:text-blue-600 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-blue-50">
                            Login
                        </Link>
                        <Link href="/auth" className="bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5">
                            Register
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors z-50"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsMenuOpen(!isMenuOpen);
                        }}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-xl">
                    <div className="px-4 py-6 space-y-4 max-h-screen overflow-y-auto">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="border-t border-gray-200 pt-4">
                            <Link
                                href="/admin"
                                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Shield className="w-4 h-4" />
                                <span>Admin Dashboard</span>
                            </Link>
                        </div>
                        <div className="flex flex-col space-y-3 pt-4">
                            <Link
                                href="/login"
                                className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2 text-left"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold text-center"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar;
