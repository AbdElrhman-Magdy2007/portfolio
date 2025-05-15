
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, Sun, Moon } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    // In a real app, we would update the actual theme here
  };

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 backdrop-blur-lg bg-background/80' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center">
          <h1 className="text-xl md:text-2xl font-bold font-heading">
            <span className="text-primary animate-glow">Abdelrahman</span> <span className="text-white">Magdy</span>
          </h1>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <a 
              key={item.name}
              href={item.href}
              className="text-sm font-medium hover:text-primary transition-colors duration-200"
            >
              {item.name}
            </a>
          ))}
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            <button 
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Change language"
            >
              <Globe size={18} />
            </button>
            
            <Button className="btn-primary">
              Hire Me
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-3">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
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
          <div className="md:hidden absolute top-full left-0 right-0 p-5 bg-background/95 backdrop-blur-lg border-b border-white/10 animate-slide-in-right">
            <nav className="flex flex-col space-y-4">
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
              <Button className="btn-primary w-full mt-2">
                Hire Me
              </Button>
              <button className="flex items-center space-x-2 text-base font-medium hover:text-primary transition-colors">
                <Globe size={18} />
                <span>Change Language</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
