"use client";
import React from "react";
import {
  BookOpen,
  Trophy,
  Clock,
  TrendingUp,
  Star,
  Award,
  Play,
  Calendar,
  BarChart3,
  Target,
  Users,
  CheckCircle,
  ArrowRight,
  Activity,
} from "lucide-react";

const OverviewTab = ({
  userProfile,
  enrolledCourses,
  progressData,
  achievements,
}) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const recentAchievements = achievements.slice(0, 3);
  const activeCourses = enrolledCourses.filter(
    (course) => course.status === "active"
  );
  const upcomingLessons = activeCourses
    .filter((course) => course.nextLesson)
    .slice(0, 3);

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "uncommon":
        return "bg-green-100 text-green-700 border-green-200";
      case "rare":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "epic":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-blue-500";
    if (progress >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 text-white">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
          <div className="flex items-center space-x-4 mb-6 lg:mb-0">
            <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-white/20">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">
                {getGreeting()}, Budi Sudarso! 👋
              </h1>
              <p className="text-blue-100 text-lg">
                Ready to continue your sports journey?
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">
              {progressData.averageProgress}%
            </div>
            <div className="text-blue-100">Overall Progress</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {progressData.totalCoursesEnrolled}
            </span>
          </div>
          <h3 className="text-gray-600 font-medium">Enrolled Courses</h3>
          <div className="flex items-center mt-2 text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>Active learning</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {progressData.completedCourses}
            </span>
          </div>
          <h3 className="text-gray-600 font-medium">Completed Courses</h3>
          <div className="flex items-center mt-2 text-sm text-green-600">
            <Trophy className="w-4 h-4 mr-1" />
            <span>Certificates earned</span>
          </div>
        </div>

        

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Current Courses */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
                Current Courses
              </h2>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {activeCourses.map((course) => (
              <div
                key={course.id}
                className="flex items-center space-x-4 p-4 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {course.instructor}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-4">
                      <div
                        className={`h-2 rounded-full ${getProgressColor(
                          course.progress
                        )}`}
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-600 min-w-fit">
                      {course.progress}%
                    </span>
                  </div>
                </div>
                <button className="w-10 h-10 bg-blue-100 hover:bg-blue-200 rounded-xl flex items-center justify-center transition-colors">
                  <Play className="w-5 h-5 text-blue-600" />
                </button>
              </div>
            ))}
            {activeCourses.length === 0 && (
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No active courses</p>
                <button className="mt-2 text-blue-600 hover:text-blue-700 font-medium">
                  Browse Courses
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Lessons */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-purple-600" />
              Upcoming Lessons
            </h2>
          </div>
          <div className="p-6 space-y-4">
            {upcomingLessons.map((course) => (
              <div
                key={course.id}
                className="flex items-center space-x-4 p-4 rounded-xl border border-gray-100 hover:border-purple-200 transition-colors"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {course.nextLesson}
                  </h3>
                  <p className="text-sm text-gray-600">{course.title}</p>
                  <p className="text-sm text-purple-600 font-medium">
                    {new Date(course.nextLessonDate).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
                <button className="text-purple-600 hover:text-purple-700">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            ))}
            {upcomingLessons.length === 0 && (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No upcoming lessons</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Achievements */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <Trophy className="w-6 h-6 mr-2 text-yellow-600" />
                Recent Achievements
              </h2>
              <button className="text-yellow-600 hover:text-yellow-700 font-medium text-sm flex items-center">
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-xl border-2 ${getRarityColor(
                    achievement.rarity
                  )}`}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <h3 className="font-bold text-sm mb-1">
                      {achievement.title}
                    </h3>
                    <p className="text-xs opacity-75 mb-2">
                      {achievement.description}
                    </p>
                    <div className="text-xs opacity-60">
                      {new Date(achievement.unlockedDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {recentAchievements.length === 0 && (
              <div className="text-center py-8">
                <Award className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No achievements yet</p>
                <p className="text-sm text-gray-400">
                  Complete courses to unlock achievements
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <BarChart3 className="w-6 h-6 mr-2 text-green-600" />
              Weekly Activity
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {progressData.weeklyActivity.map((day) => (
                <div
                  key={day.day}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm font-medium text-gray-600">
                    {day.day}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 bg-green-500 rounded-full"
                        style={{ width: `${(day.minutes / 120) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 min-w-fit">
                      {day.minutes}m
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-green-50 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-800">
                    This Week
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {progressData.weeklyActivity.reduce(
                      (total, day) => total + day.minutes,
                      0
                    )}
                    m
                  </p>
                </div>
                <Target className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <BarChart3 className="w-6 h-6 mr-2 text-indigo-600" />
            Progress Overview
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 text-sm truncate">
                      {course.title}
                    </h3>
                    <p className="text-xs text-gray-500">{course.instructor}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-gray-900">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getProgressColor(
                        course.progress
                      )}`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>
                      {course.completedLessons || 0}/{course.totalLessons || 0}{" "}
                      lessons
                    </span>
                    <span>{course.estimatedTime || "0h"} left</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {enrolledCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No courses enrolled
              </h3>
              <p className="text-gray-500 mb-6">
                Start your sports learning journey today!
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
                Browse Courses
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
