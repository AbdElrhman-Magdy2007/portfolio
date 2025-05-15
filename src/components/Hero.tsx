
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowDown } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

const Hero = () => {
  const { t, language, dir } = useLanguage();
  
  // Determine the greeting based on the current language
  const getGreeting = () => {
    switch (language) {
      case 'en': return "Welcome, I'm";
      case 'ar': return "مرحبًا، أنا";
      case 'fr': return "Bonjour, je suis";
      case 'es': return "Hola, soy";
      default: return "Welcome, I'm";
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    },
    hover: {
      scale: 1.15,
      boxShadow: "0 0 15px rgba(99, 102, 241, 0.6)",
      transition: { 
        type: 'spring', 
        stiffness: 400
      }
    },
    tap: {
      scale: 0.95
    }
  };

  // Animation for profile image
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
        duration: 0.8
      }
    },
    hover: {
      y: -12,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  // Motion settings for the 3D tilt effect on the profile image
  const tiltSettings = {
    rotate: [0, 5, 0, -5, 0],
    transition: { duration: 10, repeat: Infinity, ease: "easeInOut" }
  };

  // Sparkle animation for profile image click
  const [sparkles, setSparkles] = React.useState<{ id: number, x: number, y: number }[]>([]);
  
  const addSparkle = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create 12 sparkles with random positions around the click point
    const newSparkles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() * 40 - 20), // Random position within 20px of click
      y: y + (Math.random() * 40 - 20)
    }));
    
    setSparkles([...sparkles, ...newSparkles]);
    
    // Remove sparkles after animation completes
    setTimeout(() => {
      setSparkles(prevSparkles => 
        prevSparkles.filter(sparkle => !newSparkles.some(ns => ns.id === sparkle.id))
      );
    }, 600);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/5 w-72 h-72 bg-secondary/20 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <motion.div 
          className={`max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 ${dir === 'rtl' ? 'rtl' : ''}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Profile Image */}
          <motion.div 
            className="lg:w-2/5 w-full order-2 lg:order-1 mt-10 lg:mt-0 flex justify-center lg:justify-start"
            variants={itemVariants}
          >
            <motion.div 
              className="relative"
              variants={imageVariants}
              whileHover="hover"
              animate={["visible", "float"]}
              onClick={addSparkle}
            >
              <motion.div 
                className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 bg-gradient-to-r from-primary to-secondary p-1"
                animate={tiltSettings}
                style={{ perspective: 1000 }}
              >
                <div className="w-full h-full rounded-full overflow-hidden shadow-xl">
                  <img 
                    src="/placeholder.svg" 
                    alt="Abdelrahman Magdy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
              
              {/* Floating elements around the image */}
              <motion.div 
                className="absolute -top-4 -right-4 w-16 h-16 bg-secondary/40 rounded-full backdrop-blur-md"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 10, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 5,
                  ease: "easeInOut"
                }}
              ></motion.div>
              
              <motion.div 
                className="absolute -bottom-6 -left-6 w-20 h-20 bg-primary/40 rounded-full backdrop-blur-md"
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -10, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4,
                  ease: "easeInOut"
                }}
              ></motion.div>
              
              {/* Sparkle effect on click */}
              {sparkles.map(sparkle => (
                <motion.div
                  key={sparkle.id}
                  className="absolute w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full"
                  initial={{ scale: 0, opacity: 1, x: sparkle.x, y: sparkle.y }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            className="lg:w-3/5 text-center lg:text-left order-1 lg:order-2"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="mb-6 inline-block">
              <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium">
                👋 {getGreeting()}
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="mb-6 leading-tight">
              Abdelrahman Magdy
            </motion.h1>

            <motion.h2 variants={itemVariants} className="mb-6 text-2xl md:text-3xl font-medium leading-relaxed">
              {t('hero.tagline')}{" "}
              <span className="highlight">{t('hero.highlight1')}</span>,{" "}
              <span className="highlight">{t('hero.highlight2')}</span>, {language === 'ar' ? 'و' : language === 'fr' ? 'et' : language === 'es' ? 'y' : 'and'}{" "}
              <span className="highlight">{t('hero.highlight3')}</span> {t('hero.subtext')}
            </motion.h2>

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0 animate-reveal-text delay-300">
              Transform Your Ideas into Digital Masterpieces with React, Next.js, and TypeScript!
            </motion.p>

            <motion.div 
              variants={itemVariants} 
              className={`flex flex-col sm:flex-row items-center gap-4 ${dir === 'rtl' ? 'lg:justify-end' : 'lg:justify-start'} justify-center ${dir === 'rtl' ? 'sm:flex-row-reverse' : ''}`}
            >
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button className="btn-primary group relative overflow-hidden">
                  {t('hero.cta1')}
                  <ArrowDown className={`ml-2 group-hover:translate-y-1 transition-transform ${dir === 'rtl' ? 'mr-2 ml-0' : ''}`} size={18} />
                  
                  {/* Ripple effect on hover */}
                  <span className="absolute top-0 left-0 w-full h-full">
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full bg-secondary opacity-0 group-hover:w-[150%] group-hover:h-[150%] group-hover:opacity-20 transition-all duration-500"></span>
                  </span>
                </Button>
              </motion.div>
              
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button variant="outline" className="btn-secondary group relative overflow-hidden">
                  {t('hero.cta2')}
                  
                  {/* Sparkle effect on hover */}
                  <span className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className="particle absolute w-1 h-1 rounded-full bg-secondary"
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          '--x': `${(Math.random() * 60 - 30)}px`,
                          '--y': `${(Math.random() * 60 - 30)}px`,
                          animationDelay: `${i * 0.1}s`,
                          animationDuration: `${0.5 + Math.random()}s`
                        } as React.CSSProperties}
                      />
                    ))}
                  </span>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ 
            y: [0, 10, 0],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2 
          }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-gray-400 flex justify-center pt-1">
            <div className="w-1 h-3 rounded-full bg-gray-400"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
