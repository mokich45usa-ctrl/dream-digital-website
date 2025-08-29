import { useState, useEffect } from 'react';

export interface AnalyticsData {
  totalPageViews: number;
  uniqueVisitors: number;
  sessions: number;
  currentSessionStart: number;
  totalSubmissions: number;
  submissionsThisMonth: number;
  submissionsThisWeek: number;
  averageTimeOnSite: number;
  bounceRate: number;
  pagesPerSession: number;
  directTraffic: number;
  searchTraffic: number;
  socialTraffic: number;
  deviceTypes: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
  browsers: {
    [key: string]: number;
  };
  conversionRate: number;
  lastSubmissionDate: string | null;
  pageLoadTimes: number[];
  averageLoadTime: number;
}

const initialAnalytics: AnalyticsData = {
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
  deviceTypes: {
    mobile: 0,
    desktop: 0,
    tablet: 0
  },
  browsers: {},
  conversionRate: 0,
  lastSubmissionDate: null,
  pageLoadTimes: [],
  averageLoadTime: 0
};

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData>(initialAnalytics);

  // Load analytics from localStorage
  const loadAnalytics = () => {
    const saved = localStorage.getItem('dream_digital_analytics');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAnalytics(parsed);
      } catch (error) {
        setAnalytics(initialAnalytics);
      }
    } else {
      // Initialize with demo data if no analytics exist
      const demoData: AnalyticsData = {
        ...initialAnalytics,
        totalPageViews: 1250,
        uniqueVisitors: 890,
        sessions: 156,
        totalSubmissions: 23,
        submissionsThisMonth: 8,
        submissionsThisWeek: 3,
        averageTimeOnSite: 125000, // 2:05 minutes
        bounceRate: 35.2,
        pagesPerSession: 2.8,
        directTraffic: 650,
        searchTraffic: 420,
        socialTraffic: 180,
        deviceTypes: {
          mobile: 520,
          desktop: 680,
          tablet: 50
        },
        browsers: {
          'Chrome': 720,
          'Safari': 280,
          'Firefox': 150,
          'Edge': 100
        },
        conversionRate: 1.84,
        lastSubmissionDate: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        pageLoadTimes: [1200, 980, 1450, 1100, 1350, 890, 1600, 1250, 1400, 1150],
        averageLoadTime: 1237
      };
      setAnalytics(demoData);
      localStorage.setItem('dream_digital_analytics', JSON.stringify(demoData));
    }
  };

  // Save analytics to localStorage
  const saveAnalytics = (data: AnalyticsData) => {
    localStorage.setItem('dream_digital_analytics', JSON.stringify(data));
  };

  // Track page view
  const trackPageView = () => {
    setAnalytics(prev => {
      const updated = {
        ...prev,
        totalPageViews: prev.totalPageViews + 1
      };
      saveAnalytics(updated);
      return updated;
    });
  };

  // Track form submission
  const trackFormSubmission = () => {
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    const thisWeek = getWeekNumber(now);

    setAnalytics(prev => {
      const isThisMonth = prev.lastSubmissionDate ? 
        new Date(prev.lastSubmissionDate).getMonth() === thisMonth &&
        new Date(prev.lastSubmissionDate).getFullYear() === thisYear : false;

      const isThisWeek = prev.lastSubmissionDate ? 
        getWeekNumber(new Date(prev.lastSubmissionDate)) === thisWeek &&
        new Date(prev.lastSubmissionDate).getFullYear() === thisYear : false;

      const updated = {
        ...prev,
        totalSubmissions: prev.totalSubmissions + 1,
        submissionsThisMonth: isThisMonth ? prev.submissionsThisMonth + 1 : 1,
        submissionsThisWeek: isThisWeek ? prev.submissionsThisWeek + 1 : 1,
        lastSubmissionDate: now.toISOString(),
        conversionRate: ((prev.totalSubmissions + 1) / prev.totalPageViews) * 100
      };
      saveAnalytics(updated);
      return updated;
    });
  };

  // Detect device type
  const detectDeviceType = () => {
    const userAgent = navigator.userAgent;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      if (/iPad/i.test(userAgent)) {
        return 'tablet';
      }
      return 'mobile';
    }
    return 'desktop';
  };

  // Detect browser
  const detectBrowser = () => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Other';
  };

  // Detect traffic source
  const detectTrafficSource = () => {
    const referrer = document.referrer;
    if (!referrer) return 'direct';
    if (referrer.includes('google') || referrer.includes('bing') || referrer.includes('yahoo')) {
      return 'search';
    }
    if (referrer.includes('facebook') || referrer.includes('twitter') || referrer.includes('instagram')) {
      return 'social';
    }
    return 'direct';
  };

  // Track performance
  const trackPerformance = () => {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        setAnalytics(prev => {
          const newLoadTimes = [...prev.pageLoadTimes, loadTime].slice(-10); // Keep last 10
          const avgLoadTime = newLoadTimes.reduce((a, b) => a + b, 0) / newLoadTimes.length;
          
          const updated = {
            ...prev,
            pageLoadTimes: newLoadTimes,
            averageLoadTime: avgLoadTime
          };
          saveAnalytics(updated);
          return updated;
        });
      }
    }
  };

  // Calculate week number
  const getWeekNumber = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  // Initialize analytics
  useEffect(() => {
    loadAnalytics();
    trackPageView();
    trackPerformance();

    // Track device and browser
    const deviceType = detectDeviceType();
    const browser = detectBrowser();
    const trafficSource = detectTrafficSource();

    setAnalytics(prev => {
      const updated = {
        ...prev,
        deviceTypes: {
          ...prev.deviceTypes,
          [deviceType]: prev.deviceTypes[deviceType] + 1
        },
        browsers: {
          ...prev.browsers,
          [browser]: (prev.browsers[browser] || 0) + 1
        },
        [trafficSource === 'direct' ? 'directTraffic' : 
         trafficSource === 'search' ? 'searchTraffic' : 'socialTraffic']: 
        prev[trafficSource === 'direct' ? 'directTraffic' : 
             trafficSource === 'search' ? 'searchTraffic' : 'socialTraffic'] + 1
      };
      saveAnalytics(updated);
      return updated;
    });
  }, []);

  // Track session
  useEffect(() => {
    const sessionStart = Date.now();
    setAnalytics(prev => {
      const updated = {
        ...prev,
        sessions: prev.sessions + 1,
        currentSessionStart: sessionStart
      };
      saveAnalytics(updated);
      return updated;
    });
  }, []);

  // Calculate bounce rate and pages per session
  useEffect(() => {
    const sessionDuration = Date.now() - analytics.currentSessionStart;
    const isBounce = analytics.totalPageViews === 1 && sessionDuration < 30000; // Less than 30 seconds

    setAnalytics(prev => {
      const updated = {
        ...prev,
        bounceRate: isBounce ? ((prev.bounceRate * (prev.sessions - 1) + 100) / prev.sessions) : 
                               ((prev.bounceRate * (prev.sessions - 1)) / prev.sessions),
        averageTimeOnSite: ((prev.averageTimeOnSite * (prev.sessions - 1)) + sessionDuration) / prev.sessions,
        pagesPerSession: prev.totalPageViews / prev.sessions
      };
      saveAnalytics(updated);
      return updated;
    });
  }, [analytics.totalPageViews]);

  return {
    analytics,
    trackFormSubmission
  };
}
