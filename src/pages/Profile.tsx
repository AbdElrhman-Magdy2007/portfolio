
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

// Mock user data - in a real app, this would come from Supabase or a server
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
      
      // In a real app, we would update the user profile in Supabase
      
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="container max-w-2xl mx-auto pt-32 pb-16 px-4">
        <motion.div
          className="glass-card p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Avatar className="w-20 h-20 border-2 border-primary">
              <AvatarImage src={mockUser.avatar || ''} />
              <AvatarFallback className="text-2xl">{mockUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{t('profile.title')}</h1>
              <p className="text-muted-foreground">{t('profile.description')}</p>
            </div>
          </motion.div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.name')}</FormLabel>
                      <FormControl>
                        <Input {...field} className="search-input" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.email')}</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} className="search-input" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('profile.bio')}</FormLabel>
                    <FormControl>
                      <Input {...field} className="search-input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('profile.website')}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://" className="search-input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <motion.div
                className="pt-2 flex justify-end"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <Button 
                  type="submit" 
                  disabled={form.formState.isSubmitting || !form.formState.isDirty}
                >
                  {form.formState.isSubmitting ? t('form.saving') : t('form.save')}
                </Button>
              </motion.div>
            </form>
          </Form>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
