import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FaPlane, FaExchangeAlt, FaCalendarAlt, FaUser, FaSearch, 
  FaMapMarkerAlt, FaChevronDown, FaChevronUp, FaPlus, FaMinus, 
  FaTrash, FaMoneyBillWave, FaUserTie, FaShieldAlt, FaCheck,
  FaHeart, FaStar, FaHeadset, FaPaperPlane
} from 'react-icons/fa';
import { IoRocketSharp, IoAirplane } from 'react-icons/io5';
import { GiAirplaneDeparture } from 'react-icons/gi';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
    opacity: 1
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
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

// Cabin class details
const cabinDetails = [
  {
    type: 'ECONOMY',
    name: 'Economy Class',
    priceRange: '₹3,000 - ₹15,000',
    airlines: 'All Airlines',
    features: [
      'Standard legroom',
      'Complimentary meals',
      'Personal entertainment',
      'Free carry-on baggage'
    ],
    color: 'border-blue-200',
    image: 'https://www.airlinereporter.com/wp-content/uploads/2016/04/24965055383_a7596eb128_b-754x503.jpg'
  },
  {
    type: 'PREMIUM_ECONOMY',
    name: 'Premium Economy',
    priceRange: '₹15,000 - ₹30,000',
    airlines: 'International Airlines',
    features: [
      'Extra legroom',
      'Priority boarding',
      'Enhanced meal options',
      'Larger baggage allowance'
    ],
    color: 'border-purple-200',
    image: "https://media.cnn.com/api/v1/images/stellar/prod/210212140952-premium-economy-emirates-cabin-ppe.jpg?q=w_1600,h_900,x_0,y_0,c_fill"
  },
  {
    type: 'BUSINESS',
    name: 'Business Class',
    priceRange: '₹30,000 - ₹80,000',
    airlines: 'All Major Airlines',
    features: [
      'Lie-flat seats',
      'Premium dining',
      'Airport lounge access',
      'Priority check-in'
    ],
    color: 'border-green-200',
    image: "https://www.skyclub.com/wp-content/uploads/2017/09/How-to-get-cheaper-business-class-flight.jpg"
  },
  {
    type: 'FIRST',
    name: 'First Class',
    priceRange: '₹80,000+',
    airlines: 'Premium Airlines',
    features: [
      'Private suites',
      'Gourmet meals',
      'Personalized service',
      'Exclusive amenities'
    ],
    color: 'border-yellow-200',
    image: "https://www.iflyfirstclass.com/public/images/61dddacb74e45.jpg"
  }
];

// Flight amenities
const flightAmenities = [
  {
    name: 'Wi-Fi',
    icon: <IoAirplane className="text-2xl sm:text-3xl text-blue-500" />,
    color: 'hover:border-blue-200'
  },
  {
    name: 'Entertainment',
    icon: <FaMoneyBillWave className="text-2xl sm:text-3xl text-purple-500" />,
    color: 'hover:border-purple-200'
  },
  {
    name: 'Meals',
    icon: <FaUserTie className="text-2xl sm:text-3xl text-green-500" />,
    color: 'hover:border-green-200'
  },
  {
    name: 'Lounge',
    icon: <FaShieldAlt className="text-2xl sm:text-3xl text-yellow-500" />,
    color: 'hover:border-yellow-200'
  },
  {
    name: 'Priority',
    icon: <GiAirplaneDeparture className="text-2xl sm:text-3xl text-red-500" />,
    color: 'hover:border-red-200'
  },
  {
    name: 'Extra Baggage',
    icon: <FaCheck className="text-2xl sm:text-3xl text-indigo-500" />,
    color: 'hover:border-indigo-200'
  }
];

// Features for carousel
const features = [
  {
    title: 'Best Price Guarantee',
    description: 'We guarantee the lowest prices for your flights',
    icon: <FaMoneyBillWave className="text-2xl sm:text-3xl text-white" />,
    color: 'from-blue-500 to-blue-600',
    index: 0
  },
  {
    title: '24/7 Customer Support',
    description: 'Our team is always available to assist you',
    icon: <FaUserTie className="text-2xl sm:text-3xl text-white" />,
    color: 'from-purple-500 to-purple-600',
    index: 1
  },
  {
    title: 'Easy Cancellation',
    description: 'Flexible cancellation and rescheduling options',
    icon: <FaShieldAlt className="text-2xl sm:text-3xl text-white" />,
    color: 'from-green-500 to-green-600',
    index: 2
  }
];

const Flights = () => {
  // State for flight search
  const [tripType, setTripType] = useState('ONE_WAY');
  const [origin, setOrigin] = useState('DEL');
  const [destination, setDestination] = useState('BOM');
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date(new Date().setDate(new Date().getDate() + 7)));
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [cabinClass, setCabinClass] = useState('ECONOMY');
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
  const [showClassDropdown, setShowClassDropdown] = useState(false);
  const [selectedFare, setSelectedFare] = useState('REGULAR');
  const [activeFeature, setActiveFeature] = useState(0);

  // State for flight results
  const [flights, setFlights] = useState([]);
  const [loadingFlights, setLoadingFlights] = useState(false);
  const [flightError, setFlightError] = useState('');
  const [apiError, setApiError] = useState('');
  const [showFlightResults, setShowFlightResults] = useState(false);
  const [searchExecuted, setSearchExecuted] = useState(false);

  // State for multi-city trips
  const [multiCityTrips, setMultiCityTrips] = useState([
    { origin: 'DEL', destination: 'BOM', departureDate: new Date() }
  ]);

  // Airport data
  const airports = [
    { code: 'DEL', name: 'Delhi - Indira Gandhi International Airport', city: 'Delhi' },
    { code: 'BOM', name: 'Mumbai - Chhatrapati Shivaji International Airport', city: 'Mumbai' },
    { code: 'BLR', name: 'Bengaluru - Kempegowda International Airport', city: 'Bengaluru' },
    { code: 'HYD', name: 'Hyderabad - Rajiv Gandhi International Airport', city: 'Hyderabad' },
    { code: 'MAA', name: 'Chennai - Chennai International Airport', city: 'Chennai' },
    { code: 'CCU', name: 'Kolkata - Netaji Subhash Chandra Bose International Airport', city: 'Kolkata' },
    { code: 'GOI', name: 'Goa - Dabolim Airport', city: 'Goa' },
    { code: 'DXB', name: 'Dubai International Airport', city: 'Dubai' },
    { code: 'LHR', name: 'London Heathrow Airport', city: 'London' },
    { code: 'JFK', name: 'New York - John F. Kennedy International Airport', city: 'New York' }
  ];

  const cabinClasses = [
    { code: 'ECONOMY', name: 'Economy' },
    { code: 'PREMIUM_ECONOMY', name: 'Premium Economy' },
    { code: 'BUSINESS', name: 'Business' },
    { code: 'FIRST', name: 'First Class' }
  ];

  const fareTypes = [
    { code: 'REGULAR', name: 'Regular', description: 'Standard fares with no restrictions', icon: <FaMoneyBillWave /> },
    { code: 'STUDENT', name: 'Student', description: 'Extra discounts for students', icon: <FaUserTie /> },
    { code: 'SENIOR_CITIZEN', name: 'Senior Citizen', description: 'Special senior discounts', icon: <FaShieldAlt /> },
    { code: 'MILITARY', name: 'Military', description: 'Discounts for armed forces', icon: <FaCheck /> }
  ];

  // Format date for API (YYYY-MM-DD)
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Format price for display
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Handle flight search - UPDATED TO USE POST REQUEST
  const handleSearchFlights = async () => {
    setLoadingFlights(true);
    setFlightError('');
    setApiError('');
    setSearchExecuted(true);
    setShowFlightResults(false);

    try {
      // Prepare request data
      const requestData = {
        origin,
        destination,
        departureDate: formatDate(departureDate),
        adults,
        children,
        infants,
        cabinClass,
        tripType
      };

      if (tripType === 'ROUND_TRIP') {
        requestData.returnDate = formatDate(returnDate);
      }

      // Get token from localStorage or use a default one for demo
      const token = localStorage.getItem('token') || 'demo-token-12345';

      // Call backend API with POST request and JSON body
      const response = await axios.post('/api/flights/search', requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setFlights(response.data.flights);
      setShowFlightResults(true);
    } catch (error) {
      console.error('Flight search error:', error);
      setFlightError('Failed to fetch flights');
      setApiError(error.response?.data?.error || error.message);
      
      // For demo purposes, show mock data if API fails
      if (error.response?.status === 401 || error.response?.status === 400) {
        setFlights(generateMockFlights());
        setShowFlightResults(true);
      }
    } finally {
      setLoadingFlights(false);
    }
  };

  // Generate mock flights for demo purposes
  const generateMockFlights = () => {
    const airlines = [
      { code: 'AI', name: 'Air India', price: 4500 },
      { code: '6E', name: 'IndiGo', price: 5200 },
      { code: 'UK', name: 'Vistara', price: 6800 },
      { code: 'SG', name: 'SpiceJet', price: 4100 },
      { code: 'G8', name: 'GoAir', price: 3900 }
    ];
    
    const times = [
      { departure: '06:30', arrival: '08:45', duration: '2h 15m' },
      { departure: '09:15', arrival: '11:30', duration: '2h 15m' },
      { departure: '12:00', arrival: '14:15', duration: '2h 15m' },
      { departure: '15:45', arrival: '18:00', duration: '2h 15m' },
      { departure: '18:30', arrival: '20:45', duration: '2h 15m' },
      { departure: '21:15', arrival: '23:30', duration: '2h 15m' }
    ];
    
    return airlines.map((airline, index) => {
      const time = times[index % times.length];
      const basePrice = airline.price * (cabinClass === 'ECONOMY' ? 1 : 
                        cabinClass === 'PREMIUM_ECONOMY' ? 1.5 : 
                        cabinClass === 'BUSINESS' ? 2.5 : 4);
      
      return {
        id: index + 1,
        airline: airline.name,
        airlineCode: airline.code,
        flightNumber: `${airline.code}${index + 1}${index + 5}`,
        origin: origin,
        destination: destination,
        departureTime: time.departure,
        arrivalTime: time.arrival,
        duration: time.duration,
        price: basePrice * (adults + children * 0.8 + infants * 0.2),
        stops: index % 3 === 0 ? 0 : 1,
        aircraft: index % 2 === 0 ? 'Boeing 737' : 'Airbus A320'
      };
    });
  };

  // Multi-city trip handlers
  const addTripSegment = () => {
    if (multiCityTrips.length >= 6) return;
    setMultiCityTrips([
      ...multiCityTrips,
      {
        origin: 'DEL',
        destination: 'BOM',
        departureDate: new Date(new Date().setDate(multiCityTrips[multiCityTrips.length - 1].departureDate.getDate() + 1))
      }
    ]);
  };

  const removeTripSegment = (index) => {
    if (multiCityTrips.length <= 1) return;
    const newTrips = [...multiCityTrips];
    newTrips.splice(index, 1);
    setMultiCityTrips(newTrips);
  };

  const updateTripSegment = (index, field, value) => {
    const newTrips = [...multiCityTrips];
    newTrips[index] = { ...newTrips[index], [field]: value };
    setMultiCityTrips(newTrips);
  };

  // Passenger count handlers
  const handlePassengerCountChange = (type, value) => {
    if (type === 'adults') {
      setAdults(Math.max(1, Math.min(10, value)));
    } else if (type === 'children') {
      setChildren(Math.max(0, Math.min(10, value)));
    } else if (type === 'infants') {
      setInfants(Math.max(0, Math.min(10, value)));
    }
  };

  // Swap origin and destination
  const handleSwapCities = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  // Flight Results Component
  const FlightResults = () => {
    if (loadingFlights) {
      return (
        <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-4 text-gray-600">Searching for flights...</span>
          </div>
        </div>
      );
    }

    if (flightError && !flights.length) {
      return (
        <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
          <div className="text-center py-8">
            <div className="text-red-500 text-xl font-bold mb-2">Error</div>
            <div className="text-gray-600 mb-4">{flightError}</div>
            {apiError && <div className="text-sm text-gray-500">{apiError}</div>}
          </div>
        </div>
      );
    }

    if (!flights.length && searchExecuted) {
      return (
        <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
          <div className="text-center py-8">
            <div className="text-gray-500 text-xl font-bold mb-2">No flights found</div>
            <div className="text-gray-600">Try adjusting your search criteria</div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
          Flight Results ({flights.length} found)
        </h2>
        
        <div className="space-y-4">
          {flights.map((flight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div className="flex items-center mb-3 sm:mb-0">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3 sm:mr-4">
                    <FaPlane className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{flight.airline}</h3>
                    <p className="text-gray-600 text-sm">{flight.flightNumber} • {flight.aircraft}</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 text-blue-700 font-bold py-1 px-3 rounded-lg text-sm">
                  {formatPrice(flight.price)}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                <div className="text-center sm:text-left mb-3 sm:mb-0">
                  <div className="text-2xl font-bold">{flight.departureTime}</div>
                  <div className="text-gray-600 text-sm">{flight.origin}</div>
                </div>
                
                <div className="text-center mb-3 sm:mb-0">
                  <div className="text-gray-500 text-sm">{flight.duration}</div>
                  <div className="flex items-center">
                    <div className="h-px bg-gray-300 w-16 sm:w-24"></div>
                    <FaPlane className="text-gray-400 mx-2" />
                    <div className="h-px bg-gray-300 w-16 sm:w-24"></div>
                  </div>
                  <div className="text-gray-500 text-xs">
                    {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                  </div>
                </div>
                
                <div className="text-center sm:text-right">
                  <div className="text-2xl font-bold">{flight.arrivalTime}</div>
                  <div className="text-gray-600 text-sm">{flight.destination}</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  {cabinClasses.find(c => c.code === cabinClass)?.name}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 sm:px-6 rounded-lg transition-colors"
                >
                  Select Flight
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Search Section */}
      <div className="bg-white shadow-2xl p-4 sm:p-6 md:p-8 mb-8 sm:mb-12 rounded-xl">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center">
            <FaPlane className="text-blue-500 mr-2 sm:mr-3" />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Find Your Perfect Flight
            </span>
          </h2>
        </div>
        
        {/* Trip Type Tabs */}
        <div className="flex border-b-2 border-gray-200 mb-6 sm:mb-8">
          {['ONE_WAY', 'ROUND_TRIP', 'MULTI_CITY'].map((type) => (
            <button
              key={type}
              className={`pb-3 px-3 sm:px-4 font-medium text-sm sm:text-base md:text-lg whitespace-nowrap relative ${
                tripType === type ? 'text-blue-600' : 'text-gray-500 hover:text-blue-500'
              }`}
              onClick={() => setTripType(type)}
            >
              {type === 'ONE_WAY' ? 'One Way' : type === 'ROUND_TRIP' ? 'Round Trip' : 'Multi City'}
              {tripType === type && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />
              )}
            </button>
          ))}
        </div>

        {/* Search Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6">
          {/* From City */}
          <div className="bg-gray-50 p-3 sm:p-4  border border-gray-200">
            <label className="block text-xs sm:text-sm font-bold text-blue-600 mb-1 sm:mb-2">
              <FaMapMarkerAlt className="text-blue-400 mr-1 sm:mr-2 inline" />
              FROM
            </label>
            <select 
              className="w-full outline-none font-bold text-gray-900 bg-transparent text-sm sm:text-base"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            >
              {airports.map(airport => (
                <option key={airport.code} value={airport.code}>
                  {airport.city} ({airport.code})
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="flex items-center justify-center">
            <button 
              onClick={handleSwapCities}
              className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors shadow-md border border-gray-200"
              aria-label="Swap cities"
            >
              <FaExchangeAlt className="text-blue-500" />
            </button>
          </div>

          {/* To City */}
          <div className="bg-gray-50 p-3 sm:p-4  border border-gray-200">
            <label className="block text-xs sm:text-sm font-bold text-blue-600 mb-1 sm:mb-2">
              <FaMapMarkerAlt className="text-blue-400 mr-1 sm:mr-2 inline" />
              TO
            </label>
            <select 
              className="w-full outline-none font-bold text-gray-900 bg-transparent text-sm sm:text-base"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              {airports.map(airport => (
                <option key={airport.code} value={airport.code}>
                  {airport.city} ({airport.code})
                </option>
              ))}
            </select>
          </div>

          {/* Departure Date */}
          <div className="bg-gray-50 p-3 sm:p-4  border border-gray-200">
            <label className="block text-xs sm:text-sm font-bold text-blue-600 mb-1 sm:mb-2">
              <FaCalendarAlt className="text-blue-400 mr-1 sm:mr-2 inline" />
              DEPARTURE DATE
            </label>
            <DatePicker
              selected={departureDate}
              onChange={(date) => setDepartureDate(date)}
              minDate={new Date()}
              dateFormat="d MMM yyyy"
              className="w-full outline-none font-bold text-gray-900 bg-transparent text-sm sm:text-base cursor-pointer"
            />
          </div>

          {/* Return Date */}
          {tripType === 'ROUND_TRIP' && (
            <div className="bg-gray-50 p-3 sm:p-4  border border-gray-200">
              <label className="block text-xs sm:text-sm font-bold text-blue-600 mb-1 sm:mb-2">
                <FaCalendarAlt className="text-blue-400 mr-1 sm:mr-2 inline" />
                RETURN DATE
              </label>
              <DatePicker
                selected={returnDate}
                onChange={(date) => setReturnDate(date)}
                minDate={departureDate}
                dateFormat="d MMM yyyy"
                className="w-full outline-none font-bold text-gray-900 bg-transparent text-sm sm:text-base cursor-pointer"
              />
            </div>
          )}

          {/* Travelers & Class */}
          <div className="bg-gray-50 p-3 sm:p-4  border border-gray-200">
            <label className="block text-xs sm:text-sm font-bold text-blue-600 mb-1 sm:mb-2">
              TRAVELERS & CLASS
            </label>
            <div className="relative">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
              >
                <div className="flex items-center">
                  <FaUser className="text-blue-400 mr-2" />
                  <span className="font-bold text-gray-900">
                    {adults + children + infants} {adults + children + infants === 1 ? 'Traveller' : 'Travellers'}
                  </span>
                </div>
                {showPassengerDropdown ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              <div 
                className="text-sm text-gray-700 mt-1 flex items-center justify-between cursor-pointer"
                onClick={() => setShowClassDropdown(!showClassDropdown)}
              >
                <span>{cabinClasses.find(c => c.code === cabinClass)?.name || cabinClass}</span>
                {showClassDropdown ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              {/* Passenger Dropdown */}
              {showPassengerDropdown && (
                <div className="absolute z-10 mt-2 w-full bg-white  shadow-lg border border-gray-200 p-3">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-700">Adults</div>
                        <div className="text-xs text-gray-500">12+ years</div>
                      </div>
                      <div className="flex items-center">
                        <button 
                          onClick={() => handlePassengerCountChange('adults', adults - 1)}
                          disabled={adults <= 1}
                          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                        >
                          <FaMinus />
                        </button>
                        <span className="mx-3 font-medium">{adults}</span>
                        <button 
                          onClick={() => handlePassengerCountChange('adults', adults + 1)}
                          disabled={adults >= 10}
                          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-700">Children</div>
                        <div className="text-xs text-gray-500">2-11 years</div>
                      </div>
                      <div className="flex items-center">
                        <button 
                          onClick={() => handlePassengerCountChange('children', children - 1)}
                          disabled={children <= 0}
                          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                        >
                          <FaMinus />
                        </button>
                        <span className="mx-3 font-medium">{children}</span>
                        <button 
                          onClick={() => handlePassengerCountChange('children', children + 1)}
                          disabled={children >= 10}
                          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-700">Infants</div>
                        <div className="text-xs text-gray-500">Under 2 years</div>
                      </div>
                      <div className="flex items-center">
                        <button 
                          onClick={() => handlePassengerCountChange('infants', infants - 1)}
                          disabled={infants <= 0}
                          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                        >
                          <FaMinus />
                        </button>
                        <span className="mx-3 font-medium">{infants}</span>
                        <button 
                          onClick={() => handlePassengerCountChange('infants', infants + 1)}
                          disabled={infants >= 10 || infants >= adults}
                          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowPassengerDropdown(false)}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors mt-4"
                  >
                    Done
                  </button>
                </div>
              )}

              {/* Class Dropdown */}
              {showClassDropdown && (
                <div className="absolute z-10 mt-2 w-full bg-white  shadow-lg border border-gray-200 p-3">
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {cabinClasses.map((type) => (
                      <div 
                        key={type.code}
                        className={`p-3 rounded-lg cursor-pointer flex items-center ${cabinClass === type.code ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                        onClick={() => {
                          setCabinClass(type.code);
                          setShowClassDropdown(false);
                        }}
                      >
                        <span>{type.name}</span>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => setShowClassDropdown(false)}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors mt-3"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Multi-City Trip Segments */}
        {tripType === 'MULTI_CITY' && (
          <div className="mt-4 space-y-4">
            {multiCityTrips.map((trip, index) => (
              <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <div className="flex items-center space-x-4">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  <h3 className="font-medium text-gray-700">Flight Segment</h3>
                  {multiCityTrips.length > 1 && (
                    <button 
                      onClick={() => removeTripSegment(index)}
                      className="ml-auto text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
                
                <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <label className="block text-xs font-bold text-blue-600 mb-1">
                      FROM
                    </label>
                    <select 
                      className="w-full outline-none font-bold text-gray-900 bg-transparent text-sm"
                      value={trip.origin}
                      onChange={(e) => updateTripSegment(index, 'origin', e.target.value)}
                    >
                      {airports.map(airport => (
                        <option key={airport.code} value={airport.code}>
                          {airport.city} ({airport.code})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <label className="block text-xs font-bold text-blue-600 mb-1">
                      TO
                    </label>
                    <select 
                      className="w-full outline-none font-bold text-gray-900 bg-transparent text-sm"
                      value={trip.destination}
                      onChange={(e) => updateTripSegment(index, 'destination', e.target.value)}
                    >
                      {airports.map(airport => (
                        <option key={airport.code} value={airport.code}>
                          {airport.city} ({airport.code})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <label className="block text-xs font-bold text-blue-600 mb-1">
                      DATE
                    </label>
                    <DatePicker
                      selected={trip.departureDate}
                      onChange={(date) => updateTripSegment(index, 'departureDate', date)}
                      minDate={index === 0 ? new Date() : multiCityTrips[index - 1].departureDate}
                      dateFormat="d MMM yyyy"
                      className="w-full outline-none font-bold text-gray-900 bg-transparent text-sm cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <button
              onClick={addTripSegment}
              disabled={multiCityTrips.length >= 6}
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaPlus className="mr-2" />
              Add Another Flight
            </button>
          </div>
        )}

        {/* Special Fare Options */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-6 mt-4 sm:mt-6"
        >
          {fareTypes.map((fare, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`border-2 rounded-xl p-3 sm:p-4 transition-all cursor-pointer flex items-start ${
                selectedFare === fare.code ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
              }`}
              whileHover={{ y: -3 }}
              onClick={() => setSelectedFare(fare.code)}
            >
              <div className={`p-2 rounded-full mr-3 ${selectedFare === fare.code ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                {fare.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{fare.name}</h3>
                <p className="text-gray-600 text-sm">{fare.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Search Button */}
        <motion.div 
          className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button 
            className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center text-sm sm:text-base md:text-lg relative overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSearchFlights}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            <span className="relative z-10 flex items-center">
              <FaSearch className="mr-2 sm:mr-3" />
              SEARCH FLIGHTS
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
      </div>

      {/* Flight Results Section */}
      {showFlightResults && <FlightResults />}

      {/* Cabin Class Details Section */}
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
          Our <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Cabin Classes</span>
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {cabinDetails.map((cabin, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden border-2 ${cabin.color}`}
              whileHover={{ y: -10 }}
            >
              <div className="h-48 sm:h-56 overflow-hidden relative">
                <img 
                  src={cabin.image} 
                  alt={cabin.type} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{cabin.name}</h3>
                  <p className="text-white/90 text-sm">{cabin.priceRange}</p>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <div className="mb-4">
                  <div className="flex items-center text-gray-600 mb-1">
                    <FaPlane className="mr-2 text-blue-500" />
                    <span className="font-medium">{cabin.airlines}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-bold text-gray-700 mb-2">Features:</h4>
                  <ul className="space-y-2">
                    {cabin.features.map((feature, i) => (
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
                >
                  Book {cabin.name}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Flight Amenities */}
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
          Flight <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Amenities</span>
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {flightAmenities.map((amenity, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 text-center ${amenity.color}`}
              whileHover={{ y: -5 }}
            >
              <div className="bg-white p-3 sm:p-4 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                {amenity.icon}
              </div>
              <h3 className="font-bold text-sm sm:text-base">{amenity.name}</h3>
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
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)'
        }}
      >
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
            <span className="text-xs sm:text-sm font-bold text-white drop-shadow-md">TRENDING NOW</span>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-8 sm:mb-10 lg:mb-0">
              <motion.h1 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
                style={{
                  background: 'linear-gradient(to right, #fde047, #f97316)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                Discover the World with Ease
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
                Find the perfect flight for your next adventure with our exclusive deals and personalized service
              </motion.p>
              
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap gap-3 sm:gap-4"
              >
                {[
                  { 
                    icon: <IoRocketSharp className="mr-2 text-xl sm:text-2xl animate-bounce" style={{ color: '#fde047' }} />, 
                    text: "Best Prices",
                    bg: "bg-gradient-to-r from-yellow-400 to-yellow-500"
                  },
                  { 
                    icon: <FaUserTie className="mr-2 text-xl sm:text-2xl" style={{ color: '#a5b4fc' }} />, 
                    text: "Expert Support",
                    bg: "bg-gradient-to-r from-indigo-400 to-indigo-500"
                  },
                  { 
                    icon: <FaStar className="mr-2 text-xl sm:text-2xl" style={{ color: '#f472b6' }} />, 
                    text: "Exclusive Deals",
                    bg: "bg-gradient-to-r from-pink-400 to-pink-500"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className={`flex items-center ${item.bg} px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer group`}
                    whileHover={{ y: -5, scale: 1.05 }}
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
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">Why Choose Us?</h3>
                
                <div className="space-y-4 sm:space-y-6">
                  {[
                    {
                      icon: <FaPlane className="text-lg sm:text-xl" style={{ color: '#93c5fd' }} />,
                      title: "500+ Airlines",
                      description: "Access to flights from all major airlines worldwide",
                      color: "text-blue-300"
                    },
                    {
                      icon: <FaUserTie className="text-lg sm:text-xl" style={{ color: '#c4b5fd' }} />,
                      title: "Best Price Guarantee",
                      description: "We guarantee the best prices for your flights",
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
                  className="w-full bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold py-3 sm:py-4 px-6 rounded-xl mt-6 sm:mt-8 shadow-lg hover:shadow-xl transition-all"
                  style={{
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.3)'
                  }}
                >
                  <FaPaperPlane className="mr-2 sm:mr-3" />
                  <span className="text-sm sm:text-base">Search Your Flight</span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

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
                    className={`absolute inset-0 p-4 sm:p-6 flex items-center rounded-xl bg-gradient-to-r ${feature.color} bg-clip-border`}
                  >
                    <div className="flex items-start">
                      <div className="p-3 sm:p-4 bg-white/30 backdrop-blur-sm rounded-xl shadow-sm mr-4 sm:mr-6">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{feature.title}</h3>
                        <p className="text-white/90 text-sm sm:text-base">{feature.description}</p>
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
    </div>
  );
};

export default Flights;