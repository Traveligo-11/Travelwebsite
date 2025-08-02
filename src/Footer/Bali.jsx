import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaHeart, FaUmbrellaBeach, FaChevronDown, FaTimes, FaPhone, FaEnvelope, FaMapMarkerAlt, FaPlus, FaMinus } from 'react-icons/fa';
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
    adults: 2,
    children: 0,
    childrenAges: '',
    arrivalDate: '',
    departureDate: '',
    hotelCategory: '3',
    mealsIncluded: 'yes',
    budget: '',
    specialRequests: {
      candlelightDinner: false,
      anniversaryCake: false,
      flowerDecor: false,
      privateBoat: false,
      ayurvedaSession: false,
      other: ''
    },
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
    // ... (other package objects remain the same)
  ];

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare special requests text
    const specialRequests = [];
    if (formData.specialRequests.candlelightDinner) specialRequests.push("Candlelight Dinner");
    if (formData.specialRequests.anniversaryCake) specialRequests.push("Anniversary Cake");
    if (formData.specialRequests.flowerDecor) specialRequests.push("Flower Decoration");
    if (formData.specialRequests.privateBoat) specialRequests.push("Private Boat");
    if (formData.specialRequests.ayurvedaSession) specialRequests.push("Ayurveda Session");
    if (formData.specialRequests.other) specialRequests.push(formData.specialRequests.other);
    
    const specialRequestsText = specialRequests.length > 0 
      ? specialRequests.join(", ") 
      : 'No special requests';

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone_number: formData.phone,
      package_name: selectedPackage.title,
      package_price: selectedPackage.price,
      package_duration: selectedPackage.duration,
      destination: "Bali",
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
    
    emailjs.send(
      'service_ov629rm',
      'template_jr1dnto',
      templateParams
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      setSubmitSuccess(true);
      // Reset form but keep package selection
      setFormData({
        name: '',
        email: '',
        phone: '',
        adults: 2,
        children: 0,
        childrenAges: '',
        arrivalDate: '',
        departureDate: '',
        hotelCategory: '3',
        mealsIncluded: 'yes',
        budget: '',
        specialRequests: {
          candlelightDinner: false,
          anniversaryCake: false,
          flowerDecor: false,
          privateBoat: false,
          ayurvedaSession: false,
          other: ''
        },
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
      {/* Hero Section and other sections remain the same until the Booking Modal */}

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
                {/* Package Info Side (remains the same) */}

                {/* Form Side */}
                <div className="p-8 bg-white">
                  {submitSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8 h-full flex flex-col items-center justify-center"
                    >
                      {/* Success message remains the same */}
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

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Adults *</label>
                            <div className="flex items-center">
                              <button
                                type="button"
                                onClick={decrementAdults}
                                className="bg-gray-200 text-gray-700 px-3 py-2 rounded-l-lg hover:bg-gray-300 transition-colors"
                              >
                                <FaMinus />
                              </button>
                              <input
                                type="number"
                                name="adults"
                                value={formData.adults}
                                onChange={handleChange}
                                min="1"
                                className="w-full px-4 py-2 border-t border-b border-gray-300 text-center"
                                required
                              />
                              <button
                                type="button"
                                onClick={incrementAdults}
                                className="bg-gray-200 text-gray-700 px-3 py-2 rounded-r-lg hover:bg-gray-300 transition-colors"
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
                                onClick={decrementChildren}
                                className="bg-gray-200 text-gray-700 px-3 py-2 rounded-l-lg hover:bg-gray-300 transition-colors"
                              >
                                <FaMinus />
                              </button>
                              <input
                                type="number"
                                name="children"
                                value={formData.children}
                                onChange={handleChange}
                                min="0"
                                className="w-full px-4 py-2 border-t border-b border-gray-300 text-center"
                              />
                              <button
                                type="button"
                                onClick={incrementChildren}
                                className="bg-gray-200 text-gray-700 px-3 py-2 rounded-r-lg hover:bg-gray-300 transition-colors"
                              >
                                <FaPlus />
                              </button>
                            </div>
                          </div>
                        </div>

                        {formData.children > 0 && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Children Ages (comma separated)</label>
                            <input
                              type="text"
                              name="childrenAges"
                              value={formData.childrenAges}
                              onChange={handleChange}
                              placeholder="e.g. 5, 8, 12"
                              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                            />
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Arrival Date *</label>
                            <input
                              type="date"
                              name="arrivalDate"
                              value={formData.arrivalDate}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
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
                              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Category *</label>
                            <select
                              name="hotelCategory"
                              value={formData.hotelCategory}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                            >
                              <option value="3">3 Star</option>
                              <option value="4">4 Star</option>
                              <option value="5">5 Star</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Meals Included *</label>
                            <select
                              name="mealsIncluded"
                              value={formData.mealsIncluded}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                            >
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Approximate Budget (without flights)</label>
                          <input
                            type="text"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                            placeholder="e.g. ₹50,000 - ₹75,000"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                          <div className="space-y-2 mb-3">
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                name="candlelightDinner"
                                checked={formData.specialRequests.candlelightDinner}
                                onChange={handleSpecialRequestChange}
                                className="rounded text-green-600"
                              />
                              <span>Candlelight Dinner</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                name="anniversaryCake"
                                checked={formData.specialRequests.anniversaryCake}
                                onChange={handleSpecialRequestChange}
                                className="rounded text-green-600"
                              />
                              <span>Anniversary Cake</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                name="flowerDecor"
                                checked={formData.specialRequests.flowerDecor}
                                onChange={handleSpecialRequestChange}
                                className="rounded text-green-600"
                              />
                              <span>Flower Decoration</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                name="privateBoat"
                                checked={formData.specialRequests.privateBoat}
                                onChange={handleSpecialRequestChange}
                                className="rounded text-green-600"
                              />
                              <span>Private Boat</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                name="ayurvedaSession"
                                checked={formData.specialRequests.ayurvedaSession}
                                onChange={handleSpecialRequestChange}
                                className="rounded text-green-600"
                              />
                              <span>Ayurveda Session</span>
                            </label>
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                className="rounded text-green-600 opacity-0"
                                disabled
                              />
                              <input
                                type="text"
                                name="other"
                                value={formData.specialRequests.other}
                                onChange={handleSpecialRequestChange}
                                placeholder="Other requests"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                              />
                            </div>
                          </div>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="3"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                            placeholder="Any additional information or requests..."
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