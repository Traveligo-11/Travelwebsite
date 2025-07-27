import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your User ID
emailjs.init('37pN2ThzFwwhwk7ai'); // Replace with your actual EmailJS User ID

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await emailjs.send(
        'service_bdm6dl3', // Replace with your EmailJS Service ID
        'template_jr1dnto', // Replace with your EmailJS Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          phone_number: formData.phone,
          subject: formData.subject,
          message: formData.message
        }
      );

      // Reset form on success
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      setSubmitSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err) {
      console.error('Failed to send message:', err);
      setError('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact <span className="text-pink-600">Traveligo</span>
          </h1>
          <div className="w-24 h-1 bg-pink-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about your dream vacation? Our team is ready to help you plan your perfect getaway.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Our Contact Details</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-pink-100 p-3 rounded-full mr-4">
                  <FaPhone className="text-pink-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Call Us</h3>
                  <p className="text-gray-600">+91 9796337997</p>
                  
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-pink-100 p-3 rounded-full mr-4">
                  <FaEnvelope className="text-pink-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Email Us</h3>
                  <p className="text-gray-600">info@traveligo.in</p>
                  <p className="text-gray-600">enquiry@traveligo.in</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-pink-100 p-3 rounded-full mr-4">
                  <FaMapMarkerAlt className="text-pink-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Visit Us</h3>
                  <p className="text-gray-600">First Boulevard road lane Dalgate Srinagar 190001, Jammu & Kashmir</p>
                  <p className="text-gray-600">Jammu & Kashmir, India - 190001</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-pink-100 p-3 rounded-full mr-4">
                  <FaClock className="text-pink-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Working Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 7:00 PM</p>
                  <p className="text-gray-600">Saturday: 10:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Send Us a Message</h2>
            
            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6"
              >
                Thank you! Your message has been sent successfully. We'll contact you soon.
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
                      placeholder="Enter your phone"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
                    placeholder="Tell us about your travel plans..."
                  ></textarea>
                </div>

                <div>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full bg-gradient-to-r from-pink-600 to-pink-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center ${
                      isSubmitting ? 'opacity-80' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 bg-white p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Find Us on Map</h2>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.0807346!2d74.8295321!3d34.0807346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e18ffa02e8dffd%3A0x5ebe270b595e9617!2sFirst%20Lane%20Boulevard!5e0!3m2!1sen!2sin!4v1712345678901!5m2!1sen!2sin"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Traveligo Location"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;