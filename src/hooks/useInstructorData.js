import { useState, useEffect } from 'react';

export const useInstructorData = () => {
  // Instructor Profile State
  const [instructorProfile, setInstructorProfile] = useState({
    id: 1,
    name: 'Fabaon',
    email: 'fabaon@gmail.com',
    avatar: '/api/placeholder/150/150',
    role: 'Sports Instructor',
    specialization: ['Basketball', 'Football', 'General Fitness'],
    bio: 'Experienced sports instructor with over 10 years of coaching experience in various sports disciplines.',
    joinDate: '2022-01-15',
    totalStudents: 234,
    totalCourses: 12,
    rating: 4.8,
    phone: '+1 (555) 123-4567',
    address: '123 Sports Avenue, Athletic City, AC 12345',
    socialMedia: {
      linkedin: 'https://linkedin.com/in/alexjohnson',
      twitter: 'https://twitter.com/alexjohnson',
      instagram: 'https://instagram.com/alexjohnson'
    }
  });

  // Assigned Courses State
  const [assignedCourses, setAssignedCourses] = useState([
    {
      id: 1,
      title: 'Basketball Fundamentals',
      description: 'Learn the basic skills and techniques of basketball',
      category: 'Basketball',
      level: 'Beginner',
      status: 'active',
      enrolledStudents: 45,
      totalLessons: 12,
      uploadedVideos: 8,
      pendingVideos: 4,
      createdDate: '2024-01-15',
      thumbnail: '/api/placeholder/300/200',
      estimatedDuration: '6 weeks'
    },
    {
      id: 2,
      title: 'Advanced Football Techniques',
      description: 'Master advanced football skills and strategies',
      category: 'Football',
      level: 'Advanced',
      status: 'active',
      enrolledStudents: 32,
      totalLessons: 15,
      uploadedVideos: 12,
      pendingVideos: 3,
      createdDate: '2024-02-01',
      thumbnail: '/api/placeholder/300/200',
      estimatedDuration: '8 weeks'
    },
    {
      id: 3,
      title: 'Fitness and Conditioning',
      description: 'Complete fitness program for athletes',
      category: 'Fitness',
      level: 'Intermediate',
      status: 'draft',
      enrolledStudents: 0,
      totalLessons: 10,
      uploadedVideos: 3,
      pendingVideos: 7,
      createdDate: '2024-03-01',
      thumbnail: '/api/placeholder/300/200',
      estimatedDuration: '5 weeks'
    }
  ]);

  // Uploaded Videos State
  const [uploadedVideos, setUploadedVideos] = useState([
    {
      id: 1,
      courseId: 1,
      title: 'Introduction to Basketball',
      filename: 'basketball_intro.mp4',
      duration: '12:34',
      size: '145 MB',
      uploadDate: '2024-05-15',
      status: 'published',
      views: 89,
      lessonNumber: 1
    },
{
      id: 2,
      courseId: 2,
      title: 'Football Passing Fundamentals',
      filename: 'football_passing.mp4',
      duration: '18:45',
      size: '210 MB',
      uploadDate: '2024-05-20',
      status: 'processing',
      views: 0,
      lessonNumber: 1
    }
  ]);

  // Community Posts State (same structure as user community)
  const [communityPosts, setCommunityPosts] = useState([
    {
      id: 1,
      author: {
        name: 'Alex Johnson',
        avatar: '/api/placeholder/40/40'
      },
      content: 'Just uploaded a new video on advanced dribbling techniques! Check it out in the Basketball Fundamentals course. Let me know what you think and if you have any questions!',
      timestamp: '2024-06-01T10:30:00Z',
      likes: 15,
      isLiked: false,
      comments: [
        {
          id: 1,
          author: 'Sarah Miller',
          content: 'Great explanation coach! The slow-motion breakdown really helped me understand the technique.',
          timestamp: '2024-06-01T11:00:00Z'
        },
        {
          id: 2,
          author: 'Mike Davis',
          content: 'When will you upload the next lesson?',
          timestamp: '2024-06-01T11:30:00Z'
        }
      ],
      tags: ['basketball', 'dribbling', 'techniques']
    },
    {
      id: 2,
      author: {
        name: 'Alex Johnson',
        avatar: '/api/placeholder/40/40'
      },
      content: 'Quick tip for all my football students: Remember to keep your head up when dribbling. Vision is key in football! Practice this drill daily for better ball control.',
      timestamp: '2024-05-30T14:15:00Z',
      likes: 23,
      isLiked: true,
      comments: [
        {
          id: 3,
          author: 'John Smith',
          content: 'This tip has really improved my game! Thanks coach!',
          timestamp: '2024-05-30T15:00:00Z'
        }
      ],
      tags: ['football', 'tips', 'dribbling']
    },
    {
      id: 3,
      author: {
        name: 'Lisa Chen',
        avatar: '/api/placeholder/40/40'
      },
      content: 'Question for Coach Alex: What\'s the best way to improve shooting accuracy in basketball? I\'ve been practicing but still struggling with consistency.',
      timestamp: '2024-05-29T16:45:00Z',
      likes: 8,
      isLiked: false,
      comments: [
        {
          id: 4,
          author: 'Alex Johnson',
          content: 'Great question Lisa! Focus on your shooting form first - proper stance, follow-through, and consistent release point. I\'ll create a video lesson on this topic soon!',
          timestamp: '2024-05-29T17:00:00Z'
        }
      ],
      tags: ['basketball', 'shooting', 'question']
    }
  ]);

  // Load data on component mount (simulate API calls)
  useEffect(() => {
    // In a real app, you would fetch data from APIs here
    console.log('Instructor data loaded');
  }, []);

  return {
    instructorProfile,
    setInstructorProfile,
    assignedCourses,
    setAssignedCourses,
    communityPosts,
    setCommunityPosts,
    uploadedVideos,
    setUploadedVideos,
  };
};