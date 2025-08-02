import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaHeart, FaChevronDown, FaMountain, FaTimes, FaPlus, FaMinus } from 'react-icons/fa';
import { GiTeapot, GiTigerHead, GiMonumentValley } from 'react-icons/gi';
import { MdFamilyRestroom, MdTrain } from 'react-icons/md';
import { IoLeaf } from 'react-icons/io5';
import emailjs from '@emailjs/browser';

const GangtokDarjeeling = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedPackage, setExpandedPackage] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
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
    // ... (other package objects remain the same)
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
      // Prepare special requests text
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

      // Prepare the template parameters
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

      // Initialize EmailJS with your User ID
      emailjs.init('37pN2ThzFwwhwk7ai');
      
      // Send the email using EmailJS
      const response = await emailjs.send(
        'service_ov629rm',
        'template_jr1dnto',
        templateParams
      );

      console.log('Email sent successfully!', response);
      
      // Reset form
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
      
      // Close the form after 3 seconds
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
      {/* Hero Section and other sections remain the same until the Booking Form Modal */}

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
    </div>
  );
};

export default GangtokDarjeeling;