import { motion } from 'framer-motion';

const skills = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Tailwind CSS']
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'Python', 'Django', 'REST APIs', 'GraphQL']
  },
  {
    category: 'Database',
    items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase']
  },
  {
    category: 'Tools & Others',
    items: ['Git', 'Docker', 'AWS', 'CI/CD', 'Testing', 'Agile']
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="container mx-auto px-4"
      >
        <h2 className="text-4xl font-bold mb-12 text-center">Skills & Expertise</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-lg p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-blue-400">
                {skillGroup.category}
              </h3>
              <ul className="space-y-2">
                {skillGroup.items.map((skill) => (
                  <motion.li
                    key={skill}
                    whileHover={{ x: 5 }}
                    className="text-gray-300 flex items-center"
                  >
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills; 