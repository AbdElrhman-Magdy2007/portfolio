
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageProvider';

interface NavLinksProps {
  navItems: Array<{ name: string; href: string }>;
  isMobile?: boolean;
  toggleMobileMenu?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ 
  navItems, 
  isMobile = false,
  toggleMobileMenu 
}) => {
  const { dir } = useLanguage();
  
  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <>
      {navItems.map((item) => (
        <motion.div key={item.name} variants={isMobile ? undefined : itemVariants}>
          {item.href.startsWith('/') ? (
            <Link 
              to={item.href} 
              className={`${isMobile ? 'text-base font-medium hover:text-primary transition-colors' : 'text-sm font-medium hover:text-primary transition-colors duration-200'}`}
              onClick={toggleMobileMenu}
            >
              {item.name}
            </Link>
          ) : (
            <a 
              href={item.href} 
              className={`${isMobile ? 'text-base font-medium hover:text-primary transition-colors' : 'text-sm font-medium hover:text-primary transition-colors duration-200'}`}
              onClick={toggleMobileMenu}
            >
              {item.name}
            </a>
          )}
        </motion.div>
      ))}
    </>
  );
};

export default NavLinks;
