import { BookOpen, Users, Heart, Star, Search, Shield } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const About = () => {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-blue-600" />,
      title: "Vast Library",
      description: "Access millions of books from Google Books API with detailed information and previews."
    },
    {
      icon: <Search className="w-8 h-8 text-purple-600" />,
      title: "Smart Search",
      description: "Find your next favorite book with our intelligent search and recommendation system."
    },
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Personal Collection",
      description: "Build your digital bookshelf, save favorites, and track your reading journey."
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Community",
      description: "Connect with fellow book lovers, share reviews, and discover new recommendations."
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      title: "Reviews & Ratings",
      description: "Read authentic reviews and ratings to help you choose your next great read."
    },
    {
      icon: <Shield className="w-8 h-8 text-indigo-600" />,
      title: "Secure & Private",
      description: "Your reading preferences and data are protected with enterprise-grade security."
    }
  ];

  const stats = [
    { number: "1M+", label: "Books Available" },
    { number: "50K+", label: "Happy Readers" },
    { number: "100K+", label: "Reviews Shared" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            About BookHub
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Your Digital Reading Companion
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            BookHub is more than just a book discovery platform. We're building a community where readers connect, 
            discover, and share their love for literature in the digital age.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 mb-16 border border-white/20 shadow-xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                We believe that every book has the power to transform lives. Our mission is to make book discovery 
                effortless, reading more accessible, and to create meaningful connections between readers worldwide.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Innovation</span>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">Community</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">Accessibility</span>
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">Discovery</span>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                <BookOpen className="w-16 h-16 mb-4 opacity-80" />
                <h4 className="text-2xl font-bold mb-2">Reading Made Simple</h4>
                <p className="opacity-90">
                  From discovery to discussion, we've streamlined every step of your reading journey.
                </p>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-pink-400 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose BookHub?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 group-hover:from-blue-50 group-hover:to-purple-50 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-bold text-gray-800">{feature.title}</h4>
                </div>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 mb-16 text-white">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-2">BookHub by the Numbers</h3>
            <p className="text-xl opacity-90">Join thousands of readers in our growing community</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Ready to Start Your Reading Journey?</h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join BookHub today and discover your next favorite book. Connect with readers, build your library, 
              and never run out of great books to read.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NavLink to='/book'><button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                Explore Books
              </button></NavLink>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;