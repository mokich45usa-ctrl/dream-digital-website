import { useEffect } from 'react';
import { initGA, trackPageView } from '../utils/analytics';

interface GoogleAnalyticsProps {
  measurementId: string;
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  useEffect(() => {
    // Initialize Google Analytics
    initGA(measurementId);

    // Track initial page view
    trackPageView(window.location.pathname);

    // Track page views on route changes
    const handleRouteChange = () => {
      trackPageView(window.location.pathname);
    };

    // Listen for popstate events (browser back/forward)
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [measurementId]);

  return null; // This component doesn't render anything
}
