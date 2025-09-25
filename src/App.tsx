import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CompliancePage from "./pages/CompliancePage";

const queryClient = new QueryClient();

const App = () => {
  const { i18n } = useTranslation();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {/* Language Switcher */}
        <div className="fixed top-3 right-3 z-50">
          <div className="relative group">
            {/* Globe Icon */}
            <div className="bg-primary text-white p-2 rounded shadow-lg flex items-center justify-center">
              <img 
                src="/assets/globe-language-svgrepo-com.svg" 
                alt="Language" 
                className="w-4 h-4 filter brightness-0 invert"
              />
            </div>
            {/* Language Abbreviation Box - Positioned absolutely below the globe */}
            <div className="absolute top-full left-0 right-0 mt-1 bg-primary text-white px-2.5 py-1.5 rounded text-xs font-medium shadow-lg text-center flex items-center justify-center">
              {i18n.language === 'en' ? 'EN' : 
               i18n.language === 'ar' ? 'عربي' : 
               i18n.language === 'fr' ? 'FR' : 
               i18n.language === 'es' ? 'ES' : 'PT'}
            </div>
            <div className="absolute right-1/2 transform translate-x-1/2 mt-2 w-20 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="py-1">
                <button
                  onClick={() => {
                    console.log('App - Changing language to EN');
                    i18n.changeLanguage('en');
                  }}
                  className={`block w-full text-left px-3 py-1 text-xs hover:bg-gray-100 ${i18n.language === 'en' ? 'bg-primary text-white' : 'text-gray-700'}`}
                >
                  EN
                </button>
                <button
                  onClick={() => {
                    console.log('App - Changing language to AR');
                    i18n.changeLanguage('ar');
                  }}
                  className={`block w-full text-left px-3 py-1 text-xs hover:bg-gray-100 ${i18n.language === 'ar' ? 'bg-primary text-white' : 'text-gray-700'}`}
                >
                  عربي
                </button>
                <button
                  onClick={() => {
                    console.log('App - Changing language to FR');
                    i18n.changeLanguage('fr');
                  }}
                  className={`block w-full text-left px-3 py-1 text-xs hover:bg-gray-100 ${i18n.language === 'fr' ? 'bg-primary text-white' : 'text-gray-700'}`}
                >
                  FR
                </button>
                <button
                  onClick={() => {
                    console.log('App - Changing language to ES');
                    i18n.changeLanguage('es');
                  }}
                  className={`block w-full text-left px-3 py-1 text-xs hover:bg-gray-100 ${i18n.language === 'es' ? 'bg-primary text-white' : 'text-gray-700'}`}
                >
                  ES
                </button>
                <button
                  onClick={() => {
                    console.log('App - Changing language to PT');
                    i18n.changeLanguage('pt');
                  }}
                  className={`block w-full text-left px-3 py-1 text-xs hover:bg-gray-100 ${i18n.language === 'pt' ? 'bg-primary text-white' : 'text-gray-700'}`}
                >
                  PT
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Routes */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="/compliance" element={<CompliancePage />} />
            <Route path="/compliance.html" element={<CompliancePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
