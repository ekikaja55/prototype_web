'use client';
import { Trophy } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                                <Trophy className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold">MySports.id</span>
                        </div>
                        <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-md">
                            Empowering athletes across Indonesia with world-class sports education, expert coaching, and a supportive community.
                        </p>
                        <div className="flex space-x-4">
                            {['Facebook', 'Instagram', 'Twitter', 'YouTube'].map((social) => (
                                <Link key={social} href={`/${social.toLowerCase()}`} className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-110">
                                    <span className="sr-only">{social}</span>
                                    <div className="w-5 h-5 bg-gray-400 rounded-sm"></div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            {['About Us', 'Courses', 'Community', 'Blog', 'Success Stories', 'Contact'].map((link) => (
                                <li key={link}>
                                    <Link href={`/${link.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-white transition-colors duration-300">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-6">Support</h3>
                        <ul className="space-y-4">
                            {['Help Center', 'Privacy Policy', 'Terms of Service', 'FAQ', 'Student Support', 'Coach Portal'].map((link) => (
                                <li key={link}>
                                    <Link href={`/${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-400 hover:text-white transition-colors duration-300">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-400">
                            © {new Date().getFullYear()} MySports.id. All rights reserved.
                        </p>
                        <div className="flex items-center space-x-6 text-gray-400">
                            <span>Made with ❤️ in Indonesia</span>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-sm">System Status: All Good</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;