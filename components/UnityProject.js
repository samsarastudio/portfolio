import { useState } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { motion } from 'framer-motion';
import { FiMaximize2, FiMinimize2 } from 'react-icons/fi';

const UnityProject = ({ project }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: `/unity/${project.id}/Build/${project.id}.loader.js`,
    dataUrl: `/unity/${project.id}/Build/${project.id}.data`,
    frameworkUrl: `/unity/${project.id}/Build/${project.id}.framework.js`,
    codeUrl: `/unity/${project.id}/Build/${project.id}.wasm`,
  });

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'w-full h-[600px]'}`}
    >
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={handleFullscreen}
          className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
        >
          {isFullscreen ? <FiMinimize2 size={24} /> : <FiMaximize2 size={24} />}
        </button>
      </div>

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="text-center">
            <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${loadingProgression * 100}%` }}
              />
            </div>
            <p className="mt-2 text-sm text-gray-400">
              Loading... {Math.round(loadingProgression * 100)}%
            </p>
          </div>
        </div>
      )}

      <Unity
        unityProvider={unityProvider}
        className={`bg-black ${isFullscreen ? 'w-screen h-screen' : 'w-full h-full'}`}
        style={{ display: isLoaded ? 'block' : 'none' }}
      />

      {!isFullscreen && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-gray-400 mb-2">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-800 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default UnityProject; 