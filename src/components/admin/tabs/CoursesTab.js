'use client'
import React from 'react';
import { Search, Plus, Filter, BookOpen, Users, Star, DollarSign, Edit, Trash2, Eye } from 'lucide-react';

const CoursesTab = ({
    coursesData,
    categories,
    searchTerm,
    setSearchTerm,
    courseFilter,
    setCourseFilter,
    setShowCreateCourse,
    setShowCategoryModal,
    setSelectedCourse,
    setShowEditCourse
}) => {
    const filteredCourses = coursesData.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = courseFilter === 'all' || 
                            (courseFilter === 'active' && course.status === 'active') ||
                            (courseFilter === 'draft' && course.status === 'draft') ||
                            course.category.toLowerCase() === courseFilter.toLowerCase();
        return matchesSearch && matchesFilter;
    });

    const handleEditCourse = (course) => {
        setSelectedCourse(course);
        setShowEditCourse(true);
    };

    const getStatusBadge = (status) => {
        const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
        if (status === 'active') {
            return `${baseClasses} bg-green-100 text-green-800`;
        } else if (status === 'draft') {
            return `${baseClasses} bg-yellow-100 text-yellow-800`;
        }
        return `${baseClasses} bg-gray-100 text-gray-800`;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Courses Management</h2>
                    <p className="text-gray-600">Manage all courses and categories</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={() => setShowCategoryModal(true)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2"
                    >
                        <Filter className="w-4 h-4" />
                        Manage Categories
                    </button>
                    <button
                        onClick={() => setShowCreateCourse(true)}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Add New Course
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Courses</p>
                            <p className="text-2xl font-bold text-gray-900">{coursesData.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Active Courses</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {coursesData.filter(c => c.status === 'active').length}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <Eye className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Students</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {coursesData.reduce((sum, course) => sum + course.students, 0)}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Users className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Categories</p>
                            <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                            <Filter className="w-6 h-6 text-orange-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search courses by title, category, or instructor..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <select
                        value={courseFilter}
                        onChange={(e) => setCourseFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="all">All Courses</option>
                        <option value="active">Active</option>
                        <option value="draft">Draft</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                    <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
                        <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                            <BookOpen className="w-16 h-16 text-gray-400" />
                        </div>
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="font-semibold text-gray-900 text-lg line-clamp-2">
                                    {course.title}
                                </h3>
                                <span className={getStatusBadge(course.status)}>
                                    {course.status}
                                </span>
                            </div>
                            
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                {course.shortDesc}
                            </p>
                            
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Category:</span>
                                    <span className="font-medium text-gray-900">{course.category}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Instructor:</span>
                                    <span className="font-medium text-gray-900">{course.instructor}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Students:</span>
                                    <span className="font-medium text-gray-900">{course.students.toLocaleString()}</span>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                    <span className="font-medium text-gray-900">{course.rating}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <DollarSign className="w-4 h-4 text-green-600" />
                                    <span className="font-medium text-green-600">{course.revenue}</span>
                                </div>
                            </div>
                            
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEditCourse(course)}
                                    className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center gap-2 text-sm font-medium"
                                >
                                    <Edit className="w-4 h-4" />
                                    Edit
                                </button>
                                <button className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200 flex items-center justify-center gap-2 text-sm font-medium">
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredCourses.length === 0 && (
                <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
                    <p className="text-gray-600 mb-6">
                        {searchTerm || courseFilter !== 'all' 
                            ? 'Try adjusting your search or filter criteria.'
                            : 'Get started by creating your first course.'
                        }
                    </p>
                    {(!searchTerm && courseFilter === 'all') && (
                        <button
                            onClick={() => setShowCreateCourse(true)}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 mx-auto"
                        >
                            <Plus className="w-5 h-5" />
                            Create First Course
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default CoursesTab;