'use client'
import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  Maximize, 
  BookOpen, 
  Clock, 
  User, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Share2,
  Bookmark,
  Eye
} from 'lucide-react';

const page = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(245); // 4:05
  const [duration] = useState(1800); // 30 minutes
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Sample course data
  const courseData = {
    id: 1,
    title: "Teknik Dasar Sepak Bola untuk Pemula",
    instructor: "Coach Ahmad Fauzi",
    instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    publishDate: "2024-05-15",
    category: "Sepak Bola",
    level: "Pemula",
    totalStudents: 3200,
    lessonNumber: 3,
    totalLessons: 8,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=450&fit=crop",
    description: "Pelajari teknik dasar sepak bola mulai dari passing, dribbling, hingga shooting dengan panduan dari pelatih berpengalaman."
  };

 const lessonContent = {
  title: "Teknik Dasar Sepak Bola: Kontrol & Strategi Permainan",
  objectives: [
    "Memahami pentingnya kontrol bola dalam permainan",
    "Belajar teknik dasar seperti passing, dribbling, dan shooting",
    "Menguasai strategi penempatan posisi pemain",
    "Mengoptimalkan kerja sama tim dalam pertandingan"
  ],
  sections: [
    {
      id: 1,
      title: "Pengantar Teknik Dasar Sepak Bola",
      content: `Dalam sepak bola, penguasaan teknik dasar sangat penting untuk membangun permainan yang efektif. Pemain yang menguasai passing, dribbling, dan shooting akan lebih mampu berkontribusi pada strategi tim.

Passing adalah cara mendistribusikan bola ke rekan satu tim, sementara dribbling membantu pemain melewati lawan dengan kendali bola yang baik. Shooting adalah kemampuan mencetak gol dengan tendangan yang akurat dan bertenaga.

Ketiga teknik ini menjadi pondasi bagi setiap pemain, baik pemula maupun profesional. Pemahaman dan latihan rutin akan meningkatkan kepercayaan diri serta performa di lapangan.`
    },
    {
      id: 2,
      title: "Implementasi Teknik Passing dan Dribbling",
      content: `Teknik passing yang benar membutuhkan koordinasi mata dan kaki, serta pemahaman terhadap posisi rekan setim. Ada beberapa jenis passing seperti short pass, long pass, dan through pass, masing-masing digunakan sesuai kebutuhan di lapangan.

Sementara itu, dribbling digunakan untuk mempertahankan penguasaan bola saat menghadapi lawan. Teknik seperti step over, body feint, dan ball roll efektif digunakan untuk mengecoh lawan.

Latihan berulang dalam kondisi pertandingan nyata sangat membantu dalam mengasah refleks dan keputusan cepat. Kombinasi antara passing dan dribbling yang tepat akan meningkatkan efektivitas serangan tim.`
    },
    {
      id: 3,
      title: "Strategi Penempatan dan Kerja Sama Tim",
      content: `Posisi pemain dalam sepak bola sangat menentukan efektivitas permainan. Penempatan yang tepat memudahkan transisi dari bertahan ke menyerang.

Kerja sama tim adalah kunci. Komunikasi yang jelas dan pemahaman terhadap peran masing-masing akan meminimalkan kesalahan. Latihan taktik seperti formasi 4-4-2 atau 4-3-3 membantu pemain memahami struktur permainan.

Selain itu, membaca permainan lawan dan menyesuaikan strategi secara dinamis akan memberikan keuntungan kompetitif di lapangan.`
    }
  ],
  resources: [
    { name: "Modul Teknik Sepak Bola Dasar", url: "#", type: "documentation" },
    { name: "Panduan Visual Dribbling & Passing", url: "#", type: "pdf" },
    { name: "Video Latihan & Strategi", url: "#", type: "github" },
    { name: "Simulasi Interaktif Posisi Pemain", url: "#", type: "interactive" }
  ],
  quiz: {
    question: "Mengapa teknik dasar seperti passing dan dribbling penting dalam sepak bola?",
    options: [
      "Karena terlihat keren di lapangan",
      "Untuk meningkatkan stamina pemain",
      "Agar dapat bermain solo tanpa tim",
      "Untuk membangun permainan dan kerja sama tim yang efektif"
    ],
    correct: 3
  }
};


  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: courseData.title,
        text: lessonContent.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back to Course
              </button>
              <div className="text-sm text-gray-500">
                Lesson {courseData.lessonNumber} of {courseData.totalLessons}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleBookmark}
                className={`p-2 rounded-full ${isBookmarked ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Bookmark className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-full text-gray-400 hover:text-gray-600"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Player */}
            <div className="bg-black rounded-lg overflow-hidden shadow-lg">
              <div className="relative aspect-video">
                <img
                  src={courseData.thumbnail}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <button
                    onClick={togglePlay}
                    className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-200"
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-gray-800" />
                    ) : (
                      <Play className="w-8 h-8 text-gray-800 ml-1" />
                    )}
                  </button>
                </div>
                
                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <div className="flex items-center space-x-4">
                    <button onClick={togglePlay} className="text-white">
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>
                    
                    <div className="flex-1 flex items-center space-x-2">
                      <span className="text-white text-sm">{formatTime(currentTime)}</span>
                      <div className="flex-1 bg-gray-600 rounded-full h-1">
                        <div
                          className="bg-blue-500 h-1 rounded-full"
                          style={{ width: `${(currentTime / duration) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-white text-sm">{formatTime(duration)}</span>
                    </div>
                    
                    <button className="text-white">
                      <Volume2 className="w-5 h-5" />
                    </button>
                    <button className="text-white">
                      <Maximize className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Lesson Header */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {lessonContent.title}
                </h1>
                <p className="text-gray-600 text-lg">
                  {courseData.description}
                </p>
              </div>

              <div className="flex items-center justify-between border-t pt-4">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <img
                      src={courseData.instructorAvatar}
                      alt={courseData.instructor}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{courseData.instructor}</p>
                      <p className="text-sm text-gray-500">Instructor</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className="text-sm">Published {formatDate(courseData.publishDate)}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-500">
                    <Eye className="w-4 h-4 mr-1" />
                    <span className="text-sm">{courseData.totalStudents.toLocaleString()} students</span>
                  </div>
                </div>


              </div>
            </div>



            {/* Lesson Content */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
                Lesson Content
              </h2>

              <div className="prose prose-lg max-w-none">
                {lessonContent.sections.map((section) => (
                  <div key={section.id} className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {section.title}
                    </h3>
                    <div className="text-gray-700 leading-relaxed">
                      {section.content.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>




          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Progress */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Overall Progress</span>
                    <span>42%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600">
                  <p>5 of 12 lessons completed</p>
                  <p>Estimated time remaining: 3.5 hours</p>
                </div>
              </div>
            </div>



            {/* Course Navigation */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Lesson Navigation</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center">
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    <span className="text-sm">Previous Lesson</span>
                  </div>
                </button>
                
                <button className="w-full flex items-center justify-between p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  <div className="flex items-center">
                    <span className="text-sm">Next Lesson</span>
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </div>
                </button>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <button className="w-full px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors duration-200">
                  View All Lessons
                </button>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default page;