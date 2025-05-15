
import React, { useEffect } from 'react';
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

const Index = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    document.title = "Abdelrahman Magdy | Web Developer & Designer";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary origin-left z-50" 
        style={{ scaleX }}
      />
      
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
  );
};

export default Index;
