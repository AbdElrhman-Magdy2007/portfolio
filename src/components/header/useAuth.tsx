
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

/**
 * Enhanced authentication hook with persistent state and advanced features
 * This would ideally connect to Supabase or another backend service
 */
export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<{ name: string; email: string; avatar?: string } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Initialize auth state from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedAuthState = localStorage.getItem('isLoggedIn');
    
    if (storedUser && storedAuthState === 'true') {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
    
    setIsLoading(false);
  }, []);

  // Mock login function - would connect to backend in production
  const login = (email: string = 'abdelrahman@example.com', password: string = '') => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const userData = { 
        name: 'Abdelrahman Magdy', 
        email: email,
        avatar: '/placeholder.svg'
      };
      
      setUser(userData);
      setIsLoggedIn(true);
      
      // Store auth state in localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isLoggedIn', 'true');
      
      setIsLoading(false);
      
      // Show success notification
      toast({
        title: "Signed in successfully",
        description: `Welcome back, ${userData.name}!`,
        variant: "default",
      });
      
      // Redirect to home page
      navigate('/');
    }, 800);
  };

  // Mock logout function
  const logout = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setUser(null);
      setIsLoggedIn(false);
      
      // Clear auth state from localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
      
      setIsLoading(false);
      
      // Show success notification
      toast({
        title: "Signed out successfully",
        description: "You have been signed out.",
        variant: "default",
      });
      
      // Redirect to home page
      navigate('/');
    }, 500);
  };

  // Mock signup function
  const signup = (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const userData = { 
        name: name, 
        email: email,
        avatar: '/placeholder.svg'
      };
      
      setUser(userData);
      setIsLoggedIn(true);
      
      // Store auth state in localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isLoggedIn', 'true');
      
      setIsLoading(false);
      
      // Show success notification
      toast({
        title: "Account created",
        description: `Welcome, ${name}!`,
        variant: "default",
      });
      
      // Redirect to home page
      navigate('/');
    }, 800);
  };

  return { 
    isLoggedIn, 
    user, 
    login, 
    logout,
    signup,
    isLoading 
  };
};
