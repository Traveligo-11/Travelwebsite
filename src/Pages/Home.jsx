import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaPlane, FaHotel, FaUmbrellaBeach, FaStar, FaRegStar, 
  FaArrowRight, FaChevronLeft, FaChevronRight, FaMapMarkerAlt, 
  FaCalendarAlt, FaUserFriends, FaTimes, FaSearch, FaQuoteLeft 
} from 'react-icons/fa';
import { IoIosFlash, IoMdHeart } from 'react-icons/io';
import { GiSuitcase } from 'react-icons/gi';
import emailjs from '@emailjs/browser';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
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
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showAllPackages, setShowAllPackages] = useState(false);

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Packages' },
    { id: 'luxury', name: 'Luxury' },
    { id: 'adventure', name: 'Adventure' },
    { id: 'cultural', name: 'Cultural' },
    { id: 'beach', name: 'Beach' },
    { id: 'international', name: 'International' }
  ];

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("37pN2ThzFwwhwk7ai");
  }, []);

  // Featured destinations carousel
  const featuredDestinations = [
    {
      id: 1,
      title: 'Maldives Paradise',
      image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&q=80',
      description: 'Crystal clear waters and private villas',
      price: '₹89,999',
      packageId: 1 
    },
    {
      id: 2,
      title: 'Bali Adventure Tour',
      image: '/images/Bali1.jpeg',
      description: 'Majestic Mountains & Cozy Chalets - A Serene Bali Escape',
      price: '₹1,12,999',
      packageId: 6
    },
    {
      id: 3,
      title: "Darjeeling Dreams",
      image: '/images/darjeeling2.jpeg',
      description: "Romantic getaway in the misty hills of tea gardens",
      price: "₹32,999",
      packageId: 5
    },
    {
      id: 4,
      title: 'Jannat-E-Kashmir',
      image: '/images/kashmir.jpeg',
      description: 'Heaven on Earth with breathtaking valleys',
      price: '₹97,499',
      packageId: 9
    }
  ];

  // Trending cities data
  const trendingCities = [
    {
      id: 1,
      name: 'Srinagar',
      image: '/images/kashmir.jpeg',
      price: '₹12,999',
      slug: 'kashmir'
    },
    {
      id: 2,
      name: 'Goa',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      price: '₹9,999',
      slug: 'goa'
    },
    {
      id: 3,
      name: 'Bali',
      image: '/images/Bali1.jpeg',
      price: '₹32,999',
      slug: 'bali'
    },
    {
      id: 4,
      name: 'Maldives',
      image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      price: '₹49,999',
      slug: 'maldives'
    },
    {
      id: 5,
      name: 'Darjeeling',
      image: '/images/darjeeling2.jpeg',
      price: '₹14,999',
      slug: 'GangtokDargelling'
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      quote: "Our Kashmir tour with Traveligo was magical! The houseboat stay on Dal Lake and the Shikara ride at sunset were unforgettable. The team took care of every detail, making it a stress-free vacation.",
      name: "Mrs Rana Nazar",
      location: "Kashmir, May 2023",
      rating: 5,
      image: "/images/Client3.jpeg",
      destinationImage: "/images/kashmir.jpeg"
    },
    {
      id: 2,
      quote: "The Gulmarg gondola ride was the highlight of our Kashmir trip. Traveligo's local guide knew all the best spots for photography and helped us avoid the crowds. Perfect winter getaway!",
      name: "Mr Nihal",
      location: "Gulmarg, January 2023",
      rating: 5,
      image: "/images/Client4.jpeg",
      destinationImage: "/images/Gulmarg.jpeg"
    },
    {
      id: 3,
      quote: "Pahalgam through Traveligo was like stepping into paradise. The Betaab Valley visit and the stay at a cozy cottage were perfect. Their attention to detail made all the difference in our experience.",
      name: "Mr Kiran",
      location: "Pahalgam, July 2023",
      rating: 5,
      image: "/images/Client1.jpeg",
      destinationImage: "/images/pahalgam.jpeg"
    }
  ];

  // Holiday packages data (all packages included)
  const holidayPackages = [
    {
      id: 1,
      title: 'Maldives Honeymoon Package',
      destination: '5D/4N in Maldives',
      duration: '5 Days',
      price: '₹59,999',
      originalPrice: '₹89,999',
      discount: '33%',
      image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      highlights: ['Overwater Villa', 'All Meals Included', 'Sunset Cruise'],
      itinerary: [
        { day: 1, title: 'Arrival in Maldives', description: 'Private transfer to your overwater villa. Welcome drinks and briefing.' },
        { day: 2, title: 'Island Exploration', description: 'Guided tour of local islands and snorkeling in the house reef.' },
        { day: 3, title: 'Sunset Cruise', description: 'Private sunset cruise with champagne and canapes.' },
        { day: 4, title: 'Spa Day', description: 'Couples spa treatment and private beach dinner.' },
        { day: 5, title: 'Departure', description: 'Transfer to airport with farewell gifts.' }
      ],
      inclusions: ['4 nights in overwater villa', 'All meals (breakfast, lunch, dinner)', 'Return airport transfers', 'Sunset cruise', 'Complimentary spa session'],
      exclusions: ['Airfare', 'Travel insurance', 'Personal expenses', 'Optional activities'],
      tag: 'Romantic Getaway',
      category: 'luxury'
    },
    {
      id: 2,
      title: 'Bali Adventure Package',
      destination: '7D/6N in Bali',
      duration: '7 Days',
      price: '₹42,999',
      originalPrice: '₹59,999',
      discount: '28%',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      highlights: ['Private Tours', 'Water Sports', 'Cultural Shows'],
      itinerary: [
        { day: 1, title: 'Arrival in Bali', description: 'Airport pickup and transfer to Ubud hotel.' },
        { day: 2, title: 'Ubud Exploration', description: 'Sacred Monkey Forest, Tegalalang Rice Terrace, and traditional dance performance.' },
        { day: 3, title: 'Adventure Day', description: 'White water rafting and ATV ride through jungle trails.' },
        { day: 4, title: 'Nusa Penida Trip', description: 'Full-day excursion to Kelingking Beach and Angel\'s Billabong.' },
        { day: 5, title: 'Water Sports', description: 'Snorkeling, banana boat, and parasailing at Tanjung Benoa.' },
        { day: 6, title: 'Cultural Day', description: 'Visit Besakih Temple and traditional Balinese cooking class.' },
        { day: 7, title: 'Departure', description: 'Transfer to airport with farewell gifts.' }
      ],
      inclusions: ['6 nights accommodation', 'Daily breakfast', 'All tours and activities mentioned', 'English speaking guide', 'Entrance fees'],
      exclusions: ['Airfare', 'Travel insurance', 'Personal expenses', 'Optional activities', 'Lunch and dinner unless specified'],
      tag: 'Adventure',
      category: 'adventure'
    },
    {
      id: 3,
      title: 'European Explorer',
      destination: '10D/9N in Europe',
      duration: '10 Days',
      price: '₹1,25,999',
      originalPrice: '₹1,59,999',
      discount: '21%',
      image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      highlights: ['4 Countries', 'Guided Tours', 'Breakfast Included'],
      itinerary: [
        { day: 1, title: 'Arrival in Paris', description: 'Transfer to hotel. Evening Seine River cruise.' },
        { day: 2, title: 'Paris Sightseeing', description: 'Eiffel Tower, Louvre Museum, and Champs-Élysées.' },
        { day: 3, title: 'Travel to Brussels', description: 'Train to Brussels. Grand Place and Atomium visit.' },
        { day: 4, title: 'Amsterdam Tour', description: 'Canal cruise, Anne Frank House, and Van Gogh Museum.' },
        { day: 5, title: 'Cologne & Rhine Valley', description: 'Cologne Cathedral and Rhine River cruise.' },
        { day: 6, title: 'Heidelberg & Black Forest', description: 'Heidelberg Castle and Black Forest drive.' },
        { day: 7, title: 'Swiss Alps', description: 'Jungfraujoch excursion with breathtaking alpine views.' },
        { day: 8, title: 'Lucerne & Zurich', description: 'Chapel Bridge and Lion Monument in Lucerne.' },
        { day: 9, title: 'Return to Paris', description: 'Free day for shopping and last-minute sightseeing.' },
        { day: 10, title: 'Departure', description: 'Transfer to airport for return flight.' }
      ],
      inclusions: ['9 nights accommodation', 'Daily breakfast', 'Transport between cities', 'Guided tours as per itinerary', 'Entrance fees to mentioned attractions'],
      exclusions: ['Airfare', 'Travel insurance', 'Personal expenses', 'Optional activities', 'Lunch and dinner unless specified', 'Visa fees'],
      tag: 'Best Seller',
      category: 'cultural'
    },
    {
      id: 4,
      title: 'Dubai Extravaganza',
      destination: '6D/5N in Dubai',
      duration: '6 Days',
      price: '₹67,999',
      originalPrice: '₹89,999',
      discount: '24%',
      image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      highlights: ['Burj Khalifa Visit', 'Desert Safari', 'Luxury Hotel Stay'],
      itinerary: [
        { day: 1, title: 'Arrival in Dubai', description: 'Airport pickup and transfer to luxury hotel. Evening at leisure.' },
        { day: 2, title: 'City Tour', description: 'Visit Burj Khalifa, Dubai Mall, and Palm Jumeirah.' },
        { day: 3, title: 'Desert Safari', description: 'Dune bashing, camel ride, and desert camp with dinner.' },
        { day: 4, title: 'Abu Dhabi Excursion', description: 'Visit Sheikh Zayed Mosque and Ferrari World.' },
        { day: 5, title: 'Leisure Day', description: 'Free day for shopping or optional activities like skydiving.' },
        { day: 6, title: 'Departure', description: 'Transfer to airport with farewell gifts.' }
      ],
      inclusions: ['5 nights in 5-star hotel', 'Daily breakfast', 'City tour with guide', 'Desert safari with dinner', 'Abu Dhabi excursion'],
      exclusions: ['Airfare', 'Travel insurance', 'Personal expenses', 'Optional activities', 'Lunch and dinner unless specified'],
      tag: 'Luxury',
      category: 'luxury'
    },
    {
      id: 5,
      title: 'Darjeeling Dreams',
      destination: '5D/4N in Darjeeling',
      duration: '5 Days',
      price: '₹78,999',
      originalPrice: '₹99,999',
      discount: '21%',
      image: '/images/darjeeling2.jpeg',
      highlights: ['Eiffel Tower Dinner', 'Seine River Cruise', 'Louvre Museum'],
      itinerary: [
        { day: 1, title: 'Arrival in Paris', description: 'Transfer to boutique hotel. Evening Seine River cruise.' },
        { day: 2, title: 'Paris Highlights', description: 'Eiffel Tower, Arc de Triomphe, and Champs-Élysées.' },
        { day: 3, title: 'Art & Culture', description: 'Louvre Museum and Musée d\'Orsay with skip-the-line access.' },
        { day: 4, title: 'Versailles Day Trip', description: 'Guided tour of Palace of Versailles and gardens.' },
        { day: 5, title: 'Departure', description: 'Free morning for last-minute shopping before airport transfer.' }
      ],
      inclusions: ['4 nights in boutique hotel', 'Daily breakfast', 'Seine River cruise', 'Eiffel Tower summit access', 'Versailles day trip'],
      exclusions: ['Airfare', 'Travel insurance', 'Personal expenses', 'Optional activities', 'Lunch and dinner unless specified'],
      tag: 'Romantic',
      category: 'luxury'
    },
    {
      id: 6,
      title: 'Swiss Delight Package',
      destination: '7D/6N in Switzerland',
      duration: '7 Days',
      price: '₹1,34,999',
      originalPrice: '₹1,59,999',
      discount: '16%',
      image: '/images/Switzerland.jpeg',
      highlights: ['Jungfraujoch Excursion', 'Swiss Pass', 'Lucerne & Interlaken'],
      itinerary: [
        { day: 1, title: 'Arrival in Zurich', description: 'Transfer to Lucerne. Orientation walk of the old town.' },
        { day: 2, title: 'Lucerne Exploration', description: 'Chapel Bridge, Lion Monument, and lake cruise.' },
        { day: 3, title: 'Interlaken', description: 'Travel to Interlaken with free time for optional activities.' },
        { day: 4, title: 'Jungfraujoch', description: 'Excursion to "Top of Europe" with breathtaking views.' },
        { day: 5, title: 'Bern & Gruyères', description: 'Visit Swiss capital and cheese factory in Gruyères.' },
        { day: 6, title: 'Zurich', description: 'Return to Zurich for shopping and sightseeing.' },
        { day: 7, title: 'Departure', description: 'Transfer to airport for return flight.' }
      ],
      inclusions: ['6 nights accommodation', 'Daily breakfast', 'Swiss Travel Pass', 'Jungfraujoch excursion', 'All train transfers'],
      exclusions: ['Airfare', 'Travel insurance', 'Personal expenses', 'Optional activities', 'Lunch and dinner unless specified'],
      tag: 'Best Seller',
      category: 'luxury'
    },
    {
      id: 7,
      title: 'Goa Beach Retreat',
      destination: '4D/3N in Goa',
      duration: '4 Days',
      price: '₹24,999',
      originalPrice: '₹34,999',
      discount: '29%',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      highlights: ['Beachfront Resort', 'Water Sports', 'Nightlife'],
      itinerary: [
        { day: 1, title: 'Arrival in Goa', description: 'Transfer to beachfront resort. Evening at leisure.' },
        { day: 2, title: 'North Goa Tour', description: 'Visit beaches, forts, and local markets.' },
        { day: 3, title: 'Water Sports', description: 'Enjoy various water activities at Calangute Beach.' },
        { day: 4, title: 'Departure', description: 'Transfer to airport with farewell gifts.' }
      ],
      inclusions: ['3 nights in beachfront resort', 'Daily breakfast', 'North Goa sightseeing', 'Water sports activities'],
      exclusions: ['Airfare', 'Travel insurance', 'Personal expenses', 'Optional activities', 'Lunch and dinner unless specified'],
      tag: 'Beach Holiday',
      category: 'beach'
    },
    {
      id: 8,
      title: 'Kerala Backwaters',
      destination: '5D/4N in Kerala',
      duration: '5 Days',
      price: '₹35,999',
      originalPrice: '₹49,999',
      discount: '28%',
      image:'/images/kerla.jpeg',
      highlights: ['Houseboat Stay', 'Ayurvedic Spa', 'Cultural Shows'],
      itinerary: [
        { day: 1, title: 'Arrival in Cochin', description: 'Transfer to hotel. Evening city tour.' },
        { day: 2, title: 'Alleppey Backwaters', description: 'Overnight stay in traditional houseboat.' },
        { day: 3, title: 'Kumarakom', description: 'Visit bird sanctuary and enjoy ayurvedic massage.' },
        { day: 4, title: 'Thekkady', description: 'Spice plantation tour and cultural dance performance.' },
        { day: 5, title: 'Departure', description: 'Transfer to airport with farewell gifts.' }
      ],
      inclusions: ['4 nights accommodation (1 in houseboat)', 'Daily meals', 'All sightseeing tours', 'Ayurvedic massage session'],
      exclusions: ['Airfare', 'Travel insurance', 'Personal expenses', 'Optional activities'],
      tag: 'Cultural Experience',
      category: 'cultural'
    },
    {
      id: 9,
      title: "Jannat-E-Kashmir",
      destination: "6D/5N in Kashmir",
      duration: "6 Days",
      price: "₹13,500",
      originalPrice: "₹18,500",
      discount: "27%",
      image: "/images/kashmir.jpeg",
      highlights: [
        "Shikara Ride on Dal Lake",
        "Gulmarg Gondola Ride",
        "Pahalgam Valley Exploration",
        "Sonmarg Glacier Visit",
        "Mughal Gardens Tour"
      ],
      itinerary: [
        { day: 1, title: "Arrival in Srinagar", description: "Transfer to hotel. Visit Mughal Gardens & Hazratbal Shrine." },
        { day: 2, title: "Gulmarg Excursion", description: "Cable car ride (optional) & Drung Waterfall visit." },
        { day: 3, title: "Pahalgam Tour", description: "Explore Betaab Valley, Chandanwari & Aru Valley." },
        { day: 4, title: "Houseboat Experience", description: "Check into houseboat. Sunset Shikara ride on Dal Lake." },
        { day: 5, title: "Sonmarg Day Trip", description: "Visit Thajiwas Glacier & Zojila Pass." },
        { day: 6, title: "Departure", description: "Transfer to Srinagar airport." }
      ],
      inclusions: [
        "5 nights accommodation (3* hotels + houseboat)",
        "Daily breakfast & dinner (MAP Plan)",
        "All transfers in private sedan",
        "1-hour Shikara ride",
        "Driver charges & toll taxes"
      ],
      exclusions: [
        "Gondola ticket (Phase 2)",
        "Pony rides/union taxis",
        "Lunch & personal expenses",
        "Travel insurance",
        "Airfare"
      ],
      tag: "Nature Lover",
      category: "cultural"
    },
    {
      id: 10,
      title: "Amazing Thailand",
      destination: "6D/5N in Thailand",
      duration: "6 Days",
      price: "₹54,999",
      originalPrice: "₹74,999",
      discount: "28%",
      image: "/images/thailand.jpeg",
      highlights: [
        "Bangkok City Tour",
        "Pattaya Beach Experience",
        "Coral Island Cruise",
        "Sanctuary of Truth Visit",
        "Floating Market Tour"
      ],
      itinerary: [
        { day: 1, title: "Arrival in Bangkok", description: "Airport transfer. Evening at leisure." },
        { day: 2, title: "Bangkok Sightseeing", description: "Visit Grand Palace, Wat Pho, and Wat Arun." },
        { day: 3, title: "Bangkok to Pattaya", description: "Transfer to Pattaya. Visit Sanctuary of Truth." },
        { day: 4, title: "Coral Island Tour", description: "Speedboat to Koh Larn. Snorkeling & water sports." },
        { day: 5, title: "Floating Market", description: "Visit Damnoen Saduak Floating Market. Return to Bangkok." },
        { day: 6, title: "Departure", description: "Transfer to Bangkok airport." }
      ],
      inclusions: [
        "5 nights accommodation (3* hotels)",
        "Daily breakfast",
        "All transfers in private AC vehicle",
        "Bangkok city tour with guide",
        "Coral Island speedboat transfer"
      ],
      exclusions: [
        "International airfare",
        "Visa fees",
        "Lunch & dinner",
        "Personal expenses",
        "Optional tours"
      ],
      tag: "Beach Lover",
      category: "international"
    }
  ];

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === featuredDestinations.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Color variables
  const primaryColor = 'bg-pink-600';
  const primaryHoverColor = 'hover:bg-pink-700';
  const primaryTextColor = 'text-pink-600';
  const primaryBorderColor = 'border-pink-600';
  const primaryBgLight = 'bg-pink-50';

  // Carousel navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === featuredDestinations.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? featuredDestinations.length - 1 : prev - 1));
  };

  // Testimonial navigation
  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  // Package filtering
  const filteredPackages = activeCategory === 'all' 
    ? holidayPackages.filter(pkg => 
        pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase())))
    : holidayPackages.filter(pkg => 
        pkg.category === activeCategory && (
          pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pkg.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pkg.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase())))
        );

  const displayedPackages = showAllPackages 
    ? filteredPackages 
    : filteredPackages.slice(0, 8);

  // Handle package viewing
  const handleViewDetails = (pkg) => {
    setSelectedPackage(pkg);
    setShowDetailsModal(true);
  };

  // Handle booking
  const handleBookNow = (pkg) => {
    setSelectedPackage(pkg);
    setFormData(prev => ({
      ...prev,
      package: pkg.title
    }));
    setShowBookingForm(true);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle search
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSearchActive(e.target.value.length > 0);
  };

  // Submit booking form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Format dates for better display in email
      const formatDate = (dateString) => {
        if (!dateString) return 'Not specified';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      };

      const response = await emailjs.send(
        'service_bdm6dl3',
        'travel_booking_template',
        {
          package_name: selectedPackage.title,
          package_price: selectedPackage.price,
          destination: selectedPackage.destination,
          duration: selectedPackage.duration,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          arrivalDate: formatDate(formData.arrivalDate),
          departureDate: formatDate(formData.departureDate),
          adults: formData.adults,
          kids: formData.kids || '0',
          kidsAges: formData.kidsAges,
          hotelCategory: `${formData.hotelCategory} Star`,
          mealsIncluded: formData.mealsIncluded,
          budget: formData.budget || 'Not specified',
          message: formData.message || 'No special requests'
        },
        '37pN2ThzFwwhwk7ai'
      );

      console.log('SUCCESS!', response.status, response.text);
      setFormSubmitted(true);
      
      // Reset form after successful submission
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
    } catch (error) {
      console.error('FAILED...', error);
      alert(`Failed to send booking request. Error: ${error.text || 'Please try again later.'}`);
    }
  };

  return (
    <div className="bg-white">
      {/* Search Bar */}
      <div className={`fixed top-0 left-0 right-0 bg-white shadow-md z-50 transition-all duration-300 ${searchActive ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center">
          <input
            type="text"
            placeholder="Search destinations, packages, cities..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button 
            onClick={() => setSearchActive(false)}
            className="ml-4 text-gray-500 hover:text-gray-700"
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Search Button (floating) */}
      <button 
        onClick={() => setSearchActive(true)}
        className={`fixed bottom-8 right-8 ${primaryColor} text-white p-4 rounded-full shadow-lg z-40 transition-all duration-300 ${searchActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <FaSearch className="h-6 w-6" />
      </button>

      {/* Featured Destinations Carousel */}
      <section className="relative">
        <div className="relative h-screen max-h-[800px] overflow-hidden">
          {featuredDestinations.map((dest, index) => (
            <div 
              key={dest.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            >
              <img 
                src={dest.image} 
                alt={dest.title} 
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end pb-32 px-8`}>
                <div className="max-w-3xl">
                  <span className={`${primaryColor} text-white px-4 py-1 rounded-full text-sm font-bold mb-4 inline-block`}>Featured Destination</span>
                  <h3 className="text-5xl font-bold text-white mb-4">{dest.title}</h3>
                  <p className="text-xl text-gray-200 mb-6">{dest.description}</p>
                  <div className="flex items-center mb-6">
                    <span className="text-white font-medium">{dest.price} per person</span>
                  </div>
                  <button 
                    className={`bg-white hover:bg-gray-100 ${primaryTextColor} px-8 py-4 rounded-xl font-bold text-lg transition-colors duration-200 inline-flex items-center shadow-lg hover:shadow-xl`}
                    onClick={() => navigate(`/${dest.title.toLowerCase()}`)}
                  >
                    Explore <FaArrowRight className="ml-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <button 
            onClick={prevSlide}
            className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white/30 text-white p-4 rounded-full hover:bg-white/50 transition-colors z-10 backdrop-blur-sm"
          >
            <FaChevronLeft className="h-6 w-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white/30 text-white p-4 rounded-full hover:bg-white/50 transition-colors z-10 backdrop-blur-sm"
          >
            <FaChevronRight className="h-6 w-6" />
          </button>
          
          <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
            {featuredDestinations.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-4 h-4 rounded-full transition-all ${index === currentSlide ? 'bg-white w-6' : 'bg-white/50'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-10 w-full max-w-6xl px-4">
          <div className={`bg-white rounded-2xl shadow-2xl p-8 ${primaryBorderColor} border-t-4`}>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Where would you like to go?</h3>
            <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaMapMarkerAlt className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Destination"
                  className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaCalendarAlt className="text-gray-400" />
                </div>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Travel Dates"
                  className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaUserFriends className="text-gray-400" />
                </div>
                <select
                  className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 appearance-none"
                >
                  <option>Travelers</option>
                  <option>1 Adult</option>
                  <option>2 Adults</option>
                  <option>Family (2+2)</option>
                  <option>Group (5+)</option>
                </select>
              </div>
              <button
                type="button"
                onClick={() => setSearchActive(true)}
                className={`${primaryColor} ${primaryHoverColor} text-white px-6 py-3 rounded-lg font-bold transition-colors duration-200 flex items-center justify-center`}
              >
                Search Packages <FaArrowRight className="ml-2" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Trending Cities Section with Links */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className={`${primaryTextColor} font-semibold`}>POPULAR DESTINATIONS</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-3">Trending Cities To Visit</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the most popular destinations loved by travelers worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {trendingCities.map((city, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-64">
                <img 
                  src={city.image} 
                  alt={city.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white">{city.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-white font-medium">From {city.price}</span>
                    <button className="text-white hover:text-pink-300 transition-colors">
                      <IoMdHeart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <Link 
                  to={`/${city.slug}`}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/30 transition-opacity duration-300"
                >
                  <span className={`bg-white ${primaryTextColor} px-6 py-2 rounded-lg font-medium shadow-md hover:bg-pink-50 transition-colors`}>
                    Explore Packages
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Holiday Packages Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className={`${primaryTextColor} font-semibold`}>TRAVEL PACKAGES</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-3">Amazing Holiday Packages</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Handpicked experiences tailored to your travel style
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setShowAllPackages(false);
                }}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${activeCategory === category.id ? `${primaryColor} text-white` : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {displayedPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedPackages.map((pkg) => (
                <div 
                  key={pkg.id} 
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-pink-100"
                >
                  <div className={`absolute top-4 right-4 z-10 ${primaryColor} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                    {pkg.tag}
                  </div>
                  <div className="h-64 overflow-hidden relative">
                    <img 
                      src={pkg.image} 
                      alt={pkg.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute bottom-4 left-4 bg-white/90 text-pink-600 px-3 py-1 rounded-lg text-sm font-bold flex items-center">
                      <IoIosFlash className="mr-1" /> {pkg.discount} OFF
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">{pkg.title}</h3>
                    <p className="text-gray-600 mb-4 flex items-center">
                      <GiSuitcase className="mr-2 text-pink-500" /> {pkg.destination}
                    </p>
                    
                    <div className="flex items-center mb-4 text-gray-600">
                      <FaCalendarAlt className="mr-2 text-pink-500" />
                      <span>{pkg.duration}</span>
                    </div>
                    
                    <ul className="space-y-2 mb-6">
                      {pkg.highlights.slice(0, 3).map((highlight, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-bold text-pink-600">{pkg.price}</span>
                        <span className="ml-2 text-sm text-gray-500 line-through">{pkg.originalPrice}</span>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleViewDetails(pkg)}
                          className="border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center"
                        >
                          View
                        </button>
                        <button 
                          onClick={() => handleBookNow(pkg)}
                          className={`${primaryColor} ${primaryHoverColor} text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200`}
                        >
                          Book
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No packages found matching your search.</p>
            </div>
          )}

          {filteredPackages.length > 8 && (
            <div className="text-center mt-12">
              <button 
                className={`border-2 ${primaryBorderColor} ${primaryTextColor} hover:${primaryColor} hover:text-white px-8 py-3 rounded-lg font-bold transition-colors duration-200`}
                onClick={() => setShowAllPackages(!showAllPackages)}
              >
                {showAllPackages ? 'Show Less' : 'View All Packages'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className={`${primaryTextColor} font-semibold`}>WHY CHOOSE US</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-3">We Make Travel Easy</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need for a perfect trip in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="h-8 w-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Best Price Guarantee</h3>
              <p className="text-gray-600">
                We guarantee the best prices for all our packages. Found a better deal? We'll match it!
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="h-8 w-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Trusted & Safe</h3>
              <p className="text-gray-600">
                Your safety and satisfaction are our top priorities. Travel with confidence.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Support</h3>
              <p className="text-gray-600">
                Our travel experts are available round the clock to assist you anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`py-24 ${primaryColor} text-white relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-pink-700/20"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-white/30"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white/20"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-white/15"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-pink-200 font-semibold">HAPPY TRAVELERS</span>
            <h2 className="text-4xl font-bold mt-3">What Our Guests Say</h2>
            <p className="mt-4 text-lg text-pink-100 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our happy customers
            </p>
          </div>

          <div className="relative">
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white/20 text-white p-4 rounded-full hover:bg-white/30 transition-colors duration-200 shadow-lg"
            >
              <FaChevronLeft className="h-6 w-6" />
            </button>
            
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white/20 text-white p-4 rounded-full hover:bg-white/30 transition-colors duration-200 shadow-lg"
            >
              <FaChevronRight className="h-6 w-6" />
            </button>

            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-sm border-2 border-white/20 shadow-2xl">
                      <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-1/2">
                          <FaQuoteLeft className="text-pink-300 text-4xl mb-6" />
                          <p className="text-xl text-white mb-8 italic relative pl-8">
                            <span className="absolute left-0 top-0 text-6xl text-pink-300 font-serif">"</span>
                            {testimonial.quote}
                          </p>
                          <div className="flex items-center">
                            <div className="relative">
                              <img 
                                src={testimonial.image} 
                                alt={testimonial.name} 
                                className="w-20 h-20 rounded-full border-4 border-pink-300 object-cover shadow-md"
                              />
                              <div className="absolute -bottom-2 -right-2 bg-pink-400 rounded-full p-1 shadow-md">
                                <div className="bg-white rounded-full p-1 flex">
                                  {[...Array(5)].map((_, i) => (
                                    i < testimonial.rating ? 
                                      <FaStar key={i} className="text-yellow-400 h-4 w-4" /> : 
                                      <FaRegStar key={i} className="text-yellow-400 h-4 w-4" />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="ml-4">
                              <h4 className="font-bold text-2xl text-white">{testimonial.name}</h4>
                              <p className="text-pink-200">{testimonial.location}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="lg:w-1/2 hidden lg:block">
                          <div className="relative h-full rounded-xl overflow-hidden border-4 border-white shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 to-pink-900/30"></div>
                            <img 
                              src={testimonial.destinationImage} 
                              alt={testimonial.location} 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                              <div className="flex items-center">
                                <div className="bg-pink-500 p-2 rounded-lg mr-4">
                                  <FaMapMarkerAlt className="text-white text-xl" />
                                </div>
                                <div>
                                  <h3 className="text-white text-2xl font-bold">{testimonial.location.split(',')[0]}</h3>
                                  <p className="text-pink-200 font-medium">Featured Destination</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === activeTestimonial ? 'bg-white w-6 shadow-md' : 'bg-white/50'}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Package Details Modal */}
      {showDetailsModal && selectedPackage && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
              <h3 className="text-2xl font-bold text-gray-900">{selectedPackage.title}</h3>
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="relative h-80 rounded-xl overflow-hidden mb-6">
                    <img 
                      src={selectedPackage.image} 
                      alt={selectedPackage.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-white/90 text-pink-600 px-3 py-1 rounded-lg text-sm font-bold flex items-center">
                      <IoIosFlash className="mr-1" /> {selectedPackage.discount} OFF
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Package Highlights</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedPackage.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start bg-pink-50 p-3 rounded-lg">
                          <svg className="h-5 w-5 text-pink-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Detailed Itinerary</h4>
                    <div className="space-y-4">
                      {selectedPackage.itinerary.map((day, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-start">
                            <div className={`${primaryColor} text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4`}>
                              {day.day}
                            </div>
                            <div>
                              <h5 className="font-bold text-gray-900">{day.title}</h5>
                              <p className="text-gray-600 mt-1">{day.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-1">
                  <div className="bg-gray-50 p-6 rounded-xl sticky top-4">
                    <div className="mb-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">Package Summary</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Destination:</span>
                          <span className="font-medium">{selectedPackage.destination}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">{selectedPackage.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Category:</span>
                          <span className="font-medium capitalize">{selectedPackage.category}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">Price Details</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Package Price:</span>
                          <span className="text-pink-600 font-bold text-lg">{selectedPackage.price}</span>
                        </div>
                        <div className="flex justify-between text-gray-500 text-sm">
                          <span>Original Price:</span>
                          <span className="line-through">{selectedPackage.originalPrice}</span>
                        </div>
                        <div className="flex justify-between text-gray-500 text-sm">
                          <span>You Save:</span>
                          <span className="text-green-600">{selectedPackage.discount}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">Inclusions</h4>
                      <ul className="space-y-2">
                        {selectedPackage.inclusions.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">Exclusions</h4>
                      <ul className="space-y-2">
                        {selectedPackage.exclusions.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <button 
                      className={`w-full ${primaryColor} ${primaryHoverColor} text-white py-3 rounded-lg font-bold transition-colors duration-200`}
                      onClick={() => {
                        setShowDetailsModal(false);
                        handleBookNow(selectedPackage);
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Form Modal */}
      {showBookingForm && selectedPackage && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
              <h3 className="text-xl font-bold text-gray-900">Book {selectedPackage.title}</h3>
              <button 
                onClick={() => setShowBookingForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              {formSubmitted ? (
                <div className="text-center py-8">
                  <svg className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Booking Request Sent!</h4>
                  <p className="text-gray-600 mb-6">We've received your booking request for {selectedPackage.title}. Our travel expert will contact you shortly to confirm your booking.</p>
                  <button 
                    className={`${primaryColor} ${primaryHoverColor} text-white px-6 py-2 rounded-lg font-medium`}
                    onClick={() => setShowBookingForm(false)}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6 p-4 bg-pink-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-gray-900">{selectedPackage.title}</h4>
                      <span className="font-bold text-pink-600">{selectedPackage.price}</span>
                    </div>
                    <p className="text-sm text-gray-600">{selectedPackage.destination} | {selectedPackage.duration}</p>
                  </div>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-gray-700 mb-2" htmlFor="name">Full Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2" htmlFor="email">Email *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2" htmlFor="phone">Phone Number *</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2" htmlFor="arrivalDate">Arrival Date *</label>
                        <DatePicker
                          selected={formData.arrivalDate ? new Date(formData.arrivalDate) : null}
                          onChange={(date) => setFormData({...formData, arrivalDate: date})}
                          selectsStart
                          startDate={formData.arrivalDate ? new Date(formData.arrivalDate) : null}
                          endDate={formData.departureDate ? new Date(formData.departureDate) : null}
                          minDate={new Date()}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2" htmlFor="departureDate">Departure Date *</label>
                        <DatePicker
                          selected={formData.departureDate ? new Date(formData.departureDate) : null}
                          onChange={(date) => setFormData({...formData, departureDate: date})}
                          selectsEnd
                          startDate={formData.arrivalDate ? new Date(formData.arrivalDate) : null}
                          endDate={formData.departureDate ? new Date(formData.departureDate) : null}
                          minDate={formData.arrivalDate ? new Date(formData.arrivalDate) : new Date()}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2" htmlFor="adults">Number of Adults *</label>
                        <select
                          id="adults"
                          name="adults"
                          value={formData.adults}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                          required
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2" htmlFor="kids">Number of Kids</label>
                        <select
                          id="kids"
                          name="kids"
                          value={formData.kids}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                        >
                          <option value="">0</option>
                          {[1, 2, 3, 4, 5].map(num => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </div>
                      {formData.kids > 0 && (
                        <div>
                          <label className="block text-gray-700 mb-2" htmlFor="kidsAges">Kids Ages (comma separated)</label>
                          <input
                            type="text"
                            id="kidsAges"
                            name="kidsAges"
                            value={formData.kidsAges}
                            onChange={handleInputChange}
                            placeholder="e.g. 5, 8"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                          />
                        </div>
                      )}
                      <div>
                        <label className="block text-gray-700 mb-2" htmlFor="hotelCategory">Hotel Category *</label>
                        <select
                          id="hotelCategory"
                          name="hotelCategory"
                          value={formData.hotelCategory}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                          required
                        >
                          <option value="3">3 Star</option>
                          <option value="4">4 Star</option>
                          <option value="5">5 Star</option>
                          <option value="luxury">Luxury</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2" htmlFor="mealsIncluded">Meals Included *</label>
                        <select
                          id="mealsIncluded"
                          name="mealsIncluded"
                          value={formData.mealsIncluded}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                          required
                        >
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                          <option value="breakfast">Breakfast Only</option>
                          <option value="half-board">Half Board</option>
                          <option value="full-board">Full Board</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2" htmlFor="budget">Budget Range</label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                        >
                          <option value="">Select Budget</option>
                          <option value="economy">Economy (₹50,000 - ₹1,00,000)</option>
                          <option value="mid-range">Mid-Range (₹1,00,000 - ₹2,00,000)</option>
                          <option value="premium">Premium (₹2,00,000 - ₹4,00,000)</option>
                          <option value="luxury">Luxury (₹4,00,000+)</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-gray-700 mb-2" htmlFor="message">Special Requests</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                        placeholder="Any special requirements or preferences..."
                      ></textarea>
                    </div>
                    
                    <input type="hidden" name="package" value={selectedPackage.title} />
                    
                    <button
                      type="submit"
                      className={`w-full ${primaryColor} ${primaryHoverColor} text-white py-3 rounded-lg font-bold transition-colors duration-200`}
                    >
                      Submit Booking Request
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;