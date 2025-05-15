
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import projectsData from '../data/projects.json';

const Projects = () => {
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

  return (
    <section id="projects" className="py-20 relative">
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

          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {featuredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  transition: { type: "spring", stiffness: 200 }
                }}
                className="glass-card overflow-hidden"
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

          <motion.div variants={itemVariants} className="text-center">
            <Button className="btn-primary">
              View All Projects
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
