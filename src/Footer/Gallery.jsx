import { useState } from 'react';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/20/solid';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Gallery = () => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Client photos data
  const clientPhotos = [
    { id: 1, name: 'Mr Nihal and Family', location: 'Kashmir', image: '/images/Client1.jpeg', quote: 'Our honeymoon was magical thanks to Traveligo!' },
    { id: 2, name: 'Mitesh Jain & Family', location: 'Kashmir', image: '/images/Client2.jpeg', quote: 'Best family vacation we ever had!' },
    { id: 3, name: 'Mrs Rana Nazar & Family', location: 'Kashmir', image: '/images/Client3.jpeg', quote: 'Best family vacation we ever had!' },
    { id: 4, name: 'Mr Kiran & Family', location: 'Kashmir', image: '/images/Client4.jpeg', quote: 'Our honeymoon was magical thanks to Traveligo!' },
    { id: 5, name: 'Mr Kushal Sharma & Family', location: 'Kashmir', image:'/images/Client5.jpeg', quote: 'Perfect family vacation with amazing memories!' },
    { id: 6, name: 'Mr Ishan Khatter', location: 'Kashmir', image:'/images/ishan.jpeg', quote: 'Unforgettable beach trip with perfect planning!' },
    { id: 7, name: 'Meera', location: 'Kashmir', image: '/images/Client7.jpeg', quote: 'Our honeymoon was magical thanks to Traveligo!' },
    { id: 8, name: 'Ms Kanika Mann', location: 'Kashmir', image: '/images/kanikamann.jpeg', quote: 'My solo trip was perfectly planned and so much fun!' },
    { id: 9, name: 'Mr Mohit Khiyani & Family', location: 'Kashmir', image: '/images/Client8.jpeg', quote: 'Our honeymoon was magical thanks to Traveligo!' }
  ];

  const displayedPhotos = showAllPhotos ? clientPhotos : clientPhotos.slice(0, 4);

  return (
    <section className="relative py-24 bg-gradient-to-b from-pink-50 to-white overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent z-10"></div>
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-pink-100 rounded-full opacity-10 mix-blend-multiply filter blur-[100px] animate-float"></div>
      <div className="absolute bottom-1/3 left-10 w-72 h-72 bg-pink-200 rounded-full opacity-10 mix-blend-multiply filter blur-[100px] animate-float-delay"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20 relative"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center px-6 py-3 bg-white border border-pink-200 rounded-full shadow-pink-sm mb-8 backdrop-blur-sm"
          >
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
            </span>
            <span className="text-sm font-medium text-pink-600">Client Memories</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-serif">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-pink-600 to-pink-500">Travel Stories</span>
            <br />
            <span className="text-gray-800">That Inspire</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {showAllPhotos ? "Every journey tells a beautiful story..." : "Featured moments that inspire wanderlust..."}
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <AnimatePresence>
            {displayedPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="relative group overflow-hidden rounded-3xl shadow-2xl hover:shadow-pink-lg transition-all duration-500 cursor-pointer"
                onClick={() => { setPhotoIndex(index); setOpen(true); }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                  src={photo.image}
                  alt={photo.name}
                  className="w-full h-96 object-cover transform transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-8 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <h3 className="text-2xl font-bold text-white mb-2 font-serif">{photo.name}</h3>
                  <p className="text-pink-200 mb-4 flex items-center">{photo.location}</p>
                  <p className="text-pink-50 italic font-light">"{photo.quote}"</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Show All Button */}
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAllPhotos(!showAllPhotos)}
            className="relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white font-semibold rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl overflow-hidden group"
          >
            {showAllPhotos ? (
              <>
                <ChevronLeftIcon className="w-6 h-6 mr-3" />
                Show Less
              </>
            ) : (
              <>
                View All Memories
                <ChevronRightIcon className="w-6 h-6 ml-3" />
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Lightbox Component */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={photoIndex}
        slides={clientPhotos.map((p) => ({ src: p.image }))}
      />
    </section>
  );
};

export default Gallery;
