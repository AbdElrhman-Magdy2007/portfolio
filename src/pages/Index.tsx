
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { ThemeProvider } from '@/components/ThemeProvider';
import { LanguageProvider } from '@/components/LanguageProvider';

const Index = () => {
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
    document.title = "Abdelrahman Magdy | Web Developer & Designer";
    
    // Cursor trail effect in the Hero section only
    const handleMouseMove = (e: MouseEvent) => {
      const heroSection = document.getElementById('home');
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        // Only track mouse in hero section
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
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
        }
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
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
            <Hero />
            <About />
            <Services />
            <Skills />
            <Projects />
            <Testimonials />
            <ContactForm />
          </main>
          
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default Index;
