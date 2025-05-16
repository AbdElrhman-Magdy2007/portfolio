
import React from 'react';
import { Menu, X } from 'lucide-react';

interface MobileMenuButtonProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ 
  isMobileMenuOpen, 
  toggleMobileMenu 
}) => {
  return (
    <button 
      onClick={toggleMobileMenu}
      className="p-2 rounded-full hover:bg-accent/50 transition-colors"
      aria-label="Toggle Menu"
    >
      {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );
};

export default MobileMenuButton;
