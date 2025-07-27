import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      bio: "With 15+ years in travel industry, Rajesh has explored every corner of India and crafted unforgettable journeys.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      expertise: ["Adventure Tours", "Luxury Travel", "Destination Weddings"]
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Head of Operations",
      bio: "Priya ensures every itinerary is perfectly executed with her meticulous planning and local connections.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80",
      expertise: ["Logistics", "Vendor Management", "Customer Experience"]
    },
    {
      id: 3,
      name: "Farhat Reyaz",
      role: "Software Developer",
      bio: "Arjun's creative itineraries blend hidden gems with iconic sights for truly unique experiences.",
      image: '/images/Farhat.jpeg',
      expertise: ["Cultural Tours", "Photography Tours", "Food Trails"]
    },
    {
      id: 4,
      name: "Neha Gupta",
      role: "Customer Relations",
      bio: "Neha's warm approach makes every traveler feel valued from first inquiry to post-trip follow-up.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80",
      expertise: ["24/7 Support", "Special Requests", "Feedback Management"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Team Background" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-purple-700/50"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif"
          >
            Meet Our <span className="text-purple-200">Dream Team</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-blue-100 max-w-2xl mx-auto"
          >
            Passionate travel experts dedicated to crafting your perfect journey
          </motion.p>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {teamMembers.map((member) => (
            <motion.div 
              key={member.id}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                <p className="text-purple-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 mb-4">{member.bio}</p>
                
                <div className="mb-2">
                  <h4 className="text-sm font-semibold text-gray-500 mb-2">EXPERTISE</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill, index) => (
                      <span key={index} className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Values Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Passion for Travel",
                description: "We live and breathe travel, constantly exploring to bring you the best experiences",
                icon: "❤️"
              },
              {
                title: "Personalized Service",
                description: "Every itinerary is custom-crafted to match your unique travel style",
                icon: "✨"
              },
              {
                title: "Local Expertise",
                description: "Deep connections with local communities for authentic experiences",
                icon: "🏡"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-sm text-center border border-gray-100"
              >
                <div className="text-5xl mb-6">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Plan Your Next Adventure?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Our team is here to answer all your questions and create a personalized itinerary just for you
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
            <div className="flex items-start">
              <div className="bg-white/20 p-3 rounded-full mr-4">
                <FaPhone className="text-white" />
              </div>
              <div>
                <h4 className="font-bold mb-1">Call Us</h4>
                <p className="text-blue-100">+91 9796337997</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-white/20 p-3 rounded-full mr-4">
                <FaEnvelope className="text-white" />
              </div>
              <div>
                <h4 className="font-bold mb-1">Email Us</h4>
                <p className="text-blue-100">enquiry@traveligo.in</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-white/20 p-3 rounded-full mr-4">
                <FaMapMarkerAlt className="text-white" />
              </div>
              <div>
                <h4 className="font-bold mb-1">Visit Us</h4>
                <p className="text-blue-100">Dalgate Bridge Near Hotel Blooming Dale<br />Srinagar, Jammu and Kashmir 19001</p>
              </div>
            </div>
          </div>
          
          <Link to="/contact">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-10 bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-full font-bold shadow-lg transition-all"
            >
              Get in Touch
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Team;