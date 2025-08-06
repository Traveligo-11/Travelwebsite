import React, { useState, useEffect } from 'react';
import { 
  FaTaxi, 
  FaSearch, 
  FaCalendarAlt, 
  FaUser, 
  FaPhone, 
  FaEnvelope, 
  FaUserTie,
  FaStar,
  FaExchangeAlt,
  FaTimes,
  FaCheck,
  FaHeart,
  FaMapMarkerAlt,
  FaUsers,
  FaCar,
  FaUmbrellaBeach,
  FaHotel,
  FaSuitcaseRolling,
  FaGlobeAmericas,
  FaHeadset,
  FaRegSmileWink,
  FaArrowRight,
  FaPaperPlane,
  FaArrowLeft,
  FaRoad,
  FaTicketAlt,
  FaWifi,
  FaSnowflake,
  FaTv,
  FaCoffee,
  FaShieldAlt,
  FaClock,
  FaMoneyBillWave
} from 'react-icons/fa';
import { IoRocketSharp } from 'react-icons/io5';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';

const CabBooking = () => {
  const [tripType, setTripType] = useState('oneWay');
  const [fromLocation, setFromLocation] = useState('Delhi Airport');
  const [toLocation, setToLocation] = useState('Connaught Place');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [cabType, setCabType] = useState('Sedan');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  
  const [requestData, setRequestData] = useState({
    name: 'John Doe',
    email: 'your@email.com',
    phone: '+91 9876543210',
    fromLocation: 'Delhi Airport',
    toLocation: 'Connaught Place',
    pickupDate: '',
    pickupTime: '',
    returnDate: '',
    passengers: 1,
    cabType: 'Sedan',
    specialRequests: ''
  });

  const locations = [
    'Delhi Airport', 'Connaught Place', 'New Delhi Railway Station', 
    'Aerocity', 'Gurgaon', 'Noida', 'Greater Noida', 
    'Dwarka', 'Paharganj', 'Karol Bagh'
  ];

  const cabTypes = [
    { type: 'Sedan', icon: <FaCar className="text-blue-500" />, capacity: '3-4 passengers' },
    { type: 'SUV', icon: <FaCar className="text-green-500" />, capacity: '5-7 passengers' },
    { type: 'Luxury', icon: <FaCar className="text-purple-500" />, capacity: '3-4 passengers' },
    { type: 'Mini', icon: <FaCar className="text-yellow-500" />, capacity: '3 passengers' },
    { type: 'Tempo Traveller', icon: <FaCar className="text-red-500" />, capacity: '9-12 passengers' }
  ];

  useEffect(() => {
    emailjs.init('37pN2ThzFwwhwk7ai');
  }, []);

  const handleSwapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
    setRequestData(prev => ({
      ...prev,
      fromLocation: toLocation,
      toLocation: fromLocation
    }));
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');

    if (!requestData.name || !requestData.email || !requestData.phone || !requestData.pickupDate || !requestData.pickupTime) {
      setFormError('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    try {
      const templateParams = {
        from_name: requestData.name,
        from_email: requestData.email,
        phone_number: requestData.phone,
        from_location: requestData.fromLocation,
        to_location: requestData.toLocation,
        pickup_date: requestData.pickupDate,
        pickup_time: requestData.pickupTime,
        return_date: requestData.returnDate || 'One Way Trip',
        passengers: requestData.passengers,
        cab_type: requestData.cabType,
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
        name: 'John Doe',
        email: 'your@email.com',
        phone: '+91 9876543210',
        fromLocation: 'Delhi Airport',
        toLocation: 'Connaught Place',
        pickupDate: '',
        pickupTime: '',
        returnDate: '',
        passengers: 1,
        cabType: 'Sedan',
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 mb-12 text-white overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 bg-white opacity-10"></div>
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-blue-400 rounded-full opacity-20"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-purple-300 rounded-full opacity-20"></div>
        
        {/* Floating elements */}
        <div className="absolute top-1/4 left-10 opacity-10">
          <FaTaxi className="text-white text-6xl animate-float" />
        </div>
        <div className="absolute bottom-1/3 right-20 opacity-10">
          <FaCar className="text-white text-5xl animate-float-delay" />
        </div>
        
        <div className="relative z-10 text-center">
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center bg-white bg-opacity-30 px-6 py-2 rounded-full mb-6 shadow-lg"
          >
            <FaHeart className="mr-2 text-pink-300 animate-pulse" />
            <span className="text-sm font-bold text-white">Most Popular Cab Service</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-white"
          >
            Book Your Premium Cab
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto font-light"
          >
            Experience <span className="font-semibold">hassle-free rides</span> with our professional cab services
          </motion.p>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-6"
          >
            {[
              { 
                icon: <FaShieldAlt className="mr-2 text-2xl text-yellow-300" />, 
                text: "Safe & Secure",
                bg: "bg-gradient-to-r from-yellow-500 to-yellow-600"
              },
              { 
                icon: <FaClock className="mr-2 text-2xl text-blue-200" />, 
                text: "On-Time Service",
                bg: "bg-gradient-to-r from-blue-500 to-blue-600"
              },
              { 
                icon: <FaMoneyBillWave className="mr-2 text-2xl text-purple-200" />, 
                text: "Best Prices",
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
        className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 mb-16 relative overflow-hidden border-2 border-pink-100 hover:shadow-3xl transition-all duration-300"
      >
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold px-8 py-3 rounded-full shadow-lg z-10 flex items-center">
          <FaTaxi className="mr-3" />
          <span className="text-lg">Find Your Perfect Cab</span>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 opacity-10">
          <FaTaxi className="text-pink-300 text-6xl animate-float" />
        </div>
        <div className="absolute bottom-10 left-10 opacity-10">
          <FaRoad className="text-blue-300 text-6xl" />
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8 mt-8">
          {[
            { type: 'oneWay', label: 'One Way', icon: <FaArrowRight className="mr-2" /> },
            { type: 'round', label: 'Round Trip', icon: <FaExchangeAlt className="mr-2" /> },
            { type: 'hourly', label: 'Hourly Rental', icon: <FaClock className="mr-2" /> }
          ].map((option) => (
            <motion.button
              key={option.type}
              className={`flex items-center px-8 py-3 rounded-full transition-all text-lg font-medium ${tripType === option.type ? 
                'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' : 
                'bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-700 border border-gray-200'}`}
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
          {/* From Location */}
          <motion.div 
            variants={itemVariants}
            className="border-2 border-pink-100 rounded-xl p-5 hover:border-pink-300 transition-colors bg-gradient-to-br from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 group shadow-sm"
            whileHover={{ y: -5 }}
          >
            <label className="block text-sm font-bold text-pink-600 mb-3 items-center">
              <FaMapMarkerAlt className="mr-2 text-pink-500" /> Pickup From
            </label>
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-pink-100 to-pink-200 p-3 rounded-lg mr-4 group-hover:from-pink-200 group-hover:to-pink-300 transition-colors shadow-sm">
                <FaTaxi className="text-pink-600 text-xl" />
              </div>
              <select 
                className="w-full outline-none bg-transparent appearance-none font-bold text-gray-800 text-lg"
                value={fromLocation}
                onChange={(e) => {
                  setFromLocation(e.target.value);
                  setRequestData(prev => ({...prev, fromLocation: e.target.value}));
                }}
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
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
              onClick={handleSwapLocations}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="bg-gradient-to-r from-pink-100 to-purple-100 hover:from-pink-200 hover:to-purple-200 p-5 rounded-full shadow-md transition-all text-pink-600 hover:text-pink-700"
              aria-label="Swap locations"
              whileHover={{ rotate: 180, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaExchangeAlt className="text-2xl" />
            </motion.button>
          </motion.div>

          {/* To Location */}
          <motion.div 
            variants={itemVariants}
            className="border-2 border-pink-100 rounded-xl p-5 hover:border-pink-300 transition-colors bg-gradient-to-br from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 group shadow-sm"
            whileHover={{ y: -5 }}
          >
            <label className="block text-sm font-bold text-pink-600 mb-3  items-center">
              <FaMapMarkerAlt className="mr-2 text-pink-500" /> Drop At
            </label>
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-3 rounded-lg mr-4 group-hover:from-purple-200 group-hover:to-purple-300 transition-colors shadow-sm">
                <FaCar className="text-purple-600 text-xl" />
              </div>
              <select 
                className="w-full outline-none bg-transparent appearance-none font-bold text-gray-800 text-lg"
                value={toLocation}
                onChange={(e) => {
                  setToLocation(e.target.value);
                  setRequestData(prev => ({...prev, toLocation: e.target.value}));
                }}
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Pickup Date */}
          <motion.div 
            variants={itemVariants}
            className="border-2 border-pink-100 rounded-xl p-5 hover:border-pink-300 transition-colors bg-gradient-to-br from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 group shadow-sm"
            whileHover={{ y: -5 }}
          >
            <label className="block text-sm font-bold text-pink-600 mb-3 items-center">
              <FaCalendarAlt className="mr-2 text-pink-500" /> Pickup Date
            </label>
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-3 rounded-lg mr-4 group-hover:from-blue-200 group-hover:to-blue-300 transition-colors shadow-sm">
                <FaCalendarAlt className="text-blue-600 text-xl" />
              </div>
              <input 
                type="date" 
                className="w-full outline-none bg-transparent font-bold text-gray-800 text-lg" 
                value={pickupDate}
                onChange={(e) => {
                  setPickupDate(e.target.value);
                  setRequestData(prev => ({...prev, pickupDate: e.target.value}));
                }}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </motion.div>

          {/* Pickup Time */}
          <motion.div 
            variants={itemVariants}
            className="border-2 border-pink-100 rounded-xl p-5 hover:border-pink-300 transition-colors bg-gradient-to-br from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 group shadow-sm"
            whileHover={{ y: -5 }}
          >
            <label className="block text-sm font-bold text-pink-600 mb-3  items-center">
              <FaClock className="mr-2 text-pink-500" /> Pickup Time
            </label>
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-green-100 to-green-200 p-3 rounded-lg mr-4 group-hover:from-green-200 group-hover:to-green-300 transition-colors shadow-sm">
                <FaClock className="text-green-600 text-xl" />
              </div>
              <input 
                type="time" 
                className="w-full outline-none bg-transparent font-bold text-gray-800 text-lg" 
                value={pickupTime}
                onChange={(e) => {
                  setPickupTime(e.target.value);
                  setRequestData(prev => ({...prev, pickupTime: e.target.value}));
                }}
              />
            </div>
          </motion.div>

          {/* Return Date */}
          {tripType === 'round' && (
            <motion.div 
              variants={itemVariants}
              className="border-2 border-pink-100 rounded-xl p-5 hover:border-pink-300 transition-colors bg-gradient-to-br from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 group shadow-sm"
              whileHover={{ y: -5 }}
            >
              <label className="block text-sm font-bold text-pink-600 mb-3  items-center">
                <FaCalendarAlt className="mr-2 text-pink-500" /> Return Date
              </label>
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 p-3 rounded-lg mr-4 group-hover:from-yellow-200 group-hover:to-yellow-300 transition-colors shadow-sm">
                  <FaCalendarAlt className="text-yellow-600 text-xl" />
                </div>
                <input 
                  type="date" 
                  className="w-full outline-none bg-transparent font-bold text-gray-800 text-lg" 
                  value={returnDate}
                  onChange={(e) => {
                    setReturnDate(e.target.value);
                    setRequestData(prev => ({...prev, returnDate: e.target.value}));
                  }}
                  min={pickupDate || new Date().toISOString().split('T')[0]}
                />
              </div>
            </motion.div>
          )}

          {/* Passengers */}
          <motion.div 
            variants={itemVariants}
            className="border-2 border-pink-100 rounded-xl p-5 hover:border-pink-300 transition-colors bg-gradient-to-br from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 group shadow-sm"
            whileHover={{ y: -5 }}
          >
            <label className="block text-sm font-bold text-pink-600 mb-3  items-center">
              <FaUsers className="mr-2 text-pink-500" /> Passengers
            </label>
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-indigo-100 to-indigo-200 p-3 rounded-lg mr-4 group-hover:from-indigo-200 group-hover:to-indigo-300 transition-colors shadow-sm">
                <FaUser className="text-indigo-600 text-xl" />
              </div>
              <select 
                className="w-full outline-none bg-transparent appearance-none font-bold text-gray-800 text-lg"
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

          {/* Cab Type */}
          <motion.div 
            variants={itemVariants}
            className="border-2 border-pink-100 rounded-xl p-5 hover:border-pink-300 transition-colors bg-gradient-to-br from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 group shadow-sm"
            whileHover={{ y: -5 }}
          >
            <label className="block text-sm font-bold text-pink-600 mb-3 items-center">
              <FaCar className="mr-2 text-pink-500" /> Cab Type
            </label>
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-red-100 to-red-200 p-3 rounded-lg mr-4 group-hover:from-red-200 group-hover:to-red-300 transition-colors shadow-sm">
                <FaTaxi className="text-red-600 text-xl" />
              </div>
              <select 
                className="w-full outline-none bg-transparent appearance-none font-bold text-gray-800 text-lg"
                value={cabType}
                onChange={(e) => {
                  setCabType(e.target.value);
                  setRequestData(prev => ({...prev, cabType: e.target.value}));
                }}
              >
                {cabTypes.map(cab => (
                  <option key={cab.type} value={cab.type}>{cab.type}</option>
                ))}
              </select>
            </div>
          </motion.div>
        </motion.div>

        <motion.button 
          onClick={() => setShowRequestForm(true)}
          className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold py-5 px-6 rounded-xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaSearch className="mr-3 text-xl group-hover:animate-bounce" /> 
          <span className="text-xl">FIND CABS</span>
        </motion.button>
      </motion.div>

      {/* Enhanced Request Form Modal */}
      {showRequestForm && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 backdrop-blur-md"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl shadow-3xl max-w-md w-full overflow-hidden relative border-4 border-pink-100"
          >
            {submitSuccess ? (
              <div className="p-8 text-center bg-gradient-to-b from-white to-pink-50">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-gradient-to-r from-green-400 to-green-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                >
                  <FaCheck className="text-white text-4xl" />
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Request Sent Successfully!</h2>
                <p className="text-lg text-gray-600 mb-8">We'll contact you shortly with the best cab options for your trip.</p>
                <motion.button
                  onClick={() => {
                    setShowRequestForm(false);
                    setSubmitSuccess(false);
                  }}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </div>
            ) : (
              <>
                <div className="relative overflow-hidden">
                  {/* Beautiful Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-90">
                    <div className="absolute top-0 left-0 w-full h-full">
                      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-float-delay"></div>
                      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-purple-200 rounded-full opacity-20 animate-float"></div>
                      <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-pink-200 rounded-full opacity-20 animate-float-delay-2"></div>
                      <div className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-float"></div>
                    </div>
                  </div>
                  
                  {/* Header with Back Button */}
                  <div className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-8 text-white">
                    <div className="absolute inset-0 bg-white opacity-10"></div>
                    <div className="relative z-10 flex items-center">
                      <motion.button 
                        onClick={() => setShowRequestForm(false)}
                        className="mr-4 text-white hover:text-pink-200 transition-colors"
                        whileHover={{ x: -5 }}
                      >
                        <FaArrowLeft className="text-2xl" />
                      </motion.button>
                      <div>
                        <h2 className="text-3xl font-bold">Cab Request Details</h2>
                        <p className="text-lg opacity-90 mt-2">Complete your information to get the best deals</p>
                      </div>
                    </div>
                  </div>
                  
                  <form onSubmit={handleRequestSubmit} className="relative p-8 bg-white bg-opacity-90 backdrop-blur-sm">
                    {formError && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg"
                      >
                        <p className="font-medium">{formError}</p>
                      </motion.div>
                    )}
                    
                    <div className="space-y-6">
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

                      {/* Cab Details */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl border border-blue-100 shadow-sm">
                          <label className="block text-sm font-bold text-blue-600 mb-2">Pickup From</label>
                          <div className="font-medium text-gray-800 flex items-center">
                            <FaMapMarkerAlt className="text-blue-400 mr-2" />
                            {requestData.fromLocation}
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-white p-4 rounded-xl border border-purple-100 shadow-sm">
                          <label className="block text-sm font-bold text-purple-600 mb-2">Drop At</label>
                          <div className="font-medium text-gray-800 flex items-center">
                            <FaMapMarkerAlt className="text-purple-400 mr-2" />
                            {requestData.toLocation}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-pink-50 to-white p-4 rounded-xl border border-pink-100 shadow-sm">
                          <label className="block text-sm font-bold text-pink-600 mb-2">Pickup Date</label>
                          <div className="font-medium text-gray-800 flex items-center">
                            <FaCalendarAlt className="text-pink-400 mr-2" />
                            {requestData.pickupDate || 'Not specified'}
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-white p-4 rounded-xl border border-green-100 shadow-sm">
                          <label className="block text-sm font-bold text-green-600 mb-2">Pickup Time</label>
                          <div className="font-medium text-gray-800 flex items-center">
                            <FaClock className="text-green-400 mr-2" />
                            {requestData.pickupTime || 'Not specified'}
                          </div>
                        </div>
                      </div>

                      {tripType === 'round' && (
                        <div className="bg-gradient-to-br from-yellow-50 to-white p-4 rounded-xl border border-yellow-100 shadow-sm">
                          <label className="block text-sm font-bold text-yellow-600 mb-2">Return Date</label>
                          <div className="font-medium text-gray-800 flex items-center">
                            <FaCalendarAlt className="text-yellow-400 mr-2" />
                            {requestData.returnDate || 'Not specified'}
                          </div>
                        </div>
                      )}

                      {/* Cab Type Preview */}
                      <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        <label className="block text-sm font-bold text-gray-600 mb-2">Selected Cab Type</label>
                        <div className="flex items-center">
                          {cabTypes.find(cab => cab.type === requestData.cabType)?.icon}
                          <div className="ml-3">
                            <div className="font-medium text-gray-800">{requestData.cabType}</div>
                            <div className="text-sm text-gray-600">
                              {cabTypes.find(cab => cab.type === requestData.cabType)?.capacity}
                            </div>
                          </div>
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
                          placeholder="Any special requirements (child seat, extra luggage, etc.)"
                        ></textarea>
                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <FaRegSmileWink className="text-pink-400 text-xl" />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-8">
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
                        className={`bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center ${
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
                  </form>
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
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800"
        >
          Why Choose <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Our Cab Service</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <FaShieldAlt className="text-4xl text-blue-500" />,
              title: "Safe & Secure",
              description: "Verified drivers and GPS tracking for your safety",
              bg: "bg-gradient-to-br from-blue-50 to-white",
              border: "border-blue-200"
            },
            {
              icon: <FaClock className="text-4xl text-purple-500" />,
              title: "On-Time Service",
              description: "Punctual pickups with real-time tracking",
              bg: "bg-gradient-to-br from-purple-50 to-white",
              border: "border-purple-200"
            },
            {
              icon: <FaMoneyBillWave className="text-4xl text-pink-500" />,
              title: "Transparent Pricing",
              description: "No hidden charges with upfront pricing",
              bg: "bg-gradient-to-br from-pink-50 to-white",
              border: "border-pink-200"
            }
          ].map((benefit, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className={`${benefit.bg} rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border-2 ${benefit.border} hover:shadow-xl transition-all h-full`}
              whileHover={{ y: -10 }}
            >
              <div className={`p-5 rounded-full mb-6 ${benefit.bg}`}>
                {benefit.icon}
              </div>
              <h3 className="font-bold text-xl mb-4 text-gray-800">{benefit.title}</h3>
              <p className="text-gray-600 mb-6">{benefit.description}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium py-2 px-6 rounded-full shadow hover:shadow-md transition-all"
                onClick={() => setShowRequestForm(true)}
              >
                Book Now
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Cab Types Section */}
      <motion.section 
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
        className="mb-20"
      >
        <motion.h2 
          variants={cardVariants}
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800"
        >
          Our <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Cab Fleet</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {cabTypes.map((cab, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md hover:shadow-lg border-2 border-gray-100 hover:border-blue-200 p-6 text-center transition-all"
              whileHover={{ y: -5 }}
            >
              <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-full inline-flex items-center justify-center mb-4">
                {cab.icon}
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">{cab.type}</h3>
              <p className="text-gray-600 text-sm mb-4">{cab.capacity}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium py-2 px-4 rounded-full shadow hover:shadow-md transition-all text-sm"
                onClick={() => {
                  setCabType(cab.type);
                  setRequestData(prev => ({...prev, cabType: cab.type}));
                  setShowRequestForm(true);
                }}
              >
                Book {cab.type}
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
        className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 mb-20 relative overflow-hidden"
      >
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-200 rounded-full opacity-20"></div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-purple-200 rounded-full opacity-20"></div>
        
        <motion.h2 
          variants={cardVariants}
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800"
        >
          How Our <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Service Works</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          {[
            {
              number: 1,
              title: "Book Your Cab",
              description: "Enter your pickup, drop locations and travel details",
              icon: <FaTaxi className="text-3xl text-blue-500" />
            },
            {
              number: 2,
              title: "Get Matched",
              description: "Our system finds the best cab for your requirements",
              icon: <FaSearch className="text-3xl text-purple-500" />
            },
            {
              number: 3,
              title: "Enjoy Your Ride",
              description: "Track your cab and enjoy a comfortable journey",
              icon: <FaRegSmileWink className="text-3xl text-pink-500" />
            }
          ].map((step, index) => (
            <motion.div 
              key={step.number}
              variants={cardVariants}
              transition={{ delay: index * 0.1 }}
              className="text-center bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow border-2 border-white hover:border-blue-200 relative overflow-hidden"
              whileHover={{ y: -5 }}
            >
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-100 rounded-full opacity-20"></div>
              <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-purple-100 rounded-full opacity-20"></div>
              
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold shadow-lg relative z-10">
                {step.icon}
              </div>
              <div className="relative z-10">
                <h3 className="font-bold text-xl mb-4 text-gray-800">{step.title}</h3>
                <p className="text-gray-600 mb-6">{step.description}</p>
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
        className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white text-center relative overflow-hidden shadow-2xl mb-10"
      >
        <div className="absolute inset-0 bg-white opacity-10"></div>
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-white rounded-full opacity-5"></div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-white rounded-full opacity-5"></div>
        
        <motion.div 
          variants={cardVariants}
          className="relative"
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Ready for Your Next <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">Ride?</span>
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto font-light"
          >
            Book your cab now and enjoy a comfortable journey
          </motion.p>
          <motion.div className="flex flex-wrap justify-center gap-6">
            <motion.button 
              onClick={() => setShowRequestForm(true)}
              className="bg-white hover:bg-gray-100 text-pink-600 font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all inline-flex items-center text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaTaxi className="mr-3" />
              BOOK CAB NOW
            </motion.button>
            <motion.button 
              className="bg-transparent border-2 border-white hover:bg-white hover:bg-opacity-20 text-white font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all inline-flex items-center text-lg"
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

export default CabBooking;

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
`;

// Add the global styles to your document head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = globalStyles;
  document.head.appendChild(styleElement);
}