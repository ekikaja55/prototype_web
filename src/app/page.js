'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Users, Trophy, BookOpen, ArrowRight, Star, Menu, X, MessageCircle, Calendar, TrendingUp, Shield, ChevronDown } from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const page = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Prima Fikri Salim",
      role: "Football Player",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      text: "MySports.id helped me improve my football skills dramatically. The coaches are amazing!"
    },
    {
      name: "Ananda",
      role: "Parent",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      text: "My daughter loves the youth athletics program. Great community and excellent guidance."
    },
    {
      name: "Bayu Aditya",
      role: "Fitness Enthusiast",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      text: "The nutrition and fitness programs transformed my lifestyle completely."
    }
  ];

  const courses = [
    { icon: "🏀", title: "Basketball Fundamentals", students: "2.1k+", rating: 4.8 },
    { icon: "🏊", title: "Swimming for Beginners", students: "1.9k+", rating: 4.7 },
    { icon: "🥋", title: "Basic Martial Arts", students: "2.4k+", rating: 4.9 },
    { icon: "🎾", title: "Tennis Skills & Techniques", students: "1.6k+", rating: 4.8 }
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />
      {/* Enhanced Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8 lg:pr-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-medium">
                  <Star className="w-4 h-4 mr-2" />
                  Trusted by 10,000+ Athletes
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                  Master Your Sport with{' '}
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                    MySports.id
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Transform your athletic journey with expert-led training, personalized coaching, and a thriving community of sports enthusiasts across Indonesia.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/start" className="group bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center space-x-2">
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>

                <button className="group bg-white/80 backdrop-blur-sm text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold border-2 border-gray-200 hover:border-blue-300 hover:bg-white transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center space-x-2">
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>Watch Demo</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-12 space-y-4 sm:space-y-0 text-sm text-gray-600">
                <div className="flex items-center space-x-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full border-2 border-white shadow-sm"></div>
                    ))}
                  </div>
                  <span className="font-medium">10,000+ Active Users</span>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="font-medium">4.9/5 Average Rating</span>
                </div>
              </div>
            </div>

            <div className="relative lg:pl-8 mt-8 lg:mt-0">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-blue-500 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&h=600&fit=crop"
                  alt="Athletes training"
                  className="relative rounded-3xl shadow-2xl w-full h-auto transform hover:scale-105 transition-transform duration-500"
                  width={700}
                  height={600}
                  priority
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-500 rounded-xl flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Success Rate</p>
                      <p className="text-2xl font-bold text-green-600">94%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Choose MySports.id?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the perfect blend of technology, expertise, and community that sets us apart from traditional sports training
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Interactive Learning",
                desc: "Immersive video lessons, real-time quizzes, and personalized training plans that adapt to your progress",
                color: "from-blue-500 to-blue-600",
                bg: "bg-blue-50"
              },
              {
                icon: Trophy,
                title: "Certified Coaches",
                desc: "Train with Olympic athletes, national champions, and internationally certified sports professionals",
                color: "from-purple-500 to-purple-600",
                bg: "bg-purple-50"
              },
              {
                icon: Users,
                title: "Vibrant Community",
                desc: "Connect with like-minded athletes, join training groups, and participate in exclusive events",
                color: "from-green-500 to-green-600",
                bg: "bg-green-50"
              }
            ].map((feature, index) => (
              <div key={index} className={`group ${feature.bg} rounded-3xl p-8 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 transform hover:-translate-y-2 border border-gray-100/50`}>
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Courses Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Popular Training Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our most-loved courses designed by experts and trusted by thousands of athletes
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {courses.map((program, index) => (
              <div key={index} className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100">
                <div className="text-4xl sm:text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{program.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{program.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
                  <span className="font-medium">{program.students} students</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{program.rating}</span>
                  </div>
                </div>
                <Link href={`/courses/${program.title.toLowerCase().replace(/\s+/g, '-')}`} className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-3 group-hover:translate-y-0 hover:shadow-lg text-center">
                  Enroll Now
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/courses" className="inline-block bg-white text-gray-700 px-10 py-4 rounded-xl font-semibold border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Explore All Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">Real transformations from our amazing community</p>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
              <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
                <div className="relative flex-shrink-0">
                  <Image
                    src={testimonials[activeTestimonial].image}
                    alt={testimonials[activeTestimonial].name}
                    className="rounded-full object-cover shadow-xl border-4 border-white"
                    width={128}
                    height={128}
                  />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white fill-current" />
                  </div>
                </div>

                <div className="flex-1 text-center lg:text-left">
                  <p className="text-xl md:text-2xl text-gray-700 mb-6 italic leading-relaxed">
                    "{testimonials[activeTestimonial].text}"
                  </p>
                  <div>
                    <p className="text-xl font-bold text-gray-900">{testimonials[activeTestimonial].name}</p>
                    <p className="text-blue-600 font-medium">{testimonials[activeTestimonial].role}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${index === activeTestimonial
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Community Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Join Our Thriving Community
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect, learn, and grow with thousands of passionate athletes and coaches
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: MessageCircle,
                title: "Active Forums",
                desc: "Join vibrant discussions with fellow athletes, share tips, and get advice from experienced coaches",
                stat: "1,240+ discussions this week",
                color: "text-blue-600",
                bg: "bg-blue-50"
              },
              {
                icon: Calendar,
                title: "Live Events",
                desc: "Participate in exclusive webinars, training sessions, and virtual competitions with top athletes",
                stat: "Next event: Tomorrow 7 PM",
                color: "text-purple-600",
                bg: "bg-purple-50"
              },
              {
                icon: TrendingUp,
                title: "Success Stories",
                desc: "Get inspired by incredible transformation stories and celebrate achievements together",
                stat: "50+ stories shared this month",
                color: "text-green-600",
                bg: "bg-green-50"
              }
            ].map((item, index) => (
              <div key={index} className={`${item.bg} rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100/50`}>
                <item.icon className={`w-12 h-12 ${item.color} mb-6`} />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{item.desc}</p>
                <div className="text-sm font-medium text-gray-500">{item.stat}</div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/community" className="inline-block bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white px-10 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
              Join the Community
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            Ready to Transform Your Athletic Journey?
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of dedicated athletes across Indonesia and unlock your true potential with MySports.id
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/trial" className="bg-white text-blue-600 px-10 py-4 rounded-xl text-lg font-bold hover:shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 inline-block">
              Start Free Trial
            </Link>
            <Link href="/about" className="border-2 border-white text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 inline-block">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <Footer />
    </div>
  );
};

export default page;