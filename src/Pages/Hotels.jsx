import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiStar, FiFilter, FiChevronDown, FiX, FiMapPin, 
  FiWifi, FiCoffee, FiDroplet, FiHeart, FiClock, 
  FiUsers, FiCalendar, FiZap, FiEdit, FiSave, FiMail,
  FiCreditCard, FiPhone, FiLock, FiUser, FiSearch,
  FiCheck, FiDollarSign, FiHome, FiUmbrella, FiTv,
  FiChevronLeft, FiChevronRight, FiArrowRight
} from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import emailjs from '@emailjs/browser';

// Enhanced amenity icons with better styling
const amenityIcons = {
  'Free WiFi': <FiWifi className="mr-2 text-rose-500 text-lg" />,
  'Pool': <FiDroplet className="mr-2 text-rose-500 text-lg" />,
  'Spa': <FiHeart className="mr-2 text-rose-500 text-lg" />,
  'Restaurant': <FiCoffee className="mr-2 text-rose-500 text-lg" />,
  'Parking': <FiHome className="mr-2 text-rose-500 text-lg" />,
  'Beachfront': <FiUmbrella className="mr-2 text-rose-500 text-lg" />,
  'Bar': <FiCoffee className="mr-2 text-rose-500 text-lg" />,
  'Fitness Center': <FiZap className="mr-2 text-rose-500 text-lg" />,
  'Room Service': <FiCheck className="mr-2 text-rose-500 text-lg" />,
  'Business Center': <FiEdit className="mr-2 text-rose-500 text-lg" />,
  'TV': <FiTv className="mr-2 text-rose-500 text-lg" />,
  'Air conditioning': <FiZap className="mr-2 text-rose-500 text-lg" />,
  'Minibar': <FiCoffee className="mr-2 text-rose-500 text-lg" />,
  'Safe': <FiLock className="mr-2 text-rose-500 text-lg" />,
  'Work desk': <FiEdit className="mr-2 text-rose-500 text-lg" />,
  'Balcony': <FiHome className="mr-2 text-rose-500 text-lg" />,
  'Sea view': <FiMapPin className="mr-2 text-rose-500 text-lg" />,
  'Lake view': <FiMapPin className="mr-2 text-rose-500 text-lg" />,
  'Private pool': <FiDroplet className="mr-2 text-rose-500 text-lg" />,
  'Butler service': <FiUser className="mr-2 text-rose-500 text-lg" />,
  'Jacuzzi': <FiDroplet className="mr-2 text-rose-500 text-lg" />,
  'Dining table': <FiCoffee className="mr-2 text-rose-500 text-lg" />,
  'Premium toiletries': <FiCheck className="mr-2 text-rose-500 text-lg" />,
  'Separate living area': <FiHome className="mr-2 text-rose-500 text-lg" />,
  'Club lounge access': <FiStar className="mr-2 text-rose-500 text-lg" />,
  'Private terrace': <FiHome className="mr-2 text-rose-500 text-lg" />,
  'Personal butler': <FiUser className="mr-2 text-rose-500 text-lg" />,
  'Dining room': <FiCoffee className="mr-2 text-rose-500 text-lg" />,
  'Study': <FiEdit className="mr-2 text-rose-500 text-lg" />,
  'Yoga Classes': <FiHeart className="mr-2 text-rose-500 text-lg" />,
  'Boat Ride': <FiDroplet className="mr-2 text-rose-500 text-lg" />,
  'Concierge': <FiUser className="mr-2 text-rose-500 text-lg" />,
  'Airport Shuttle': <FiHome className="mr-2 text-rose-500 text-lg" />
};

const Hotels = () => {
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
  const [loading, setLoading] = useState(false);

  // Hotel Data
  const hotels = [
    {
      id: 1,
      name: 'Hotel Dal View',
      location: 'Boulevard Road, Srinagar, Jammu and Kashmir 190001',
      rating: 4.5,
      reviews: 892,
      stars: 4,
      price: 30000,
      taxes: 1200,
      image: "/images/Dalview.jpeg",
      description: 'Nestled along the picturesque Boulevard Road overlooking Dal Lake, Hotel Dal View offers breathtaking views of the Himalayan mountains and direct access to the famous shikara rides. This charming property combines traditional Kashmiri architecture with modern comforts.',
      amenities: [
        'Free WiFi', 
        'Lake View', 
        'Restaurant', 
        'Garden', 
        '24-Hour Front Desk', 
        'Room Service', 
        'Laundry Service', 
        'Travel Desk', 
        'Parking', 
        'Doctor on Call'
      ],
      rooms: [
        { 
          id: 101, 
          type: 'Premium Room', 
          price: 32000, 
          size: '300 sq ft', 
          beds: '1 King Bed',
          amenities: [
            'Heating', 
            'TV', 
            'Tea/Coffee Maker', 
            'Balcony', 
            'Bathroom Amenities'
          ], 
          maxOccupancy: 2,
          images: [
            "/images/Premium Room.webp",
            "/images/Dalview.jpeg"
          ]
        }
      ],
      policies: {
        checkIn: '12:00 PM',
        checkOut: '11:00 AM',
        cancellation: 'Free cancellation up to 72 hours before arrival',
        pets: 'Not allowed',
        payment: 'Credit card or cash accepted',
        children: 'Children under 12 stay free with parents'
      },
      nearbyAttractions: [
        'Dal Lake (on property)',
        'Mughal Gardens (3 km)',
        'Shankaracharya Temple (5 km)',
        'Hazratbal Shrine (4 km)',
        'Old City Markets (6 km)',
        'Pari Mahal (7 km)'
      ],
      specialFeatures: [
        'Authentic Kashmiri Wazwan Cuisine',
        'Shikara Pickup from Hotel Dock',
        'Cultural Evenings with Folk Music',
        'Houseboat Stay Packages Available',
        'Guided Local Tours'
      ]
    },
    {
      id: 2,
      name: "Sadeeq Palace",
      location: "Srinagar, Jammu & Kashmir",
      rating: 4.2,
      reviews: 356,
      stars: 4,
      price: 8000,
      taxes: 1600,
      image: "/images/Sideeq4.jpeg",
      description: "A heritage-style hotel with traditional Kashmiri architecture, offering stunning views of Dal Lake and the Zabarwan Mountains. Known for its warm hospitality and serene ambiance.",
      amenities: [
        "Free WiFi",
        "Restaurant",
        "Room Service",
        "Garden",
        "Lake View",
        "Air Conditioning",
        "Heating",
        "Airport Transfers",
        "Houseboat Tours"
      ],
      rooms: [
        {
          id: 301,
          type: "Deluxe Room",
          price: 8000,
          size: "400 sq ft",
          beds: "1 King Bed",
          amenities: [
            "Air conditioning",
            "Heating",
            "TV",
            "Minibar",
            "Lake view",
            "Work desk"
          ],
          maxOccupancy: 2,
          images: [
            "/images/Sideeq3.jpeg",
            "/images/Sideeq4.jpeg"
          ]
        },
        {
          id: 302,
          type: "Executive Suite",
          price: 12000,
          size: "600 sq ft",
          beds: "1 King Bed",
          amenities: [
            "Air conditioning",
            "Heating",
            "TV",
            "Minibar",
            "Sitting area",
            "Lake view",
            "Balcony"
          ],
          maxOccupancy: 3,
          images: [
            "/images/Sideeq2.jpeg",
            "/images/Sideeq4.jpeg"
          ]
        }
      ],
      policies: {
        checkIn: "3:00 PM",
        checkOut: "12:00 PM",
        cancellation: "Free cancellation up to 72 hours before arrival",
        pets: "Not allowed",
        payment: "Credit card required at booking",
        children: "Children of all ages are welcome"
      },
      nearbyAttractions: [
        "Dal Lake (2 km)",
        "Mughal Gardens (4 km)",
        "Shankaracharya Temple (6 km)",
        "Hazratbal Shrine (5 km)"
      ],
      specialFeatures: [
        "Traditional Kashmiri Architecture",
        "Panoramic Mountain Views",
        "Cultural Evenings",
        "Guided Tours"
      ]
    },
    {
      id: 3,
      name: 'Hotel Welcome Resorts',
      location: 'Kolhie Green Langanbal Pahalgam',
      rating: 4.7,
      reviews: 1200,
      stars: 4,
      price: 9980,
      taxes: 1500,
      image: "/images/Welcome3.jpeg",
      description: 'Inspired by the grandeur of Chola dynasty architecture, this luxury hotel features beautiful rooms, restaurants, and spa services amidst the natural beauty of Pahalgam.',
      amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Fitness Center', 'Bar', 'Parking', 'Business Center', 'Concierge', 'Airport Shuttle'],
      rooms: [
        { 
          id: 301, 
          type: 'Premium balcony', 
          price: 7500, 
          size: '400 sq ft', 
          beds: '1 King Bed', 
          amenities: ['Air conditioning', 'Minibar', 'Safe', 'TV', 'Work desk', 'Mountain view'], 
          maxOccupancy: 2,
          images: [
            "/images/Welcome2.jpeg",
            "/images/Welcome4.jpeg"
          ]
        }
      ],
      policies: {
        checkIn: '2:00 PM',
        checkOut: '12:00 PM',
        cancellation: 'Free cancellation up to 24 hours before arrival',
        pets: 'Not allowed',
        payment: 'Credit card required at booking',
        children: 'Children of all ages are welcome'
      },
      nearbyAttractions: [
        'Betaab Valley (5 km)',
        'Aru Valley (15 km)',
        'Lidder River (2 km)',
        'Baisaran Hills (8 km)'
      ],
      specialFeatures: [
        'Chola-inspired Architecture',
        'Ayurvedic Spa Treatments',
        'River-facing Restaurants',
        'Trekking Guides Available'
      ]
    },
    {
      id: 4,
      name: 'Heritage Luxury Srinagar',
      location: ' Police Headquarter Airport Road Hyderpora Near, Srinagar, Jammu and Kashmir 190014',
      rating: 4.4,
      reviews: 1280,
      stars: 4,
      price: 15000,
      taxes: 3000,
      image: '/images/heritage1.jpeg',
      description: 'A masterpiece of Kashmiri architecture blending traditional craftsmanship with modern luxury. Situated on the banks of Dal Lake, our heritage property offers breathtaking views of the Himalayas and Mughal gardens, with hand-carved walnut wood interiors and authentic Kashmiri hospitality.',
      amenities: [
        'Free WiFi',
        'Kashmiri Wazwan Restaurant',
        'Ayurvedic Spa',
        'Heated Indoor Pool',
        '24-Hour Butler Service',
        'Cultural Evenings',
        'Yoga Pavilion',
        'Business Center',
        'Concierge Service',
        'Guided Heritage Walks'
      ],
      rooms: [
        { 
          id: 1102, 
          type: 'Delux Room', 
          price: 6000, 
          size: '800 sq ft', 
          beds: '1 Four-Poster King Bed + Living Area', 
          amenities: [
            'Sun deck with loungers',
            'Traditional hookah service',
            'Handwoven silk carpets',
            'Bathroom with heated floors',
            'Complimentary shikara rides'
          ], 
          maxOccupancy: 2,
          images: [
            '/images/heritage2.jpeg',
            '/images/heritage1.jpeg'
          ]
        },
        { 
          id: 1103, 
          type: 'Family Room', 
          price: 13000, 
          size: '1200 sq ft', 
          beds: '1 Four-Poster King Bed + Separate Living Room', 
          amenities: [
            'Private terrace with mountain views',
            'Personal chef available',
            'Antique furnishings',
            'Walk-in wardrobe',
            'Jacuzzi with herbal infusions',
            'Private dining area',
            '24-hour butler service'
          ], 
          maxOccupancy: 4,
          images: [
            '/images/heritage3.jpeg',
            '/images/heritage1.jpeg'
          ]
        }
      ],
      policies: {
        checkIn: '2:00 PM',
        checkOut: '12:00 PM',
        cancellation: 'Free cancellation up to 7 days before arrival',
        pets: 'Allowed with prior notice',
        payment: 'Credit card or cash accepted',
        children: 'Children under 12 stay free, special activities available'
      },
      nearbyAttractions: [
        'Dal Lake (private ghat access)',
        'Shalimar Bagh Mughal Gardens (1 km)',
        'Nishat Bagh (2 km)',
        'Shankaracharya Temple (3 km)',
        'Old City Markets (4 km)',
        'Pari Mahal (5 km)'
      ],
      specialFeatures: [
        'Authentic Kashmiri cuisine with organic ingredients',
        'Daily cultural performances (Sufi music, folk dances)',
        'Handicraft workshops with local artisans',
        'Private shikara dinner cruises',
        'Guided heritage walks through old Srinagar',
        'Customized Kashmir valley tours'
      ]
    },
    {
      id: 5,
      name: 'Hotel City Grace',
      location: 'Khanyar, Srinagar Kashmir , 190003, India',
      rating: 4.3,
      reviews: 420,
      stars: 3,
      price: 4000,
      taxes: 1700,
      image: '/images/CityGrace.jpeg',
      description: 'Hotel City Grace offers premium accommodation with breathtaking views of Dal Lake and the Himalayan mountains. Our property combines modern amenities with traditional Kashmiri hospitality, featuring elegant rooms, a multi-cuisine restaurant, and convenient access to Srinagar\'s top attractions.',
      amenities: [
        'Free WiFi',
        'Lake View Rooms',
        'Restaurant',
        '24-Hour Front Desk',
        'Room Service',
        'Travel Desk',
        'Laundry Service',
        'Parking',
        'Doctor on Call',
        'Hot Water'
      ],
      rooms: [
        { 
          id: 1201, 
          type: 'Deluxe Room', 
          price: 8500, 
          size: '300 sq ft', 
          beds: '1 King Bed or Twin Beds', 
          amenities: [
            'Heating',
            'TV',
            'Tea/Coffee Maker',
            'Bathroom Amenities',
            'Balcony',
            'Room Service'
          ], 
          maxOccupancy: 2,
          images: [
            '/images/Deluxeroomcity.jpg',
            '/images/CityGrace.jpeg'
          ]
        },
        { 
          id: 1202, 
          type: ' Family Room', 
          price: 11000, 
          size: '350 sq ft', 
          beds: '1 King Bed', 
          amenities: [
            'Private Balcony with Lake View',
            'Minibar',
            'Kashmiri Handicraft Decor',
            'Enhanced Bathroom Amenities',
            '24-Hour Room Service'
          ], 
          maxOccupancy: 4,
          images: [
            '/images/Familyroomcity.jpg',
            '/images/CityGrace.jpeg'
          ]
        }
      ],
      policies: {
        checkIn: '12:00 PM',
        checkOut: '11:00 AM',
        cancellation: 'Free cancellation up to 72 hours before arrival',
        pets: 'Not allowed',
        payment: 'Credit card or cash accepted',
        children: 'Children under 12 stay free with parents'
      },
      nearbyAttractions: [
        'Dal Lake (on property)',
        'Mughal Gardens (3 km)',
        'Shankaracharya Temple (5 km)',
        'Hazratbal Shrine (4 km)',
        'Old City Markets (6 km)'
      ],
      specialFeatures: [
        'Authentic Kashmiri Cuisine',
        'Shikara Pickup from Hotel Dock',
        'Guided Local Tours',
        'Cultural Evenings',
        'Houseboat Stay Packages Available'
      ]
    }
  ];

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("37pN2ThzFwwhwk7ai");
  }, []);

  // Calculate number of nights
  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const diffTime = Math.abs(checkOutDate - checkInDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Calculate total price
  const calculateTotal = () => {
    if (!selectedRoom) return 0;
    return selectedRoom.price * calculateNights();
  };

  // Open hotel details modal
  const openHotelDetails = (hotel) => {
    setSelectedHotel(hotel);
    setSelectedRoom(null);
    setShowEmailForm(false);
    setCurrentImageIndex(0);
    setActiveTab('details');
    setShowModal(true);
  };

  // Close all modals
  const closeModal = () => {
    setShowModal(false);
    setShowEmailForm(false);
    setSelectedRoom(null);
    setEmailSent(false);
  };

  // Handle input change for booking form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmailForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Send booking email
  const sendBookingEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    
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
        'service_ov629rm',
        'template_jr1dnto',
        templateParams
      );

      setEmailSent(true);
      setLoading(false);
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
      setLoading(false);
    }
  };

  // Filter hotels based on search query, amenities, and price range
  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesAmenities = selectedAmenities.length === 0 || 
                            selectedAmenities.every(amenity => hotel.amenities.includes(amenity));
    
    const matchesPrice = hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
    
    return matchesSearch && matchesAmenities && matchesPrice;
  });

  // Sort hotels
  const sortedHotels = [...filteredHotels].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  // Next image in gallery
  const nextImage = () => {
    if (selectedHotel && selectedHotel.rooms[0]?.images && selectedHotel.rooms[0].images.length > currentImageIndex + 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  // Previous image in gallery
  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* Enhanced Hero Section */}
      <div className="relative h-96 overflow-hidden bg-gradient-to-r from-rose-600 to-rose-800 flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('/images/kashmir-bg.jpg')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-rose-900/70 to-rose-800/60"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">Discover Kashmir's Finest Stays</h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto drop-shadow-md">
            Experience world-class hospitality amidst breathtaking Himalayan landscapes
          </p>
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl inline-block">
            <div className="flex items-center justify-center space-x-2 text-white">
              <FiMapPin className="text-rose-200" />
              <span className="font-medium">Srinagar • Gulmarg • Pahalgam • Sonamarg</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 -mt-20 relative z-20">
        {/* Search and Filter Card */}
        <div className="bg-white rounded-xl shadow-xl p-6 mb-8 transform transition-all duration-300 hover:shadow-2xl border border-rose-100">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-rose-400" />
              </div>
              <input
                type="text"
                placeholder="Search hotels by name or location..."
                className="w-full p-3 pl-10 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              className="flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter />
              <span>Filters</span>
              <FiChevronDown className={`transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {showFilters && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-4 border border-rose-100 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-medium mb-3 text-gray-800 text-lg">Sort By</h3>
                  <select 
                    className="w-full p-3 border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none focus:border-transparent shadow-sm"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="price">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                    <option value="rating">Rating</option>
                    <option value="name">Name</option>
                  </select>
                </div>
                <div>
                  <h3 className="font-medium mb-3 text-gray-800 text-lg">Amenities</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['Pool', 'Spa', 'Free WiFi', 'Restaurant', 'Parking', 'Fitness Center'].map(amenity => (
                      <label key={amenity} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="h-5 w-5 text-rose-600 rounded focus:ring-rose-500 border-gray-300"
                          checked={selectedAmenities.includes(amenity)}
                          onChange={() => {
                            if (selectedAmenities.includes(amenity)) {
                              setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
                            } else {
                              setSelectedAmenities([...selectedAmenities, amenity]);
                            }
                          }}
                        />
                        <span className="text-gray-700">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-3 text-gray-800 text-lg">Price Range (₹)</h3>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full p-3 border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none focus:border-transparent shadow-sm"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full p-3 border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none focus:border-transparent shadow-sm"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 50000])}
                    />
                  </div>
                  <div className="mt-3">
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-rose-100 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {sortedHotels.length} {sortedHotels.length === 1 ? 'Luxury Hotel' : 'Luxury Hotels'} Found
            </h2>
            <p className="text-gray-600">
              {sortedHotels.length > 0 ? 'Handpicked selections for your perfect stay' : 'Try adjusting your filters to find more options'}
            </p>
          </div>
          <div className="mt-4 md:mt-0 bg-rose-100 text-rose-800 px-4 py-2 rounded-full text-sm font-medium">
            Showing {Math.min(sortedHotels.length, 10)} of {sortedHotels.length}
          </div>
        </div>

        {/* Hotel Listing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sortedHotels.map(hotel => (
            <div 
              key={hotel.id} 
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-rose-50"
              onClick={() => openHotelDetails(hotel)}
            >
              <div className="flex flex-col md:flex-row h-full">
                {/* Hotel Image */}
                <div className="md:w-2/5 h-64 md:h-auto relative overflow-hidden">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full flex items-center shadow-sm">
                    <FiStar className="text-amber-400 fill-current mr-1" />
                    <span className="font-medium">{hotel.rating}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-rose-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                    {hotel.stars} Star Luxury
                  </div>
                </div>
                
                {/* Hotel Info */}
                <div className="p-6 md:w-3/5 flex flex-col">
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-1">{hotel.name}</h3>
                        <div className="flex items-center text-gray-600">
                          <FiMapPin className="mr-2 text-rose-500" size={16} />
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
                        <span key={amenity} className="flex items-center text-sm bg-rose-50 text-rose-700 px-3 py-1.5 rounded-full border border-rose-100">
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
                      className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openHotelDetails(hotel);
                      }}
                    >
                      <span>View Details</span>
                      <FiChevronDown className="ml-1 transform group-hover:translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {sortedHotels.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-rose-50 p-8 rounded-2xl border border-rose-100 max-w-md mx-auto">
              <div className="bg-rose-100 text-rose-600 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FiSearch size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No hotels found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters to find more options.</p>
              <button 
                className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded-lg transition-colors"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedAmenities([]);
                  setPriceRange([0, 50000]);
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}

        {/* Hotel Details Modal */}
        {showModal && selectedHotel && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-auto shadow-2xl relative">
              <button 
                onClick={closeModal} 
                className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
              >
                <FiX size={24} />
              </button>
              
              <div className="p-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-800">{selectedHotel.name}</h2>
                  <div className="flex items-center mt-3 text-gray-600 space-x-4">
                    <div className="flex items-center">
                      <FiMapPin className="mr-1 text-rose-500" size={16} />
                      <span>{selectedHotel.location}</span>
                    </div>
                    <div className="flex items-center">
                      {Array(selectedHotel.stars).fill().map((_, i) => (
                        <FiStar key={i} className="text-amber-400 fill-current mr-0.5" size={18} />
                      ))}
                      <span className="ml-2 font-medium">{selectedHotel.rating}</span>
                      <span className="text-gray-500 text-sm ml-1">({selectedHotel.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Tabs */}
                <div className="border-b border-gray-200 mb-8">
                  <nav className="flex space-x-8">
                    <button
                      className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === 'details' ? 'border-rose-500 text-rose-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                      onClick={() => setActiveTab('details')}
                    >
                      <FiHome className="mr-2" />
                      Details
                    </button>
                    <button
                      className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === 'rooms' ? 'border-rose-500 text-rose-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                      onClick={() => setActiveTab('rooms')}
                    >
                      <FiUser className="mr-2" />
                      Rooms & Rates
                    </button>
                    <button
                      className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === 'amenities' ? 'border-rose-500 text-rose-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                      onClick={() => setActiveTab('amenities')}
                    >
                      <FiStar className="mr-2" />
                      Amenities
                    </button>
                    <button
                      className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === 'policies' ? 'border-rose-500 text-rose-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                      onClick={() => setActiveTab('policies')}
                    >
                      <FiCreditCard className="mr-2" />
                      Policies
                    </button>
                  </nav>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    {activeTab === 'details' && (
                      <>
                        {/* Enhanced Image Gallery */}
                        <div className="relative h-96 w-full rounded-xl overflow-hidden mb-8 shadow-lg">
                          <img 
                            src={selectedHotel.rooms[0]?.images?.[currentImageIndex] || selectedHotel.image} 
                            alt={selectedHotel.name}
                            className="w-full h-full object-cover transition-opacity duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                          
                          {/* Navigation Arrows */}
                          {selectedHotel.rooms[0]?.images?.length > 1 && (
                            <>
                              <button 
                                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                                disabled={currentImageIndex === 0}
                              >
                                <FiChevronLeft size={24} />
                              </button>
                              <button 
                                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                                disabled={currentImageIndex === (selectedHotel.rooms[0]?.images?.length - 1)}
                              >
                                <FiChevronRight size={24} />
                              </button>
                            </>
                          )}
                          
                          {/* Image Indicators */}
                          {selectedHotel.rooms[0]?.images?.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                              {selectedHotel.rooms[0].images.map((_, index) => (
                                <button
                                  key={index}
                                  onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                                  className={`w-3 h-3 rounded-full transition-all ${currentImageIndex === index ? 'bg-white w-6' : 'bg-white/50'}`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <div className="mb-8">
                          <h3 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Property Highlights</h3>
                          <p className="text-gray-600 leading-relaxed mb-6">{selectedHotel.description}</p>
                          
                          {selectedHotel.specialFeatures && (
                            <div className="bg-rose-50 border border-rose-100 rounded-xl p-6">
                              <h4 className="font-bold text-rose-700 mb-3 flex items-center">
                                <FiZap className="mr-2 text-rose-600" />
                                Unique Features
                              </h4>
                              <ul className="space-y-3">
                                {selectedHotel.specialFeatures.map((feature, index) => (
                                  <li key={index} className="flex items-start">
                                    <span className="bg-rose-100 text-rose-600 rounded-full p-1 mr-3">
                                      <FiCheck size={14} />
                                    </span>
                                    <span className="text-gray-700">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        {selectedHotel.nearbyAttractions && (
                          <div className="mb-6">
                            <h3 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Nearby Attractions</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {selectedHotel.nearbyAttractions.map((attraction, index) => (
                                <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-rose-300 transition-colors">
                                  <div className="bg-rose-100 text-rose-600 p-2 rounded-full mr-3">
                                    <FiMapPin size={18} />
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-800">{attraction.split('(')[0]}</h4>
                                    {attraction.includes('(') && (
                                      <p className="text-sm text-gray-500 mt-1">{attraction.match(/\(([^)]+)\)/)[1]}</p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {activeTab === 'amenities' && (
                      <div className="mb-6">
                        <h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Amenities & Services</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {selectedHotel.amenities.map((amenity, index) => (
                            <div key={index} className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-rose-300 transition-colors">
                              <div className="bg-rose-100 text-rose-600 p-2 rounded-full mr-4">
                                {amenityIcons[amenity] || <FiCheck size={18} />}
                              </div>
                              <span className="text-gray-700 font-medium">{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'policies' && (
                      <div className="mb-6">
                        <h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Hotel Policies</h3>
                        <div className="space-y-5">
                          <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-rose-300 transition-colors">
                            <h4 className="font-bold text-gray-800 flex items-center mb-3">
                              <div className="bg-rose-100 text-rose-600 p-2 rounded-full mr-3">
                                <FiClock size={18} />
                              </div>
                              Check-in/Check-out
                            </h4>
                            <div className="pl-11">
                              <p className="text-gray-600">
                                <span className="font-medium">Check-in:</span> {selectedHotel.policies.checkIn}
                              </p>
                              <p className="text-gray-600 mt-1">
                                <span className="font-medium">Check-out:</span> {selectedHotel.policies.checkOut}
                              </p>
                            </div>
                          </div>
                          
                          <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-rose-300 transition-colors">
                            <h4 className="font-bold text-gray-800 flex items-center mb-3">
                              <div className="bg-rose-100 text-rose-600 p-2 rounded-full mr-3">
                                <FiEdit size={18} />
                              </div>
                              Cancellation Policy
                            </h4>
                            <p className="text-gray-600 pl-11">{selectedHotel.policies.cancellation}</p>
                          </div>
                          
                          <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-rose-300 transition-colors">
                            <h4 className="font-bold text-gray-800 flex items-center mb-3">
                              <div className="bg-rose-100 text-rose-600 p-2 rounded-full mr-3">
                                <FiUsers size={18} />
                              </div>
                              Children Policy
                            </h4>
                            <p className="text-gray-600 pl-11">{selectedHotel.policies.children}</p>
                          </div>
                          
                          <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-rose-300 transition-colors">
                            <h4 className="font-bold text-gray-800 flex items-center mb-3">
                              <div className="bg-rose-100 text-rose-600 p-2 rounded-full mr-3">
                                <FiCreditCard size={18} />
                              </div>
                              Payment Policy
                            </h4>
                            <p className="text-gray-600 pl-11">{selectedHotel.policies.payment}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Booking Sidebar - Sticky */}
                  <div className="lg:sticky lg:top-4 h-fit">
                    <div className="bg-gradient-to-br from-rose-50 to-white p-6 rounded-xl shadow-lg border border-rose-100">
                      {activeTab === 'rooms' && !showEmailForm && (
                        <>
                          <h3 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-rose-200">Book Your Stay</h3>
                          
                          <div className="space-y-5 mb-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Check-in Date</label>
                              <div className="relative">
                                <DatePicker
                                  selected={checkInDate}
                                  onChange={(date) => setCheckInDate(date)}
                                  minDate={new Date()}
                                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none shadow-sm"
                                  popperPlacement="top-start"
                                />
                                <FiCalendar className="absolute right-3 top-3.5 text-gray-400" />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Check-out Date</label>
                              <div className="relative">
                                <DatePicker
                                  selected={checkOutDate}
                                  onChange={(date) => setCheckOutDate(date)}
                                  minDate={checkInDate}
                                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none shadow-sm"
                                  popperPlacement="top-start"
                                />
                                <FiCalendar className="absolute right-3 top-3.5 text-gray-400" />
                              </div>
                            </div>
                          </div>

                          <div className="mb-6">
                            <h4 className="font-medium text-gray-800 mb-4">Available Rooms</h4>
                            <div className="space-y-4">
                              {selectedHotel.rooms.map(room => (
                                <div 
                                  key={room.id} 
                                  className={`border rounded-xl overflow-hidden transition-all duration-200 ${selectedRoom?.id === room.id ? 'border-rose-500 bg-rose-50 shadow-md' : 'border-gray-200 hover:border-rose-300'}`}
                                >
                                  <div className="flex flex-col">
                                    {/* Room Image */}
                                    <div className="h-40 relative">
                                      <img 
                                        src={room.images[0]} 
                                        alt={room.type}
                                        className="w-full h-full object-cover"
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                    </div>
                                    
                                    {/* Room Details */}
                                    <div className="p-4">
                                      <div className="flex justify-between">
                                        <div>
                                          <h4 className="font-bold text-gray-800">{room.type}</h4>
                                          <div className="text-sm text-gray-600 mt-1">
                                            {room.size} • {room.beds} • Max {room.maxOccupancy} guests
                                          </div>
                                          <div className="mt-3 flex flex-wrap gap-1">
                                            {room.amenities.slice(0, 2).map(amenity => (
                                              <span key={amenity} className="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded-full">
                                                {amenity}
                                              </span>
                                            ))}
                                            {room.amenities.length > 2 && (
                                              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                                +{room.amenities.length - 2} more
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                        <div className="text-right">
                                          <p className="text-xl font-bold text-gray-800">₹{room.price.toLocaleString()}</p>
                                          <p className="text-sm text-gray-500">per night</p>
                                        </div>
                                      </div>
                                      <button 
                                        className={`w-full mt-4 py-2.5 rounded-lg transition-all duration-200 ${selectedRoom?.id === room.id ? 'bg-rose-700 text-white shadow-md' : 'bg-rose-600 hover:bg-rose-700 text-white'}`}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setSelectedRoom(room);
                                        }}
                                      >
                                        {selectedRoom?.id === room.id ? '✓ Selected' : 'Select Room'}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {selectedRoom && (
                              <button
                                className="w-full mt-6 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white py-3.5 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                                onClick={() => setShowEmailForm(true)}
                              >
                                Continue to Book
                                <FiArrowRight className="ml-2 animate-bounce-horizontal" />
                              </button>
                            )}
                          </div>
                        </>
                      )}

                      {showEmailForm && selectedRoom && (
                        <div className="animate-fadeIn">
                          <h3 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-rose-200">Complete Booking</h3>
                          
                          {/* Booking Summary */}
                          <div className="mb-6 bg-rose-50 p-4 rounded-lg border border-rose-100">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-bold text-gray-800">{selectedHotel.name}</h4>
                                <p className="text-sm text-gray-600 mt-1">{selectedRoom.type}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold text-rose-600">₹{selectedRoom.price.toLocaleString()}</p>
                                <p className="text-xs text-gray-500">per night</p>
                              </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-rose-200 text-sm">
                              <div className="flex justify-between mb-1">
                                <span className="text-gray-600">Check-in:</span>
                                <span className="font-medium">{checkInDate.toLocaleDateString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Check-out:</span>
                                <span className="font-medium">{checkOutDate.toLocaleDateString()}</span>
                              </div>
                              <div className="mt-2 pt-2 border-t border-rose-200 flex justify-between font-medium">
                                <span>Total Nights:</span>
                                <span>{calculateNights()} night{calculateNights() !== 1 ? 's' : ''}</span>
                              </div>
                            </div>
                          </div>

                          {!isAuthenticated && (
                            <div className="mb-6 bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-sm">
                              <div className="flex items-start">
                                <div className="bg-yellow-100 text-yellow-600 p-1.5 rounded-full mr-3">
                                  <FiUser size={16} />
                                </div>
                                <div>
                                  <p className="font-medium text-yellow-800 mb-1">Have an account?</p>
                                  <button 
                                    className="text-rose-600 hover:underline font-medium"
                                    onClick={() => setIsAuthenticated(true)}
                                  >
                                    Sign in for faster booking
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                          <form onSubmit={sendBookingEmail}>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiUser className="text-gray-400" />
                                  </div>
                                  <input
                                    type="text"
                                    name="name"
                                    required
                                    className="pl-10 w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none shadow-sm"
                                    value={emailForm.name}
                                    onChange={handleInputChange}
                                    placeholder="Your full name"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiMail className="text-gray-400" />
                                  </div>
                                  <input
                                    type="email"
                                    name="email"
                                    required
                                    className="pl-10 w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none shadow-sm"
                                    value={emailForm.email}
                                    onChange={handleInputChange}
                                    placeholder="your@email.com"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiPhone className="text-gray-400" />
                                  </div>
                                  <input
                                    type="tel"
                                    name="phone"
                                    required
                                    className="pl-10 w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none shadow-sm"
                                    value={emailForm.phone}
                                    onChange={handleInputChange}
                                    placeholder="+91 1234567890"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                                <textarea
                                  name="specialRequests"
                                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none shadow-sm"
                                  rows="3"
                                  value={emailForm.specialRequests}
                                  onChange={handleInputChange}
                                  placeholder="Any special requirements or preferences..."
                                />
                              </div>

                              {/* Price Breakdown */}
                              <div className="border-t border-gray-200 pt-4 mt-4">
                                <h4 className="font-medium text-gray-800 mb-3">Price Breakdown</h4>
                                <div className="space-y-2">
                                  <div className="flex justify-between text-gray-700">
                                    <span>Room Rate:</span>
                                    <span>₹{selectedRoom.price.toLocaleString()} x {calculateNights()} nights</span>
                                  </div>
                                  <div className="flex justify-between text-gray-700">
                                    <span>Taxes & Fees:</span>
                                    <span>₹{selectedHotel.taxes.toLocaleString()}</span>
                                  </div>
                                  <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold text-lg text-gray-800">
                                    <span>Total:</span>
                                    <span className="text-rose-600">₹{(calculateTotal() + selectedHotel.taxes).toLocaleString()}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Submit Button */}
                              <div className="mt-6">
                                <button
                                  type="submit"
                                  className="w-full bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white py-3.5 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                                  disabled={loading || emailSent}
                                >
                                  {loading ? (
                                    <>
                                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                      </svg>
                                      Processing...
                                    </>
                                  ) : emailSent ? (
                                    'Booking Confirmed!'
                                  ) : (
                                    <>
                                      <FiCreditCard className="mr-2" />
                                      Complete Booking
                                    </>
                                  )}
                                </button>
                              </div>

                              {/* Security Message */}
                              <div className="text-xs text-gray-500 mt-3 flex items-center">
                                <FiLock className="mr-2 text-rose-500" />
                                Your payment is secure and your data is protected
                              </div>
                            </div>
                          </form>
                        </div>
                      )}

                      {emailSent && (
                        <div className="bg-green-50 p-6 rounded-lg text-center border border-green-100 animate-fadeIn">
                          <div className="bg-green-100 text-green-600 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-bold text-green-800 mb-2">Booking Confirmed!</h3>
                          <p className="text-green-700 mb-4">We've sent the confirmation to {emailForm.email}</p>
                          <p className="text-sm text-green-600">Thank you for choosing us. Have a wonderful stay!</p>
                          <button
                            onClick={closeModal}
                            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors duration-300"
                          >
                            Done
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hotels;