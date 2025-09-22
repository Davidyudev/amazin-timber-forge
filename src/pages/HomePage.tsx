import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { HashLink } from 'react-router-hash-link';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const controls = useAnimation();
  const { i18n } = useTranslation();

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
        <button 
          onClick={() => i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')}
          className="bg-white/10 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm hover:bg-white/20 transition-all duration-200"
        >
          {i18n.language === 'ar' ? 'English' : 'العربية'}
        </button>
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
                { label: "Home", href: "#home" },
                { label: "Products", href: "#products" },
                { label: "Species", href: "#species" },
                { label: "Process", href: "#process" },
                { label: "Why Us", href: "#why-us" },
                { label: "Certifications", href: "#certifications" },
                { label: "FAQ", href: "#faq" },
                { label: "Catalog", href: "#catalog" },
              ].map((item) => (
                <HashLink 
                  key={item.href}
                  to={item.href}
                  smooth
                  className="text-white hover:text-brand-offwhite transition-colors"
                >
                  {item.label}
                </HashLink>
              ))}
              <Button 
                variant="default" 
                size="lg"
                className="bg-white text-brand-green hover:bg-brand-offwhite px-8 py-4 rounded-lg font-medium"
                asChild
              >
                <HashLink to="#quote" smooth>Request Quote</HashLink>
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
                  { label: "Home", href: "#home" },
                  { label: "Products", href: "#products" },
                  { label: "Species", href: "#species" },
                  { label: "Process", href: "#process" },
                  { label: "Why Us", href: "#why-us" },
                  { label: "Certifications", href: "#certifications" },
                  { label: "FAQ", href: "#faq" },
                  { label: "Catalog", href: "#catalog" },
                ].map((item) => (
                  <HashLink 
                    key={item.href}
                    to={item.href}
                    smooth
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-white hover:text-brand-offwhite"
                  >
                    {item.label}
                  </HashLink>
                ))}
                <HashLink 
                  to="#quote" 
                  smooth
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 bg-white text-brand-green hover:bg-brand-offwhite text-center rounded-lg mx-3 mt-2"
                >
                  Request Quote
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
              Global Wood Solutions, Delivered at Scale
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-white/90 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              transition={{ delay: 0.2 }}
            >
              We connect international buyers with reliable mills across Brazil and other leading timber regions—customized specs, container-scale volumes, and coordinated FOB shipments.
            </motion.p>
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              transition={{ delay: 0.4 }}
            >
              {["FCL+ Supply", "FOB Incoterms® 2020", "Compliance-Focused"].map((chip) => (
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
                <HashLink to="#quote" smooth>Request a Quote</HashLink>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-medium"
                asChild
              >
                <a href="/assets/Amazin-Timber-2025-Catalog.pdf" target="_blank" rel="noreferrer">
                  Download 2025 Catalog (PDF)
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
