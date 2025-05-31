'use client'
import React, { useState, useEffect } from 'react';
import { X, Upload, Play } from 'lucide-react';

const CourseFormModal = ({ 
    course = null, 
    isEdit = false, 
    onClose, 
    categories = [], 
    instructorsData = [], 
    onSubmit 
}) => {
    const [formData, setFormData] = useState({
        title: '',
        shortDesc: '',
        category: '',
        instructor: '',
        status: 'draft',
        banner: '',
        videoUrl: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isEdit && course) {
            setFormData({
                title: course.title || '',
                shortDesc: course.shortDesc || '',
                category: course.category || '',
                instructor: course.instructor || '',
                status: course.status || 'draft',
                banner: course.banner || '',
                videoUrl: course.videoUrl || ''
            });
        }
    }, [isEdit, course]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.title.trim()) {
            newErrors.title = 'Course title is required';
        }
        
        if (!formData.shortDesc.trim()) {
            newErrors.shortDesc = 'Course description is required';
        }
        
        if (!formData.category) {
            newErrors.category = 'Please select a category';
        }
        
        if (!formData.instructor) {
            newErrors.instructor = 'Please select an instructor';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        onSubmit(formData);
        onClose();
    };

    const handleFileUpload = (type) => {
        // Simulate file upload - in real app, you'd handle actual file upload
        const fileName = type === 'banner' ? 'course-banner.jpg' : 'course-video.mp4';
        setFormData(prev => ({
            ...prev,
            [type]: fileName
        }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {isEdit ? 'Edit Course' : 'Create New Course'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Course Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Course Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                errors.title ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Enter course title"
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                        )}
                    </div>

                    {/* Course Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Course Description *
                        </label>
                        <textarea
                            name="shortDesc"
                            value={formData.shortDesc}
                            onChange={handleInputChange}
                            rows={4}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                errors.shortDesc ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Enter course description"
                        />
                        {errors.shortDesc && (
                            <p className="mt-1 text-sm text-red-600">{errors.shortDesc}</p>
                        )}
                    </div>

                    {/* Category and Instructor */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category *
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.category ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value="">Select category</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.name}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category && (
                                <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Instructor *
                            </label>
                            <select
                                name="instructor"
                                value={formData.instructor}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.instructor ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value="">Select instructor</option>
                                {instructorsData.map(instructor => (
                                    <option key={instructor.id} value={instructor.name}>
                                        {instructor.name} - {instructor.specialization}
                                    </option>
                                ))}
                            </select>
                            {errors.instructor && (
                                <p className="mt-1 text-sm text-red-600">{errors.instructor}</p>
                            )}
                        </div>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Status
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="draft">Draft</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    {/* File Uploads */}
                    <div className="space-y-4">
                        {/* Banner Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Course Banner
                            </label>
                            <div className="flex items-center space-x-4">
                                <button
                                    type="button"
                                    onClick={() => handleFileUpload('banner')}
                                    className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <Upload className="w-4 h-4 mr-2" />
                                    Upload Banner
                                </button>
                                {formData.banner && (
                                    <span className="text-sm text-green-600">
                                        ✓ {formData.banner}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Video Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Course Video
                            </label>
                            <div className="flex items-center space-x-4">
                                <button
                                    type="button"
                                    onClick={() => handleFileUpload('videoUrl')}
                                    className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <Play className="w-4 h-4 mr-2" />
                                    Upload Video
                                </button>
                                {formData.videoUrl && (
                                    <span className="text-sm text-green-600">
                                        ✓ {formData.videoUrl}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            {isEdit ? 'Update Course' : 'Create Course'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CourseFormModal;