<<<<<<< HEAD
// import UserProfile from '@/components/UserProfile'
// import Header from '@/components/Header'
// import Footer from '@/components/Footer'

// export default function Profile() {
//   return (
//     <div className="min-h-screen bg-background text-foreground">
//       <Header />
//       <main className="container mx-auto py-8">
//         <UserProfile />
//       </main>
//       <Footer />
//     </div>
//   )
// }

=======
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/components/LanguageProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock user data - in a real app, this would come from your backend server
const mockUser = {
  id: '1',
  name: 'Abdelrahman Magdy',
  email: 'abdelrahman@example.com',
  avatar: null,
  bio: 'Web Developer specializing in React and Next.js',
  website: 'https://abdelrahman-magdy.com',
};

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  bio: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
});

type FormData = z.infer<typeof formSchema>;

const Profile = () => {
  const navigate = useNavigate();
  const { t, dir } = useLanguage();
  
  // In a real app, we would check if the user is authenticated
  // and redirect to sign in if not
  const isLoggedIn = true; // Mock authentication state
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/signin');
    }
  }, [isLoggedIn, navigate]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: mockUser.name,
      email: mockUser.email,
      bio: mockUser.bio || '',
      website: mockUser.website || '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      console.log('Profile update data:', data);
      
      // In a real app, we would update the user profile in your backend
      
      toast({
        title: "Success!",
        description: "Your profile has been updated.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // If not authenticated, don't render the profile page
  if (!isLoggedIn) return null;
>>>>>>> 6a36e6052c2c83831a2912b50642fe83a5125a47

export default function Profile() {
  return (
    <div className="min-h-screen bg-background text-foreground">
    vlk;fdskl;dsf
    </div>
  )
}