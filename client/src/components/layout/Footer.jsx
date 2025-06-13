import React from 'react';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo + About */}
        <div>
      <h2 className="text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent hover:from-purple-600 hover:via-blue-600 hover:to-purple-700 transition-all duration-500 cursor-pointer mb-2 drop-shadow-sm">
  BookHub
</h2>
          <p className="text-sm text-gray-400">
            Building beautiful and responsive UIs with React & Tailwind. Stay connected.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-gray-300">
            <li><NavLink to="/" className="hover:text-blue-400">Home</NavLink></li>
            <li><NavLink to="/about" className="hover:text-blue-400">About</NavLink></li>
            <li><NavLink to="/contact" className="hover:text-blue-400">Contact</NavLink></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
          <form className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 rounded-md text-black bg-gray-100 focus:outline-none"
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-md">
              Subscribe
            </button>
          </form>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-blue-400"><Facebook /></a>
            <a href="#" className="hover:text-blue-400"><Twitter /></a>
            <a href="#" className="hover:text-blue-400"><Instagram /></a>
            <a href="mailto:pravesh63362pk@email.com" className="hover:text-blue-400"><Mail /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-800 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} MyWebsite. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
