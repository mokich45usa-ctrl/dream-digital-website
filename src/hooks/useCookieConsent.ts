import { useState, useEffect } from 'react';

export interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  functional: boolean;
  advertising: boolean;
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent>({
    necessary: true,
    analytics: false,
    functional: false,
    advertising: false
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Загружаем сохраненное согласие из localStorage
    const savedConsent = localStorage.getItem('cookieConsent');
    if (savedConsent) {
      try {
        const parsedConsent = JSON.parse(savedConsent);
        setConsent(parsedConsent);
      } catch (e) {
        console.error('Error parsing cookie consent:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  const updateConsent = (newConsent: CookieConsent) => {
    setConsent(newConsent);
    localStorage.setItem('cookieConsent', JSON.stringify(newConsent));
  };

  const hasConsent = (type: keyof CookieConsent) => {
    return consent[type];
  };

  const canLoadAnalytics = () => {
    return hasConsent('analytics');
  };

  const canLoadFunctional = () => {
    return hasConsent('functional');
  };

  const canLoadAdvertising = () => {
    return hasConsent('advertising');
  };

  const canLoadEmailJS = () => {
    return hasConsent('functional'); // EmailJS - функциональный сервис
  };

  const canLoadGoogleAnalytics = () => {
    return hasConsent('analytics'); // Google Analytics - аналитический сервис
  };

  const canLoadFacebookPixel = () => {
    return hasConsent('advertising'); // Facebook Pixel - рекламный сервис
  };

  return {
    consent,
    isLoaded,
    updateConsent,
    hasConsent,
    canLoadAnalytics,
    canLoadFunctional,
    canLoadAdvertising,
    canLoadEmailJS,
    canLoadGoogleAnalytics,
    canLoadFacebookPixel
  };
}
