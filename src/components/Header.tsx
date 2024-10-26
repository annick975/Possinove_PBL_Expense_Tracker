import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-black text-white py-4 px-8 fixed w-full top-0 z-50 flex justify-between items-center p-4 md:p-10">
      {/* Logo */}
      <div className="text-lg font-semibold">Expense Tracker</div>

      {/* Links for Large Screens */}
      <div className="hidden md:flex space-x-8">
        <a href="#" className="hover:text-gray-400">
          Home
        </a>
        <a href="#" className="hover:text-gray-400">
          About
        </a>
        <a href="#" className="hover:text-gray-400">
          Service
        </a>
        <a href="#" className="hover:text-gray-400">
          Testimonial
        </a>
        <a href="#" className="hover:text-purple-400 text-purple-500">
          Learn More
        </a>
      </div>

      {/* Button for Large Screens */}
      <div className="hidden md:block">
        <button className="px-4 py-2 border border-purple-500 text-purple-500 rounded-full hover:bg-purple-500 hover:text-white transition duration-300">
          Get Started
        </button>
      </div>

      {/* Hamburger Icon for Small Screens */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu}>
          {isMenuOpen ? (
            <FaTimes className="text-white text-2xl" />
          ) : (
            <FaBars className="text-white text-2xl" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black text-white flex flex-col items-center space-y-4 py-4 md:hidden">
          <a href="#" onClick={closeMenu} className="hover:text-gray-400">
            Home
          </a>
          <a href="#" onClick={closeMenu} className="hover:text-gray-400">
            About
          </a>
          <a href="#" onClick={closeMenu} className="hover:text-gray-400">
            Service
          </a>
          <a href="#" onClick={closeMenu} className="hover:text-gray-400">
            Testimonial
          </a>
          <a
            href="#"
            onClick={closeMenu}
            className="hover:text-purple-400 text-purple-500"
          >
            Learn More
          </a>
          <button
            onClick={closeMenu}
            className="px-4 py-2 border border-purple-500 text-purple-500 rounded-full hover:bg-purple-500 hover:text-white transition duration-300"
          >
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;
