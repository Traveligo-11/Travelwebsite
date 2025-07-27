import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaHeart, FaChevronDown, FaTimes, FaCamera, FaSpa, FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaUsers, FaChild, FaHotel, FaUtensils, FaWallet } from 'react-icons/fa';
import { GiWoodCabin, GiBoatFishing, GiFlowerPot, GiShoppingBag } from 'react-icons/gi';
import { MdFamilyRestroom, MdLocalDining, MdDirectionsBike } from 'react-icons/md';
import { IoLeaf } from 'react-icons/io5';
import { IoMdSnow } from 'react-icons/io';
import { BiHappyHeartEyes } from 'react-icons/bi';
import emailjs from 'emailjs-com';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Kashmir = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedPackage, setExpandedPackage] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    arrivalDate: '',
    departureDate: '',
    adults: 1,
    kids: '',
    kidsAges: '',
    hotelCategory: '3',
    mealsIncluded: 'yes',
    budget: '',
    package: '',
    message: ''
  });

  const packages = [
    {
      id: 1,
      title: "Kashmir Paradise Package",
      duration: "6 Days / 5 Nights",
      price: "₹24,999",
      rating: 4.9,
      image: "/images/Gulmarg1.jpeg",
      type: "popular",
      highlights: [
        "Stay in houseboat on Dal Lake",
        "Shikara ride with Kashmiri Kahwa",
        "Gulmarg gondola ride",
        "Pahalgam valley tour",
        "Shalimar Bagh visit",
        "Traditional Kashmiri dinner"
      ],
      icon: <GiBoatFishing className="text-2xl text-pink-500" />,
      pinkFeature: "Sunset Shikara ride with pink Kashmiri Kahwa"
    },
    {
      id: 2,
      title: "Honeymoon Special",
      duration: "7 Days / 6 Nights",
      price: "₹34,999",
      rating: 4.8,
      image: "/images/Honeymoon.jpg",
      type: "honeymoon",
      highlights: [
        "Romantic Shikara dinner",
        "Private cottage in Pahalgam",
        "Couple photoshoot in traditional attire",
        "Candlelight dinner by Dal Lake",
        "Spa treatments for couples",
        "Private flower-decorated boat"
      ],
      icon: <FaHeart className="text-2xl text-pink-500" />,
      pinkFeature: "Pink rose petal decoration in houseboat"
    },
    {
      id: 3,
      title: "Winter Wonderland",
      duration: "5 Days / 4 Nights",
      price: "₹29,999",
      rating: 4.7,
      image: "/images/Gulmarg.jpeg",
      type: "winter",
      highlights: [
        "Skiing in Gulmarg",
        "Snowman building sessions",
        "Hot spring bath in Kokernag",
        "Stay in snow-view cottages",
        "Winter bonfire experience",
        "Pink sunset photography session"
      ],
      icon: <IoMdSnow className="text-2xl text-pink-500" />,
      pinkFeature: "Pink Himalayan salt therapy session"
    },
    {
      id: 4,
      title: "Family Kashmiri Retreat",
      duration: "6 Days / 5 Nights",
      price: "₹27,999",
      rating: 4.6,
      image: "/images/Client2.jpeg",
      type: "family",
      highlights: [
        "Kid-friendly activities",
        "Pony rides in Sonamarg",
        "Family Shikara rides",
        "Visit to Mughal Gardens",
        "Kashmiri cooking demo",
        "Pink-themed family photoshoot"
      ],
      icon: <MdFamilyRestroom className="text-2xl text-pink-500" />,
      pinkFeature: "Pink Kashmiri Phiran dress for kids"
    },
    {
      id: 5,
      title: "Adventure Kashmir",
      duration: "7 Days / 6 Nights",
      price: "₹36,999",
      rating: 4.8,
      image: "/images/pahalgam.jpeg",
      type: "adventure",
      highlights: [
        "Trekking in Great Lakes",
        "White water rafting in Lidder",
        "Paragliding in Sonamarg",
        "Mountain biking in Yusmarg",
        "Camping under stars",
        "Pink sunrise hike"
      ],
      icon: <MdDirectionsBike className="text-2xl text-pink-500" />,
      pinkFeature: "Pink adventure bandanas"
    },
    {
      id: 6,
      title: "Luxury Houseboat Stay",
      duration: "4 Days / 3 Nights",
      price: "₹39,999",
      rating: 4.9,
      image: "/images/Houseboat.jpeg",
      type: "luxury",
      highlights: [
        "Premium houseboat with butler",
        "Private chef for Kashmiri cuisine",
        "Sunset champagne on Shikara",
        "Personalized city tours",
        "Handicraft shopping assistant",
        "Pink lotus flower arrangement"
      ],
      icon: <GiWoodCabin className="text-2xl text-pink-500" />,
      pinkFeature: "Pink Kashmiri silk bedding"
    }
  ];

  const kashmirImages = [
    "/images/kashmir.jpeg",
    "/images/kashmir 1.jpeg",
    "/images/kashmir2.jpeg",
    "/images/kashmir3.jpeg",
    "/images/kashmir4.jpeg",
    "/images/Houseboat.jpeg"
  ];

  const filteredPackages = activeTab === 'all' 
    ? packages 
    : packages.filter(pkg => pkg.type === activeTab);

  const togglePackage = (id) => {
    setExpandedPackage(expandedPackage === id ? null : id);
  };

  const handleBookNow = (pkg) => {
    setSelectedPackage(pkg);
    setFormData(prev => ({
      ...prev,
      package: pkg.title
    }));
    setShowBookingForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: date
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    emailjs.init('37pN2ThzFwwhwk7ai');
    
    emailjs.send(
      'service_bdm6dl3',
      'template_q7y750i',
      {
        package_name: selectedPackage.title,
        package_price: selectedPackage.price,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        arrival_date: formData.arrivalDate ? formData.arrivalDate.toISOString() : '',
        departure_date: formData.departureDate ? formData.departureDate.toISOString() : '',
        adults: formData.adults,
        kids: formData.kids,
        kids_ages: formData.kidsAges,
        hotel_category: formData.hotelCategory,
        meals_included: formData.mealsIncluded,
        budget: formData.budget,
        message: formData.message
      }
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setShowBookingForm(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          arrivalDate: '',
          departureDate: '',
          adults: 1,
          kids: '',
          kidsAges: '',
          hotelCategory: '3',
          mealsIncluded: 'yes',
          budget: '',
          package: '',
          message: ''
        });
      }, 3000);
    }, (err) => {
      console.log('FAILED...', err);
      alert('Failed to send message. Please try again.');
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative h-screen max-h-[800px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1575517111478-7f6afd0973db" 
            alt="Kashmir Landscape" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-pink-700/50"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white text-sm font-semibold py-2 px-6 rounded-full mb-6 border border-white/30">
              <GiFlowerPot className="mr-2 text-pink-300" /> PARADISE ON EARTH
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 font-serif"
          >
            Kashmir <span className="text-pink-200">Valley</span> Escapes
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-pink-100 max-w-2xl mx-auto mb-8"
          >
            Where snow-capped peaks meet serene lakes in India's most breathtaking destination
          </motion.p>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: 'spring' }}
            className="text-pink-200 text-5xl animate-pulse"
          >
            <GiFlowerPot />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-12 left-0 right-0 flex justify-center"
          >
            <div className="animate-bounce text-pink-200 text-2xl">
              <FaChevronDown />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Special Features Ribbon */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 py-4 px-6 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {[
              { icon: <FaHeart className="text-xl" />, text: "Romantic Getaways" },
              { icon: <FaCamera className="text-xl" />, text: "Instagram Spots" },
              { icon: <MdLocalDining className="text-xl" />, text: "Kashmiri Cuisine" },
              { icon: <GiShoppingBag className="text-xl" />, text: "Handicraft Shopping" },
              { icon: <FaSpa className="text-xl" />, text: "Spa Experiences" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2"
              >
                {item.icon}
                <span className="text-sm md:text-base">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Packages Section */}
      <div className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-20">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Kashmir Tour Packages</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the magic of Kashmir with our specially curated packages featuring exclusive pink-themed experiences
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {['all', 'popular', 'honeymoon', 'winter', 'family', 'adventure', 'luxury'].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-3 rounded-full text-sm font-medium capitalize transition-all ${activeTab === tab 
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'}`}
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
                  className={`bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 ${isExpanded ? 'ring-2 ring-pink-500' : ''}`}
                  whileHover={{ y: -5 }}
                >
                  {/* Image with Floating Icon */}
                  <div className="relative h-60 overflow-hidden">
                    <img 
                      src={pkg.image} 
                      alt={pkg.title} 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-md">
                      {pkg.icon}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-white font-bold text-2xl">{pkg.title}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="bg-pink-600 text-white text-xs px-3 py-1 rounded-full">{pkg.price}</span>
                        <div className="flex items-center text-yellow-300">
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
                        <IoLeaf className="mr-2" />
                        <span className="text-sm">{pkg.duration}</span>
                      </div>
                      <button
                        onClick={() => togglePackage(pkg.id)}
                        className="text-pink-600 font-medium hover:text-pink-700 transition-colors flex items-center text-sm"
                      >
                        {isExpanded ? 'Show Less' : 'View Details'} 
                        <FaChevronDown className={`ml-2 text-pink-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
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
                          <div className="pt-4 border-t border-pink-100">
                            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                              <GiFlowerPot className="text-pink-500 mr-2" /> Package Highlights:
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
                                  <span className="text-pink-500 mr-2">✓</span>
                                  <span className="text-gray-600">{highlight}</span>
                                </motion.li>
                              ))}
                            </ul>
                            
                            {/* Special Pink Feature */}
                            <div className="bg-pink-50 rounded-lg p-4 mb-4 border border-pink-100">
                              <div className="flex items-center text-pink-700">
                                <BiHappyHeartEyes className="mr-2 text-xl" />
                                <span className="font-medium">Special Pink Feature:</span>
                              </div>
                              <p className="mt-1 text-pink-600">{pkg.pinkFeature}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button 
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full mt-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                      onClick={() => handleBookNow(pkg)}
                    >
                      Book Kashmir Tour
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
            <div className="text-pink-500 text-6xl mb-4">
              <GiFlowerPot />
            </div>
            <h3 className="text-2xl font-medium text-gray-700 mb-2">No packages found in this category</h3>
            <p className="text-gray-500 mb-6">Contact us to customize your perfect Kashmir itinerary</p>
            <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full font-medium hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg">
              Enquire About Kashmir Tours
            </button>
          </motion.div>
        )}
      </div>

      {/* Why Choose Us Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Book With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Local Kashmiri Experts",
                description: "Our team has lived in Kashmir for generations",
                icon: "🧔",
                bg: "bg-pink-100"
              },
              {
                title: "Best Houseboat Partners",
                description: "Premium houseboats with verified quality",
                icon: "🛶",
                bg: "bg-blue-100"
              },
              {
                title: "Hassle-Free Experience",
                description: "From permits to transport - we handle it all",
                icon: "✨",
                bg: "bg-purple-100"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-6 rounded-xl shadow-sm text-center border border-gray-100 ${feature.bg}`}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Kashmir Images Gallery */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Explore Kashmir's Beauty</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kashmirImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-xl shadow-lg"
              >
                <img 
                  src={image} 
                  alt={`Kashmir scenery ${index + 1}`} 
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Booking Form Modal */}
      {showBookingForm && selectedPackage && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 20 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <div className="sticky top-0 bg-gradient-to-r from-pink-500 to-purple-600 p-4 flex justify-between items-center z-10">
              <h3 className="text-xl font-bold text-white">Book {selectedPackage.title}</h3>
              <button 
                onClick={() => setShowBookingForm(false)}
                className="text-white hover:text-pink-200 transition-colors"
              >
                <FaTimes className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              {formSubmitted ? (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-block mb-4"
                  >
                    <svg className="h-16 w-16 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Booking Request Sent!</h4>
                  <p className="text-gray-600 mb-6">We've received your booking request for {selectedPackage.title}. Our travel expert will contact you shortly to confirm your booking.</p>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-lg font-medium shadow-lg`}
                    onClick={() => setShowBookingForm(false)}
                  >
                    Close
                  </motion.button>
                </div>
              ) : (
                <>
                  <div className="mb-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-100">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-gray-900 text-lg">{selectedPackage.title}</h4>
                      <span className="font-bold text-pink-600 text-lg">{selectedPackage.price}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaCalendarAlt className="mr-2 text-pink-500" />
                      <span className="text-sm">{selectedPackage.duration}</span>
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {/* Personal Information */}
                      <div className="space-y-4">
                        <div className="relative">
                          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Full Name *</label>
                          <div className="relative">
                            <FaUser className="absolute left-3 top-3 text-gray-400" />
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                              required
                              placeholder="John Doe"
                            />
                          </div>
                        </div>
                        
                        <div className="relative">
                          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email *</label>
                          <div className="relative">
                            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                              required
                              placeholder="john@example.com"
                            />
                          </div>
                        </div>
                        
                        <div className="relative">
                          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">Phone Number *</label>
                          <div className="relative">
                            <FaPhone className="absolute left-3 top-3 text-gray-400" />
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                              required
                              placeholder="+91 9876543210"
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Travel Dates */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="arrivalDate">Arrival Date *</label>
                          <div className="relative">
                            <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                            <DatePicker
                              selected={formData.arrivalDate}
                              onChange={(date) => handleDateChange(date, 'arrivalDate')}
                              selectsStart
                              startDate={formData.arrivalDate}
                              endDate={formData.departureDate}
                              minDate={new Date()}
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                              required
                              placeholderText="Select arrival date"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="departureDate">Departure Date *</label>
                          <div className="relative">
                            <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                            <DatePicker
                              selected={formData.departureDate}
                              onChange={(date) => handleDateChange(date, 'departureDate')}
                              selectsEnd
                              startDate={formData.arrivalDate}
                              endDate={formData.departureDate}
                              minDate={formData.arrivalDate || new Date()}
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                              required
                              placeholderText="Select departure date"
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Travelers */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="adults">Number of Adults *</label>
                          <div className="relative">
                            <FaUsers className="absolute left-3 top-3 text-gray-400" />
                            <select
                              id="adults"
                              name="adults"
                              value={formData.adults}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                              required
                            >
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                <option key={num} value={num}>{num} {num === 1 ? 'Adult' : 'Adults'}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="kids">Number of Kids</label>
                          <div className="relative">
                            <FaChild className="absolute left-3 top-3 text-gray-400" />
                            <select
                              id="kids"
                              name="kids"
                              value={formData.kids}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                            >
                              <option value="">0 Children</option>
                              {[1, 2, 3, 4, 5].map(num => (
                                <option key={num} value={num}>{num} {num === 1 ? 'Child' : 'Children'}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        
                        {formData.kids > 0 && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="kidsAges">Kids Ages (comma separated)</label>
                            <input
                              type="text"
                              id="kidsAges"
                              name="kidsAges"
                              value={formData.kidsAges}
                              onChange={handleInputChange}
                              placeholder="e.g. 5, 8"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                            />
                          </div>
                        )}
                      </div>
                      
                      {/* Accommodation */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="hotelCategory">Hotel Category *</label>
                          <div className="relative">
                            <FaHotel className="absolute left-3 top-3 text-gray-400" />
                            <select
                              id="hotelCategory"
                              name="hotelCategory"
                              value={formData.hotelCategory}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                              required
                            >
                              <option value="3">3 Star</option>
                              <option value="4">4 Star</option>
                              <option value="5">5 Star</option>
                              <option value="luxury">Luxury</option>
                            </select>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="mealsIncluded">Meals Included *</label>
                          <div className="relative">
                            <FaUtensils className="absolute left-3 top-3 text-gray-400" />
                            <select
                              id="mealsIncluded"
                              name="mealsIncluded"
                              value={formData.mealsIncluded}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                              required
                            >
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                              <option value="breakfast">Breakfast Only</option>
                              <option value="half-board">Half Board</option>
                              <option value="full-board">Full Board</option>
                            </select>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="budget">Budget Range</label>
                          <div className="relative">
                            <FaWallet className="absolute left-3 top-3 text-gray-400" />
                            <select
                              id="budget"
                              name="budget"
                              value={formData.budget}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                            >
                              <option value="">Select Budget</option>
                              <option value="economy">Economy (₹50,000 - ₹1,00,000)</option>
                              <option value="mid-range">Mid-Range (₹1,00,000 - ₹2,00,000)</option>
                              <option value="premium">Premium (₹2,00,000 - ₹4,00,000)</option>
                              <option value="luxury">Luxury (₹4,00,000+)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="message">Special Requests</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                        placeholder="Any special requirements or preferences (dietary needs, accessibility requirements, special occasions, etc.)"
                      ></textarea>
                    </div>
                    
                    <input type="hidden" name="package" value={selectedPackage.title} />
                    
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 rounded-lg font-bold transition-all duration-200 shadow-lg`}
                    >
                      Submit Booking Request
                    </motion.button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Kashmir;