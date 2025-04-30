import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaPlay, FaPause } from 'react-icons/fa';

const ProjectCarousel = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval;
    if (isPlaying && !isHovered) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isHovered, projects.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      <div
        className="relative w-full h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute w-full h-full"
          >
            <div className="relative w-full h-full">
              <img
                src={projects[currentIndex].imageUrl}
                alt={projects[currentIndex].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h2 className="text-4xl font-bold mb-2">{projects[currentIndex].title}</h2>
                <p className="text-xl mb-4">{projects[currentIndex].category}</p>
                <p className="text-lg mb-6">{projects[currentIndex].description}</p>
                <div className="flex items-center space-x-4">
                  {projects[currentIndex].technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-600 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="absolute bottom-8 right-8 flex items-center space-x-4">
          <button
            onClick={prevSlide}
            className="p-3 bg-black/50 rounded-full text-white hover:bg-black/70 transition"
          >
            <FaChevronLeft size={20} />
          </button>
          <button
            onClick={togglePlay}
            className="p-3 bg-black/50 rounded-full text-white hover:bg-black/70 transition"
          >
            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
          </button>
          <button
            onClick={nextSlide}
            className="p-3 bg-black/50 rounded-full text-white hover:bg-black/70 transition"
          >
            <FaChevronRight size={20} />
          </button>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCarousel; 