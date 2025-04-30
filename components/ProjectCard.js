import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiPlay, FiMaximize2 } from 'react-icons/fi';
import UnityProject from './UnityProject';

const ProjectCard = ({ project }) => {
  const [showUnity, setShowUnity] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleUnityClick = () => {
    setShowUnity(true);
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  if (showUnity) {
    return <UnityProject project={project} />;
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
    >
      <div className="relative h-48 overflow-hidden group">
        {project.videoUrl ? (
          <div className="relative w-full h-full">
            <video
              src={project.videoUrl}
              className="w-full h-full object-cover"
              poster={project.imageUrl}
              autoPlay={isPlaying}
              loop
              muted
            />
            {!isPlaying && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={handleVideoPlay}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 group-hover:bg-opacity-40 transition-all"
              >
                <FiPlay size={48} className="text-white opacity-80" />
              </motion.button>
            )}
          </div>
        ) : (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        )}
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={handleUnityClick}
          className="absolute top-4 right-4 p-2 bg-gray-900 bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
        >
          <FiMaximize2 size={20} className="text-white" />
        </motion.button>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold">{project.title}</h3>
          <span className="px-2 py-1 bg-blue-500 text-sm rounded-full">
            {project.category}
          </span>
        </div>
        <p className="text-gray-300 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-700 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard; 