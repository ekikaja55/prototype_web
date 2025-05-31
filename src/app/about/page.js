'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Trophy,
    Users,
    Target,
    Heart,
    Code,
    Database,
    Palette,
    BarChart3,
    Star,
    MapPin,
    Calendar,
    ArrowRight,
    Shield,
    Lightbulb,
    Zap
} from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';



const page = () => {
    const [activeStory, setActiveStory] = useState(0);

    const teamMembers = [
        {
            name: "Prima Fikri Salim",
            role: "Founder & CEO",
            university: "STIKOM Bali University",
            specialties: ["Full Stack Developer", "UI/UX Designer"],
            avatar: "https://cdn.myanimelist.net/images/characters/9/131317.jpg", // Senku from Dr. Stone
            description: "Visionary leader with expertise in full-stack development and user experience design.",
            skills: [
                { icon: Code, label: "Full Stack Development" },
                { icon: Palette, label: "UI/UX Design" }
            ]
        },
        {
            name: "Fabian Kurniawan Limanto",
            role: "Co-Founder",
            university: "Institut Sains dan Teknologi Terpadu Surabaya (ISTTS)",
            specialties: ["Backend Specialist", "Data Analyst", "Full Stack Developer"],
            avatar: "https://cdn.myanimelist.net/images/characters/11/253723.jpg",
            description: "Data-driven strategist specializing in backend architecture and analytics.",
            skills: [
                { icon: Database, label: "Backend Development" },
                { icon: BarChart3, label: "Data Analysis" },
                { icon: Code, label: "Full Stack Development" }
            ]
        },
        {
            name: "Alexander Rico Wong",
            role: "IT Consultant",
            university: "Institut Sains dan Teknologi Terpadu Surabaya (ISTTS)",
            specialties: ["Frontend Specialist", "Full Stack Developer"],
            avatar: "https://cdn.myanimelist.net/images/characters/9/131317.jpg", // Levi from Attack on Titan
            description: "Frontend expert focused on creating exceptional user interfaces and experiences.",
            skills: [
                { icon: Palette, label: "Frontend Development" },
                { icon: Code, label: "Full Stack Development" }
            ]
        },
        {
            name: "Rizki Arkant Pratama",
            role: "IT Consultant",
            university: "Institut Sains dan Teknologi Terpadu Surabaya (ISTTS)",
            specialties: ["Frontend Specialist", "Full Stack Developer"],
            avatar: "https://cdn.myanimelist.net/images/characters/11/253723.jpg", // Tanjiro from Demon Slayer
            description: "Creative developer passionate about building intuitive and responsive web applications.",
            skills: [
                { icon: Palette, label: "Frontend Development" },
                { icon: Code, label: "Full Stack Development" }
            ]
        }
    ];

    const companyStory = [
        {
            year: "2023",
            title: "The Vision",
            description: "Four passionate developers came together with a shared vision to revolutionize sports education in Indonesia through technology."
        },
        {
            year: "2024",
            title: "Building the Foundation",
            description: "We developed our core platform, bringing together expert coaches and innovative learning technologies."
        },
        {
            year: "2025",
            title: "Growing Community",
            description: "Today, we're proud to serve thousands of athletes across Indonesia, helping them achieve their sporting dreams."
        }
    ];

    const values = [
        {
            icon: Target,
            title: "Excellence",
            description: "We strive for excellence in everything we do, from our platform to our community support."
        },
        {
            icon: Heart,
            title: "Passion",
            description: "Our love for sports and technology drives us to create meaningful experiences for athletes."
        },
        {
            icon: Users,
            title: "Community",
            description: "We believe in the power of community to inspire, support, and elevate each other."
        },
        {
            icon: Shield,
            title: "Trust",
            description: "We build lasting relationships through transparency, reliability, and genuine care."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="max-w-7xl mx-auto text-center mt-[10vh]">
                    <div className="space-y-8">
                        <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-medium">
                            <Star className="w-4 h-4 mr-2" />
                            About MySports.id
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                            Empowering Athletes Through{' '}
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                                Innovation
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                            We're a team of passionate developers and sports enthusiasts dedicated to transforming athletic education in Indonesia through cutting-edge technology and community-driven learning.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                        {[
                            { number: "10,000+", label: "Active Athletes" },
                            { number: "500+", label: "Expert Coaches" },
                            { number: "25+", label: "Sports Categories" },
                            { number: "98%", label: "Success Rate" }
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 font-medium mt-2">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Our Journey
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            From a simple idea to Indonesia's leading sports education platform
                        </p>
                    </div>

                    <div className="relative">
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>

                        {companyStory.map((story, index) => (
                            <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                                <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                        <div className="flex items-center mb-4">
                                            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                                                {story.year}
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 ml-4">{story.title}</h3>
                                        </div>
                                        <p className="text-gray-600 leading-relaxed">{story.description}</p>
                                    </div>
                                </div>

                                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border-4 border-white shadow-lg"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Meet Our Team
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            The brilliant minds behind MySports.id
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100">
                                <div className="text-center">
                                    <div className="relative mb-6">
                                        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-500 to-purple-500 shadow-xl group-hover:scale-110 transition-transform duration-300">
                                            <Image
                                                src={member.avatar}
                                                alt={member.name}
                                                width={96}
                                                height={96}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center">
                                            <div className="w-3 h-3 bg-white rounded-full"></div>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                                    <p className="text-blue-600 font-semibold mb-2">{member.role}</p>

                                    <div className="flex items-center justify-center text-gray-500 text-sm mb-4">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        <span className="text-xs leading-tight">{member.university}</span>
                                    </div>

                                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">{member.description}</p>

                                    <div className="space-y-2">
                                        {member.skills.map((skill, skillIndex) => (
                                            <div key={skillIndex} className="flex items-center justify-center space-x-2 bg-blue-50 rounded-lg py-2 px-3">
                                                <skill.icon className="w-4 h-4 text-blue-600" />
                                                <span className="text-xs font-medium text-blue-700">{skill.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Our Values
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            The principles that guide everything we do
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="group text-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100/50">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                                    <value.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                                <div className="flex items-center mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                                        <Target className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 ml-4">Our Mission</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    To democratize access to high-quality sports education across Indonesia by combining technology, expertise, and community support to help every athlete reach their full potential.
                                </p>
                            </div>

                            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                                <div className="flex items-center mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                                        <Lightbulb className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 ml-4">Our Vision</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    To become Indonesia's leading platform for sports education, fostering a generation of skilled, confident, and healthy athletes who contribute positively to their communities.
                                </p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-blue-500 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
                            <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Zap className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Join Us?</h3>
                                    <p className="text-gray-600 mb-8 leading-relaxed">
                                        Be part of Indonesia's most innovative sports education community and unlock your athletic potential.
                                    </p>
                                    <Link href="/start" className="inline-flex items-center bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                                        <span>Get Started Today</span>
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default page;