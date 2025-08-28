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
import { useAdminPanel } from './hooks/useAdminPanel';
import { useAnalytics } from './hooks/useAnalytics';

export default function App() {
  const { isAdminPanelOpen, isAnalyticsPanelOpen, isAdminMode, closeAdminPanel, closeAnalyticsPanel } = useAdminPanel();
  const { analytics, trackFormSubmission } = useAnalytics();

  console.log('🔍 App Debug - isAnalyticsPanelOpen:', isAnalyticsPanelOpen, 'analytics:', analytics);

  return (
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
      
      {/* Индикатор админ режима (только для разработки) */}
      {isAdminMode && (
        <div 
          className="fixed top-4 right-4 z-50 px-3 py-1 text-xs font-black tracking-wide border-2"
          style={{ 
            backgroundColor: '#000000',
            borderColor: '#00FFFF',
            color: '#00FFFF',
            fontFamily: 'monospace'
          }}
        >
          ADMIN MODE
        </div>
      )}
    </div>
  );
}