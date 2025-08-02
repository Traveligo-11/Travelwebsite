import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaHeart, FaMountain, FaSnowflake, FaSpa, FaHotel, FaChevronDown, FaTimes, FaPlus, FaMinus } from 'react-icons/fa';
import { GiRiver, GiWoodCabin, GiCampingTent } from 'react-icons/gi';
import emailjs from '@emailjs/browser';

const Himachal = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedPackage, setExpandedPackage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [formStatus, setFormStatus] = useState(null); // 'success' or 'error'
  const form = useRef();

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

  const specialRequestOptions = [
    'Candlelight Dinner',
    'Anniversary Cake',
    'Flower Decoration',
    'Honeymoon Suite',
    'Private Guide',
    'Adventure Activities',
    'Spa Package'
  ];

  // Gallery images
  const galleryImages = [
    "/images/Manalih.jpeg",
    "/images/shimlah.jpeg",
    "/images/Kasolh.jpeg",
    "/images/Dharamshalah.jpeg",
    "/images/adventuresh.jpeg",
    "/images/advenh.jpeg",
    "/images/dalhousiah.jpeg",
  ];

  const packages = [
    {
      id: 1,
      title: "Manali Romantic Retreat",
      duration: "5 Days / 4 Nights",
      price: "₹32,999",
      rating: 4.8,
      image: "/images/Manalih.jpeg",
      type: "honeymoon",
      highlights: [
        "Private cottage with mountain view",
        "Candlelight dinner by the Beas River",
        "Couple's spa with Himalayan herbs",
        "Sunrise at Solang Valley",
        "Personalized photo session"
      ],
      icon: <FaHeart className="text-2xl text-rose-500" />
    },
    {
      id: 2,
      title: "Shimla-Kufri Winter Wonderland",
      duration: "6 Days / 5 Nights",
      price: "₹38,999",
      rating: 4.7,
      image: "/images/shimlah.jpeg",
      type: "winter",
      highlights: [
        "Snow activities in Kufri",
        "Stay in heritage colonial hotel",
        "Horse riding on Mall Road",
        "Ice skating experience",
        "Cozy fireplace dinners"
      ],
      icon: <FaSnowflake className="text-2xl text-blue-400" />
    },
    {
      id: 3,
      title: "Kasol Riverside Camping",
      duration: "4 Days / 3 Nights",
      price: "₹24,999",
      rating: 4.6,
      image:  "/images/Kasolh.jpeg",
      type: "adventure",
      highlights: [
        "Luxury riverside camping",
        "Trek to Kheerganga hot springs",
        "Bonfire under the stars",
        "Israeli cuisine tasting",
        "Parvati Valley exploration"
      ],
      icon: <GiCampingTent className="text-2xl text-green-500" />
    },
    {
      id: 4,
      title: "Dharamshala Luxury Escape",
      duration: "5 Days / 4 Nights",
      price: "₹45,999",
      rating: 4.9,
      image:  "/images/Dharamshalah.jpeg",
      type: "luxury",
      highlights: [
        "5-star resort with spa",
        "Private tour of McLeodGanj",
        "Tibetan culture experience",
        "Sunset at Triund Hill",
        "Personal butler service"
      ],
      icon: <FaHotel className="text-2xl text-amber-500" />
    },
    {
      id: 5,
      title: "Manali Adventure ",
      duration: "8 Days / 7 Nights",
      price: "₹52,999",
      rating: 4.9,
      image:"/images/adventuresh.jpeg",
      type: "adventure",
      highlights: [
        "Stay in traditional homestays",
        "Visit Key Monastery",
        "Chandratal Lake camping",
        "High-altitude village tours",
        "Local cuisine experiences"
      ],
      icon: <FaMountain className="text-2xl text-purple-500" />
    },
    {
      id: 6,
      title: "Dalhousie-Khajjiar Romantic Getaway",
      duration: "6 Days / 5 Nights",
      price: "₹36,999",
      rating: 4.8,
      image: "/images/dalhousiah.jpeg",
      type: "honeymoon",
      highlights: [
        "Stay in colonial-era villa",
        "Horse riding in Khajjiar meadows",
        "Panchpula waterfall picnic",
        "Stargazing at Dainkund Peak",
        "Couple's nature walk"
      ],
      icon: <GiWoodCabin className="text-2xl text-emerald-500" />
    }
  ];

  const filteredPackages = activeTab === 'all' 
    ? packages 
    : packages.filter(pkg => pkg.type === activeTab);

  const togglePackage = (id) => {
    setExpandedPackage(expandedPackage === id ? null : id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSpecialRequestChange = (option) => {
    setFormData(prev => {
      if (prev.specialRequests.includes(option)) {
        return {
          ...prev,
          specialRequests: prev.specialRequests.filter(item => item !== option)
        };
      } else {
        return {
          ...prev,
          specialRequests: [...prev.specialRequests, option]
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
    setFormStatus(null); // Reset status
    
    // Prepare the data to send
    const templateParams = {
      package_name: formData.package,
      duration: selectedPackage?.duration,
      destination: "Himachal Pradesh",
      package_price: selectedPackage?.price,
      from_name: formData.name,
      from_email: formData.email,
      phone_number: formData.phone,
      arrivalDate: formData.arrivalDate,
      departureDate: formData.departureDate,
      adults: formData.adults,
      kids: formData.kids,
      kidsAges: formData.kidsAges,
      hotelCategory: formData.hotelCategory,
      mealsIncluded: formData.mealsIncluded === 'yes' ? 'Included' : 'Excluded',
      budget: formData.budget || 'Not specified',
      message: formData.message + (formData.specialRequests.length > 0 ? 
        `\n\nSpecial Requests:\n- ${formData.specialRequests.join('\n- ')}` : '')
    };
    
    emailjs.send(
      'service_ov629rm',
      'template_jr1dnto',
      templateParams,
      '37pN2ThzFwwhwk7ai'
    )
    .then((result) => {
        console.log('Email successfully sent!', result.text);
        setFormStatus('success');
        // Reset form after successful submission
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
        // Close form after 2 seconds
        setTimeout(() => {
          setShowBookingForm(false);
          setFormStatus(null);
        }, 2000);
    }, (error) => {
        console.log('Failed to send email:', error.text);
        setFormStatus('error');
    });
  };

  const openBookingForm = (pkg) => {
    setSelectedPackage(pkg);
    setFormData(prev => ({
      ...prev,
      package: pkg.title
    }));
    setShowBookingForm(true);
    setFormStatus(null);
  };

  const BookingForm = () => (
    <AnimatePresence>
      {showBookingForm && (
        <motion.div 
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto relative"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            <button 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setShowBookingForm(false)}
            >
              <FaTimes className="text-xl" />
            </button>
            
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Book {selectedPackage?.title}</h3>
              <p className="text-gray-600 mb-6">{selectedPackage?.duration} | {selectedPackage?.price}</p>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">Departure Date *</label>
                      <input
                        type="date"
                        name="departureDate"
                        value={formData.departureDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
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
                          className="px-3 py-1 bg-gray-200 rounded-l-lg hover:bg-gray-300"
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
                        />
                        <button
                          type="button"
                          onClick={incrementAdults}
                          className="px-3 py-1 bg-gray-200 rounded-r-lg hover:bg-gray-300"
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
                          onClick={decrementKids}
                          className="px-3 py-1 bg-gray-200 rounded-l-lg hover:bg-gray-300"
                          disabled={formData.kids <= 0}
                        >
                          <FaMinus />
                        </button>
                        <input
                          type="number"
                          name="kids"
                          value={formData.kids}
                          onChange={handleInputChange}
                          min="0"
                          className="w-full px-4 py-2 border-t border-b border-gray-300 text-center"
                        />
                        <button
                          type="button"
                          onClick={incrementKids}
                          className="px-3 py-1 bg-gray-200 rounded-r-lg hover:bg-gray-300"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {formData.kids > 0 && (
                    <div>
                      <label className="block text-gray-700 mb-1">Children Ages (comma separated) *</label>
                      <input
                        type="text"
                        name="kidsAges"
                        value={formData.kidsAges}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g. 5, 8"
                        required={formData.kids > 0}
                      />
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Hotel Category *</label>
                    <select
                      name="hotelCategory"
                      value={formData.hotelCategory}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="3">3 Star</option>
                      <option value="4">4 Star</option>
                      <option value="5">5 Star</option>
                      <option value="boutique">Boutique Hotel</option>
                      <option value="heritage">Heritage Property</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Meals Included? *</label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="mealsIncluded"
                          value="yes"
                          checked={formData.mealsIncluded === 'yes'}
                          onChange={handleInputChange}
                          className="mr-2"
                          required
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="mealsIncluded"
                          value="no"
                          checked={formData.mealsIncluded === 'no'}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Budget Range (optional)</label>
                    <input
                      type="text"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g. ₹30,000 - ₹50,000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Special Requests</label>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {specialRequestOptions.map((option, index) => (
                        <label key={index} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.specialRequests.includes(option)}
                            onChange={() => handleSpecialRequestChange(option)}
                            className="mr-2"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Any other special requests or notes..."
                    ></textarea>
                  </div>

                  {/* Hidden package field for email template */}
                  <input type="hidden" name="package" value={selectedPackage?.title} />
                </div>
                
                {/* Form status message */}
                {formStatus === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-center"
                  >
                    Booking request sent successfully! We'll contact you soon.
                  </motion.div>
                )}
                {formStatus === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-center"
                  >
                    Failed to send booking request. Please try again.
                  </motion.div>
                )}

                <button
                  type="submit"
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all"
                  disabled={formStatus === 'success'}
                >
                  {formStatus === 'success' ? 'Sent!' : 'Submit Booking Request'}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative h-screen max-h-[800px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/shimlah.jpeg"
            alt="Himachal Mountains" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-indigo-900/50"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white text-sm font-semibold py-2 px-6 rounded-full mb-6 border border-white/30">
              <FaMountain className="mr-2" /> HIMALAYAN ESCAPES
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 font-serif"
          >
            Himachal <span className="text-blue-200">&</span> Manali
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-blue-100 max-w-2xl mx-auto mb-8"
          >
            Romantic mountain getaways and adventurous experiences in the Himalayas
          </motion.p>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: 'spring' }}
            className="text-blue-200 text-5xl animate-pulse"
          >
            <FaHeart />
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
          {['all', 'honeymoon', 'winter', 'adventure', 'luxury'].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-3 rounded-full text-sm font-medium capitalize transition-all ${activeTab === tab 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
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
                  className={`bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 ${isExpanded ? 'ring-2 ring-blue-500' : ''}`}
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
                        <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">{pkg.price}</span>
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
                        <GiRiver className="mr-2" />
                        <span className="text-sm">{pkg.duration}</span>
                      </div>
                      <button
                        onClick={() => togglePackage(pkg.id)}
                        className="text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center text-sm"
                      >
                        {isExpanded ? 'Show Less' : 'View Details'} 
                        <FaHeart className="ml-2 text-blue-400" />
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
                              <FaHeart className="text-blue-500 mr-2" /> Package Highlights:
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
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                      onClick={() => openBookingForm(pkg)}
                    >
                      Book This Mountain Escape
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
              <FaMountain />
            </div>
            <h3 className="text-2xl font-medium text-gray-700 mb-2">No packages found in this category</h3>
            <p className="text-gray-500 mb-6">Contact us to customize your perfect Himalayan getaway</p>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg">
              Plan Your Trip
            </button>
          </motion.div>
        )}
      </div>

      {/* Gallery Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Himalayan Gallery</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore the breathtaking beauty of Himachal and Ladakh through our collection
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="overflow-hidden rounded-lg shadow-md cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <img 
                  src={image} 
                  alt={`Himalayan Scenery ${index + 1}`}
                  className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute -top-10 right-0 text-white hover:text-blue-300 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <img 
                src={selectedImage} 
                alt="Full size"
                className="w-full max-h-[80vh] object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Why Choose Us Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Our Himalayan Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Local Experts",
                description: "Our team knows every hidden gem in the Himalayas",
                icon: "🏔️"
              },
              {
                title: "Authentic Stays",
                description: "Carefully selected boutique hotels and homestays",
                icon: "🛖"
              },
              {
                title: "Safety First",
                description: "All adventure activities with certified guides",
                icon: "🛡️"
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

      {/* Booking Form Modal */}
      <BookingForm />
    </div>
  );
};

export default Himachal;