import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaPlane, FaHotel, FaRegStar, 
  FaArrowRight, FaChevronLeft, FaChevronRight, FaMapMarkerAlt, 
  FaCalendarAlt, FaUserFriends, FaTimes, FaSearch, FaQuoteLeft,
  FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaHeart
} from 'react-icons/fa';
import { FaUser, FaEnvelope, FaPhone, FaComment } from 'react-icons/fa';
import { FaGlobe, FaUmbrellaBeach, FaStar } from 'react-icons/fa';
import { FiMessageSquare } from 'react-icons/fi';
import { IoIosFlash, IoMdHeart } from 'react-icons/io';
import { GiSuitcase } from 'react-icons/gi';
import emailjs from '@emailjs/browser';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import kanikaman from "/videos/kanikaman.mp4";
import ishan from "/videos/ishan.mp4";
import Rashmika from "/videos/Rashmika.mp4";
import Raza from '/videos/raza.mp4';
import Debashree from '/videos/Debashree.mp4';
import Group from '/videos/Group.mp4';

// Chat Boat Component
const ChatBoat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    setMessages(prev => [...prev, { text: inputValue, sender: 'user' }]);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "Thanks for your message! Our travel experts will get back to you soon.", 
        sender: 'bot' 
      }]);
    }, 1000);
    
    setInputValue('');
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isOpen ? (
        <div className="w-80 h-96 bg-white rounded-t-xl shadow-xl flex flex-col">
          <div className="bg-pink-600 text-white p-3 rounded-t-xl flex justify-between items-center">
            <h3 className="font-bold">Travel Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-white">
              <FaTimes className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 h-full flex flex-col justify-center">
                <p>How can we help you with your travel plans?</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`mb-3 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
                >
                  <div 
                    className={`inline-block px-4 py-2 rounded-lg max-w-xs ${msg.sender === 'user' ? 'bg-pink-600 text-white' : 'bg-gray-100 text-gray-800'}`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="p-3 border-t flex">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-pink-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="bg-pink-600 text-white px-4 py-2 rounded-r-lg hover:bg-pink-700"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-pink-600 text-white p-4 rounded-full shadow-lg hover:bg-pink-700 transition-colors flex items-center justify-center"
        >
          <FiMessageSquare className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

// Simplified Contact Popup Component with only phone and email
const ContactPopup = ({ onClose }) => {
  const [showCallOptions, setShowCallOptions] = useState(true);

  const initiateCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
          <h3 className="text-xl font-bold text-gray-900">Contact Us</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-gray-900 text-center">Contact Our Team</h4>
            
            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={() => initiateCall('+919876543210')}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <div className="bg-pink-100 p-3 rounded-full mr-4">
                    <FaPhone className="text-pink-600" />
                  </div>
                  <div>
                    <h5 className="font-bold">Sales & Bookings</h5>
                    <p className="text-gray-600">+91 98765 43210</p>
                  </div>
                </div>
                <span className="text-pink-600 font-medium">Call Now</span>
              </button>
              
              <button
                onClick={() => initiateCall('+919876543211')}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <div className="bg-pink-100 p-3 rounded-full mr-4">
                    <FaPhone className="text-pink-600" />
                  </div>
                  <div>
                    <h5 className="font-bold">Customer Support</h5>
                    <p className="text-gray-600">+91 98765 43211</p>
                  </div>
                </div>
                <span className="text-pink-600 font-medium">Call Now</span>
              </button>
              
              <button
                onClick={() => initiateCall('+919876543212')}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <div className="bg-pink-100 p-3 rounded-full mr-4">
                    <FaPhone className="text-pink-600" />
                  </div>
                  <div>
                    <h5 className="font-bold">Emergency</h5>
                    <p className="text-gray-600">+91 98765 43212</p>
                  </div>
                </div>
                <span className="text-pink-600 font-medium">Call Now</span>
              </button>

              <a
                href="mailto:info@traveligo.com"
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <div className="bg-pink-100 p-3 rounded-full mr-4">
                    <FaEnvelope className="text-pink-600" />
                  </div>
                  <div>
                    <h5 className="font-bold">Email Support</h5>
                    <p className="text-gray-600">info@traveligo.com</p>
                  </div>
                </div>
                <span className="text-pink-600 font-medium">Email Now</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showQuotesForm, setShowQuotesForm] = useState(false);
  const [showNotifyForm, setShowNotifyForm] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);
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
  const [quotesFormData, setQuotesFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'General Inquiry'
  });
  const [notifyFormData, setNotifyFormData] = useState({
    name: '',
    email: '',
    interests: []
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [quotesFormSubmitted, setQuotesFormSubmitted] = useState(false);
  const [notifyFormSubmitted, setNotifyFormSubmitted] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showAllPackages, setShowAllPackages] = useState(false);
  const [showAllUpcoming, setShowAllUpcoming] = useState(false);
  const [likedVideos, setLikedVideos] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState('');
  
  // Video testimonials state
  const [videoStates, setVideoStates] = useState([
    { isPlaying: false, isMuted: false, progress: 0 },
    { isPlaying: false, isMuted: false, progress: 0 },
    { isPlaying: false, isMuted: false, progress: 0 },
    { isPlaying: false, isMuted: false, progress: 0 },
    { isPlaying: false, isMuted: false, progress: 0 },
    { isPlaying: false, isMuted: false, progress: 0 }
  ]);
  const videoRefs = useRef([]);
  const quotesFormRef = useRef();

  // Destinations for dropdown
  const destinations = [
    { id: 'all', name: 'All Destinations' },
    { id: 'kashmir', name: 'Kashmir' },
    { id: 'goa', name: 'Goa' },
    { id: 'bali', name: 'Bali' },
    { id: 'maldives', name: 'Maldives' },
    { id: 'darjeeling', name: 'Darjeeling' },
    { id: 'dubai', name: 'Dubai' },
    { id: 'europe', name: 'Europe' },
    { id: 'thailand', name: 'Thailand' }
  ];

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Packages' },
    { id: 'luxury', name: 'Luxury' },
    { id: 'adventure', name: 'Adventure' },
    { id: 'cultural', name: 'Cultural' },
    { id: 'beach', name: 'Beach' },
    { id: 'international', name: 'International' }
  ];

  // Video testimonials data
  const videoTestimonials = [
    {
      id: 1,
      name: 'Ishaan Khatter',
      role: 'Bollywood Actor',
      content: ishan,
      thumbnail: '/images/ishan.jpeg',
    },
    {
      id: 2,
      name: 'Kanika Mann',
      role: 'Artist',
      content: kanikaman,
      thumbnail: '/images/kanikamann.jpeg',
    },
    {
      id: 3,
      name: 'Rashmeet Kaur',
      role: 'Singer',
      content: Rashmika,
      thumbnail: '/images/rashmika.jpeg',
    },
    {
      id: 4,
      name: 'Dr Raza',
      role: 'Doctor',
      content: Raza,
      thumbnail: '/images/raza.jpeg',
    },
  ];

  // Women's Solo Trip Videos
  const soloTripVideos = [
    {
      id: 5,
      name: 'Ms Debashree Mukerjee',
      role: 'Solo Traveler',
      content: Debashree,
      thumbnail: '/images/solo1.jpg',
    },
  ];

  // Group Trip Videos
  const groupTripVideos = [
    {
      id: 6,
      name: 'Group Adventure',
      role: 'Group Trip',
      content: Group,
      thumbnail: '/images/group-thumbnail.jpg'
    }
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
      category: 'luxury',
      destinationId: 'maldives'
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
      category: 'adventure',
      destinationId: 'bali'
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
      category: 'cultural',
      destinationId: 'europe'
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
      category: 'luxury',
      destinationId: 'dubai'
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
      category: 'luxury',
      destinationId: 'darjeeling'
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
      category: 'luxury',
      destinationId: 'europe'
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
      category: 'beach',
      destinationId: 'goa'
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
      category: 'cultural',
      destinationId: 'kerala'
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
      category: "cultural",
      destinationId: "kashmir"
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
      category: "international",
      destinationId: "thailand"
    },
  ];

  // Upcoming Packages Data
  const upcomingPackages = [
    {
      id: 17,
      title: 'Kashmir Paradise Tour',
      destination: '7D/6N in Kashmir',
      duration: '7 Days',
      price: '₹49,999',
      originalPrice: '₹64,999',
      discount: '23%',
      image: '/images/kashmir.jpeg',
      highlights: [
        'Shikara Ride on Dal Lake',
        'Gondola Ride in Gulmarg',
        'Pahalgam Valley Exploration',
        'Stay in Houseboat',
        'Mughal Gardens Visit'
      ],
      itinerary: [
        { 
          day: 1, 
          title: 'Arrival in Srinagar', 
          description: 'Transfer to hotel. Evening Shikara ride on Dal Lake during sunset.' 
        },
        { 
          day: 2, 
          title: 'Srinagar Sightseeing', 
          description: 'Visit Mughal Gardens (Shalimar Bagh, Nishat Bagh), Hazratbal Shrine, and local markets.' 
        },
        { 
          day: 3, 
          title: 'Gulmarg Excursion', 
          description: 'Gondola cable car ride (Phase 1 or 2 depending on weather), visit Alpather Lake and golf course.' 
        },
        { 
          day: 4, 
          title: 'Pahalgam Exploration', 
          description: 'Visit Betaab Valley, Aru Valley, and Chandanwari (gateway to Amarnath Yatra).' 
        },
        { 
          day: 5, 
          title: 'Sonmarg Day Trip', 
          description: 'Visit Thajiwas Glacier (pony ride available) and enjoy mountain views.' 
        },
        { 
          day: 6, 
          title: 'Houseboat Experience', 
          description: 'Check into traditional houseboat. Leisure day with optional activities like walnut wood carving demo.' 
        },
        { 
          day: 7, 
          title: 'Departure', 
          description: 'Transfer to Srinagar airport with farewell gifts.' 
        }
      ],
      inclusions: [
        '6 nights accommodation (3-star hotels + 1 night houseboat)',
        'Daily breakfast and dinner (MAP Plan)',
        'All transfers in private vehicle (Sedan for 2-3 pax, Innova for 4-6 pax)',
        'Shikara ride on Dal Lake (1 hour)',
        'Gulmarg Gondola ticket (Phase 1)',
        'Driver charges, toll taxes and parking'
      ],
      exclusions: [
        'Airfare to/from Srinagar',
        'Gondola ticket (Phase 2)',
        'Pony rides in Sonmarg/Pahalgam',
        'Lunch and personal expenses',
        'Travel insurance',
        'Anything not mentioned in inclusions'
      ],
      tag: 'Best Seller',
      category: 'cultural',
      launchDate: '2024-03-01',
      bestSeason: 'April to October',
      specialNotes: 'Warm clothing recommended even in summer months. Package can be customized for winter snow experience.'
    },
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

  // Video progress tracking
  useEffect(() => {
    const interval = setInterval(() => {
      setVideoStates(prevStates => {
        return prevStates.map((state, index) => {
          const video = videoRefs.current[index];
          if (!video) return state;
          
          const newProgress = video.duration > 0 
            ? (video.currentTime / video.duration) * 100 
            : 0;
            
          return {
            ...state,
            progress: newProgress
          };
        });
      });
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  // Color variables
  const primaryColor = 'bg-pink-600';
  const primaryHoverColor = 'hover:bg-pink-700';
  const primaryTextColor = 'text-pink-600';
  const primaryBorderColor = 'border-pink-600';
  const primaryBgLight = 'bg-pink-50';

  // Video controls
  const togglePlay = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;
    
    if (video.paused) {
      video.play();
      setVideoStates(prevStates => {
        const newStates = [...prevStates];
        newStates[index] = { ...newStates[index], isPlaying: true };
        return newStates;
      });
    } else {
      video.pause();
      setVideoStates(prevStates => {
        const newStates = [...prevStates];
        newStates[index] = { ...newStates[index], isPlaying: false };
        return newStates;
      });
    }
  };

  const toggleMute = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;
    
    video.muted = !video.muted;
    setVideoStates(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = { ...newStates[index], isMuted: video.muted };
      return newStates;
    });
  };

  const handleVideoHover = (index, isHovering) => {
    const video = videoRefs.current[index];
    if (!video) return;
    
    if (isHovering && !videoStates[index].isPlaying) {
      video.currentTime = 0;
      video.play();
      setVideoStates(prevStates => {
        const newStates = [...prevStates];
        newStates[index] = { ...newStates[index], isPlaying: true };
        return newStates;
      });
    } else if (!isHovering && videoStates[index].isPlaying) {
      video.pause();
      setVideoStates(prevStates => {
        const newStates = [...prevStates];
        newStates[index] = { ...newStates[index], isPlaying: false };
        return newStates;
      });
    }
  };

  const toggleLike = (videoId) => {
    if (likedVideos.includes(videoId)) {
      setLikedVideos(likedVideos.filter(id => id !== videoId));
    } else {
      setLikedVideos([...likedVideos, videoId]);
    }
  };

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
        (selectedDestination === '' || pkg.destinationId === selectedDestination) &&
        (pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()))))
    : holidayPackages.filter(pkg => 
        pkg.category === activeCategory && 
        (selectedDestination === '' || pkg.destinationId === selectedDestination) &&
        (pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase())))
        );

  const displayedPackages = showAllPackages 
    ? filteredPackages 
    : filteredPackages.slice(0, 6);

  const displayedUpcomingPackages = showAllUpcoming
    ? upcomingPackages
    : upcomingPackages.slice(0, 3);

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

  const handleQuotesInputChange = (e) => {
    const { name, value } = e.target;
    setQuotesFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotifyInputChange = (e) => {
    const { name, value } = e.target;
    setNotifyFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestChange = (interest) => {
    setNotifyFormData(prev => {
      const interests = [...prev.interests];
      const index = interests.indexOf(interest);
      
      if (index === -1) {
        interests.push(interest);
      } else {
        interests.splice(index, 1);
      }
      
      return {
        ...prev,
        interests
      };
    });
  };

  // Handle search
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSearchActive(e.target.value.length > 0);
  };

  // Handle destination change
  const handleDestinationChange = (e) => {
    setSelectedDestination(e.target.value);
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
        'service_ov629rm',
        'template_jr1dnto',
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

  // Submit quotes form
  const handleQuotesSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await emailjs.send(
        'service_9jzlq6q',
        'template_fkm3hio',
        {
          name: quotesFormData.name,
          email: quotesFormData.email,
          phone: quotesFormData.phone,
          message: quotesFormData.message || 'No additional message'
        },
        '127OFHb2IQq0zSiFJ'
      );

      console.log('SUCCESS!', response.status, response.text);
      setQuotesFormSubmitted(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setQuotesFormSubmitted(false);
        setShowQuotesForm(false);
        setQuotesFormData({
          name: '',
          email: '',
          phone: '',
          interest: 'General Inquiry'
        });
      }, 3000);
    } catch (error) {
      console.error('FAILED...', error);
      alert(`Failed to send enquiry. Error: ${error.text || 'Please try again later.'}`);
    }
  };

  // Submit notify form
  const handleNotifySubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await emailjs.send(
        'service_9jzlq6q',
        'template_fkm3hio',
        {
          name: notifyFormData.name,
          email: notifyFormData.email,
          interests: notifyFormData.interests.join(', '),
        
        },
        '127OFHb2IQq0zSiFJ'
      );

      console.log('SUCCESS!', response.status, response.text);
      setNotifyFormSubmitted(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setNotifyFormSubmitted(false);
        setShowNotifyForm(false);
        setNotifyFormData({
          name: '',
          email: '',
          interests: []
        });
      }, 3000);
    } catch (error) {
      console.error('FAILED...', error);
      alert(`Failed to submit notification request. Error: ${error.text || 'Please try again later.'}`);
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
        className={`fixed bottom-25 right-8 ${primaryColor} text-white p-4 rounded-full shadow-lg z-40 transition-all duration-300 ${searchActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <FaSearch className="h-6 w-6" />
      </button>

      {/* Contact Button (floating) */}
      <button 
        onClick={() => setShowContactPopup(true)}
        className={`fixed bottom-40 right-8 ${primaryColor} text-white p-4 rounded-full shadow-lg z-40 transition-all duration-300`}
      >
        <FaPhone className="h-6 w-6" />
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
            className="absolute left-8 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white/30 text-white p-4 rounded-full hover:bg-white/50 transition-colors duration-200 shadow-lg"
          >
            <FaChevronLeft className="h-6 w-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white/30 text-white p-4 rounded-full hover:bg-white/50 transition-colors duration-200 shadow-lg"
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

        {/* Search Form - Moved Below */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-10 w-full max-w-6xl px-4">
          <div className={`bg-white rounded-2xl shadow-2xl p-8 ${primaryBorderColor} border-t-4`}>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Where would you like to go?</h3>
            <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaMapMarkerAlt className="text-gray-400" />
                </div>
                <select
                  value={selectedDestination}
                  onChange={handleDestinationChange}
                  className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 appearance-none"
                >
                  {destinations.map(dest => (
                    <option key={dest.id} value={dest.id}>{dest.name}</option>
                  ))}
                </select>
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

      {/* Premium Travel Quote Section */}
      <section className="py-20 relative overflow-hidden min-h-[600px]">
        {/* Background Image with Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
            filter: "brightness(0.8)"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-pink-700/40"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full">
          <div className="flex flex-col lg:flex-row items-center h-full">
            {/* Content Section - Left Side */}
            <div className="text-white p-8 lg:w-1/2 lg:pr-16">
              <h1 className="text-5xl font-bold mb-8 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-300">
                  World Tour Packages
                </span>
              </h1>
              
              <div className="space-y-8">
                <div className="flex items-start transform hover:scale-[1.02] transition-all duration-300">
                  <div className="flex-shrink-0 bg-white/30 p-3 rounded-full mr-4 backdrop-blur-sm">
                    <FaGlobe className="h-7 w-7 text-pink-200" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white drop-shadow-lg">200+ International Destinations</h3>
                    <p className="text-pink-100 mt-2 text-lg">Explore the world's most breathtaking locations</p>
                  </div>
                </div>
                
                <div className="flex items-start transform hover:scale-[1.02] transition-all duration-300">
                  <div className="flex-shrink-0 bg-white/30 p-3 rounded-full mr-4 backdrop-blur-sm">
                    <FaHotel className="h-7 w-7 text-pink-200" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white drop-shadow-lg">Luxury Accommodations</h3>
                    <p className="text-pink-100 mt-2 text-lg">Stay at the finest hotels and resorts worldwide</p>
                  </div>
                </div>
                
                <div className="flex items-start transform hover:scale-[1.02] transition-all duration-300">
                  <div className="flex-shrink-0 bg-white/30 p-3 rounded-full mr-4 backdrop-blur-sm">
                    <FaUmbrellaBeach className="h-7 w-7 text-pink-200" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white drop-shadow-lg">Custom Experiences</h3>
                    <p className="text-pink-100 mt-2 text-lg">Tailored itineraries for your dream vacation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Form - Right Side (Shifted Right) */}
            <div className="w-full lg:w-[480px] px-4 mt-8 lg:mt-0 lg:ml-20">
              <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-white/20 p-8 transform hover:shadow-3xl transition-all duration-500">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    Get Free Quotes
                  </h2>
                  <p className="text-gray-600 mt-3 text-base">Let our travel experts craft your perfect vacation</p>
                </div>
                
                <form ref={quotesFormRef} onSubmit={handleQuotesSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input 
                      type="text" 
                      name="name"
                      value={quotesFormData.name}
                      onChange={handleQuotesInputChange}
                      className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input 
                      type="email" 
                      name="email"
                      value={quotesFormData.email}
                      onChange={handleQuotesInputChange}
                      className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                      placeholder="Your email"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={quotesFormData.phone}
                      onChange={handleQuotesInputChange}
                      className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                      placeholder="Your phone"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Area of Interest</label>
                    <select
                      name="interest"
                      value={quotesFormData.interest}
                      onChange={handleQuotesInputChange}
                      className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Honeymoon Packages">Honeymoon Packages</option>
                      <option value="Family Vacations">Family Vacations</option>
                      <option value="Adventure Travel">Adventure Travel</option>
                      <option value="Luxury Getaways">Luxury Getaways</option>
                      <option value="Group Tours">Group Tours</option>
                    </select>
                  </div>
                  
                
                  
                  {quotesFormSubmitted ? (
                    <div className="bg-green-100 text-green-700 p-3 rounded-lg text-center">
                      Thank you! We've received your inquiry and will contact you shortly.
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                    >
                      GET FREE QUOTE →
                    </button>
                  )}
                </form>
              </div>
            </div>
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

          {filteredPackages.length > 6 && (
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

      {/* Upcoming Packages Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-pink-600 font-semibold">COMING SOON</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-3">Upcoming Travel Packages</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Exciting new destinations we're launching soon - get early bird discounts!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedUpcomingPackages.map((pkg) => (
              <div 
                key={pkg.id} 
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-pink-200"
              >
                <div className="absolute top-4 right-4 z-10 bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {pkg.tag}
                </div>
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 bg-white/90 text-pink-600 px-3 py-1 rounded-lg text-sm font-bold flex items-center">
                    <IoIosFlash className="mr-1" /> Launching {pkg.launchDate}
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
                        <svg className="h-5 w-5 text-pink-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    <button 
                      onClick={() => {
                        setSelectedPackage(pkg);
                        setShowNotifyForm(true);
                      }}
                      className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                    >
                      Get Early Access
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button 
              onClick={() => setShowNotifyForm(true)}
              className="border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white px-8 py-3 rounded-lg font-bold transition-colors duration-200"
            >
              Notify Me About New Packages
            </button>
            {upcomingPackages.length > 3 && (
              <button 
                onClick={() => setShowAllUpcoming(!showAllUpcoming)}
                className="ml-4 border-2 border-gray-300 text-gray-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold transition-colors duration-200"
              >
                {showAllUpcoming ? 'Show Less' : 'View All Upcoming'}
              </button>
            )}
          </div>
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

      {/* Video Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Video Testimonials
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Watch our travelers share their unforgettable experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {videoTestimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[9/16] group"
                onMouseEnter={() => handleVideoHover(index, true)}
                onMouseLeave={() => handleVideoHover(index, false)}
              >
                <video
                  ref={el => videoRefs.current[index] = el}
                  src={testimonial.content}
                  loop
                  muted={videoStates[index].isMuted}
                  className="w-full h-full object-cover"
                  playsInline
                  preload="metadata"
                  poster={testimonial.thumbnail}
                />
                
                {/* Video overlay with gradient */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent flex flex-col justify-between p-6`}>
                  {/* Top info */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-xl text-white">{testimonial.name}</h3>
                      <p className="text-sm text-white/80">{testimonial.role}</p>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(testimonial.id);
                      }}
                      className={`p-2 rounded-full ${likedVideos.includes(testimonial.id) ? 'bg-pink-600 text-white' : 'bg-white/20 text-white hover:bg-white/30'} transition-colors`}
                    >
                      <FaHeart className="h-5 w-5" />
                    </button>
                  </div>
                  
                  {/* Center play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => togglePlay(index)}
                      className={`p-5 rounded-full ${videoStates[index].isPlaying ? 'bg-white/30' : 'bg-white/20'} hover:bg-white/40 backdrop-blur-md shadow-lg transform group-hover:scale-110 transition-transform`}
                    >
                      {videoStates[index].isPlaying ? (
                        <FaPause className="text-white text-2xl" />
                      ) : (
                        <FaPlay className="text-white text-2xl" />
                      )}
                    </button>
                  </div>
                  
                  {/* Bottom controls */}
                  <div className="flex flex-col gap-3">
                    <div className="w-full bg-white/30 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-white h-1.5 rounded-full"
                        style={{ width: `${videoStates[index].progress}%` }}
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMute(index);
                        }}
                        className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                      >
                        {videoStates[index].isMuted ? (
                          <FaVolumeMute className="text-white h-4 w-4" />
                        ) : (
                          <FaVolumeUp className="text-white h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Play indicator */}
                {!videoStates[index].isPlaying && (
                  <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <FaPlay size={10} /> PLAY
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button 
              className={`${primaryColor} ${primaryHoverColor} text-white px-8 py-3 rounded-lg font-bold transition-colors duration-200 inline-flex items-center`}
            >
              View More Testimonials <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Women's Solo Trip Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Women's Solo Trip Experiences
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Safe and empowering travel experiences designed exclusively for women
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {soloTripVideos.map((testimonial, index) => {
              const videoIndex = index + videoTestimonials.length; // Offset index
              return (
                <div 
                  key={testimonial.id}
                  className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[9/16] group"
                  onMouseEnter={() => handleVideoHover(videoIndex, true)}
                  onMouseLeave={() => handleVideoHover(videoIndex, false)}
                >
                  <video
                    ref={el => videoRefs.current[videoIndex] = el}
                    src={testimonial.content}
                    loop
                    muted={videoStates[videoIndex].isMuted}
                    className="w-full h-full object-cover"
                    playsInline
                    preload="metadata"
                    poster={testimonial.thumbnail}
                  />
                  
                  {/* Video overlay with gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent flex flex-col justify-between p-6`}>
                    {/* Top info */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-xl text-white">{testimonial.name}</h3>
                        <p className="text-sm text-white/80">{testimonial.role}</p>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(testimonial.id);
                        }}
                        className={`p-2 rounded-full ${likedVideos.includes(testimonial.id) ? 'bg-pink-600 text-white' : 'bg-white/20 text-white hover:bg-white/30'} transition-colors`}
                      >
                        <FaHeart className="h-5 w-5" />
                      </button>
                    </div>
                    
                    {/* Bottom controls */}
                    <div className="flex flex-col gap-3">
                      <div className="w-full bg-white/30 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-white h-1.5 rounded-full"
                          style={{ width: `${videoStates[videoIndex].progress}%` }}
                        />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <button
                          onClick={() => togglePlay(videoIndex)}
                          className={`p-3 rounded-full ${videoStates[videoIndex].isPlaying ? 'bg-white/30' : 'bg-white/20'} hover:bg-white/40 backdrop-blur-md shadow-lg`}
                        >
                          {videoStates[videoIndex].isPlaying ? (
                            <FaPause className="text-white" />
                          ) : (
                            <FaPlay className="text-white" />
                          )}
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMute(videoIndex);
                          }}
                          className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                        >
                          {videoStates[videoIndex].isMuted ? (
                            <FaVolumeMute className="text-white" />
                          ) : (
                            <FaVolumeUp className="text-white" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Play indicator */}
                  {!videoStates[videoIndex].isPlaying && (
                    <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <FaPlay size={10} /> PLAY
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="text-center mt-12">
            <button 
              className={`${primaryColor} ${primaryHoverColor} text-white px-8 py-3 rounded-lg font-bold transition-colors duration-200 inline-flex items-center`}
            >
              Explore Women's Solo Trips <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Group Trips Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Amazing Group Trips
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Create unforgettable memories with friends and family on our curated group tours
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {groupTripVideos.map((testimonial, index) => {
              const videoIndex = index + videoTestimonials.length + soloTripVideos.length; // Offset index
              return (
                <div 
                  key={testimonial.id}
                  className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[9/16] group"
                  onMouseEnter={() => handleVideoHover(videoIndex, true)}
                  onMouseLeave={() => handleVideoHover(videoIndex, false)}
                >
                  <video
                    ref={el => videoRefs.current[videoIndex] = el}
                    src={testimonial.content}
                    loop
                    muted={videoStates[videoIndex].isMuted}
                    className="w-full h-full object-cover"
                    playsInline
                    preload="metadata"
                    poster={testimonial.thumbnail}
                  />
                  
                  {/* Video overlay with gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent flex flex-col justify-between p-6`}>
                    {/* Top info */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-xl text-white">{testimonial.name}</h3>
                        <p className="text-sm text-white/80">{testimonial.role}</p>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(testimonial.id);
                        }}
                        className={`p-2 rounded-full ${likedVideos.includes(testimonial.id) ? 'bg-pink-600 text-white' : 'bg-white/20 text-white hover:bg-white/30'} transition-colors`}
                      >
                        <FaHeart className="h-5 w-5" />
                      </button>
                    </div>
                    
                    {/* Bottom controls */}
                    <div className="flex flex-col gap-3">
                      <div className="w-full bg-white/30 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-white h-1.5 rounded-full"
                          style={{ width: `${videoStates[videoIndex].progress}%` }}
                        />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <button
                          onClick={() => togglePlay(videoIndex)}
                          className={`p-3 rounded-full ${videoStates[videoIndex].isPlaying ? 'bg-white/30' : 'bg-white/20'} hover:bg-white/40 backdrop-blur-md shadow-lg`}
                        >
                          {videoStates[videoIndex].isPlaying ? (
                            <FaPause className="text-white" />
                          ) : (
                            <FaPlay className="text-white" />
                          )}
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMute(videoIndex);
                          }}
                          className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                        >
                          {videoStates[videoIndex].isMuted ? (
                            <FaVolumeMute className="text-white" />
                          ) : (
                            <FaVolumeUp className="text-white" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Play indicator */}
                  {!videoStates[videoIndex].isPlaying && (
                    <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <FaPlay size={10} /> PLAY
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="text-center mt-12">
            <button 
              className={`${primaryColor} ${primaryHoverColor} text-white px-8 py-3 rounded-lg font-bold transition-colors duration-200 inline-flex items-center`}
            >
              Explore Group Trips <FaArrowRight className="ml-2" />
            </button>
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
                          <option value="">(Below 50000)</option>
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

      {/* Notify Me Modal */}
      {showNotifyForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
              <h3 className="text-xl font-bold text-gray-900">Notify Me About New Packages</h3>
              <button 
                onClick={() => setShowNotifyForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              {notifyFormSubmitted ? (
                <div className="text-center py-8">
                  <svg className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h4>
                  <p className="text-gray-600 mb-6">We'll notify you as soon as new packages are available.</p>
                  <button 
                    className={`${primaryColor} ${primaryHoverColor} text-white px-6 py-2 rounded-lg font-medium`}
                    onClick={() => setShowNotifyForm(false)}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleNotifySubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="notify-name">Full Name *</label>
                    <input
                      type="text"
                      id="notify-name"
                      name="name"
                      value={notifyFormData.name}
                      onChange={handleNotifyInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="notify-email">Email *</label>
                    <input
                      type="email"
                      id="notify-email"
                      name="email"
                      value={notifyFormData.email}
                      onChange={handleNotifyInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-3">Interests (Select all that apply)</label>
                    <div className="space-y-2">
                      {categories.filter(c => c.id !== 'all').map(category => (
                        <div key={category.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`interest-${category.id}`}
                            checked={notifyFormData.interests.includes(category.id)}
                            onChange={() => handleInterestChange(category.id)}
                            className="h-5 w-5 text-pink-600 rounded focus:ring-pink-500"
                          />
                          <label htmlFor={`interest-${category.id}`} className="ml-2 text-gray-700">
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="notify-message">Additional Message</label>
                    <textarea
                      id="notify-message"
                      name="message"
                      value={notifyFormData.message}
                      onChange={handleNotifyInputChange}
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      placeholder="Any specific requirements for the packages you're interested in?"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className={`w-full ${primaryColor} ${primaryHoverColor} text-white py-3 rounded-lg font-bold transition-colors duration-200 mt-4`}
                  >
                    Submit Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Contact Popup */}
      {showContactPopup && (
        <ContactPopup onClose={() => setShowContactPopup(false)} />
      )}

      {/* Chat Boat Component */}
      <ChatBoat />
    </div>
  );
};

export default Home;