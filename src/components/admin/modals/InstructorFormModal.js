'use client'
import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

const InstructorFormModal = ({ 
    instructor = null, 
    isEdit = false, 
    onClose, 
    onSubmit 
}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        specialization: '',
        level: 'Senior Instructor',
        experience: '',
        certification: '',
        avatar: '',
        bio: '',
        status: 'active',
        achievements: [],
        languages: []
    });

    const [newAchievement, setNewAchievement] = useState('');
    const [newLanguage, setNewLanguage] = useState('');
    const [errors, setErrors] = useState({});

    const specializationOptions = [
        'Basketball',
        'Football',
        'Swimming',
        'Tennis',
        'Martial Arts',
        'Volleyball',
        'Badminton',
        'Table Tennis',
        'Golf',
        'Boxing'
    ];

    const levelOptions = [
        'Junior Instructor',
        'Senior Instructor',
        'Master Instructor',
        'Head Instructor'
    ];

    const languageOptions = [
        'Indonesian',
        'English',
        'Spanish',
        'Japanese',
        'German',
        'French',
        'Mandarin',
        'Arabic'
    ];

    useEffect(() => {
        if (isEdit && instructor) {
            setFormData({
                name: instructor.name || '',
                email: instructor.email || '',
                phone: instructor.phone || '',
                specialization: instructor.specialization || '',
                level: instructor.level || 'Senior Instructor',
                experience: instructor.experience || '',
                certification: instructor.certification || '',
                avatar: instructor.avatar || '',
                bio: instructor.bio || '',
                status: instructor.status || 'active',
                achievements: instructor.achievements || [],
                languages: instructor.languages || []
            });
        }
    }, [isEdit, instructor]);

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
        
        if (!formData.name.trim()) {
            newErrors.name = 'Instructor name is required';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        }
        
        if (!formData.specialization) {
            newErrors.specialization = 'Please select a specialization';
        }

        if (!formData.experience.trim()) {
            newErrors.experience = 'Experience is required';
        }

        if (!formData.certification.trim()) {
            newErrors.certification = 'Certification is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        // Generate avatar initials if not provided
        const avatar = formData.avatar || formData.name.split(' ').map(n => n[0]).join('').toUpperCase();

        onSubmit({
            ...formData,
            avatar,
            rating: instructor?.rating || 0
        });
        onClose();
    };

    const addAchievement = () => {
        if (newAchievement.trim() && !formData.achievements.includes(newAchievement.trim())) {
            setFormData(prev => ({
                ...prev,
                achievements: [...prev.achievements, newAchievement.trim()]
            }));
            setNewAchievement('');
        }
    };

    const removeAchievement = (index) => {
        setFormData(prev => ({
            ...prev,
            achievements: prev.achievements.filter((_, i) => i !== index)
        }));
    };

    const addLanguage = () => {
        if (newLanguage && !formData.languages.includes(newLanguage)) {
            setFormData(prev => ({
                ...prev,
                languages: [...prev.languages, newLanguage]
            }));
            setNewLanguage('');
        }
    };

    const removeLanguage = (index) => {
        setFormData(prev => ({
            ...prev,
            languages: prev.languages.filter((_, i) => i !== index)
        }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {isEdit ? 'Edit Instructor' : 'Add New Instructor'}
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
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.name ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Enter full name"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email *
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Enter email address"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number *
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.phone ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="+62 xxx-xxxx-xxxx"
                            />
                            {errors.phone && (
                                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Specialization *
                            </label>
                            <select
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.specialization ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value="">Select specialization</option>
                                {specializationOptions.map(spec => (
                                    <option key={spec} value={spec}>
                                        {spec}
                                    </option>
                                ))}
                            </select>
                            {errors.specialization && (
                                <p className="mt-1 text-sm text-red-600">{errors.specialization}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Level
                            </label>
                            <select
                                name="level"
                                value={formData.level}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {levelOptions.map(level => (
                                    <option key={level} value={level}>
                                        {level}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Experience *
                            </label>
                            <input
                                type="text"
                                name="experience"
                                value={formData.experience}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.experience ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="e.g., 5 years"
                            />
                            {errors.experience && (
                                <p className="mt-1 text-sm text-red-600">{errors.experience}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Certification *
                            </label>
                            <input
                                type="text"
                                name="certification"
                                value={formData.certification}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.certification ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="e.g., FIBA Certified Coach"
                            />
                            {errors.certification && (
                                <p className="mt-1 text-sm text-red-600">{errors.certification}</p>
                            )}
                        </div>

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
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bio
                        </label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter instructor biography"
                        />
                    </div>

                    {/* Achievements */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Achievements
                        </label>
                        <div className="space-y-3">
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    value={newAchievement}
                                    onChange={(e) => setNewAchievement(e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Add achievement"
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAchievement())}
                                />
                                <button
                                    type="button"
                                    onClick={addAchievement}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                            {formData.achievements.length > 0 && (
                                <div className="space-y-2">
                                    {formData.achievements.map((achievement, index) => (
                                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                            <span className="text-sm">{achievement}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeAchievement(index)}
                                                className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Languages */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Languages
                        </label>
                        <div className="space-y-3">
                            <div className="flex space-x-2">
                                <select
                                    value={newLanguage}
                                    onChange={(e) => setNewLanguage(e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">Select language</option>
                                    {languageOptions
                                        .filter(lang => !formData.languages.includes(lang))
                                        .map(lang => (
                                            <option key={lang} value={lang}>
                                                {lang}
                                            </option>
                                        ))}
                                </select>
                                <button
                                    type="button"
                                    onClick={addLanguage}
                                    disabled={!newLanguage}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                            {formData.languages.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {formData.languages.map((language, index) => (
                                        <div key={index} className="flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                            <span>{language}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeLanguage(index)}
                                                className="p-0.5 text-blue-600 hover:text-blue-800 rounded-full"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
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
                            {isEdit ? 'Update Instructor' : 'Add Instructor'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InstructorFormModal;