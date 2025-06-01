'use client'
import React, { useState } from 'react';
import { Play, Users, Trophy, BookOpen, ArrowRight, Star, Clock, Award, Filter, Search, ChevronDown, Calendar, MapPin, User } from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';

const page = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedLevel, setSelectedLevel] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const categories = [
        { name: 'All', icon: '🏆', count: 24 },
        { name: 'Ball Sports', icon: '⚽', count: 8 },
        { name: 'Water Sports', icon: '🏊', count: 4 },
        { name: 'Combat Sports', icon: '🥋', count: 6 },
        { name: 'Racket Sports', icon: '🎾', count: 4 },
        { name: 'Individual Sports', icon: '🏃', count: 2 }
    ];

    const courses = [
        // Ball Sports
        {
            id: 1,
            title: "Football Mastery Program",
            category: "Ball Sports",
            level: "Intermediate",
            instructor: "Coach Bima Sakti",
            image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=250&fit=crop",
            rating: 4.9,
            students: 2840,
            duration: "12 weeks",
            price: "Rp 750,000",
            originalPrice: "Rp 1,200,000",
            description: "Master the fundamentals of football with professional techniques and tactical understanding.",
            features: ["Live Training Sessions", "Personal Feedback", "Team Tactics", "Physical Conditioning"],
            nextSession: "Dec 15, 2024"
        },
        {
            id: 2,
            title: "Basketball Skills Academy",
            category: "Ball Sports",
            level: "Beginner",
            instructor: "Coach Andakara Prastawa",
            image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=250&fit=crop",
            rating: 4.8,
            students: 1950,
            duration: "10 weeks",
            price: "Rp 650,000",
            originalPrice: "Rp 950,000",
            description: "Learn basketball fundamentals from dribbling to shooting with former professional players.",
            features: ["Shooting Techniques", "Ball Handling", "Defense Strategies", "Game Analysis"],
            nextSession: "Dec 18, 2024"
        },
        {
            id: 3,
            title: "Volleyball Championship Training",
            category: "Ball Sports",
            level: "Advanced",
            instructor: "Coach Megawati Pertiwi",
            image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=400&h=250&fit=crop",
            rating: 4.9,
            students: 1240,
            duration: "14 weeks",
            price: "Rp 850,000",
            originalPrice: "Rp 1,300,000",
            description: "Advanced volleyball techniques for competitive play and championship preparation.",
            features: ["Spike Techniques", "Block & Defense", "Team Coordination", "Match Strategy"],
            nextSession: "Dec 20, 2024"
        },

        // Water Sports
        {
            id: 4,
            title: "Swimming Excellence Program",
            category: "Water Sports",
            level: "Beginner",
            instructor: "Coach Yudi Darma",
            image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=250&fit=crop",
            rating: 4.7,
            students: 1680,
            duration: "8 weeks",
            price: "Rp 550,000",
            originalPrice: "Rp 800,000",
            description: "Learn all swimming strokes from basic floating to competitive techniques.",
            features: ["4 Swimming Strokes", "Breathing Techniques", "Water Safety", "Endurance Building"],
            nextSession: "Dec 16, 2024"
        },
        {
            id: 5,
            title: "Competitive Swimming Training",
            category: "Water Sports",
            level: "Advanced",
            instructor: "Coach Siman Sudartawa",
            image: "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=400&h=250&fit=crop",
            rating: 4.8,
            students: 920,
            duration: "16 weeks",
            price: "Rp 1,200,000",
            originalPrice: "Rp 1,800,000",
            description: "Professional swimming training for competitive athletes and championship preparation.",
            features: ["Race Preparation", "Technique Refinement", "Performance Analysis", "Mental Training"],
            nextSession: "Dec 22, 2024"
        },

        // Combat Sports
        {
            id: 6,
            title: "Karate Traditional & Modern",
            category: "Combat Sports",
            level: "Beginner",
            instructor: "Sensei Hiroshi Tanaka",
            image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=400&h=250&fit=crop",
            rating: 4.9,
            students: 2100,
            duration: "12 weeks",
            price: "Rp 700,000",
            originalPrice: "Rp 1,000,000",
            description: "Learn traditional karate techniques combined with modern self-defense applications.",
            features: ["Basic Kata", "Self Defense", "Sparring Training", "Philosophy & Discipline"],
            nextSession: "Dec 17, 2024"
        },
        {
            id: 7,
            title: "Muay Thai Fighter Program",
            category: "Combat Sports",
            level: "Intermediate",
            instructor: "Kru Somchai Jaidee",
            image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&h=250&fit=crop",
            rating: 4.8,
            students: 1450,
            duration: "14 weeks",
            price: "Rp 900,000",
            originalPrice: "Rp 1,400,000",
            description: "Intensive Muay Thai training focusing on technique, conditioning, and ring preparation.",
            features: ["Striking Techniques", "Clinch Work", "Pad Training", "Ring Experience"],
            nextSession: "Dec 19, 2024"
        },

        // Racket Sports
        {
            id: 8,
            title: "Tennis Pro Academy",
            category: "Racket Sports",
            level: "Intermediate",
            instructor: "Coach Maria Santos",
            image: "https://images.unsplash.com/photo-1526232761682-d26066ba4da3?w=400&h=250&fit=crop",
            rating: 4.8,
            students: 1320,
            duration: "10 weeks",
            price: "Rp 800,000",
            originalPrice: "Rp 1,200,000",
            description: "Develop professional tennis skills with focus on technique, strategy, and mental game.",
            features: ["Serve & Return", "Court Strategy", "Match Play", "Mental Training"],
            nextSession: "Dec 21, 2024"
        },
        {
            id: 9,
            title: "Badminton Championship Course",
            category: "Racket Sports",
            level: "Advanced",
            instructor: "Coach Taufik Hidayat",
            image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=250&fit=crop",
            rating: 4.9,
            students: 1890,
            duration: "12 weeks",
            price: "Rp 750,000",
            originalPrice: "Rp 1,100,000",
            description: "Master badminton with Olympic-level techniques and championship strategies.",
            features: ["Advanced Techniques", "Tournament Prep", "Strategy & Tactics", "Physical Training"],
            nextSession: "Dec 23, 2024"
        },

        // Individual Sports
        {
            id: 10,
            title: "Athletics & Track Field",
            category: "Individual Sports",
            level: "Beginner",
            instructor: "Coach Lalu Zohri",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
            rating: 4.7,
            students: 980,
            duration: "8 weeks",
            price: "Rp 500,000",
            originalPrice: "Rp 750,000",
            description: "Comprehensive athletics training covering sprints, jumps, and throws.",
            features: ["Sprint Techniques", "Jump Training", "Throwing Events", "Speed Development"],
            nextSession: "Dec 24, 2024"
        }
    ];

    const filteredCourses = courses.filter(course => {
        const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
        const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesCategory && matchesLevel && matchesSearch;
    });

    const getLevelColor = (level) => {
        switch (level) {
            case 'Beginner': return 'bg-green-100 text-green-700';
            case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
            case 'Advanced': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <Navbar />

            {/* Header Section */}
            <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 mt-20">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Explore Our{' '}
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                                Sports Courses
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                            Choose from our comprehensive collection of sports training programs designed by professional athletes and certified coaches
                        </p>
                    </div>

                    {/* Search and Filters */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
                        <div className="flex flex-col lg:flex-row gap-4 items-center">
                            {/* Search */}
                            <div className="relative flex-1 w-full">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search courses or instructors..."
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Level Filter */}
                            <div className="relative">
                                <select
                                    value={selectedLevel}
                                    onChange={(e) => setSelectedLevel(e.target.value)}
                                    className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none min-w-32"
                                >
                                    <option value="All">All Levels</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="flex flex-wrap gap-3 mb-8 justify-center">
                        {categories.map((category) => (
                            <button
                                key={category.name}
                                onClick={() => setSelectedCategory(category.name)}
                                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${selectedCategory === category.name
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
                                    }`}
                            >
                                <span className="text-lg">{category.icon}</span>
                                <span>{category.name}</span>
                                <span className={`text-xs px-2 py-1 rounded-full ${selectedCategory === category.name ? 'bg-white/20' : 'bg-gray-100'
                                    }`}>
                                    {category.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Courses Grid */}
            <section className="pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCourses.map((course) => (
                            <div key={course.id} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                                {/* Course Image */}
                                <div className="relative overflow-hidden">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                                            {course.level}
                                        </span>
                                    </div>
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                                        <Trophy className="w-4 h-4 text-yellow-500" />
                                    </div>
                                    {course.originalPrice && (
                                        <div className="absolute bottom-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                            Save {Math.round(((parseInt(course.originalPrice.replace(/\D/g, '')) - parseInt(course.price.replace(/\D/g, ''))) / parseInt(course.originalPrice.replace(/\D/g, '')) * 100))}%
                                        </div>
                                    )}
                                </div>

                                {/* Course Content */}
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                            {course.category}
                                        </span>
                                        <div className="flex items-center space-x-1">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span className="text-sm font-medium text-gray-600">{course.rating}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                        {course.title}
                                    </h3>

                                    <div className="flex items-center space-x-2 mb-3">
                                        <User className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-600">{course.instructor}</span>
                                    </div>

                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                        {course.description}
                                    </p>

                                    {/* Course Stats */}
                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                        <div className="flex items-center space-x-1">
                                            <Users className="w-4 h-4" />
                                            <span>{course.students.toLocaleString()} students</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Clock className="w-4 h-4" />
                                            <span>{course.duration}</span>
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="mb-4">
                                        <div className="flex flex-wrap gap-1">
                                            {course.features.slice(0, 2).map((feature, index) => (
                                                <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                                    {feature}
                                                </span>
                                            ))}
                                            {course.features.length > 2 && (
                                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                                    +{course.features.length - 2} more
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Next Session */}
                                    <div className="flex items-center space-x-2 mb-4 text-sm text-green-600">
                                        <Calendar className="w-4 h-4" />
                                        <span>Next session: {course.nextSession}</span>
                                    </div>

                                    {/* Price and CTA */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-2xl font-bold text-gray-900">{course.price}</span>
                                                {course.originalPrice && (
                                                    <span className="text-sm text-gray-500 line-through">{course.originalPrice}</span>
                                                )}
                                            </div>
                                        </div>
                                        <Link href={'/transaction/payment'} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                                            <span>Enroll Now</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* No Results */}
                    {filteredCourses.length === 0 && (
                        <div className="text-center py-16">
                            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <BookOpen className="w-16 h-16 text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">No courses found</h3>
                            <p className="text-gray-600 mb-6">Try adjusting your search criteria or browse all categories</p>
                            <button
                                onClick={() => {
                                    setSelectedCategory('All');
                                    setSelectedLevel('All');
                                    setSearchTerm('');
                                }}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                        Ready to Start Your Sports Journey?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Join thousands of athletes who have transformed their skills with our expert-led courses
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            Browse All Courses
                        </button>
                        <button className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
                            Contact Support
                        </button>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default page;