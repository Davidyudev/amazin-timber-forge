import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { HashLink } from "react-router-hash-link";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { t, i18n, ready } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Ensure language synchronization
  useEffect(() => {
    console.log('Index - Setting up language listeners');
    console.log('Index - Current language:', i18n.language);
    console.log('Index - localStorage language:', localStorage.getItem('i18nextLng'));
    
    // Check if localStorage has a different language than current
    const savedLanguage = localStorage.getItem('i18nextLng');
    if (savedLanguage && savedLanguage !== i18n.language) {
      console.log('Index - Found saved language in localStorage:', savedLanguage, 'but current is:', i18n.language);
      console.log('Index - Changing language to match localStorage');
      i18n.changeLanguage(savedLanguage);
    }
    
    // Listen for custom language change events
    const handleCustomLanguageChange = (event: CustomEvent) => {
      console.log('Index - Received custom language change event:', event.detail.language);
      const newLanguage = event.detail.language;
      if (newLanguage !== i18n.language) {
        console.log('Index - Changing language from', i18n.language, 'to', newLanguage);
        i18n.changeLanguage(newLanguage);
      }
    };
    
    // Listen for i18n language changes
    const handleI18nLanguageChange = () => {
      console.log('Index - i18n language changed to:', i18n.language);
    };
    
    window.addEventListener('languageChanged', handleCustomLanguageChange as EventListener);
    i18n.on('languageChanged', handleI18nLanguageChange);
    
    return () => {
      console.log('Index - Cleaning up language listeners');
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
              <HashLink to="#home" smooth>
                <img 
                  src="/assets/logo_horizontal.png" 
                  alt="Amazin Timber" 
                  className="h-8 sm:h-9 md:h-11 lg:h-12 xl:h-13 w-auto transition-all duration-200 cursor-pointer hover:opacity-90"
                />
              </HashLink>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-3">
              {[
                { key: "home", href: "#home" },
                { key: "products", href: "#products" },
                { key: "species", href: "#species" },
                { key: "process", href: "#process" },
                { key: "whyUs", href: "#why-us" },
                { key: "compliance", href: "#compliance-summary" },
                { key: "certifications", href: "#certifications" },
                { key: "faq", href: "#faq" },
                { key: "catalog", href: "#catalog" },
              ].map((item) => (
                <HashLink 
                  key={item.href}
                  to={item.href}
                  smooth
                  className={`text-white hover:text-brand-offwhite transition-colors whitespace-nowrap ${
                    i18n.language === 'fr' || i18n.language === 'es' 
                      ? 'text-xs xl:text-sm' 
                      : 'text-sm xl:text-base'
                  }`}
                >
                  {t(`nav.${item.key}`)}
                </HashLink>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center mr-8 xl:mr-12">
              <Button 
                variant="default" 
                size="sm"
                className={`bg-white text-brand-green hover:bg-brand-offwhite px-3 py-2 xl:px-4 xl:py-2 rounded-lg font-medium ${
                  i18n.language === 'fr' || i18n.language === 'es' 
                    ? 'text-xs' 
                    : 'text-xs xl:text-sm'
                }`}
                asChild
              >
                <HashLink to="#quote" smooth>{t("hero.cta.quote")}</HashLink>
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
                  { key: "home", href: "#home" },
                  { key: "products", href: "#products" },
                  { key: "species", href: "#species" },
                  { key: "process", href: "#process" },
                  { key: "whyUs", href: "#why-us" },
                  { key: "compliance", href: "#compliance-summary" },
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
                  {t("hero.cta.quote")}
                </HashLink>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center bg-brand-green hero-section">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
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
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
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
                className="border-white text-brand-green hover:bg-white hover:text-brand-green px-8 py-4 rounded-lg font-medium"
                asChild
              >
                <a href="/assets/Amazin-Timber-2025-Catalog.pdf" target="_blank" rel="noreferrer">
                  {t("hero.cta.catalog")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Portfolio Section */}
      <section id="products" className="section-padding bg-gradient-to-b from-brand-offwhite to-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-foreground mb-4">{t("products.title")}</h2>
            <p className="text-body text-muted max-w-2xl mx-auto">{t("products.subtitle")}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(t("products.items", { returnObjects: true })).map(([key, item]: [string, any]) => (
              <div key={key} className="product-card">
                <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Species Section */}
      <section id="species" className="section-padding">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-h2 text-foreground mb-6">{t("species.title")}</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{t("species.tropical.title")}</h3>
                  <p className="text-body text-muted">{t("species.tropical.description")}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{t("species.reforested.title")}</h3>
                  <p className="text-body text-muted">{t("species.reforested.description")}</p>
                </div>
              </div>
            </div>
            <div>
              <img src="/assets/woodgrain.jpg" alt="Natural wood grain texture" className="rounded-lg shadow-medium w-full h-80 object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="process" className="section-padding bg-gradient-to-b from-white to-brand-offwhite">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-foreground mb-4">{t("process.title")}</h2>
            <p className="text-body text-muted max-w-2xl mx-auto">{t("process.subtitle")}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {Object.entries(t("process.steps", { returnObjects: true })).map(([key, step]: [string, any]) => (
              <div key={key} className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {key}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-small text-muted">{step.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button className="btn-secondary" asChild>
              <HashLink to="#quote" smooth>{t("process.cta")}</HashLink>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Amazin Timber Section */}
      <section id="why-us" className="section-padding">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-foreground mb-4">{t("whyUs.title")}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              {(t("whyUs.points", { returnObjects: true }) as string[]).slice(0, 3).map((point: string, index: number) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-primary rounded-full flex-shrink-0 mt-1"></div>
                  <p className="text-body text-foreground">{point}</p>
                </div>
              ))}
            </div>
            <div className="space-y-6">
              {(t("whyUs.points", { returnObjects: true }) as string[]).slice(3).map((point: string, index: number) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-primary rounded-full flex-shrink-0 mt-1"></div>
                  <p className="text-body text-foreground">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Summary Section */}
      <section id="compliance-summary" className="section-padding bg-brand-offwhite">
        <div className="section-container text-center">
          <h2 className="text-h2 mb-12">{t("compliance.summary.title")}</h2>
          <p className="text-body mb-6">
            {t("compliance.summary.description1")}
          </p>
          <p className="text-body mb-12">
            {t("compliance.summary.description2")}
          </p>
          <a href="/compliance" className="btn-primary">{t("compliance.summary.button")}</a>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="section-padding bg-gradient-to-b from-brand-offwhite to-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-foreground mb-4">{t("certifications.title")}</h2>
            <p className="text-body text-muted">{t("certifications.subtitle")}</p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-12">
            {["FSC®", "PEFC", "SGS", "Bureau Veritas"].map((cert) => (
              <div key={cert} className="certification-logo">
                <div className="w-32 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-sm text-gray-500">{cert}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-h2 text-foreground mb-6">{t("about.title")}</h2>
            <p className="text-body text-muted leading-relaxed">
              {t("about.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalog" className="section-padding bg-gradient-to-b from-white to-brand-offwhite">
        <div className="section-container text-center">
          <h2 className="text-h2 text-foreground mb-6">{t("catalog.title")}</h2>
          <p className="text-body text-muted mb-8 max-w-2xl mx-auto">
            {t("catalog.subtitle")}
          </p>
          <Button className="btn-primary" asChild>
            <a href="/assets/Amazin-Timber-2025-Catalog.pdf" target="_blank" rel="noreferrer">
              {t("catalog.cta")}
            </a>
          </Button>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section-padding">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-foreground mb-4">{t("faq.title")}</h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {Object.entries(t("faq.questions", { returnObjects: true })).map(([key, qa]: [string, any]) => (
              <div key={key} className="border border-border rounded-lg">
                <button className="faq-question w-full text-left px-6 py-4 font-semibold text-foreground hover:bg-brand-offwhite transition-colors">
                  {qa.question}
                  <span className="faq-icon float-right">+</span>
                </button>
                <div className="faq-answer hidden px-6 pb-4">
                  <p className="text-muted">{qa.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Quote Form Section */}
      <section id="quote" className="section-padding bg-gradient-to-b from-brand-offwhite to-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-foreground mb-4">{t("quote.title")}</h2>
            <p className="text-body text-muted max-w-2xl mx-auto">
              {t("quote.subtitle")}
            </p>
          </div>
          
          <form name="quote" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="./success.html" className="max-w-4xl mx-auto">
            <input type="hidden" name="form-name" value="quote" />
            <p className="hidden">
              <label>Don't fill this out if you're human: <input name="bot-field" /></label>
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="company-name" className="block text-sm font-medium text-foreground mb-2">{t("quote.form.companyName")} *</label>
                <input type="text" id="company-name" name="company-name" required className="form-input" />
              </div>
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-2">{t("quote.form.contactName")} *</label>
                <input type="text" id="contact-name" name="contact-name" required className="form-input" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">{t("quote.form.email")} *</label>
                <input type="email" id="email" name="email" required className="form-input" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">{t("quote.form.phone")} *</label>
                <input type="tel" id="phone" name="phone" required className="form-input" />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-foreground mb-2">{t("quote.form.location")} *</label>
                <input type="text" id="location" name="location" required className="form-input" />
              </div>
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-foreground mb-2">{t("quote.form.website")}</label>
                <input type="url" id="website" name="website" className="form-input" />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-3">{t("quote.form.productCategories")}</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(t("quote.form.products", { returnObjects: true })).map(([key, label]: [string, string]) => (
                  <label key={key} className="flex items-center">
                    <input type="checkbox" name="products[]" value={key} className="form-checkbox mr-2" />
                    <span className="text-sm">{label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <Button type="submit" className="btn-primary">
                {t("quote.form.submit")}
              </Button>
            </div>
          </form>
        </div>
      </section>

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

export default Index;
