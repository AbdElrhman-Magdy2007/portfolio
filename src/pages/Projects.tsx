
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useLanguage } from '@/components/LanguageProvider';
import { useTheme } from '@/components/ThemeProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectsShowcase from '@/components/ProjectsShowcase';

const Projects = () => {
  const { t, language, dir } = useLanguage();
  const { theme } = useTheme();
  
  // Scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Cursor trail effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorTrail, setCursorTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  
  useEffect(() => {
    document.title = `${t('projects.title')} | Abdelrahman Magdy`;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add a new dot to the trail
      const newDot = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now()
      };
      
      setCursorTrail(prevTrail => [...prevTrail, newDot]);
      
      // Remove old dots after animation finishes
      setTimeout(() => {
        setCursorTrail(prevTrail => 
          prevTrail.filter(dot => dot.id !== newDot.id)
        );
      }, 1000);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [t]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Scroll progress indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary origin-left z-50" 
        style={{ scaleX }}
      />
      
      {/* Cursor trail effect */}
      {cursorTrail.map((dot) => (
        <motion.div
          key={dot.id}
          className="cursor-trail"
          initial={{ opacity: 0.7, scale: 1 }}
          animate={{ opacity: 0, scale: 0.4 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ 
            left: dot.x, 
            top: dot.y,
          }}
        />
      ))}
      
      <Header />
      
      <main>
        <ProjectsShowcase />
      </main>
      
      <Footer />
    </div>
  );
};

export default Projects;
