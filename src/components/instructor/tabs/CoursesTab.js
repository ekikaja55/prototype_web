'use client'
import React, { useState } from 'react';
import { Upload, Play, Eye, Clock, Users, BookOpen, FileVideo, Plus, X, Check } from 'lucide-react';

const CoursesTab = ({ 
  assignedCourses, 
  setAssignedCourses, 
  uploadedVideos, 
  setUploadedVideos, 
  instructorProfile 
}) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    lessonNumber: '',
    description: '',
    file: null
  });
  const [dragActive, setDragActive] = useState(false);

  // Handle file upload
  const handleFileUpload = (files) => {
    const file = files[0];
    if (file && file.type.includes('video')) {
      setUploadForm(prev => ({ ...prev, file }));
    }
  };

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  // Submit video upload
  const handleSubmitVideo = () => {
    if (!uploadForm.title || !uploadForm.lessonNumber || !uploadForm.file) return;

    const newVideo = {
      id: uploadedVideos.length + 1,
      courseId: selectedCourse.id,
      title: uploadForm.title,
      filename: uploadForm.file.name,
      duration: '00:00', // Will be processed
      size: `${(uploadForm.file.size / (1024 * 1024)).toFixed(1)} MB`,
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'processing',
      views: 0,
      lessonNumber: parseInt(uploadForm.lessonNumber),
      description: uploadForm.description
    };

    setUploadedVideos(prev => [...prev, newVideo]);
    
    // Update course progress
    setAssignedCourses(prev => prev.map(course => 
      course.id === selectedCourse.id 
        ? { 
            ...course, 
            uploadedVideos: course.uploadedVideos + 1,
            pendingVideos: course.pendingVideos - 1
          }
        : course
    ));

    // Reset form
    setUploadForm({ title: '', lessonNumber: '', description: '', file: null });
    setShowUploadModal(false);
  };

  // Get videos for selected course
  const getCourseVideos = (courseId) => {
    return uploadedVideos.filter(video => video.courseId === courseId);
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'published': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
        <p className="text-gray-600">Manage your assigned courses and upload video content</p>
      </div>

      {/* Course Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignedCourses.map((course) => (
          <div
            key={course.id}
            className={`bg-white rounded-lg shadow-md border-2 cursor-pointer transition-all duration-200 ${
              selectedCourse?.id === course.id 
                ? 'border-blue-500 shadow-lg' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedCourse(course)}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                  {course.status}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center text-gray-500">
                  <Users className="w-4 h-4 mr-2" />
                  {course.enrolledStudents} Students
                </div>
                <div className="flex items-center text-gray-500">
                  <Clock className="w-4 h-4 mr-2" />
                  {course.estimatedDuration}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                  <span>Video Progress</span>
                  <span>{Math.round((course.uploadedVideos / course.totalLessons) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(course.uploadedVideos / course.totalLessons) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Course Details */}
      {selectedCourse && (
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{selectedCourse.title}</h2>
                <p className="text-gray-600 mt-1">{selectedCourse.description}</p>
              </div>
              <button
                onClick={() => setShowUploadModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Upload Video
              </button>
            </div>
          </div>

          {/* Course Videos */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Videos</h3>
            {getCourseVideos(selectedCourse.id).length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FileVideo className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No videos uploaded yet</p>
                <p className="text-sm">Upload your first video to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {getCourseVideos(selectedCourse.id).map((video) => (
                  <div key={video.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Play className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{video.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Lesson {video.lessonNumber}</span>
                          <span>{video.duration}</span>
                          <span>{video.size}</span>
                          <span>{video.uploadDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(video.status)}`}>
                        {video.status}
                      </span>
                      {video.status === 'published' && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Eye className="w-4 h-4 mr-1" />
                          {video.views}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Upload Video</h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Course Info */}
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-blue-900">Course: {selectedCourse?.title}</p>
                <p className="text-sm text-blue-700">
                  {selectedCourse?.uploadedVideos}/{selectedCourse?.totalLessons} videos uploaded
                </p>
              </div>

              {/* Video Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Video Title</label>
                <input
                  type="text"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter video title"
                />
              </div>

              {/* Lesson Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lesson Number</label>
                <input
                  type="number"
                  value={uploadForm.lessonNumber}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, lessonNumber: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="1"
                  min="1"
                  max={selectedCourse?.totalLessons}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                <textarea
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Brief description of the video content"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Video File</label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    dragActive 
                      ? 'border-blue-500 bg-blue-50' 
                      : uploadForm.file 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {uploadForm.file ? (
                    <div className="space-y-2">
                      <Check className="w-8 h-8 text-green-600 mx-auto" />
                      <p className="text-sm font-medium text-green-700">{uploadForm.file.name}</p>
                      <p className="text-xs text-green-600">
                        {(uploadForm.file.size / (1024 * 1024)).toFixed(1)} MB
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                      <p className="text-sm text-gray-600">
                        Drag and drop your video file here, or{' '}
                        <label className="text-blue-600 hover:text-blue-700 cursor-pointer">
                          browse
                          <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => handleFileUpload(e.target.files)}
                            className="hidden"
                          />
                        </label>
                      </p>
                      <p className="text-xs text-gray-500">MP4, MOV, AVI up to 500MB</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitVideo}
                  disabled={!uploadForm.title || !uploadForm.lessonNumber || !uploadForm.file}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Upload Video
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesTab;