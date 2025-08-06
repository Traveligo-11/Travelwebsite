import React, { useState, useEffect, useRef } from 'react';
import { 
  FaPlane, FaSearch, FaCalendarAlt, FaUser, FaPhone, FaEnvelope, 
  FaUserTie, FaStar, FaExchangeAlt, FaTimes, FaCheck, FaHeart,
  FaMapMarkerAlt, FaUsers, FaChair, FaUmbrellaBeach, FaHotel,
  FaSuitcaseRolling, FaGlobeAmericas, FaHeadset, FaRegSmileWink,
  FaArrowRight, FaPaperPlane, FaArrowLeft, FaEdit, FaMoon, FaSun
} from 'react-icons/fa';
import { IoRocketSharp } from 'react-icons/io5';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FlightBooking = () => {
  const [tripType, setTripType] = useState('round');
  const [fromCity, setFromCity] = useState('Delhi');
  const [toCity, setToCity] = useState('Mumbai');
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [passengers, setPassengers] = useState(1);
  const [travelClass, setTravelClass] = useState('Economy');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [showDepartureCalendar, setShowDepartureCalendar] = useState(false);
  const [showReturnCalendar, setShowReturnCalendar] = useState(false);
  const [editingDeparture, setEditingDeparture] = useState(false);
  const [editingReturn, setEditingReturn] = useState(false);
  const [departureInput, setDepartureInput] = useState('');
  const [returnInput, setReturnInput] = useState('');
  const [theme, setTheme] = useState('light');
  const [editingFromCity, setEditingFromCity] = useState(false);
  const [editingToCity, setEditingToCity] = useState(false);
  const [editingTravelClass, setEditingTravelClass] = useState(false);
  
  const [requestData, setRequestData] = useState({
    name: '',
    email: '',
    phone: '',
    fromCity: 'Delhi',
    toCity: 'Mumbai',
    departure: '',
    return: '',
    passengers: 1,
    class: 'Economy',
    specialRequests: ''
  });

  const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Goa', 'Jaipur', 'Ahmedabad', 'Pune'];
  const flightClasses = ['Economy', 'Premium Economy', 'Business', 'First Class'];
  const calendarRef = useRef(null);
  const fromCityRef = useRef(null);
  const toCityRef = useRef(null);
  const travelClassRef = useRef(null);

  useEffect(() => {
    emailjs.init('37pN2ThzFwwhwk7ai');
    
    // Handle clicks outside the calendar
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowDepartureCalendar(false);
        setShowReturnCalendar(false);
        setEditingDeparture(false);
        setEditingReturn(false);
      }
      
      if (fromCityRef.current && !fromCityRef.current.contains(event.target)) {
        setEditingFromCity(false);
      }
      
      if (toCityRef.current && !toCityRef.current.contains(event.target)) {
        setEditingToCity(false);
      }
      
      if (travelClassRef.current && !travelClassRef.current.contains(event.target)) {
        setEditingTravelClass(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (departureDate) {
      setDepartureInput(departureDate.toLocaleDateString());
    }
    if (returnDate) {
      setReturnInput(returnDate.toLocaleDateString());
    }
  }, [departureDate, returnDate]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleSwapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
    setRequestData(prev => ({
      ...prev,
      fromCity: toCity,
      toCity: fromCity
    }));
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');

    if (!requestData.name || !requestData.email || !requestData.phone || !requestData.departure) {
      setFormError('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    try {
      const templateParams = {
        from_name: requestData.name,
        from_email: requestData.email,
        phone_number: requestData.phone,
        from_city: requestData.fromCity,
        to_city: requestData.toCity,
        departure_date: requestData.departure,
        return_date: requestData.return || 'One Way Trip',
        passengers: requestData.passengers,
        travel_class: requestData.class,
        special_requests: requestData.specialRequests || 'None',
        reply_to: requestData.email
      };

      await emailjs.send(
        'service_ov629rm',
        'template_jr1dnto',
        templateParams
      );

      setSubmitSuccess(true);
      setTimeout(() => {
        setShowRequestForm(false);
        setSubmitSuccess(false);
      }, 3000);

      setRequestData({
        name: '',
        email: '',
        phone: '',
        fromCity: 'Delhi',
        toCity: 'Mumbai',
        departure: '',
        return: '',
        passengers: 1,
        class: 'Economy',
        specialRequests: ''
      });

    } catch (error) {
      console.error('Failed to send email:', error);
      setFormError('Failed to submit request. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRequestData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDepartureDateChange = (date) => {
    setDepartureDate(date);
    setRequestData(prev => ({
      ...prev,
      departure: date ? date.toISOString().split('T')[0] : ''
    }));
    setShowDepartureCalendar(false);
    setEditingDeparture(false);
  };

  const handleReturnDateChange = (date) => {
    setReturnDate(date);
    setRequestData(prev => ({
      ...prev,
      return: date ? date.toISOString().split('T')[0] : ''
    }));
    setShowReturnCalendar(false);
    setEditingReturn(false);
  };

  const handleDepartureInputChange = (e) => {
    setDepartureInput(e.target.value);
    try {
      const parsedDate = new Date(e.target.value);
      if (!isNaN(parsedDate.getTime())) {
        setDepartureDate(parsedDate);
        setRequestData(prev => ({
          ...prev,
          departure: parsedDate.toISOString().split('T')[0]
        }));
      }
    } catch (error) {
      console.error('Error parsing date:', error);
    }
  };

  const handleReturnInputChange = (e) => {
    setReturnInput(e.target.value);
    try {
      const parsedDate = new Date(e.target.value);
      if (!isNaN(parsedDate.getTime())) {
        setReturnDate(parsedDate);
        setRequestData(prev => ({
          ...prev,
          return: parsedDate.toISOString().split('T')[0]
        }));
      }
    } catch (error) {
      console.error('Error parsing date:', error);
    }
  };

  const toggleDepartureEdit = () => {
    setEditingDeparture(!editingDeparture);
    setShowDepartureCalendar(false);
    if (!editingDeparture) {
      setTimeout(() => {
        document.querySelector('.departure-input')?.focus();
      }, 0);
    }
  };

  const toggleReturnEdit = () => {
    setEditingReturn(!editingReturn);
    setShowReturnCalendar(false);
    if (!editingReturn) {
      setTimeout(() => {
        document.querySelector('.return-input')?.focus();
      }, 0);
    }
  };

  const toggleFromCityEdit = () => {
    setEditingFromCity(!editingFromCity);
    if (!editingFromCity) {
      setTimeout(() => {
        document.querySelector('.from-city-select')?.focus();
      }, 0);
    }
  };

  const toggleToCityEdit = () => {
    setEditingToCity(!editingToCity);
    if (!editingToCity) {
      setTimeout(() => {
        document.querySelector('.to-city-select')?.focus();
      }, 0);
    }
  };

  const toggleTravelClassEdit = () => {
    setEditingTravelClass(!editingTravelClass);
    if (!editingTravelClass) {
      setTimeout(() => {
        document.querySelector('.travel-class-select')?.focus();
      }, 0);
    }
  };

  const handleFromCityChange = (e) => {
    const value = e.target.value;
    setFromCity(value);
    setRequestData(prev => ({
      ...prev,
      fromCity: value
    }));
  };

  const handleToCityChange = (e) => {
    const value = e.target.value;
    setToCity(value);
    setRequestData(prev => ({
      ...prev,
      toCity: value
    }));
  };

  const handleTravelClassChange = (e) => {
    const value = e.target.value;
    setTravelClass(value);
    setRequestData(prev => ({
      ...prev,
      class: value
    }));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  const calendarVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}>
      {/* Theme Toggle Button */}
      <button 
        onClick={toggleTheme}
        className={`fixed top-4 right-4 z-50 p-3 rounded-full shadow-lg ${theme === 'dark' ? 'bg-yellow-300 text-gray-900' : 'bg-gray-800 text-yellow-300'}`}
      >
        {theme === 'dark' ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
      </button>

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`relative rounded-3xl p-8 md:p-12 mb-12 overflow-hidden shadow-2xl ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-gray-800 via-blue-900 to-purple-900' 
            : 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500'
        }`}
      >
        <div className="absolute inset-0 bg-white opacity-10"></div>
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-blue-400 rounded-full opacity-20"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-purple-300 rounded-full opacity-20"></div>
        
        {/* Floating elements */}
        <div className="absolute top-1/4 left-10 opacity-10">
          <FaPlane className="text-white text-6xl transform rotate-45 animate-float" />
        </div>
        <div className="absolute bottom-1/3 right-20 opacity-10">
          <FaSuitcaseRolling className="text-white text-5xl animate-float-delay" />
        </div>
        
        <div className="relative z-10 text-center">
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center bg-white bg-opacity-30 px-6 py-2 rounded-full mb-6 shadow-lg"
          >
            <FaHeart className="mr-2 text-pink-300 animate-pulse" />
            <span className="text-sm font-bold text-white">Most Popular Travel Service</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-white"
          >
            Discover Your Perfect Flight
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto font-light text-white"
          >
            Let us create a <span className="font-semibold">seamless travel experience</span> tailored just for you
          </motion.p>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-6"
          >
            {[
              { 
                icon: <IoRocketSharp className="mr-2 text-2xl animate-bounce text-yellow-300" />, 
                text: "Best Prices Guaranteed",
                bg: "bg-gradient-to-r from-yellow-500 to-yellow-600"
              },
              { 
                icon: <FaUserTie className="mr-2 text-2xl text-blue-200" />, 
                text: "24/7 Expert Support",
                bg: "bg-gradient-to-r from-blue-500 to-blue-600"
              },
              { 
                icon: <FaStar className="mr-2 text-2xl text-purple-200" />, 
                text: "Exclusive Deals",
                bg: "bg-gradient-to-r from-purple-500 to-purple-600"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`flex items-center ${item.bg} px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer group`}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <div className="group-hover:animate-pulse">
                  {item.icon}
                </div>
                <span className="font-bold text-white text-lg">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Search Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`rounded-3xl shadow-2xl p-6 md:p-8 mb-16 relative overflow-hidden border-2 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700 hover:shadow-3xl' 
            : 'bg-white border-pink-100 hover:shadow-3xl'
        } transition-all duration-300`}
      >
        <div className={`absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold px-8 py-3 rounded-full shadow-lg z-10 flex items-center ${
          theme === 'dark' ? 'shadow-lg' : 'shadow-xl'
        }`}>
          <FaPlane className="mr-3 animate-bounce" />
          <span className="text-lg">Plan Your Dream Trip</span>
        </div>
        <br />
          <br />
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 opacity-10">
          <FaPlane className={`text-6xl transform rotate-45 animate-float ${theme === 'dark' ? 'text-purple-300' : 'text-purple-300'}`} />
        </div>
        <div className="absolute bottom-10 left-10 opacity-10">
          <FaGlobeAmericas className={`text-6xl animate-spin-slow ${theme === 'dark' ? 'text-blue-300' : 'text-blue-300'}`} />
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8 mt-8">
          {[
            { type: 'round', label: 'Round Trip', icon: <FaExchangeAlt className="mr-2" /> },
            { type: 'oneWay', label: 'One Way', icon: <FaArrowRight className="mr-2" /> }
          ].map((option) => (
            <motion.button
              key={option.type}
              className={`flex items-center px-8 py-3 rounded-full transition-all text-lg font-medium ${
                tripType === option.type 
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg' 
                  : theme === 'dark'
                    ? 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-gray-200 border border-gray-600'
                    : 'bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-700 border border-gray-200'
              }`}
              onClick={() => setTripType(option.type)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {option.icon}
              <span>{option.label}</span>
            </motion.button>
          ))}
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {/* From City */}
          <motion.div 
            variants={itemVariants}
            className={`border-2 rounded-xl p-5 transition-colors group shadow-sm ${
              theme === 'dark'
                ? 'border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 hover:border-pink-400'
                : 'border-pink-100 bg-gradient-to-br from-gray-50 to-white hover:border-pink-300'
            }`}
            whileHover={{ y: -5 }}
          >
            <label className={`block text-sm font-bold mb-3 items-center ${
              theme === 'dark' ? 'text-pink-400' : 'text-pink-600'
            }`}>
              <FaMapMarkerAlt className="mr-2" /> From
            </label>
            <div className="flex items-center">
              <div className={`p-3 rounded-lg mr-4 group-hover:from-pink-200 group-hover:to-pink-300 transition-colors shadow-sm ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-pink-900 to-pink-800'
                  : 'bg-gradient-to-r from-pink-100 to-pink-200'
              }`}>
                <FaPlane className={`text-xl ${theme === 'dark' ? 'text-pink-400' : 'text-pink-600'}`} />
              </div>
              <select 
                className={`w-full outline-none bg-transparent appearance-none font-bold text-lg ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                }`}
                value={fromCity}
                onChange={(e) => {
                  setFromCity(e.target.value);
                  setRequestData(prev => ({...prev, fromCity: e.target.value}));
                }}
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Swap Button */}
          <motion.div 
            className="flex items-center justify-center"
            variants={itemVariants}
          >
            <motion.button 
              onClick={handleSwapCities}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`p-5 rounded-full shadow-md transition-all ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-pink-900 to-purple-900 hover:from-pink-800 hover:to-purple-800 text-pink-400 hover:text-pink-300'
                  : 'bg-gradient-to-r from-pink-100 to-purple-100 hover:from-pink-200 hover:to-purple-200 text-pink-600 hover:text-pink-700'
              }`}
              aria-label="Swap cities"
              whileHover={{ rotate: 180, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaExchangeAlt className="text-2xl" />
            </motion.button>
          </motion.div>

          {/* To City */}
          <motion.div 
            variants={itemVariants}
            className={`border-2 rounded-xl p-5 transition-colors group shadow-sm ${
              theme === 'dark'
                ? 'border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 hover:border-purple-400'
                : 'border-pink-100 bg-gradient-to-br from-gray-50 to-white hover:border-pink-300'
            }`}
            whileHover={{ y: -5 }}
          >
            <label className={`block text-sm font-bold mb-3 items-center ${
              theme === 'dark' ? 'text-purple-400' : 'text-pink-600'
            }`}>
              <FaMapMarkerAlt className="mr-2" /> To
            </label>
            <div className="flex items-center">
              <div className={`p-3 rounded-lg mr-4 group-hover:from-purple-200 group-hover:to-purple-300 transition-colors shadow-sm ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-purple-900 to-purple-800'
                  : 'bg-gradient-to-r from-purple-100 to-purple-200'
              }`}>
                <FaPlane className={`text-xl transform rotate-45 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
              </div>
              <select 
                className={`w-full outline-none bg-transparent appearance-none font-bold text-lg ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                }`}
                value={toCity}
                onChange={(e) => {
                  setToCity(e.target.value);
                  setRequestData(prev => ({...prev, toCity: e.target.value}));
                }}
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Departure Date */}
          <motion.div 
            variants={itemVariants}
            className={`border-2 rounded-xl p-5 transition-colors group shadow-sm relative ${
              theme === 'dark'
                ? 'border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 hover:border-blue-400'
                : 'border-pink-100 bg-gradient-to-br from-gray-50 to-white hover:border-pink-300'
            }`}
            whileHover={{ y: -5 }}
          >
            <label className={`block text-sm font-bold mb-3 items-center ${
              theme === 'dark' ? 'text-blue-400' : 'text-pink-600'
            }`}>
              <FaCalendarAlt className="mr-2" /> Departure Date
            </label>
            <div className="flex items-center">
              <div className={`p-3 rounded-lg mr-4 group-hover:from-blue-200 group-hover:to-blue-300 transition-colors shadow-sm ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-blue-900 to-blue-800'
                  : 'bg-gradient-to-r from-blue-100 to-blue-200'
              }`}>
                <FaCalendarAlt className={`text-xl ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div 
                className={`w-full font-bold text-lg cursor-pointer ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                }`}
                onClick={() => {
                  setShowDepartureCalendar(true);
                  setShowReturnCalendar(false);
                }}
              >
                {departureDate ? departureDate.toLocaleDateString() : 'Select date'}
              </div>
            </div>
            
            {/* Calendar Popup */}
            <AnimatePresence>
              {showDepartureCalendar && (
                <motion.div
                  ref={calendarRef}
                  variants={calendarVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={`absolute z-10 mt-2 rounded-xl shadow-2xl ${
                    theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                  }`}
                >
                  <DatePicker
                    selected={departureDate}
                    onChange={handleDepartureDateChange}
                    inline
                    minDate={new Date()}
                    calendarClassName={theme === 'dark' ? 'dark-theme' : ''}
                    dayClassName={() => theme === 'dark' ? 'dark-day' : ''}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Return Date */}
          {tripType === 'round' && (
            <motion.div 
              variants={itemVariants}
              className={`border-2 rounded-xl p-5 transition-colors group shadow-sm relative ${
                theme === 'dark'
                  ? 'border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 hover:border-green-400'
                  : 'border-pink-100 bg-gradient-to-br from-gray-50 to-white hover:border-pink-300'
              }`}
              whileHover={{ y: -5 }}
            >
              <label className={`block text-sm font-bold mb-3 items-center ${
                theme === 'dark' ? 'text-green-400' : 'text-pink-600'
              }`}>
                <FaCalendarAlt className="mr-2" /> Return Date
              </label>
              <div className="flex items-center">
                <div className={`p-3 rounded-lg mr-4 group-hover:from-green-200 group-hover:to-green-300 transition-colors shadow-sm ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-green-900 to-green-800'
                    : 'bg-gradient-to-r from-green-100 to-green-200'
                }`}>
                  <FaCalendarAlt className={`text-xl ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                </div>
                <div 
                  className={`w-full font-bold text-lg cursor-pointer ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                  }`}
                  onClick={() => {
                    setShowReturnCalendar(true);
                    setShowDepartureCalendar(false);
                  }}
                >
                  {returnDate ? returnDate.toLocaleDateString() : 'Select date'}
                </div>
              </div>
              
              {/* Calendar Popup */}
              <AnimatePresence>
                {showReturnCalendar && (
                  <motion.div
                    ref={calendarRef}
                    variants={calendarVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={`absolute z-10 mt-2 rounded-xl shadow-2xl ${
                      theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                    }`}
                  >
                    <DatePicker
                      selected={returnDate}
                      onChange={handleReturnDateChange}
                      inline
                      minDate={departureDate || new Date()}
                      calendarClassName={theme === 'dark' ? 'dark-theme' : ''}
                      dayClassName={() => theme === 'dark' ? 'dark-day' : ''}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Passengers */}
          <motion.div 
            variants={itemVariants}
            className={`border-2 rounded-xl p-5 transition-colors group shadow-sm ${
              theme === 'dark'
                ? 'border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 hover:border-yellow-400'
                : 'border-pink-100 bg-gradient-to-br from-gray-50 to-white hover:border-pink-300'
            }`}
            whileHover={{ y: -5 }}
          >
            <label className={`block text-sm font-bold mb-3  items-center ${
              theme === 'dark' ? 'text-yellow-400' : 'text-pink-600'
            }`}>
              <FaUsers className="mr-2" /> Passengers
            </label>
            <div className="flex items-center">
              <div className={`p-3 rounded-lg mr-4 group-hover:from-yellow-200 group-hover:to-yellow-300 transition-colors shadow-sm ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-yellow-900 to-yellow-800'
                  : 'bg-gradient-to-r from-yellow-100 to-yellow-200'
              }`}>
                <FaUser className={`text-xl ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`} />
              </div>
              <select 
                className={`w-full outline-none bg-transparent appearance-none font-bold text-lg ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                }`}
                value={passengers}
                onChange={(e) => {
                  setPassengers(e.target.value);
                  setRequestData(prev => ({...prev, passengers: e.target.value}));
                }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Travel Class */}
          <motion.div 
            variants={itemVariants}
            className={`border-2 rounded-xl p-5 transition-colors group shadow-sm ${
              theme === 'dark'
                ? 'border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 hover:border-indigo-400'
                : 'border-pink-100 bg-gradient-to-br from-gray-50 to-white hover:border-pink-300'
            }`}
            whileHover={{ y: -5 }}
          >
            <label className={`block text-sm font-bold mb-3  items-center ${
              theme === 'dark' ? 'text-indigo-400' : 'text-pink-600'
            }`}>
              <FaChair className="mr-2" /> Travel Class
            </label>
            <div className="flex items-center">
              <div className={`p-3 rounded-lg mr-4 group-hover:from-indigo-200 group-hover:to-indigo-300 transition-colors shadow-sm ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-indigo-900 to-indigo-800'
                  : 'bg-gradient-to-r from-indigo-100 to-indigo-200'
              }`}>
                <FaPlane className={`text-xl ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
              </div>
              <select 
                className={`w-full outline-none bg-transparent appearance-none font-bold text-lg ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                }`}
                value={travelClass}
                onChange={(e) => {
                  setTravelClass(e.target.value);
                  setRequestData(prev => ({...prev, class: e.target.value}));
                }}
              >
                <option value="Economy">Economy</option>
                <option value="Premium Economy">Premium Economy</option>
                <option value="Business">Business</option>
                <option value="First Class">First Class</option>
              </select>
            </div>
          </motion.div>
        </motion.div>

        <motion.button 
          onClick={() => setShowRequestForm(true)}
          className={`w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white font-bold py-5 px-6 rounded-xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all group ${
            theme === 'dark' ? 'shadow-lg' : 'shadow-xl'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaSearch className="mr-3 text-xl group-hover:animate-bounce" /> 
          <span className="text-xl">FIND FLIGHT DEALS</span>
        </motion.button>
      </motion.div>

      {/* Enhanced Request Form Modal with Attractive Background */}
      {showRequestForm && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
        >
          {/* Sky Background with Clouds */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-600 overflow-hidden">
            {/* Animated Clouds */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-white rounded-full opacity-80"
                style={{
                  width: Math.random() * 200 + 100 + 'px',
                  height: Math.random() * 60 + 40 + 'px',
                  top: Math.random() * 100 + '%',
                  left: Math.random() * 100 + '%',
                }}
                animate={{
                  x: [0, Math.random() * 200 - 100],
                  opacity: [0.7, 0.9, 0.7]
                }}
                transition={{
                  duration: Math.random() * 20 + 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              />
            ))}
            
            {/* Floating Airplane */}
            <motion.div
              className="absolute text-white text-4xl"
              style={{
                top: '20%',
                left: '10%',
              }}
              animate={{
                x: ['-100%', '120%'],
                y: ['0%', '10%', '0%'],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <FaPlane className="transform rotate-45" />
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-white rounded-3xl shadow-3xl max-w-md w-full max-h-[90vh] overflow-hidden border-4 border-blue-100 flex flex-col"
          >
            {submitSuccess ? (
              <div className="p-8 text-center bg-gradient-to-b from-white to-blue-50">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-gradient-to-r from-green-400 to-green-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                >
                  <FaCheck className="text-white text-4xl" />
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Request Sent Successfully!</h2>
                <p className="text-lg text-gray-600 mb-8">We'll contact you shortly with the best flight options for your trip.</p>
                <motion.button
                  onClick={() => {
                    setShowRequestForm(false);
                    setSubmitSuccess(false);
                  }}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </div>
            ) : (
              <>
                <div className="relative overflow-hidden">
                  {/* Header with Back Button */}
                  <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-8 text-white relative">
                    <div className="absolute inset-0 bg-white opacity-10"></div>
                    <div className="relative z-10 flex items-center">
                      <motion.button 
                        onClick={() => setShowRequestForm(false)}
                        className="mr-4 text-white hover:text-blue-200 transition-colors"
                        whileHover={{ x: -5 }}
                      >
                        <FaArrowLeft className="text-2xl" />
                      </motion.button>
                      <div>
                        <h2 className="text-3xl font-bold">Flight Request Details</h2>
                        <p className="text-lg opacity-90 mt-2">Complete your information to get the best deals</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Scrollable Form Content */}
                  <div className="overflow-y-auto max-h-[60vh] p-8 bg-white bg-opacity-90 backdrop-blur-sm">
                    {formError && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg"
                      >
                        <p className="font-medium">{formError}</p>
                      </motion.div>
                    )}
                    
                    <form onSubmit={handleRequestSubmit} className="space-y-6">
                      {/* Name Field */}
                      <div className="relative group">
                        <label className="block text-sm font-bold text-pink-600 mb-2">Full Name*</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FaUser className="text-pink-400 text-lg group-hover:text-pink-500 transition-colors" />
                          </div>
                          <input
                            type="text"
                            name="name"
                            value={requestData.name}
                            onChange={handleInputChange}
                            className="w-full pl-12 border-2 border-pink-100 rounded-xl px-4 py-4 focus:ring-2 focus:ring-pink-300 focus:border-pink-300 font-medium text-gray-800 bg-white hover:bg-pink-50 transition-colors"
                            required
                            placeholder="John Doe"
                          />
                        </div>
                      </div>

                      {/* Email Field */}
                      <div className="relative group">
                        <label className="block text-sm font-bold text-pink-600 mb-2">Email*</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FaEnvelope className="text-pink-400 text-lg group-hover:text-pink-500 transition-colors" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            value={requestData.email}
                            onChange={handleInputChange}
                            className="w-full pl-12 border-2 border-pink-100 rounded-xl px-4 py-4 focus:ring-2 focus:ring-pink-300 focus:border-pink-300 font-medium text-gray-800 bg-white hover:bg-pink-50 transition-colors"
                            required
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      {/* Phone Field */}
                      <div className="relative group">
                        <label className="block text-sm font-bold text-pink-600 mb-2">Phone Number*</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FaPhone className="text-pink-400 text-lg group-hover:text-pink-500 transition-colors" />
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            value={requestData.phone}
                            onChange={handleInputChange}
                            className="w-full pl-12 border-2 border-pink-100 rounded-xl px-4 py-4 focus:ring-2 focus:ring-pink-300 focus:border-pink-300 font-medium text-gray-800 bg-white hover:bg-pink-50 transition-colors"
                            required
                            placeholder="+91 9876543210"
                          />
                        </div>
                      </div>

                      {/* Flight Details */}
                      <div className="grid grid-cols-2 gap-4">
                        {/* From City - Editable */}
                        <div 
                          ref={fromCityRef}
                          className={`bg-gradient-to-br from-pink-50 to-white p-4 rounded-xl border border-pink-100 shadow-sm relative ${
                            editingFromCity ? 'border-pink-300' : ''
                          }`}
                        >
                          <label className="block text-sm font-bold text-pink-600 mb-2">From</label>
                          <div className="font-medium text-gray-800 flex items-center">
                            <FaMapMarkerAlt className="text-pink-400 mr-2" />
                            {editingFromCity ? (
                              <select
                                className="from-city-select border border-pink-300 rounded px-2 py-1 outline-none"
                                value={requestData.fromCity}
                                onChange={handleFromCityChange}
                                autoFocus
                              >
                                {cities.map(city => (
                                  <option key={city} value={city}>{city}</option>
                                ))}
                              </select>
                            ) : (
                              <span className="cursor-pointer" onClick={toggleFromCityEdit}>
                                {requestData.fromCity}
                              </span>
                            )}
                            <button 
                              type="button"
                              onClick={toggleFromCityEdit}
                              className="ml-2 text-pink-500 hover:text-pink-700"
                            >
                              <FaEdit className="text-sm" />
                            </button>
                          </div>
                        </div>

                        {/* To City - Editable */}
                        <div 
                          ref={toCityRef}
                          className={`bg-gradient-to-br from-purple-50 to-white p-4 rounded-xl border border-purple-100 shadow-sm relative ${
                            editingToCity ? 'border-purple-300' : ''
                          }`}
                        >
                          <label className="block text-sm font-bold text-purple-600 mb-2">To</label>
                          <div className="font-medium text-gray-800 flex items-center">
                            <FaMapMarkerAlt className="text-purple-400 mr-2" />
                            {editingToCity ? (
                              <select
                                className="to-city-select border border-purple-300 rounded px-2 py-1 outline-none"
                                value={requestData.toCity}
                                onChange={handleToCityChange}
                                autoFocus
                              >
                                {cities.map(city => (
                                  <option key={city} value={city}>{city}</option>
                                ))}
                              </select>
                            ) : (
                              <span className="cursor-pointer" onClick={toggleToCityEdit}>
                                {requestData.toCity}
                              </span>
                            )}
                            <button 
                              type="button"
                              onClick={toggleToCityEdit}
                              className="ml-2 text-purple-500 hover:text-purple-700"
                            >
                              <FaEdit className="text-sm" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {/* Departure Date */}
                        <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl border border-blue-100 shadow-sm relative">
                          <label className="block text-sm font-bold text-blue-600 mb-2">Departure</label>
                          <div className="font-medium text-gray-800 flex items-center">
                            <FaCalendarAlt className="text-blue-400 mr-2" />
                            {editingDeparture ? (
                              <input
                                type="text"
                                className="departure-input border-b border-blue-300 outline-none bg-transparent"
                                value={departureInput}
                                onChange={handleDepartureInputChange}
                                onBlur={() => setEditingDeparture(false)}
                                autoFocus
                              />
                            ) : (
                              <span 
                                onClick={() => setShowDepartureCalendar(true)}
                                className="cursor-pointer"
                              >
                                {departureDate ? departureDate.toLocaleDateString() : 'Not specified'}
                              </span>
                            )}
                            <button 
                              type="button"
                              onClick={toggleDepartureEdit}
                              className="ml-2 text-blue-500 hover:text-blue-700"
                            >
                              <FaEdit className="text-sm" />
                            </button>
                          </div>
                          
                          {/* Calendar Popup */}
                          <AnimatePresence>
                            {showDepartureCalendar && (
                              <motion.div
                                ref={calendarRef}
                                variants={calendarVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="absolute z-10 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200"
                              >
                                <DatePicker
                                  selected={departureDate}
                                  onChange={handleDepartureDateChange}
                                  inline
                                  minDate={new Date()}
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Return Date */}
                        <div className="bg-gradient-to-br from-green-50 to-white p-4 rounded-xl border border-green-100 shadow-sm relative">
                          <label className="block text-sm font-bold text-green-600 mb-2">Return</label>
                          <div className="font-medium text-gray-800 flex items-center">
                            <FaCalendarAlt className="text-green-400 mr-2" />
                            {editingReturn ? (
                              <input
                                type="text"
                                className="return-input border-b border-green-300 outline-none bg-transparent"
                                value={returnInput}
                                onChange={handleReturnInputChange}
                                onBlur={() => setEditingReturn(false)}
                                autoFocus
                              />
                            ) : (
                              <span 
                                onClick={() => tripType === 'round' && setShowReturnCalendar(true)}
                                className={`${tripType === 'round' ? 'cursor-pointer' : ''}`}
                              >
                                {returnDate ? returnDate.toLocaleDateString() : tripType === 'oneWay' ? 'One Way' : 'Not specified'}
                              </span>
                            )}
                            {tripType === 'round' && (
                              <button 
                                type="button"
                                onClick={toggleReturnEdit}
                                className="ml-2 text-green-500 hover:text-green-700"
                              >
                                <FaEdit className="text-sm" />
                              </button>
                            )}
                          </div>
                          
                          {/* Calendar Popup */}
                          <AnimatePresence>
                            {showReturnCalendar && tripType === 'round' && (
                              <motion.div
                                ref={calendarRef}
                                variants={calendarVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="absolute z-10 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200"
                              >
                                <DatePicker
                                  selected={returnDate}
                                  onChange={handleReturnDateChange}
                                  inline
                                  minDate={departureDate || new Date()}
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Travel Class - Editable */}
                      <div 
                        ref={travelClassRef}
                        className="bg-gradient-to-br from-indigo-50 to-white p-4 rounded-xl border border-indigo-100 shadow-sm relative"
                      >
                        <label className="block text-sm font-bold text-indigo-600 mb-2">Travel Class</label>
                        <div className="font-medium text-gray-800 flex items-center">
                          <FaChair className="text-indigo-400 mr-2" />
                          {editingTravelClass ? (
                            <select
                              className="travel-class-select border border-indigo-300 rounded px-2 py-1 outline-none"
                              value={requestData.class}
                              onChange={handleTravelClassChange}
                              autoFocus
                            >
                              {flightClasses.map(type => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                            </select>
                          ) : (
                            <span className="cursor-pointer" onClick={toggleTravelClassEdit}>
                              {requestData.class}
                            </span>
                          )}
                          <button 
                            type="button"
                            onClick={toggleTravelClassEdit}
                            className="ml-2 text-indigo-500 hover:text-indigo-700"
                          >
                            <FaEdit className="text-sm" />
                          </button>
                        </div>
                      </div>

                      {/* Class Amenities Preview */}
                      <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        <label className="block text-sm font-bold text-gray-600 mb-2">Class Amenities</label>
                        <div className="flex flex-wrap gap-3 mt-3">
                          {requestData.class === 'Economy' && (
                            <>
                              <span className="flex items-center text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                                <FaChair className="mr-1" /> Standard Seats
                              </span>
                              <span className="flex items-center text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                                <FaUsers className="mr-1" /> Meal Options
                              </span>
                            </>
                          )}
                          {requestData.class === 'Premium Economy' && (
                            <>
                              <span className="flex items-center text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                                <FaChair className="mr-1" /> Extra Legroom
                              </span>
                              <span className="flex items-center text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                                <FaUser className="mr-1" /> Priority Boarding
                              </span>
                              <span className="flex items-center text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                                <FaSuitcaseRolling className="mr-1" /> Extra Baggage
                              </span>
                            </>
                          )}
                          {requestData.class === 'Business' && (
                            <>
                              <span className="flex items-center text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                                <FaChair className="mr-1" /> Lie-Flat Seats
                              </span>
                              <span className="flex items-center text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                                <FaUserTie className="mr-1" /> Lounge Access
                              </span>
                              <span className="flex items-center text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                                <FaRegSmileWink className="mr-1" /> Premium Dining
                              </span>
                            </>
                          )}
                          {requestData.class === 'First Class' && (
                            <>
                              <span className="flex items-center text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                                <FaChair className="mr-1" /> Private Suite
                              </span>
                              <span className="flex items-center text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                                <FaUserTie className="mr-1" /> Personal Butler
                              </span>
                              <span className="flex items-center text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                                <FaRegSmileWink className="mr-1" /> Luxury Amenities
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Special Requests */}
                      <div className="relative group">
                        <label className="block text-sm font-bold text-pink-600 mb-2">Special Requests</label>
                        <textarea
                          name="specialRequests"
                          value={requestData.specialRequests}
                          onChange={handleInputChange}
                          className="w-full border-2 border-pink-100 rounded-xl px-4 py-4 focus:ring-2 focus:ring-pink-300 focus:border-pink-300 font-medium text-gray-800 bg-white hover:bg-pink-50 transition-colors"
                          rows="4"
                          placeholder="Any special requirements (seat preferences, dietary needs, etc.)"
                        ></textarea>
                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <FaRegSmileWink className="text-pink-400 text-xl" />
                        </div>
                      </div>
                    </form>
                  </div>
                  
                  {/* Fixed Footer with Buttons */}
                  <div className="bg-gradient-to-t from-white to-gray-50 p-6 border-t border-gray-200 sticky bottom-0">
                    <div className="flex justify-between items-center">
                      <motion.button
                        type="button"
                        onClick={() => setShowRequestForm(false)}
                        className="text-pink-600 hover:text-pink-800 font-bold px-6 py-3 rounded-lg hover:bg-pink-50 transition-colors flex items-center"
                        whileHover={{ x: -5 }}
                      >
                        <FaArrowLeft className="mr-2" />
                        Back to Page
                      </motion.button>
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        onClick={handleRequestSubmit}
                        className={`bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center ${
                          isSubmitting ? 'opacity-80 cursor-not-allowed' : ''
                        }`}
                        whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          <>
                            <FaPaperPlane className="mr-3" />
                            Submit Request
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Benefits Section */}
      <motion.section 
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
        className="mb-20"
      >
        <motion.h2 
          variants={cardVariants}
          className={`text-3xl md:text-4xl font-bold mb-12 text-center ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}
        >
          Why Choose <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Our Service</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <FaPlane className="text-4xl text-pink-500" />,
              title: "Exclusive Flight Deals",
              description: "Access to special discounts and offers not available to the general public",
              bg: theme === 'dark' ? "bg-gradient-to-br from-gray-800 to-gray-900" : "bg-gradient-to-br from-pink-50 to-white",
              border: theme === 'dark' ? "border-gray-700" : "border-pink-200"
            },
            {
              icon: <FaUserTie className="text-4xl text-purple-500" />,
              title: "Personal Travel Expert",
              description: "Dedicated professional to handle all your travel arrangements",
              bg: theme === 'dark' ? "bg-gradient-to-br from-gray-800 to-gray-900" : "bg-gradient-to-br from-purple-50 to-white",
              border: theme === 'dark' ? "border-gray-700" : "border-purple-200"
            },
            {
              icon: <FaHeadset className="text-4xl text-blue-500" />,
              title: "24/7 Travel Support",
              description: "Assistance available anytime, anywhere during your journey",
              bg: theme === 'dark' ? "bg-gradient-to-br from-gray-800 to-gray-900" : "bg-gradient-to-br from-blue-50 to-white",
              border: theme === 'dark' ? "border-gray-700" : "border-blue-200"
            }
          ].map((benefit, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className={`${benefit.bg} rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border-2 ${benefit.border} hover:shadow-xl transition-all h-full`}
              whileHover={{ y: -10 }}
            >
              <div className={`p-5 rounded-full mb-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                {benefit.icon}
              </div>
              <h3 className={`font-bold text-xl mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{benefit.title}</h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-6`}>{benefit.description}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-auto bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium py-2 px-6 rounded-full shadow hover:shadow-md transition-all"
                onClick={() => setShowRequestForm(true)}
              >
                Learn More
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section 
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
        className={`bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 mb-20 relative overflow-hidden ${
          theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900' : ''
        }`}
      >
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-200 rounded-full opacity-20"></div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-purple-200 rounded-full opacity-20"></div>
        
        <motion.h2 
          variants={cardVariants}
          className={`text-3xl md:text-4xl font-bold mb-12 text-center ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}
        >
          How Our <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Service Works</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          {[
            {
              number: 1,
              title: "Share Your Travel Plans",
              description: "Tell us your destination, dates, and preferences",
              icon: <FaRegSmileWink className="text-3xl text-blue-500" />
            },
            {
              number: 2,
              title: "We Find The Best Options",
              description: "Our experts search hundreds of airlines for perfect matches",
              icon: <FaSearch className="text-3xl text-purple-500" />
            },
            {
              number: 3,
              title: "Receive Customized Offers",
              description: "Get the best flight options delivered to your inbox",
              icon: <FaEnvelope className="text-3xl text-pink-500" />
            }
          ].map((step, index) => (
            <motion.div 
              key={step.number}
              variants={cardVariants}
              transition={{ delay: index * 0.1 }}
              className={`text-center p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow border-2 ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 hover:border-blue-400'
                  : 'bg-white border-white hover:border-pink-200'
              } relative overflow-hidden`}
              whileHover={{ y: -5 }}
            >
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-100 rounded-full opacity-20"></div>
              <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-purple-100 rounded-full opacity-20"></div>
              
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold shadow-lg relative z-10">
                {step.icon}
              </div>
              <div className="relative z-10">
                <h3 className={`font-bold text-xl mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>{step.title}</h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-6`}>{step.description}</p>
              </div>
              <div className="absolute top-0 left-0 bg-blue-500 text-white font-bold px-4 py-1 rounded-br-lg text-sm">
                Step {step.number}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section 
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
        className={`rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl mb-10 ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
            : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
        }`}
      >
        <div className="absolute inset-0 bg-white opacity-10"></div>
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-white rounded-full opacity-5"></div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-white rounded-full opacity-5"></div>
        
        <motion.div 
          variants={cardVariants}
          className="relative"
        >
          <motion.h2 
            className={`text-3xl md:text-5xl font-bold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-white'
            }`}
          >
            Ready for Your Next <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">Adventure?</span>
          </motion.h2>
          <motion.p 
            className={`text-xl md:text-2xl mb-8 max-w-2xl mx-auto font-light ${
              theme === 'dark' ? 'text-gray-300' : 'text-white'
            }`}
          >
            Let us handle the flight details while you focus on the experience
          </motion.p>
          <motion.div className="flex flex-wrap justify-center gap-6">
            <motion.button 
              onClick={() => setShowRequestForm(true)}
              className={`font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all inline-flex items-center text-lg ${
                theme === 'dark'
                  ? 'bg-white text-pink-600 hover:bg-gray-100'
                  : 'bg-white text-pink-600 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPlane className="mr-3 animate-bounce" />
              GET FLIGHT QUOTES NOW
            </motion.button>
            <motion.button 
              className={`font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all inline-flex items-center text-lg ${
                theme === 'dark'
                  ? 'bg-transparent border-2 border-white text-white hover:bg-white hover:bg-opacity-20'
                  : 'bg-transparent border-2 border-white text-white hover:bg-white hover:bg-opacity-20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPhone className="mr-3" />
             +91 9796337997
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default FlightBooking;

// Add these styles to your global CSS or style component
const globalStyles = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes modal-enter {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(5deg); }
  }
  
  @keyframes float-delay {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-12px) rotate(-3deg); }
  }

  @keyframes float-delay-2 {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-8px) rotate(2deg); }
  }
  
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .animate-fade-in {
    animation: fade-in 0.6s ease-out forwards;
  }
  
  .animate-modal-enter {
    animation: modal-enter 0.3s ease-out forwards;
  }
  
  .animate-bounce {
    animation: bounce 1.5s infinite;
  }
  
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  .animate-float {
    animation: float 4s ease-in-out infinite;
  }
  
  .animate-float-delay {
    animation: float-delay 4s ease-in-out infinite 0.5s;
  }

  .animate-float-delay-2 {
    animation: float-delay-2 4s ease-in-out infinite 0.8s;
  }
  
  .animate-spin-slow {
    animation: spin-slow 20s linear infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  
  .shadow-3xl {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }

  .backdrop-blur-sm {
    backdrop-filter: blur(4px);
  }

  /* Custom DatePicker styles */
  .react-datepicker {
    font-family: inherit;
    border: none;
    border-radius: 0.75rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .react-datepicker__header {
    background-color: #3b82f6;
    color: white;
    border-top-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;
    border: none;
  }

  .react-datepicker__current-month,
  .react-datepicker__day-name {
    color: white;
  }

  .react-datepicker__day {
    transition: all 0.2s;
  }

  .react-datepicker__day:hover {
    background-color: #e0e7ff;
    border-radius: 50%;
  }

  .react-datepicker__day--selected {
    background-color: #3b82f6;
    border-radius: 50%;
    color: white;
  }

  .react-datepicker__day--keyboard-selected {
    background-color: #3b82f6;
    border-radius: 50%;
    color: white;
  }

  /* Dark theme styles */
  .dark-theme .react-datepicker {
    background-color: #1f2937;
    color: white;
  }

  .dark-theme .react-datepicker__header {
    background-color: #1e40af;
  }

  .dark-theme .react-datepicker__day {
    color: white;
  }

  .dark-theme .react-datepicker__day:hover {
    background-color: #374151;
  }

  .dark-theme .react-datepicker__day--outside-month {
    color: #6b7280;
  }

  .dark-theme .react-datepicker__day--selected {
    background-color: #1e40af;
  }

  .dark-theme .react-datepicker__day--keyboard-selected {
    background-color: #1e40af;
  }
`;

// Add the global styles to your document head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = globalStyles;
  document.head.appendChild(styleElement);
}