import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, Heart, Quote, Feather, Star, Moon, Sun } from 'lucide-react';
// import { isLoggedIn } from '../store/AuthContext';
import { NavLink } from 'react-router-dom';
const Home = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isNightMode, setIsNightMode] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const inspirationalQuotes = [
    { text: "A room without books is like a body without a soul", author: "Cicero" },
    { text: "The more that you read, the more things you will know", author: "Dr. Seuss" },
    { text: "Books are a uniquely portable magic", author: "Stephen King" },
    { text: "Reading is dreaming with open eyes", author: "Anonymous" },
    { text: "A book is a dream you hold in your hands", author: "Neil Gaiman" }
  ];

  const floatingWords = ["Poetry", "Adventure", "Mystery", "Romance", "Fantasy", "Wisdom", "Dreams", "Stories"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % inspirationalQuotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
  };

  return (<>
    <section id="home" className={`min-h-screen flex items-center justify-center px-4  relative overflow-hidden transition-all duration-1000 ${
      isNightMode 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900' 
        : 'bg-gradient-to-br from-violet-900 via-purple-800 to-indigo-900'
    }`}>
      
      {/* Interactive cursor effect */}
      <div 
        className="fixed w-6 h-6 bg-yellow-400/30 rounded-full pointer-events-none z-50 transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: 'translate3d(0, 0, 0)'
        }}
      />
      
      {/* Day/Night toggle */}
      <button
        onClick={toggleNightMode}
        className="fixed top-20 right-6 z-40 p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 group"
      >
        {isNightMode ? (
          <Sun className="w-6 h-6 text-yellow-300 group-hover:rotate-180 transition-transform duration-500" />
        ) : (
          <Moon className="w-6 h-6 text-blue-200 group-hover:rotate-12 transition-transform duration-300" />
        )}
      </button>

      {/* Floating words */}
      {floatingWords.map((word, index) => (
        <div
          key={word}
          className={`absolute text-2xl font-serif italic opacity-10 animate-float select-none pointer-events-none ${
            isNightMode ? 'text-slate-300' : 'text-purple-300'
          }`}
          style={{
            left: `${15 + (index * 12)}%`,
            top: `${20 + (index * 8)}%`,
            animationDelay: `${index * 0.5}s`,
            animationDuration: `${4 + index}s`
          }}
        >
          {word}
        </div>
      ))}

      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 text-violet-300/20 transform rotate-12 animate-pulse">
          <Quote size={48} />
        </div>
        <div className="absolute top-40 right-20 text-purple-300/20 transform -rotate-12 animate-bounce">
          <BookOpen size={40} />
        </div>
        <div className="absolute bottom-32 left-20 text-indigo-300/20 transform rotate-45 animate-pulse">
          <Sparkles size={36} />
        </div>
        <div className="absolute bottom-20 right-16 text-violet-300/20 transform -rotate-6 animate-bounce">
          <Heart size={32} />
        </div>
        <div className="absolute top-1/2 left-8 text-pink-300/20 transform rotate-12 animate-pulse">
          <Feather size={32} />
        </div>
        <div className="absolute top-1/3 right-8 text-yellow-300/20 transform -rotate-12 animate-bounce">
          <Star size={28} />
        </div>
        
        {/* Enhanced floating particles */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-yellow-400/30 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-pink-400/40 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-blue-400/20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-purple-400/30 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/4 right-1/2 w-1 h-1 bg-green-400/30 rounded-full animate-pulse"></div>
      </div>
      
      {/* Main content */}
      <div className="text-center z-10 relative">
        {/* Logo/Icon with enhanced animation */}
        <div className="mb-8 flex justify-center">
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full blur-lg opacity-30 animate-pulse group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-r from-yellow-400 to-pink-500 p-4 rounded-full group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12">
              <BookOpen size={48} className="text-white group-hover:animate-pulse" />
            </div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-bounce"></div>
          </div>
        </div>
        
        {/* Main heading with typewriter effect */}
        <div className="mb-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent leading-tight tracking-tight">
            <span className="block font-serif italic hover:scale-105 transition-transform duration-300 cursor-default">Book</span>
            <span className="block -mt-2 font-sans hover:scale-105 transition-transform duration-300 cursor-default">Verse</span>
          </h1>
          <div className="flex justify-center mt-4">
            <div className="h-1 w-32 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        {/* Enhanced subtitle with floating effect */}
        <div className="mb-8">
          <p className="text-xl md:text-2xl text-purple-100 font-light max-w-3xl mx-auto leading-relaxed hover:scale-105 transition-transform duration-300">
            Where stories come alive and words dance with
            <span className="text-yellow-300 font-medium hover:text-yellow-200 transition-colors duration-300 cursor-default"> poetry</span>,
            <span className="text-pink-300 font-medium hover:text-pink-200 transition-colors duration-300 cursor-default"> wisdom</span>, and
            <span className="text-blue-300 font-medium hover:text-blue-200 transition-colors duration-300 cursor-default"> wonder</span>
          </p>
        </div>
        
        {/* Dynamic quote carousel */}
        <div className="mb-10 relative h-24 flex items-center justify-center">
          <div className="text-6xl text-purple-300/20 absolute -top-4 -left-4">
            <Quote size={24} />
          </div>
          <div className="relative overflow-hidden w-full max-w-2xl mx-auto px-8">
            {inspirationalQuotes.map((quote, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 transform ${
                  index === currentQuote 
                    ? 'opacity-100 translate-y-0' 
                    : index < currentQuote 
                      ? 'opacity-0 -translate-y-full' 
                      : 'opacity-0 translate-y-full'
                }`}
              >
                <p className="text-lg md:text-xl text-purple-200 font-serif italic text-center">
                  "{quote.text}"
                </p>
                <p className="text-sm text-purple-300 text-center mt-2 font-medium">
                  — {quote.author}
                </p>
              </div>
            ))}
          </div>
          <div className="text-6xl text-purple-300/20 absolute -bottom-4 -right-4 rotate-180">
            <Quote size={24} />
          </div>
          
          {/* Quote indicators */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {inspirationalQuotes.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentQuote ? 'bg-yellow-400 scale-125' : 'bg-purple-400/30'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold rounded-full text-lg shadow-2xl hover:shadow-yellow-400/25 transition-all duration-300 hover:scale-105 transform overflow-hidden">
            <NavLink to = "/book" className="relative z-10 flex items-center gap-2">
              Explore Books
              <BookOpen size={20} className="group-hover:rotate-12 transition-transform duration-300" />
            </NavLink>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-white/20 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
          </button>
          
          <button className="group px-8 py-4 border-2 border-purple-300 text-purple-100 font-semibold rounded-full text-lg hover:bg-purple-300 hover:text-purple-900 transition-all duration-300 hover:scale-105 transform hover:shadow-lg hover:shadow-purple-300/25 relative overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              Join Community
              <Heart size={18} className="group-hover:fill-current transition-all duration-300" />
            </span>
          </button>
        </div>
        
        {/* Interactive reading progress simulation */}
        <div className="mb-12 max-w-md mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-purple-200">Currently Reading</span>
              <span className="text-xs text-purple-300">Chapter 7</span>
            </div>
            <div className="text-white font-medium mb-2">The Midnight Library</div>
            <div className="w-full bg-purple-900/50 rounded-full h-2 mb-2">
              <div className="bg-gradient-to-r from-yellow-400 to-pink-500 h-2 rounded-full w-3/4 animate-pulse"></div>
            </div>
            <div className="text-xs text-purple-300">75% complete • 2 hours left</div>
          </div>
        </div>
        
        {/* Enhanced stats with animations */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center group cursor-pointer">
            <div className="relative">
              <div className="text-3xl font-bold text-yellow-300 mb-2 group-hover:scale-110 transition-transform duration-300 relative">
                10K+
                <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
              </div>
              <div className="text-purple-200 font-medium group-hover:text-white transition-colors duration-300">Literary Works</div>
              <div className="mt-2 w-full bg-purple-900/30 rounded-full h-1">
                <div className="bg-yellow-400 h-1 rounded-full w-4/5 group-hover:w-full transition-all duration-1000"></div>
              </div>
            </div>
          </div>
          <div className="text-center group cursor-pointer">
            <div className="relative">
              <div className="text-3xl font-bold text-pink-300 mb-2 group-hover:scale-110 transition-transform duration-300 relative">
                50K+
                <Sparkles size={16} className="absolute -top-1 -right-4 text-pink-400 animate-pulse" />
              </div>
              <div className="text-purple-200 font-medium group-hover:text-white transition-colors duration-300">Active Readers</div>
              <div className="mt-2 w-full bg-purple-900/30 rounded-full h-1">
                <div className="bg-pink-400 h-1 rounded-full w-3/5 group-hover:w-full transition-all duration-1000"></div>
              </div>
            </div>
          </div>
          <div className="text-center group cursor-pointer">
            <div className="relative">
              <div className="text-3xl font-bold text-blue-300 mb-2 group-hover:scale-110 transition-transform duration-300 relative">
                1M+
                <Heart size={14} className="absolute -top-1 -right-4 text-red-400 animate-bounce" />
              </div>
              <div className="text-purple-200 font-medium group-hover:text-white transition-colors duration-300">Verses Shared</div>
              <div className="mt-2 w-full bg-purple-900/30 rounded-full h-1">
                <div className="bg-blue-400 h-1 rounded-full w-5/6 group-hover:w-full transition-all duration-1000"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce group cursor-pointer">
        <div className="w-6 h-10 border-2 border-purple-300 rounded-full flex justify-center group-hover:border-yellow-300 transition-colors duration-300">
          <div className="w-1 h-3 bg-purple-300 rounded-full mt-2 animate-pulse group-hover:bg-yellow-300"></div>
        </div>
        <div className="text-xs text-purple-300 text-center mt-2 group-hover:text-yellow-300 transition-colors duration-300">Scroll</div>
      </div>
    </section>
    
    <style jsx>{`
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(5deg); }
      }
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
    `}</style>
 </> );
};

export default Home;