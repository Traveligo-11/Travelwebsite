import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaHeart, FaChevronDown, FaMountain, FaTimes, FaPlus, FaMinus, FaCalendarAlt, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { GiTeapot, GiTigerHead, GiMonumentValley, GiVillage, GiRiver } from 'react-icons/gi';
import { MdFamilyRestroom, MdTrain, MdOutlineHiking } from 'react-icons/md';
import { IoLeaf } from 'react-icons/io5';
import emailjs from '@emailjs/browser';

const GangtokDarjeeling = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedPackage, setExpandedPackage] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    arrivalDate: '',
    departureDate: '',
    adults: 2,
    children: 0,
    childrenAges: '',
    hotelCategory: '3',
    mealsIncluded: 'yes',
    budget: '',
    specialRequests: {
      candlelightDinner: false,
      anniversaryCake: false,
      flowerDecor: false,
      privateTransport: false,
      photoSession: false,
      other: ''
    },
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });

  const packages = [
    {
      id: 1,
      title: "Premium Gangtok & Darjeeling",
      duration: "7 Days / 6 Nights",
      price: "₹42,999",
      rating: 4.8,
      image: "/images/Darjeeling1.jpeg",
      type: "luxury",
      highlights: [
        "5-star hotels with mountain views",
        "Toy Train joy ride in Darjeeling",
        "Visit to Tsomgo Lake",
        "Sunrise at Tiger Hill",
        "Private city tours"
      ],
      icon: <FaMountain className="text-2xl text-blue-500" />
    },
    {
      id: 2,
      title: "Romantic Honeymoon Package",
      duration: "6 Days / 5 Nights",
      price: "₹38,999",
      rating: 4.9,
      image: "/images/darjeeling2.jpeg",
      type: "honeymoon",
      highlights: [
        "Candlelight dinners with mountain views",
        "Couple spa treatments",
        "Romantic room decorations",
        "Private sunset viewings",
        "Honeymoon photography session"
      ],
      icon: <FaHeart className="text-2xl text-pink-500" />
    },
    {
      id: 3,
      title: "Family Adventure Tour",
      duration: "8 Days / 7 Nights",
      price: "₹49,999",
      rating: 4.7,
      image: "/images/Darjeeling3.jpeg",
      type: "family",
      highlights: [
        "Kid-friendly activities",
        "Family-sized accommodations",
        "Tea garden visits",
        "Toy train experience",
        "Zoo and ropeway adventures"
      ],
      icon: <MdFamilyRestroom className="text-2xl text-green-500" />
    },
    {
      id: 4,
      title: "Tea Estate Experience",
      duration: "5 Days / 4 Nights",
      price: "₹32,999",
      rating: 4.6,
      image: "/images/Darjeeling4.jpeg",
      type: "cultural",
      highlights: [
        "Stay in heritage tea bungalows",
        "Tea tasting sessions",
        "Tea plucking experience",
        "Visit to tea factories",
        "Local cultural performances"
      ],
      icon: <GiTeapot className="text-2xl text-amber-600" />
    }
  ];

  const galleryImages = [
    "/images/Darjeeling1.jpeg",
    "/images/darjeeling2.jpeg",
    "/images/Darjeeling3.jpeg",
    "/images/Darjeeling4.jpeg",
    "/images/Darjeeling5.jpeg",
  ];

  const filteredPackages = activeTab === 'all' 
    ? packages 
    : packages.filter(pkg => pkg.type === activeTab);

  const togglePackage = (id) => {
    setExpandedPackage(expandedPackage === id ? null : id);
  };

  const handleBookNow = (pkg) => {
    setSelectedPackage(pkg);
    setShowBookingForm(true);
    setSubmitStatus({ success: false, message: '' });
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSpecialRequestChange = (e) => {
    const { name, checked, value } = e.target;
    if (name === 'other') {
      setFormData(prev => ({
        ...prev,
        specialRequests: {
          ...prev.specialRequests,
          other: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        specialRequests: {
          ...prev.specialRequests,
          [name]: checked
        }
      }));
    }
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

  const incrementChildren = () => {
    setFormData(prev => ({
      ...prev,
      children: prev.children + 1
    }));
  };

  const decrementChildren = () => {
    if (formData.children > 0) {
      setFormData(prev => ({
        ...prev,
        children: prev.children - 1
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const specialRequests = [];
      if (formData.specialRequests.candlelightDinner) specialRequests.push("Candlelight Dinner");
      if (formData.specialRequests.anniversaryCake) specialRequests.push("Anniversary Cake");
      if (formData.specialRequests.flowerDecor) specialRequests.push("Flower Decoration");
      if (formData.specialRequests.privateTransport) specialRequests.push("Private Transport");
      if (formData.specialRequests.photoSession) specialRequests.push("Photo Session");
      if (formData.specialRequests.other) specialRequests.push(formData.specialRequests.other);
      
      const specialRequestsText = specialRequests.length > 0 
        ? specialRequests.join(", ") 
        : 'No special requests';

      const templateParams = {
        package_name: selectedPackage.title,
        package_duration: selectedPackage.duration,
        package_price: selectedPackage.price,
        destination: "Gangtok & Darjeeling",
        from_name: formData.name,
        from_email: formData.email,
        phone_number: formData.phone,
        arrivalDate: formData.arrivalDate,
        departureDate: formData.departureDate,
        adults: formData.adults,
        kids: formData.children,
        kidsAges: formData.childrenAges,
        hotelCategory: formData.hotelCategory === '3' ? '3 Star' : 
                      formData.hotelCategory === '4' ? '4 Star' : '5 Star',
        mealsIncluded: formData.mealsIncluded === 'yes' ? 'Included' : 'Excluded',
        budget: formData.budget || 'Not specified',
        message: `${formData.message}\n\nSpecial Requests: ${specialRequestsText}`
      };

      emailjs.init('37pN2ThzFwwhwk7ai');
      
      const response = await emailjs.send(
        'service_ov629rm',
        'template_jr1dnto',
        templateParams
      );

      console.log('Email sent successfully!', response);
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        arrivalDate: '',
        departureDate: '',
        adults: 2,
        children: 0,
        childrenAges: '',
        hotelCategory: '3',
        mealsIncluded: 'yes',
        budget: '',
        specialRequests: {
          candlelightDinner: false,
          anniversaryCake: false,
          flowerDecor: false,
          privateTransport: false,
          photoSession: false,
          other: ''
        },
        message: ''
      });
      
      setSubmitStatus({ 
        success: true, 
        message: 'Thank you for your booking request! We will contact you within 24 hours.' 
      });
      
      setTimeout(() => {
        setShowBookingForm(false);
      }, 3000);
      
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus({ 
        success: false, 
        message: 'Failed to send booking request. Please try again later.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-orange-50">
      {/* Hero Section */}
      <div className="relative h-96 md:h-screen max-h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src="/images/Darjeeling1.jpeg"
          alt="Gangtok & Darjeeling" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center z-20 px-4">
          <div className="text-center max-w-4xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg"
            >
              Gangtok & Darjeeling
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-white mb-8 drop-shadow-md"
            >
              Where the Himalayas meet colonial charm and tea-scented breezes
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-orange-600 text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all hover:brightness-110"
              onClick={() => document.getElementById('packages').scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Packages
            </motion.button>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Queen of the Himalayas</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Gangtok and Darjeeling offer a perfect blend of Himalayan grandeur, colonial heritage, and vibrant local culture. 
            From the world-famous tea gardens to the breathtaking views of Kanchenjunga, every moment here is magical.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <GiTigerHead className="text-4xl text-blue-600" />,
              title: "Tiger Hill Sunrise",
              desc: "Witness the spectacular sunrise over Kanchenjunga from Tiger Hill"
            },
            {
              icon: <MdTrain className="text-4xl text-orange-500" />,
              title: "Toy Train Rides",
              desc: "Experience the UNESCO-listed Darjeeling Himalayan Railway"
            },
            {
              icon: <GiMonumentValley className="text-4xl text-blue-700" />,
              title: "Buddhist Culture",
              desc: "Explore ancient monasteries and spiritual sites"
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center border border-gray-100 hover:border-blue-200"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-50 rounded-full">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-16 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Tour Packages</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose from our carefully curated packages that showcase the best of Gangtok and Darjeeling.
            </p>
          </div>

          {/* Package Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              { id: 'all', label: 'All Packages' },
              { id: 'luxury', label: 'Luxury' },
              { id: 'honeymoon', label: 'Honeymoon' },
              { id: 'family', label: 'Family' },
              { id: 'cultural', label: 'Cultural' }
            ].map(tab => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-orange-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Package Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {filteredPackages.map(pkg => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow group"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title} 
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center text-amber-600 font-bold">
                    <FaStar className="mr-1" />
                    {pkg.rating}
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-blue-600/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {pkg.duration}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800">{pkg.title}</h3>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-blue-600">{pkg.price}</span>
                      <span className="text-xs text-gray-500 ml-1">/person</span>
                    </div>
                  </div>

                  <div className="flex items-center mb-4">
                    <div className="mr-3 p-2 bg-blue-100 rounded-lg">
                      {pkg.icon}
                    </div>
                    <div className="text-sm text-gray-600">
                      {pkg.type === 'luxury' && 'Luxury Experience'}
                      {pkg.type === 'honeymoon' && 'Honeymoon Special'}
                      {pkg.type === 'family' && 'Family Package'}
                      {pkg.type === 'cultural' && 'Cultural Tour'}
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedPackage === pkg.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mb-4 overflow-hidden"
                      >
                        <ul className="space-y-2 pl-2">
                          {pkg.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-blue-500 mr-2">✓</span>
                              <span className="text-gray-700">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <button
                      onClick={() => togglePackage(pkg.id)}
                      className="text-blue-600 hover:text-blue-800 font-medium flex items-center transition-colors"
                    >
                      {expandedPackage === pkg.id ? 'Show Less' : 'View Highlights'}
                      <FaChevronDown className={`ml-2 transition-transform ${expandedPackage === pkg.id ? 'rotate-180' : ''}`} />
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-blue-600 to-orange-600 text-white px-6 py-2 rounded-lg font-medium shadow-md hover:shadow-lg"
                      onClick={() => handleBookNow(pkg)}
                    >
                      Book Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Glimpses of Gangtok & Darjeeling</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Witness the breathtaking beauty of these Himalayan gems through these stunning visuals.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="relative rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => openImageModal(image)}
              >
                <img 
                  src={image} 
                  alt={`Gangtok & Darjeeling ${index + 1}`} 
                  className="w-full h-40 md:h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Choose Our Tours?</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto mb-6 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <GiVillage className="text-4xl text-blue-600" />,
                title: "Local Expertise",
                desc: "Our guides are Himalayan natives who know every hidden trail and viewpoint"
              },
              {
                icon: <IoLeaf className="text-4xl text-green-500" />,
                title: "Sustainable Tourism",
                desc: "We support local communities and preserve the mountain ecosystem"
              },
              {
                icon: <MdOutlineHiking className="text-4xl text-blue-700" />,
                title: "Adventure Specialists",
                desc: "Expert-led treks and activities with top safety standards"
              },
              {
                icon: <GiRiver className="text-4xl text-green-400" />,
                title: "Cultural Immersion",
                desc: "Authentic experiences with local communities and traditions"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="text-4xl mb-4 flex justify-center">
                  <div className="p-3 bg-blue-50 rounded-full">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">{item.title}</h3>
                <p className="text-gray-600 text-center">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Modal */}
      <AnimatePresence>
        {showBookingForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-white rounded-xl max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setShowBookingForm(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                disabled={isSubmitting}
              >
                <FaTimes className="text-2xl" />
              </button>

              <h3 className="text-2xl font-bold text-gray-800 mb-2">Book {selectedPackage?.title}</h3>
              <p className="text-gray-600 mb-6">{selectedPackage?.duration} | {selectedPackage?.price}</p>

              {submitStatus.message ? (
                <div className={`p-4 rounded-lg mb-4 ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {submitStatus.message}
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-1">Arrival Date *</label>
                        <input
                          type="date"
                          name="arrivalDate"
                          value={formData.arrivalDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          required
                          disabled={isSubmitting}
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-1">Departure Date *</label>
                        <input
                          type="date"
                          name="departureDate"
                          value={formData.departureDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-1">Adults *</label>
                        <div className="flex items-center">
                          <button
                            type="button"
                            onClick={decrementAdults}
                            className="bg-gray-200 text-gray-700 px-3 py-2 rounded-l-lg hover:bg-gray-300 transition-colors"
                            disabled={isSubmitting || formData.adults <= 1}
                          >
                            <FaMinus />
                          </button>
                          <input
                            type="number"
                            name="adults"
                            value={formData.adults}
                            onChange={handleInputChange}
                            min="1"
                            className="w-full px-4 py-2 border-t border-b border-gray-300 text-center"
                            required
                            disabled={isSubmitting}
                          />
                          <button
                            type="button"
                            onClick={incrementAdults}
                            className="bg-gray-200 text-gray-700 px-3 py-2 rounded-r-lg hover:bg-gray-300 transition-colors"
                            disabled={isSubmitting}
                          >
                            <FaPlus />
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-1">Children</label>
                        <div className="flex items-center">
                          <button
                            type="button"
                            onClick={decrementChildren}
                            className="bg-gray-200 text-gray-700 px-3 py-2 rounded-l-lg hover:bg-gray-300 transition-colors"
                            disabled={isSubmitting || formData.children <= 0}
                          >
                            <FaMinus />
                          </button>
                          <input
                            type="number"
                            name="children"
                            value={formData.children}
                            onChange={handleInputChange}
                            min="0"
                            className="w-full px-4 py-2 border-t border-b border-gray-300 text-center"
                            disabled={isSubmitting}
                          />
                          <button
                            type="button"
                            onClick={incrementChildren}
                            className="bg-gray-200 text-gray-700 px-3 py-2 rounded-r-lg hover:bg-gray-300 transition-colors"
                            disabled={isSubmitting}
                          >
                            <FaPlus />
                          </button>
                        </div>
                      </div>
                    </div>

                    {formData.children > 0 && (
                      <div>
                        <label className="block text-gray-700 mb-1">Children Ages (comma separated)</label>
                        <input
                          type="text"
                          name="childrenAges"
                          value={formData.childrenAges}
                          onChange={handleInputChange}
                          placeholder="e.g. 5, 8, 12"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          disabled={isSubmitting}
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-1">Hotel Category *</label>
                        <select
                          name="hotelCategory"
                          value={formData.hotelCategory}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          required
                          disabled={isSubmitting}
                        >
                          <option value="3">3 Star</option>
                          <option value="4">4 Star</option>
                          <option value="5">5 Star</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-1">Meals Included *</label>
                        <select
                          name="mealsIncluded"
                          value={formData.mealsIncluded}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          required
                          disabled={isSubmitting}
                        >
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">Approximate Budget (without flights)</label>
                      <input
                        type="text"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        placeholder="e.g. ₹50,000 - ₹75,000"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">Special Requests</label>
                      <div className="space-y-2 mb-3">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            name="candlelightDinner"
                            checked={formData.specialRequests.candlelightDinner}
                            onChange={handleSpecialRequestChange}
                            className="rounded text-orange-600"
                            disabled={isSubmitting}
                          />
                          <span>Candlelight Dinner</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            name="anniversaryCake"
                            checked={formData.specialRequests.anniversaryCake}
                            onChange={handleSpecialRequestChange}
                            className="rounded text-orange-600"
                            disabled={isSubmitting}
                          />
                          <span>Anniversary Cake</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            name="flowerDecor"
                            checked={formData.specialRequests.flowerDecor}
                            onChange={handleSpecialRequestChange}
                            className="rounded text-orange-600"
                            disabled={isSubmitting}
                          />
                          <span>Flower Decoration</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            name="privateTransport"
                            checked={formData.specialRequests.privateTransport}
                            onChange={handleSpecialRequestChange}
                            className="rounded text-orange-600"
                            disabled={isSubmitting}
                          />
                          <span>Private Transport</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            name="photoSession"
                            checked={formData.specialRequests.photoSession}
                            onChange={handleSpecialRequestChange}
                            className="rounded text-orange-600"
                            disabled={isSubmitting}
                          />
                          <span>Photo Session</span>
                        </label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="rounded text-orange-600 opacity-0"
                            disabled
                          />
                          <input
                            type="text"
                            name="other"
                            value={formData.specialRequests.other}
                            onChange={handleSpecialRequestChange}
                            placeholder="Other requests"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Any additional information or requests..."
                        disabled={isSubmitting}
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-gradient-to-r from-blue-600 to-orange-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-orange-700 transition-all shadow-lg mt-4 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? 'Sending...' : 'Confirm Booking Request'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-6xl w-full max-h-[90vh]"
            >
              <button
                onClick={closeImageModal}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 z-10 transition-colors bg-black/50 rounded-full p-2"
              >
                <FaTimes className="text-2xl" />
              </button>
              <img 
                src={selectedImage} 
                alt="Enlarged view" 
                className="w-full h-full object-contain max-h-[90vh] rounded-lg"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GangtokDarjeeling;