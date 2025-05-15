
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import projectsData from '../data/projects.json';

const Projects = () => {
  const { t, language, dir } = useLanguage();
  const featuredProjects = projectsData.filter(project => project.featured);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 120,
        damping: 12,
        duration: 0.6 
      }
    },
    hover: { 
      scale: 1.15, 
      boxShadow: "0 0 15px rgba(99, 102, 241, 0.6)",
      transition: { duration: 0.3 }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="container px-4 mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Featured Projects</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              A showcase of my best work, demonstrating my expertise in building modern web applications.
            </p>
            <div className="h-1 w-24 bg-secondary mx-auto mt-6"></div>
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {featuredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  transition: { type: "spring", stiffness: 200 }
                }}
                className="glass-card overflow-hidden border border-white/5 hover:border-secondary/30 transition-all duration-300"
              >
                <Card className="border-0 bg-transparent h-full">
                  <div className="relative overflow-hidden group">
                    <div className="aspect-video w-full bg-gray-800 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500 group-hover:grayscale-0 grayscale-[30%]"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 w-full flex justify-between items-center">
                        <div className="flex gap-2">
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                            <ExternalLink className="h-5 w-5" />
                          </a>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                            <Github className="h-5 w-5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-secondary/20 text-secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            variants={itemVariants} 
            className="text-center"
          >
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="inline-block"
            >
              <Button 
                className="btn-primary rounded-full px-8 py-6 text-lg font-medium relative overflow-hidden group"
                onClick={() => window.location.href = '/projects'}
              >
                {t('projects.viewAll')}
                {/* Sparkle effect on hover */}
                <span className="absolute top-0 left-0 w-full h-full">
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full bg-secondary opacity-0 group-hover:w-[150%] group-hover:h-[150%] group-hover:opacity-20 transition-all duration-500"></span>
                </span>
                {/* Particle trail - this is just a visual effect, actual particles would be added with JS */}
                <span className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className="particle absolute w-1 h-1 rounded-full bg-secondary"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: `${0.5 + Math.random()}s`
                      }}
                    />
                  ))}
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background elements */}
      <div className="absolute top-1/2 left-0 w-40 h-40 bg-secondary/10 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-1/4 right-0 w-60 h-60 bg-primary/10 rounded-full filter blur-3xl opacity-30"></div>
    </section>
  );
};

export default Projects;
