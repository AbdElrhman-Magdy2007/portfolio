
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
  FormDescription,
} from '@/components/ui/form';
import { Switch } from "@/components/ui/switch";
import { useLanguage } from '@/components/LanguageProvider';
import { useTheme } from '@/components/ThemeProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from '@/hooks/use-toast';

const formSchema = z.object({
  emailNotifications: z.boolean(),
  marketingEmails: z.boolean(),
  accountActivity: z.boolean(),
  autoTheme: z.boolean(),
});

type FormData = z.infer<typeof formSchema>;

const Settings = () => {
  const navigate = useNavigate();
  const { t, dir } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  
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
      emailNotifications: true,
      marketingEmails: false,
      accountActivity: true,
      autoTheme: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      console.log('Settings data:', data);
      
      // In a real app, we would update the user settings in Supabase
      
      toast({
        title: "Success!",
        description: "Your settings have been updated.",
      });
    } catch (error) {
      console.error('Error updating settings:', error);
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  // If not authenticated, don't render the settings page
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
            className="mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <h1 className="text-3xl font-bold">{t('settings.title')}</h1>
            <p className="text-muted-foreground">{t('settings.description')}</p>
          </motion.div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-xl font-medium border-b pb-2 border-border">{t('settings.notifications')}</h2>
                
                <FormField
                  control={form.control}
                  name="emailNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between space-x-2 rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          {t('settings.emailNotifications')}
                        </FormLabel>
                        <FormDescription>
                          {t('settings.emailNotificationsDesc')}
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="marketingEmails"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between space-x-2 rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          {t('settings.marketingEmails')}
                        </FormLabel>
                        <FormDescription>
                          {t('settings.marketingEmailsDesc')}
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="accountActivity"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between space-x-2 rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          {t('settings.accountActivity')}
                        </FormLabel>
                        <FormDescription>
                          {t('settings.accountActivityDesc')}
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="space-y-6">
                <h2 className="text-xl font-medium border-b pb-2 border-border">{t('settings.appearance')}</h2>
                
                <div className="flex flex-row items-center justify-between space-x-2 rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <p className="text-base font-medium">
                      {t('settings.theme')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t('settings.themeDesc')}
                    </p>
                  </div>
                  <Button variant="outline" onClick={toggleTheme}>
                    {theme === 'dark' ? t('settings.lightMode') : t('settings.darkMode')}
                  </Button>
                </div>
                
                <FormField
                  control={form.control}
                  name="autoTheme"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between space-x-2 rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          {t('settings.autoTheme')}
                        </FormLabel>
                        <FormDescription>
                          {t('settings.autoThemeDesc')}
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <motion.div
                className="pt-2 flex justify-end"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <Button 
                  type="submit" 
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? t('form.saving') : t('form.saveChanges')}
                </Button>
              </motion.div>
            </form>
          </Form>
          
          <div className="mt-10 pt-6 border-t border-border">
            <h2 className="text-xl font-medium text-destructive mb-4">{t('settings.dangerZone')}</h2>
            <p className="text-muted-foreground mb-4">{t('settings.dangerZoneDesc')}</p>
            <Button variant="destructive">
              {t('settings.deleteAccount')}
            </Button>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
