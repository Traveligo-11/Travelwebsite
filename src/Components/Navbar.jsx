import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import logo from './logo.jpeg';

const Navbar = () => {
  const navItems = [
    { name: 'Home', label: 'Home', path: '/Home' },
    { name: 'flights', label: 'Flights', path: '/flights' },
    { name: 'hotels', label: 'Hotels', path: '/hotels' },
    { name: 'holidays', label: 'Holidays', path: '/holidays' },
    { name: 'trains', label: 'Trains', path: '' },
    { name: 'cabs', label: 'Cabs', path: '/' },
  ];

  const [activeTab, setActiveTab] = useState('flights');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-pink-50 to-blue-50 shadow-lg sticky top-0 z-50 border-b border-pink-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center group">
            <motion.img 
              src={logo} 
              alt="Logo" 
              className="h-12 w-auto rounded-lg shadow-sm group-hover:shadow-md transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            />
      
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div 
                key={item.name}
                className="relative"
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  to={item.path}
                  className={`relative py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === item.name
                      ? 'text-white bg-gradient-to-r from-pink-500 to-blue-500 shadow-lg'
                      : 'text-gray-700 hover:text-pink-600'
                  }`}
                  onClick={() => setActiveTab(item.name)}
                >
                  {item.label}
                  {hoveredItem === item.name && (
                    <motion.span 
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-500"
                      layoutId="underline"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </div>
            ))}
          </div>
          
          {/* Mobile Hamburger Menu */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={toggleMobileMenu}
              className="p-2 rounded-full bg-gradient-to-r from-pink-100 to-blue-100 shadow-sm hover:shadow-md transition-all"
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="text-xl text-pink-600" />
              ) : (
                <FaBars className="text-xl text-gray-700" />
              )}
            </motion.button>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              ref={mobileMenuRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-white py-3 px-4 rounded-lg shadow-xl absolute left-4 right-4 z-50 border border-gray-100 mt-2"
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center justify-between py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                      activeTab === item.name
                        ? 'bg-pink-50 text-pink-600'
                        : 'text-gray-700 hover:bg-pink-50'
                    }`}
                    onClick={() => {
                      setActiveTab(item.name);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {item.label}
                    <FaChevronDown className="text-xs text-gray-400 transform rotate-90" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;