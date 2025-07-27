import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaHeart, FaChevronDown, FaUmbrellaBeach, FaTimes, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { GiWaterfall, GiTempleGate, GiIsland } from 'react-icons/gi';
import { MdSpa, MdFamilyRestroom, MdOutlineSurfing } from 'react-icons/md';
import { IoLeaf } from 'react-icons/io5';
import emailjs from 'emailjs-com';

const Bali = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedPackage, setExpandedPackage] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '2',
    date: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const packages = [
    {
      id: 1,
      title: "Ubud Cultural Retreat",
      duration: "5 Days / 4 Nights",
      price: "₹65,999",
      rating: 4.8,
      image:"/images/Bali.jpeg",
      type: "culture",
      highlights: [
        "Stay in luxury jungle resort",
        "Tirta Empul water purification ceremony",
        "Traditional Balinese cooking class",
        "Tegalalang Rice Terrace visit",
        "Sacred Monkey Forest tour"
      ],
      icon: <GiTempleGate className="text-2xl text-orange-500" />
    },
    {
      id: 2,
      title: "Nusa Penida Adventure",
      duration: "4 Days / 3 Nights",
      price: "₹54,999",
      rating: 4.9,
      image:"/images/Bali2.jpeg",
      type: "adventure",
      highlights: [
        "Snorkeling with manta rays",
        "Kelingking Beach cliff viewpoint",
        "Crystal Bay sunset cruise",
        "Angel's Billabong natural pool",
        "Broken Beach exploration"
      ],
      icon: <GiWaterfall className="text-2xl text-blue-500" />
    },
    {
      id: 3,
      title: "Seminyak Luxury Escape",
      duration: "6 Days / 5 Nights",
      price: "₹89,999",
      rating: 4.9,
      image: "/images/Bali3.jpeg",
      type: "luxury",
      highlights: [
        "Private pool villa with ocean view",
        "Floating breakfast experience",
        "Sunset cocktails at Potato Head Beach Club",
        "Personal butler service",
        "Luxury spa treatments"
      ],
      icon: <FaUmbrellaBeach className="text-2xl text-amber-500" />
    },
    {
      id: 4,
      title: "Bali Honeymoon Special",
      duration: "8 Days / 7 Nights",
      price: "₹1,19,999",
      rating: 5.0,
      image: "/images/Bali4.jpeg",
      type: "honeymoon",
      highlights: [
        "Romantic flower bath setup",
        "Private candlelight dinner on the beach",
        "Couples Balinese massage",
        "Sunset Uluwatu temple tour",
        "Luxury photo shoot session"
      ],
      icon: <FaHeart className="text-2xl text-rose-500" />
    },
    {
      id: 5,
      title: "Bali Wellness Retreat",
      duration: "7 Days / 6 Nights",
      price: "₹75,999",
      rating: 4.7,
      image: "/images/Bali5.jpeg",
      type: "wellness",
      highlights: [
        "Daily sunrise yoga sessions",
        "Traditional Jamu healing drinks",
        "Chakra balancing treatments",
        "Meditation at sunrise volcano",
        "Organic farm-to-table meals"
      ],
      icon: <MdSpa className="text-2xl text-purple-500" />
    },
    {
      id: 6,
      title: "Bali Surf & Stay",
      duration: "6 Days / 5 Nights",
      price: "₹62,999",
      rating: 4.6,
      image: "/images/Bali6.jpeg",
      type: "adventure",
      highlights: [
        "Daily surf lessons at Canggu",
        "Beachfront accommodation",
        "Surfboard rental included",
        "Balinese massage after surfing",
        "Sunset beach bonfire"
      ],
      icon: <MdOutlineSurfing className="text-2xl text-blue-400" />
    }
  ];

  // Simple image paths array
  const galleryImages = [
    "/images/Bali.jpeg",
    "/images/Bali1.jpeg",
    "/images/Bali2.jpeg",
    "/images/Bali3.jpeg",
    "/images/Bali4.jpeg",
    "/images/Bali5.jpeg",
    "/images/Bali6.jpeg"
  ];

  const filteredPackages = activeTab === 'all' 
    ? packages 
    : packages.filter(pkg => pkg.type === activeTab);

  const togglePackage = (id) => {
    setExpandedPackage(expandedPackage === id ? null : id);
  };

  const openBookingModal = (pkg) => {
    setSelectedPackage(pkg);
    setIsBookingOpen(true);
    setSubmitSuccess(false);
  };

  const closeBookingModal = () => {
    setIsBookingOpen(false);
    setSelectedPackage(null);
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const templateParams = {
      ...formData,
      package_name: selectedPackage.title,
      package_price: selectedPackage.price,
      package_duration: selectedPackage.duration,
      package_type: selectedPackage.type
    };

    emailjs.send(
      'YOUR_EMAILJS_SERVICE_ID', 
      'YOUR_EMAILJS_TEMPLATE_ID',
      templateParams,
      'YOUR_EMAILJS_USER_ID'
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        guests: '2',
        date: '',
        message: ''
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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-amber-50">
      {/* Hero Section */}
      <div className="relative h-screen max-h-[800px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/Bali1.jpeg"
            alt="Bali Landscape" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/60 to-amber-700/50"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white text-sm font-semibold py-2 px-6 rounded-full mb-6 border border-white/30">
              <GiIsland className="mr-2" /> ISLAND OF GODS
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 font-serif"
          >
            Discover <span className="text-green-200">Bali's</span> Magic
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-green-100 max-w-2xl mx-auto mb-8"
          >
            Where ancient temples, lush jungles, and pristine beaches create paradise
          </motion.p>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: 'spring' }}
            className="text-green-200 text-5xl animate-pulse"
          >
            <GiTempleGate />
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
          {['all', 'luxury', 'adventure', 'honeymoon', 'wellness', 'culture'].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-3 rounded-full text-sm font-medium capitalize transition-all ${activeTab === tab 
                ? 'bg-gradient-to-r from-green-600 to-amber-600 text-white shadow-lg' 
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
                  className={`bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 ${isExpanded ? 'ring-2 ring-green-500' : ''}`}
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
                        <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">{pkg.price}</span>
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
                        className="text-green-600 font-medium hover:text-green-700 transition-colors flex items-center text-sm"
                      >
                        {isExpanded ? 'Show Less' : 'View Details'} 
                        <FaChevronDown className={`ml-2 text-green-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
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
                              <GiIsland className="text-green-500 mr-2" /> Experience Highlights:
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
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full mt-4 bg-gradient-to-r from-green-600 to-amber-600 hover:from-green-700 hover:to-amber-700 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                      onClick={() => openBookingModal(pkg)}
                    >
                      Book This Bali Experience
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
              <GiIsland />
            </div>
            <h3 className="text-2xl font-medium text-gray-700 mb-2">No experiences found in this category</h3>
            <p className="text-gray-500 mb-6">Contact us to customize your perfect Bali getaway</p>
            <button 
              className="bg-gradient-to-r from-green-600 to-amber-600 text-white px-8 py-3 rounded-full font-medium hover:from-green-700 hover:to-amber-700 transition-all shadow-lg"
              onClick={() => document.getElementById('contact-info').scrollIntoView({ behavior: 'smooth' })}
            >
              Plan Your Bali Trip
            </button>
          </motion.div>
        )}
      </div>

      {/* Why Choose Us Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-50 to-amber-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Our Bali Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Local Balinese Experts",
                description: "Our team includes native Balinese guides who share authentic cultural insights",
                icon: "🏝️"
              },
              {
                title: "Sustainable Tourism",
                description: "We support eco-friendly resorts and responsible travel practices",
                icon: "🌿"
              },
              {
                title: "Customizable Itineraries",
                description: "Tailor your trip with unique experiences that match your interests",
                icon: "✨"
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
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Bali Gallery</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Beautiful moments from Bali
            </p>
          </motion.div>

          {/* Simple Image Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="relative group overflow-hidden rounded-xl shadow-md cursor-pointer"
                onClick={() => openImageModal(image)}
              >
                <img
                  src={image}
                  alt="Bali"
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div id="contact-info" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready for Your Bali Adventure?</h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Contact our Bali specialists to start planning your perfect island getaway
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-green-50 p-6 rounded-xl">
              <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPhone className="text-green-600 text-xl" />
              </div>
              <h3 className="font-bold text-lg mb-2">Call Us</h3>
              <p className="text-green-600 font-medium">+91 9796337997</p>
            </div>
            
            <div className="bg-amber-50 p-6 rounded-xl">
              <div className="bg-amber-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaEnvelope className="text-amber-600 text-xl" />
              </div>
              <h3 className="font-bold text-lg mb-2">Email Us</h3>
              <p className="text-amber-600 font-medium">info@traveligo.com</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMapMarkerAlt className="text-blue-600 text-xl" />
              </div>
              <h3 className="font-bold text-lg mb-2">Our Bali Office</h3>
              <p className="text-blue-600 font-medium">First Boulevard Road Lane Dalgate Srinagar,190001 Jammu and Kashmir</p>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-6xl w-full"
            >
              <button
                onClick={closeImageModal}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 transition-colors bg-black/50 rounded-full p-2"
              >
                <FaTimes className="text-2xl" />
              </button>
              
              <div className="bg-black rounded-xl overflow-hidden">
                <img
                  src={selectedImage}
                  alt="Bali"
                  className="w-full max-h-[90vh] object-contain"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
                <div className="bg-gradient-to-br from-green-600 to-amber-500 p-8 text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2038&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-2">{selectedPackage?.title}</h3>
                    <div className="flex items-center text-green-100 mb-6">
                      <IoLeaf className="mr-2" />
                      <span>{selectedPackage?.duration}</span>
                    </div>
                    
                    <div className="flex items-center mb-6">
                      <div className="text-4xl font-bold mr-4">{selectedPackage?.price}</div>
                      <div className="flex items-center bg-green-700/80 px-3 py-1 rounded-full backdrop-blur-sm">
                        <FaStar className="mr-1 text-yellow-300" />
                        <span>{selectedPackage?.rating}</span>
                      </div>
                    </div>

                    <div className="bg-white/10 p-4 rounded-lg mb-6 backdrop-blur-sm border border-white/20">
                      <h4 className="font-bold mb-3 flex items-center">
                        <GiIsland className="mr-2 text-amber-300" />
                        Package Highlights
                      </h4>
                      <ul className="space-y-2">
                        {selectedPackage?.highlights.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-300 mr-2">✓</span>
                            <span className="text-white/90">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-white/20 p-3 rounded-full mr-4 backdrop-blur-sm border border-white/20">
                        {selectedPackage?.icon}
                      </div>
                      <p className="text-sm text-white/80">Bali's premium {selectedPackage?.type} experience</p>
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
                        Thank you for your interest in {selectedPackage?.title}. Our Bali specialist will contact you within 24 hours to confirm your booking.
                      </p>
                      <button
                        onClick={closeBookingModal}
                        className="px-6 py-2 bg-gradient-to-r from-green-600 to-amber-600 text-white rounded-full font-medium hover:from-green-700 hover:to-amber-700 transition-all"
                      >
                        Close Window
                      </button>
                    </motion.div>
                  ) : (
                    <>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Reserve Your Spot</h3>
                      <p className="text-gray-600 mb-6">Secure your Bali experience today</p>
                      
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
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
                              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                              placeholder="your@email.com"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                              placeholder="+91 9876543210"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Travelers *</label>
                            <select
                              name="guests"
                              value={formData.guests}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem]"
                            >
                              <option value="1">1 Traveler</option>
                              <option value="2">2 Travelers</option>
                              <option value="3">3 Travelers</option>
                              <option value="4">4 Travelers</option>
                              <option value="5+">5+ Travelers</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Dates *</label>
                          <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="3"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                            placeholder="Dietary restrictions, room preferences, etc."
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
                                : 'bg-gradient-to-r from-green-600 to-amber-600 hover:from-green-700 hover:to-amber-700'
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
                          By submitting this form, you agree to our <a href="#" className="text-green-600 hover:underline">Terms of Service</a> and <a href="#" className="text-green-600 hover:underline">Privacy Policy</a>.
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

export default Bali;