'use client';
import React, { useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';
import OverviewTab from '@/components/admin/tabs/OverviewTab';
import UsersTab from '@/components/admin/tabs/UsersTab';
import CoursesTab from '@/components/admin/tabs/CoursesTab';
import InstructorsTab from '@/components/admin/tabs/InstructorsTab';
import CommunityTab from '@/components/admin/tabs/CommunityTab';
import FinanceTab from '@/components/admin/tabs/FinanceTab';
import SettingsTab from '@/components/admin/tabs/SettingsTab';
import UserDetailModal from '@/components/admin/modals/UserDetailModal';
import CourseFormModal from '@/components/admin/modals/CourseFormModal';
import CategoryModal from '@/components/admin/modals/CategoryModal';
import InstructorFormModal from '@/components/admin/modals/InstructorFormModal';
import { useAdminData } from '@/hooks/useAdminData';

const AdminDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [searchTerm, setSearchTerm] = useState('');
    
    // Modal states
    const [showUserDetail, setShowUserDetail] = useState(false);
    const [showCreateCourse, setShowCreateCourse] = useState(false);
    const [showEditCourse, setShowEditCourse] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showCreateInstructor, setShowCreateInstructor] = useState(false);
    const [showEditInstructor, setShowEditInstructor] = useState(false);
    
    // Selected items
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedInstructor, setSelectedInstructor] = useState(null);
    
    // Filters
    const [userFilter, setUserFilter] = useState('all');
    const [courseFilter, setCourseFilter] = useState('all');
    const [instructorFilter, setInstructorFilter] = useState('all');

    const {
        usersData,
        setUsersData,
        coursesData,
        setCoursesData,
        instructorsData,
        setInstructorsData,
        categories,
        setCategories,
        stats,
        chartData,
        pieData
    } = useAdminData();

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <OverviewTab stats={stats} chartData={chartData} pieData={pieData} />;
            case 'users':
                return (
                    <UsersTab
                        usersData={usersData}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        userFilter={userFilter}
                        setUserFilter={setUserFilter}
                        setSelectedUser={setSelectedUser}
                        setShowUserDetail={setShowUserDetail}
                    />
                );
            case 'courses':
                return (
                    <CoursesTab
                        coursesData={coursesData}
                        categories={categories}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        courseFilter={courseFilter}
                        setCourseFilter={setCourseFilter}
                        setShowCreateCourse={setShowCreateCourse}
                        setShowCategoryModal={setShowCategoryModal}
                        setSelectedCourse={setSelectedCourse}
                        setShowEditCourse={setShowEditCourse}
                    />
                );
            case 'instructors':
                return (
                    <InstructorsTab
                        instructorsData={instructorsData}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        instructorFilter={instructorFilter}
                        setInstructorFilter={setInstructorFilter}
                        setShowCreateInstructor={setShowCreateInstructor}
                        setSelectedInstructor={setSelectedInstructor}
                        setShowEditInstructor={setShowEditInstructor}
                    />
                );
            case 'community':
                return <CommunityTab />;
            case 'finance':
                return <FinanceTab chartData={chartData} />;
            case 'settings':
                return <SettingsTab />;
            default:
                return <OverviewTab stats={stats} chartData={chartData} pieData={pieData} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setShowUserDetail={setShowUserDetail}
                setShowCreateCourse={setShowCreateCourse}
                setShowEditCourse={setShowEditCourse}
            />

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="lg:ml-70 mt-[-100vh]">
                <Header
                    activeTab={activeTab}
                    setSidebarOpen={setSidebarOpen}
                />

                <main className="p-6">
                    {renderContent()}
                </main>
            </div>

            {/* Modals */}
            {showUserDetail && selectedUser && (
                <UserDetailModal
                    user={selectedUser}
                    onClose={() => {
                        setShowUserDetail(false);
                        setSelectedUser(null);
                    }}
                    updateUserStatus={(userId, newStatus) => {
                        setUsersData(users =>
                            users.map(user =>
                                user.id === userId ? { ...user, status: newStatus } : user
                            )
                        );
                    }}
                />
            )}

            {showCreateCourse && (
                <CourseFormModal
                    onClose={() => setShowCreateCourse(false)}
                    categories={categories}
                    instructorsData={instructorsData}
                    onSubmit={(formData) => {
                        const newCourse = {
                            id: Date.now(),
                            ...formData,
                            students: 0,
                            rating: 0,
                            revenue: 'Rp 0',
                            createdAt: new Date().toISOString().split('T')[0]
                        };
                        setCoursesData(courses => [...courses, newCourse]);
                    }}
                />
            )}

            {showEditCourse && selectedCourse && (
                <CourseFormModal
                    course={selectedCourse}
                    isEdit={true}
                    onClose={() => {
                        setShowEditCourse(false);
                        setSelectedCourse(null);
                    }}
                    categories={categories}
                    instructorsData={instructorsData}
                    onSubmit={(formData) => {
                        setCoursesData(courses =>
                            courses.map(c =>
                                c.id === selectedCourse.id ? { ...selectedCourse, ...formData } : c
                            )
                        );
                    }}
                />
            )}

            {showCategoryModal && (
                <CategoryModal
                    categories={categories}
                    setCategories={setCategories}
                    onClose={() => setShowCategoryModal(false)}
                />
            )}

            {showCreateInstructor && (
                <InstructorFormModal
                    onClose={() => setShowCreateInstructor(false)}
                    onSubmit={(formData) => {
                        const newInstructor = {
                            id: Date.now(),
                            ...formData,
                            totalStudents: 0,
                            totalCourses: 0,
                            totalRevenue: 'Rp 0',
                            joinedAt: new Date().toISOString().split('T')[0]
                        };
                        setInstructorsData(instructors => [...instructors, newInstructor]);
                    }}
                />
            )}

            {showEditInstructor && selectedInstructor && (
                <InstructorFormModal
                    instructor={selectedInstructor}
                    isEdit={true}
                    onClose={() => {
                        setShowEditInstructor(false);
                        setSelectedInstructor(null);
                    }}
                    onSubmit={(formData) => {
                        setInstructorsData(instructors =>
                            instructors.map(i =>
                                i.id === selectedInstructor.id ? { ...selectedInstructor, ...formData } : i
                            )
                        );
                    }}
                />
            )}
        </div>
    );
};

export default AdminDashboard;