import { Link } from 'react-router-dom';
import logo from './logo.jpeg';
import { useState } from 'react';
import { FaFacebook, FaYoutube, FaInstagram, FaLinkedin, FaArrowRight, FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter, FaHeart } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import React from 'react';

// Initialize EmailJS with your User ID
emailjs.init("37pN2ThzFwwhwk7ai");

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showWhatsappChat, setShowWhatsappChat] = useState(false);

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
      { name: 'Careers', path: '/careers' },
      { name: 'Gallery', path: '/Gallery' }
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
        'service_bdm6dl3', // Your EmailJS Service ID
        'template_q7y750i', // Your EmailJS Template ID
        {
          to_email: 'traveligo00@gmail.com',
          from_email: email,
          website: 'Traveligo',
          reply_to: email
        },
        '37pN2ThzFwwhwk7ai' // Your public key
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
    <footer className="bg-gradient-to-b from-pink-50 via-white to-white pt-24 pb-16 relative overflow-hidden">
      {/* WhatsApp Floating Button */}
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

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-pink-100 rounded-full opacity-10 blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-200 rounded-full opacity-10 blur-xl -translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-pink-300 rounded-full opacity-5 blur-lg"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center mb-8"
            >
              <img src={logo} alt="Traveligo" className="h-20 mr-4" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-2xl border border-pink-100 mb-8 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white via-pink-50 to-white opacity-80"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 text-gray-800 font-serif">
                  Traveligo: Curators of Dreams, Architects of Journeys
                </h3>
                <div className="text-gray-700 space-y-4 leading-relaxed">
                  <p>
                    Since 2018, Traveligo has grown from a regional travel specialist into a visionary force in global travel experiences — crafting journeys that move hearts, spark wonder, and stay with you long after the return flight home.
                  </p>
                  <p>
                    Rooted in the heavenly beauty of Kashmir, Ladakh, and the Indian Himalayas, we began by offering soulful, personalized escapes in our homeland. Today, we extend those same values — authenticity, care, and connection — to a global canvas of destinations across Europe, Southeast Asia, the Middle East, the Indian Ocean, and beyond.
                  </p>
                  <p>
                    From snow-dusted valleys to sunlit coastlines, from private island retreats to culturally immersive explorations, Traveligo is more than a travel company — we are your storyteller, guide, and guardian of unforgettable moments.
                  </p>
                  
                  <h4 className="text-xl font-bold mt-6 text-pink-600">Beyond Travel — A Journey to the Soul</h4>
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
                  
                  <h4 className="text-xl font-bold mt-6 text-pink-600">Where Elegance Meets Exploration</h4>
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
                  
                  <h4 className="text-xl font-bold mt-6 text-pink-600">A New Chapter in Global Discovery</h4>
                  <p>
                    Led by a young, passionate team that values innovation as much as tradition, Traveligo is reshaping what modern travel can be. We blend digital convenience with handcrafted service, offering intuitive support before, during, and after your journey.
                  </p>
                  <p>
                    We believe that in every traveler lives a storyteller — and in every destination, a story waiting to be lived.
                  </p>
                  
                  <h4 className="text-xl font-bold mt-6 text-pink-600">With Traveligo, You Don't Just Travel — You Belong to the World</h4>
                  <p>
                    Let us take you somewhere you've never been — not just on the map, but within yourself.
                    Because when you travel with Traveligo, the destination is only the beginning.
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Enhanced Contact Information Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-3xl shadow-xl border border-pink-100 mb-6"
            >
              <h4 className="text-xl font-bold mb-6 text-pink-600 flex items-center">
                <FaPhone className="mr-3" />
                <span>Contact Information</span>
              </h4>
              
              <div className="space-y-6">
                <div className="flex items-center group">
                  <div className="p-3 bg-pink-100 rounded-xl mr-4 group-hover:bg-pink-200 transition-colors">
                    <FaPhone className="text-pink-500 text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Call us anytime</p>
                    <a href="tel:+919796337997" className="text-gray-700 group-hover:text-pink-600 transition-colors text-lg font-medium">
                      +91 9796337997
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center group">
                  <div className="p-3 bg-pink-100 rounded-xl mr-4 group-hover:bg-pink-200 transition-colors">
                    <FaEnvelope className="text-pink-500 text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Email us at</p>
                    <a href="mailto:info@traveligo.in" className="text-gray-700 group-hover:text-pink-600 transition-colors text-lg font-medium">
                      info@traveligo.in
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Enhanced Address Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-3xl shadow-xl border border-pink-100 relative overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-100 rounded-full opacity-20 blur-lg"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-200 rounded-full opacity-10 blur-lg"></div>
              </div>
              
              <div className="relative z-10">
                <h4 className="text-xl font-bold mb-6 text-pink-600 flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>Our Offices</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Srinagar Office */}
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-gradient-to-br from-pink-50 to-white p-5 rounded-xl border border-pink-100 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex items-start mb-3">
                      <div className="p-2 bg-pink-100 rounded-lg mr-4">
                        <FaMapMarkerAlt className="text-pink-500 text-xl" />
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-800 text-lg mb-1">Srinagar Office</h5>
                        <p className="text-gray-600 leading-relaxed">
                          First Boulevard Road Lane, Dalgate<br />
                          Srinagar, Jammu & Kashmir<br />
                          190001, India
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center mt-4">
                      <a 
                        href="https://share.google/D3tHGlyZeHC7nN6xV"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-500 hover:text-pink-600 font-medium flex items-center transition-colors"
                      >
                        View on Map <FaArrowRight className="ml-2 text-sm" />
                      </a>
                    </div>
                  </motion.div>
                  
                  {/* Delhi Office */}
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-gradient-to-br from-pink-50 to-white p-5 rounded-xl border border-pink-100 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex items-start mb-3">
                      <div className="p-2 bg-pink-100 rounded-lg mr-4">
                        <FaMapMarkerAlt className="text-pink-500 text-xl" />
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-800 text-lg mb-1">Delhi Office</h5>
                        <p className="text-gray-600 leading-relaxed">
                          Abul Fazal Enclave Part 2<br />
                          Jamia Nagar, Okhla<br />
                          New Delhi, 110025, India
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center mt-4">
                      <a 
                        href="https://maps.apple.com/?address=Abul%20Fazal%20Enclave%20Part%202,%20New%20Delhi,%20110025,%20Delhi,%20India&auid=3140475592879641277&ll=28.549413,77.304334&lsp=6489&q=Abul%20Fazal%20Enclave%20Part%202&t=m"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-500 hover:text-pink-600 font-medium flex items-center transition-colors"
                      >
                        View on Map <FaArrowRight className="ml-2 text-sm" />
                      </a>
                    </div>
                  </motion.div>
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
              className="bg-white p-6 rounded-2xl shadow-lg border border-pink-100"
            >
              <h4 className="text-xl font-bold mb-6 text-pink-600 relative pb-3 after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-gradient-to-r from-pink-400 to-pink-200">
                {category}
              </h4>
              <ul className="space-y-4">
                {items.map((item) => (
                  <motion.li 
                    key={item.name}
                    whileHover={{ x: 5 }}
                  >
                    <Link 
                      to={item.path} 
                      className="text-gray-600 hover:text-pink-500 transition-colors flex items-center group"
                    >
                      <span className="w-3 h-3 bg-pink-300 rounded-full mr-3 transition-all group-hover:w-4 group-hover:bg-pink-500"></span>
                      {item.name}
                    </Link>
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
          className="relative mb-20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600 rounded-3xl shadow-2xl transform -skew-y-1 -rotate-1"></div>
          <div className="relative bg-white p-10 rounded-3xl shadow-xl border border-pink-100">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="text-center lg:text-left max-w-lg">
                <h3 className="text-3xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
                    Join Our Travel Community
                  </span>
                </h3>
                <p className="text-gray-600 text-lg">Get exclusive deals and travel inspiration straight to your inbox</p>
              </div>
              
              {subscribed ? (
                <motion.div 
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl font-bold shadow-lg"
                >
                  🎉 Thank you for joining!
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                  <div className="relative flex-grow min-w-[300px]">
                    <input 
                      type="email" 
                      placeholder="Your email address" 
                      className="w-full px-6 py-4 rounded-xl bg-pink-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400 border border-pink-200 pr-16 text-lg"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                      }}
                      required
                    />
                    <FaEnvelope className="absolute right-6 top-1/2 transform -translate-y-1/2 text-pink-400 text-xl" />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-lg"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                className="text-pink-500 mt-4 text-center lg:text-left font-medium text-lg"
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
          className="border-t border-pink-100 pt-10 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="flex items-center space-x-8 mb-6 md:mb-0">
            {[
              { icon: <FaFacebook className="text-2xl" />, color: 'text-blue-600', url: '#' },
              { icon: <FaXTwitter className="text-2xl" />, color: 'text-black', url: 'https://x.com/Traveligo159449' },
              { icon: <FaInstagram className="text-2xl" />, color: 'text-pink-600', url: 'https://www.instagram.com/traveligo_' },
              { icon: <FaLinkedin className="text-2xl" />, color: 'text-blue-700', url: '#' },
              { icon: <FaYoutube className="text-2xl" />, color: 'text-red-600', url: 'https://youtube.com/@traveligoo' }
            ].map((social, i) => (
              <motion.a 
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${social.color} hover:scale-125 transition-transform`}
                whileHover={{ y: -5 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mb-6 md:mb-0">
            <Link 
              to="/privacy" 
              className="text-gray-600 hover:text-pink-500 font-medium transition-colors text-lg"
            >
              Privacy Policy
            </Link>
            
            <Link 
              to="/terms" 
              className="text-gray-600 hover:text-pink-500 font-medium transition-colors text-lg"
            >
              Terms of Service
            </Link>
            
            <Link 
              to="/cookie-policy" 
              className="text-gray-600 hover:text-pink-500 font-medium transition-colors text-lg"
            >
              Cookie Policy
            </Link>
          </div>
          
          <p className="text-gray-500 font-medium text-lg">
            © {new Date().getFullYear()} Websy Technologies. Made with <FaHeart className="inline text-pink-400" /> in Kashmir
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;