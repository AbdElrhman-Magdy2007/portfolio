
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LogIn, LogOut, UserPlus } from 'lucide-react';
import { useLanguage } from '../LanguageProvider';

interface User {
  name: string;
  email: string;
}

interface AuthSectionProps {
  isLoggedIn: boolean;
  user: User | null;
  logout: () => void;
  isMobile?: boolean;
  toggleMobileMenu?: () => void;
}

const AuthSection: React.FC<AuthSectionProps> = ({ 
  isLoggedIn, 
  user, 
  logout, 
  isMobile = false,
  toggleMobileMenu 
}) => {
  const { t, dir } = useLanguage();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = React.useState(false);
  
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  
  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  if (isLoggedIn) {
    if (isMobile) {
      return (
        <div className="pt-2 border-t border-border">
          <div className="flex items-center space-x-3 mb-3">
            <div className="user-avatar">
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
            {t('profile')}
          </Link>
          
          <Link 
            to="/settings"
            className="block py-2 text-base font-medium hover:text-primary transition-colors"
            onClick={toggleMobileMenu}
          >
            {t('settings')}
          </Link>
          
          <button
            onClick={() => {
              logout();
              toggleMobileMenu && toggleMobileMenu();
            }}
            className="w-full text-left py-2 text-base font-medium text-destructive hover:text-destructive/90"
          >
            <div className="flex items-center space-x-2">
              <LogOut size={18} />
              <span>{t('signOut')}</span>
            </div>
          </button>
        </div>
      );
    }
    
    return (
      <div className="relative">
        <motion.button
          onClick={toggleProfileMenu}
          className="user-avatar"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="User profile menu"
        >
          <div>
            {user?.name.charAt(0)}
          </div>
        </motion.button>
        
        {isProfileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="dropdown-menu"
          >
            <div className="px-4 py-3 border-b border-border">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
            <div className="py-1">
              <Link to="/profile" className="dropdown-item" onClick={() => setIsProfileMenuOpen(false)}>
                {t('profile')}
              </Link>
              <Link to="/settings" className="dropdown-item" onClick={() => setIsProfileMenuOpen(false)}>
                {t('settings')}
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsProfileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
              >
                {t('signOut')}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    );
  }

  // Not logged in
  if (isMobile) {
    return (
      <div className="pt-2 border-t border-border space-y-2">
        <Link 
          to="/signin"
          className="flex items-center space-x-2 py-2 text-base font-medium hover:text-primary transition-colors"
          onClick={toggleMobileMenu}
        >
          <LogIn size={18} />
          <span>{t('signIn')}</span>
        </Link>
        
        <Link 
          to="/signup"
          className="flex items-center space-x-2 py-2 text-base font-medium hover:text-primary transition-colors"
          onClick={toggleMobileMenu}
        >
          <UserPlus size={18} />
          <span>{t('signUp')}</span>
        </Link>
      </div>
    );
  }
  
  return (
    <div className={`flex items-center space-x-2 ${dir === 'rtl' ? 'flex-row-reverse space-x-reverse' : ''}`}>
      <motion.div variants={itemVariants}>
        <Link to="/signin" className="auth-button-outline" aria-label="Sign in to your account">
          <LogIn className="size-4" />
          <span className="hidden sm:inline">{t('signIn')}</span>
        </Link>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Link to="/signup" className="auth-button-primary" aria-label="Create a new account">
          <UserPlus className="size-4" />
          <span className="hidden sm:inline">{t('signUp')}</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default AuthSection;
