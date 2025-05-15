
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowDown } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

const Hero = () => {
  const { t, language, dir } = useLanguage();
  
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
      scale: 1.05,
      transition: { type: 'spring', stiffness: 400 }
    },
    tap: {
      scale: 0.95
    }
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
          className={`max-w-3xl mx-auto text-center ${dir === 'rtl' ? 'rtl' : ''}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-6 inline-block">
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium">
              👋 {t('hero.greeting')} Abdelrahman Magdy
            </span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="mb-6 leading-tight">
            {t('hero.tagline')}{" "}
            <span className="highlight">{t('hero.highlight1')}</span>,{" "}
            <span className="highlight">{t('hero.highlight2')}</span>, {language === 'ar' ? 'و' : 'and'}{" "}
            <span className="highlight">{t('hero.highlight3')}</span> {t('hero.subtext')}
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto animate-reveal-text delay-300">
            Transform Your Ideas into Digital Masterpieces with React, Next.js, and TypeScript!
          </motion.p>

          <motion.div variants={itemVariants} className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button className="btn-primary group">
                {t('hero.cta1')}
                <ArrowDown className={`ml-2 group-hover:translate-y-1 transition-transform ${dir === 'rtl' ? 'mr-2 ml-0' : ''}`} size={18} />
              </Button>
            </motion.div>
            
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button variant="outline" className="btn-secondary">
                {t('hero.cta2')}
              </Button>
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
