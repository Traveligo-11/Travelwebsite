import React, { useState, useEffect } from 'react';
import { 
  FiStar, FiFilter, FiChevronDown, FiX, FiMapPin, 
  FiWifi, FiCoffee, FiDroplet, FiHeart, FiClock, 
  FiUsers, FiCalendar, FiZap, FiEdit, FiMail,
  FiCreditCard, FiPhone, FiLock, FiUser, FiSearch,
  FiCheck, FiHome, FiUmbrella, FiTv, FiChevronLeft, 
  FiChevronRight, FiArrowRight
} from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import emailjs from '@emailjs/browser';

// Amenity icons configuration
const amenityIcons = {
  'Free WiFi': <FiWifi className="mr-2 text-pink-500 text-lg" />,
  'Pool': <FiDroplet className="mr-2 text-pink-500 text-lg" />,
  'Spa': <FiHeart className="mr-2 text-pink-500 text-lg" />,
  'Restaurant': <FiCoffee className="mr-2 text-pink-500 text-lg" />,
  'Parking': <FiHome className="mr-2 text-pink-500 text-lg" />,
  'Beachfront': <FiUmbrella className="mr-2 text-pink-500 text-lg" />,
  'Bar': <FiCoffee className="mr-2 text-pink-500 text-lg" />,
  'Fitness Center': <FiZap className="mr-2 text-pink-500 text-lg" />,
  'Room Service': <FiCheck className="mr-2 text-pink-500 text-lg" />,
  'Business Center': <FiEdit className="mr-2 text-pink-500 text-lg" />,
  'TV': <FiTv className="mr-2 text-pink-500 text-lg" />,
  'Air conditioning': <FiZap className="mr-2 text-pink-500 text-lg" />,
  'Minibar': <FiCoffee className="mr-2 text-pink-500 text-lg" />,
  'Safe': <FiLock className="mr-2 text-pink-500 text-lg" />,
  'Work desk': <FiEdit className="mr-2 text-pink-500 text-lg" />,
  'Balcony': <FiHome className="mr-2 text-pink-500 text-lg" />,
  'Sea view': <FiMapPin className="mr-2 text-pink-500 text-lg" />,
  'Lake view': <FiMapPin className="mr-2 text-pink-500 text-lg" />,
  'Private pool': <FiDroplet className="mr-2 text-pink-500 text-lg" />,
  'Butler service': <FiUser className="mr-2 text-pink-500 text-lg" />,
  'Jacuzzi': <FiDroplet className="mr-2 text-pink-500 text-lg" />,
  'Dining table': <FiCoffee className="mr-2 text-pink-500 text-lg" />,
  'Premium toiletries': <FiCheck className="mr-2 text-pink-500 text-lg" />,
  'Separate living area': <FiHome className="mr-2 text-pink-500 text-lg" />,
  'Club lounge access': <FiStar className="mr-2 text-pink-500 text-lg" />,
  'Private terrace': <FiHome className="mr-2 text-pink-500 text-lg" />,
  'Personal butler': <FiUser className="mr-2 text-pink-500 text-lg" />,
  'Dining room': <FiCoffee className="mr-2 text-pink-500 text-lg" />,
  'Study': <FiEdit className="mr-2 text-pink-500 text-lg" />,
  'Yoga Classes': <FiHeart className="mr-2 text-pink-500 text-lg" />,
  'Boat Ride': <FiDroplet className="mr-2 text-pink-500 text-lg" />,
  'Concierge': <FiUser className="mr-2 text-pink-500 text-lg" />,
  'Airport Shuttle': <FiHome className="mr-2 text-pink-500 text-lg" />
};

const Hotels = () => {
  // State management
  const [sortBy, setSortBy] = useState('price');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date(Date.now() + 86400000));
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailForm, setEmailForm] = useState({
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [emailSent, setEmailSent] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Hotel data
  const hotels = [
    // Your hotel data array here (same as before)
    // ...
  ];

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("YOUR_EMAILJS_PUBLIC_KEY");
  }, []);

  // Helper functions
  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const diffTime = Math.abs(checkOutDate - checkInDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    if (!selectedRoom) return 0;
    return selectedRoom.price * calculateNights();
  };

  const openHotelDetails = (hotel) => {
    setSelectedHotel(hotel);
    setSelectedRoom(null);
    setShowEmailForm(false);
    setCurrentImageIndex(0);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowEmailForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmailForm(prev => ({ ...prev, [name]: value }));
  };

  const sendBookingEmail = async (e) => {
    e.preventDefault();
    try {
      const templateParams = {
        hotel_name: selectedHotel.name,
        room_type: selectedRoom.type,
        check_in: checkInDate.toLocaleDateString(),
        check_out: checkOutDate.toLocaleDateString(),
        nights: calculateNights(),
        room_price: selectedRoom.price,
        taxes: selectedHotel.taxes,
        total_price: calculateTotal() + selectedHotel.taxes,
        customer_name: emailForm.name,
        customer_email: emailForm.email,
        customer_phone: emailForm.phone,
        special_requests: emailForm.specialRequests,
        booking_date: new Date().toLocaleDateString()
      };

      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        templateParams
      );

      setEmailSent(true);
      setTimeout(() => {
        setShowModal(false);
        setEmailSent(false);
        setEmailForm({
          name: '',
          email: '',
          phone: '',
          specialRequests: ''
        });
      }, 3000);
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Failed to send booking confirmation. Please try again.');
    }
  };

  // Filter and sort hotels
  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAmenities = selectedAmenities.length === 0 || 
                            selectedAmenities.every(amenity => hotel.amenities.includes(amenity));
    const matchesPrice = hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
    return matchesSearch && matchesAmenities && matchesPrice;
  });

  const sortedHotels = [...filteredHotels].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  // Image navigation
  const nextImage = () => {
    if (selectedHotel && selectedHotel.rooms[0].images.length > currentImageIndex + 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden bg-gradient-to-r from-pink-500 to-pink-600 flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('/images/hotel-bg.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">Discover Kashmir's Finest Stays</h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto drop-shadow-md">
            Experience world-class hospitality amidst breathtaking Himalayan landscapes
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 -mt-20 relative z-20">
        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-xl p-6 mb-8 transform transition-all duration-300 hover:shadow-2xl">
          {/* Search and filter UI */}
          {/* ... */}
        </div>

        {/* Results */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Results header */}
          {/* ... */}
        </div>

        {/* Hotel Listing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sortedHotels.map(hotel => (
            <HotelCard 
              key={hotel.id}
              hotel={hotel}
              onClick={() => openHotelDetails(hotel)}
            />
          ))}
        </div>

        {/* Hotel Details Modal */}
        {showModal && selectedHotel && (
          <HotelModal 
            hotel={selectedHotel}
            onClose={closeModal}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            checkInDate={checkInDate}
            setCheckInDate={setCheckInDate}
            checkOutDate={checkOutDate}
            setCheckOutDate={setCheckOutDate}
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
            showEmailForm={showEmailForm}
            setShowEmailForm={setShowEmailForm}
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            emailForm={emailForm}
            handleInputChange={handleInputChange}
            sendBookingEmail={sendBookingEmail}
            emailSent={emailSent}
            calculateNights={calculateNights}
            calculateTotal={calculateTotal}
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
            nextImage={nextImage}
            prevImage={prevImage}
            amenityIcons={amenityIcons}
          />
        )}
      </div>
    </div>
  );
};

// Extracted Hotel Card Component
const HotelCard = ({ hotel, onClick }) => (
  <div 
    className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
    onClick={onClick}
  >
    <div className="flex flex-col md:flex-row h-full">
      <div className="md:w-2/5 h-64 md:h-auto relative overflow-hidden">
        <img 
          src={hotel.image} 
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full flex items-center shadow-sm">
          <FiStar className="text-yellow-400 fill-current mr-1" />
          <span className="font-medium">{hotel.rating}</span>
        </div>
        <div className="absolute bottom-4 left-4 bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
          {hotel.stars} Star Luxury
        </div>
      </div>
      
      <div className="p-6 md:w-3/5 flex flex-col">
        <div className="flex-grow">
          <div className="flex justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{hotel.name}</h3>
              <div className="flex items-center text-gray-600">
                <FiMapPin className="mr-2 text-pink-500" size={16} />
                <span>{hotel.location}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-gray-500 text-sm">({hotel.reviews} reviews)</div>
            </div>
          </div>
          
          <div className="my-5">
            <p className="text-gray-600 line-clamp-2">{hotel.description}</p>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {hotel.amenities.slice(0, 4).map(amenity => (
              <span key={amenity} className="flex items-center text-sm bg-pink-50 text-pink-700 px-3 py-1.5 rounded-full border border-pink-100">
                {amenityIcons[amenity] || <FiCheck className="mr-1" />}
                {amenity}
              </span>
            ))}
            {hotel.amenities.length > 4 && (
              <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full border border-gray-200">
                +{hotel.amenities.length - 4} more
              </span>
            )}
          </div>
        </div>
        
        <div className="mt-6 flex justify-between items-end">
          <div>
            <p className="text-gray-500 text-sm">Starting from</p>
            <p className="text-3xl font-bold text-gray-800">₹{hotel.price.toLocaleString()}</p>
            <p className="text-gray-500 text-xs">+ ₹{hotel.taxes.toLocaleString()} taxes & fees</p>
          </div>
          <button 
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClick();
            }}
          >
            <span>View Details</span>
            <FiChevronDown className="ml-1 transform group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Extracted Hotel Modal Component
const HotelModal = ({
  hotel,
  onClose,
  activeTab,
  setActiveTab,
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  selectedRoom,
  setSelectedRoom,
  showEmailForm,
  setShowEmailForm,
  isAuthenticated,
  setIsAuthenticated,
  emailForm,
  handleInputChange,
  sendBookingEmail,
  emailSent,
  calculateNights,
  calculateTotal,
  currentImageIndex,
  setCurrentImageIndex,
  nextImage,
  prevImage,
  amenityIcons
}) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto backdrop-blur-sm">
    <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-auto shadow-2xl relative">
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
      >
        <FiX size={24} />
      </button>
      
      <div className="p-8">
        {/* Modal content */}
        {/* ... */}
      </div>
    </div>
  </div>
);

export default Hotels;