
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, ArrowDown } from 'lucide-react';
import Fuse from 'fuse.js';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useLanguage } from './LanguageProvider';
import projectsData from '../data/projects.json';

// Define project interfaces
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  featured: boolean;
  category?: string; // Optional category for filtering
  date?: string; // Optional date for sorting
}

// Categories for filtering
const categories = ['All', 'E-Commerce', 'SaaS', 'Portfolio', 'Web App'];

const ProjectsShowcase = () => {
  const { t, language, dir } = useLanguage();
  
  // States for filtering and pagination
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOption, setSortOption] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const projectsPerPage = 6;
  
  // Set up Fuse.js for search
  const fuse = new Fuse(projects, {
    keys: ['title', 'description', 'tags'],
    threshold: 0.4,
  });
  
  // Handle category filter change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setPage(1); // Reset to first page when changing filters
  };
  
  // Handle sort option change
  const handleSortChange = (option: string) => {
    setSortOption(option);
  };
  
  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to first page when searching
  };
  
  // Load more projects
  const loadMoreProjects = () => {
    setIsLoading(true);
    setPage(prevPage => prevPage + 1);
    
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };
  
  // Filter and sort projects based on category, search query, and sort option
  useEffect(() => {
    let results = [...projects];
    
    // Apply category filter
    if (activeCategory !== 'All') {
      results = results.filter(project => project.category === activeCategory);
    }
    
    // Apply search filter
    if (searchQuery) {
      const searchResults = fuse.search(searchQuery);
      results = searchResults.map(result => result.item);
    }
    
    // Apply sorting
    results.sort((a, b) => {
      switch (sortOption) {
        case 'newest':
          return new Date(b.date || '').getTime() - new Date(a.date || '').getTime();
        case 'oldest':
          return new Date(a.date || '').getTime() - new Date(b.date || '').getTime();
        case 'az':
          return a.title.localeCompare(b.title);
        case 'za':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
    
    setFilteredProjects(results);
  }, [activeCategory, searchQuery, sortOption, projects]);
  
  // Update displayed projects based on pagination
  useEffect(() => {
    setDisplayedProjects(filteredProjects.slice(0, page * projectsPerPage));
  }, [filteredProjects, page]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };
  
  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12
      }
    },
    hover: {
      y: -20,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Hero Banner */}
      <motion.div 
        className="container mx-auto text-center mb-16"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, type: "spring", stiffness: 100, damping: 15 }}
      >
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          {t('projects.title') || 'My Projects Showcase'}
          <motion.div 
            className="h-1.5 bg-gradient-to-r from-primary to-secondary w-48 mx-auto mt-4"
            initial={{ width: 0 }}
            animate={{ width: "12rem" }}
            transition={{ delay: 0.4, duration: 0.6 }}
          />
        </motion.h1>
        
        <motion.p 
          className="text-xl text-gray-400 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          {t('projects.subtitle') || 'Discover my portfolio of innovative, scalable, and visually exquisite web solutions'}
        </motion.p>
      </motion.div>

      {/* Controls Section */}
      <motion.div 
        className="container mx-auto sticky top-20 z-40 mb-10"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 100, damping: 15 }}
      >
        <div className={`bg-white dark:bg-card backdrop-blur-md shadow-sm border border-muted rounded-lg p-4 ${dir === 'rtl' ? 'rtl' : ''}`}>
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Category Filters */}
            <motion.div 
              className="flex flex-wrap gap-2"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {categories.map((category, index) => (
                <motion.div 
                  key={category} 
                  variants={itemVariants}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={activeCategory === category ? "default" : "outline"}
                    className={`text-sm ${activeCategory === category 
                      ? 'bg-primary text-white hover:bg-primary/90' 
                      : 'border-muted-foreground'}`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </Button>
                </motion.div>
              ))}
            </motion.div>

            <div className="flex w-full md:w-auto gap-2 items-center">
              {/* Search */}
              <div className="w-full md:w-64 relative">
                <Input
                  placeholder={t('projects.searchPlaceholder') || 'Search projects...'}
                  value={searchQuery}
                  onChange={handleSearch}
                  className="pr-8 bg-muted/50 focus-within:bg-white dark:focus-within:bg-card focus:ring-primary"
                />
                <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
              
              {/* Sort Dropdown */}
              <div className="relative">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-1"
                  onClick={() => document.getElementById('sortDropdown')?.classList.toggle('hidden')}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="hidden sm:inline">Sort</span>
                </Button>
                
                <div 
                  id="sortDropdown" 
                  className="absolute right-0 mt-2 hidden w-36 rounded-md bg-background/90 backdrop-blur-md border border-white/10 shadow-lg z-50 overflow-hidden"
                >
                  <div 
                    className={`flex flex-col text-sm ${sortOption === 'newest' ? 'text-primary' : ''}`}
                    onClick={() => handleSortChange('newest')}
                  >
                    <Button variant="ghost" className="justify-start">
                      {t('projects.sortNewest') || 'Newest First'}
                    </Button>
                  </div>
                  <div 
                    className={`flex flex-col text-sm ${sortOption === 'oldest' ? 'text-primary' : ''}`} 
                    onClick={() => handleSortChange('oldest')}
                  >
                    <Button variant="ghost" className="justify-start">
                      {t('projects.sortOldest') || 'Oldest First'}
                    </Button>
                  </div>
                  <div 
                    className={`flex flex-col text-sm ${sortOption === 'az' ? 'text-primary' : ''}`}
                    onClick={() => handleSortChange('az')}
                  >
                    <Button variant="ghost" className="justify-start">
                      {t('projects.sortAZ') || 'A-Z'}
                    </Button>
                  </div>
                  <div 
                    className={`flex flex-col text-sm ${sortOption === 'za' ? 'text-primary' : ''}`}
                    onClick={() => handleSortChange('za')}
                  >
                    <Button variant="ghost" className="justify-start">
                      {t('projects.sortZA') || 'Z-A'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Projects Grid */}
      <motion.div 
        className="container mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {displayedProjects.length === 0 ? (
          <motion.div 
            className="text-center py-20"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-medium mb-4">
              {t('projects.noResults') || 'No projects match your search criteria'}
            </h3>
            <Button onClick={() => {
              setActiveCategory('All');
              setSearchQuery('');
            }}>
              {t('projects.resetFilters') || 'Reset Filters'}
            </Button>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {displayedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="h-full"
                  variants={cardVariants}
                  whileHover="hover"
                  custom={index}
                >
                  <Card className="h-full overflow-hidden border border-white/5 hover:border-secondary/30 transition-colors bg-background">
                    <div className="relative overflow-hidden aspect-[3/2] group">
                      <div className="w-full h-full bg-gray-800 overflow-hidden">
                        <motion.img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          whileHover={{ scale: 1.05 }}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 w-full flex justify-center items-center gap-4">
                          <motion.a 
                            href={project.demoUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn-primary text-sm"
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {t('projects.liveDemo')}
                          </motion.a>
                          <motion.a 
                            href={project.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn-secondary text-sm"
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {t('projects.github')}
                          </motion.a>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="bg-secondary/20 text-secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            {/* Load More */}
            {displayedProjects.length < filteredProjects.length && (
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 120,
                    damping: 10
                  }}
                  whileHover={{ scale: 1.15, transition: { duration: 0.3 } }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    className="btn-primary rounded-full px-8 py-6 text-lg font-medium relative overflow-hidden group"
                    onClick={loadMoreProjects}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <motion.div 
                          className="h-5 w-5 border-t-2 border-l-2 border-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span className="ml-2">{t('projects.loading') || 'Loading...'}</span>
                      </>
                    ) : (
                      <>
                        {t('projects.loadMore') || 'Load More'}
                        <ArrowDown className="ml-2 group-hover:translate-y-1 transition-transform" size={18} />
                      </>
                    )}
                    
                    {/* Glow effect on hover */}
                    <span className="absolute top-0 left-0 w-full h-full">
                      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full bg-secondary opacity-0 group-hover:w-[150%] group-hover:h-[150%] group-hover:opacity-20 transition-all duration-500"></span>
                    </span>
                  </Button>
                </motion.div>
              </div>
            )}
          </>
        )}
      </motion.div>

      {/* Footer CTA */}
      <motion.div 
        className="container mx-auto text-center mt-20 mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 150,
          damping: 10,
          delay: 0.1
        }}
        viewport={{ once: true }}
      >
        <motion.h3 className="text-lg text-gray-400 mb-4">
          {t('projects.readyToHire') || "Ready to bring your vision to life? Let's collaborate!"}
        </motion.h3>
        
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <Button 
            className="btn-primary rounded-full px-8 py-7 text-lg font-medium relative overflow-hidden group"
            onClick={() => window.location.href = '#contact'}
          >
            {t('projects.hireCTA') || 'Hire Me'}
            
            {/* Glow effect on hover */}
            <span className="absolute top-0 left-0 w-full h-full">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full bg-secondary opacity-0 group-hover:w-[150%] group-hover:h-[150%] group-hover:opacity-20 transition-all duration-500"></span>
            </span>
          </Button>
        </motion.div>
      </motion.div>

      {/* Background elements */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/5 w-72 h-72 bg-secondary/10 rounded-full filter blur-3xl"></div>
    </section>
  );
};

export default ProjectsShowcase;
