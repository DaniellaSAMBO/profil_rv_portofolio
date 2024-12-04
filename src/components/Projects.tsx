import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github } from 'lucide-react';
import { useState } from 'react';
import ProjectModal from './Modal/ProjectModal';
import cloudComputing from '../assets/cloud-computing.jpg'
import monitoring from '../assets/monitoring.jpeg'
import mobile from '../assets/mobile.jpg'



const projects = [
  {
    title: 'Tableau de Bord de Surveillance Cloud',
    description: 'Tableau de bord de surveillance cloud en temps réel avec métriques personnalisables.',
    image: monitoring,
    tags: ['Prometheus', 'Grafana'],
    features: [
      'Monitoring en temps réel des ressources cloud',
      'Tableaux de bord personnalisables',
      'Système d\'alertes intelligent',
      'Intégration avec Slack et Teams',
      'Rapports automatisés hebdomadaires',
      'Analyse prédictive des incidents'
    ],
    achievements: [
      'Réduction de 45% du temps de détection des incidents',
      'Économie de 30% sur les coûts d\'infrastructure',
      'Amélioration de 99.9% de la disponibilité des services'
    ],
    technicalDetails: 'Architecture microservices déployée sur Kubernetes, utilisant Prometheus pour la collecte de métriques et Grafana pour la visualisation. Système d\'alertes basé sur des algorithmes de machine learning pour la détection d\'anomalies.'
  },
  {
    title: 'Application Mobile de Contrôle des Documents Routiers',
    description: 'Solution mobile de vérification de permis et cartes grises via QR Code',
    image: mobile,
    tags: ['Flutter', 'QR Code','Dart', 'Firebase'],
    features: [
      'Génération de QR Codes dynamiques pour permis',
      'Scanner et vérifier l\'authenticité des documents',
      'Validation en temps réel avec base de données officielle',
      'Détection instantanée de falsifications',
      'Historique de contrôles',
      'Fonction de mise à jour automatique des données'
    ],
    achievements: [
      'Réduction des fraudes documentaires de 45%',
      'Temps de vérification réduit à moins de 3 secondes',
      'Compatible avec les systèmes de contrôle routier nationaux'
    ],
    technicalDetails: 'Implémentation de cryptographie pour QR Codes, algorithmes de validation, intégration avec systèmes officiels de vérification documentaire.'
 },
  {
    
        title: 'Infrastructure Cloud AWS Basique',
        description: 'Mise en place d\'une infrastructure cloud AWS fondamentale pour une petite entreprise.',
        image: cloudComputing,
        tags: ['AWS', 'Cloud Fundamentals', 'Network'],
        features: [
          'Création de VPC avec sous-réseaux publics et privés',
          'Configuration de security groups de base',
          'Mise en place d\'une architecture multi-AZ simple',
          'Déploiement d\'instances EC2 avec configurations standard',
          'Configuration de règles IAM minimales',
          'Mise en place d\'un stockage S3 basique'
        ],
        achievements: [
          'Infrastructure AWS fonctionnelle et sécurisée',
          'Compréhension des principes de base du cloud computing',
          'Utilisation efficace des services AWS fondamentaux'
        ],
        technicalDetails: 'Déploiement d\'infrastructure utilisant AWS Management Console, configuration de réseaux de base, gestion des accès utilisateurs et mise en place de ressources cloud élémentaires.'
      
  },
];

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <section id="projects" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Projets Réalisés</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Découvrez quelques-uns des projets sur lesquels j'ai travaillé,
              démontrant mon expertise en cloud computing et développement mobile.
            </p>
          </motion.div>

          <div
            ref={ref}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group relative overflow-hidden rounded-xl bg-gray-800"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-90 transition-opacity group-hover:opacity-100">
                  <div className="absolute bottom-0 p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <motion.button
                        onClick={() => setSelectedProject(project)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Voir le projet
                        <ExternalLink className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}