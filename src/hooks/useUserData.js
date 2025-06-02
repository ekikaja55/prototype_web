import { useState, useEffect } from 'react';

export const useUserData = () => {
  // User Profile State
  const [userProfile, setUserProfile] = useState({
    id: 1,
    name: "Budi Sudarso",
    email: "sudarso@email.com",
    phone: "08951517682",
    dateOfBirth: "1995-03-15",
    gender: "Male",
    address: {
      street: "JL Ngagel Jaya Selatan",
      city: "Surabaya",
      state: "Jawa Timur",
      zipCode: "60111",
      country: "Indonesia"
    },
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    bio: "Passionate sports enthusiast with 5+ years of training experience. Love challenging myself and helping others achieve their fitness goals.",
    joinDate: "2023-01-15",
    preferences: {
      notifications: {
        email: true,
        push: true,
        sms: false
      },
      privacy: {
        profileVisibility: "public",
        showEmail: false,
        showPhone: false
      },
      language: "en",
      timezone: "America/New_York"
    },
    socialLinks: {
      instagram: "@alexjohnson_sports",
      twitter: "@alexj_athlete",
      linkedin: "alex-johnson-athlete"
    }
  });

  // Enrolled Courses State
  const [enrolledCourses, setEnrolledCourses] = useState([
    {
      id: 1,
      title: "Football Mastery Program",
      instructor: "Coach Bima Sakti",
      category: "Ball Sports",
      level: "Intermediate",
      progress: 75,
      totalLessons: 24,
      completedLessons: 18,
      enrollmentDate: "2024-10-01",
      nextLesson: "Advanced Tactics",
      nextLessonDate: "2024-12-15",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=300&h=200&fit=crop",
      status: "active",
      rating: 4.9,
      timeSpent: "32 hours",
      certificate: null
    },
    {
      id: 2,
      title: "Basketball Skills Academy",
      instructor: "Coach Andakara Prastawa",
      category: "Ball Sports",
      level: "Beginner",
      progress: 100,
      totalLessons: 20,
      completedLessons: 20,
      enrollmentDate: "2024-09-15",
      nextLesson: null,
      nextLessonDate: null,
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=300&h=200&fit=crop",
      status: "completed",
      rating: 4.8,
      timeSpent: "28 hours",
      certificate: {
        id: "CERT-BB-001",
        issuedDate: "2024-11-30",
        downloadUrl: "/certificates/basketball-skills.pdf"
      }
    },
    {
      id: 3,
      title: "Swimming Excellence Program",
      instructor: "Coach Yudi Darma",
      category: "Water Sports",
      level: "Beginner",
      progress: 45,
      totalLessons: 16,
      completedLessons: 7,
      enrollmentDate: "2024-11-01",
      nextLesson: "Backstroke Fundamentals",
      nextLessonDate: "2024-12-16",
      image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=300&h=200&fit=crop",
      status: "active",
      rating: 4.7,
      timeSpent: "14 hours",
      certificate: null
    }
  ]);

  // Community Posts State
  const [communityPosts, setCommunityPosts] = useState([
    {
      id: 1,
      author: {
        name: "Alex Johnson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
      },
      content: "Just completed my first marathon training session! 🏃‍♂️ The endurance building techniques from the Athletics course really helped. Anyone else training for a marathon?",
      timestamp: "2024-12-02T10:30:00Z",
      likes: 24,
      comments: [
        {
          id: 1,
          author: "Sarah Wilson",
          content: "Congratulations! I'm also training for my first marathon. How was the experience?",
          timestamp: "2024-12-02T11:15:00Z"
        },
        {
          id: 2,
          author: "Mike Chen",
          content: "Great progress! Keep it up 💪",
          timestamp: "2024-12-02T12:00:00Z"
        }
      ],
      tags: ["marathon", "training", "athletics"],
      isLiked: true
    },
    {
      id: 2,
      author: {
        name: "Alex Johnson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
      },
      content: "Quick tip for basketball players: Focus on your footwork during shooting drills. It makes a huge difference in accuracy! 🏀",
      timestamp: "2024-11-28T14:20:00Z",
      likes: 18,
      comments: [
        {
          id: 3,
          author: "Jennifer Lee",
          content: "Thanks for the tip! I'll try this in my next practice session.",
          timestamp: "2024-11-28T15:30:00Z"
        }
      ],
      tags: ["basketball", "tips", "shooting"],
      isLiked: false
    }
  ]);

  // Transactions State
  const [transactions, setTransactions] = useState([
    {
      id: "TXN-001",
      type: "course_purchase",
      courseName: "Football Mastery Program",
      instructor: "Coach Bima Sakti",
      amount: 750000,
      currency: "IDR",
      status: "completed",
      paymentMethod: "Credit Card",
      transactionDate: "2024-10-01T09:00:00Z",
      paymentDetails: {
        cardLast4: "****1234",
        cardType: "Visa"
      }
    },
    {
      id: "TXN-002",
      type: "course_purchase",
      courseName: "Basketball Skills Academy",
      instructor: "Coach Andakara Prastawa",
      amount: 650000,
      currency: "IDR",
      status: "completed",
      paymentMethod: "Bank Transfer",
      transactionDate: "2024-09-15T14:30:00Z",
      paymentDetails: {
        bankName: "BCA",
        accountNumber: "****5678"
      }
    },
    {
      id: "TXN-003",
      type: "course_purchase",
      courseName: "Swimming Excellence Program",
      instructor: "Coach Yudi Darma",
      amount: 550000,
      currency: "IDR",
      status: "completed",
      paymentMethod: "E-Wallet",
      transactionDate: "2024-11-01T11:15:00Z",
      paymentDetails: {
        walletType: "GoPay",
        phoneNumber: "****1234"
      }
    },
    {
      id: "TXN-004",
      type: "refund",
      courseName: "Tennis Pro Academy",
      instructor: "Coach Maria Santos",
      amount: -400000,
      currency: "IDR",
      status: "processed",
      paymentMethod: "Credit Card Refund",
      transactionDate: "2024-10-20T16:45:00Z",
      paymentDetails: {
        reason: "Course cancellation",
        refundMethod: "Original payment method"
      }
    }
  ]);

  // Progress Data State
  const [progressData, setProgressData] = useState({
    totalCoursesEnrolled: 3,
    completedCourses: 1,
    inProgressCourses: 2,
    totalHoursSpent: 74,
    averageProgress: 73,
    monthlyProgress: [
      { month: 'Sep', hours: 15, courses: 1 },
      { month: 'Oct', hours: 25, courses: 2 },
      { month: 'Nov', hours: 20, courses: 3 },
      { month: 'Dec', hours: 14, courses: 3 }
    ],
    skillsImproved: [
      { skill: "Ball Handling", improvement: 85 },
      { skill: "Shooting", improvement: 78 },
      { skill: "Swimming Strokes", improvement: 65 },
      { skill: "Tactical Understanding", improvement: 82 }
    ],
    weeklyActivity: [
      { day: 'Mon', minutes: 45 },
      { day: 'Tue', minutes: 60 },
      { day: 'Wed', minutes: 30 },
      { day: 'Thu', minutes: 75 },
      { day: 'Fri', minutes: 90 },
      { day: 'Sat', minutes: 120 },
      { day: 'Sun', minutes: 45 }
    ]
  });

  // Achievements State
  const [achievements, setAchievements] = useState([
    {
      id: 1,
      title: "First Course Completed",
      description: "Completed your first sports course",
      icon: "🏆",
      unlockedDate: "2024-11-30",
      category: "milestone",
      rarity: "common"
    },
    {
      id: 2,
      title: "Basketball Master",
      description: "Achieved 100% completion in Basketball Skills Academy",
      icon: "🏀",
      unlockedDate: "2024-11-30",
      category: "skill",
      rarity: "uncommon"
    },
    {
      id: 3,
      title: "Dedicated Learner",
      description: "Spent over 50 hours learning",
      icon: "📚",
      unlockedDate: "2024-11-25",
      category: "time",
      rarity: "rare"
    },
    {
      id: 4,
      title: "Community Contributor",
      description: "Made your first community post",
      icon: "💬",
      unlockedDate: "2024-11-20",
      category: "social",
      rarity: "common"
    },
    {
      id: 5,
      title: "Multi-Sport Athlete",
      description: "Enrolled in courses from 3 different sports categories",
      icon: "🌟",
      unlockedDate: "2024-11-01",
      category: "diversity",
      rarity: "epic"
    }
  ]);

  // Load data on component mount (simulating API calls)
  useEffect(() => {
    // Simulate loading user data from localStorage or API
    const loadUserData = () => {
      try {
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
          setUserProfile(JSON.parse(savedProfile));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, []);

  // Save user profile changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  }, [userProfile]);

  // Helper functions
  const updateUserProfile = (updates) => {
    setUserProfile(prev => ({
      ...prev,
      ...updates
    }));
  };

  const addCommunityPost = (postContent) => {
    const newPost = {
      id: Date.now(),
      author: {
        name: userProfile.name,
        avatar: userProfile.avatar
      },
      content: postContent,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: [],
      tags: [],
      isLiked: false
    };

    setCommunityPosts(prev => [newPost, ...prev]);
  };

  const updateCourseProgress = (courseId, progress) => {
    setEnrolledCourses(prev =>
      prev.map(course =>
        course.id === courseId
          ? { ...course, progress, completedLessons: Math.floor((progress / 100) * course.totalLessons) }
          : course
      )
    );
  };

  const addTransaction = (transaction) => {
    const newTransaction = {
      id: `TXN-${Date.now()}`,
      ...transaction,
      transactionDate: new Date().toISOString()
    };

    setTransactions(prev => [newTransaction, ...prev]);
  };

  return {
    // State
    userProfile,
    setUserProfile,
    enrolledCourses,
    setEnrolledCourses,
    communityPosts,
    setCommunityPosts,
    transactions,
    setTransactions,
    progressData,
    setProgressData,
    achievements,
    setAchievements,

    // Helper functions
    updateUserProfile,
    addCommunityPost,
    updateCourseProgress,
    addTransaction
  };
};