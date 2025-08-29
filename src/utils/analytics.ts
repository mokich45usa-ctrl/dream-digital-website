// Google Analytics 4 utility functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Initialize Google Analytics
export const initGA = (measurementId: string) => {
  if (typeof window !== 'undefined') {
    // Load gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      page_title: 'Dream Digital - Web Development Agency',
      page_location: window.location.href,
    });
  }
};

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.VITE_GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track form submissions
export const trackFormSubmission = (formType: string) => {
  trackEvent('form_submit', 'engagement', formType);
};

// Track button clicks
export const trackButtonClick = (buttonName: string) => {
  trackEvent('button_click', 'engagement', buttonName);
};

// Track admin panel access
export const trackAdminAccess = () => {
  trackEvent('admin_access', 'admin', 'admin_panel_opened');
};

// Track pricing section views
export const trackPricingView = (packageName: string) => {
  trackEvent('pricing_view', 'engagement', packageName);
};

// Track contact actions
export const trackContactAction = (action: string) => {
  trackEvent('contact_action', 'engagement', action);
};
