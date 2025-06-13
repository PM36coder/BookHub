import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../store/AuthContext";
import { Send, Mail, User, MessageSquare, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!token) {
      toast.error("Please login first to send message!");
      return;
    }

    // Basic validation
    if (!formData.username.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("All fields are required!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:2000/user/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.msg || "Something went wrong!");
        return;
      }

      if (response.ok) {
        toast.success(data.msg || "Message sent successfully!");
        setFormData({
          username: "",
          email: "",
          message: "",
        });
      }

    } catch (error) {
      console.log("Error:", error);
      toast.error("Network error. Please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      info: "pravesh63362pk@gamil.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      info: "+91 787892 4572",
      description: "Mon-Fri 9AM-6PM IST"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      info: "Jaipur, Rajasthan",
      description: "India"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Response Time",
      info: "< 24 Hours",
      description: "Average response time"
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <MessageSquare className="w-4 h-4" />
            Get In Touch
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Contact Us
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Have questions about BookHub? Need help finding your next favorite book? 
            We're here to help you on your reading journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Contact Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Send us a Message</h3>
              <p className="text-gray-600">Fill out the form below and we'll get back to you soon.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Username Field */}
              <div className="relative">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-400 bg-gray-50/50"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="relative">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-400 bg-gray-50/50"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Message Field */}
              <div className="relative">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Tell us how we can help you..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-400 bg-gray-50/50 resize-none"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 " />
                    Send Message
                  </>
                )}
              </button>
            </form>

            {/* Login Reminder */}
            {!token && (
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <p className="text-yellow-800 text-sm flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Please login to send us a message
                </p>
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            
            {/* Contact Cards */}
            <div className="grid gap-6">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h4>
                      <p className="text-lg text-gray-900 font-medium mb-1">{item.info}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Why Contact Us?</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Technical support and troubleshooting
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Book recommendations and suggestions
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Feature requests and feedback
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Partnership and collaboration inquiries
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;