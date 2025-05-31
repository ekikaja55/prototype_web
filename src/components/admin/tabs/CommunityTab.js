'use client'
import React, { useState } from 'react';
import { MessageSquare, Users, ThumbsUp, Flag, Eye, Search, Filter, Calendar, Star, Reply, MoreHorizontal } from 'lucide-react';

const CommunityTab = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Mock community data
    const communityStats = [
        { title: 'Total Posts', value: '1,247', change: '+15.2%', trend: 'up', icon: MessageSquare, color: 'blue' },
        { title: 'Active Users', value: '892', change: '+8.4%', trend: 'up', icon: Users, color: 'green' },
        { title: 'Total Likes', value: '5,632', change: '+12.8%', trend: 'up', icon: ThumbsUp, color: 'purple' },
        { title: 'Reported Posts', value: '23', change: '-5.2%', trend: 'down', icon: Flag, color: 'red' }
    ];

    const communityPosts = [
        {
            id: 1,
            author: 'Manachika',
            avatar: 'MC',
            title: 'Basketball shooting technique tips',
            content: 'Just finished Coach Ahmad\'s basketball course! Here are some shooting tips that really helped me improve my accuracy...',
            category: 'Basketball',
            timestamp: '2 hours ago',
            likes: 24,
            replies: 8,
            views: 156,
            status: 'active',
            isHighlighted: true
        },
        {
            id: 2,
            author: 'Bayu Aditya',
            avatar: 'BA',
            title: 'Swimming breathing techniques',
            content: 'For beginners struggling with breathing while swimming, I found these techniques from Coach Maria\'s course very helpful...',
            category: 'Swimming',
            timestamp: '4 hours ago',
            likes: 18,
            replies: 12,
            views: 203,
            status: 'active',
            isHighlighted: false
        },
        {
            id: 3,
            author: 'Dani Pratama',
            avatar: 'DP',
            title: 'Martial arts discipline and mindset',
            content: 'Sensei Budi always emphasizes the mental aspect of martial arts. Here\'s what I learned about developing the right mindset...',
            category: 'Martial Arts',
            timestamp: '1 day ago',
            likes: 32,
            replies: 15,
            views: 287,
            status: 'active',
            isHighlighted: false
        },
        {
            id: 4,
            author: 'Sari Indah',
            avatar: 'SI',
            title: 'Tennis serve improvement challenge',
            content: 'Started Coach Sarah\'s tennis course last week. My serve has improved dramatically! Who else is taking this course?',
            category: 'Tennis',
            timestamp: '2 days ago',
            likes: 15,
            replies: 6,
            views: 134,
            status: 'active',
            isHighlighted: false
        },
        {
            id: 5,
            author: 'Anonymous User',
            avatar: 'AU',
            title: 'Inappropriate content example',
            content: 'This post contains inappropriate content that needs moderation...',
            category: 'General',
            timestamp: '3 days ago',
            likes: 2,
            replies: 1,
            views: 45,
            status: 'flagged',
            isHighlighted: false
        }
    ];

    const filteredPosts = communityPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = activeFilter === 'all' || 
                            (activeFilter === 'flagged' && post.status === 'flagged') ||
                            (activeFilter === 'highlighted' && post.isHighlighted) ||
                            post.category.toLowerCase() === activeFilter.toLowerCase();
        return matchesSearch && matchesFilter;
    });

    const getStatusBadge = (status, isHighlighted) => {
        const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
        if (status === 'flagged') {
            return `${baseClasses} bg-red-100 text-red-800`;
        } else if (isHighlighted) {
            return `${baseClasses} bg-yellow-100 text-yellow-800`;
        }
        return `${baseClasses} bg-green-100 text-green-800`;
    };

    const handleModeratePost = (postId, action) => {
        console.log(`Moderating post ${postId} with action: ${action}`);
        // Here you would implement the moderation logic
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Community Management</h2>
                    <p className="text-gray-600">Monitor and manage community posts and interactions</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {communityStats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                    <p className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                        {stat.change}
                                    </p>
                                </div>
                                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                                    <IconComponent className={`w-6 h-6 text-${stat.color}-600`} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Filters and Search */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search posts by title, content, or author..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <select
                        value={activeFilter}
                        onChange={(e) => setActiveFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="all">All Posts</option>
                        <option value="highlighted">Highlighted</option>
                        <option value="flagged">Flagged</option>
                        <option value="basketball">Basketball</option>
                        <option value="swimming">Swimming</option>
                        <option value="martial arts">Martial Arts</option>
                        <option value="tennis">Tennis</option>
                        <option value="football">Football</option>
                    </select>
                </div>
            </div>

            {/* Community Posts */}
            <div className="space-y-4">
                {filteredPosts.map((post) => (
                    <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                    <span className="text-white font-semibold text-sm">
                                        {post.avatar}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">{post.author}</h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Calendar className="w-4 h-4" />
                                        <span>{post.timestamp}</span>
                                        <span>•</span>
                                        <span className="bg-gray-100 px-2 py-1 rounded text-xs">{post.category}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={getStatusBadge(post.status, post.isHighlighted)}>
                                    {post.status === 'flagged' ? 'Flagged' : post.isHighlighted ? 'Highlighted' : 'Active'}
                                </span>
                                <div className="relative">
                                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h4 className="font-medium text-gray-900 mb-2">{post.title}</h4>
                            <p className="text-gray-600 line-clamp-3">{post.content}</p>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <ThumbsUp className="w-4 h-4" />
                                    <span>{post.likes}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Reply className="w-4 h-4" />
                                    <span>{post.replies}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Eye className="w-4 h-4" />
                                    <span>{post.views}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {post.status === 'flagged' ? (
                                    <>
                                        <button
                                            onClick={() => handleModeratePost(post.id, 'approve')}
                                            className="px-3 py-1 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors duration-200 text-sm font-medium"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleModeratePost(post.id, 'remove')}
                                            className="px-3 py-1 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200 text-sm font-medium"
                                        >
                                            Remove
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleModeratePost(post.id, 'highlight')}
                                            className={`px-3 py-1 rounded-lg transition-colors duration-200 text-sm font-medium ${
                                                post.isHighlighted 
                                                    ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100' 
                                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                            }`}
                                        >
                                            {post.isHighlighted ? 'Un-highlight' : 'Highlight'}
                                        </button>
                                        <button
                                            onClick={() => handleModeratePost(post.id, 'flag')}
                                            className="px-3 py-1 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200 text-sm font-medium"
                                        >
                                            Flag
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                    <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
                    <p className="text-gray-600">
                        {searchTerm || activeFilter !== 'all' 
                            ? 'Try adjusting your search or filter criteria.'
                            : 'Community posts will appear here as users start engaging.'
                        }
                    </p>
                </div>
            )}
        </div>
    );
};

export default CommunityTab;