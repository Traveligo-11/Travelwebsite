import React, { useState, useEffect } from 'react';
import { 
  FaTrain, 
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
  FaChevronUp,
  FaPlus,
  FaMinus,
  FaTrash
} from 'react-icons/fa';
import { GiRailway } from 'react-icons/gi';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import emailjs from '@emailjs/browser';

const Train = () => {
  // Initialize EmailJS (replace with your User ID)
  useEffect(() => {
    emailjs.init('127OFHb2IQq0zSiFJ');
  }, []);

  const [tripType, setTripType] = useState('ONE WAY');
  const [fromStation, setFromStation] = useState('Delhi (DEL)');
  const [toStation, setToStation] = useState('Mumbai (BOM)');
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date(new Date().setDate(new Date().getDate() + 7)));
  const [passengerCount, setPassengerCount] = useState(1);
  const [travelClass, setTravelClass] = useState('Sleeper');
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState('');
  const [multiCityTrips, setMultiCityTrips] = useState([
    { from: 'Delhi (DEL)', to: 'Mumbai (BOM)', date: new Date() },
    { from: 'Mumbai (BOM)', to: 'Bangalore (BLR)', date: new Date(new Date().setDate(new Date().getDate() + 3)) }
  ]);

  const [requestData, setRequestData] = useState({
    name: '',
    email: '',
    phone: '',
    tripType: 'ONE WAY',
    trips: [],
    passengers: 1,
    class: 'Sleeper',
    specialRequests: ''
  });

  const stations = [
    'Delhi (DEL) - New Delhi Railway Station',
    'Mumbai (BOM) - Chhatrapati Shivaji Terminus',
    'Bangalore (BLR) - Krantivira Sangolli Rayanna Station',
    'Chennai (MAS) - Chennai Central',
    'Kolkata (KOAA) - Howrah Junction',
    'Hyderabad (HYD) - Hyderabad Deccan Station',
    'Jaipur (JP) - Jaipur Junction'
  ];

  const travelClasses = ['Sleeper', '3A', '2A', '1A', 'EC', 'CC'];

  const popularDestinations = [
    { name: 'Goa', icon: <FaUmbrellaBeach className="text-amber-400" />, bg: 'bg-gradient-to-br from-amber-100 to-amber-50' },
    { name: 'Jaipur', icon: <FaCity className="text-blue-400" />, bg: 'bg-gradient-to-br from-blue-100 to-blue-50' },
    { name: 'Darjeeling', icon: <FaMountain className="text-emerald-400" />, bg: 'bg-gradient-to-br from-emerald-100 to-emerald-50' },
    { name: 'Kerala', icon: <FaGlobeAmericas className="text-sky-400" />, bg: 'bg-gradient-to-br from-sky-100 to-sky-50' },
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
        class: 'Sleeper',
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

  const handleSwapStations = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
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

    // Prepare trip data based on trip type
    let tripsData = [];
    if (tripType === 'MULTICITY') {
      tripsData = multiCityTrips.map(trip => ({
        from: trip.from.split(' ')[0],
        to: trip.to.split(' ')[0],
        date: formatDate(trip.date)
      }));
    } else {
      tripsData = [{
        from: fromStation.split(' ')[0],
        to: toStation.split(' ')[0],
        date: formatDate(departureDate)
      }];
      if (tripType === 'ROUNDTRIP') {
        tripsData.push({
          from: toStation.split(' ')[0],
          to: fromStation.split(' ')[0],
          date: formatDate(returnDate)
        });
      }
    }

    const formData = {
      ...requestData,
      tripType,
      trips: tripsData,
      passengers: passengerCount,
      class: travelClass
    };

    try {
      // Prepare email template parameters
      const emailParams = {
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        trip_type: formData.tripType,
        passenger_count: formData.passengers,
        travel_class: formData.class,
        special_requests: formData.specialRequests || 'None',
        trip_details: formData.trips.map(trip => 
          `${trip.from} to ${trip.to} on ${trip.date}`
        ).join('\n'),
        submission_date: new Date().toLocaleString()
      };

      // Send email using EmailJS
      await emailjs.send(
        'service_9jzlq6q', // Replace with your service ID
        'template_mwwf2lg', // Replace with your template ID
        emailParams
      );

      setSubmitSuccess(true);
      setTimeout(() => {
        setShowRequestForm(false);
        setSubmitSuccess(false);
        // Reset form
        setRequestData({
          name: '',
          email: '',
          phone: '',
          tripType: 'ONE WAY',
          trips: [],
          passengers: 1,
          class: 'Sleeper',
          specialRequests: ''
        });
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
  };

  const handleClassChange = (travelClass) => {
    setTravelClass(travelClass);
    setShowPassengerDropdown(false);
  };

  const handleDateChange = (date, isReturn = false) => {
    if (isReturn) {
      setReturnDate(date);
    } else {
      setDepartureDate(date);
    }
  };

  // Multi-city functions
  const addMultiCityTrip = () => {
    setMultiCityTrips([...multiCityTrips, { 
      from: '', 
      to: '', 
      date: new Date(new Date().setDate(new Date().getDate() + multiCityTrips.length * 3)) 
    }]);
  };

  const removeMultiCityTrip = (index) => {
    if (multiCityTrips.length > 1) {
      const updatedTrips = [...multiCityTrips];
      updatedTrips.splice(index, 1);
      setMultiCityTrips(updatedTrips);
    }
  };

  const handleMultiCityChange = (index, field, value) => {
    const updatedTrips = [...multiCityTrips];
    updatedTrips[index][field] = value;
    setMultiCityTrips(updatedTrips);
  };

  const handleMultiCityDateChange = (date, index) => {
    const updatedTrips = [...multiCityTrips];
    updatedTrips[index].date = date;
    setMultiCityTrips(updatedTrips);
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
            <FaTrain className="text-blue-500 mr-3" />
            Find Your Perfect Train Journey
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
          {tripType !== 'MULTICITY' ? (
            <>
              {/* From Station */}
              <motion.div 
                variants={itemVariants}
                className="border-2 rounded-xl p-5 hover:border-blue-400 transition-colors bg-gradient-to-br from-white to-blue-50"
              >
                <label className="block text-sm font-bold text-blue-600 mb-2 items-center">
                  <FaMapMarkerAlt className="text-blue-400 mr-2" />
                  FROM
                </label>
                <div className="flex items-center">
                  <select 
                    className="w-full outline-none font-bold text-gray-900 bg-transparent text-lg"
                    value={fromStation}
                    onChange={(e) => setFromStation(e.target.value)}
                  >
                    {stations.map(station => (
                      <option key={station} value={station.split(' - ')[0]}>{station}</option>
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
                  onClick={handleSwapStations}
                  className="bg-white p-3 rounded-full hover:bg-gray-100 transition-colors shadow-md border border-gray-200"
                  aria-label="Swap stations"
                  whileHover={{ rotate: 180, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaExchangeAlt className="text-blue-500 text-lg" />
                </motion.button>
              </motion.div>

              {/* To Station */}
              <motion.div 
                variants={itemVariants}
                className="border-2 rounded-xl p-5 hover:border-blue-400 transition-colors bg-gradient-to-br from-white to-blue-50"
              >
                <label className="block text-sm font-bold text-blue-600 mb-2 items-center">
                  <FaMapMarkerAlt className="text-blue-400 mr-2" />
                  TO
                </label>
                <div className="flex items-center">
                  <select 
                    className="w-full outline-none font-bold text-gray-900 bg-transparent text-lg"
                    value={toStation}
                    onChange={(e) => setToStation(e.target.value)}
                  >
                    {stations.map(station => (
                      <option key={station} value={station.split(' - ')[0]}>{station}</option>
                    ))}
                  </select>
                </div>
              </motion.div>

              {/* Departure Date */}
              <motion.div 
                variants={itemVariants}
                className="border-2 rounded-xl p-5 hover:border-blue-400 transition-colors bg-gradient-to-br from-white to-blue-50"
              >
                <label className="block text-sm font-bold text-blue-600 mb-2 items-center">
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
                  <label className="block text-sm font-bold text-blue-600 mb-2 items-center">
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
            </>
          ) : (
            <>
              {/* Multi-city trips */}
              <motion.div 
                variants={itemVariants}
                className="col-span-1 md:col-span-2 space-y-4"
              >
                {multiCityTrips.map((trip, index) => (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                    className="border-2 border-blue-100 rounded-xl p-5 bg-gradient-to-br from-white to-blue-50"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-blue-600">Trip {index + 1}</h3>
                      {multiCityTrips.length > 1 && (
                        <button 
                          onClick={() => removeMultiCityTrip(index)}
                          className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* From Station */}
                      <div>
                        <label className="block text-sm font-bold text-blue-600 mb-2">From</label>
                        <select 
                          className="w-full border-2 border-blue-100 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 font-medium text-gray-800 bg-white hover:bg-blue-50 transition-colors"
                          value={trip.from}
                          onChange={(e) => handleMultiCityChange(index, 'from', e.target.value)}
                        >
                          <option value="">Select Station</option>
                          {stations.map(station => (
                            <option key={station} value={station.split(' - ')[0]}>{station}</option>
                          ))}
                        </select>
                      </div>

                      {/* To Station */}
                      <div>
                        <label className="block text-sm font-bold text-blue-600 mb-2">To</label>
                        <select 
                          className="w-full border-2 border-blue-100 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 font-medium text-gray-800 bg-white hover:bg-blue-50 transition-colors"
                          value={trip.to}
                          onChange={(e) => handleMultiCityChange(index, 'to', e.target.value)}
                        >
                          <option value="">Select Station</option>
                          {stations.map(station => (
                            <option key={station} value={station.split(' - ')[0]}>{station}</option>
                          ))}
                        </select>
                      </div>

                      {/* Date */}
                      <div>
                        <label className="block text-sm font-bold text-blue-600 mb-2">Departure Date</label>
                        <DatePicker
                          selected={trip.date}
                          onChange={(date) => handleMultiCityDateChange(date, index)}
                          minDate={index === 0 ? new Date() : multiCityTrips[index-1]?.date}
                          className="w-full border-2 border-blue-100 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 font-medium text-gray-800 bg-white hover:bg-blue-50 transition-colors"
                          dateFormat="d MMM EEE, yyyy"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}

                <motion.button
                  onClick={addMultiCityTrip}
                  className="flex items-center text-blue-600 font-bold hover:text-blue-800 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaPlus className="mr-2" />
                  Add Another Trip
                </motion.button>
              </motion.div>
            </>
          )}

          {/* Traveller & Class */}
          <motion.div 
            variants={itemVariants}
            className="border-2 rounded-xl p-5 hover:border-blue-400 transition-colors bg-gradient-to-br from-white to-blue-50 relative"
          >
            <label className="block text-sm font-bold text-blue-600 mb-2 items-center">
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
                  <label className="block text-sm font-bold text-blue-600 mb-2">Passengers</label>
                  <div className="flex items-center justify-between">
                    <button 
                      className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-colors"
                      onClick={() => handlePassengerCountChange(passengerCount - 1)}
                      disabled={passengerCount <= 1}
                    >
                      <FaMinus />
                    </button>
                    <span className="font-bold">{passengerCount}</span>
                    <button 
                      className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-colors"
                      onClick={() => handlePassengerCountChange(passengerCount + 1)}
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-blue-600 mb-2">Travel Class</label>
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
            <label className="block text-sm font-bold text-blue-600 mb-3">SELECT A SPECIAL FARE</label>
            <div className="text-sm text-blue-500 mb-4 font-medium">EXTRA SAVINGS</div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { title: "Student", desc: "Extra discounts", icon: <FaUser className="text-blue-400" />, bg: "bg-gradient-to-br from-blue-50 to-white", border: "border-blue-200" },
                { title: "Senior Citizen", desc: "Up to ₹ 600 off", icon: <FaUserTie className="text-purple-400" />, bg: "bg-gradient-to-br from-purple-50 to-white", border: "border-purple-200" },
                { title: "Armed Force", desc: "Special discounts", icon: <FaStar className="text-amber-400" />, bg: "bg-gradient-to-br from-amber-50 to-white", border: "border-amber-200" },
                { title: "Flexi Ticket", desc: "Easy cancellation", icon: <FaCheck className="text-green-400" />, bg: "bg-gradient-to-br from-green-50 to-white", border: "border-green-200" }
              ].map((fare, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`border-2 rounded-xl p-4 hover:border-blue-400 cursor-pointer transition-all ${fare.bg} ${fare.border} hover:shadow-md group`}
                >
                  <div className="flex items-center mb-2">
                    <div className={`p-2 rounded-lg ${fare.bg} group-hover:bg-opacity-70 transition-colors mr-3`}>
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
                passengers: passengerCount,
                class: travelClass
              }));
            }}
            className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-5 px-10 rounded-xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center text-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaSearch className="mr-3" />
            SEARCH TRAINS
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
                <GiRailway className="text-gray-400 text-6xl rotate-45" />
              </div>
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-white shadow-sm mr-4">
                  {destination.icon}
                </div>
                <h3 className="font-bold text-xl text-gray-800">{destination.name}</h3>
              </div>
              <div className="text-gray-600 mb-6">Starting from ₹999</div>
              <button 
                className="text-blue-600 font-medium flex items-center group-hover:text-blue-800 transition-colors"
                onClick={() => {
                  setShowRequestForm(true);
                  setRequestData(prev => ({
                    ...prev,
                    toStation: destination.name,
                    specialRequests: `Interested in trains to ${destination.name}`
                  }));
                }}
              >
                Explore trains
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
        className="relative rounded-3xl p-8 md:p-12 mb-16 overflow-hidden shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #ff758c 100%)'
        }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full opacity-10 animate-float-delay"></div>
          <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-white rounded-full opacity-10 animate-float"></div>
          <div className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-white rounded-full opacity-10 animate-float-delay-2"></div>
        </div>
        
        <div className="relative z-10">
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-8 shadow-lg border border-white/20"
          >
            <FaHeart className="mr-2 text-pink-300 animate-pulse" />
            <span className="text-sm font-bold text-white drop-shadow-md">MOST POPULAR TRAVEL SERVICE</span>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <motion.h1 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                style={{
                  background: 'linear-gradient(to right, #f9d423, #ff4e50)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                Your Journey Begins Here
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl mb-8 font-medium max-w-lg"
                style={{
                  color: 'rgba(255,255,255,0.9)',
                  textShadow: '0 1px 3px rgba(0,0,0,0.2)'
                }}
              >
                Experience <span className="font-bold text-white">seamless travel</span> with our exclusive train deals and personalized service
              </motion.p>
              
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap gap-4"
              >
                {[
                  { 
                    icon: <FaTrain className="mr-2 text-2xl animate-bounce" style={{ color: '#f9d423' }} />, 
                    text: "Best Prices Guaranteed",
                    bg: "bg-gradient-to-r from-yellow-400 to-yellow-500",
                    action: "bestPrices"
                  },
                  { 
                    icon: <FaUserTie className="mr-2 text-2xl" style={{ color: '#a5b4fc' }} />, 
                    text: "24/7 Expert Support",
                    bg: "bg-gradient-to-r from-indigo-400 to-indigo-500",
                    action: "expertSupport"
                  },
                  { 
                    icon: <FaStar className="mr-2 text-2xl" style={{ color: '#f472b6' }} />, 
                    text: "Exclusive Deals",
                    bg: "bg-gradient-to-r from-pink-400 to-pink-500",
                    action: "exclusiveDeals"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className={`flex items-center ${item.bg} px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer group`}
                    whileHover={{ y: -5, scale: 1.05 }}
                    onClick={() => handleHeroAction(item.action)}
                    style={{
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)'
                    }}
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
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 border-white/20"
              >
                <h3 className="text-2xl font-bold mb-6 text-white">Why Book With Us?</h3>
                
                <div className="space-y-6">
                  {[
                    {
                      icon: <FaTrain className="text-xl" style={{ color: '#93c5fd' }} />,
                      title: "500+ Daily Trains",
                      description: "Access to the widest selection of trains across all major routes",
                      color: "text-blue-300"
                    },
                    {
                      icon: <FaChair className="text-xl" style={{ color: '#c4b5fd' }} />,
                      title: "Preferred Berths",
                      description: "Get the best berths with our advanced seat selection options",
                      color: "text-purple-300"
                    },
                    {
                      icon: <FaHeadset className="text-xl" style={{ color: '#f9a8d4' }} />,
                      title: "Dedicated Support",
                      description: "Personal travel assistant available throughout your journey",
                      color: "text-pink-300"
                    }
                  ].map((feature, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                    >
                      <div className={`p-3 rounded-lg bg-white/20 mr-4 ${feature.color}`}>
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className={`font-bold text-lg mb-1 ${feature.color}`}>{feature.title}</h4>
                        <p className="text-white/80">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold py-4 px-6 rounded-xl mt-8 shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
                  onClick={() => setShowRequestForm(true)}
                  style={{
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.3)'
                  }}
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
              icon: <FaTrain className="text-4xl text-blue-500" />,
              title: "Exclusive Train Deals",
              description: "Access to special discounts and offers not available to the general public",
              bg: "bg-gradient-to-br from-blue-50 to-white",
              border: "border-blue-200",
              features: [
                "Up to 40% off on select routes",
                "Early bird specials",
                "Last-minute deals"
              ],
              color: "text-blue-500"
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
              ],
              color: "text-purple-500"
            },
            {
              icon: <FaHeadset className="text-4xl text-pink-500" />,
              title: "24/7 Travel Support",
              description: "Assistance available anytime, anywhere during your journey",
              bg: "bg-gradient-to-br from-pink-50 to-white",
              border: "border-pink-200",
              features: [
                "Train changes & cancellations",
                "Emergency assistance",
                "Real-time updates"
              ],
              color: "text-pink-500"
            }
          ].map((benefit, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className={`${benefit.bg} rounded-3xl shadow-xl p-8 flex flex-col items-center text-center border-2 ${benefit.border} hover:shadow-2xl transition-all h-full relative overflow-hidden group`}
              whileHover={{ y: -10 }}
            >
              <div className="absolute -right-10 -top-10 opacity-10 group-hover:opacity-20 transition-opacity">
                <GiRailway className="text-gray-800 text-6xl rotate-45" />
              </div>
              <div className={`p-5 rounded-full mb-6 ${benefit.bg} border-2 ${benefit.border} group-hover:scale-110 transition-transform`}>
                {benefit.icon}
              </div>
              <h3 className={`font-bold text-2xl mb-4 ${benefit.color}`}>{benefit.title}</h3>
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
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
        >
          {/* Background overlay with attractive gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 opacity-90 backdrop-blur-sm"></div>
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-white rounded-3xl shadow-3xl max-w-2xl w-full overflow-hidden border-4 border-white border-opacity-30 z-10"
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
                <p className="text-lg text-gray-600 mb-8">We'll contact you shortly with the best train options for your trip.</p>
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
                  {/* Form header with attractive gradient */}
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
                          Train Request Details
                        </h2>
                        <p className="text-lg opacity-90 mt-2">Complete your information to get the best deals</p>
                      </div>
                    </div>
                  </div>
                  
                  <form onSubmit={handleRequestSubmit} className="relative">
                    <div className="max-h-[70vh] overflow-y-auto p-8">
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
                        {/* Trip Summary */}
                        <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border-2 border-blue-100 shadow-sm mb-6">
                          <h3 className="text-xl font-bold text-blue-600 mb-4">Your Trip Details</h3>
                          
                          {tripType === 'MULTICITY' ? (
                            <div className="space-y-4">
                              {multiCityTrips.map((trip, index) => (
                                <div key={index} className="border-2 border-blue-100 rounded-lg p-4 bg-white">
                                  <div className="flex justify-between items-center mb-3">
                                    <h4 className="font-bold text-blue-600">Trip {index + 1}</h4>
                                    {multiCityTrips.length > 1 && (
                                      <button 
                                        type="button"
                                        onClick={() => removeMultiCityTrip(index)}
                                        className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                                      >
                                        <FaTrash />
                                      </button>
                                    )}
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div>
                                      <div className="text-sm font-medium text-gray-500 mb-1">From</div>
                                      <div className="font-medium text-gray-800">
                                        {trip.from || 'Not selected'}
                                      </div>
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium text-gray-500 mb-1">To</div>
                                      <div className="font-medium text-gray-800">
                                        {trip.to || 'Not selected'}
                                      </div>
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium text-gray-500 mb-1">Date</div>
                                      <div className="font-medium text-gray-800">
                                        {trip.date ? formatDate(trip.date) : 'Not selected'}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <div className="text-sm font-medium text-gray-500 mb-1">From</div>
                                <div className="font-medium text-gray-800 flex items-center">
                                  <FaMapMarkerAlt className="text-blue-400 mr-2" />
                                  {fromStation.split(' ')[0]}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-500 mb-1">To</div>
                                <div className="font-medium text-gray-800 flex items-center">
                                  <FaMapMarkerAlt className="text-purple-400 mr-2" />
                                  {toStation.split(' ')[0]}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-500 mb-1">Departure</div>
                                <div className="font-medium text-gray-800 flex items-center">
                                  <FaCalendarAlt className="text-pink-400 mr-2" />
                                  {formatDate(departureDate)}
                                </div>
                              </div>
                              {tripType === 'ROUNDTRIP' && (
                                <div>
                                  <div className="text-sm font-medium text-gray-500 mb-1">Return</div>
                                  <div className="font-medium text-gray-800 flex items-center">
                                    <FaCalendarAlt className="text-green-400 mr-2" />
                                    {formatDate(returnDate)}
                                  </div>
                                </div>
                              )}
                              <div>
                                <div className="text-sm font-medium text-gray-500 mb-1">Passengers</div>
                                <div className="font-medium text-gray-800 flex items-center">
                                  <FaUsers className="text-amber-400 mr-2" />
                                  {passengerCount}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-500 mb-1">Class</div>
                                <div className="font-medium text-gray-800 flex items-center">
                                  <FaChair className="text-indigo-400 mr-2" />
                                  {travelClass}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Personal Information */}
                        <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border-2 border-purple-100 shadow-sm">
                          <h3 className="text-xl font-bold text-purple-600 mb-4">Your Information</h3>
                          
                          {/* Name Field */}
                          <div className="relative group mb-4">
                            <label className="block text-sm font-bold text-purple-600 mb-2">Full Name*</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FaUser className="text-purple-400 text-lg group-hover:text-purple-500 transition-colors" />
                              </div>
                              <input
                                type="text"
                                name="name"
                                value={requestData.name}
                                onChange={handleInputChange}
                                className="w-full pl-12 border-2 border-purple-100 rounded-xl px-4 py-4 focus:ring-2 focus:ring-purple-300 focus:border-purple-300 font-medium text-gray-800 bg-white hover:bg-purple-50 transition-colors"
                                required
                                placeholder="John Doe"
                              />
                            </div>
                          </div>

                          {/* Email Field */}
                          <div className="relative group mb-4">
                            <label className="block text-sm font-bold text-purple-600 mb-2">Email*</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FaEnvelope className="text-purple-400 text-lg group-hover:text-purple-500 transition-colors" />
                              </div>
                              <input
                                type="email"
                                name="email"
                                value={requestData.email}
                                onChange={handleInputChange}
                                className="w-full pl-12 border-2 border-purple-100 rounded-xl px-4 py-4 focus:ring-2 focus:ring-purple-300 focus:border-purple-300 font-medium text-gray-800 bg-white hover:bg-purple-50 transition-colors"
                                required
                                placeholder="your@email.com"
                              />
                            </div>
                          </div>

                          {/* Phone Field */}
                          <div className="relative group">
                            <label className="block text-sm font-bold text-purple-600 mb-2">Phone Number*</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FaPhone className="text-purple-400 text-lg group-hover:text-purple-500 transition-colors" />
                              </div>
                              <input
                                type="tel"
                                name="phone"
                                value={requestData.phone}
                                onChange={handleInputChange}
                                className="w-full pl-12 border-2 border-purple-100 rounded-xl px-4 py-4 focus:ring-2 focus:ring-purple-300 focus:border-purple-300 font-medium text-gray-800 bg-white hover:bg-purple-50 transition-colors"
                                required
                                placeholder="+91 9876543210"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Special Requests */}
                        <div className="bg-gradient-to-br from-pink-50 to-white p-6 rounded-xl border-2 border-pink-100 shadow-sm">
                          <h3 className="text-xl font-bold text-pink-600 mb-4">Special Requests</h3>
                          <div className="relative group">
                            <textarea
                              name="specialRequests"
                              value={requestData.specialRequests}
                              onChange={handleInputChange}
                              className="w-full border-2 border-pink-100 rounded-xl px-4 py-4 focus:ring-2 focus:ring-pink-300 focus:border-pink-300 font-medium text-gray-800 bg-white hover:bg-pink-50 transition-colors"
                              rows="4"
                              placeholder="Any special requirements (berth preference, dietary needs, etc.)"
                            ></textarea>
                            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                              <FaRegSmileWink className="text-pink-400 text-xl" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-t border-gray-200">
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

export default Train;