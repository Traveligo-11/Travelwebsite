import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaStar, FaCalendarAlt, FaHome, FaUmbrella, FaUtensils, 
  FaChevronDown, FaTimes, FaPhone, FaEnvelope, FaMapMarkerAlt, 
  FaPlus, FaMinus, FaMountain, FaWater, FaTree
} from 'react-icons/fa';
import { GiWaterfall, GiVillage, GiCaveEntrance, GiRiver } from 'react-icons/gi';
import { MdOutlineHiking, MdLandscape, MdFamilyRestroom } from 'react-icons/md';
import { IoMdRainy } from 'react-icons/io';
import emailjs from '@emailjs/browser';

const Meghalaya = () => {
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
    accommodationType: 'homestay',
    mealsIncluded: 'yes',
    budget: '',
    specialRequests: {
      trekking: false,
      caveExploration: false,
      livingRootBridges: false,
      culturalExperience: false,
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
      title: "Meghalaya Nature Explorer",
      duration: "6 Days / 5 Nights",
      price: "₹28,999",
      rating: 4.8,
      image: "/images/Meghaliya1.webp",
      type: "adventure",
      highlights: [
        "Visit Cherrapunji - one of the wettest places on Earth",
        "Explore living root bridges in Nongriat",
        "Trek to Double Decker Living Root Bridge",
        "Visit Mawlynnong - Asia's cleanest village",
        "See the majestic Nohkalikai Falls"
      ],
      icon: <FaTree className="text-2xl text-green-600" />
    },
    {
      id: 2,
      title: "Meghalaya Monsoon Magic",
      duration: "5 Days / 4 Nights",
      price: "₹24,999",
      rating: 4.7,
      image: "/images/Meghalaya2.jpeg",
      type: "monsoon",
      highlights: [
        "Experience Meghalaya in full monsoon glory",
        "Stay in traditional Khasi homes",
        "Visit numerous waterfalls at their peak",
        "Explore misty valleys and clouds touching mountains",
        "Taste local monsoon delicacies"
      ],
      icon: <IoMdRainy className="text-2xl text-blue-400" />
    },
    {
      id: 3,
      title: "Meghalaya Cave Adventure",
      duration: "4 Days / 3 Nights",
      price: "₹22,999",
      rating: 4.6,
      image: "/images/Meghalaya3.jpeg",
      type: "adventure",
      highlights: [
        "Explore Mawsmai Cave - the most famous cave",
        "Adventure caving in Krem Liat Prah",
        "Visit Arwah Cave with its fossil remains",
        "Learn about cave formations and geology",
        "Guided by local caving experts"
      ],
      icon: <GiCaveEntrance className="text-2xl text-amber-700" />
    },
    {
      id: 4,
      title: "Cultural Meghalaya",
      duration: "7 Days / 6 Nights",
      price: "₹32,999",
      rating: 4.5,
      image: "/images/Meghalaya4.jpg",
      type: "culture",
      highlights: [
        "Stay with Khasi and Garo families",
        "Participate in local festivals",
        "Traditional cooking classes",
        "Visit sacred forests and learn about indigenous beliefs",
        "Cultural performances and folk dances"
      ],
      icon: <GiVillage className="text-2xl text-amber-600" />
    }
  ];

  const galleryImages = [
   "/images/Meghaliya1.webp",
    "/images/Meghalaya2.jpeg",
    "/images/Meghalaya3.jpeg",
    "/images/Meghalaya4.jpg",
    "/images/Meghalaya5.jpeg",
    "/images/Meghalaya6.jpeg",
    "/images/Meghalaya7.jpeg",
    "/images/Meghalaya8.jpeg",
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

    const specialRequests = [];
    if (formData.specialRequests.trekking) specialRequests.push("Trekking");
    if (formData.specialRequests.caveExploration) specialRequests.push("Cave Exploration");
    if (formData.specialRequests.livingRootBridges) specialRequests.push("Living Root Bridges");
    if (formData.specialRequests.culturalExperience) specialRequests.push("Cultural Experience");
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
      destination: "Meghalaya",
      arrivalDate: formData.arrivalDate,
      departureDate: formData.departureDate,
      adults: formData.adults,
      kids: formData.children,
      kidsAges: formData.childrenAges,
      accommodationType: formData.accommodationType === 'homestay' ? 'Homestay' : 
                       formData.accommodationType === 'hotel' ? 'Hotel' : 'Eco Resort',
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
      setFormData({
        name: '',
        email: '',
        phone: '',
        adults: 2,
        children: 0,
        childrenAges: '',
        arrivalDate: '',
        departureDate: '',
        accommodationType: 'homestay',
        mealsIncluded: 'yes',
        budget: '',
        specialRequests: {
          trekking: false,
          caveExploration: false,
          livingRootBridges: false,
          culturalExperience: false,
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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative h-96 md:h-screen max-h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src="/images/Meghaliya1.webp"
          alt="Meghalaya" 
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
              Discover the Abode of Clouds
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-white mb-8 drop-shadow-md"
            >
              Where waterfalls cascade, living bridges grow, and clouds kiss the mountains
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all hover:brightness-110"
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Meghalaya - Scotland of the East</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Meghalaya, meaning "abode of clouds", is a breathtaking northeastern state known for its lush green landscapes, cascading waterfalls, living root bridges, and rich indigenous cultures. The state offers a perfect blend of natural wonders and cultural experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <FaMountain className="text-4xl text-green-600" />,
              title: "Mountainous Terrain",
              desc: "Rolling hills, deep valleys, and the wettest places on Earth"
            },
            {
              icon: <GiWaterfall className="text-4xl text-blue-500" />,
              title: "Waterfall Wonderland",
              desc: "Countless waterfalls including Nohkalikai, India's tallest plunge waterfall"
            },
            {
              icon: <FaTree className="text-4xl text-green-700" />,
              title: "Living Architecture",
              desc: "Unique living root bridges crafted by the Khasi and Jaintia tribes"
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center border border-gray-100 hover:border-green-200"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-green-50 rounded-full">
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
      <section id="packages" className="py-16 px-4 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Meghalaya Tour Packages</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose from our carefully curated packages that showcase the best of Meghalaya, from adventurous treks to cultural immersions.
            </p>
          </div>

          {/* Package Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              { id: 'all', label: 'All Packages' },
              { id: 'adventure', label: 'Adventure' },
              { id: 'monsoon', label: 'Monsoon Special' },
              { id: 'culture', label: 'Cultural' }
            ].map(tab => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-green-300'
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
                    <div className="bg-green-600/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {pkg.duration}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800">{pkg.title}</h3>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-green-600">{pkg.price}</span>
                      <span className="text-xs text-gray-500 ml-1">/person</span>
                    </div>
                  </div>

                  <div className="flex items-center mb-4">
                    <div className="mr-3 p-2 bg-green-100 rounded-lg">
                      {pkg.icon}
                    </div>
                    <div className="text-sm text-gray-600">
                      {pkg.type === 'adventure' && 'Adventure Tour'}
                      {pkg.type === 'monsoon' && 'Monsoon Special'}
                      {pkg.type === 'culture' && 'Cultural Experience'}
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
                              <span className="text-green-500 mr-2">✓</span>
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
                      className="text-green-600 hover:text-green-800 font-medium flex items-center transition-colors"
                    >
                      {expandedPackage === pkg.id ? 'Show Less' : 'View Highlights'}
                      <FaChevronDown className={`ml-2 transition-transform ${expandedPackage === pkg.id ? 'rotate-180' : ''}`} />
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2 rounded-lg font-medium shadow-md hover:shadow-lg"
                      onClick={() => openBookingModal(pkg)}
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
      <section className="py-16 px-4 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Glimpses of Meghalaya</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Witness the breathtaking beauty of Meghalaya through these stunning visuals that capture its essence.
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
                  alt={`Meghalaya ${index + 1}`} 
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Choose Our Meghalaya Tours?</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-6 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <GiVillage className="text-4xl text-green-600" />,
                title: "Local Expertise",
                desc: "Our guides are Meghalaya natives who know every hidden trail and secret spot"
              },
              {
                icon: <FaTree className="text-4xl text-blue-500" />,
                title: "Eco-Tourism Focus",
                desc: "Sustainable tourism that supports local communities and preserves nature"
              },
              {
                icon: <MdOutlineHiking className="text-4xl text-green-700" />,
                title: "Adventure Specialists",
                desc: "Expert-led treks and cave explorations with top safety standards"
              },
              {
                icon: <GiRiver className="text-4xl text-blue-400" />,
                title: "Cultural Immersion",
                desc: "Authentic experiences with Khasi, Garo and Jaintia communities"
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
                  <div className="p-3 bg-green-50 rounded-full">
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

      {/* Booking Modal */}
      <AnimatePresence>
        {isBookingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="absolute inset-0 bg-[url('/images/Meghalaya5.jpg')] bg-cover bg-center opacity-20 rounded-2xl"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
                <button
                  onClick={closeBookingModal}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10 transition-colors bg-white rounded-full p-2 shadow-md"
                >
                  <FaTimes className="text-xl" />
                </button>

                <div className="grid md:grid-cols-2">
                  {/* Package Info Side */}
                  <div className="p-8 bg-gradient-to-b from-green-600 to-blue-700 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/images/Meghalaya5.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold mb-2">{selectedPackage.title}</h3>
                      <div className="flex items-center mb-4">
                        <div className="bg-white/20 px-3 py-1 rounded-full text-sm mr-3">
                          {selectedPackage.duration}
                        </div>
                        <div className="flex items-center">
                          <FaStar className="text-yellow-300 mr-1" />
                          <span>{selectedPackage.rating}</span>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-bold mb-2">Package Highlights:</h4>
                        <ul className="space-y-2">
                          {selectedPackage.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-yellow-300 mr-2">✓</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/20">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Package Price:</span>
                          <span className="text-2xl font-bold">{selectedPackage.price}</span>
                        </div>
                        <div className="text-sm opacity-80 mt-1">per person (excluding flights)</div>
                      </div>

                      <div className="mt-6 space-y-3">
                        <div className="flex items-center">
                          <FaPhone className="mr-3 opacity-80" />
                          <span>+91 9796337997</span>
                        </div>
                        <div className="flex items-center">
                          <FaEnvelope className="mr-3 opacity-80" />
                          <span>info@traveligo.in</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form Side */}
                  <div className="p-8 bg-white/90 backdrop-blur-sm">
                    {submitSuccess ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-8 h-full flex flex-col items-center justify-center"
                      >
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Booking Request Sent!</h3>
                        <p className="text-gray-600 mb-6">We've received your request for <span className="font-semibold">{selectedPackage.title}</span>. Our travel expert will contact you within 24 hours to confirm your booking.</p>
                        <button
                          onClick={closeBookingModal}
                          className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg"
                        >
                          Close
                        </button>
                      </motion.div>
                    ) : (
                      <>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Reserve Your Spot</h3>
                        <p className="text-gray-600 mb-6">Secure your Meghalaya adventure today</p>
                        
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
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white/70"
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
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white/70"
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
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white/70"
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
                                <div className="w-full px-4 py-2 border-t border-b border-gray-300 text-center bg-white">
                                  {formData.adults}
                                </div>
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
                                <div className="w-full px-4 py-2 border-t border-b border-gray-300 text-center bg-white">
                                  {formData.children}
                                </div>
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
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white/70"
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
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white/70"
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
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white/70"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Accommodation *</label>
                              <select
                                name="accommodationType"
                                value={formData.accommodationType}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white/70"
                              >
                                <option value="homestay">Homestay</option>
                                <option value="hotel">Hotel</option>
                                <option value="resort">Eco Resort</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Meals Included *</label>
                              <select
                                name="mealsIncluded"
                                value={formData.mealsIncluded}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white/70"
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
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white/70"
                              placeholder="e.g. ₹25,000 - ₹35,000"
                            />
                          </div>

                          <div className="bg-green-50/70 p-4 rounded-lg border border-green-100">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests</label>
                            <div className="grid grid-cols-2 gap-3 mb-3">
                              <label className="flex items-center space-x-2 bg-white p-3 rounded-lg border border-gray-200 hover:border-green-300 transition-colors">
                                <input
                                  type="checkbox"
                                  name="trekking"
                                  checked={formData.specialRequests.trekking}
                                  onChange={handleSpecialRequestChange}
                                  className="rounded text-green-600"
                                />
                                <span>Trekking</span>
                              </label>
                              <label className="flex items-center space-x-2 bg-white p-3 rounded-lg border border-gray-200 hover:border-green-300 transition-colors">
                                <input
                                  type="checkbox"
                                  name="caveExploration"
                                  checked={formData.specialRequests.caveExploration}
                                  onChange={handleSpecialRequestChange}
                                  className="rounded text-green-600"
                                />
                                <span>Cave Exploration</span>
                              </label>
                              <label className="flex items-center space-x-2 bg-white p-3 rounded-lg border border-gray-200 hover:border-green-300 transition-colors">
                                <input
                                  type="checkbox"
                                  name="livingRootBridges"
                                  checked={formData.specialRequests.livingRootBridges}
                                  onChange={handleSpecialRequestChange}
                                  className="rounded text-green-600"
                                />
                                <span>Living Root Bridges</span>
                              </label>
                              <label className="flex items-center space-x-2 bg-white p-3 rounded-lg border border-gray-200 hover:border-green-300 transition-colors">
                                <input
                                  type="checkbox"
                                  name="culturalExperience"
                                  checked={formData.specialRequests.culturalExperience}
                                  onChange={handleSpecialRequestChange}
                                  className="rounded text-green-600"
                                />
                                <span>Cultural Experience</span>
                              </label>
                            </div>
                            <input
                              type="text"
                              name="other"
                              value={formData.specialRequests.other}
                              onChange={handleSpecialRequestChange}
                              placeholder="Other requests"
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
                            <textarea
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              rows="3"
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white/70"
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
                                  : 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700'
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
              </div>
            </motion.div>
          </div>
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

export default Meghalaya;