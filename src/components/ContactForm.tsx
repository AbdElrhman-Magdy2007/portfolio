
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from '@/components/ui/card';
import { Github, Linkedin, Mail, Phone, Twitter } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '' // Honeypot field for spam protection
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // If honeypot is filled, it's likely a bot
    if (formData.honeypot) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: '',
        honeypot: ''
      });
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      
      // Reset status after a delay
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "#", label: "GitHub" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    { icon: <Mail className="h-5 w-5" />, href: "mailto:example@example.com", label: "Email" }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container px-4 mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get In Touch</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Have a project in mind or want to discuss potential opportunities? I'd love to hear from you.
            </p>
            <div className="h-1 w-24 bg-secondary mx-auto mt-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div variants={itemVariants}>
              <Card className="glass-card h-full">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
                  
                  <div className="space-y-6 mb-8">
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-3 rounded-lg mr-4">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Email</h4>
                        <a href="mailto:contact@abdelrahmanmagdy.com" className="text-gray-300 hover:text-primary transition-colors">
                          contact@abdelrahmanmagdy.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-3 rounded-lg mr-4">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Phone</h4>
                        <a href="tel:+123456789" className="text-gray-300 hover:text-primary transition-colors">
                          +1 (234) 567-8900
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold mb-4">Follow Me</h4>
                    <div className="flex space-x-4">
                      {socialLinks.map((link, index) => (
                        <motion.a
                          key={index}
                          href={link.href}
                          aria-label={link.label}
                          className="bg-white/10 hover:bg-primary/20 p-3 rounded-full transition-colors"
                          whileHover={{ 
                            scale: 1.1,
                            rotate: 5,
                            transition: { type: "spring", stiffness: 400 }
                          }}
                        >
                          {link.icon}
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="glass-card">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block mb-2 font-medium">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border-white/10 focus:border-primary"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block mb-2 font-medium">
                        Your Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border-white/10 focus:border-primary"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block mb-2 font-medium">
                        Your Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="I'd like to discuss a project..."
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border-white/10 focus:border-primary"
                      />
                    </div>
                    
                    {/* Honeypot field - hidden from users but bots might fill it */}
                    <div className="hidden">
                      <input
                        type="text"
                        name="honeypot"
                        value={formData.honeypot}
                        onChange={handleChange}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      className="btn-primary w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                    
                    {submitStatus === 'success' && (
                      <div className="p-3 bg-green-500/20 border border-green-500/30 text-green-400 rounded-md">
                        Your message has been sent successfully! I'll get back to you soon.
                      </div>
                    )}
                    
                    {submitStatus === 'error' && (
                      <div className="p-3 bg-red-500/20 border border-red-500/30 text-red-400 rounded-md">
                        There was an error sending your message. Please try again.
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
