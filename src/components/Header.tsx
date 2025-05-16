
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, Sun, Moon, LogIn, UserPlus, LogOut, User } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useLanguage } from './LanguageProvider';
import { Link } from 'react-router-dom';

// Simple auth store - in a real app, this would be more sophisticated with Zustand
const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Mock login/logout functions
  const login = () => {
    setIsLoggedIn(true);
    setUser({ name: 'Abdelrahman Magdy', email: 'abdelrahman@example.com' });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return { isLoggedIn, user, login, logout };
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t, dir } = useLanguage();
  const { isLoggedIn, user, login, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleLanguageMenu = () => setIsLanguageMenuOpen(!isLanguageMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  
  const navItems = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.projects'), href: '#projects' },
    { name: t('nav.contact'), href: '#contact' }
  ];
  
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' }
  ];

  // Animation variants
  const logoVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.08
      }
    }
  };
  
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };
  
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
  
  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  // Render user profile or auth buttons
  const renderAuthSection = () => {
    if (isLoggedIn) {
      return (
        <div className="relative">
          <motion.button
            onClick={toggleProfileMenu}
            className="flex items-center space-x-2 rounded-full bg-background p-1 border border-border hover:border-primary transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="User profile menu"
          >
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
              {user?.name.charAt(0)}
            </div>
          </motion.button>
          
          {isProfileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-48 rounded-md bg-background/90 backdrop-blur-md border border-border shadow-lg z-50"
            >
              <div className="px-4 py-3 border-b border-border">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
              <div className="py-1">
                <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors" onClick={() => setIsProfileMenuOpen(false)}>
                  {t('nav.profile')}
                </Link>
                <Link to="/settings" className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors" onClick={() => setIsProfileMenuOpen(false)}>
                  {t('nav.settings')}
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsProfileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                >
                  {t('nav.signOut')}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      );
    }
    
    return (
      <div className={`flex items-center space-x-2 ${dir === 'rtl' ? 'flex-row-reverse space-x-reverse' : ''}`}>
        <motion.div variants={itemVariants}>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="rounded-full border-primary text-primary hover:bg-primary/10"
            aria-label="Sign in to your account"
          >
            <Link to="/signin" className="flex items-center gap-1">
              <LogIn className="size-4" />
              <span className="hidden sm:inline">{t('nav.signIn')}</span>
            </Link>
          </Button>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Button
            size="sm"
            asChild
            className="rounded-full"
            aria-label="Create a new account"
          >
            <Link to="/signup" className="flex items-center gap-1">
              <UserPlus className="size-4" />
              <span className="hidden sm:inline">{t('nav.signUp')}</span>
            </Link>
          </Button>
        </motion.div>
      </div>
    );
  };

  return (
    <motion.header 
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 backdrop-blur-lg bg-background/80' : 'py-5 bg-transparent'
      }`}
    >
      <div className={`container flex items-center justify-between ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
        {/* Logo */}
        <motion.a href="#home" className="flex items-center" variants={logoVariants}>
          <h1 className="text-xl md:text-2xl font-bold font-heading">
            {["A", "b", "d", "e", "l", "r", "a", "h", "m", "a", "n"].map((letter, index) => (
              <motion.span 
                key={`name-${index}`}
                className="text-primary animate-glow"
                variants={letterVariants}
              >
                {letter}
              </motion.span>
            ))}
            {" "}
            {["M", "a", "g", "d", "y"].map((letter, index) => (
              <motion.span 
                key={`surname-${index}`}
                className="text-white"
                variants={letterVariants}
              >
                {letter}
              </motion.span>
            ))}
          </h1>
        </motion.a>

        {/* Desktop Navigation */}
        <nav className={`hidden md:flex items-center space-x-6 ${dir === 'rtl' ? 'flex-row-reverse space-x-reverse' : ''}`}>
          {navItems.map((item) => (
            <motion.a 
              key={item.name}
              href={item.href}
              className="text-sm font-medium hover:text-primary transition-colors duration-200"
              variants={itemVariants}
            >
              {item.name}
            </motion.a>
          ))}
          
          <div className={`flex items-center space-x-3 ${dir === 'rtl' ? 'flex-row-reverse space-x-reverse' : ''}`}>
            {renderAuthSection()}
            
            <motion.button 
              onClick={toggleTheme} 
              className="theme-toggle"
              aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
            
            <motion.div 
              className="relative"
              variants={itemVariants}
            >
              <motion.button 
                onClick={toggleLanguageMenu}
                className="language-toggle"
                aria-label="Change language"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe size={18} />
              </motion.button>
              
              {isLanguageMenuOpen && (
                <motion.div 
                  className="language-menu"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {languages.map((lang) => (
                    <div 
                      key={lang.code}
                      className={`language-item ${language === lang.code ? 'text-primary' : ''}`}
                      onClick={() => {
                        setLanguage(lang.code as any);
                        setIsLanguageMenuOpen(false);
                      }}
                      role="button"
                    >
                      {lang.name}
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Button className="btn-primary">
                {t('button.hireMe')}
              </Button>
            </motion.div>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className={`md:hidden flex items-center space-x-3 ${dir === 'rtl' ? 'flex-row-reverse space-x-reverse' : ''}`}>
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button 
            onClick={toggleMobileMenu}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden absolute top-full left-0 right-0 p-5 bg-background/95 backdrop-blur-lg border-b border-white/10"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <nav className={`flex flex-col space-y-4 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              {navItems.map((item) => (
                <a 
                  key={item.name}
                  href={item.href}
                  className="text-base font-medium hover:text-primary transition-colors"
                  onClick={toggleMobileMenu}
                >
                  {item.name}
                </a>
              ))}
              
              {/* Mobile auth buttons */}
              {isLoggedIn ? (
                <div className="pt-2 border-t border-border">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                      {user?.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    </div>
                  </div>
                  
                  <Link 
                    to="/profile"
                    className="block py-2 text-base font-medium hover:text-primary transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    {t('nav.profile')}
                  </Link>
                  
                  <Link 
                    to="/settings"
                    className="block py-2 text-base font-medium hover:text-primary transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    {t('nav.settings')}
                  </Link>
                  
                  <button
                    onClick={() => {
                      logout();
                      toggleMobileMenu();
                    }}
                    className="w-full text-left py-2 text-base font-medium text-destructive hover:text-destructive/90"
                  >
                    <div className="flex items-center space-x-2">
                      <LogOut size={18} />
                      <span>{t('nav.signOut')}</span>
                    </div>
                  </button>
                </div>
              ) : (
                <div className="pt-2 border-t border-border space-y-2">
                  <Link 
                    to="/signin"
                    className="flex items-center space-x-2 py-2 text-base font-medium hover:text-primary transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    <LogIn size={18} />
                    <span>{t('nav.signIn')}</span>
                  </Link>
                  
                  <Link 
                    to="/signup"
                    className="flex items-center space-x-2 py-2 text-base font-medium hover:text-primary transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    <UserPlus size={18} />
                    <span>{t('nav.signUp')}</span>
                  </Link>
                </div>
              )}
              
              <Button className="btn-primary w-full mt-2">
                {t('button.hireMe')}
              </Button>
              
              <div className="relative">
                <button 
                  onClick={toggleLanguageMenu}
                  className="flex items-center space-x-2 text-base font-medium hover:text-primary transition-colors w-full"
                >
                  <Globe size={18} />
                  <span>
                    {language === 'en' ? 'English' : 
                     language === 'ar' ? 'العربية' : 
                     language === 'fr' ? 'Français' : 'Español'}
                  </span>
                </button>
                
                {isLanguageMenuOpen && (
                  <div className="mt-2 bg-background/90 backdrop-blur-md border border-white/10 rounded-md overflow-hidden">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className={`block w-full text-left px-4 py-2 hover:bg-white/10 ${language === lang.code ? 'text-primary' : ''}`}
                        onClick={() => {
                          setLanguage(lang.code as any);
                          setIsLanguageMenuOpen(false);
                        }}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
