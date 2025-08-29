import { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { USPSection } from './components/USPSection';
import { PricingSection } from './components/PricingSection';
import { AdvantagesSection } from './components/AdvantagesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ProcessSection } from './components/ProcessSection';
import { FAQSection } from './components/FAQSection';
import { FinalCTASection } from './components/FinalCTASection';
import { AdminPanel } from './components/AdminPanel';
import { AnalyticsPanel } from './components/AnalyticsPanel';
import { CookieBanner } from './components/CookieBanner';
import { ReCAPTCHAProvider } from './components/ReCAPTCHAProvider';
import { ReCAPTCHABadgeHider } from './components/ReCAPTCHABadgeHider';
import { GoogleAnalytics } from './components/GoogleAnalytics';
import { useAdminPanel } from './hooks/useAdminPanel';
import { useAnalytics } from './hooks/useAnalytics';

export default function App() {
  const { isAdminPanelOpen, isAnalyticsPanelOpen, isAdminMode, closeAdminPanel, closeAnalyticsPanel, openAdminPanel, openAnalyticsPanel } = useAdminPanel();
  const { analytics, trackFormSubmission } = useAnalytics();

  return (
    <ReCAPTCHAProvider>
      <ReCAPTCHABadgeHider />
      <GoogleAnalytics measurementId={import.meta.env.VITE_GA_MEASUREMENT_ID || ''} />
      <div className="size-full">
        <HeroSection />
        <USPSection />
        <PricingSection />
        <PortfolioSection />
        <AdvantagesSection />
        <TestimonialsSection />
        <ProcessSection />
        <FAQSection />
        <FinalCTASection />
        
        {/* Скрытая админ панель */}
        <AdminPanel
          isOpen={isAdminPanelOpen}
          onClose={closeAdminPanel}
        />

        {/* Скрытая панель аналитики */}
        <AnalyticsPanel
          isOpen={isAnalyticsPanelOpen}
          onClose={closeAnalyticsPanel}
          analytics={analytics}
        />

        {/* Cookie баннер */}
        <CookieBanner />
        
        {/* Временный индикатор админ режима */}
        {isAdminMode && (
          <div 
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              zIndex: 9998,
              padding: '8px 16px',
              backgroundColor: '#000000',
              border: '2px solid #00FFFF',
              color: '#00FFFF',
              fontFamily: 'monospace',
              fontSize: '12px',
              fontWeight: 'bold',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
            }}
          >
            ADMIN MODE ACTIVE
          </div>
        )}
      </div>
    </ReCAPTCHAProvider>
  );
}