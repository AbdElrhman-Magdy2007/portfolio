
import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../ThemeProvider';

interface ThemeToggleProps {
  isMobile?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isMobile = false }) => {
  const { theme, toggleTheme } = useTheme();
  
  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.button 
      onClick={toggleTheme} 
      className="p-2 rounded-full hover:bg-accent/50 transition-colors"
      aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
      variants={isMobile ? undefined : itemVariants}
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.95 }}
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </motion.button>
  );
};

export default ThemeToggle;
