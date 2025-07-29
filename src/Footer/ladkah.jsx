import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaChevronDown, FaTimes, FaCamera, FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaUsers, FaChild, FaHotel, FaUtensils, FaWallet, FaMapMarkerAlt, FaMotorcycle, FaMountain } from 'react-icons/fa';
import { GiWoodCabin } from 'react-icons/gi';
import { BiHappyHeartEyes, BiTrip } from 'react-icons/bi';
import { IoIosSnow } from 'react-icons/io';
import emailjs from 'emailjs-com';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Ladakh = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedPackage, setExpandedPackage] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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

  // Hero image slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === ladakhHeroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const ladakhHeroImages = [
    "/images/ladakh1.jpeg",
    "/images/ladakh2.jpeg",
    "/images/ladakh3.jpeg",
    "/images/ladakh4.jpeg"
  ];

  const packages = [
    {
      id: 1,
      title: "Classic Ladakh Adventure",
      duration: "7 Days / 6 Nights",
      price: "₹28,999",
      rating: 4.8,
      image: "/images/ladakh1.jpeg",
      type: "classic",
      highlights: [
        "Explore Leh Palace & monasteries",
        "Visit Pangong Tso Lake",
        "Nubra Valley with Bactrian camel ride",
        "Khardung La pass (World's highest motorable road)",
        "Traditional Ladakhi cultural evening"
      ],
      description: "The perfect introduction to Ladakh covering all major attractions with comfortable stays.",
      icon: <FaMapMarkerAlt className="text-2xl text-amber-500" />,
      specialFeature: "Exclusive monastery meditation session",
      bestFor: "First-time visitors",
      difficulty: "Moderate"
    },
    {
      id: 2,
      title: "Ladakh Bike Expedition",
      duration: "10 Days / 9 Nights",
      price: "₹42,999",
      rating: 4.9,
      image: "/images/ladakh2.jpeg",
      type: "biking",
      highlights: [
        "Royal Enfield Himalayan bikes",
        "Ride through 5 high-altitude passes",
        "Mechanic support throughout",
        "Backup vehicle for emergencies",
        "Special biking gear provided"
      ],
      description: "For biking enthusiasts looking to conquer the challenging Himalayan roads.",
      icon: <FaMotorcycle className="text-2xl text-amber-500" />,
      specialFeature: "Personalized biking certificate",
      bestFor: "Adventure seekers",
      difficulty: "Challenging"
    },
    {
      id: 3,
      title: "Winter Ladakh Special",
      duration: "6 Days / 5 Nights",
      price: "₹34,999",
      rating: 4.7,
      image: "/images/ladakh3.jpeg",
      type: "winter",
      highlights: [
        "Chadar Trek preparation",
        "Frozen Zanskar River experience",
        "Ice hockey on frozen lakes",
        "Stay in heated traditional homestays",
        "Winter photography workshop"
      ],
      description: "Experience Ladakh's magical winter landscape with unique frozen river adventures.",
      icon: <IoIosSnow className="text-2xl text-amber-500" />,
      specialFeature: "Thermal gear rental included",
      bestFor: "Winter enthusiasts",
      difficulty: "Extreme"
    },
    {
      id: 4,
      title: "Ladakh Photography Tour",
      duration: "8 Days / 7 Nights",
      price: "₹38,999",
      rating: 4.9,
      image: "/images/ladakh4.jpeg",
      type: "photography",
      highlights: [
        "Golden hour at Pangong Lake",
        "Monastery architecture sessions",
        "Portrait photography with locals",
        "Night sky/astrophotography",
        "Professional photography guide"
      ],
      description: "Designed for photography enthusiasts to capture Ladakh's stunning landscapes.",
      icon: <FaCamera className="text-2xl text-amber-500" />,
      specialFeature: "Photo editing workshop included",
      bestFor: "Photography lovers",
      difficulty: "Easy"
    },
    {
      id: 5,
      title: "Ladakh Luxury Retreat",
      duration: "6 Days / 5 Nights",
      price: "₹52,999",
      rating: 5.0,
      image: "/images/ladakh5.jpeg",
      type: "luxury",
      highlights: [
        "5-star boutique hotels",
        "Private helicopter tours",
        "Personalized Buddhist monastery visits",
        "Gourmet Ladakhi cuisine",
        "Spa with traditional therapies"
      ],
      description: "Experience Ladakh in ultimate comfort with exclusive access and premium services.",
      icon: <GiWoodCabin className="text-2xl text-amber-500" />,
      specialFeature: "Private butler service",
      bestFor: "Luxury travelers",
      difficulty: "Easy"
    },
    {
      id: 6,
      title: "Ladakh Trekking Expedition",
      duration: "12 Days / 11 Nights",
      price: "₹45,999",
      rating: 4.9,
      image: "/images/ladakh6.jpeg",
      type: "trekking",
      highlights: [
        "Markha Valley Trek",
        "Camping under starry skies",
        "Local guide and porters",
        "Visit remote Himalayan villages",
        "High-altitude acclimatization"
      ],
      description: "For adventure seekers wanting to explore Ladakh's breathtaking trails.",
      icon: <FaMountain className="text-2xl text-amber-500" />,
      specialFeature: "Personalized trekking certificate",
      bestFor: "Hiking enthusiasts",
      difficulty: "Difficult"
    }
  ];

  const ladakhImages = [
    "/images/ladakh1.jpeg",
    "/images/ladakh2.jpeg",
    "/images/ladakh3.jpeg",
    "/images/ladakh4.jpeg",
    "/images/ladakh5.jpeg",
    "/images/ladakh6.jpeg",
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
         'service_ov629rm',
        'template_jr1dnto',
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Slideshow - Updated Gradient */}
      <div className="relative h-screen max-h-[800px] overflow-hidden">
        <div className="absolute inset-0">
          <AnimatePresence mode='wait'>
            <motion.img
              key={currentImageIndex}
              src={ladakhHeroImages[currentImageIndex]}
              alt="Ladakh Landscape"
              className="w-full h-full object-cover object-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            />
          </AnimatePresence>
          {/* Updated gradient overlay - more subtle */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/40 to-gray-900/30"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pt-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white text-sm font-semibold py-2 px-6 rounded-full mb-6 border border-white/30">
              <FaMountain className="mr-2 text-amber-300" /> LAND OF HIGH PASSES
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-serif relative z-10 px-8 py-4">
              <span className="block">Discover</span>
              <span className="text-amber-200">Ladakh</span>
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-amber-100 max-w-2xl mx-auto mb-8"
          >
            Where rugged mountains meet serene monasteries in India's most adventurous destination
          </motion.p>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: 'spring' }}
            className="flex gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-amber-600 px-8 py-3 rounded-full font-bold shadow-lg"
              onClick={() => setShowBookingForm(true)}
            >
              Book Now
            </motion.button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-12 left-0 right-0 flex justify-center"
          >
            <div className="animate-bounce text-amber-200 text-2xl">
              <FaChevronDown />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Special Features Ribbon with Parallax Effect */}
      <motion.div 
        className="bg-gradient-to-r from-amber-600 to-red-600 py-8 px-6 text-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {[
              { icon: <FaMotorcycle className="text-2xl" />, text: "Bike Expeditions" },
              { icon: <FaCamera className="text-2xl" />, text: "Photography Tours" },
              { icon: <FaMountain className="text-2xl" />, text: "Trekking Adventures" },
              { icon: <GiWoodCabin className="text-2xl" />, text: "Luxury Stays" },
              { icon: <FaMapMarkerAlt className="text-2xl" />, text: "Cultural Experiences" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex flex-col items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm"
              >
                {item.icon}
                <span className="text-sm md:text-base font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

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
          <div className="inline-block mb-4">
            <motion.div 
              className="w-16 h-1 bg-amber-500 mx-auto"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Ladakh Adventure Packages</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the magic of Ladakh with our specially curated packages featuring exclusive Himalayan experiences
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
          {['all', 'classic', 'biking', 'winter', 'photography', 'luxury', 'trekking'].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-3 rounded-full text-sm font-medium capitalize transition-all ${activeTab === tab 
                ? 'bg-gradient-to-r from-amber-500 to-red-600 text-white shadow-lg' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'}`}
            >
              {tab === 'all' ? 'All Packages' : tab.replace('-', ' ')}
            </motion.button>
          ))}
        </motion.div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  className={`bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 ${isExpanded ? 'ring-2 ring-amber-500' : ''}`}
                  whileHover={{ y: -5 }}
                  layout
                >
                  {/* Image with Floating Icon */}
                  <div className="relative h-60 overflow-hidden group">
                    <img 
                      src={pkg.image} 
                      alt={pkg.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-md">
                      {pkg.icon}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-white font-bold text-2xl">{pkg.title}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="bg-amber-600 text-white text-xs px-3 py-1 rounded-full">{pkg.price}</span>
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
                      <div className="flex items-center text-gray-500 text-sm">
                        <BiTrip className="mr-2" />
                        <span>{pkg.duration}</span>
                        <span className="mx-2">•</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          pkg.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                          pkg.difficulty === 'Moderate' ? 'bg-blue-100 text-blue-800' :
                          pkg.difficulty === 'Difficult' ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {pkg.difficulty}
                        </span>
                      </div>
                      <button
                        onClick={() => togglePackage(pkg.id)}
                        className="text-amber-600 font-medium hover:text-amber-700 transition-colors flex items-center text-sm"
                      >
                        {isExpanded ? 'Show Less' : 'View Details'} 
                        <FaChevronDown className={`ml-2 text-amber-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    <p className="text-gray-600 mb-4">{pkg.description}</p>

                    <div className="mb-4">
                      <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full mb-2">
                        Best for: {pkg.bestFor}
                      </span>
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
                          <div className="pt-4 border-t border-amber-100">
                            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                              <FaMapMarkerAlt className="text-amber-500 mr-2" /> Package Highlights:
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
                                  <span className="text-amber-500 mr-2">✓</span>
                                  <span className="text-gray-600">{highlight}</span>
                                </motion.li>
                              ))}
                            </ul>
                            
                            {/* Special Feature */}
                            <div className="bg-amber-50 rounded-lg p-4 mb-4 border border-amber-100">
                              <div className="flex items-center text-amber-700">
                                <BiHappyHeartEyes className="mr-2 text-xl" />
                                <span className="font-medium">Special Feature:</span>
                              </div>
                              <p className="mt-1 text-amber-600">{pkg.specialFeature}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button 
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full mt-4 bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                      onClick={() => handleBookNow(pkg)}
                    >
                      Book Ladakh Tour
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
            <div className="text-amber-500 text-6xl mb-4">
              <FaMountain />
            </div>
            <h3 className="text-2xl font-medium text-gray-700 mb-2">No packages found in this category</h3>
            <p className="text-gray-500 mb-6">Contact us to customize your perfect Ladakh itinerary</p>
            <button className="bg-gradient-to-r from-amber-500 to-red-600 text-white px-8 py-3 rounded-full font-medium hover:from-amber-600 hover:to-red-700 transition-all shadow-lg">
              Enquire About Ladakh Tours
            </button>
          </motion.div>
        )}
      </div>

      {/* Why Choose Us Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-amber-50 to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1581772136273-b6c9d02f58d5')] bg-cover bg-center"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Ladakh Adventures</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're not just tour operators - we're Ladakh enthusiasts who want to share our passion with you
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Local Expertise",
                description: "Our team has lived and worked in Ladakh for decades, giving you insider access",
                icon: "🧔",
                bg: "bg-amber-100",
                delay: 0.1
              },
              {
                title: "Safety First",
                description: "Comprehensive medical support, oxygen systems, and evacuation plans",
                icon: "🛡️",
                bg: "bg-red-100",
                delay: 0.2
              },
              {
                title: "Sustainable Tourism",
                description: "We support local communities and eco-friendly practices",
                icon: "🌱",
                bg: "bg-green-100",
                delay: 0.3
              },
              {
                title: "Small Groups",
                description: "Intimate experiences with max 12 travelers per group",
                icon: "👥",
                bg: "bg-blue-100",
                delay: 0.4
              },
              {
                title: "Customizable",
                description: "Tailor your itinerary to match your interests and pace",
                icon: "✏️",
                bg: "bg-purple-100",
                delay: 0.5
              },
              {
                title: "24/7 Support",
                description: "Dedicated trip coordinator available throughout your journey",
                icon: "📱",
                bg: "bg-indigo-100",
                delay: 0.6
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: feature.delay }}
                viewport={{ once: true }}
                className={`p-6 rounded-xl shadow-sm text-center border border-gray-100 ${feature.bg} hover:shadow-md transition-all`}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Ladakh Images Gallery */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Ladakh Through Our Lens</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A glimpse of the breathtaking landscapes and cultural wonders awaiting you
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ladakhImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-xl shadow-lg group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={image} 
                    alt={`Ladakh scenery ${index + 1}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Adventure Essentials Section */}
      <div className="bg-gradient-to-br from-amber-50 to-amber-100 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1581772136273-b6c9d02f58d5')] bg-cover bg-center"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Ladakh Adventure Essentials</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to know for your Himalayan adventure
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Acclimatization",
                description: "2-day mandatory acclimatization in Leh included in all packages",
                icon: "🏔️",
                delay: 0.1
              },
              {
                title: "Oxygen Support",
                description: "Oxygen cylinders available during high-altitude excursions",
                icon: "💨",
                delay: 0.2
              },
              {
                title: "Expert Guides",
                description: "Local Ladakhi guides with 10+ years experience",
                icon: "🧭",
                delay: 0.3
              },
              {
                title: "Permits Included",
                description: "We handle all required inner line permits",
                icon: "📝",
                delay: 0.4
              },
              {
                title: "Medical Kit",
                description: "Comprehensive first aid and altitude sickness medication",
                icon: "💊",
                delay: 0.5
              },
              {
                title: "Quality Gear",
                description: "Top-notch equipment for all activities",
                icon: "🎒",
                delay: 0.6
              },
              {
                title: "Eco Practices",
                description: "Leave No Trace principles on all treks",
                icon: "♻️",
                delay: 0.7
              },
              {
                title: "24/7 Support",
                description: "Emergency contact available throughout your trip",
                icon: "📞",
                delay: 0.8
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: item.delay }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-md transition-all"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Your Ladakh Adventure?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Contact us today to start planning your dream Himalayan journey
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-amber-600 px-8 py-3 rounded-full font-bold shadow-lg"
                onClick={() => setShowBookingForm(true)}
              >
                Book Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white px-8 py-3 rounded-full font-bold shadow-lg"
              >
                Get a Custom Quote
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 20 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <div className="sticky top-0 bg-gradient-to-r from-amber-600 to-red-600 p-4 flex justify-between items-center z-10">
              <h3 className="text-xl font-bold text-white">
                {selectedPackage ? `Book ${selectedPackage.title}` : 'Enquire About Ladakh Tours'}
              </h3>
              <button 
                onClick={() => setShowBookingForm(false)}
                className="text-white hover:text-amber-200 transition-colors"
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
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedPackage ? 'Booking Request Sent!' : 'Enquiry Sent!'}
                  </h4>
                  <p className="text-gray-600 mb-6">
                    {selectedPackage 
                      ? `We've received your booking request for ${selectedPackage.title}. Our adventure expert will contact you shortly to confirm your booking.`
                      : 'We\'ve received your enquiry. Our adventure expert will contact you shortly to discuss your Ladakh adventure.'}
                  </p>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`bg-gradient-to-r from-amber-600 to-red-600 text-white px-8 py-3 rounded-lg font-medium shadow-lg`}
                    onClick={() => setShowBookingForm(false)}
                  >
                    Close
                  </motion.button>
                </div>
              ) : (
                <>
                  {selectedPackage && (
                    <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-red-50 rounded-lg border border-amber-100">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-gray-900 text-lg">{selectedPackage.title}</h4>
                        <span className="font-bold text-amber-600 text-lg">{selectedPackage.price}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaCalendarAlt className="mr-2 text-amber-500" />
                        <span className="text-sm">{selectedPackage.duration}</span>
                      </div>
                    </div>
                  )}
                  
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
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                              required
                              placeholder=""
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
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                              required
                              placeholder=""
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
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
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
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
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
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
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
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
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
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
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
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
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
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
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
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
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
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        placeholder="Any special requirements or preferences (dietary needs, accessibility requirements, special occasions, etc.)"
                      ></textarea>
                    </div>
                    
                    {selectedPackage && (
                      <input type="hidden" name="package" value={selectedPackage.title} />
                    )}
                    
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`w-full bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white py-3 rounded-lg font-bold transition-all duration-200 shadow-lg`}
                    >
                      {selectedPackage ? 'Submit Booking Request' : 'Submit Enquiry'}
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

export default Ladakh;