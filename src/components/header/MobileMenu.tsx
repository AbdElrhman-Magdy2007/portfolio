
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useLanguage } from '../LanguageProvider';
import NavLinks from './NavLinks';
import AuthSection from './AuthSection';
import LanguageSelector from './LanguageSelector';

interface User {
  name: string;
  email: string;
}

interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  navItems: Array<{ name: string; href: string }>;
  isLoggedIn: boolean;
  user: User | null;
  logout: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isMobileMenuOpen,
  toggleMobileMenu,
  navItems,
  isLoggedIn,
  user,
  logout
}) => {
  const { t, dir } = useLanguage();
  
  if (!isMobileMenuOpen) return null;

  return (
    <motion.div 
      className="md:hidden absolute top-full left-0 right-0 p-5 bg-background/95 backdrop-blur-lg border-b border-border"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <nav className={`flex flex-col space-y-4 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
        <NavLinks 
          navItems={navItems} 
          isMobile={true}
          toggleMobileMenu={toggleMobileMenu}
        />
        
        <AuthSection
          isLoggedIn={isLoggedIn}
          user={user}
          logout={logout}
          isMobile={true}
          toggleMobileMenu={toggleMobileMenu}
        />
        
        <Button className="btn-primary w-full mt-2">
          {t('button.hireMe')}
        </Button>
        
        <LanguageSelector isMobile={true} />
      </nav>
    </motion.div>
  );
};

export default MobileMenu;
