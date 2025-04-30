import Head from 'next/head';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import ProjectCard from '../components/ProjectCard';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Contact from '../components/Contact';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/projects`)
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching projects:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>Portfolio | Modern Developer</title>
        <meta name="description" content="Personal portfolio showcasing my projects and skills" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <Hero />
        
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="my-16"
        >
          <h2 className="text-4xl font-bold mb-8 text-center">Featured Projects</h2>
          {loading ? (
            <div className="text-center">Loading projects...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </motion.section>

        <Skills />
        <Contact />
      </main>

      <footer className="bg-gray-800 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
