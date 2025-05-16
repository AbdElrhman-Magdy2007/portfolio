
import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '@/components/LanguageProvider';
import { useTheme } from '@/components/ThemeProvider';
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
import { toast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
  honeypot: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const SignIn = () => {
  const navigate = useNavigate();
  const { t, dir } = useLanguage();
  const { theme } = useTheme();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      honeypot: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    // Check honeypot field
    if (data.honeypot) {
      toast({
        title: "Error",
        description: "Form submission failed",
        variant: "destructive",
      });
      return;
    }

    // In a real app, we would call Supabase auth here
    // For now, we'll just show a success toast and redirect
    try {
      console.log('Sign in data:', data);
      
      toast({
        title: "Success!",
        description: "You have successfully signed in.",
      });
      
      // Redirect to home page after successful sign in
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      console.error('Error signing in:', error);
      toast({
        title: "Error",
        description: "Failed to sign in. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="container max-w-md mx-auto pt-32 pb-16 px-4">
        <motion.div
          className="glass-card p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-3xl font-bold mb-2 text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            {t('auth.signIn')}
          </motion.h1>
          
          <motion.p 
            className="text-muted-foreground mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {t('auth.welcome')}
          </motion.p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Hidden honeypot field for spam protection */}
              <div className="hidden">
                <Input {...form.register('honeypot')} />
              </div>
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.email')}</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder={t('form.emailPlaceholder')} 
                        {...field} 
                        className="bg-card border-input"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.password')}</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder={t('form.passwordPlaceholder')} 
                        {...field} 
                        className="bg-card border-input"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <motion.div
                className="pt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? t('form.submitting') : t('auth.signIn')}
                </Button>
              </motion.div>
            </form>
          </Form>
          
          <div className="mt-6 text-center text-sm">
            <p>{t('auth.noAccount')} <Link to="/signup" className="text-primary hover:underline">{t('auth.signUp')}</Link></p>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignIn;
