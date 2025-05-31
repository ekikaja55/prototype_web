'use client'
import React from 'react';
import { Search, Plus, GraduationCap, Users, BookOpen, DollarSign, Star, Edit, Trash2, Phone, Mail, Award } from 'lucide-react';

const InstructorsTab = ({
    instructorsData,
    searchTerm,
    setSearchTerm,
    instructorFilter,
    setInstructorFilter,
    setShowCreateInstructor,
    setSelectedInstructor,
    setShowEditInstructor
}) => {
    const filteredInstructors = instructorsData.filter(instructor => {
        const matchesSearch = instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            instructor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            instructor.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = instructorFilter === 'all' || 
                            instructor.level.toLowerCase().includes(instructorFilter.toLowerCase()) ||
                            instructor.specialization.toLowerCase() === instructorFilter.toLowerCase();
        return matchesSearch && matchesFilter;
    });

    const handleEditInstructor = (instructor) => {
        setSelectedInstructor(instructor);
        setShowEditInstructor(true);
    };

    const getStatusBadge = (status) => {
        const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
        if (status === 'active') {
            return `${baseClasses} bg-green-100 text-green-800`;
        }
        return `${baseClasses} bg-gray-100 text-gray-800`;
    };

    const getLevelBadge = (level) => {
        const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
        if (level === 'Master Instructor') {
            return `${baseClasses} bg-purple-100 text-purple-800`;
        } else if (level === 'Senior Instructor') {
            return `${baseClasses} bg-blue-100 text-blue-800`;
        }
        return `${baseClasses} bg-gray-100 text-gray-800`;
    };

    const specializations = [...new Set(instructorsData.map(i => i.specialization))];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Instructors Management</h2>
                    <p className="text-gray-600">Manage all instructors and their profiles</p>
                </div>
                <button
                    onClick={() => setShowCreateInstructor(true)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add New Instructor
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Instructors</p>
                            <p className="text-2xl font-bold text-gray-900">{instructorsData.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <GraduationCap className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Master Instructors</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {instructorsData.filter(i => i.level === 'Master Instructor').length}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Award className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Students</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {instructorsData.reduce((sum, instructor) => sum + instructor.totalStudents, 0)}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <Users className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Specializations</p>
                            <p className="text-2xl font-bold text-gray-900">{specializations.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-orange-600" />
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
                            placeholder="Search instructors by name, specialization, or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <select
                        value={instructorFilter}
                        onChange={(e) => setInstructorFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="all">All Instructors</option>
                        <option value="master">Master Instructor</option>
                        <option value="senior">Senior Instructor</option>
                        {specializations.map(spec => (
                            <option key={spec} value={spec}>
                                {spec}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Instructors Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredInstructors.map((instructor) => (
                    <div key={instructor.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                        <span className="text-white font-semibold">
                                            {instructor.avatar}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{instructor.name}</h3>
                                        <p className="text-sm text-gray-600">{instructor.specialization}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className={getStatusBadge(instructor.status)}>
                                        {instructor.status}
                                    </span>
                                    <span className={getLevelBadge(instructor.level)}>
                                        {instructor.level.replace(' Instructor', '')}
                                    </span>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                {instructor.bio}
                            </p>

                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Mail className="w-4 h-4" />
                                    <span className="truncate">{instructor.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Phone className="w-4 h-4" />
                                    <span>{instructor.phone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Award className="w-4 h-4" />
                                    <span>{instructor.certification}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-4">
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 mb-1">
                                        <BookOpen className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">{instructor.totalCourses}</p>
                                    <p className="text-xs text-gray-600">Courses</p>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 mb-1">
                                        <Users className="w-4 h-4 text-green-600" />
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">{instructor.totalStudents}</p>
                                    <p className="text-xs text-gray-600">Students</p>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 mb-1">
                                        <Star className="w-4 h-4 text-yellow-500" />
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">{instructor.rating}</p>
                                    <p className="text-xs text-gray-600">Rating</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-1">
                                    <DollarSign className="w-4 h-4 text-green-600" />
                                    <span className="font-medium text-green-600">{instructor.totalRevenue}</span>
                                </div>
                                <span className="text-sm text-gray-600">{instructor.experience} exp</span>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEditInstructor(instructor)}
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

            {filteredInstructors.length === 0 && (
                <div className="text-center py-12">
                    <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No instructors found</h3>
                    <p className="text-gray-600 mb-6">
                        {searchTerm || instructorFilter !== 'all' 
                            ? 'Try adjusting your search or filter criteria.'
                            : 'Get started by adding your first instructor.'
                        }
                    </p>
                    {(!searchTerm && instructorFilter === 'all') && (
                        <button
                            onClick={() => setShowCreateInstructor(true)}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 mx-auto"
                        >
                            <Plus className="w-5 h-5" />
                            Add First Instructor
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default InstructorsTab;