'use client'
import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Clock, 
  Star, 
  Trophy, 
  Play, 
  CheckCircle, 
  Download,
  Filter,
  Search,
  Calendar,
  User,
  Award,
  BarChart3,
  ChevronDown,
  ExternalLink
} from 'lucide-react';

const CoursesTab = ({ enrolledCourses, setEnrolledCourses }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('progress');
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Get unique categories from courses
  const categories = useMemo(() => {
    const cats = enrolledCourses.map(course => course.category);
    return [...new Set(cats)];
  }, [enrolledCourses]);

  // Filter and sort courses
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = enrolledCourses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || course.status === filterStatus;
      const matchesCategory = filterCategory === 'all' || course.category === filterCategory;
      
      return matchesSearch && matchesStatus && matchesCategory;
    });

    // Sort courses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'progress':
          return b.progress - a.progress;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'enrollmentDate':
          return new Date(b.enrollmentDate) - new Date(a.enrollmentDate);
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filtered;
  }, [enrolledCourses, searchTerm, filterStatus, filterCategory, sortBy]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'active':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'intermediate':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'advanced':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const handleContinueCourse = (courseId) => {
    // Simulate continuing a course
    console.log('Continuing course:', courseId);
  };

  const handleDownloadCertificate = (certificate) => {
    // Simulate certificate download
    console.log('Downloading certificate:', certificate.id);
  };

  const CourseCard = ({ course }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="flex">
        {/* Course Image */}
        <div className="w-48 h-32 flex-shrink-0">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Course Content */}
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {course.title}
              </h3>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <User className="w-4 h-4 mr-1" />
                <span>{course.instructor}</span>
                <span className="mx-2">•</span>
                <span>{course.category}</span>
              </div>
            </div>
            
            <div className="flex flex-col items-end space-y-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(course.status)}`}>
                {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getLevelColor(course.level)}`}>
                {course.level}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm font-medium text-gray-900">{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{course.completedLessons}/{course.totalLessons} lessons</span>
              <span>{course.timeSpent}</span>
            </div>
          </div>

          {/* Course Stats */}
          <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
              <span>{course.rating}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Enrolled {formatDate(course.enrollmentDate)}</span>
            </div>
            {course.nextLessonDate && (
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>Next: {formatDate(course.nextLessonDate)}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              {course.status === 'active' && (
                <button
                  onClick={() => handleContinueCourse(course.id)}
                  className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  <Play className="w-4 h-4 mr-1" />
                  Continue
                </button>
              )}
              
              {course.status === 'completed' && course.certificate && (
                <button
                  onClick={() => handleDownloadCertificate(course.certificate)}
                  className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors duration-200"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Certificate
                </button>
              )}
              
              <button
                onClick={() => setSelectedCourse(course)}
                className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors duration-200"
              >
                <BarChart3 className="w-4 h-4 mr-1" />
                Details
              </button>
            </div>

            {course.nextLesson && (
              <div className="text-right text-sm">
                <div className="text-gray-600">Next Lesson:</div>
                <div className="font-medium text-gray-900">{course.nextLesson}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const CourseDetailModal = ({ course, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{course.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <span className="sr-only">Close</span>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <img
            src={course.image}
            alt={course.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Instructor</label>
                <p className="text-gray-900">{course.instructor}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Category</label>
                <p className="text-gray-900">{course.category}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Level</label>
                <p className="text-gray-900">{course.level}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Progress</label>
                <p className="text-gray-900">{course.progress}% ({course.completedLessons}/{course.totalLessons} lessons)</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Time Spent</label>
                <p className="text-gray-900">{course.timeSpent}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Rating</label>
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="text-gray-900">{course.rating}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm font-medium text-gray-500 block mb-2">Progress Overview</label>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>

          {course.certificate && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-green-900">Certificate Available</h4>
                  <p className="text-sm text-green-700">
                    Issued on {formatDate(course.certificate.issuedDate)}
                  </p>
                </div>
                <button
                  onClick={() => handleDownloadCertificate(course.certificate)}
                  className="inline-flex items-center px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors duration-200"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200"
            >
              Close
            </button>
            {course.status === 'active' && (
              <button
                onClick={() => handleContinueCourse(course.id)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                <Play className="w-4 h-4 mr-1" />
                Continue Learning
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-600">
            {enrolledCourses.length} course{enrolledCourses.length !== 1 ? 's' : ''} enrolled
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Courses</p>
              <p className="text-lg font-semibold text-gray-900">{enrolledCourses.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <p className="text-lg font-semibold text-gray-900">
                {enrolledCourses.filter(c => c.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">In Progress</p>
              <p className="text-lg font-semibold text-gray-900">
                {enrolledCourses.filter(c => c.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Trophy className="w-5 h-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Certificates</p>
              <p className="text-lg font-semibold text-gray-900">
                {enrolledCourses.filter(c => c.certificate).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search courses or instructors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="paused">Paused</option>
            </select>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="progress">Sort by Progress</option>
              <option value="title">Sort by Title</option>
              <option value="enrollmentDate">Sort by Date Enrolled</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Courses List */}
      <div className="space-y-4">
        {filteredAndSortedCourses.length > 0 ? (
          filteredAndSortedCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-500">
              {searchTerm || filterStatus !== 'all' || filterCategory !== 'all'
                ? 'Try adjusting your search or filters'
                : 'You haven\'t enrolled in any courses yet'}
            </p>
          </div>
        )}
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <CourseDetailModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
};

export default CoursesTab;


