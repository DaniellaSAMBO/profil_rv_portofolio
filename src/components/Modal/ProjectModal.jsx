import { motion } from 'framer-motion';
import { X, Trophy, Code, Cpu } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-gray-800 rounded-xl overflow-hidden my-8"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="aspect-video">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-8">
          <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
          <p className="text-gray-300 text-lg mb-8">{project.description}</p>

          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Code className="w-5 h-5 text-blue-400" />
                <h4 className="text-xl font-semibold">Technologies utilisées</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <Cpu className="w-5 h-5 text-purple-400" />
                <h4 className="text-xl font-semibold">Fonctionnalités clés</h4>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-gray-300">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2 mt-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <h4 className="text-xl font-semibold">Résultats obtenus</h4>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start text-gray-300">
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2 mt-2"></span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-4">Détails techniques</h4>
              <p className="text-gray-300 leading-relaxed">
                {project.technicalDetails}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}