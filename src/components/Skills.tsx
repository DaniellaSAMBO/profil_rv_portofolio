import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const skills = [
  {
    category: 'Cloud Platforms',
    items: ['AWS',],
    progress: 90,
  },
  {
    category: 'Monitoring Tools',
    items: ['Prometheus', 'Grafana',],
    progress: 85,
  },
  {
    category: 'Mobile Development',
    items: ['Dart', 'Flutter',],
    progress: 60,
  },
  {
    category: 'DevOps',
    items: ['Docker', 'Jenkins CI/CD'],
    progress: 50,
  },
];

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="skills" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Compétences Techniques</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Un ensemble de compétences techniques pointues pour répondre aux défis
            du cloud computing et du développement mobile moderne.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gray-900 rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold mb-4">{skill.category}</h3>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-400 bg-blue-500/20">
                        Maîtrise
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-blue-400">
                        {skill.progress}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-700">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.progress}%` } : {}}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500 to-purple-600"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}