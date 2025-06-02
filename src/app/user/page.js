"use client";
import React, { useState } from "react";
import UserSidebar from "@/components/user/Sidebar";
import UserHeader from "@/components/user/Header";
import OverviewTab from "@/components/user/tabs/OverviewTab";
import CoursesTab from "@/components/user/tabs/CoursesTab";
import CommunityTab from "@/components/user/tabs/CommunityTab";
import TransactionTab from "@/components/user/tabs/TransactionTab";
import SettingsTab from "@/components/user/tabs/SettingsTab";
import { useUserData } from "@/hooks/useUserData";

const page = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const {
    userProfile,
    setUserProfile,
    enrolledCourses,
    setEnrolledCourses,
    communityPosts,
    setCommunityPosts,
    transactions,
    setTransactions,
    progressData,
    achievements,
  } = useUserData();

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <OverviewTab
            userProfile={userProfile}
            enrolledCourses={enrolledCourses}
            progressData={progressData}
            achievements={achievements}
          />
        );
      case "courses":
        return (
          <CoursesTab
            enrolledCourses={enrolledCourses}
            setEnrolledCourses={setEnrolledCourses}
          />
        );
      case "community":
        return (
          <CommunityTab
            communityPosts={communityPosts}
            setCommunityPosts={setCommunityPosts}
            userProfile={userProfile}
          />
        );
      case "transactions":
        return <TransactionTab transactions={transactions} />;
      case "settings":
        return (
          <SettingsTab
            userProfile={userProfile}
            setUserProfile={setUserProfile}
          />
        );
      default:
        return (
          <OverviewTab
            userProfile={userProfile}
            enrolledCourses={enrolledCourses}
            progressData={progressData}
            achievements={achievements}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UserSidebar
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
      <div className="lg:ml-64 mt-[-100vh]">
        <UserHeader
          activeTab={activeTab}
          setSidebarOpen={setSidebarOpen}
          userProfile={userProfile}
        />

        <main className="p-6 mt-10">{renderContent()}</main>
      </div>
    </div>
  );
};

export default page;
