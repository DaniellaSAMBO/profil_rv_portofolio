import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Cloud, Monitor, Smartphone } from 'lucide-react';

const FeatureIcon = ({ icon: Icon, label }) => (
  <motion.div
    whileHover={{ scale: 1.1 }}
    className="flex flex-col items-center"
  >
    <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center mb-2">
      <Icon className="w-8 h-8 text-blue-400" />
    </div>
    <span className="text-sm text-gray-300">{label}</span>
  </motion.div>
);

FeatureIcon.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
};

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className=" md:text-4xl font-bold mb-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Spécialiste en Cloud Monitoring et Développement Mobile
          </h1>
        
          
          <div className="flex justify-center gap-8 mb-12">
            <FeatureIcon icon={Cloud} label="Cloud opérateur" />
            <FeatureIcon icon={Monitor} label="cloud monitoring" />
            <FeatureIcon icon={Smartphone} label="App mobile" />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            Découvrir mes services
          </motion.button>
        </motion.div>
      </div>

      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0.7),rgba(17,24,39,1))]" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-blue-500/30 rounded-full blur-[128px]" />
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-purple-500/30 rounded-full blur-[128px]" />
          <div className="absolute top-3/4 right-1/4 -translate-x-1/2 -translate-y-1/2 w-[25rem] h-[25rem] bg-pink-500/30 rounded-full blur-[128px]" />
        </div>
      </div>
    </section>
  );
}