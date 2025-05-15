
import React, { createContext, useState, useEffect, useContext } from 'react';

type Language = 'en' | 'ar' | 'fr' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'button.hireMe': 'Hire Me',
    'hero.greeting': 'Welcome, I\'m',
    'hero.tagline': 'A Visionary Web Developer Crafting',
    'hero.highlight1': 'Lightning-Fast',
    'hero.highlight2': 'Scalable',
    'hero.highlight3': 'Visually Exquisite',
    'hero.subtext': 'Web Experiences',
    'hero.cta1': 'Discover My Work',
    'hero.cta2': 'Download CV',
    'projects.viewAll': 'View All Projects',
    'projects.searchPlaceholder': 'Search projects...',
    'projects.loadMore': 'Load More',
    'projects.liveDemo': 'Live Demo',
    'projects.github': 'GitHub',
    'projects.filterAll': 'All',
    'projects.filterEcommerce': 'E-Commerce',
    'projects.filterSaas': 'SaaS',
    'projects.filterPortfolio': 'Portfolio',
    'projects.sortNewest': 'Newest First',
    'projects.sortOldest': 'Oldest First',
    'projects.sortAZ': 'A-Z',
    'projects.sortZA': 'Z-A',
    // Add more translations as needed
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.about': 'عني',
    'nav.services': 'خدماتي',
    'nav.projects': 'مشاريعي',
    'nav.contact': 'اتصل بي',
    'button.hireMe': 'وظفني',
    'hero.greeting': 'مرحبًا، أنا',
    'hero.tagline': 'مطور ويب مبدع يصنع تجارب',
    'hero.highlight1': 'سريعة',
    'hero.highlight2': 'قابلة للتطوير',
    'hero.highlight3': 'جميلة بصريًا',
    'hero.subtext': 'تجارب الويب',
    'hero.cta1': 'اكتشف أعمالي',
    'hero.cta2': 'تحميل السيرة الذاتية',
    'projects.viewAll': 'عرض جميع المشاريع',
    'projects.searchPlaceholder': 'ابحث عن مشروع...',
    'projects.loadMore': 'تحميل المزيد',
    'projects.liveDemo': 'عرض حي',
    'projects.github': 'جيثب',
    'projects.filterAll': 'الكل',
    'projects.filterEcommerce': 'التجارة الإلكترونية',
    'projects.filterSaas': 'البرمجيات كخدمة',
    'projects.filterPortfolio': 'معرض الأعمال',
    'projects.sortNewest': 'الأحدث أولاً',
    'projects.sortOldest': 'الأقدم أولاً',
    'projects.sortAZ': 'أ-ي',
    'projects.sortZA': 'ي-أ',
    // Add more translations as needed
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.services': 'Services',
    'nav.projects': 'Projets',
    'nav.contact': 'Contact',
    'button.hireMe': 'Engagez-moi',
    'hero.greeting': 'Bonjour, je suis',
    'hero.tagline': 'Un développeur web visionnaire créant des',
    'hero.highlight1': 'Ultra-rapides',
    'hero.highlight2': 'Évolutives',
    'hero.highlight3': 'Visuellement exquises',
    'hero.subtext': 'Expériences Web',
    'hero.cta1': 'Découvrir mon travail',
    'hero.cta2': 'Télécharger CV',
    'projects.viewAll': 'Voir tous les projets',
    'projects.searchPlaceholder': 'Rechercher des projets...',
    'projects.loadMore': 'Charger plus',
    'projects.liveDemo': 'Démo en direct',
    'projects.github': 'GitHub',
    'projects.filterAll': 'Tous',
    'projects.filterEcommerce': 'E-Commerce',
    'projects.filterSaas': 'SaaS',
    'projects.filterPortfolio': 'Portfolio',
    'projects.sortNewest': 'Plus récent',
    'projects.sortOldest': 'Plus ancien',
    'projects.sortAZ': 'A-Z',
    'projects.sortZA': 'Z-A',
    // Add more translations as needed
  },
  es: {
    'nav.home': 'Inicio',
    'nav.about': 'Acerca de',
    'nav.services': 'Servicios',
    'nav.projects': 'Proyectos',
    'nav.contact': 'Contacto',
    'button.hireMe': 'Contrátame',
    'hero.greeting': 'Hola, soy',
    'hero.tagline': 'Un desarrollador web visionario que crea',
    'hero.highlight1': 'Ultrarrápidas',
    'hero.highlight2': 'Escalables',
    'hero.highlight3': 'Visualmente exquisitas',
    'hero.subtext': 'Experiencias Web',
    'hero.cta1': 'Descubrir mi trabajo',
    'hero.cta2': 'Descargar CV',
    'projects.viewAll': 'Ver todos los proyectos',
    'projects.searchPlaceholder': 'Buscar proyectos...',
    'projects.loadMore': 'Cargar más',
    'projects.liveDemo': 'Demo en vivo',
    'projects.github': 'GitHub',
    'projects.filterAll': 'Todos',
    'projects.filterEcommerce': 'E-Commerce',
    'projects.filterSaas': 'SaaS',
    'projects.filterPortfolio': 'Portafolio',
    'projects.sortNewest': 'Más recientes',
    'projects.sortOldest': 'Más antiguos',
    'projects.sortAZ': 'A-Z',
    'projects.sortZA': 'Z-A',
    // Add more translations as needed
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
  dir: 'ltr',
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize language from localStorage or browser preference
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage && ['en', 'ar', 'fr', 'es'].includes(savedLanguage)) {
        return savedLanguage as Language;
      }
      
      // Try to detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (['en', 'ar', 'fr', 'es'].includes(browserLang)) {
        return browserLang as Language;
      }
    }
    return 'en'; // Default to English
  });

  // Update document direction based on language
  useEffect(() => {
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    
    // Save language preference to localStorage
    localStorage.setItem('language', language);
    
    // Update font family for Arabic
    if (language === 'ar') {
      document.documentElement.classList.add('font-arabic');
    } else {
      document.documentElement.classList.remove('font-arabic');
    }
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  // Set language with validation
  const setLanguage = (lang: Language) => {
    if (['en', 'ar', 'fr', 'es'].includes(lang)) {
      setLanguageState(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t, 
      dir: language === 'ar' ? 'rtl' : 'ltr' 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
