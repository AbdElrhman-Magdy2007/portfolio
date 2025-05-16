
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Fuse from 'fuse.js';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandInput } from "@/components/ui/command";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from '@/components/LanguageProvider';
import projectsData from '@/data/projects.json';

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  featured: boolean;
  category: string;
  date: string;
};

const ProjectsShowcase = () => {
  const { t, language, dir } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'az' | 'za'>('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Initialize Fuse.js for search
  const fuseOptions = {
    keys: ['title', 'description', 'tags', 'category'],
    threshold: 0.4,
  };
  
  const fuse = new Fuse(projects, fuseOptions);
  
  // Get unique categories from projects
  const categories = ['All', ...Array.from(new Set(projectsData.map(project => project.category)))];

  useEffect(() => {
    // Simulate loading for better UX
    const timer = setTimeout(() => {
      setProjects(projectsData);
      setFilteredProjects(sortProjects(projectsData, sortOrder));
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Apply filtering, searching and sorting
  useEffect(() => {
    let result = [...projects];
    
    // Apply category filter
    if (activeCategory !== 'All') {
      result = result.filter(project => project.category === activeCategory);
    }
    
    // Apply search
    if (searchQuery) {
      const searchResults = fuse.search(searchQuery).map(res => res.item);
      result = result.filter(project => searchResults.some(item => item.id === project.id));
    }
    
    // Apply sorting
    result = sortProjects(result, sortOrder);
    
    setFilteredProjects(result);
    // Reset visible count when filters change
    setVisibleCount(6);
  }, [searchQuery, activeCategory, sortOrder, projects]);

  const sortProjects = (projectsToSort: Project[], order: string) => {
    let sorted = [...projectsToSort];
    
    switch (order) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      case 'az':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'za':
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return sorted;
    }
  };

  const loadMoreProjects = () => {
    setVisibleCount(prev => prev + 6);
  };

  const resetFilters = () => {
    setActiveCategory('All');
    setSearchQuery('');
    setSortOrder('newest');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
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

  const heroVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const underlineVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        delay: 0.5,
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  const controlsVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 10,
        delay: 0.8
      }
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-20">
        <motion.div 
          className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p className="mt-4 text-muted-foreground">{t('projects.loading')}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Banner */}
      <motion.div 
        className="text-center mb-16"
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('projects.title')}</h1>
        <motion.div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6" variants={underlineVariants} />
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('projects.subtitle')}</p>
      </motion.div>

      {/* Controls Section */}
      <motion.div 
        className="sticky top-20 z-10 backdrop-blur-md bg-background/80 border-b border-border py-4 mb-8"
        initial="hidden"
        animate="visible"
        variants={controlsVariants}
      >
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Filter and Sort Controls */}
          <div className="flex flex-wrap gap-2 items-center">
            <motion.div variants={buttonVariants}>
              <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen} className="w-full md:w-auto">
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <span>{t('projects.filterAll')}</span>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
                    >
                      <path
                        d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="absolute mt-2 p-2 bg-background border border-border rounded-md shadow-lg">
                  <div className="flex flex-col gap-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center gap-2">
                        <Checkbox 
                          id={category} 
                          checked={activeCategory === category}
                          onCheckedChange={() => setActiveCategory(category)}
                        />
                        <label htmlFor={category} className="cursor-pointer text-sm">
                          {category === 'All' 
                            ? t('projects.filterAll') 
                            : category === 'E-Commerce' 
                              ? t('projects.filterEcommerce')
                              : category === 'SaaS'
                                ? t('projects.filterSaas')
                                : category === 'Portfolio'
                                  ? t('projects.filterPortfolio')
                                  : category
                          }
                        </label>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </motion.div>
            
            <motion.div variants={buttonVariants}>
              <Collapsible className="w-full md:w-auto">
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <span>
                      {sortOrder === 'newest' && t('projects.sortNewest')}
                      {sortOrder === 'oldest' && t('projects.sortOldest')}
                      {sortOrder === 'az' && t('projects.sortAZ')}
                      {sortOrder === 'za' && t('projects.sortZA')}
                    </span>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                    >
                      <path
                        d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="absolute mt-2 p-2 bg-background border border-border rounded-md shadow-lg">
                  <div className="flex flex-col gap-2">
                    <button 
                      className={`text-left px-2 py-1 text-sm rounded hover:bg-accent ${sortOrder === 'newest' ? 'text-primary' : ''}`}
                      onClick={() => setSortOrder('newest')}
                    >
                      {t('projects.sortNewest')}
                    </button>
                    <button 
                      className={`text-left px-2 py-1 text-sm rounded hover:bg-accent ${sortOrder === 'oldest' ? 'text-primary' : ''}`}
                      onClick={() => setSortOrder('oldest')}
                    >
                      {t('projects.sortOldest')}
                    </button>
                    <button 
                      className={`text-left px-2 py-1 text-sm rounded hover:bg-accent ${sortOrder === 'az' ? 'text-primary' : ''}`}
                      onClick={() => setSortOrder('az')}
                    >
                      {t('projects.sortAZ')}
                    </button>
                    <button 
                      className={`text-left px-2 py-1 text-sm rounded hover:bg-accent ${sortOrder === 'za' ? 'text-primary' : ''}`}
                      onClick={() => setSortOrder('za')}
                    >
                      {t('projects.sortZA')}
                    </button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </motion.div>
            
            {(activeCategory !== 'All' || searchQuery || sortOrder !== 'newest') && (
              <motion.div variants={buttonVariants}>
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  {t('projects.resetFilters')}
                </Button>
              </motion.div>
            )}
          </div>
          
          {/* Search */}
          <motion.div variants={buttonVariants} className="w-full md:w-auto">
            <Command className="rounded-lg border min-w-[200px]">
              <CommandInput
                placeholder={t('projects.searchPlaceholder')}
                value={searchQuery}
                onValueChange={setSearchQuery}
              />
            </Command>
          </motion.div>
        </div>
      </motion.div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg text-muted-foreground">{t('projects.noResults')}</p>
          <Button className="mt-4" onClick={resetFilters}>
            {t('projects.resetFilters')}
          </Button>
        </div>
      ) : (
        <>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProjects.slice(0, visibleCount).map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <Card className="h-full flex flex-col overflow-hidden group">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full aspect-video object-cover transition-all duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-medium text-lg">View Details</span>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">{project.title}</CardTitle>
                    <CardDescription>{new Date(project.date).toLocaleDateString(language === 'en' ? 'en-US' : language === 'fr' ? 'fr-FR' : language === 'es' ? 'es-ES' : 'ar-EG', { year: 'numeric', month: 'short' })}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.slice(0, 3).map((tag, index) => (
                        <motion.span 
                          key={index}
                          className="text-xs bg-accent px-2 py-1 rounded-full"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.1 * index }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="text-xs bg-accent px-2 py-1 rounded-full">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-3">
                    <Button size="sm" className="flex-1">
                      {t('projects.liveDemo')}
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      {t('projects.github')}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Load More Button */}
          {filteredProjects.length > visibleCount && (
            <div className="flex justify-center mt-12">
              <motion.button
                onClick={loadMoreProjects}
                className="btn-primary"
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
              >
                {t('projects.loadMore')}
              </motion.button>
            </div>
          )}
        </>
      )}

      {/* CTA Section */}
      <motion.div 
        className="text-center mt-24"
        variants={ctaVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
      >
        <p className="text-lg text-muted-foreground mb-6">{t('projects.readyToHire')}</p>
        <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
          {t('projects.hireCTA')}
        </Button>
      </motion.div>
    </div>
  );
};

export default ProjectsShowcase;
