
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useLanguage } from './LanguageProvider';

// Import refactored components
import Logo from './header/Logo';
import NavLinks from './header/NavLinks';
import AuthSection from './header/AuthSection';
import LanguageSelector from './header/LanguageSelector';
import ThemeToggle from './header/ThemeToggle';
import MobileMenu from './header/MobileMenu';
import MobileMenuButton from './header/MobileMenuButton';
import { useAuth } from './header/useAuth';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { t, dir } = useLanguage();
  const { isLoggedIn, user, login, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  
  const navItems = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.projects'), href: '/projects' },
    { name: t('nav.contact'), href: '#contact' }
  ];
  
  // Animation variants
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1, 
      y: 0,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  return (
    <motion.header 
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 backdrop-blur-lg bg-background/80 shadow-sm' : 'py-5 bg-transparent'
      }`}
    >
      <div className={`container flex items-center justify-between ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav className={`hidden md:flex items-center space-x-6 ${dir === 'rtl' ? 'flex-row-reverse space-x-reverse' : ''}`}>
          <NavLinks navItems={navItems} />
          
          <div className={`flex items-center space-x-3 ${dir === 'rtl' ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <AuthSection isLoggedIn={isLoggedIn} user={user} logout={logout} />
            
            <ThemeToggle />
            
            <LanguageSelector />
            
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
              }}
            >
              <Button className="btn-primary">
                {t('button.hireMe')}
              </Button>
            </motion.div>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className={`md:hidden flex items-center space-x-3 ${dir === 'rtl' ? 'flex-row-reverse space-x-reverse' : ''}`}>
          <ThemeToggle isMobile={true} />
          <MobileMenuButton isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
          navItems={navItems}
          isLoggedIn={isLoggedIn}
          user={user}
          logout={logout}
        />
      </div>
    </motion.header>
  );
};

export default Header;
