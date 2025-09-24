import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { HashLink } from 'react-router-hash-link';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const controls = useAnimation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    });
  }, [controls]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Language Switcher */}
      <div className="fixed top-4 right-4 z-50">
        <div className="relative group">
          {/* Globe Icon */}
          <div className="bg-white/10 backdrop-blur-sm text-white p-2 rounded shadow-lg flex items-center justify-center">
            <img 
              src="/assets/globe-language-svgrepo-com.svg" 
              alt="Language" 
              className="w-4 h-4 filter brightness-0 invert"
            />
          </div>
          {/* Language Abbreviation Box - Positioned absolutely below the globe */}
          <div className="absolute top-full left-0 right-0 mt-1 bg-white/10 backdrop-blur-sm text-white px-2.5 py-1.5 rounded text-xs font-medium shadow-lg text-center flex items-center justify-center">
            {i18n.language === 'en' ? 'EN' : 
             i18n.language === 'ar' ? 'عربي' : 
             i18n.language === 'fr' ? 'FR' : 'ES'}
          </div>
          <div className="absolute right-1/2 transform translate-x-1/2 mt-2 w-20 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <div className="py-1">
              <button
                onClick={() => i18n.changeLanguage('en')}
                className={`block w-full text-left px-3 py-1 text-xs hover:bg-gray-100 ${i18n.language === 'en' ? 'bg-primary text-white' : 'text-gray-700'}`}
              >
                EN
              </button>
              <button
                onClick={() => i18n.changeLanguage('ar')}
                className={`block w-full text-left px-3 py-1 text-xs hover:bg-gray-100 ${i18n.language === 'ar' ? 'bg-primary text-white' : 'text-gray-700'}`}
              >
                عربي
              </button>
              <button
                onClick={() => i18n.changeLanguage('fr')}
                className={`block w-full text-left px-3 py-1 text-xs hover:bg-gray-100 ${i18n.language === 'fr' ? 'bg-primary text-white' : 'text-gray-700'}`}
              >
                FR
              </button>
              <button
                onClick={() => i18n.changeLanguage('es')}
                className={`block w-full text-left px-3 py-1 text-xs hover:bg-gray-100 ${i18n.language === 'es' ? 'bg-primary text-white' : 'text-gray-700'}`}
              >
                ES
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-brand-green-700">
        <div className="section-container">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img 
                src="/assets/e255378a-b574-4f49-b595-e1d8b4aa0ea6.png" 
                alt="Amazin Timber" 
                className="h-12 w-auto"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { key: "home", href: "#home" },
                { key: "products", href: "#products" },
                { key: "species", href: "#species" },
                { key: "process", href: "#process" },
                { key: "whyUs", href: "#why-us" },
                { key: "certifications", href: "#certifications" },
                { key: "faq", href: "#faq" },
                { key: "catalog", href: "#catalog" },
              ].map((item) => (
                <HashLink 
                  key={item.href}
                  to={item.href}
                  smooth
                  className="text-white hover:text-brand-offwhite transition-colors"
                >
                  {t(`nav.${item.key}`)}
                </HashLink>
              ))}
              <Button 
                variant="default" 
                size="lg"
                className="bg-white text-brand-green hover:bg-brand-offwhite px-8 py-4 rounded-lg font-medium"
                asChild
              >
                <HashLink to="#quote" smooth>{t("quote")}</HashLink>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-white"
              aria-label="Open mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-brand-green border-t border-brand-green-700">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {[
                  { key: "home", href: "#home" },
                  { key: "products", href: "#products" },
                  { key: "species", href: "#species" },
                  { key: "process", href: "#process" },
                  { key: "whyUs", href: "#why-us" },
                  { key: "certifications", href: "#certifications" },
                  { key: "faq", href: "#faq" },
                  { key: "catalog", href: "#catalog" },
                ].map((item) => (
                  <HashLink 
                    key={item.href}
                    to={item.href}
                    smooth
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-white hover:text-brand-offwhite"
                  >
                    {t(`nav.${item.key}`)}
                  </HashLink>
                ))}
                <HashLink 
                  to="#quote" 
                  smooth
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 bg-white text-brand-green hover:bg-brand-offwhite text-center rounded-lg mx-3 mt-2"
                >
                  {t("quote")}
                </HashLink>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center bg-brand-green">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
            >
              {t("hero.title")}
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-white/90 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              transition={{ delay: 0.2 }}
            >
              {t("hero.subtitle")}
            </motion.p>
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              transition={{ delay: 0.4 }}
            >
              {[
                t("hero.features.fcl"),
                t("hero.features.fob"),
                t("hero.features.compliance")
              ].map((chip) => (
                <span 
                  key={chip}
                  className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium"
                >
                  {chip}
                </span>
              ))}
            </motion.div>
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              transition={{ delay: 0.6 }}
            >
              <Button 
                variant="default" 
                size="lg"
                className="bg-white text-brand-green hover:bg-brand-offwhite px-8 py-4 rounded-lg font-medium"
                asChild
              >
                <HashLink to="#quote" smooth>{t("hero.cta.quote")}</HashLink>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-medium"
                asChild
              >
                <a href="/assets/Amazin-Timber-2025-Catalog.pdf" target="_blank" rel="noreferrer">
                  {t("hero.cta.catalog")}
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
