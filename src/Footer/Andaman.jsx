import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaStar, FaCalendarAlt, FaHome, FaSwimmer, FaUtensils, 
  FaChevronDown, FaTimes, FaPhone, FaEnvelope, FaMapMarkerAlt, 
  FaPlus, FaMinus, FaUmbrellaBeach, FaWater, FaFish
} from 'react-icons/fa';
import { GiIsland, GiBoatFishing, GiCoral, GiSailboat } from 'react-icons/gi';
import { MdOutlineScubaDiving, MdBeachAccess, MdFamilyRestroom } from 'react-icons/md';
import { IoMdWater, IoMdHeart } from 'react-icons/io';
import emailjs from '@emailjs/browser';

const Andaman = () => {
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
    accommodationType: 'resort',
    mealsIncluded: 'yes',
    budget: '',
    specialRequests: {
      scubaDiving: false,
      snorkeling: false,
      seaWalk: false,
      privateBoat: false,
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
      title: "Andaman Island Hopper",
      duration: "6 Days / 5 Nights",
      price: "₹32,999",
      rating: 4.8,
      image: "/images/Andaman1.avif",
      type: "adventure",
      highlights: [
        "Visit Radhanagar Beach (Asia's best beach)",
        "Snorkeling at Elephant Beach",
        "Cellular Jail light and sound show",
        "Excursion to Ross Island",
        "Glass bottom boat ride at North Bay"
      ],
      icon: <GiIsland className="text-2xl text-blue-500" />
    },
    {
      id: 2,
      title: "Andaman Honeymoon Special",
      duration: "7 Days / 6 Nights",
      price: "₹45,999",
      rating: 4.9,
      image: "/images/Andaman2.jpeg",
      type: "romantic",
      highlights: [
        "Private beachfront cottage stay",
        "Romantic candlelight dinner",
        "Couple spa session",
        "Sunset cruise",
        "Private island picnic"
      ],
      icon: <IoMdHeart className="text-2xl text-pink-500" />
    },
    {
      id: 3,
      title: "Scuba Diving Adventure",
      duration: "5 Days / 4 Nights",
      price: "₹38,999",
      rating: 4.7,
      image: "/images/Andaman3.jpg",
      type: "adventure",
      highlights: [
        "PADI certified diving instructors",
        "2 open water dives included",
        "Underwater photography session",
        "Visit to Mahatma Gandhi Marine Park",
        "Dive at famous sites like Dixon's Pinnacle"
      ],
      icon: <MdOutlineScubaDiving className="text-2xl text-blue-700" />
    },
    {
      id: 4,
      title: "Family Beach Vacation",
      duration: "8 Days / 7 Nights",
      price: "₹52,999",
      rating: 4.6,
      image: "/images/Andaman4.jpeg",
      type: "family",
      highlights: [
        "Kid-friendly resorts with pools",
        "Glass bottom boat rides",
        "Light and sound show",
        "Chidiya Tapu sunset views",
        "Jolly Buoy Island excursion"
      ],
      icon: <MdFamilyRestroom className="text-2xl text-teal-500" />
    }
  ];

  const galleryImages = [
    "/images/Andaman1.avif",
    "/images/Andaman2.jpeg",
    "/images/Andaman3.jpg",
    "/images/Andaman4.jpeg",
    "/images/Andaman5.avif",
    "/images/Andaman6.jpeg",
    "/images/Andaman7.jpg",
    "/images/Andaman8.jpeg",
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
    if (formData.specialRequests.scubaDiving) specialRequests.push("Scuba Diving");
    if (formData.specialRequests.snorkeling) specialRequests.push("Snorkeling");
    if (formData.specialRequests.seaWalk) specialRequests.push("Sea Walk");
    if (formData.specialRequests.privateBoat) specialRequests.push("Private Boat");
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
      destination: "Andaman and Nicobar Islands",
      arrivalDate: formData.arrivalDate,
      departureDate: formData.departureDate,
      adults: formData.adults,
      kids: formData.children,
      kidsAges: formData.childrenAges,
      accommodationType: formData.accommodationType === 'resort' ? 'Resort' : 
                       formData.accommodationType === 'hotel' ? 'Hotel' : 'Beach Hut',
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
        accommodationType: 'resort',
        mealsIncluded: 'yes',
        budget: '',
        specialRequests: {
          scubaDiving: false,
          snorkeling: false,
          seaWalk: false,
          privateBoat: false,
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-teal-50">
      {/* Hero Section */}
      <div className="relative h-screen max-h-[100vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/70 z-10"></div>
        <img 
          src="/images/Andaman1.avif"
          alt="Andaman Islands" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center z-20 px-4">
          <div className="text-center max-w-4xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 font-serif drop-shadow-lg"
            >
              Andaman Islands
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl text-white mb-8 font-light drop-shadow-md"
            >
              Where turquoise waters meet pristine white sands
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-10 py-5 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all text-lg hover:brightness-110"
              onClick={() => document.getElementById('packages').scrollIntoView({ behavior: 'smooth' })}
            >
              Discover Island Paradise
            </motion.button>
          </div>
        </div>
        <div className="absolute bottom-10 left-0 right-0 flex justify-center z-20">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-white text-4xl"
          >
            <FaChevronDown />
          </motion.div>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 font-serif">Tropical Island Paradise</h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-teal-500 to-blue-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            The Andaman and Nicobar Islands are a breathtaking archipelago in the Bay of Bengal known for their palm-fringed white sand beaches, crystal clear waters, and vibrant coral reefs. This tropical paradise offers the perfect blend of relaxation and adventure.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: <GiIsland className="text-5xl text-blue-500" />,
              title: "Island Beauty",
              desc: "Home to some of the world's most beautiful beaches with powdery white sand and swaying palm trees"
            },
            {
              icon: <GiCoral className="text-5xl text-teal-600" />,
              title: "Marine Wonderland",
              desc: "Vibrant coral reefs teeming with colorful fish, sea turtles, and exotic marine life"
            },
            {
              icon: <MdOutlineScubaDiving className="text-5xl text-blue-700" />,
              title: "Adventure Activities",
              desc: "World-class scuba diving, snorkeling, sea walking, kayaking and more"
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all text-center border border-gray-100"
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-blue-50 rounded-full">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Andaman Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "572", label: "Islands", icon: <GiIsland className="text-3xl mx-auto mb-3" /> },
              { number: "150+", label: "Dive Sites", icon: <MdOutlineScubaDiving className="text-3xl mx-auto mb-3" /> },
              { number: "50+", label: "Beaches", icon: <FaUmbrellaBeach className="text-3xl mx-auto mb-3" /> },
              { number: "100%", label: "Marine Park", icon: <GiCoral className="text-3xl mx-auto mb-3" /> }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6"
              >
                {stat.icon}
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 px-4 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-100 rounded-full opacity-20"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-teal-100 rounded-full opacity-20"></div>
        
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 font-serif">Andaman Tour Packages</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-teal-500 to-blue-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Immerse yourself in Andaman's magic with our carefully curated experiences that showcase the islands' natural beauty and adventure opportunities.
            </p>
          </div>

          {/* Package Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              { id: 'all', label: 'All Packages', icon: <FaStar className="mr-2" /> },
              { id: 'adventure', label: 'Adventure', icon: <MdOutlineScubaDiving className="mr-2" /> },
              { id: 'romantic', label: 'Honeymoon', icon: <IoMdHeart className="mr-2" /> },
              { id: 'family', label: 'Family', icon: <MdFamilyRestroom className="mr-2" /> }
            ].map(tab => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-medium transition-all flex items-center ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Package Cards */}
          <div className="grid md:grid-cols-2 gap-10">
            {filteredPackages.map(pkg => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-gray-100 group"
              >
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center text-amber-600 font-bold shadow-sm">
                    <FaStar className="mr-1" />
                    {pkg.rating}
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-blue-600/90 text-white px-4 py-1 rounded-full text-sm font-medium shadow-md">
                      {pkg.duration}
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">{pkg.title}</h3>
                    <div className="flex items-center">
                      <span className="text-3xl font-bold text-blue-600">{pkg.price}</span>
                      <span className="text-xs text-gray-500 ml-1">/person</span>
                    </div>
                  </div>

                  <div className="flex items-center mb-6">
                    <div className="mr-4 p-3 bg-blue-100 rounded-xl shadow-inner">
                      {pkg.icon}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {pkg.type === 'adventure' && 'Adventure Expedition'}
                      {pkg.type === 'romantic' && 'Honeymoon Special'}
                      {pkg.type === 'family' && 'Family Vacation'}
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedPackage === pkg.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mb-6 overflow-hidden"
                      >
                        <ul className="space-y-3 pl-2">
                          {pkg.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-blue-500 mr-3 text-lg">✓</span>
                              <span className="text-gray-700">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex justify-between items-center pt-6 border-t border-gray-100">
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
                      className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-3 rounded-xl font-medium shadow-md hover:shadow-lg"
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
      <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-teal-100 rounded-full opacity-20"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-100 rounded-full opacity-20"></div>
        
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 font-serif">Glimpses of Andaman</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-teal-500 to-blue-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Witness the breathtaking beauty of Andaman through these stunning visuals that capture its essence.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="relative rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all group"
                onClick={() => openImageModal(image)}
              >
                <img 
                  src={image} 
                  alt={`Andaman ${index + 1}`} 
                  className="w-full h-48 md:h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-black/10 hover:from-black/50 transition-colors"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-white relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-100 rounded-full opacity-20"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-teal-100 rounded-full opacity-20"></div>
        
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 font-serif">Why Choose Our Andaman Tours?</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-teal-500 to-blue-500 mx-auto mb-8 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <GiSailboat className="text-5xl text-blue-500" />,
                title: "Local Expertise",
                desc: "Our guides are Andaman experts who know every hidden beach and secret spot",
                bg: "bg-blue-50",
                border: "border-blue-100"
              },
              {
                icon: <FaFish className="text-5xl text-teal-600" />,
                title: "Responsible Tourism",
                desc: "We ensure minimal environmental impact and support local communities",
                bg: "bg-teal-50",
                border: "border-teal-100"
              },
              {
                icon: <FaWater className="text-5xl text-blue-700" />,
                title: "Safety First",
                desc: "All water activities conducted by certified professionals with top equipment",
                bg: "bg-blue-50",
                border: "border-blue-100"
              },
              {
                icon: <MdBeachAccess className="text-5xl text-amber-500" />,
                title: "Customizable Itineraries",
                desc: "Tailor your trip to match your interests and pace",
                bg: "bg-amber-50",
                border: "border-amber-100"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className={`p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border ${item.bg} ${item.border}`}
              >
                <div className="text-5xl mb-6 flex justify-center">
                  <div className="p-3 bg-white rounded-full shadow-inner">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-center">{item.desc}</p>
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
              className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="absolute inset-0 bg-[url('/images/Andaman5.avif')] bg-cover bg-center opacity-20 rounded-2xl"></div>
              <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
                <button
                  onClick={closeBookingModal}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10 transition-colors bg-white rounded-full p-2 shadow-md"
                >
                  <FaTimes className="text-xl" />
                </button>

                <div className="grid lg:grid-cols-2">
                  {/* Package Info Side */}
                  <div className="p-10 bg-gradient-to-b from-blue-600 to-teal-700 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/images/Andaman5.avif')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                    <div className="relative z-10 h-full flex flex-col">
                      <div>
                        <h3 className="text-3xl font-bold mb-4">{selectedPackage.title}</h3>
                        <div className="flex items-center mb-6">
                          <div className="bg-white/20 px-4 py-1 rounded-full text-sm mr-4">
                            {selectedPackage.duration}
                          </div>
                          <div className="flex items-center">
                            <FaStar className="text-yellow-300 mr-1" />
                            <span>{selectedPackage.rating}</span>
                          </div>
                        </div>

                        <div className="mb-8">
                          <h4 className="font-bold text-xl mb-4">Package Highlights:</h4>
                          <ul className="space-y-3">
                            {selectedPackage.highlights.map((highlight, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-yellow-300 mr-3 text-xl">•</span>
                                <span className="text-lg">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-auto">
                        <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-lg">Package Price:</span>
                            <span className="text-3xl font-bold">{selectedPackage.price}</span>
                          </div>
                          <div className="text-sm opacity-80 mt-1">per person (excluding flights)</div>
                        </div>

                        <div className="mt-8 space-y-4">
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
                  </div>

                  {/* Form Side */}
                  <div className="p-10 bg-white/95 backdrop-blur-sm">
                    {submitSuccess ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center h-full flex flex-col items-center justify-center py-10"
                      >
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8">
                          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800 mb-4">Booking Request Sent!</h3>
                        <p className="text-gray-600 mb-8 text-lg">We've received your request for <span className="font-semibold">{selectedPackage.title}</span>. Our travel expert will contact you within 24 hours to confirm your booking.</p>
                        <button
                          onClick={closeBookingModal}
                          className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all text-lg"
                        >
                          Close
                        </button>
                      </motion.div>
                    ) : (
                      <>
                        <h3 className="text-3xl font-bold text-gray-800 mb-2">Reserve Your Spot</h3>
                        <p className="text-xl text-gray-600 mb-8">Begin your Andaman adventure today</p>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/90"
                                placeholder="Your name"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/90"
                                placeholder="your@email.com"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/90"
                              placeholder="+91 9876543210"
                            />
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Adults *</label>
                              <div className="flex items-center">
                                <button
                                  type="button"
                                  onClick={decrementAdults}
                                  className="bg-gray-200 text-gray-700 px-4 py-3 rounded-l-xl hover:bg-gray-300 transition-colors"
                                >
                                  <FaMinus />
                                </button>
                                <div className="w-full px-5 py-3 border-t border-b border-gray-300 text-center bg-white font-medium">
                                  {formData.adults}
                                </div>
                                <button
                                  type="button"
                                  onClick={incrementAdults}
                                  className="bg-gray-200 text-gray-700 px-4 py-3 rounded-r-xl hover:bg-gray-300 transition-colors"
                                >
                                  <FaPlus />
                                </button>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Children</label>
                              <div className="flex items-center">
                                <button
                                  type="button"
                                  onClick={decrementChildren}
                                  className="bg-gray-200 text-gray-700 px-4 py-3 rounded-l-xl hover:bg-gray-300 transition-colors"
                                >
                                  <FaMinus />
                                </button>
                                <div className="w-full px-5 py-3 border-t border-b border-gray-300 text-center bg-white font-medium">
                                  {formData.children}
                                </div>
                                <button
                                  type="button"
                                  onClick={incrementChildren}
                                  className="bg-gray-200 text-gray-700 px-4 py-3 rounded-r-xl hover:bg-gray-300 transition-colors"
                                >
                                  <FaPlus />
                                </button>
                              </div>
                            </div>
                          </div>

                          {formData.children > 0 && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Children Ages (comma separated)</label>
                              <input
                                type="text"
                                name="childrenAges"
                                value={formData.childrenAges}
                                onChange={handleChange}
                                placeholder="e.g. 5, 8, 12"
                                className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/90"
                              />
                            </div>
                          )}

                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Arrival Date *</label>
                              <input
                                type="date"
                                name="arrivalDate"
                                value={formData.arrivalDate}
                                onChange={handleChange}
                                required
                                className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/90"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Departure Date *</label>
                              <input
                                type="date"
                                name="departureDate"
                                value={formData.departureDate}
                                onChange={handleChange}
                                required
                                className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/90"
                              />
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Accommodation *</label>
                              <select
                                name="accommodationType"
                                value={formData.accommodationType}
                                onChange={handleChange}
                                required
                                className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/90"
                              >
                                <option value="resort">Beach Resort</option>
                                <option value="hotel">Hotel</option>
                                <option value="hut">Beach Hut</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Meals Included *</label>
                              <select
                                name="mealsIncluded"
                                value={formData.mealsIncluded}
                                onChange={handleChange}
                                required
                                className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/90"
                              >
                                <option value="yes">Yes (Full Board)</option>
                                <option value="no">No (Breakfast Only)</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Approximate Budget (without flights)</label>
                            <input
                              type="text"
                              name="budget"
                              value={formData.budget}
                              onChange={handleChange}
                              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/90"
                              placeholder="e.g. ₹30,000 - ₹40,000"
                            />
                          </div>

                          <div className="bg-blue-50/80 p-6 rounded-xl border border-blue-100">
                            <label className="block text-lg font-medium text-gray-700 mb-4">Special Requests</label>
                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                              <label className="flex items-center space-x-3 bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="scubaDiving"
                                  checked={formData.specialRequests.scubaDiving}
                                  onChange={handleSpecialRequestChange}
                                  className="rounded text-blue-600 h-5 w-5"
                                />
                                <span>Scuba Diving</span>
                              </label>
                              <label className="flex items-center space-x-3 bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="snorkeling"
                                  checked={formData.specialRequests.snorkeling}
                                  onChange={handleSpecialRequestChange}
                                  className="rounded text-blue-600 h-5 w-5"
                                />
                                <span>Snorkeling</span>
                              </label>
                              <label className="flex items-center space-x-3 bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="seaWalk"
                                  checked={formData.specialRequests.seaWalk}
                                  onChange={handleSpecialRequestChange}
                                  className="rounded text-blue-600 h-5 w-5"
                                />
                                <span>Sea Walk</span>
                              </label>
                              <label className="flex items-center space-x-3 bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="privateBoat"
                                  checked={formData.specialRequests.privateBoat}
                                  onChange={handleSpecialRequestChange}
                                  className="rounded text-blue-600 h-5 w-5"
                                />
                                <span>Private Boat</span>
                              </label>
                            </div>
                            <input
                              type="text"
                              name="other"
                              value={formData.specialRequests.other}
                              onChange={handleSpecialRequestChange}
                              placeholder="Other requests"
                              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Information</label>
                            <textarea
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              rows="4"
                              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/90"
                              placeholder="Any additional information or requests..."
                            ></textarea>
                          </div>

                          <div className="pt-4">
                            <motion.button
                              type="submit"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              disabled={isSubmitting}
                              className={`w-full py-5 px-6 rounded-xl font-bold text-white shadow-lg hover:shadow-xl transition-all text-lg ${
                                isSubmitting
                                  ? 'bg-gray-400'
                                  : 'bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700'
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

export default Andaman;