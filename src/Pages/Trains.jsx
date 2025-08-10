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
  FaTrash,
  FaShieldAlt,
  FaGift,
  FaMoneyBillWave,
  FaHotel,
  FaSuitcase,
  FaWifi,
  FaUtensils,
  FaHeadset,
  FaCalculator
} from 'react-icons/fa';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin 
} from 'react-icons/fa';
import { IoRocketSharp } from 'react-icons/io5';
import { GiEarthAmerica } from 'react-icons/gi';
import { BsClockHistory } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import emailjs from '@emailjs/browser';

// Image URLs from Unsplash (free to use)
const Manali = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRszBbmcya3FF5OaCFeYTTnt28A2VFwPbaTvWh4mrgfj18vKReAxqZNcfkssi752feoPRw&usqp=CAU";
const Rishikesh = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7FFmLyredaOlQxG66UYwNA7m4GHQijW1asA&s";
const Shatabdi = "https://th-i.thgim.com/public/incoming/tiqeka/article69037742.ece/alternates/FREE_1200/Linke-Hofmann-Busch%20LHB%20coach.jpg";
const Rajdhani = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjvEEgK4fy09rvncMIB4Af-Dv4SsDpDJ3JUA&s";
const Duronto = "https://www.jagranimages.com/images/newimg/01062022/01_06_2022-duronto_exp_coaches_22762989.webp";
const VandeBharat = "https://metrorailnews.in/wp-content/uploads/2025/04/P14GXF.jpg";

// Initialize emailjs (replace with your actual public key)
emailjs.init('127OFHb2IQq0zSiFJ');

const Trains = () => {
  const [tripType, setTripType] = useState('ONE WAY');
  const [fromCity, setFromCity] = useState('Delhi');
  const [toCity, setToCity] = useState('Mumbai');
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date(new Date().setDate(new Date().getDate() + 7)));
  const [passengerCount, setPassengerCount] = useState(1);
  const [classType, setClassType] = useState('AC 2 Tier');
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
  const [showClassDropdown, setShowClassDropdown] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState('');
  const [selectedFare, setSelectedFare] = useState('Regular');
  const [multiCityTrips, setMultiCityTrips] = useState([
    { from: 'Delhi', to: 'Mumbai', date: new Date() },
    { from: 'Mumbai', to: 'Chennai', date: new Date(new Date().setDate(new Date().getDate() + 3)) }
  ]);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDateCalculator, setShowDateCalculator] = useState(false);
  const [dateCalculation, setDateCalculation] = useState({
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    daysDifference: 1
  });

  const features = [
    {
      icon: <FaTrain className="text-blue-500 text-2xl sm:text-3xl" />,
      title: "10,000+ Daily Trains",
      description: "Access to the widest selection of trains across all routes"
    },
    {
      icon: <FaUserTie className="text-purple-500 text-2xl sm:text-3xl" />,
      title: "Safe & Comfortable",
      description: "Experienced staff and well-maintained trains for your journey"
    },
    {
      icon: <FaHeadset className="text-pink-500 text-2xl sm:text-3xl" />,
      title: "24/7 Customer Support",
      description: "Dedicated support team available round the clock"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cities = [
    'Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Hyderabad', 'Kolkata', 
    'Ahmedabad', 'Pune', 'Jaipur', 'Lucknow', 'Bhopal', 'Patna',
    'Bhubaneswar', 'Guwahati', 'Thiruvananthapuram', 'Chandigarh',
    'Amritsar', 'Varanasi', 'Nagpur', 'Indore', 'Visakhapatnam'
  ];

  const classTypes = [
    'AC First Class', 
    'AC 2 Tier', 
    'AC 3 Tier', 
    'Sleeper', 
    'Second Sitting',
    'Executive Class',
    'Chair Car'
  ];

  const popularDestinations = [
    { 
      name: 'Manali', 
      icon: <FaMountain className="text-amber-400" />,
      image: Manali,
      price: '₹1,299',
      distance: '550 km',
      duration: '12 hours'
    },
    { 
      name: 'Rishikesh', 
      icon: <FaGlobeAmericas className="text-emerald-400" />,
      image: Rishikesh,
      price: '₹750',
      distance: '240 km',
      duration: '5 hours'
    },
  ];

  const trainAmenities = [
    { icon: <FaWifi className="text-blue-500" />, name: "WiFi (Select Trains)" },
    { icon: <FaUtensils className="text-amber-500" />, name: "Food Service" },
    { icon: <FaSuitcase className="text-purple-500" />, name: "Luggage Space" },
    { icon: <FaHotel className="text-green-500" />, name: "Bedding (AC Classes)" }
  ];

  const trainDetails = [
    {
      type: 'Shatabdi Express',
      image: Shatabdi,
      class: 'Chair Car/Executive',
      features: ['High-speed', 'Meals included', 'Comfortable seating', 'Limited stops'],
      pricePerKm: '₹2.5/km',
      minPrice: '₹500'
    },
    {
      type: 'Rajdhani Express',
      image: Rajdhani,
      class: 'AC 1/2/3 Tier',
      features: ['Premium service', 'Meals included', 'Bedding provided', 'Overnight journeys'],
      pricePerKm: '₹3.5/km',
      minPrice: '₹1200'
    },
    {
      type: 'Duronto Express',
      image: Duronto,
      class: 'AC/Sleeper',
      features: ['Non-stop', 'Meals included', 'Quick transit', 'Limited stops'],
      pricePerKm: '₹3.0/km',
      minPrice: '₹900'
    },
    {
      type: 'Vande Bharat',
      image: VandeBharat,
      class: 'Executive/Chair Car',
      features: ['Semi-high speed', 'Modern amenities', 'Onboard entertainment', 'Comfortable seating'],
      pricePerKm: '₹4.0/km',
      minPrice: '₹1500'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'short', weekday: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options).replace(',', '');
  };

  const handleHeroAction = (actionType) => {
    setShowRequestForm(true);
    
    if (actionType === 'bestPrices') {
      setRequestData(prev => ({
        ...prev,
        classType: 'AC 2 Tier',
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
  };

  const sendEmail = async (formData) => {
    try {
      let tripsInfo = '';
      if (formData.tripType === 'MULTICITY') {
        tripsInfo = formData.trips.map((trip, index) => 
          `Trip ${index + 1}: ${trip.from} to ${trip.to} on ${trip.date}`
        ).join('\n');
      } else {
        tripsInfo = `From: ${formData.trips[0].from} to ${formData.trips[0].to} on ${formData.trips[0].date}`;
        if (formData.tripType === 'ROUNDTRIP') {
          tripsInfo += `\nReturn: ${formData.trips[1].from} to ${formData.trips[1].to} on ${formData.trips[1].date}`;
        }
      }

      const templateParams = {
        to_name: 'Travel Team',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        trip_type: formData.tripType,
        passengers: formData.passengers,
        class_type: formData.classType,
        trips_info: tripsInfo,
        special_requests: formData.specialRequests || 'None',
        reply_to: formData.email
      };

      await emailjs.send(
       'service_9jzlq6q', 
        'template_mwwf2lg',
        templateParams,
        '127OFHb2IQq0zSiFJ'
      );

      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  };

  const [requestData, setRequestData] = useState({
    name: '',
    email: '',
    phone: '',
    tripType: 'ONE WAY',
    trips: [],
    passengers: 1,
    classType: 'AC 2 Tier',
    specialRequests: ''
  });

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');

    if (!requestData.name || !requestData.email || !requestData.phone) {
      setFormError('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    let tripsData = [];
    if (tripType === 'MULTICITY') {
      tripsData = multiCityTrips.map(trip => ({
        from: trip.from,
        to: trip.to,
        date: formatDate(trip.date)
      }));
    } else {
      tripsData = [{
        from: fromCity,
        to: toCity,
        date: formatDate(departureDate)
      }];
      if (tripType === 'ROUNDTRIP') {
        tripsData.push({
          from: toCity,
          to: fromCity,
          date: formatDate(returnDate)
        });
      }
    }

    const formData = {
      ...requestData,
      tripType,
      trips: tripsData,
      passengers: passengerCount,
      classType
    };

    try {
      const emailSent = await sendEmail(formData);
      
      if (!emailSent) {
        throw new Error('Failed to send email');
      }
      
      console.log('Form data submitted:', formData);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
      setTimeout(() => {
        setShowRequestForm(false);
        setSubmitSuccess(false);
        setRequestData({
          name: '',
          email: '',
          phone: '',
          tripType: 'ONE WAY',
          trips: [],
          passengers: 1,
          classType: 'AC 2 Tier',
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
    setPassengerCount(Math.max(1, Math.min(6, count)));
  };

  const handleClassTypeChange = (type) => {
    setClassType(type);
    setShowClassDropdown(false);
  };

  const handleDateChange = (date, isReturn = false) => {
    if (isReturn) {
      setReturnDate(date);
    } else {
      setDepartureDate(date);
    }
  };

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

  const handleDateCalculation = (dates) => {
    const [start, end] = dates;
    setDateCalculation(prev => ({
      ...prev,
      startDate: start,
      endDate: end,
      daysDifference: Math.round((end - start) / (1000 * 60 * 60 * 24))
    }));
  };

  const DepartureDatePicker = () => (
    <motion.div 
      variants={itemVariants}
      className="bg-gray-100 p-2 sm:p-3 hover:border-blue-400 transition-colors relative"
    >
      <div className="absolute -right-4 -top-4 opacity-10">
        <FaCalendarAlt className="text-blue-200 text-3xl" />
      </div>
      <label className="block text-xs sm:text-sm font-bold text-blue-600 mb-1 sm:mb-2 items-center whitespace-nowrap overflow-hidden text-ellipsis">
        <FaCalendarAlt className="text-blue-400 mr-1 sm:mr-2 inline" />
        DEPARTURE DATE
      </label>
      <div className="flex items-center">
        <DatePicker
          selected={departureDate}
          onChange={(date) => handleDateChange(date)}
          minDate={new Date()}
          dateFormat="d MMM yyyy"
          className="w-full outline-none font-bold text-gray-900 bg-transparent text-sm sm:text-base md:text-lg cursor-pointer"
        />
      </div>
    </motion.div>
  );

  const ReturnDatePicker = () => (
    <motion.div 
      variants={itemVariants}
      className="bg-gray-100 p-2 sm:p-3 hover:border-blue-400 transition-colors relative"
    >
      <div className="absolute -right-4 -top-4 opacity-10">
        <BsClockHistory className="text-blue-200 text-3xl" />
      </div>
      <label className="block text-xs sm:text-sm font-bold text-blue-600 mb-1 sm:mb-2 items-center whitespace-nowrap overflow-hidden text-ellipsis">
        <FaCalendarAlt className="text-blue-400 mr-1 sm:mr-2 inline" />
        RETURN DATE
      </label>
      <div className="flex items-center">
        <DatePicker
          selected={returnDate}
          onChange={(date) => handleDateChange(date, true)}
          minDate={departureDate}
          dateFormat="d MM yyyy"
          className="w-full outline-none font-bold text-gray-900 bg-transparent text-sm sm:text-base md:text-lg cursor-pointer"
        />
      </div>
    </motion.div>
  );

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

  const featureVariants = {
    enter: { opacity: 0, y: 20 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 rounded-full opacity-10 animate-float-delay"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-48 bg-purple-100 rounded-full opacity-10 animate-float"></div>
        <div className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-pink-100 rounded-full opacity-10 animate-float-delay-2"></div>
        <div className="absolute top-1/5 right-1/5 w-32 h-32 bg-indigo-100 rounded-full opacity-10 animate-float-delay-3"></div>
        <div className="absolute bottom-1/5 right-1/4 w-48 h-48 bg-teal-100 rounded-full opacity-10 animate-float-delay-4"></div>
      </div>

      {/* Header with Scrolling Effect */}
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center">
            <FaTrain className="text-blue-500 text-2xl sm:text-3xl mr-2" />
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              RailJourney
            </span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Home</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Trains</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Deals</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">About</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Contact</a>
          </nav>
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg shadow hover:shadow-lg transition-all">
            Sign In
          </button>
        </div>
      </motion.header>

      {/* Search Section */}
      <motion.div 
        id="booking-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl p-4 sm:p-6 md:p-8 mb-8 sm:mb-12 relative overflow-hidden -mt-20 z-20 mx-4 sm:mx-6 rounded-xl"
      >
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center">
            <FaTrain className="text-blue-500 mr-2 sm:mr-3 text-lg sm:text-xl" />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Book Your Train
            </span>
          </h2>
        </div>
        
        {/* Trip Type Tabs */}
        <div className="flex border-b-2 border-gray-200 mb-6 sm:mb-8 overflow-x-auto">
          {['ONE WAY', 'ROUNDTRIP', 'MULTICITY'].map((type) => (
            <motion.button
              key={type}
              whileTap={{ scale: 0.95 }}
              className={`pb-3 px-3 sm:px-4 font-medium text-sm sm:text-base md:text-lg whitespace-nowrap relative ${
                tripType === type ? 'text-blue-600' : 'text-gray-500 hover:text-blue-500'
              }`}
              onClick={() => setTripType(type)}
            >
              {type === 'ONE WAY' ? 'One Way' : type === 'ROUNDTRIP' ? 'Round Trip' : 'Multi City'}
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6"
        >
          {/* From City */}
          <motion.div 
            variants={itemVariants}
            className="bg-gray-100 p-2 sm:p-3 hover:border-blue-400 transition-colors relative overflow-hidden"
          >
            <div className="absolute -right-4 -top-4 opacity-10">
              <FaMapMarkerAlt className="text-blue-200 text-3xl" />
            </div>
            <label className="block text-xs sm:text-sm font-bold text-blue-600 mb-1 sm:mb-2 items-center whitespace-nowrap overflow-hidden text-ellipsis">
              <FaMapMarkerAlt className="text-blue-400 mr-1 sm:mr-2 inline" />
              FROM STATION
            </label>
            <div className="flex items-center">
              <select 
                className="w-full outline-none font-bold text-gray-900 bg-transparent text-sm sm:text-base md:text-lg whitespace-nowrap overflow-hidden text-ellipsis"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Swap Button */}
          <motion.div 
            className="flex items-center justify-center col-span-1 sm:col-span-2 lg:col-span-1"
            variants={itemVariants}
          >
            <motion.button 
              onClick={handleSwapCities}
              className="bg-gray-100 p-1 sm:p-2 rounded-full hover:bg-gray-100 transition-colors shadow-md border border-gray-200"
              aria-label="Swap cities"
              whileHover={{ rotate: 180, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaExchangeAlt className="text-blue-500 text-sm sm:text-base" />
            </motion.button>
          </motion.div>

          {/* To City */}
          <motion.div 
            variants={itemVariants}
            className="bg-gray-100 p-2 sm:p-3 hover:border-blue-400 transition-colors relative overflow-hidden"
          >
            <div className="absolute -right-4 -top-4 opacity-10">
              <FaMapMarkerAlt className="text-blue-200 text-3xl" />
            </div>
            <label className="block text-xs sm:text-sm font-bold text-blue-600 mb-1 sm:mb-2 items-center whitespace-nowrap overflow-hidden text-ellipsis">
              <FaMapMarkerAlt className="text-blue-400 mr-1 sm:mr-2 inline" />
              TO STATION
            </label>
            <div className="flex items-center">
              <select 
                className="w-full outline-none font-bold text-gray-900 bg-transparent text-sm sm:text-base md:text-lg whitespace-nowrap overflow-hidden text-ellipsis"
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Departure Date */}
          <DepartureDatePicker />

          {/* Travelers & Class */}
          <motion.div 
            variants={itemVariants}
            className="bg-gray-100 p-2 sm:p-3 hover:border-blue-400 transition-colors relative"
          >
            <div className="absolute -right-4 -top-4 opacity-10">
              <FaUser className="text-blue-200 text-3xl" />
            </div>
            <label className="block text-xs sm:text-sm font-bold text-blue-600 mb-1 sm:mb-2">PASSENGERS & CLASS</label>
            <div className="relative">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
              >
                <div className="flex items-center">
                  <FaUser className="text-blue-400 mr-2" />
                  <span className="font-bold text-gray-900">{passengerCount} Passenger</span>
                </div>
                {showPassengerDropdown ? (
                  <FaChevronUp className="text-gray-500" />
                ) : (
                  <FaChevronDown className="text-gray-500" />
                )}
              </div>
              <div className="text-sm text-gray-700 mt-1 flex items-center justify-between cursor-pointer"
                   onClick={() => setShowClassDropdown(!showClassDropdown)}>
                <span>{classType}</span>
                {showClassDropdown ? (
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
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 p-3"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-700">Passengers</span>
                    <div className="flex items-center">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePassengerCountChange(passengerCount - 1);
                        }}
                        disabled={passengerCount <= 1}
                        className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                      >
                        <FaMinus className="text-xs" />
                      </button>
                      <span className="mx-3 font-medium">{passengerCount}</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePassengerCountChange(passengerCount + 1);
                        }}
                        disabled={passengerCount >= 6}
                        className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                      >
                        <FaPlus className="text-xs" />
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowPassengerDropdown(false)}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                  >
                    Done
                  </button>
                </motion.div>
              )}

              {/* Class Dropdown */}
              {showClassDropdown && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 p-3"
                >
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {classTypes.map((type) => (
                      <div 
                        key={type}
                        className={`p-2 rounded-lg cursor-pointer ${classType === type ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClassTypeChange(type);
                        }}
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => setShowClassDropdown(false)}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors mt-3"
                  >
                    Done
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Special Fare Options */}
          <motion.div 
            variants={itemVariants}
            className="bg-gray-100 p-2 sm:p-3 hover:border-blue-400 transition-colors"
          >
            <label className="block text-xs sm:text-sm font-bold text-blue-600 mb-1 sm:mb-2">SELECT A SPECIAL FARE</label>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full border-2 border-blue-500 flex items-center justify-center mr-2">
                <FaCheck className="text-blue-500 text-xs" />
              </div>
              <span className="text-sm font-bold text-blue-600">EXTRA SAVINGS</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Special Fare Options */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-6 mt-4 sm:mt-6"
        >
          {[
            { 
              title: "Regular", 
              desc: "Regular Fares",
              selected: selectedFare === 'Regular'
            },
            { 
              title: "Student", 
              desc: "Extra discounts",
              selected: selectedFare === 'Student'
            },
            { 
              title: "Senior Citizen", 
              desc: "Up to 40% off",
              selected: selectedFare === 'Senior Citizen'
            },
            { 
              title: "Armed Forces", 
              desc: "Special concessions",
              selected: selectedFare === 'Armed Forces'
            }
          ].map((option, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`border-2 rounded-xl p-3 sm:p-4 transition-all cursor-pointer ${
                option.selected ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
              }`}
              whileHover={{ y: -3 }}
              onClick={() => setSelectedFare(option.title)}
            >
              <div className="flex items-start">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mr-2 ${
                  option.selected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                }`}>
                  {option.selected && <FaCheck className="text-white text-xs" />}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{option.title}</h3>
                  <p className="text-gray-600 text-sm">{option.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Return Date */}
        {tripType === 'ROUNDTRIP' && <ReturnDatePicker />}

        {/* Add Return Trip */}
        {tripType !== 'ROUNDTRIP' && (
          <motion.div 
            variants={itemVariants}
            className="flex items-center mt-4 sm:mt-6"
          >
            <button 
              className="text-blue-600 font-medium flex items-center hover:text-blue-800 transition-colors text-sm sm:text-base md:text-lg whitespace-nowrap"
              onClick={() => setTripType('ROUNDTRIP')}
            >
              <FaPlus className="mr-1 sm:mr-2" />
              ADD RETURN TRIP FOR BIGGER DISCOUNTS
            </button>
          </motion.div>
        )}

        {/* Search Button */}
        <motion.div 
          className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6"
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
                classType: classType
              }));
            }}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center text-sm sm:text-base md:text-lg relative overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            <span className="relative z-10 flex items-center">
              <FaSearch className="mr-2 sm:mr-3" />
              SEARCH TRAINS
            </span>
          </motion.button>
          
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start">
              <FaCheck className="text-green-500 mr-1 sm:mr-2 text-sm" />
              <span className="text-gray-600 font-medium text-xs sm:text-sm whitespace-nowrap">Best Price Guarantee</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start">
              <FaCheck className="text-green-500 mr-1 sm:mr-2 text-sm" />
              <span className="text-gray-600 font-medium text-xs sm:text-sm whitespace-nowrap">No Booking Fees</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Train Details Section */}
      <motion.section 
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
        className="mb-12 sm:mb-16"
      >
        <motion.h2 
          variants={cardVariants}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center text-gray-800"
        >
          Popular <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Train Types</span>
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {trainDetails.map((train, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden border border-gray-100"
              whileHover={{ y: -10 }}
            >
              <div className="h-48 sm:h-56 overflow-hidden">
                <img 
                  src={train.image} 
                  alt={train.type} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{train.type}</h3>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                    {train.class}
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center text-gray-600 mb-1">
                    <FaMoneyBillWave className="mr-2 text-blue-500" />
                    <span className="font-medium">{train.pricePerKm}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaShieldAlt className="mr-2 text-green-500" />
                    <span className="font-medium">Starting at: {train.minPrice}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-bold text-gray-700 mb-2">Features:</h4>
                  <ul className="space-y-2">
                    {train.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <FaCheck className="text-green-500 mr-2 text-xs" />
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium py-2 sm:py-3 px-4 rounded-lg mt-6 shadow hover:shadow-md transition-all"
                  onClick={() => {
                    setShowRequestForm(true);
                    setRequestData(prev => ({
                      ...prev,
                      classType: train.class,
                      specialRequests: `Interested in ${train.type} train`
                    }));
                  }}
                >
                  Book {train.type}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Features Carousel */}
      <motion.section 
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
        className="mb-12 sm:mb-16"
      >
        <motion.div 
          variants={cardVariants}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-6 sm:p-8 shadow-lg border border-white"
        >
          <div className="relative h-40 sm:h-48 overflow-hidden rounded-xl">
            <AnimatePresence mode="wait">
              {features.map((feature, index) => (
                activeFeature === index && (
                  <motion.div
                    key={index}
                    variants={featureVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5 }}
                    className={`absolute inset-0 p-4 sm:p-6 flex items-center rounded-xl`}
                  >
                    <div className="flex items-start">
                      <div className="p-3 sm:p-4 bg-white rounded-xl shadow-sm mr-4 sm:mr-6">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                        <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveFeature(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${activeFeature === index ? 'bg-blue-600' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* Train Amenities */}
      <motion.section 
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
        className="mb-12 sm:mb-16"
      >
        <motion.h2 
          variants={cardVariants}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center text-gray-800"
        >
          Train <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Amenities</span>
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {trainAmenities.map((amenity, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 text-center"
              whileHover={{ y: -5 }}
            >
              <div className="bg-gradient-to-br from-blue-50 to-white p-3 sm:p-4 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                {amenity.icon}
              </div>
              <h3 className="font-bold text-gray-800 text-sm sm:text-base">{amenity.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Hero Section */}
      <motion.div 
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
        className="relative rounded-3xl p-6 sm:p-8 md:p-12 mb-12 sm:mb-16 overflow-hidden shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #ff758c 100%)'
        }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative z-10">
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 rounded-full mb-6 sm:mb-8 shadow-lg border border-white/20"
          >
            <FaHeart className="mr-2 text-pink-300 animate-pulse text-sm sm:text-base" />
            <span className="text-xs sm:text-sm font-bold text-white drop-shadow-md">MOST POPULAR TRAVEL SERVICE</span>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-8 sm:mb-10 lg:mb-0">
              <motion.h1 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
                style={{
                  background: 'linear-gradient(to right, #f9d423, #ff4e50)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                Your Rail Journey Begins Here
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 font-medium max-w-lg"
                style={{
                  color: 'rgba(255,255,255,0.9)',
                  textShadow: '0 1px 3px rgba(0,0,0,0.2)'
                }}
              >
                Experience <span className="font-bold text-white">comfortable journeys</span> with our exclusive train deals and personalized service
              </motion.p>
              
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap gap-3 sm:gap-4"
              >
                {[
                  { 
                    icon: <IoRocketSharp className="mr-2 text-xl sm:text-2xl animate-bounce" style={{ color: '#f9d423' }} />, 
                    text: "Best Prices Guaranteed",
                    bg: "bg-gradient-to-r from-yellow-400 to-yellow-500",
                    action: "bestPrices"
                  },
                  { 
                    icon: <FaUserTie className="mr-2 text-xl sm:text-2xl" style={{ color: '#a5b4fc' }} />, 
                    text: "24/7 Expert Support",
                    bg: "bg-gradient-to-r from-indigo-400 to-indigo-500",
                    action: "expertSupport"
                  },
                  { 
                    icon: <FaStar className="mr-2 text-xl sm:text-2xl" style={{ color: '#f472b6' }} />, 
                    text: "Exclusive Deals",
                    bg: "bg-gradient-to-r from-pink-400 to-pink-500",
                    action: "exclusiveDeals"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className={`flex items-center ${item.bg} px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer group`}
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
                    <span className="font-bold text-white text-sm sm:text-base md:text-lg">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            <div className="lg:w-1/2 lg:pl-8 xl:pl-12 mt-8 lg:mt-0">
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border-2 border-white/20"
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">Why Book With Us?</h3>
                
                <div className="space-y-4 sm:space-y-6">
                  {[
                    {
                      icon: <FaTrain className="text-lg sm:text-xl" style={{ color: '#93c5fd' }} />,
                      title: "10,000+ Daily Trains",
                      description: "Access to the widest selection of trains across all routes",
                      color: "text-blue-300"
                    },
                    {
                      icon: <FaUserTie className="text-lg sm:text-xl" style={{ color: '#c4b5fd' }} />,
                      title: "Safe & Comfortable",
                      description: "Experienced staff and well-maintained trains for your journey",
                      color: "text-purple-300"
                    },
                    {
                      icon: <FaHeadset className="text-lg sm:text-xl" style={{ color: '#f9a8d4' }} />,
                      title: "24/7 Customer Support",
                      description: "Dedicated support team available round the clock",
                      color: "text-pink-300"
                    }
                  ].map((feature, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                    >
                      <div className={`p-2 sm:p-3 rounded-lg bg-white/20 mr-3 sm:mr-4 ${feature.color}`}>
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className={`font-bold text-base sm:text-lg mb-1 ${feature.color}`}>{feature.title}</h4>
                        <p className="text-white/80 text-sm sm:text-base">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold py-3 sm:py-4 px-6 rounded-xl mt-6 sm:mt-8 shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
                  onClick={() => setShowRequestForm(true)}
                  style={{
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.3)'
                  }}
                >
                  <FaPaperPlane className="mr-2 sm:mr-3" />
                  <span className="text-sm sm:text-base">Request Custom Itinerary</span>
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
        className="mb-12 sm:mb-20"
      >
        <motion.h2 
          variants={cardVariants}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center text-gray-800"
        >
          Why Choose <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Our Service</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              icon: <FaTrain className="text-3xl sm:text-4xl text-blue-500" />,
              title: "Exclusive Train Deals",
              description: "Access to special discounts and offers not available to the general public",
              features: [
                "Up to 30% off on select routes",
                "Early bird specials",
                "Last-minute deals"
              ],
              color: "text-blue-500"
            },
            {
              icon: <FaUserTie className="text-3xl sm:text-4xl text-purple-500" />,
              title: "Personal Travel Expert",
              description: "Dedicated professional to handle all your travel arrangements",
              features: [
                "24/7 availability",
                "Custom route planning",
                "VIP treatment"
              ],
              color: "text-purple-500"
            },
            {
              icon: <FaHeadset className="text-3xl sm:text-4xl text-pink-500" />,
              title: "24/7 Travel Support",
              description: "Assistance available anytime, anywhere during your journey",
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
              className={`rounded-3xl shadow-xl p-6 sm:p-8 flex flex-col items-center text-center border-2 hover:shadow-2xl transition-all h-full relative overflow-hidden group`}
              whileHover={{ y: -10 }}
            >
              <div className="absolute -right-8 -top-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <FaTrain className="text-gray-800 text-5xl sm:text-6xl" />
              </div>
              <div className={`p-4 sm:p-5 rounded-full mb-4 sm:mb-6 group-hover:scale-110 transition-transform`}>
                {benefit.icon}
              </div>
              <h3 className={`font-bold text-xl sm:text-2xl mb-3 sm:mb-4 ${benefit.color}`}>{benefit.title}</h3>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">{benefit.description}</p>
              
              <div className="w-full mb-4 sm:mb-6">
                {benefit.features.map((feature, i) => (
                  <div key={i} className="flex items-center mb-2 text-left">
                    <FaCheck className="text-green-500 mr-2 sm:mr-3 flex-shrink-0 text-sm" />
                    <span className="text-gray-700 text-xs sm:text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium py-2 sm:py-3 px-6 sm:px-8 rounded-xl shadow hover:shadow-md transition-all text-sm sm:text-base"
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
      <AnimatePresence>
        {showRequestForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                    {submitSuccess ? 'Request Sent!' : 'Request Train Details'}
                  </h3>
                  <button 
                    onClick={() => setShowRequestForm(false)}
                    className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <FaArrowLeft className="text-lg" />
                  </button>
                </div>

                {submitSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FaCheck className="text-green-500 text-3xl" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-2">Thank You!</h4>
                    <p className="text-gray-600 mb-6">Your train request has been received. Our travel expert will contact you shortly.</p>
                    <button
                      onClick={() => setShowRequestForm(false)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <>
                    {formError && (
                      <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                        {formError}
                      </div>
                    )}

                    <form onSubmit={handleRequestSubmit}>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                          <input
                            type="text"
                            name="name"
                            value={requestData.name}
                            onChange={handleInputChange}
                            className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                          <input
                            type="email"
                            name="email"
                            value={requestData.email}
                            onChange={handleInputChange}
                            className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                          <input
                            type="tel"
                            name="phone"
                            value={requestData.phone}
                            onChange={handleInputChange}
                            className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Trip Type</label>
                          <select
                            name="tripType"
                            value={requestData.tripType}
                            onChange={handleInputChange}
                            className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                          >
                            <option value="ONE WAY">One Way</option>
                            <option value="ROUNDTRIP">Round Trip</option>
                            <option value="MULTICITY">Multi City</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Class Type</label>
                          <select
                            name="classType"
                            value={requestData.classType}
                            onChange={handleInputChange}
                            className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                          >
                            {classTypes.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Passengers</label>
                          <input
                            type="number"
                            name="passengers"
                            value={requestData.passengers}
                            onChange={handleInputChange}
                            min="1"
                            max="6"
                            className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                          <textarea
                            name="specialRequests"
                            value={requestData.specialRequests}
                            onChange={handleInputChange}
                            rows="3"
                            className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                            placeholder="Any special requirements or preferences..."
                          ></textarea>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-6 rounded-xl shadow hover:shadow-lg transition-all mt-6 flex items-center justify-center"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            <FaPaperPlane className="mr-2" />
                            Submit Request
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Trains;