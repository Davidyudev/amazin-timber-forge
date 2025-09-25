import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { HashLink, Link } from "react-router-hash-link";
import { Button } from "@/components/ui/button";

const CompliancePage = () => {
  const { t, i18n, ready } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Ensure language synchronization
  useEffect(() => {
    console.log('CompliancePage - Setting up language listeners');
    console.log('CompliancePage - Current language:', i18n.language);
    console.log('CompliancePage - localStorage language:', localStorage.getItem('i18nextLng'));
    
    // Check if localStorage has a different language than current
    const savedLanguage = localStorage.getItem('i18nextLng');
    if (savedLanguage && savedLanguage !== i18n.language) {
      console.log('CompliancePage - Found saved language in localStorage:', savedLanguage, 'but current is:', i18n.language);
      console.log('CompliancePage - Changing language to match localStorage');
      i18n.changeLanguage(savedLanguage);
    }
    
    // Listen for custom language change events
    const handleCustomLanguageChange = (event: CustomEvent) => {
      console.log('CompliancePage - Received custom language change event:', event.detail.language);
      const newLanguage = event.detail.language;
      if (newLanguage !== i18n.language) {
        console.log('CompliancePage - Changing language from', i18n.language, 'to', newLanguage);
        i18n.changeLanguage(newLanguage);
      }
    };
    
    // Listen for i18n language changes
    const handleI18nLanguageChange = () => {
      console.log('CompliancePage - i18n language changed to:', i18n.language);
    };
    
    window.addEventListener('languageChanged', handleCustomLanguageChange as EventListener);
    i18n.on('languageChanged', handleI18nLanguageChange);
    
    return () => {
      console.log('CompliancePage - Cleaning up language listeners');
      window.removeEventListener('languageChanged', handleCustomLanguageChange as EventListener);
      i18n.off('languageChanged', handleI18nLanguageChange);
    };
  }, [i18n]);

  // Don't render until i18n is ready
  if (!ready) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-green mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>;
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-brand-green-700 bg-brand-green">
        <div className="section-container">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <HashLink to="/">
                <img 
                  src="/assets/logo_horizontal.png" 
                  alt="Amazin Timber" 
                  className="h-12 sm:h-14 md:h-16 lg:h-18 xl:h-20 w-auto transition-all duration-200"
                />
              </HashLink>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              {[
                { key: "home", href: "/#home" },
                { key: "products", href: "/#products" },
                { key: "species", href: "/#species" },
                { key: "process", href: "/#process" },
                { key: "whyUs", href: "/#why-us" },
                { key: "certifications", href: "/#certifications" },
                { key: "faq", href: "/#faq" },
                { key: "catalog", href: "/#catalog" },
              ].map((item) => (
                <HashLink 
                  key={item.href}
                  to={item.href}
                  smooth
                  className="text-white hover:text-brand-offwhite transition-colors text-sm xl:text-base whitespace-nowrap"
                >
                  {t(`nav.${item.key}`)}
                </HashLink>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center mr-16 xl:mr-20">
              <Button 
                variant="default" 
                size="sm"
                className="bg-white text-brand-green hover:bg-brand-offwhite px-3 py-2 xl:px-4 xl:py-2 rounded-lg font-medium text-xs xl:text-sm"
                asChild
              >
                <HashLink to="/#quote">{t("hero.cta.quote")}</HashLink>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
                  { key: "home", href: "/#home" },
                  { key: "products", href: "/#products" },
                  { key: "species", href: "/#species" },
                  { key: "process", href: "/#process" },
                  { key: "whyUs", href: "/#why-us" },
                  { key: "certifications", href: "/#certifications" },
                  { key: "faq", href: "/#faq" },
                  { key: "catalog", href: "/#catalog" },
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
                  to="/#quote" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 bg-white text-brand-green hover:bg-brand-offwhite text-center rounded-lg mx-3 mt-2"
                >
                  {t("hero.cta.quote")}
                </HashLink>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section-padding bg-brand-green">
          <div className="section-container text-center">
            <h1 className="text-hero text-white mb-6">{t("compliance.title")}</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {t("compliance.subtitle")}
            </p>
          </div>
        </section>

        {/* Policy Content */}
        <section className="section-padding">
          <div className="section-container">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-h2 text-foreground mb-6">{t("compliance.mainTitle")}</h2>
                
                <p className="text-body text-muted mb-6">
                  {t("compliance.introduction")}
                </p>

                <h3 className="text-xl font-semibold text-foreground mb-4">{t("compliance.eudr.title")}</h3>
                <p className="text-body text-muted mb-6">
                  {t("compliance.eudr.description")}
                </p>

                <h3 className="text-xl font-semibold text-foreground mb-4">{t("compliance.laceyAct.title")}</h3>
                <p className="text-body text-muted mb-6">
                  {t("compliance.laceyAct.description")}
                </p>

                <h3 className="text-xl font-semibold text-foreground mb-4">{t("compliance.dueDiligence.title")}</h3>
                <p className="text-body text-muted mb-4">
                  {t("compliance.dueDiligence.description")}
                </p>
                
                <ul className="text-body text-muted mb-6 space-y-3">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2 mr-3"></span>
                    <span>{t("compliance.dueDiligence.points.riskAssessment")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2 mr-3"></span>
                    <span>{t("compliance.dueDiligence.points.documentation")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2 mr-3"></span>
                    <span>{t("compliance.dueDiligence.points.audits")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2 mr-3"></span>
                    <span>{t("compliance.dueDiligence.points.traceability")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2 mr-3"></span>
                    <span>{t("compliance.dueDiligence.points.continuousReview")}</span>
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mb-4">{t("compliance.sustainability.title")}</h3>
                <p className="text-body text-muted mb-6">
                  {t("compliance.sustainability.description")}
                </p>

                <div className="bg-brand-offwhite p-6 rounded-lg mt-8">
                  <h4 className="text-lg font-semibold text-foreground mb-3">{t("compliance.contact.title")}</h4>
                  <p className="text-body text-muted mb-4">
                    {t("compliance.contact.description")}
                  </p>
                  <Button className="btn-primary" asChild>
                    <HashLink to="/#quote">{t("compliance.contact.button")}</HashLink>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brand-charcoal text-white section-padding">
        <div className="section-container">
          <div className="text-center">
            <img src="/assets/f7f2f3ce-37be-476a-92ea-2bcd40b00008.png" alt="Amazin Timber" className="h-24 w-auto mx-auto mb-6" />
            <p className="text-white/80 mb-4">{t("footer.tagline")}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-white/60">
              <span>{t("footer.email")}</span>
              <span className="hidden sm:inline">|</span>
              <span>{t("footer.phone")}</span>
            </div>
            <div className="mt-8 pt-8 border-t border-white/20 text-center text-sm text-white/40">
              <p>{t("footer.copyright")}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CompliancePage;
