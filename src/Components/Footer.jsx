import { Link, useNavigate } from 'react-router-dom';
import logo from './logo.jpeg';
import { useState } from 'react';
import { FaFacebook, FaYoutube, FaInstagram, FaLinkedin, FaArrowRight, FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter, FaHeart } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import React from 'react';

emailjs.init("37pN2ThzFwwhwk7ai");

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showWhatsappChat, setShowWhatsappChat] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  const links = {
    Explore: [
      { name: 'Kashmir Tours', path: '/kashmir' },
      { name: 'Ladakh Adventures', path: '/ladakh' },
      { name: 'Honeymoon Specials', path: '/honeymoon' },
      { name: 'Himachal Manali Packages', path: '/Himachal' },
      { name: 'Rajasthan Packages', path: '/Rajasthan' },
      { name: 'Goa Packages', path: '/Goa' },
      { name: 'Kerala Packages', path: '/Kerala' },
      { name: 'Dubai Packages', path: '/Dubai' },
      { name: 'Bali Packages', path: '/Bali' },
      { name: 'Thailand Packages', path: '/Thailand' },
      { name: 'Gangtok & Dargelling', path: '/GangtokDargelling' },
    ],
    Company: [
      { name: 'About Us', path: '/about' },
      { name: 'Our Team', path: '/team' },
      { name: 'Testimonials', path: '/Testimonials' },
      { name: 'Womens Solo trip', path: '/Womens' },
      { name: 'Group Trip', path: '/Section' },
      { name: 'Careers', path: '/careers' },
      { name: 'Gallery', path: '/Gallery' },
      { name: 'Destination Weddings', path: '/Weddings' }
    ],
    Support: [
      { name: 'Contact Us', path: '/contact' },
      { name: 'FAQs', path: '/faqs' },
      { name: 'Booking Policy', path: '/policy' },
      { name: 'Privacy Policy', path: '/privacy' }
    ]
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await emailjs.send(
        'service_ov629rm',
        'template_lwqkh1f',
        {
          to_email: 'traveligo00@gmail.com',
          from_email: email,
          website: 'Traveligo',
          reply_to: email
        },
        '37pN2ThzFwwhwk7ai'
      );
      
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    } catch (err) {
      console.error('EmailJS Error:', err);
      setError('Failed to subscribe. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-pink-50 via-white to-white pt-20 pb-12 relative overflow-hidden">
      {/* WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowWhatsappChat(!showWhatsappChat)}
          className="bg-green-500 text-white p-4 rounded-full shadow-xl hover:bg-green-600 transition-colors flex items-center justify-center relative"
          aria-label="WhatsApp Chat"
        >
          <FaWhatsapp className="text-3xl" />
          <span className="absolute bg-red-500 text-white text-xs rounded-full px-2 py-1 -top-2 -right-2 animate-pulse">1</span>
        </motion.button>

        {showWhatsappChat && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-2xl overflow-hidden w-80 mt-4"
          >
            <div className="bg-green-500 p-4 text-white flex justify-between items-center">
              <div className="flex items-center">
                <FaWhatsapp className="text-2xl mr-2" />
                <span className="font-bold">WhatsApp Support</span>
              </div>
              <button 
                onClick={() => setShowWhatsappChat(false)}
                className="text-white hover:text-gray-200 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-4 bg-gray-50 h-64 overflow-y-auto">
              <div className="text-center py-8">
                <FaWhatsapp className="text-5xl text-green-500 mx-auto mb-4" />
                <p className="text-gray-700 mb-4">Hi there! How can we help you?</p>
                <p className="text-sm text-gray-500">We'll respond as soon as possible</p>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200">
              <a 
                href="https://wa.me/919796337997" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-lg font-medium transition-colors"
              >
                Start Chat
              </a>
            </div>
          </motion.div>
        )}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center mb-6"
            >
              <img src={logo} alt="Traveligo" className="h-16 mr-3" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-pink-100 mb-6"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Traveligo: Curators of Dreams, Architects of Journeys
              </h3>
              <div className="text-gray-700 space-y-3 text-sm">
                <p>
                  Since 2018, Traveligo has grown from a regional travel specialist into a visionary force in global travel experiences — crafting journeys that move hearts, spark wonder, and stay with you long after the return flight home.
                </p>
                <p>
                  Rooted in the heavenly beauty of Kashmir, Ladakh, and the Indian Himalayas, we began by offering soulful, personalized escapes in our homeland. Today, we extend those same values — authenticity, care, and connection — to a global canvas of destinations across Europe, Southeast Asia, the Middle East, the Indian Ocean, and beyond.
                </p>
                <p>
                  From snow-dusted valleys to sunlit coastlines, from private island retreats to culturally immersive explorations, Traveligo is more than a travel company — we are your storyteller, guide, and guardian of unforgettable moments.
                </p>
                
                <h4 className="text-lg font-bold mt-4 text-pink-600">Beyond Travel — A Journey to the Soul</h4>
                <p>
                  In a fast-paced world hungry for meaning, travel is no longer just a break — it's a bridge.
                  A bridge between people and places. Between who you are and who you could become.
                </p>
                <p>
                  At Traveligo, we don't just create trips. We design transformational journeys — romantic honeymoons, luxurious getaways, family holidays, soul-searching adventures, and cultural deep-dives — all seamlessly curated with precision, passion, and a personal touch.
                </p>
                <p>
                  Every itinerary we craft is layered with local insight, global expertise, and the quiet luxury of feeling truly seen and understood.
                </p>
                
                <h4 className="text-lg font-bold mt-4 text-pink-600">Where Elegance Meets Exploration</h4>
                <p>
                  With our growing network of global partners, expert planners, and destination insiders, we offer unfiltered access to the world's most breathtaking experiences — often reserved for a privileged few.
                </p>
                <p className="italic text-pink-500">
                  Whether it's:<br />
                  • A shikara ride through Kashmir's moonlit lakes<br />
                  • A private dinner under the stars in the Maldives<br />
                  • A hot air balloon ride over Cappadocia<br />
                  • Or a sunset yacht escape in Santorini<br />
                </p>
                <p>
                  Every moment is designed to delight, restore, and inspire — with comfort, beauty, and soul.
                </p>
                
                <h4 className="text-lg font-bold mt-4 text-pink-600">A New Chapter in Global Discovery</h4>
                <p>
                  Led by a young, passionate team that values innovation as much as tradition, Traveligo is reshaping what modern travel can be. We blend digital convenience with handcrafted service, offering intuitive support before, during, and after your journey.
                </p>
                <p>
                  We believe that in every traveler lives a storyteller — and in every destination, a story waiting to be lived.
                </p>
                
                <h4 className="text-lg font-bold mt-4 text-pink-600">With Traveligo, You Don't Just Travel — You Belong to the World</h4>
                <p>
                  Let us take you somewhere you've never been — not just on the map, but within yourself.
                  Because when you travel with Traveligo, the destination is only the beginning.
                </p>
              </div>
            </motion.div>
            
            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-5 rounded-2xl shadow-lg border border-pink-100 mb-4"
            >
              <h4 className="text-lg font-bold mb-4 text-pink-600 flex items-center">
                <FaPhone className="mr-2" />
                <span>Contact Information</span>
              </h4>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="p-2 bg-pink-100 rounded-lg mr-3">
                    <FaPhone className="text-pink-500" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Call us anytime</p>
                    <a href="tel:+919796337997" className="text-gray-700 hover:text-pink-600 transition-colors text-sm font-medium">
                      +91 9796337997
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="p-2 bg-pink-100 rounded-lg mr-3">
                    <FaEnvelope className="text-pink-500" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Email us at</p>
                    <a href="mailto:info@traveligo.in" className="text-gray-700 hover:text-pink-600 transition-colors text-sm font-medium">
                      info@traveligo.in
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Address Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-5 rounded-2xl shadow-lg border border-pink-100"
            >
              <h4 className="text-lg font-bold mb-4 text-pink-600 flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                <span>Our Offices</span>
              </h4>
              
              <div className="grid grid-cols-1 gap-4">
                {/* Srinagar Office */}
                <div className="bg-pink-50 p-4 rounded-lg border border-pink-100">
                  <div className="flex items-start">
                    <div className="p-2 bg-pink-100 rounded-lg mr-3">
                      <FaMapMarkerAlt className="text-pink-500" />
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-800 text-sm mb-1">Srinagar Office</h5>
                      <p className="text-gray-600 text-xs">
                        First Boulevard Road Lane, Dalgate<br />
                        Srinagar, Jammu & Kashmir<br />
                        190001, India
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center mt-2">
                    <a 
                      href="https://share.google/D3tHGlyZeHC7nN6xV"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-500 hover:text-pink-600 text-xs font-medium flex items-center"
                    >
                      View on Map <FaArrowRight className="ml-1 text-xs" />
                    </a>
                  </div>
                </div>
                
                {/* Delhi Office */}
                <div className="bg-pink-50 p-4 rounded-lg border border-pink-100">
                  <div className="flex items-start">
                    <div className="p-2 bg-pink-100 rounded-lg mr-3">
                      <FaMapMarkerAlt className="text-pink-500" />
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-800 text-sm mb-1">Delhi Office</h5>
                      <p className="text-gray-600 text-xs">
                        Abul Fazal Enclave Part 2<br />
                        Jamia Nagar, Okhla<br />
                        New Delhi, 110025, India
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center mt-2">
                    <a 
                      href="https://maps.apple.com/?address=Abul%20Fazal%20Enclave%20Part%202,%20New%20Delhi,%20110025,%20Delhi,%20India&auid=3140475592879641277&ll=28.549413,77.304334&lsp=6489&q=Abul%20Fazal%20Enclave%20Part%202&t=m"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-500 hover:text-pink-600 text-xs font-medium flex items-center"
                    >
                      View on Map <FaArrowRight className="ml-1 text-xs" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Link Columns */}
          {Object.entries(links).map(([category, items], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white p-5 rounded-2xl shadow-lg border border-pink-100"
            >
              <h4 className="text-lg font-bold mb-4 text-pink-600">
                {category}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <motion.li 
                    key={item.name}
                    whileHover={{ x: 3 }}
                  >
                    <button 
                      onClick={() => handleNavigation(item.path)}
                      className="text-gray-600 hover:text-pink-500 transition-colors flex items-center text-sm w-full text-left"
                    >
                      <span className="w-2 h-2 bg-pink-300 rounded-full mr-2 transition-all group-hover:w-3 group-hover:bg-pink-500"></span>
                      {item.name}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative mb-16"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl shadow-lg transform -skew-y-1 -rotate-1"></div>
          <div className="relative bg-white p-8 rounded-2xl shadow-lg border border-pink-100">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="text-center lg:text-left max-w-md">
                <h3 className="text-2xl font-bold mb-3">
                  <span className="bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
                    Join Our Travel Community
                  </span>
                </h3>
                <p className="text-gray-600 text-sm">Get exclusive deals and travel inspiration straight to your inbox</p>
              </div>
              
              {subscribed ? (
                <motion.div 
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg font-bold shadow-md"
                >
                  🎉 Thank you for joining!
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                  <div className="relative flex-grow min-w-[250px]">
                    <input 
                      type="email" 
                      placeholder="Your email address" 
                      className="w-full px-5 py-3 rounded-lg bg-pink-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400 border border-pink-200 pr-14 text-sm"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                      }}
                      required
                    />
                    <FaEnvelope className="absolute right-5 top-1/2 transform -translate-y-1/2 text-pink-400" />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Subscribe <FaArrowRight className="ml-1" />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
            {error && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-pink-500 mt-3 text-center lg:text-left font-medium text-sm"
              >
                {error}
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="border-t border-pink-100 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="flex items-center space-x-6 mb-5 md:mb-0">
            {[
              { icon: <FaFacebook className="text-xl" />, color: 'text-blue-600', url: '#' },
              { icon: <FaXTwitter className="text-xl" />, color: 'text-black', url: 'https://x.com/Traveligo159449' },
              { icon: <FaInstagram className="text-xl" />, color: 'text-pink-600', url: 'https://www.instagram.com/traveligo_' },
              { icon: <FaLinkedin className="text-xl" />, color: 'text-blue-700', url: '#' },
              { icon: <FaYoutube className="text-xl" />, color: 'text-red-600', url: 'https://youtube.com/@traveligoo' }
            ].map((social, i) => (
              <motion.a 
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${social.color} hover:scale-110 transition-transform`}
                whileHover={{ y: -3 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-5 md:mb-0">
            <button 
              onClick={() => handleNavigation('/privacy')}
              className="text-gray-600 hover:text-pink-500 font-medium transition-colors text-sm"
            >
              Privacy Policy
            </button>
            
            <button 
              onClick={() => handleNavigation('/terms')}
              className="text-gray-600 hover:text-pink-500 font-medium transition-colors text-sm"
            >
              Terms of Service
            </button>
            
            <button 
              onClick={() => handleNavigation('/cookie-policy')}
              className="text-gray-600 hover:text-pink-500 font-medium transition-colors text-sm"
            >
              Cookie Policy
            </button>
          </div>
          
          <p className="text-gray-500 font-medium text-sm">
            © {new Date().getFullYear()} Websy Technologies. Made with <FaHeart className="inline text-pink-400" /> in Kashmir
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;