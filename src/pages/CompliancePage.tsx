import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { HashLink } from "react-router-hash-link";
import { Button } from "@/components/ui/button";

const CompliancePage = () => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                <a 
                  key={item.href}
                  href={item.href}
                  className="text-white hover:text-brand-offwhite transition-colors text-sm xl:text-base whitespace-nowrap"
                >
                  {t(`nav.${item.key}`)}
                </a>
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
                  <a 
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-white hover:text-brand-offwhite"
                  >
                    {t(`nav.${item.key}`)}
                  </a>
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
            <h1 className="text-hero text-white mb-6">Compliance Policy</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Our commitment to legal, responsible, and sustainable timber sourcing practices
            </p>
          </div>
        </section>

        {/* Policy Content */}
        <section className="section-padding">
          <div className="section-container">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-h2 text-foreground mb-6">Legality, Responsibility, and Due Diligence in Our Supply Chain</h2>
                
                <p className="text-body text-muted mb-6">
                  At Amazin Timber, we are fully and unconditionally committed to operating in compliance with all applicable laws, standards, and regulations that aim to protect forest resources, the environment, and human rights. Two of the most important international regulations guiding our processes are the EUDR (European Union Deforestation Regulation) and the U.S. Lacey Act.
                </p>

                <h3 className="text-xl font-semibold text-foreground mb-4">EUDR (EU Deforestation Regulation)</h3>
                <p className="text-body text-muted mb-6">
                  The EUDR requires operators and traders placing products on the EU market to ensure that these products do not contribute to deforestation or forest degradation. This entails effective due diligence across the entire supply chain: understanding the origin of the timber, land-use conditions, and verifying the legality of harvesting, transport, and processing. We implement robust procedures to verify legal and sustainable origin, including maps, certifications, audits, and documented traceability—ensuring that none of our products violate EUDR requirements.
                </p>

                <h3 className="text-xl font-semibold text-foreground mb-4">Lacey Act (USA)</h3>
                <p className="text-body text-muted mb-6">
                  The Lacey Act prohibits the trade of plants and plant products (including timber) that are harvested or transported illegally. When we sell or export to the U.S.—or when our partners do—we ensure that all materials comply with legal requirements of origin, documentation, and certification. We maintain comprehensive records demonstrating compliance with the forestry laws of the countries of origin, thereby preventing illegal timber from entering the supply chain.
                </p>

                <h3 className="text-xl font-semibold text-foreground mb-4">Our Due Diligence & Supply Chain Policy</h3>
                <p className="text-body text-muted mb-4">
                  To guarantee that all shipments respect legal and ethical standards, we ensure:
                </p>
                
                <ul className="text-body text-muted mb-6 space-y-3">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2 mr-3"></span>
                    <span><strong>Risk assessment:</strong> before selecting suppliers, we evaluate risks of illegal harvesting, deforestation, or human rights violations in the areas of origin.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2 mr-3"></span>
                    <span><strong>Mandatory documentation:</strong> we require all suppliers to provide licenses, internationally recognized forest certifications (e.g., FSC, PEFC) or equivalents, legal extraction, transport and processing authorizations, location maps, and land-use verification, among others.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2 mr-3"></span>
                    <span><strong>Audits & independent checks:</strong> where necessary, we conduct field audits or engage independent entities to verify the accuracy of information and legal compliance at the source.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2 mr-3"></span>
                    <span><strong>Traceability:</strong> from the point of harvest to the final shipment, we maintain clear documentary traceability so that the timber's path can be tracked at any stage.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2 mr-3"></span>
                    <span><strong>Continuous review:</strong> our internal procedures are periodically updated to incorporate best practices, comply with evolving legislation, and ensure continuous improvements in sustainability and transparency.</span>
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mb-4">Commitment to Sustainability & Business Ethics</h3>
                <p className="text-body text-muted mb-6">
                  At Amazin Timber, we believe that environmental and social responsibility is inseparable from successful business operations. Our commitment goes beyond legal compliance: we strive to exceed expectations by sourcing certified timber and supporting initiatives that foster conservation, biodiversity protection, and benefits for local communities. Our goal is to ensure that every product reaching you has passed through a supply chain that respects the planet, people, and ecosystems.
                </p>

                <div className="bg-brand-offwhite p-6 rounded-lg mt-8">
                  <h4 className="text-lg font-semibold text-foreground mb-3">Questions about our compliance practices?</h4>
                  <p className="text-body text-muted mb-4">
                    We're committed to transparency and are happy to discuss our compliance procedures with potential partners and customers.
                  </p>
                  <Button className="btn-primary" asChild>
                    <HashLink to="/#quote">Contact Us</HashLink>
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
