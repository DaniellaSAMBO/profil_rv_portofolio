import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Cloud, Shield, Database, Code, LineChart, Users } from 'lucide-react';

const services = [
  {
    title: 'Cloud Infrastructure',
    description: 'Conception et déploiement d\'infrastructures cloud robustes et évolutives.',
    icon: Cloud,
  },
  {
    title: 'Sécurité Cloud',
    description: 'Implémentation des meilleures pratiques de sécurité et de conformité.',
    icon: Shield,
  },
  {
    title: 'Architecture Cloud',
    description: 'Conception d\'architectures cloud optimisées pour vos besoins.',
    icon: Database,
  },
  {
    title: 'Développement Mobile',
    description: 'Création d\'applications mobiles performantes et intuitives.',
    icon: Code,
  },
  {
    title: 'Monitoring & Analytics',
    description: 'Mise en place d\'outils de surveillance et d\'analyse en temps réel.',
    icon: LineChart,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="services" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Mes Services</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Une gamme complète de services pour accompagner votre transformation numérique
            et optimiser votre présence dans le cloud.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <service.icon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}