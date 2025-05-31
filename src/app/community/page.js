'use client'
import React, { useState } from 'react';
import { ArrowUp, ArrowDown, MessageCircle, Share, Bookmark, Trophy, Flame, TrendingUp, Users, Search, Filter, Plus, Eye, Heart, Star, Calendar, Tag } from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const page = () => {
    const [activeFilter, setActiveFilter] = useState('hot');
    const [activeCategory, setActiveCategory] = useState('all');
    const [votedPosts, setVotedPosts] = useState({});

    const categories = [
        { id: 'all', name: 'All Sports', icon: Trophy, color: 'text-blue-600' },
        { id: 'football', name: 'Football', icon: '⚽', color: 'text-green-600' },
        { id: 'basketball', name: 'Basketball', icon: '🏀', color: 'text-orange-600' },
        { id: 'swimming', name: 'Swimming', icon: '🏊', color: 'text-blue-500' },
        { id: 'martial-arts', name: 'Martial Arts', icon: '🥋', color: 'text-red-600' },
        { id: 'tennis', name: 'Tennis', icon: '🎾', color: 'text-yellow-600' }
    ];

    const posts = [
        {
            id: 1,
            title: "Just completed my first marathon! Here's what I learned",
            content: "After 6 months of training with MySports.id, I finally did it! The nutrition plan and progressive training schedule were game-changers. Here are my top 5 tips for fellow beginners...",
            author: "RunnerPrima",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
            category: "running",
            upvotes: 127,
            downvotes: 3,
            comments: 24,
            timeAgo: "2 hours ago",
            flair: "Achievement",
            flairColor: "bg-green-100 text-green-700",
            isHot: true,
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=300&fit=crop"
        },
        {
            id: 2,
            title: "Best protein sources for muscle recovery?",
            content: "I've been training hard for 3 months now and wondering about optimal protein intake. What are your go-to sources? Currently using whey but looking for natural alternatives...",
            author: "FitnessAnanda",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
            category: "nutrition",
            upvotes: 89,
            downvotes: 2,
            comments: 31,
            timeAgo: "4 hours ago",
            flair: "Question",
            flairColor: "bg-blue-100 text-blue-700",
            isHot: false
        },
        {
            id: 3,
            title: "Weekly Football Training Schedule - Feel free to use!",
            content: "Created this comprehensive training plan based on what I learned from Coach Rahman. Includes technical skills, conditioning, and tactical awareness. PDF in comments!",
            author: "CoachBayu",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
            category: "football",
            upvotes: 203,
            downvotes: 8,
            comments: 45,
            timeAgo: "6 hours ago",
            flair: "Resource",
            flairColor: "bg-purple-100 text-purple-700",
            isHot: true,
            isPinned: true
        },
        {
            id: 4,
            title: "Swimming technique critique - Help me improve my freestyle",
            content: "Posted a video of my freestyle stroke. Been working on it for weeks but still feel like something's off. Any coaches or experienced swimmers willing to give feedback?",
            author: "SwimmerDini",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
            category: "swimming",
            upvotes: 56,
            downvotes: 1,
            comments: 18,
            timeAgo: "8 hours ago",
            flair: "Feedback",
            flairColor: "bg-yellow-100 text-yellow-700",
            isHot: false,
            hasVideo: true
        },
        {
            id: 5,
            title: "Local basketball tournament this weekend - who's joining?",
            content: "Organizing a friendly tournament at GBK Sports Center. All skill levels welcome! Registration fee goes to local sports development. Let's build our community!",
            author: "HoopMaster",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
            category: "basketball",
            upvotes: 94,
            downvotes: 4,
            comments: 22,
            timeAgo: "12 hours ago",
            flair: "Event",
            flairColor: "bg-orange-100 text-orange-700",
            isHot: false
        }
    ];

    const handleVote = (postId, voteType) => {
        setVotedPosts(prev => ({
            ...prev,
            [postId]: prev[postId] === voteType ? null : voteType
        }));
    };

    const getVoteButtonClass = (postId, voteType) => {
        const voted = votedPosts[postId];
        if (voted === voteType) {
            return voteType === 'up'
                ? 'text-orange-500 bg-orange-50 hover:bg-orange-100'
                : 'text-blue-500 bg-blue-50 hover:bg-blue-100';
        }
        return 'text-gray-400 hover:text-gray-600 hover:bg-gray-50';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-4">
                        <div className="flex items-center justify-between mb-4 mt-[15vh]">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">MySports Community</h1>
                                <p className="text-gray-600 mt-1">Connect, share, and grow with fellow athletes</p>
                            </div>
                            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
                                <Plus className="w-4 h-4" />
                                <span className="hidden sm:inline">Create Post</span>
                            </button>
                        </div>

                        {/* Search and Filters */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search posts, users, or topics..."
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div className="flex space-x-2">
                                {[
                                    { id: 'hot', icon: Flame, label: 'Hot' },
                                    { id: 'new', icon: TrendingUp, label: 'New' },
                                    { id: 'top', icon: Trophy, label: 'Top' }
                                ].map(filter => (
                                    <button
                                        key={filter.id}
                                        onClick={() => setActiveFilter(filter.id)}
                                        className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${activeFilter === filter.id
                                            ? 'bg-blue-600 text-white shadow-lg'
                                            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                                            }`}
                                    >
                                        <filter.icon className="w-4 h-4" />
                                        <span className="hidden sm:inline">{filter.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 space-y-6">
                            {/* Categories */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                                    <Tag className="w-5 h-5" />
                                    <span>Categories</span>
                                </h3>
                                <div className="space-y-2">
                                    {categories.map(category => (
                                        <button
                                            key={category.id}
                                            onClick={() => setActiveCategory(category.id)}
                                            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl transition-all duration-300 ${activeCategory === category.id
                                                ? 'bg-blue-50 text-blue-600 border border-blue-200'
                                                : 'hover:bg-gray-50 text-gray-700'
                                                }`}
                                        >
                                            {typeof category.icon === 'string' ? (
                                                <span className="text-xl">{category.icon}</span>
                                            ) : (
                                                <category.icon className={`w-5 h-5 ${category.color}`} />
                                            )}
                                            <span className="font-medium">{category.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Community Stats */}
                            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Community Stats</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Active Members</span>
                                        <span className="font-bold text-blue-600">12,340</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Posts Today</span>
                                        <span className="font-bold text-green-600">147</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Online Now</span>
                                        <span className="font-bold text-orange-600">892</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="space-y-6">
                            {posts.map(post => (
                                <div key={post.id} className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 ${post.isPinned ? 'ring-2 ring-blue-200' : ''}`}>
                                    {post.isPinned && (
                                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 text-sm font-medium flex items-center space-x-2">
                                            <Star className="w-4 h-4" />
                                            <span>Pinned Post</span>
                                        </div>
                                    )}

                                    <div className="p-6">
                                        {/* Post Header */}
                                        <div className="flex items-start space-x-4 mb-4">
                                            <img
                                                src={post.avatar}
                                                alt={post.author}
                                                className="w-10 h-10 rounded-full object-cover shadow-md"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center space-x-2 mb-1">
                                                    <span className="font-semibold text-gray-900">{post.author}</span>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${post.flairColor}`}>
                                                        {post.flair}
                                                    </span>
                                                    {post.isHot && (
                                                        <div className="flex items-center space-x-1 text-orange-500">
                                                            <Flame className="w-4 h-4" />
                                                            <span className="text-xs font-medium">Hot</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>{post.timeAgo}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Post Content */}
                                        <div className="mb-4">
                                            <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer transition-colors duration-300">
                                                {post.title}
                                            </h2>
                                            <p className="text-gray-700 leading-relaxed">{post.content}</p>
                                        </div>

                                        {/* Post Image */}
                                        {post.image && (
                                            <div className="mb-4 -mx-6">
                                                <img
                                                    src={post.image}
                                                    alt="Post content"
                                                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                                                />
                                            </div>
                                        )}

                                        {/* Post Actions */}
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <div className="flex items-center space-x-1">
                                                <button
                                                    onClick={() => handleVote(post.id, 'up')}
                                                    className={`p-2 rounded-xl transition-all duration-300 ${getVoteButtonClass(post.id, 'up')}`}
                                                >
                                                    <ArrowUp className="w-5 h-5" />
                                                </button>
                                                <span className="font-semibold text-gray-900 min-w-[3rem] text-center">
                                                    {post.upvotes - post.downvotes}
                                                </span>
                                                <button
                                                    onClick={() => handleVote(post.id, 'down')}
                                                    className={`p-2 rounded-xl transition-all duration-300 ${getVoteButtonClass(post.id, 'down')}`}
                                                >
                                                    <ArrowDown className="w-5 h-5" />
                                                </button>
                                            </div>

                                            <div className="flex items-center space-x-4">
                                                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-300">
                                                    <MessageCircle className="w-5 h-5" />
                                                    <span className="font-medium">{post.comments}</span>
                                                </button>
                                                <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors duration-300">
                                                    <Share className="w-5 h-5" />
                                                    <span className="font-medium hidden sm:inline">Share</span>
                                                </button>
                                                <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors duration-300">
                                                    <Bookmark className="w-5 h-5" />
                                                    <span className="font-medium hidden sm:inline">Save</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Load More */}
                        <div className="text-center mt-12">
                            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
                                Load More Posts
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default page;