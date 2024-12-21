import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Set dark mode as default

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Toggle Dark/Light Mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Check for the user's saved mode preference, but default to dark mode if not set
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    if (savedMode === null) {
      // If no saved mode, set dark mode as default
      localStorage.setItem("darkMode", "true");
      setIsDarkMode(true);
    } else {
      setIsDarkMode(savedMode);
    }
  }, []);

  // Update the body class based on the dark mode state
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("bg-gray-900", "text-white");
      document.body.classList.remove("bg-white", "text-black");
      localStorage.setItem("darkMode", "true");
    } else {
      document.body.classList.add("bg-white", "text-black");
      document.body.classList.remove("bg-gray-900", "text-white");
      localStorage.setItem("darkMode", "false");
    }
  }, [isDarkMode]);

  return (
    <nav className="bg-[#111827] p-4 text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">TradeWise</h1>
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white text-2xl focus:outline-none"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <ul
          className={`lg:flex lg:gap-6 lg:items-center ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <li>
            <Link to="/" className="block py-2 px-4 hover:bg-blue-700">
              Home
            </Link>
          </li>
          <li>
            <Link to="/education" className="block py-2 px-4 hover:bg-blue-700">
              Education
            </Link>
          </li>
          <li>
            <Link to="/tools" className="block py-2 px-4 hover:bg-blue-700">
              Tools
            </Link>
          </li>
          <li>
            <Link to="/community" className="block py-2 px-4 hover:bg-blue-700">
              Community
            </Link>
          </li>
        </ul>
        {/* Dark/Light Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 text-sm font-medium rounded-md focus:outline-none text-white"
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
