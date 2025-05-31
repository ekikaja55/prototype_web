'use client'
import React, { useState } from 'react';
import { X, Plus, Edit2, Trash2 } from 'lucide-react';

const CategoryModal = ({ categories = [], setCategories, onClose }) => {
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);
    const [editName, setEditName] = useState('');
    const [error, setError] = useState('');

    const handleAddCategory = (e) => {
        e.preventDefault();
        
        if (!newCategoryName.trim()) {
            setError('Category name is required');
            return;
        }

        // Check if category already exists
        if (categories.some(cat => cat.name.toLowerCase() === newCategoryName.toLowerCase())) {
            setError('Category already exists');
            return;
        }

        const newCategory = {
            id: Date.now(),
            name: newCategoryName.trim(),
            coursesCount: 0
        };

        setCategories(prev => [...prev, newCategory]);
        setNewCategoryName('');
        setError('');
    };

    const handleEditCategory = (category) => {
        setEditingCategory(category.id);
        setEditName(category.name);
        setError('');
    };

    const handleUpdateCategory = (categoryId) => {
        if (!editName.trim()) {
            setError('Category name is required');
            return;
        }

        // Check if category name already exists (excluding current category)
        if (categories.some(cat => cat.id !== categoryId && cat.name.toLowerCase() === editName.toLowerCase())) {
            setError('Category already exists');
            return;
        }

        setCategories(prev => 
            prev.map(cat => 
                cat.id === categoryId 
                    ? { ...cat, name: editName.trim() }
                    : cat
            )
        );

        setEditingCategory(null);
        setEditName('');
        setError('');
    };

    const handleDeleteCategory = (categoryId) => {
        if (window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
            setCategories(prev => prev.filter(cat => cat.id !== categoryId));
        }
    };

    const handleCancelEdit = () => {
        setEditingCategory(null);
        setEditName('');
        setError('');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[80vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Manage Categories
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                    {/* Add New Category Form */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">
                            Add New Category
                        </h3>
                        <form onSubmit={handleAddCategory} className="space-y-3">
                            <div>
                                <input
                                    type="text"
                                    value={newCategoryName}
                                    onChange={(e) => {
                                        setNewCategoryName(e.target.value);
                                        setError('');
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter category name"
                                />
                                {error && !editingCategory && (
                                    <p className="mt-1 text-sm text-red-600">{error}</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Category
                            </button>
                        </form>
                    </div>

                    {/* Existing Categories */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">
                            Existing Categories
                        </h3>
                        {categories.length === 0 ? (
                            <p className="text-gray-500 text-center py-4">
                                No categories yet. Add your first category above.
                            </p>
                        ) : (
                            <div className="space-y-2">
                                {categories.map(category => (
                                    <div
                                        key={category.id}
                                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                                    >
                                        {editingCategory === category.id ? (
                                            <div className="flex-1 flex items-center space-x-2">
                                                <input
                                                    type="text"
                                                    value={editName}
                                                    onChange={(e) => {
                                                        setEditName(e.target.value);
                                                        setError('');
                                                    }}
                                                    className="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    autoFocus
                                                />
                                                <button
                                                    onClick={() => handleUpdateCategory(category.id)}
                                                    className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={handleCancelEdit}
                                                    className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <div>
                                                    <span className="font-medium text-gray-900">
                                                        {category.name}
                                                    </span>
                                                    <span className="ml-2 text-sm text-gray-500">
                                                        ({category.coursesCount} courses)
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => handleEditCategory(category)}
                                                        className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                        title="Edit category"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteCategory(category.id)}
                                                        className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                                        title="Delete category"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                                {error && editingCategory && (
                                    <p className="text-sm text-red-600 mt-1">{error}</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategoryModal;