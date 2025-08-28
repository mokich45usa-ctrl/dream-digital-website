import { useState, useEffect } from 'react';

export interface AnalyticsData {
  // Page views and sessions
  totalPageViews: number;
  uniqueVisitors: number;
  sessions: number;
  currentSessionStart: number;
  
  // Form submissions
  totalSubmissions: number;
  submissionsThisMonth: number;
  submissionsThisWeek: number;
  
  // User behavior
  averageTimeOnSite: number;
  bounceRate: number;
  pagesPerSession: number;
  
  // Traffic sources (basic)
  directTraffic: number;
  searchTraffic: number;
  socialTraffic: number;
  
  // Device and browser info
  deviceTypes: { mobile: number; desktop: number; tablet: number };
  browsers: Record<string, number>;
  
  // Conversion tracking
  conversionRate: number;
  lastSubmissionDate: string | null;
  
  // Performance metrics
  pageLoadTimes: number[];
  averageLoadTime: number;
}

const ANALYTICS_KEY = 'dream_digital_analytics';
const SESSION_KEY = 'dream_digital_session';

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalPageViews: 0,
    uniqueVisitors: 0,
    sessions: 0,
    currentSessionStart: Date.now(),
    totalSubmissions: 0,
    submissionsThisMonth: 0,
    submissionsThisWeek: 0,
    averageTimeOnSite: 0,
    bounceRate: 0,
    pagesPerSession: 0,
    directTraffic: 0,
    searchTraffic: 0,
    socialTraffic: 0,
    deviceTypes: { mobile: 0, desktop: 0, tablet: 0 },
    browsers: {},
    conversionRate: 0,
    lastSubmissionDate: null,
    pageLoadTimes: [],
    averageLoadTime: 0
  });

  // Load analytics from localStorage
  const loadAnalytics = () => {
    try {
      const saved = localStorage.getItem(ANALYTICS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setAnalytics(parsed);
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
    }
  };

  // Save analytics to localStorage
  const saveAnalytics = (data: AnalyticsData) => {
    try {
      localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving analytics:', error);
    }
  };

  // Track page view
  const trackPageView = () => {
    console.log('🔍 Analytics Debug - Tracking page view');
    setAnalytics(prev => {
      const newData = {
        ...prev,
        totalPageViews: prev.totalPageViews + 1,
        pagesPerSession: prev.pagesPerSession + 1
      };
      
      // Check if this is a new session
      const sessionData = localStorage.getItem(SESSION_KEY);
      if (!sessionData) {
        newData.sessions = prev.sessions + 1;
        newData.currentSessionStart = Date.now();
        newData.pagesPerSession = 1;
        localStorage.setItem(SESSION_KEY, JSON.stringify({
          startTime: Date.now(),
          pages: 1
        }));
        console.log('🔍 Analytics Debug - New session started');
      } else {
        const session = JSON.parse(sessionData);
        session.pages += 1;
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        console.log('🔍 Analytics Debug - Existing session, pages:', session.pages);
      }
      
      saveAnalytics(newData);
      console.log('🔍 Analytics Debug - Updated analytics:', newData);
      return newData;
    });
  };

  // Track form submission
  const trackFormSubmission = () => {
    setAnalytics(prev => {
      const now = new Date();
      const thisMonth = now.getMonth() === new Date(prev.lastSubmissionDate || 0).getMonth();
      const thisWeek = now.getTime() - new Date(prev.lastSubmissionDate || 0).getTime() < 7 * 24 * 60 * 60 * 1000;
      
      const newData = {
        ...prev,
        totalSubmissions: prev.totalSubmissions + 1,
        submissionsThisMonth: thisMonth ? prev.submissionsThisMonth + 1 : 1,
        submissionsThisWeek: thisWeek ? prev.submissionsThisWeek + 1 : 1,
        lastSubmissionDate: now.toISOString(),
        conversionRate: prev.totalPageViews > 0 ? ((prev.totalSubmissions + 1) / prev.totalPageViews) * 100 : 0
      };
      
      saveAnalytics(newData);
      return newData;
    });
  };

  // Detect device type
  const detectDeviceType = () => {
    const userAgent = navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isTablet = /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)/i.test(userAgent);
    
    if (isTablet) return 'tablet';
    if (isMobile) return 'mobile';
    return 'desktop';
  };

  // Detect browser
  const detectBrowser = () => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Other';
  };

  // Detect traffic source
  const detectTrafficSource = () => {
    const referrer = document.referrer;
    if (!referrer) return 'direct';
    if (referrer.includes('google') || referrer.includes('bing') || referrer.includes('yahoo')) return 'search';
    if (referrer.includes('facebook') || referrer.includes('instagram') || referrer.includes('twitter')) return 'social';
    return 'other';
  };

  // Track performance
  const trackPerformance = () => {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        setAnalytics(prev => {
          const newLoadTimes = [...prev.pageLoadTimes, loadTime].slice(-10); // Keep last 10
          const newData = {
            ...prev,
            pageLoadTimes: newLoadTimes,
            averageLoadTime: newLoadTimes.reduce((a, b) => a + b, 0) / newLoadTimes.length
          };
          saveAnalytics(newData);
          return newData;
        });
      }
    }
  };

  // Initialize analytics
  useEffect(() => {
    loadAnalytics();
    
    // Track initial page view
    trackPageView();
    
    // Track device and browser info
    const deviceType = detectDeviceType();
    const browser = detectBrowser();
    const trafficSource = detectTrafficSource();
    
    setAnalytics(prev => {
      const newData = {
        ...prev,
        deviceTypes: {
          ...prev.deviceTypes,
          [deviceType]: prev.deviceTypes[deviceType as keyof typeof prev.deviceTypes] + 1
        },
        browsers: {
          ...prev.browsers,
          [browser]: (prev.browsers[browser] || 0) + 1
        }
      };
      
      // Track traffic source
      switch (trafficSource) {
        case 'direct':
          newData.directTraffic += 1;
          break;
        case 'search':
          newData.searchTraffic += 1;
          break;
        case 'social':
          newData.socialTraffic += 1;
          break;
      }
      
      saveAnalytics(newData);
      return newData;
    });
    
    // Track performance
    trackPerformance();
    
    // Track time on site
    const startTime = Date.now();
    const handleBeforeUnload = () => {
      const timeOnSite = Date.now() - startTime;
      setAnalytics(prev => {
        const newData = {
          ...prev,
          averageTimeOnSite: (prev.averageTimeOnSite + timeOnSite) / 2
        };
        saveAnalytics(newData);
        return newData;
      });
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Force update analytics when component mounts
  useEffect(() => {
    const saved = localStorage.getItem(ANALYTICS_KEY);
    console.log('🔍 Analytics Debug - Saved data:', saved);
    
    if (!saved) {
      console.log('🔍 Analytics Debug - No saved data, initializing demo data');
      // Initialize with some demo data if no analytics exist
      const demoData: AnalyticsData = {
        totalPageViews: 1,
        uniqueVisitors: 1,
        sessions: 1,
        currentSessionStart: Date.now(),
        totalSubmissions: 0,
        submissionsThisMonth: 0,
        submissionsThisWeek: 0,
        averageTimeOnSite: 0,
        bounceRate: 0,
        pagesPerSession: 1,
        directTraffic: 1,
        searchTraffic: 0,
        socialTraffic: 0,
        deviceTypes: { mobile: 0, desktop: 1, tablet: 0 },
        browsers: { Chrome: 1 },
        conversionRate: 0,
        lastSubmissionDate: null,
        pageLoadTimes: [100],
        averageLoadTime: 100
      };
      localStorage.setItem(ANALYTICS_KEY, JSON.stringify(demoData));
      setAnalytics(demoData);
      console.log('🔍 Analytics Debug - Demo data initialized:', demoData);
    } else {
      console.log('🔍 Analytics Debug - Loaded existing data');
    }
  }, []);

  // Calculate bounce rate (single page sessions)
  useEffect(() => {
    const sessionData = localStorage.getItem(SESSION_KEY);
    if (sessionData) {
      const session = JSON.parse(sessionData);
      if (session.pages === 1) {
        setAnalytics(prev => {
          const newData = {
            ...prev,
            bounceRate: ((prev.sessions - 1) / prev.sessions) * 100
          };
          saveAnalytics(newData);
          return newData;
        });
      }
    }
  }, [analytics.sessions]);

  return {
    analytics,
    trackPageView,
    trackFormSubmission,
    trackPerformance
  };
}
