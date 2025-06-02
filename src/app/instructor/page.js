"use client";
import React, { useState } from "react";
import InstructorSidebar from "@/components/instructor/Sidebar";
import InstructorHeader from "@/components/instructor/Header";
import CoursesTab from "@/components/instructor/tabs/CoursesTab";
import CommunityTab from "@/components/instructor/tabs/CommunityTab";
import SettingsTab from "@/components/instructor/tabs/SettingsTab";
import { useInstructorData } from "@/hooks/useInstructorData";

const InstructorPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("courses");

  const {
    instructorProfile,
    setInstructorProfile,
    assignedCourses,
    setAssignedCourses,
    communityPosts,
    setCommunityPosts,
    uploadedVideos,
    setUploadedVideos,
  } = useInstructorData();

  const renderContent = () => {
    switch (activeTab) {
      case "courses":
        return (
          <CoursesTab
            assignedCourses={assignedCourses}
            setAssignedCourses={setAssignedCourses}
            uploadedVideos={uploadedVideos}
            setUploadedVideos={setUploadedVideos}
            instructorProfile={instructorProfile}
          />
        );
      case "community":
        return (
          <CommunityTab
            communityPosts={communityPosts}
            setCommunityPosts={setCommunityPosts}
            userProfile={instructorProfile} 
          />
        );
      case "settings":
        return (
          <SettingsTab
            instructorProfile={instructorProfile}
            setInstructorProfile={setInstructorProfile}
          />
        );
      default:
        return (
          <CoursesTab
            assignedCourses={assignedCourses}
            setAssignedCourses={setAssignedCourses}
            uploadedVideos={uploadedVideos}
            setUploadedVideos={setUploadedVideos}
            instructorProfile={instructorProfile}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <InstructorSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:ml-64 ">
        <InstructorHeader
          activeTab={activeTab}
          setSidebarOpen={setSidebarOpen}
          instructorProfile={instructorProfile}
        />

        <main className="p-6 mt-[-90vh]">{renderContent()}</main>
      </div>
    </div>
  );
};

export default InstructorPage;
