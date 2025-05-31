import { useState } from 'react';

export const useAdminData = () => {
    // Mock stats data
    const stats = [
        { title: 'Total Users', value: '12,547', change: '+12.5%', trend: 'up', icon: 'Users', color: 'blue' },
        { title: 'Active Courses', value: '156', change: '+8.2%', trend: 'up', icon: 'BookOpen', color: 'green' },
        { title: 'Revenue', value: 'Rp 2.1M', change: '+23.1%', trend: 'up', icon: 'DollarSign', color: 'purple' },
        { title: 'Success Rate', value: '94.2%', change: '+2.3%', trend: 'up', icon: 'Trophy', color: 'orange' }
    ];

    const chartData = [
        { name: 'Jan', users: 4000, revenue: 2400, courses: 240 },
        { name: 'Feb', users: 3000, revenue: 1398, courses: 220 },
        { name: 'Mar', users: 2000, revenue: 9800, courses: 290 },
        { name: 'Apr', users: 2780, revenue: 3908, courses: 200 },
        { name: 'May', users: 1890, revenue: 4800, courses: 181 },
        { name: 'Jun', users: 2390, revenue: 3800, courses: 250 },
        { name: 'Jul', users: 3490, revenue: 4300, courses: 210 }
    ];

    const pieData = [
        { name: 'Basketball', value: 400, color: '#3B82F6' },
        { name: 'Football', value: 300, color: '#10B981' },
        { name: 'Swimming', value: 200, color: '#F59E0B' },
        { name: 'Tennis', value: 150, color: '#EF4444' },
        { name: 'Others', value: 100, color: '#8B5CF6' }
    ];

    // Users data state
    const [usersData, setUsersData] = useState([
        {
            id: 1,
            name: 'Manachika',
            email: 'chika@example.com',
            phone: '+62 812-3456-7890',
            status: 'member',
            joined: '2024-01-15',
            avatar: 'MC',
            paymentReceipt: 'receipt1.jpg',
            lastActive: '2024-06-01',
            coursesEnrolled: 3,
            totalSpent: 'Rp 450K'
        },
        {
            id: 2,
            name: 'Ananda Putri',
            email: 'ananda@example.com',
            phone: '+62 813-4567-8901',
            status: 'visitor',
            joined: '2024-05-20',
            avatar: 'AP',
            paymentReceipt: null,
            lastActive: '2024-05-28',
            coursesEnrolled: 0,
            totalSpent: 'Rp 0'
        },
        {
            id: 3,
            name: 'Bayu Aditya',
            email: 'bayu@example.com',
            phone: '+62 814-5678-9012',
            status: 'member',
            joined: '2024-03-10',
            avatar: 'BA',
            paymentReceipt: 'receipt3.jpg',
            lastActive: '2024-05-30',
            coursesEnrolled: 2,
            totalSpent: 'Rp 300K'
        },
        {
            id: 4,
            name: 'Sari Indah',
            email: 'sari@example.com',
            phone: '+62 815-6789-0123',
            status: 'visitor',
            joined: '2024-05-25',
            avatar: 'SI',
            paymentReceipt: 'receipt4.jpg',
            lastActive: '2024-05-29',
            coursesEnrolled: 0,
            totalSpent: 'Rp 0'
        },
        {
            id: 5,
            name: 'Dani Pratama',
            email: 'dani@example.com',
            phone: '+62 816-7890-1234',
            status: 'member',
            joined: '2024-04-05',
            avatar: 'DP',
            paymentReceipt: 'receipt5.jpg',
            lastActive: '2024-06-01',
            coursesEnrolled: 4,
            totalSpent: 'Rp 600K'
        }
    ]);

    // Categories state
    const [categories, setCategories] = useState([
        { id: 1, name: 'Basketball', coursesCount: 15 },
        { id: 2, name: 'Football', coursesCount: 12 },
        { id: 3, name: 'Swimming', coursesCount: 8 },
        { id: 4, name: 'Tennis', coursesCount: 10 },
        { id: 5, name: 'Martial Arts', coursesCount: 6 }
    ]);

    // Courses data state
    const [coursesData, setCoursesData] = useState([
        {
            id: 1,
            title: 'Basketball Fundamentals',
            shortDesc: 'Learn the basics of basketball including dribbling, shooting, and passing techniques.',
            category: 'Basketball',
            students: 2140,
            rating: 4.8,
            revenue: 'Rp 320K',
            status: 'active',
            banner: 'basketball-banner.jpg',
            videoUrl: 'basketball-intro.mp4',
            createdAt: '2024-01-10',
            instructor: 'Coach Ahmad'
        },
        {
            id: 2,
            title: 'Swimming for Beginners',
            shortDesc: 'Master swimming techniques from basic floating to advanced strokes.',
            category: 'Swimming',
            students: 1890,
            rating: 4.7,
            revenue: 'Rp 280K',
            status: 'active',
            banner: 'swimming-banner.jpg',
            videoUrl: 'swimming-intro.mp4',
            createdAt: '2024-02-15',
            instructor: 'Coach Maria'
        },
        {
            id: 3,
            title: 'Basic Martial Arts',
            shortDesc: 'Introduction to martial arts including basic stances, strikes, and self-defense.',
            category: 'Martial Arts',
            students: 2400,
            rating: 4.9,
            revenue: 'Rp 400K',
            status: 'active',
            banner: 'martial-arts-banner.jpg',
            videoUrl: 'martial-arts-intro.mp4',
            createdAt: '2024-01-20',
            instructor: 'Sensei Budi'
        },
        {
            id: 4,
            title: 'Tennis Skills & Techniques',
            shortDesc: 'Improve your tennis game with professional techniques and strategies.',
            category: 'Tennis',
            students: 1600,
            rating: 4.8,
            revenue: 'Rp 250K',
            status: 'draft',
            banner: 'tennis-banner.jpg',
            videoUrl: 'tennis-intro.mp4',
            createdAt: '2024-03-05',
            instructor: 'Coach Sarah'
        }
    ]);

    // Instructors data state
    const [instructorsData, setInstructorsData] = useState([
        {
            id: 1,
            name: 'Coach Ahmad',
            email: 'ahmad@mysports.id',
            phone: '+62 811-1111-1111',
            specialization: 'Basketball',
            level: 'Master Instructor',
            experience: '8 years',
            certification: 'FIBA Certified Coach',
            avatar: 'CA',
            bio: 'Professional basketball coach with extensive experience in youth development and competitive training.',
            totalCourses: 5,
            totalStudents: 2140,
            totalRevenue: 'Rp 1.2M',
            rating: 4.9,
            status: 'active',
            joinedAt: '2023-01-15',
            achievements: ['FIBA Level 2 Certificate', 'Youth Coach of the Year 2023'],
            languages: ['Indonesian', 'English']
        },
        {
            id: 2,
            name: 'Coach Maria',
            email: 'maria@mysports.id',
            phone: '+62 812-2222-2222',
            specialization: 'Swimming',
            level: 'Master Instructor',
            experience: '10 years',
            certification: 'ASA Swimming Teacher',
            avatar: 'CM',
            bio: 'Former competitive swimmer turned coach, specializing in technique refinement and stroke development.',
            totalCourses: 4,
            totalStudents: 1890,
            totalRevenue: 'Rp 980K',
            rating: 4.8,
            status: 'active',
            joinedAt: '2023-02-20',
            achievements: ['National Swimming Championship Silver', 'ASA Level 3 Certificate'],
            languages: ['Indonesian', 'English', 'Spanish']
        },
        {
            id: 3,
            name: 'Sensei Budi',
            email: 'budi@mysports.id',
            phone: '+62 813-3333-3333',
            specialization: 'Martial Arts',
            level: 'Master Instructor',
            experience: '15 years',
            certification: 'Black Belt 3rd Dan',
            avatar: 'SB',
            bio: 'Traditional martial arts master with deep knowledge in both practical combat and philosophical aspects.',
            totalCourses: 3,
            totalStudents: 2400,
            totalRevenue: 'Rp 1.5M',
            rating: 4.9,
            status: 'active',
            joinedAt: '2022-11-10',
            achievements: ['3rd Dan Black Belt', 'Regional Martial Arts Champion', 'Certified Self-Defense Instructor'],
            languages: ['Indonesian', 'Japanese']
        },
        {
            id: 4,
            name: 'Coach Sarah',
            email: 'sarah@mysports.id',
            phone: '+62 814-4444-4444',
            specialization: 'Tennis',
            level: 'Senior Instructor',
            experience: '6 years',
            certification: 'ITF Certified Coach',
            avatar: 'CS',
            bio: 'Professional tennis instructor focused on developing proper technique and competitive mindset.',
            totalCourses: 2,
            totalStudents: 1600,
            totalRevenue: 'Rp 750K',
            rating: 4.7,
            status: 'active',
            joinedAt: '2023-08-05',
            achievements: ['ITF Level 1 Certificate', 'Junior Tennis Development Award'],
            languages: ['Indonesian', 'English']
        },
        {
            id: 5,
            name: 'Coach David',
            email: 'david@mysports.id',
            phone: '+62 815-5555-5555',
            specialization: 'Football',
            level: 'Master Instructor',
            experience: '12 years',
            certification: 'AFC B License',
            avatar: 'CD',
            bio: 'Former professional footballer with expertise in tactical training and player development.',
            totalCourses: 6,
            totalStudents: 1800,
            totalRevenue: 'Rp 1.1M',
            rating: 4.8,
            status: 'active',
            joinedAt: '2023-03-12',
            achievements: ['AFC B License', 'Former Professional Player', 'Youth Development Specialist'],
            languages: ['Indonesian', 'English', 'German']
        }
    ]);

    return {
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
    };
};