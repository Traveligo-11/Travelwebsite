import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
  FaStar, FaHeart, FaUmbrellaBeach, FaCamera, 
  FaChevronDown, FaCocktail, FaWater, FaCalendarAlt,
  FaPhoneAlt, FaEnvelope, FaQuoteLeft, FaMapMarkerAlt,
  FaUser, FaUsers, FaCommentAlt, FaExclamationCircle, FaPaperPlane
} from 'react-icons/fa';
import { GiWaveSurfer, GiBoatFishing, GiIsland, GiPalmTree, GiSunglasses } from 'react-icons/gi';
import { RiHotelFill, RiSailboatLine } from 'react-icons/ri';
import { MdOutlinePool, MdOutlineLocalBar, MdOutlineRestaurant } from 'react-icons/md';

const Goa = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedPackage, setExpandedPackage] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const form = useRef();

  const packages = [
    {
      id: 1,
      title: "Beachfront Paradise",
      duration: "5 Days / 4 Nights",
      price: "₹24,999",
      rating: 4.8,
      image: "/images/Goa1.jpg",
      type: "beach",
      highlights: [
        "Private beach access",
        "Sunset cruise with cocktails",
        "Seafood dining experience",
        "Beachside massage sessions",
        "Water sports equipment included"
      ],
      icon: <FaUmbrellaBeach className="text-2xl text-blue-500" />
    },
    {
      id: 2,
      title: "Luxury Resort Escape",
      duration: "6 Days / 5 Nights",
      price: "₹42,999",
      rating: 4.9,
      image: "/images/Goa2.jpeg",
      type: "luxury",
      highlights: [
        "5-star beachfront resort",
        "Private pool villa",
        "Butler service",
        "Gourmet dining options",
        "Spa credit included"
      ],
      icon: <RiHotelFill className="text-2xl text-amber-500" />
    },
    {
      id: 3,
      title: "Adventure Seeker Package",
      duration: "4 Days / 3 Nights",
      price: "₹28,999",
      rating: 4.7,
      image:"/images/Goa3.jpg",
      type: "adventure",
      highlights: [
        "Scuba diving with certification",
        "Parasailing over the Arabian Sea",
        "Jet ski safari",
        "Dolphin spotting cruise",
        "Night kayaking experience"
      ],
      icon: <GiWaveSurfer className="text-2xl text-green-600" />
    },
    {
      id: 4,
      title: "Romantic Getaway",
      duration: "5 Days / 4 Nights",
      price: "₹38,999",
      rating: 4.9,
      image: "/images/Goa4.jpg",
      type: "honeymoon",
      highlights: [
        "Private candlelight beach dinner",
        "Couple's spa treatments",
        "Sunset catamaran cruise",
        "Romantic room decorations",
        "Personal photographer for a day"
      ],
      icon: <FaHeart className="text-2xl text-rose-500" />
    },
    {
      id: 5,
      title: "Cultural Exploration",
      duration: "7 Days / 6 Nights",
      price: "₹32,999",
      rating: 4.6,
      image: "/images/Goa5.jpeg",
      type: "cultural",
      highlights: [
        "Heritage walks in Old Goa",
        "Spice plantation tour",
        "Traditional Goan cooking class",
        "Local market shopping experience",
        "Portuguese-influenced architecture tour"
      ],
      icon: <FaCamera className="text-2xl text-purple-500" />
    },
    {
      id: 6,
      title: "Island Hopping Special",
      duration: "4 Days / 3 Nights",
      price: "₹27,999",
      rating: 4.7,
      image: "/images/Goa6.jpeg",
      type: "island",
      highlights: [
        "Grand Island boat tour",
        "Snorkeling at secret beaches",
        "Private island picnic",
        "Diving at shipwreck sites",
        "Secluded beach exploration"
      ],
      icon: <GiIsland className="text-2xl text-teal-500" />
    }
  ];

  const filteredPackages = activeTab === 'all' 
    ? packages 
    : packages.filter(pkg => pkg.type === activeTab);

  const togglePackage = (id) => {
    setExpandedPackage(expandedPackage === id ? null : id);
  };

  const handleBookNow = (packageTitle) => {
    setShowBookingForm(true);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    emailjs.sendForm(
            'service_ov629rm',
        'template_jr1dnto',
      form.current, 
      '37pN2ThzFwwhwk7ai'
    )
    .then((result) => {
        console.log(result.text);
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setShowBookingForm(false);
          form.current.reset();
        }, 3000);
    }, (error) => {
        console.log(error.text);
        setError('Failed to send booking request. Please try again.');
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-teal-50">
      {/* Floating Beach Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          className="absolute top-1/4 left-10 text-yellow-300 text-4xl"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <GiPalmTree />
        </motion.div>
        <motion.div 
          className="absolute top-1/3 right-20 text-blue-300 text-3xl"
          animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <RiSailboatLine />
        </motion.div>
        <motion.div 
          className="absolute bottom-1/4 left-1/4 text-amber-200 text-2xl"
          animate={{ y: [0, -8, 0], rotate: [0, 3, -3, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <GiSunglasses />
        </motion.div>
      </div>

      {/* Booking Form Modal */}
      <AnimatePresence>
        {showBookingForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto relative"
            >
              <div className="absolute -top-3 -right-3 bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                <FaUmbrellaBeach />
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Book Your Goa Escape</h3>
                  <button 
                    onClick={() => setShowBookingForm(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    &times;
                  </button>
                </div>
                
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="text-green-500 text-6xl mb-4"
                    >
                      ✓
                    </motion.div>
                    <h4 className="text-xl font-medium text-gray-800 mb-2">Booking Request Sent!</h4>
                    <p className="text-gray-600 mb-6">Our travel expert will contact you within 24 hours to confirm your package.</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowBookingForm(false)}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md"
                    >
                      Close
                    </motion.button>
                  </motion.div>
                ) : (
                  <form ref={form} onSubmit={sendEmail}>
                    <div className="space-y-4">
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <label className="text-gray-700 mb-1 flex items-center">
                          <FaUser className="mr-2 text-blue-500" /> Full Name*
                        </label>
                        <input
                          type="text"
                          name="user_name"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          required
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label className="text-gray-700 mb-1 flex items-center">
                          <FaEnvelope className="mr-2 text-blue-500" /> Email*
                        </label>
                        <input
                          type="email"
                          name="user_email"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          required
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <label className="text-gray-700 mb-1 flex items-center">
                          <FaPhoneAlt className="mr-2 text-blue-500" /> Phone Number*
                        </label>
                        <input
                          type="tel"
                          name="user_phone"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          required
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <label className="text-gray-700 mb-1 flex items-center">
                          <RiHotelFill className="mr-2 text-blue-500" /> Package*
                        </label>
                        <select
                          name="package"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all"
                          required
                        >
                          <option value="">Select a package</option>
                          {packages.map(pkg => (
                            <option key={pkg.id} value={pkg.title}>{pkg.title}</option>
                          ))}
                        </select>
                      </motion.div>

                      <div className="grid grid-cols-2 gap-4">
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <label className="text-gray-700 mb-1 flex items-center">
                            <FaCalendarAlt className="mr-2 text-blue-500" /> Travel Date*
                          </label>
                          <input
                            type="date"
                            name="travel_date"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            required
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 }}
                        >
                          <label className="text-gray-700 mb-1 flex items-center">
                            <FaUsers className="mr-2 text-blue-500" /> Guests*
                          </label>
                          <select
                            name="guests"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            required
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                              <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                            ))}
                          </select>
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <label className="text-gray-700 mb-1 flex items-center">
                          <FaCommentAlt className="mr-2 text-blue-500" /> Special Requests
                        </label>
                        <textarea
                          name="message"
                          rows="3"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        ></textarea>
                      </motion.div>
                    </div>

                    {error && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 text-red-500 text-sm flex items-center"
                      >
                        <FaExclamationCircle className="mr-2" /> {error}
                      </motion.div>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      disabled={isLoading}
                      className={`w-full mt-6 bg-gradient-to-r from-blue-600 to-teal-600 text-white py-4 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center ${
                        isLoading ? 'opacity-80 cursor-not-allowed' : ''
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="mr-2" /> Submit Booking Request
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="relative h-screen max-h-[800px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Goa Beach" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-teal-900/50"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white text-sm font-semibold py-2 px-6 rounded-full mb-6 border border-white/30 shadow-lg">
              <FaUmbrellaBeach className="mr-2 animate-pulse" /> SUN, SAND & SERENITY
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 font-serif tracking-tight"
          >
            <span className="text-blue-200">Goa</span> Beach Escapes
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-blue-100 max-w-2xl mx-auto mb-8 font-medium"
          >
            Where golden sands meet azure waters in India's beach paradise
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: 'spring' }}
          >
            <motion.button
              onClick={() => setShowBookingForm(true)}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold shadow-xl hover:bg-blue-50 transition-all flex items-center group"
            >
              <span>Book Your Beach Holiday</span>
              <motion.span 
                className="ml-2 inline-block group-hover:translate-x-1 transition-transform"
              >
                <FaChevronDown className="transform group-hover:rotate-90 transition-transform" />
              </motion.span>
            </motion.button>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: 'spring' }}
            className="text-blue-200 text-5xl animate-pulse mt-8"
          >
            <GiPalmTree />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="absolute bottom-12 left-0 right-0 flex justify-center"
          >
            <div className="animate-bounce text-white text-2xl">
              <FaChevronDown />
            </div>
          </motion.div>
        </div>
      </div>

      {/* About Goa Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6 relative">
              <span className="absolute -left-6 -top-2 text-blue-400 text-4xl">•</span>
              Discover Goa's Coastal Magic
            </h2>
            <p className="text-gray-600 mb-4 text-lg leading-relaxed">
              Goa, India's smallest state, is renowned for its spectacular coastline stretching over 100 kilometers along the Arabian Sea. 
              With its unique blend of Indian and Portuguese cultures, vibrant nightlife, and laid-back beach vibes, Goa offers an 
              unforgettable tropical escape.
            </p>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              From the popular beaches of Baga and Calangute to the serene shores of Palolem and Agonda, each beach has its own 
              distinct personality. Explore colonial architecture, indulge in fresh seafood, or simply relax under the palm trees 
              with a cocktail in hand.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <FaUmbrellaBeach className="text-blue-500 text-2xl" />, text: "100+ km of coastline", bg: "bg-blue-50" },
                { icon: <GiPalmTree className="text-green-500 text-2xl" />, text: "Year-round tropical weather", bg: "bg-green-50" },
                { icon: <MdOutlineLocalBar className="text-amber-500 text-2xl" />, text: "Vibrant nightlife", bg: "bg-amber-50" },
                { icon: <MdOutlineRestaurant className="text-teal-500 text-2xl" />, text: "Fresh seafood cuisine", bg: "bg-teal-50" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className={`flex items-center p-4 rounded-xl ${item.bg} shadow-sm border border-gray-100 transition-all`}
                >
                  <div className="mr-3 p-2 bg-white rounded-lg shadow-sm">{item.icon}</div>
                  <span className="text-gray-700 font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Goa Beach" 
                className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            </div>
            <div className="absolute -bottom-5 -right-5 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center text-blue-600">
                <FaMapMarkerAlt className="mr-2" />
                <span className="font-medium">North Goa & South Goa</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Packages Section */}
      <div className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-b from-white to-blue-50">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-800 mb-4 relative inline-block"
          >
            <span className="absolute -left-8 top-1/2 transform -translate-y-1/2 text-blue-400">•</span>
            Curated Goa Experiences
            <span className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-blue-400">•</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Choose from our handpicked selection of Goa packages tailored to different travel styles and preferences.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {['all', 'beach', 'luxury', 'adventure', 'honeymoon', 'cultural', 'island'].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-3 rounded-full text-sm font-medium capitalize transition-all ${
                activeTab === tab 
                  ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'
              }`}
            >
              {tab === 'all' ? 'All Packages' : tab.replace('-', ' ')}
            </motion.button>
          ))}
        </motion.div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredPackages.map((pkg) => {
            const isExpanded = expandedPackage === pkg.id;
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Package Card */}
                <motion.div 
                  className={`bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 ${
                    isExpanded ? 'ring-2 ring-blue-500' : ''
                  }`}
                  whileHover={{ y: -5 }}
                >
                  {/* Image with Floating Icon */}
                  <div className="relative h-60 overflow-hidden group">
                    <img 
                      src={pkg.image} 
                      alt={pkg.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-md transform group-hover:rotate-12 transition-transform">
                      {pkg.icon}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-white font-bold text-2xl drop-shadow-md">{pkg.title}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-bold">
                          {pkg.price}
                        </span>
                        <div className="flex items-center text-yellow-300 drop-shadow-md">
                          <FaStar className="mr-1" />
                          <span className="text-white font-medium">{pkg.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center text-gray-500">
                        <FaCalendarAlt className="mr-2" />
                        <span className="text-sm">{pkg.duration}</span>
                      </div>
                      <button
                        onClick={() => togglePackage(pkg.id)}
                        className="text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center text-sm"
                      >
                        {isExpanded ? 'Show Less' : 'View Details'} 
                        <FaChevronDown className={`ml-2 text-blue-500 transition-transform ${
                          isExpanded ? 'rotate-180' : ''
                        }`} />
                      </button>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 border-t border-blue-100">
                            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                              <FaUmbrellaBeach className="text-blue-500 mr-2" /> Package Highlights:
                            </h4>
                            <ul className="space-y-3 mb-4">
                              {pkg.highlights.map((highlight, index) => (
                                <motion.li 
                                  key={index} 
                                  className="flex items-start"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                >
                                  <span className="text-blue-500 mr-2">✓</span>
                                  <span className="text-gray-600">{highlight}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button 
                      whileHover={{ scale: 1.03, boxShadow: "0 5px 15px rgba(37, 99, 235, 0.3)" }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleBookNow(pkg.title)}
                      className="w-full mt-4 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center"
                    >
                      <FaCalendarAlt className="mr-2" /> Book This Package
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* No Packages Message */}
        {filteredPackages.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-blue-500 text-6xl mb-4">
              <FaUmbrellaBeach />
            </div>
            <h3 className="text-2xl font-medium text-gray-700 mb-2">No packages found in this category</h3>
            <p className="text-gray-500 mb-6">Contact us to customize your perfect Goa getaway</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowBookingForm(true)}
              className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-3 rounded-full font-medium hover:from-blue-700 hover:to-teal-700 transition-all shadow-lg"
            >
              Plan Your Beach Trip
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Why Choose Us Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-teal-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-gray-800 mb-12 relative"
          >
            <span className="absolute -left-8 top-1/2 transform -translate-y-1/2 text-blue-400">•</span>
            Why Choose Our Goa Packages
            <span className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-blue-400">•</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Beachfront Properties",
                description: "Exclusive access to the best beachfront accommodations in prime locations",
                icon: "🏖️",
                color: "from-blue-100 to-blue-50",
                delay: 0.1
              },
              {
                title: "Local Experts",
                description: "Our team knows every hidden beach, secret cove, and local gem",
                icon: "🧭",
                color: "from-amber-100 to-amber-50",
                delay: 0.2
              },
              {
                title: "Safety First",
                description: "All water activities conducted by certified instructors with top equipment",
                icon: "🛡️",
                color: "from-teal-100 to-teal-50",
                delay: 0.3
              },
              {
                title: "Best Value",
                description: "We negotiate directly with hotels to get you the best rates",
                icon: "💰",
                color: "from-green-100 to-green-50",
                delay: 0.4
              },
              {
                title: "24/7 Support",
                description: "Dedicated concierge available throughout your trip",
                icon: "📱",
                color: "from-purple-100 to-purple-50",
                delay: 0.5
              },
              {
                title: "Sustainable Travel",
                description: "We promote eco-friendly resorts and responsible tourism",
                icon: "🌱",
                color: "from-emerald-100 to-emerald-50",
                delay: 0.6
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: feature.delay }}
                viewport={{ once: true }}
                className={`bg-gradient-to-br ${feature.color} p-6 rounded-xl shadow-sm text-center border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1`}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-gray-800 mb-12 relative"
          >
            <span className="absolute -left-8 top-1/2 transform -translate-y-1/2 text-blue-400">•</span>
            Frequently Asked Questions
            <span className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-blue-400">•</span>
          </motion.h2>
          <div className="space-y-4">
            {[
              {
                question: "What's the best time to visit Goa?",
                answer: "The ideal time is from November to February when the weather is pleasant with temperatures between 21°C to 32°C. This is peak season with vibrant nightlife and events. March to May is hot but less crowded, while monsoon (June-September) offers lush greenery but many beach shacks close.",
                delay: 0.1
              },
              {
                question: "Are your packages customizable?",
                answer: "Absolutely! While our packages are carefully curated, we understand every traveler is unique. You can extend stays, upgrade accommodations, add activities, or mix elements from different packages. Contact our travel consultants to tailor your perfect Goa itinerary.",
                delay: 0.2
              },
              {
                question: "What's included in the package prices?",
                answer: "Our packages typically include accommodation, daily breakfast, airport transfers, and all activities specifically mentioned. Some include additional meals or spa credits. Flights are usually not included unless specified, giving you flexibility to use frequent flyer miles or preferred airlines.",
                delay: 0.3
              },
              {
                question: "Is Goa safe for solo female travelers?",
                answer: "Goa is generally safe for solo female travelers, especially in tourist areas. We recommend staying in reputable accommodations, avoiding isolated areas at night, and dressing modestly when visiting local villages. Our team can arrange female guides or group tours if preferred.",
                delay: 0.4
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: faq.delay }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all"
              >
                <h3 className="font-bold text-lg text-gray-800 mb-2 flex items-center">
                  <span className="text-blue-500 mr-2">•</span> {faq.question}
                </h3>
                <p className="text-gray-600 pl-6">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-teal-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80')] bg-cover bg-center"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-5xl mb-6"
          >
            <GiPalmTree className="inline-block animate-pulse" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6"
          >
            Ready for Your Goa Adventure?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto"
          >
            Let our travel experts craft your perfect beach getaway with personalized recommendations.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.button
              onClick={() => setShowBookingForm(true)}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold shadow-xl hover:bg-blue-50 transition-all"
            >
              Book Your Package Now
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold shadow-xl hover:bg-white/10 transition-all"
            >
              <FaPhoneAlt className="inline mr-2" /> Call Our Experts
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Goa;