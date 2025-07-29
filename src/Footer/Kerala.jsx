import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
  FaStar, FaHeart, FaUmbrellaBeach, FaCamera, 
  FaChevronDown, FaPhoneAlt, FaEnvelope, 
  FaUser, FaUsers, FaCommentAlt, FaExclamationCircle, 
  FaPaperPlane, FaMapMarkerAlt, FaQuoteLeft,
  FaCalendarAlt, FaImages, FaArrowLeft, FaArrowRight
} from 'react-icons/fa';
import { GiBoatFishing, GiPalmTree, GiElephant, GiWaterfall, GiWaveSurfer } from 'react-icons/gi';
import { RiHotelFill, RiPlantFill, RiSailboatLine } from 'react-icons/ri';
import { MdOutlineLocalBar, MdOutlineRestaurant } from 'react-icons/md';

const Kerala = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedPackage, setExpandedPackage] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  
  const form = useRef();

  const galleryImages = [
    "/images/kerla.jpeg",
    "/images/karela2.jpeg",
    "/images/Karela3.jpeg",
    "/images/Kerla4.jpeg",
    "/images/Kerla5.jpeg",
    "/images/Kerla6.jpeg"
  ];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };

  const openGallery = (index) => {
    setCurrentImageIndex(index);
    setShowGallery(true);
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    setShowGallery(false);
    document.body.style.overflow = 'auto';
  };

  const packages = [
    {
      id: 1,
      title: "Backwater Houseboat Cruise",
      duration: "3 Days / 2 Nights",
      price: "₹18,999",
      rating: 4.9,
      image: galleryImages[0],
      type: "backwater",
      highlights: [
        "Private houseboat with crew",
        "Traditional Kerala meals onboard",
        "Village visits along the backwaters",
        "Sunset canoe ride",
        "Bird watching excursions"
      ],
      icon: <GiBoatFishing className="text-2xl text-blue-600" />
    },
    {
      id: 2,
      title: "Ayurvedic Wellness Retreat",
      duration: "7 Days / 6 Nights",
      price: "₹32,999",
      rating: 4.8,
      image: galleryImages[1],
      type: "wellness",
      highlights: [
        "Daily Ayurvedic treatments",
        "Yoga and meditation sessions",
        "Organic vegetarian meals",
        "Doctor consultation",
        "Herbal garden tour"
      ],
      icon: <RiPlantFill className="text-2xl text-green-600" />
    },
    {
      id: 3,
      title: "Munnar Tea Estate Stay",
      duration: "4 Days / 3 Nights",
      price: "₹22,999",
      rating: 4.7,
      image: galleryImages[2],
      type: "hillstation",
      highlights: [
        "Stay in colonial tea estate bungalow",
        "Tea plantation walking tour",
        "Visit to Eravikulam National Park",
        "Sunrise at Top Station",
        "Tea tasting session"
      ],
      icon: <RiHotelFill className="text-2xl text-emerald-500" />
    },
    {
      id: 4,
      title: "Wildlife Safari Adventure",
      duration: "5 Days / 4 Nights",
      price: "₹28,999",
      rating: 4.6,
      image: galleryImages[3],
      type: "wildlife",
      highlights: [
        "Periyar Tiger Reserve boat safari",
        "Jungle night patrol experience",
        "Elephant ride through forests",
        "Spice plantation visit",
        "Bamboo rafting"
      ],
      icon: <GiElephant className="text-2xl text-amber-600" />
    },
    {
      id: 5,
      title: "Kerala Cultural Journey",
      duration: "8 Days / 7 Nights",
      price: "₹35,999",
      rating: 4.8,
      image: galleryImages[4],
      type: "cultural",
      highlights: [
        "Kathakali dance performance",
        "Traditional Kalaripayattu martial arts show",
        "Cooking class with local family",
        "Temple architecture tour",
        "Coir-making demonstration"
      ],
      icon: <FaCamera className="text-2xl text-purple-500" />
    },
    {
      id: 6,
      title: "Beach & Backwater Combo",
      duration: "6 Days / 5 Nights",
      price: "₹30,999",
      rating: 4.7,
      image: galleryImages[5],
      type: "combo",
      highlights: [
        "2 nights in beach resort",
        "2 nights in backwater houseboat",
        "Kayaking through palm-fringed canals",
        "Ayurvedic massage sessions",
        "Seafood cooking demonstration"
      ],
      icon: <FaUmbrellaBeach className="text-2xl text-teal-500" />
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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          className="absolute top-1/4 left-10 text-green-300 text-4xl"
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
              <div className="absolute -top-3 -right-3 bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                <GiBoatFishing />
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Book Your Kerala Experience</h3>
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
                      className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md"
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
                          <FaUser className="mr-2 text-green-500" /> Full Name*
                        </label>
                        <input
                          type="text"
                          name="user_name"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                          required
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label className="text-gray-700 mb-1 flex items-center">
                          <FaEnvelope className="mr-2 text-green-500" /> Email*
                        </label>
                        <input
                          type="email"
                          name="user_email"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                          required
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <label className="text-gray-700 mb-1 flex items-center">
                          <FaPhoneAlt className="mr-2 text-green-500" /> Phone Number*
                        </label>
                        <input
                          type="tel"
                          name="user_phone"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                          required
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <label className="text-gray-700 mb-1 flex items-center">
                          <RiHotelFill className="mr-2 text-green-500" /> Package*
                        </label>
                        <select
                          name="package"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-all"
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
                            <FaCalendarAlt className="mr-2 text-green-500" /> Travel Date*
                          </label>
                          <input
                            type="date"
                            name="travel_date"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                            required
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 }}
                        >
                          <label className="text-gray-700 mb-1 flex items-center">
                            <FaUsers className="mr-2 text-green-500" /> Guests*
                          </label>
                          <select
                            name="guests"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
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
                          <FaCommentAlt className="mr-2 text-green-500" /> Special Requests
                        </label>
                        <textarea
                          name="message"
                          rows="3"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
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
                      className={`w-full mt-6 bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center ${
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
            src="/images/kerla.jpeg"
            alt="Kerala Backwaters" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/60 to-blue-900/50"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white text-sm font-semibold py-2 px-6 rounded-full mb-6 border border-white/30 shadow-lg">
              <GiBoatFishing className="mr-2 animate-pulse" /> GOD'S OWN COUNTRY
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 font-serif tracking-tight"
          >
            Kerala <span className="text-green-200">Backwaters</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-green-100 max-w-2xl mx-auto mb-8 font-medium"
          >
            Where emerald landscapes meet tranquil waters in India's tropical paradise
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
              className="bg-white text-green-600 px-8 py-4 rounded-full font-bold shadow-xl hover:bg-green-50 transition-all flex items-center group"
            >
              <span>Book Your Kerala Experience</span>
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
            className="text-green-200 text-5xl animate-pulse mt-8"
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

      {/* About Kerala Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6 relative">
              <span className="absolute -left-6 -top-2 text-green-400 text-4xl">•</span>
              Discover Kerala's Natural Wonders
            </h2>
            <p className="text-gray-600 mb-4 text-lg leading-relaxed">
              Kerala, known as "God's Own Country," is a tropical paradise of lush greenery, serene backwaters,
              and pristine beaches. This coastal state offers a perfect blend of nature, culture, and relaxation,
              with its unique network of lagoons, lakes and canals running inland from the coast.
            </p>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              From the tranquil backwaters of Alleppey to the misty hills of Munnar, from the wildlife sanctuaries
              to the golden beaches of Kovalam, Kerala promises an unforgettable experience for every traveler.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <GiBoatFishing className="text-green-500 text-2xl" />, text: "900km of backwaters", bg: "bg-green-50" },
                { icon: <RiPlantFill className="text-blue-500 text-2xl" />, text: "Ancient Ayurveda traditions", bg: "bg-blue-50" },
                { icon: <GiElephant className="text-amber-500 text-2xl" />, text: "Rich wildlife sanctuaries", bg: "bg-amber-50" },
                { icon: <MdOutlineRestaurant className="text-teal-500 text-2xl" />, text: "Authentic Kerala cuisine", bg: "bg-teal-50" }
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
                src="/images/kerla.jpeg" 
                alt="Kerala Backwaters" 
                className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            </div>
            <div className="absolute -bottom-5 -right-5 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center text-green-600">
                <FaMapMarkerAlt className="mr-2" />
                <span className="font-medium">Alleppey Backwaters</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Packages Section */}
      <div className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-b from-white to-green-50">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-800 mb-4 relative inline-block"
          >
            <span className="absolute -left-8 top-1/2 transform -translate-y-1/2 text-green-400">•</span>
            Curated Kerala Experiences
            <span className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-green-400">•</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Choose from our handpicked selection of Kerala packages tailored to different travel styles and preferences.
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
          {['all', 'backwater', 'wellness', 'hillstation', 'wildlife', 'cultural', 'combo'].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-3 rounded-full text-sm font-medium capitalize transition-all ${
                activeTab === tab 
                  ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'
              }`}
            >
              {tab === 'all' ? 'All Experiences' : tab.replace('-', ' ')}
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
                    isExpanded ? 'ring-2 ring-green-500' : ''
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
                        <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full font-bold">
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
                        <GiWaterfall className="mr-2" />
                        <span className="text-sm">{pkg.duration}</span>
                      </div>
                      <button
                        onClick={() => togglePackage(pkg.id)}
                        className="text-green-600 font-medium hover:text-green-700 transition-colors flex items-center text-sm"
                      >
                        {isExpanded ? 'Show Less' : 'View Details'} 
                        <FaChevronDown className={`ml-2 text-green-500 transition-transform ${
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
                          <div className="pt-4 border-t border-green-100">
                            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                              <GiPalmTree className="text-green-500 mr-2" /> Experience Highlights:
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
                                  <span className="text-green-500 mr-2">✓</span>
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
                      className="w-full mt-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center"
                    >
                      <FaCalendarAlt className="mr-2" /> Book This Experience
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
            <div className="text-green-500 text-6xl mb-4">
              <GiBoatFishing />
            </div>
            <h3 className="text-2xl font-medium text-gray-700 mb-2">No experiences found in this category</h3>
            <p className="text-gray-500 mb-6">Contact us to customize your perfect Kerala journey</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowBookingForm(true)}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-full font-medium hover:from-green-700 hover:to-blue-700 transition-all shadow-lg"
            >
              Plan Your Kerala Trip
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Gallery Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-gray-800 mb-12 relative"
          >
            <span className="absolute -left-8 top-1/2 transform -translate-y-1/2 text-green-400">•</span>
            Kerala Gallery
            <span className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-green-400">•</span>
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => openGallery(index)}
              >
                <img 
                  src={image} 
                  alt={`Kerala ${index + 1}`} 
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent flex items-end p-4">
                  <div className="text-white text-sm font-medium flex items-center">
                    <FaImages className="mr-2" /> View
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      <AnimatePresence>
        {showGallery && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative max-w-6xl w-full max-h-[90vh]"
            >
              <button 
                onClick={closeGallery}
                className="absolute top-4 right-4 text-white text-3xl z-10 hover:text-green-300 transition-colors"
              >
                &times;
              </button>
              
              <button 
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-10 hover:text-green-300 transition-colors bg-black/30 p-2 rounded-full"
              >
                <FaArrowLeft />
              </button>
              
              <button 
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-10 hover:text-green-300 transition-colors bg-black/30 p-2 rounded-full"
              >
                <FaArrowRight />
              </button>
              
              <motion.img
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={galleryImages[currentImageIndex]}
                alt={`Kerala gallery ${currentImageIndex + 1}`}
                className="w-full h-full object-contain max-h-[80vh]"
              />
              
              <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm">
                Image {currentImageIndex + 1} of {galleryImages.length}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Why Choose Us Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-gray-800 mb-12 relative"
          >
            <span className="absolute -left-8 top-1/2 transform -translate-y-1/2 text-green-400">•</span>
            Why Choose Our Kerala Experiences
            <span className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-green-400">•</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Backwater Experts",
                description: "Deep knowledge of Kerala's intricate waterways and villages",
                icon: "🚤",
                color: "from-green-100 to-green-50",
                delay: 0.1
              },
              {
                title: "Authentic Ayurveda",
                description: "Genuine treatments from certified practitioners",
                icon: "🌿",
                color: "from-blue-100 to-blue-50",
                delay: 0.2
              },
              {
                title: "Eco-Conscious",
                description: "Sustainable tourism that supports local communities",
                icon: "🌎",
                color: "from-teal-100 to-teal-50",
                delay: 0.3
              },
              {
                title: "Local Connections",
                description: "Exclusive access to authentic cultural experiences",
                icon: "🤝",
                color: "from-emerald-100 to-emerald-50",
                delay: 0.4
              },
              {
                title: "Safety First",
                description: "All activities conducted with certified guides and equipment",
                icon: "🛡️",
                color: "from-amber-100 to-amber-50",
                delay: 0.5
              },
              {
                title: "24/7 Support",
                description: "Dedicated concierge available throughout your trip",
                icon: "📱",
                color: "from-cyan-100 to-cyan-50",
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

      {/* CTA Section */}
      <div className="relative py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2089&q=80')] bg-cover bg-center"></div>
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
            Ready for Your Kerala Adventure?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl mb-8 text-green-100 max-w-2xl mx-auto"
          >
            Let our travel experts craft your perfect Kerala journey with personalized recommendations.
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
              className="bg-white text-green-600 px-8 py-4 rounded-full font-bold shadow-xl hover:bg-green-50 transition-all"
            >
              Book Your Package Now
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold shadow-xl hover:bg-white/10 transition-all"
            >
              <FaPhoneAlt className="inline mr-2" /> +91 9796337997            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Kerala;