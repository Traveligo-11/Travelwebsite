import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaHeart, FaChevronDown, FaUmbrellaBeach, FaTimes, FaPlus, FaMinus } from 'react-icons/fa';
import { GiElephant, GiStonePath, GiIsland } from 'react-icons/gi';
import { MdSpa, MdFamilyRestroom } from 'react-icons/md';
import { IoBoat, IoLeaf } from 'react-icons/io5';
import emailjs from '@emailjs/browser';

const Thailand = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedPackage, setExpandedPackage] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    arrivalDate: '',
    departureDate: '',
    adults: 1,
    kids: 0,
    kidsAges: '',
    hotelCategory: '3',
    mealsIncluded: 'yes',
    budget: '',
    package: '',
    message: '',
    specialRequests: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const specialRequestOptions = [
    "Candle Light Dinner",
    "Anniversary Cake",
    "Honeymoon Decorations",
    "Airport Transfer",
    "Spa Treatment",
    "Private Guide",
    "Vegetarian Meals",
    "Special Dietary Needs"
  ];

  const packages = [
    {
      id: 1,
      title: "Luxury Bangkok & Phuket",
      duration: "8 Days / 7 Nights",
      price: "₹85,999",
      rating: 4.9,
      image: "/images/thailand.jpeg",
      type: "luxury",
      highlights: [
        "5-star hotels in Bangkok and Phuket",
        "Private speedboat to Phi Phi Islands",
        "VIP dinner cruise on Chao Phraya River",
        "Elephant sanctuary visit",
        "Personal concierge service"
      ],
      icon: <FaUmbrellaBeach className="text-2xl text-blue-500" />
    },
    {
      id: 2,
      title: "Northern Thailand Adventure",
      duration: "7 Days / 6 Nights",
      price: "₹64,999",
      rating: 4.8,
      image: "/images/Thailand2.jpeg",
      type: "adventure",
      highlights: [
        "Chiang Mai jungle trekking",
        "Bamboo rafting experience",
        "Visit to Golden Triangle",
        "Doi Inthanon National Park",
        "Hill tribe village homestay"
      ],
      icon: <GiElephant className="text-2xl text-green-600" />
    },
    {
      id: 3,
      title: "Family Fun Thailand",
      duration: "9 Days / 8 Nights",
      price: "₹72,999",
      rating: 4.7,
      image: "/images/Thailand4.jpeg",
      type: "family",
      highlights: [
        "Siam Amazing Park tickets",
        "Phuket Fantasea show",
        "Krabi beach resort with kids club",
        "Thai cooking class for families",
        "Elephant nature park visit"
      ],
      icon: <MdFamilyRestroom className="text-2xl text-orange-500" />
    },
    {
      id: 4,
      title: "Romantic Thailand",
      duration: "7 Days / 6 Nights",
      price: "₹92,999",
      rating: 4.9,
      image: "/images/Thailand5.jpeg",
      type: "honeymoon",
      highlights: [
        "Private beachfront villa in Koh Samui",
        "Couples massage at luxury spa",
        "Sunset dinner on Railay Beach",
        "Private longtail boat tour",
        "Floating breakfast in pool"
      ],
      icon: <FaHeart className="text-2xl text-rose-500" />
    },
    {
      id: 5,
      title: "Thai Culture Explorer",
      duration: "8 Days / 7 Nights",
      price: "₹68,999",
      rating: 4.7,
      image: "/images/Thailand6.jpeg",
      type: "culture",
      highlights: [
        "Ayutthaya historical park tour",
        "Bangkok temple circuit",
        "Traditional Thai dance show",
        "Thai cooking masterclass",
        "Floating market visit"
      ],
      icon: <GiStonePath className="text-2xl text-yellow-500" />
    },
    {
      id: 6,
      title: "Island Hopping Escape",
      duration: "7 Days / 6 Nights",
      price: "₹75,999",
      rating: 4.8,
      image: "/images/Thailand7.jpeg",
      type: "beach",
      highlights: [
        "Phi Phi Islands speedboat tour",
        "Phang Nga Bay kayaking",
        "Snorkeling at Similan Islands",
        "Beachfront resort in Krabi",
        "Full moon party (seasonal)"
      ],
      icon: <IoBoat className="text-2xl text-blue-400" />
    }
  ];

  const galleryImages = [
    "/images/thailand.jpeg",
    "/images/Thailand2.jpeg",
    "/images/Thailand4.jpeg",
    "/images/Thailand5.jpeg",
    "/images/Thailand6.jpeg",
    "/images/Thailand7.jpeg",
  ];

  const filteredPackages = activeTab === 'all' 
    ? packages 
    : packages.filter(pkg => pkg.type === activeTab);

  const togglePackage = (id) => {
    setExpandedPackage(expandedPackage === id ? null : id);
  };

  const openBookingModal = (pkg) => {
    setSelectedPackage(pkg);
    setFormData(prev => ({
      ...prev,
      package: pkg.title
    }));
    setIsBookingOpen(true);
    setSubmitSuccess(false);
  };

  const closeBookingModal = () => {
    setIsBookingOpen(false);
    setSelectedPackage(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSpecialRequestChange = (request) => {
    setFormData(prev => {
      if (prev.specialRequests.includes(request)) {
        return {
          ...prev,
          specialRequests: prev.specialRequests.filter(r => r !== request)
        };
      } else {
        return {
          ...prev,
          specialRequests: [...prev.specialRequests, request]
        };
      }
    });
  };

  const incrementAdults = () => {
    setFormData(prev => ({
      ...prev,
      adults: prev.adults + 1
    }));
  };

  const decrementAdults = () => {
    if (formData.adults > 1) {
      setFormData(prev => ({
        ...prev,
        adults: prev.adults - 1
      }));
    }
  };

  const incrementKids = () => {
    setFormData(prev => ({
      ...prev,
      kids: prev.kids + 1
    }));
  };

  const decrementKids = () => {
    if (formData.kids > 0) {
      setFormData(prev => ({
        ...prev,
        kids: prev.kids - 1
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone_number: formData.phone,
      arrivalDate: formData.arrivalDate,
      departureDate: formData.departureDate,
      adults: formData.adults,
      kids: formData.kids,
      kidsAges: formData.kidsAges,
      hotelCategory: formData.hotelCategory,
      mealsIncluded: formData.mealsIncluded,
      budget: formData.budget,
      message: formData.message,
      specialRequests: formData.specialRequests.join(', '),
      package_name: selectedPackage.title,
      package_price: selectedPackage.price,
      package_duration: selectedPackage.duration,
      package_type: selectedPackage.type,
      destination: "Thailand"
    };

    emailjs.init('37pN2ThzFwwhwk7ai');
    
    emailjs.send(
      'service_ov629rm',
      'template_jr1dnto',
      templateParams
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        arrivalDate: '',
        departureDate: '',
        adults: 1,
        kids: 0,
        kidsAges: '',
        hotelCategory: '3',
        mealsIncluded: 'yes',
        budget: '',
        package: '',
        message: '',
        specialRequests: []
      });
    })
    .catch((err) => {
      console.log('FAILED...', err);
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-orange-50">
      {/* Hero Section */}
      <div className="relative h-screen max-h-[800px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/thailand.jpeg" 
            alt="Thailand Landscape" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-orange-700/50"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white text-sm font-semibold py-2 px-6 rounded-full mb-6 border border-white/30">
              <GiStonePath className="mr-2" /> LAND OF SMILES
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 font-serif"
          >
            Thailand <span className="text-orange-200">Tropical</span> Wonders
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-blue-100 max-w-2xl mx-auto mb-8"
          >
            Where golden temples meet turquoise waters in Southeast Asia's most vibrant kingdom
          </motion.p>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: 'spring' }}
            className="text-orange-200 text-5xl animate-pulse"
          >
            <GiStonePath />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-12 left-0 right-0 flex justify-center"
          >
            <div className="animate-bounce text-white text-2xl">
              <FaChevronDown />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Packages Section */}
      <div className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-20">
        {/* Filter Tabs */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {['all', 'luxury', 'adventure', 'family', 'honeymoon', 'culture', 'beach'].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-3 rounded-full text-sm font-medium capitalize transition-all ${activeTab === tab 
                ? 'bg-gradient-to-r from-blue-600 to-orange-600 text-white shadow-lg' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'}`}
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
                  className={`bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 ${isExpanded ? 'ring-2 ring-orange-500' : ''}`}
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
                        <span className="bg-orange-600 text-white text-xs px-3 py-1 rounded-full">{pkg.price}</span>
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
                        className="text-orange-600 font-medium hover:text-orange-700 transition-colors flex items-center text-sm"
                      >
                        {isExpanded ? 'Show Less' : 'View Details'} 
                        <FaChevronDown className={`ml-2 text-orange-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
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
                          <div className="pt-4 border-t border-orange-100">
                            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                              <GiStonePath className="text-orange-500 mr-2" /> Experience Highlights:
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
                                  <span className="text-orange-500 mr-2">✓</span>
                                  <span className="text-gray-600">{highlight}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button 
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full mt-4 bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                      onClick={() => openBookingModal(pkg)}
                    >
                      Book This Thailand Experience
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
            <div className="text-orange-500 text-6xl mb-4">
              <GiStonePath />
            </div>
            <h3 className="text-2xl font-medium text-gray-700 mb-2">No experiences found in this category</h3>
            <p className="text-gray-500 mb-6">Contact us to customize your perfect Thailand getaway</p>
            <button className="bg-gradient-to-r from-blue-600 to-orange-600 text-white px-8 py-3 rounded-full font-medium hover:from-blue-700 hover:to-orange-700 transition-all shadow-lg">
              Plan Your Thailand Trip
            </button>
          </motion.div>
        )}
      </div>

      {/* Why Choose Us Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-orange-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Our Thailand Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Thai Hospitality",
                description: "Authentic experiences with local Thai hosts",
                icon: "🙏"
              },
              {
                title: "Diverse Experiences",
                description: "From bustling cities to tranquil islands",
                icon: "🌴"
              },
              {
                title: "Culinary Journeys",
                description: "Discover Thailand's world-famous cuisine",
                icon: "🍜"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Thailand in Pictures</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={image}
                  alt={`Thailand gallery ${index + 1}`}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {isBookingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <button
                onClick={closeBookingModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10 transition-colors"
              >
                <FaTimes className="text-2xl" />
              </button>

              <div className="grid md:grid-cols-2">
                {/* Package Info Side */}
                <div className="bg-gradient-to-br from-blue-600 to-orange-500 p-8 text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/images/thailand-hero.jpeg')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-2">{selectedPackage?.title}</h3>
                    <div className="flex items-center text-blue-100 mb-6">
                      <IoLeaf className="mr-2" />
                      <span>{selectedPackage?.duration}</span>
                    </div>
                    
                    <div className="flex items-center mb-6">
                      <div className="text-4xl font-bold mr-4">{selectedPackage?.price}</div>
                      <div className="flex items-center bg-blue-700/80 px-3 py-1 rounded-full backdrop-blur-sm">
                        <FaStar className="mr-1 text-yellow-300" />
                        <span>{selectedPackage?.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-white/20 p-3 rounded-full mr-4 backdrop-blur-sm border border-white/20">
                        {selectedPackage?.icon}
                      </div>
                      <p className="text-sm text-white/80">Thailand's premium {selectedPackage?.type} experience</p>
                    </div>
                  </div>
                </div>

                {/* Form Side */}
                <div className="p-8 bg-white">
                  {submitSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8 h-full flex flex-col items-center justify-center"
                    >
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Booking Request Sent!</h3>
                      <p className="text-gray-600 mb-6 max-w-md">
                        Thank you for your interest in {selectedPackage?.title}. Our Thailand specialist will contact you within 24 hours to confirm your booking.
                      </p>
                      <button
                        onClick={closeBookingModal}
                        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-orange-600 text-white rounded-full font-medium hover:from-blue-700 hover:to-orange-700 transition-all"
                      >
                        Close Window
                      </button>
                    </motion.div>
                  ) : (
                    <>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Reserve Your Spot</h3>
                      <p className="text-gray-600 mb-6">Secure your Thailand experience today</p>
                      
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                              placeholder="Your name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                              placeholder="your@email.com"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                              placeholder="+91 9876543210"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Package *</label>
                            <input
                              type="text"
                              name="package"
                              value={selectedPackage?.title || ''}
                              readOnly
                              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 cursor-not-allowed"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Arrival Date *</label>
                            <input
                              type="date"
                              name="arrivalDate"
                              value={formData.arrivalDate}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Departure Date *</label>
                            <input
                              type="date"
                              name="departureDate"
                              value={formData.departureDate}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Adults *</label>
                            <div className="flex items-center">
                              <button
                                type="button"
                                onClick={decrementAdults}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-l-lg transition-colors"
                              >
                                <FaMinus />
                              </button>
                              <input
                                type="number"
                                name="adults"
                                value={formData.adults}
                                onChange={handleChange}
                                min="1"
                                className="w-full px-4 py-2 border-t border-b border-gray-200 text-center"
                                readOnly
                              />
                              <button
                                type="button"
                                onClick={incrementAdults}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-r-lg transition-colors"
                              >
                                <FaPlus />
                              </button>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Children</label>
                            <div className="flex items-center">
                              <button
                                type="button"
                                onClick={decrementKids}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-l-lg transition-colors"
                              >
                                <FaMinus />
                              </button>
                              <input
                                type="number"
                                name="kids"
                                value={formData.kids}
                                onChange={handleChange}
                                min="0"
                                className="w-full px-4 py-2 border-t border-b border-gray-200 text-center"
                                readOnly
                              />
                              <button
                                type="button"
                                onClick={incrementKids}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-r-lg transition-colors"
                              >
                                <FaPlus />
                              </button>
                            </div>
                          </div>
                        </div>

                        {formData.kids > 0 && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Children Ages *</label>
                            <input
                              type="text"
                              name="kidsAges"
                              value={formData.kidsAges}
                              onChange={handleChange}
                              required={formData.kids > 0}
                              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                              placeholder="Ages separated by commas (e.g. 5, 8)"
                            />
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Category *</label>
                            <select
                              name="hotelCategory"
                              value={formData.hotelCategory}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            >
                              <option value="3">3 Star</option>
                              <option value="4">4 Star</option>
                              <option value="5">5 Star</option>
                              <option value="luxury">Luxury</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Meals Included *</label>
                            <select
                              name="mealsIncluded"
                              value={formData.mealsIncluded}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            >
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                              <option value="some">Some meals included</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Budget (Optional)</label>
                          <input
                            type="text"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="Approximate budget for your trip"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                          <div className="grid grid-cols-2 gap-2 mb-3">
                            {specialRequestOptions.map((option) => (
                              <div key={option} className="flex items-center">
                                <input
                                  type="checkbox"
                                  id={`request-${option}`}
                                  checked={formData.specialRequests.includes(option)}
                                  onChange={() => handleSpecialRequestChange(option)}
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor={`request-${option}`} className="ml-2 text-sm text-gray-700">
                                  {option}
                                </label>
                              </div>
                            ))}
                          </div>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="3"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="Other special requests, dietary restrictions, room preferences, etc."
                          ></textarea>
                        </div>

                        <div className="pt-2">
                          <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isSubmitting}
                            className={`w-full py-4 px-6 rounded-xl font-bold text-white shadow-lg transition-all ${
                              isSubmitting
                                ? 'bg-gray-400'
                                : 'bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700'
                            }`}
                          >
                            {isSubmitting ? (
                              <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                              </span>
                            ) : (
                              'Confirm Booking Request'
                            )}
                          </motion.button>
                        </div>

                        <p className="text-xs text-gray-500 text-center">
                          By submitting this form, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
                        </p>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Thailand;