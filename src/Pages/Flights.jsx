import React, { useState } from 'react';
import { 
  FaPlane, 
  FaExchangeAlt,
  FaCalendarAlt,
  FaUser,
  FaSearch,
  FaPhone,
  FaEnvelope,
  FaUserTie,
  FaStar,
  FaCheck,
  FaMapMarkerAlt,
  FaUsers,
  FaChair,
  FaHeadset,
  FaRegSmileWink,
  FaArrowRight,
  FaPaperPlane,
  FaArrowLeft,
  FaHeart,
  FaGlobeAmericas,
  FaUmbrellaBeach,
  FaCity,
  FaMountain,
  FaQuoteRight,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';
import { IoRocketSharp, IoAirplane } from 'react-icons/io5';
import { GiCommercialAirplane } from 'react-icons/gi';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Flight = () => {
  const [tripType, setTripType] = useState('ONE WAY');
  const [fromCity, setFromCity] = useState('Delhi DEL');
  const [toCity, setToCity] = useState('Mumbai BOM');
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date(new Date().setDate(new Date().getDate() + 7)));
  const [passengerCount, setPassengerCount] = useState(1);
  const [travelClass, setTravelClass] = useState('Economy');
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState('');

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

  const cities = [
    'Delhi DEL - Indira Gandhi International Airport',
    'Mumbai BOM - Chhatrapati Shivaji Maharaj International Airport',
    'Bangalore BLR - Kempegowda International Airport',
    'Hyderabad HYD - Rajiv Gandhi International Airport',
    'Chennai MAA - Chennai International Airport',
    'Kolkata CCU - Netaji Subhash Chandra Bose International Airport',
    'Goa GOI - Manohar International Airport'
  ];

  const travelClasses = ['Economy', 'Premium Economy', 'Business', 'First Class'];

  const popularDestinations = [
    { name: 'Bali', icon: <FaUmbrellaBeach className="text-amber-400" />, bg: 'bg-gradient-to-br from-amber-100 to-amber-50' },
    { name: 'Dubai', icon: <FaCity className="text-blue-400" />, bg: 'bg-gradient-to-br from-blue-100 to-blue-50' },
    { name: 'Singapore', icon: <FaGlobeAmericas className="text-emerald-400" />, bg: 'bg-gradient-to-br from-emerald-100 to-emerald-50' },
    { name: 'Switzerland', icon: <FaMountain className="text-sky-400" />, bg: 'bg-gradient-to-br from-sky-100 to-sky-50' },
  ];

  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'short', weekday: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options).replace(',', '');
  };

  const handleHeroAction = (actionType) => {
    setShowRequestForm(true);
    
    if (actionType === 'bestPrices') {
      setRequestData(prev => ({
        ...prev,
        class: 'Economy',
        specialRequests: 'Interested in best price deals'
      }));
    } else if (actionType === 'expertSupport') {
      setRequestData(prev => ({
        ...prev,
        specialRequests: 'Need expert travel assistance'
      }));
    } else if (actionType === 'exclusiveDeals') {
      setRequestData(prev => ({
        ...prev,
        specialRequests: 'Interested in exclusive deals'
      }));
    }
  };

  const handleSwapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
    setRequestData(prev => ({
      ...prev,
      fromCity: toCity.split(' ')[0],
      toCity: fromCity.split(' ')[0]
    }));
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');

    if (!requestData.name || !requestData.email || !requestData.phone) {
      setFormError('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
      setTimeout(() => {
        setShowRequestForm(false);
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to submit request:', error);
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

  const handlePassengerCountChange = (count) => {
    setPassengerCount(Math.max(1, count));
    setRequestData(prev => ({
      ...prev,
      passengers: Math.max(1, count)
    }));
  };

  const handleClassChange = (travelClass) => {
    setTravelClass(travelClass);
    setRequestData(prev => ({
      ...prev,
      class: travelClass
    }));
    setShowPassengerDropdown(false);
  };

  const handleDateChange = (date, isReturn = false) => {
    if (isReturn) {
      setReturnDate(date);
      setRequestData(prev => ({
        ...prev,
        return: formatDate(date)
      }));
    } else {
      setDepartureDate(date);
      setRequestData(prev => ({
        ...prev,
        departure: formatDate(date)
      }));
    }
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 rounded-full opacity-10 animate-float-delay"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-purple-100 rounded-full opacity-10 animate-float"></div>
        <div className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-pink-100 rounded-full opacity-10 animate-float-delay-2"></div>
      </div>
     
      {/* Search Section - Top */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <IoAirplane className="text-blue-500 mr-3 rotate-45" />
            Find Your Perfect Flight
          </h2>
        </div>
        
        {/* Trip Type Tabs */}
        <div className="flex border-b-2 border-gray-200 mb-8">
          {['ONE WAY', 'ROUNDTRIP', 'MULTICITY'].map((type) => (
            <motion.button
              key={type}
              whileTap={{ scale: 0.95 }}
              className={`pb-3 px-6 font-medium text-lg relative ${tripType === type ? 'text-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
              onClick={() => setTripType(type)}
            >
              {type}
              {tripType === type && (
                <motion.div 
                  layoutId="underline"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Search Form */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* From City */}
          <motion.div 
            variants={itemVariants}
            className="border-2 rounded-xl p-5 hover:border-blue-400 transition-colors bg-gradient-to-br from-white to-blue-50"
          >
            <label className="block text-sm font-bold text-gray-600 mb-2  items-center">
              <FaMapMarkerAlt className="text-blue-400 mr-2" />
              FROM
            </label>
            <div className="flex items-center">
              <select 
                className="w-full outline-none font-bold text-gray-900 bg-transparent text-lg"
                value={fromCity}
                onChange={(e) => {
                  setFromCity(e.target.value);
                  setRequestData(prev => ({...prev, fromCity: e.target.value.split(' ')[0]}));
                }}
              >
                {cities.map(city => (
                  <option key={city} value={city.split(' - ')[0]}>{city}</option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Swap Button */}
          <motion.div 
            className="flex items-center justify-center md:justify-start md:mt-10"
            variants={itemVariants}
          >
            <motion.button 
              onClick={handleSwapCities}
              className="bg-white p-3 rounded-full hover:bg-gray-100 transition-colors shadow-md border border-gray-200"
              aria-label="Swap cities"
              whileHover={{ rotate: 180, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaExchangeAlt className="text-blue-500 text-lg" />
            </motion.button>
          </motion.div>

          {/* To City */}
          <motion.div 
            variants={itemVariants}
            className="border-2 rounded-xl p-5 hover:border-blue-400 transition-colors bg-gradient-to-br from-white to-blue-50"
          >
            <label className="block text-sm font-bold text-gray-600 mb-2  items-center">
              <FaMapMarkerAlt className="text-blue-400 mr-2" />
              TO
            </label>
            <div className="flex items-center">
              <select 
                className="w-full outline-none font-bold text-gray-900 bg-transparent text-lg"
                value={toCity}
                onChange={(e) => {
                  setToCity(e.target.value);
                  setRequestData(prev => ({...prev, toCity: e.target.value.split(' ')[0]}));
                }}
              >
                {cities.map(city => (
                  <option key={city} value={city.split(' - ')[0]}>{city}</option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Departure Date */}
          <motion.div 
            variants={itemVariants}
            className="border-2 rounded-xl p-5 hover:border-blue-400 transition-colors bg-gradient-to-br from-white to-blue-50"
          >
            <label className="block text-sm font-bold text-gray-600 mb-2 items-center">
              <FaCalendarAlt className="text-blue-400 mr-2" />
              DEPARTURE DATE
            </label>
            <div className="flex items-center">
              <DatePicker
                selected={departureDate}
                onChange={(date) => handleDateChange(date)}
                minDate={new Date()}
                className="w-full outline-none font-bold text-gray-900 bg-transparent text-lg cursor-pointer"
                dateFormat="d MMM EEE, yyyy"
                customInput={
                  <div className="w-full cursor-pointer">
                    {formatDate(departureDate)}
                  </div>
                }
              />
            </div>
          </motion.div>

          {/* Return Date (conditional) */}
          {tripType === 'ROUNDTRIP' && (
            <motion.div 
              variants={itemVariants}
              className="border-2 rounded-xl p-5 hover:border-blue-400 transition-colors bg-gradient-to-br from-white to-blue-50"
            >
              <label className="block text-sm font-bold text-gray-600 mb-2  items-center">
                <FaCalendarAlt className="text-blue-400 mr-2" />
                RETURN DATE
              </label>
              <div className="flex items-center">
                <DatePicker
                  selected={returnDate}
                  onChange={(date) => handleDateChange(date, true)}
                  minDate={departureDate}
                  className="w-full outline-none font-bold text-gray-900 bg-transparent text-lg cursor-pointer"
                  dateFormat="d MMM EEE, yyyy"
                  customInput={
                    <div className="w-full cursor-pointer">
                      {formatDate(returnDate)}
                    </div>
                  }
                />
              </div>
            </motion.div>
          )}

          {/* Add Return Date for ONE WAY */}
          {tripType !== 'ROUNDTRIP' && (
            <motion.div 
              variants={itemVariants}
              className="flex items-center col-span-1 md:col-span-2"
            >
              <button 
                className="text-blue-600 font-medium flex items-center hover:text-blue-800 transition-colors text-lg"
                onClick={() => setTripType('ROUNDTRIP')}
              >
                + ADD RETURN DATE
              </button>
              <span className="ml-3 text-base text-gray-500">Save more on round trips!</span>
            </motion.div>
          )}

          {/* Traveller & Class */}
          <motion.div 
            variants={itemVariants}
            className="border-2 rounded-xl p-5 hover:border-blue-400 transition-colors bg-gradient-to-br from-white to-blue-50 relative"
          >
            <label className="block text-sm font-bold text-gray-600 mb-2  items-center">
              <FaUsers className="text-blue-400 mr-2" />
              TRAVELLER & CLASS
            </label>
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
            >
              <span className="font-bold text-gray-900 text-lg">
                {passengerCount} {passengerCount > 1 ? 'Travelers' : 'Traveler'}, {travelClass}
              </span>
              {showPassengerDropdown ? (
                <FaChevronUp className="text-gray-500" />
              ) : (
                <FaChevronDown className="text-gray-500" />
              )}
            </div>

            {/* Passenger Dropdown */}
            {showPassengerDropdown && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-10 p-4"
              >
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-600 mb-2">Passengers</label>
                  <div className="flex items-center justify-between">
                    <button 
                      className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"
                      onClick={() => handlePassengerCountChange(passengerCount - 1)}
                      disabled={passengerCount <= 1}
                    >
                      -
                    </button>
                    <span className="font-bold">{passengerCount}</span>
                    <button 
                      className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"
                      onClick={() => handlePassengerCountChange(passengerCount + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">Travel Class</label>
                  <div className="space-y-2">
                    {travelClasses.map((cls) => (
                      <div 
                        key={cls}
                        className={`p-3 rounded-lg cursor-pointer ${travelClass === cls ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                        onClick={() => handleClassChange(cls)}
                      >
                        {cls}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Special Fare Options */}
          <motion.div 
            variants={itemVariants}
            className="col-span-1 md:col-span-2"
          >
            <label className="block text-sm font-bold text-gray-600 mb-3">SELECT A SPECIAL FARE</label>
            <div className="text-sm text-blue-500 mb-4 font-medium">EXTRA SAVINGS</div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { title: "Student", desc: "Extra discounts/baggage", icon: <FaUser className="text-blue-400" /> },
                { title: "Senior Citizen", desc: "Up to ₹ 600 off", icon: <FaUserTie className="text-purple-400" /> },
                { title: "Armed Force", desc: "Up to ₹ 600 off", icon: <FaStar className="text-amber-400" /> },
                { title: "Add FlexiFly", desc: "100% refund on cancellation", icon: <FaCheck className="text-green-400" /> }
              ].map((fare, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="border-2 rounded-xl p-4 hover:border-blue-400 cursor-pointer transition-all bg-white hover:shadow-md group"
                >
                  <div className="flex items-center mb-2">
                    <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors mr-3">
                      {fare.icon}
                    </div>
                    <div className="font-bold text-gray-800">{fare.title}</div>
                  </div>
                  <div className="text-sm text-gray-600 pl-11">{fare.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Search Button */}
        <motion.div 
          className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button 
            onClick={() => {
              setShowRequestForm(true);
              setRequestData(prev => ({
                ...prev,
                fromCity: fromCity.split(' ')[0],
                toCity: toCity.split(' ')[0],
                departure: formatDate(departureDate),
                return: tripType === 'ROUNDTRIP' ? formatDate(returnDate) : '',
                passengers: passengerCount,
                class: travelClass
              }));
            }}
            className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-5 px-10 rounded-xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center text-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaSearch className="mr-3" />
            SEARCH FLIGHTS
          </motion.button>
          
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start">
              <FaCheck className="text-green-500 mr-2" />
              <span className="text-gray-600 font-medium">Best Price Guarantee</span>
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <FaCheck className="text-green-500 mr-2" />
              <span className="text-gray-600 font-medium">No Booking Fees</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Popular Destinations Section */}
      <motion.section 
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
        className="mb-16"
      >
        <motion.h2 
          variants={cardVariants}
          className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800"
        >
          Trending <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Destinations</span>
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {popularDestinations.map((destination, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`${destination.bg} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border border-gray-100 overflow-hidden relative group`}
              whileHover={{ y: -10 }}
            >
              <div className="absolute -right-6 -top-6 opacity-20 group-hover:opacity-30 transition-opacity">
                <GiCommercialAirplane className="text-gray-400 text-6xl rotate-45" />
              </div>
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-white shadow-sm mr-4">
                  {destination.icon}
                </div>
                <h3 className="font-bold text-xl text-gray-800">{destination.name}</h3>
              </div>
              <div className="text-gray-600 mb-6">Starting from ₹25,999</div>
              <button 
                className="text-blue-600 font-medium flex items-center group-hover:text-blue-800 transition-colors"
                onClick={() => {
                  setShowRequestForm(true);
                  setRequestData(prev => ({
                    ...prev,
                    toCity: destination.name,
                    specialRequests: `Interested in flights to ${destination.name}`
                  }));
                }}
              >
                Explore flights
                <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Hero Section - Below Search */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 rounded-3xl p-8 md:p-12 mb-16 text-white overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 bg-white opacity-10"></div>
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-blue-400 rounded-full opacity-20"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-purple-300 rounded-full opacity-20"></div>
        
        <div className="relative z-10">
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center bg-white bg-opacity-30 px-6 py-2 rounded-full mb-8 shadow-lg"
          >
            <FaHeart className="mr-2 text-pink-300 animate-pulse" />
            <span className="text-sm font-bold text-white">Most Popular Travel Service</span>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <motion.h1 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-white leading-tight"
              >
                Your Journey Begins Here
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl mb-8 font-light max-w-lg"
              >
                Experience <span className="font-semibold">seamless travel</span> with our exclusive flight deals and personalized service
              </motion.p>
              
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap gap-4"
              >
                {[
                  { 
                    icon: <IoRocketSharp className="mr-2 text-2xl animate-bounce text-yellow-300" />, 
                    text: "Best Prices Guaranteed",
                    bg: "bg-gradient-to-r from-yellow-500 to-yellow-600",
                    action: "bestPrices"
                  },
                  { 
                    icon: <FaUserTie className="mr-2 text-2xl text-blue-200" />, 
                    text: "24/7 Expert Support",
                    bg: "bg-gradient-to-r from-blue-500 to-blue-600",
                    action: "expertSupport"
                  },
                  { 
                    icon: <FaStar className="mr-2 text-2xl text-purple-200" />, 
                    text: "Exclusive Deals",
                    bg: "bg-gradient-to-r from-purple-500 to-purple-600",
                    action: "exclusiveDeals"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className={`flex items-center ${item.bg} px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer group`}
                    whileHover={{ y: -5, scale: 1.05 }}
                    onClick={() => handleHeroAction(item.action)}
                  >
                    <div className="group-hover:animate-pulse">
                      {item.icon}
                    </div>
                    <span className="font-bold text-white text-lg">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            <div className="lg:w-1/2 lg:pl-12">
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 border-2 border-white border-opacity-20"
              >
                <h3 className="text-2xl font-bold mb-6">Why Book With Us?</h3>
                
                <div className="space-y-6">
                  {[
                    {
                      icon: <FaPlane className="text-blue-300 text-xl" />,
                      title: "5000+ Daily Flights",
                      description: "Access to the widest selection of flights across all major airlines"
                    },
                    {
                      icon: <FaChair className="text-purple-300 text-xl" />,
                      title: "Preferred Seating",
                      description: "Get the best seats with our advanced seat selection options"
                    },
                    {
                      icon: <FaHeadset className="text-pink-300 text-xl" />,
                      title: "Dedicated Support",
                      description: "Personal travel assistant available throughout your journey"
                    }
                  ].map((feature, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                    >
                      <div className="p-3 rounded-lg bg-white bg-opacity-20 mr-4">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">{feature.title}</h4>
                        <p className="text-pink-600 text-opacity-80">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-4 px-6 rounded-xl mt-8 shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
                  onClick={() => setShowRequestForm(true)}
                >
                  <FaPaperPlane className="mr-3" />
                  Request Custom Itinerary
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

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
          Why Choose <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Our Service</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <FaPlane className="text-4xl text-blue-500" />,
              title: "Exclusive Flight Deals",
              description: "Access to special discounts and offers not available to the general public",
              bg: "bg-gradient-to-br from-blue-50 to-white",
              border: "border-blue-200",
              features: [
                "Up to 40% off on select routes",
                "Early bird specials",
                "Last-minute deals"
              ]
            },
            {
              icon: <FaUserTie className="text-4xl text-purple-500" />,
              title: "Personal Travel Expert",
              description: "Dedicated professional to handle all your travel arrangements",
              bg: "bg-gradient-to-br from-purple-50 to-white",
              border: "border-purple-200",
              features: [
                "24/7 availability",
                "Custom itinerary planning",
                "VIP treatment"
              ]
            },
            {
              icon: <FaHeadset className="text-4xl text-pink-500" />,
              title: "24/7 Travel Support",
              description: "Assistance available anytime, anywhere during your journey",
              bg: "bg-gradient-to-br from-pink-50 to-white",
              border: "border-pink-200",
              features: [
                "Flight changes & cancellations",
                "Emergency assistance",
                "Real-time updates"
              ]
            }
          ].map((benefit, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className={`${benefit.bg} rounded-3xl shadow-xl p-8 flex flex-col items-center text-center border-2 ${benefit.border} hover:shadow-2xl transition-all h-full relative overflow-hidden group`}
              whileHover={{ y: -10 }}
            >
              <div className="absolute -right-10 -top-10 opacity-10 group-hover:opacity-20 transition-opacity">
                <GiCommercialAirplane className="text-gray-800 text-6xl rotate-45" />
              </div>
              <div className={`p-5 rounded-full mb-6 ${benefit.bg} border-2 ${benefit.border} group-hover:scale-110 transition-transform`}>
                {benefit.icon}
              </div>
              <h3 className="font-bold text-2xl mb-4 text-gray-800">{benefit.title}</h3>
              <p className="text-gray-600 mb-6">{benefit.description}</p>
              
              <div className="w-full mb-6">
                {benefit.features.map((feature, i) => (
                  <div key={i} className="flex items-center mb-2 text-left">
                    <FaCheck className="text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium py-3 px-8 rounded-xl shadow hover:shadow-md transition-all"
                onClick={() => {
                  setShowRequestForm(true);
                  if (index === 0) handleHeroAction('bestPrices');
                  else if (index === 1) handleHeroAction('expertSupport');
                  else handleHeroAction('exclusiveDeals');
                }}
              >
                Experience Now
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Request Form Modal */}
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
            className="bg-white rounded-3xl shadow-3xl max-w-md w-full overflow-hidden relative border-4 border-blue-100"
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
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </div>
            ) : (
              <>
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-90">
                    <div className="absolute top-0 left-0 w-full h-full">
                      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-float-delay"></div>
                      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-purple-200 rounded-full opacity-20 animate-float"></div>
                      <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-pink-200 rounded-full opacity-20 animate-float-delay-2"></div>
                    </div>
                  </div>
                  
                  <div className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-8 text-white">
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
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-white">
                          Flight Request Details
                        </h2>
                        <p className="text-lg opacity-90 mt-2">Complete your information to get the best deals</p>
                      </div>
                    </div>
                  </div>
                  
                  <form onSubmit={handleRequestSubmit} className="relative">
                    <div className="max-h-[70vh] overflow-y-auto p-8 bg-white bg-opacity-90 backdrop-blur-sm">
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
                        {/* Flight Summary */}
                        <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border-2 border-blue-100 shadow-sm mb-6">
                          <h3 className="text-xl font-bold text-blue-600 mb-4">Your Flight Details</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-bold text-blue-600 mb-1">From</label>
                              <div className="font-medium text-gray-800 flex items-center">
                                <FaMapMarkerAlt className="text-blue-400 mr-2" />
                                {requestData.fromCity || fromCity.split(' ')[0]}
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-bold text-purple-600 mb-1">To</label>
                              <div className="font-medium text-gray-800 flex items-center">
                                <FaMapMarkerAlt className="text-purple-400 mr-2" />
                                {requestData.toCity || toCity.split(' ')[0]}
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-bold text-pink-600 mb-1">Departure</label>
                              <div className="font-medium text-gray-800 flex items-center">
                                <FaCalendarAlt className="text-pink-400 mr-2" />
                                {requestData.departure || formatDate(departureDate)}
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-bold text-green-600 mb-1">{tripType === 'ROUNDTRIP' ? 'Return' : 'Trip Type'}</label>
                              <div className="font-medium text-gray-800 flex items-center">
                                <FaCalendarAlt className="text-green-400 mr-2" />
                                {tripType === 'ROUNDTRIP' ? (requestData.return || formatDate(returnDate)) : 'One Way'}
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-bold text-amber-600 mb-1">Passengers</label>
                              <div className="font-medium text-gray-800 flex items-center">
                                <FaUsers className="text-amber-400 mr-2" />
                                {requestData.passengers || passengerCount}
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-bold text-indigo-600 mb-1">Class</label>
                              <div className="font-medium text-gray-800 flex items-center">
                                <FaChair className="text-indigo-400 mr-2" />
                                {requestData.class || travelClass}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Name Field */}
                        <div className="relative group">
                          <label className="block text-sm font-bold text-blue-600 mb-2">Full Name*</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <FaUser className="text-blue-400 text-lg group-hover:text-blue-500 transition-colors" />
                            </div>
                            <input
                              type="text"
                              name="name"
                              value={requestData.name}
                              onChange={handleInputChange}
                              className="w-full pl-12 border-2 border-blue-100 rounded-xl px-4 py-4 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 font-medium text-gray-800 bg-white hover:bg-blue-50 transition-colors"
                              required
                              placeholder="John Doe"
                            />
                          </div>
                        </div>

                        {/* Email Field */}
                        <div className="relative group">
                          <label className="block text-sm font-bold text-blue-600 mb-2">Email*</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <FaEnvelope className="text-blue-400 text-lg group-hover:text-blue-500 transition-colors" />
                            </div>
                            <input
                              type="email"
                              name="email"
                              value={requestData.email}
                              onChange={handleInputChange}
                              className="w-full pl-12 border-2 border-blue-100 rounded-xl px-4 py-4 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 font-medium text-gray-800 bg-white hover:bg-blue-50 transition-colors"
                              required
                              placeholder="your@email.com"
                            />
                          </div>
                        </div>

                        {/* Phone Field */}
                        <div className="relative group">
                          <label className="block text-sm font-bold text-blue-600 mb-2">Phone Number*</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <FaPhone className="text-blue-400 text-lg group-hover:text-blue-500 transition-colors" />
                            </div>
                            <input
                              type="tel"
                              name="phone"
                              value={requestData.phone}
                              onChange={handleInputChange}
                              className="w-full pl-12 border-2 border-blue-100 rounded-xl px-4 py-4 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 font-medium text-gray-800 bg-white hover:bg-blue-50 transition-colors"
                              required
                              placeholder="+91 9876543210"
                            />
                          </div>
                        </div>

                        {/* Special Requests */}
                        <div className="relative group">
                          <label className="block text-sm font-bold text-blue-600 mb-2">Special Requests</label>
                          <textarea
                            name="specialRequests"
                            value={requestData.specialRequests}
                            onChange={handleInputChange}
                            className="w-full border-2 border-blue-100 rounded-xl px-4 py-4 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 font-medium text-gray-800 bg-white hover:bg-blue-50 transition-colors"
                            rows="4"
                            placeholder="Any special requirements (dietary needs, seating preferences, etc.)"
                          ></textarea>
                          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <FaRegSmileWink className="text-blue-400 text-xl" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-6 bg-gray-50 border-t border-gray-200">
                      <motion.button
                        type="button"
                        onClick={() => setShowRequestForm(false)}
                        className="text-blue-600 hover:text-blue-800 font-bold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center"
                        whileHover={{ x: -5 }}
                      >
                        <FaArrowLeft className="mr-2" />
                        Back
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
    </div>
  );
};

export default Flight;