import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useAuth()
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <h2 className="text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent hover:from-purple-600 hover:via-blue-600 hover:to-purple-700 transition-all duration-500 cursor-pointer mb-2 drop-shadow-sm">
  BookHub
</h2>

        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <NavLink to="/" className="hover:text-blue-600 transition">
            Home
          </NavLink>
          <NavLink to="/about" className="hover:text-blue-600 transition">
            About
          </NavLink>
          <NavLink to="/contact" className="hover:text-blue-600 transition">
            Contact
          </NavLink>

    {isLoggedIn && <NavLink to="/bookshelf" className="hover:text-blue-600 transition">
            Bookshelf
          </NavLink>}
          {isLoggedIn && <NavLink to="/book" className="hover:text-blue-600 transition">
            Book
          </NavLink>}



{isLoggedIn ? <NavLink to="/logout" className="hover:text-blue-600 transition">
            Logout
          </NavLink> : (<><NavLink to="/register" className="hover:text-blue-600 transition">
            Registration
          </NavLink>
          <NavLink
            to="/login"
            className="block text-gray-700 hover:text-blue-600"
          >
            Login
          </NavLink> </>)}
          
        </nav>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2 shadow-sm">
          <NavLink
            to="/"
            className="block text-gray-700 hover:text-blue-600"
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="block text-gray-700 hover:text-blue-600"
            onClick={closeMenu}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="block text-gray-700 hover:text-blue-600"
            onClick={closeMenu}
          >
            Contact
          </NavLink>

          {isLoggedIn && <NavLink
            to="/bookshelf"
            className="block text-gray-700 hover:text-blue-600"
            onClick={closeMenu}
          >
            Bookshelf
          </NavLink>}
          {isLoggedIn && <NavLink
            to="/book"
            className="block text-gray-700 hover:text-blue-600"
            onClick={closeMenu}
          >
            Book
          </NavLink>}



          {isLoggedIn ?<NavLink
            to="/logout"
            className="block text-gray-700 hover:text-blue-600"
            onClick={closeMenu}
          >
            Logout
          </NavLink> : (<>
           <NavLink
            to="/register"
            className="block text-gray-700 hover:text-blue-600"
            onClick={closeMenu}
          >
            Registration
          </NavLink>
          <NavLink
            to="/login"
            className="block text-gray-700 hover:text-blue-600"
            onClick={closeMenu}
          >
            Login
          </NavLink>
          </>) }
         
        </div>
      )}
    </header>
  );
};

export default Header;
