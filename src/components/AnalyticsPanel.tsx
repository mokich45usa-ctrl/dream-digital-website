import { useState, useEffect } from 'react';
import { X, Download, RefreshCw, BarChart3, Users, Clock, DollarSign, TrendingUp, Monitor, Smartphone, Globe, Zap } from 'lucide-react';
import { AnalyticsData } from '../hooks/useAnalytics';

interface AnalyticsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  analytics: AnalyticsData;
}

export function AnalyticsPanel({ isOpen, onClose, analytics }: AnalyticsPanelProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'traffic' | 'performance' | 'conversions'>('overview');

  console.log('🔍 AnalyticsPanel Debug - isOpen:', isOpen, 'analytics:', analytics);

  if (!isOpen) return null;

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    }
    return `${seconds}s`;
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatPercentage = (num: number) => {
    return `${num.toFixed(1)}%`;
  };

  const getTopBrowser = () => {
    const browsers = Object.entries(analytics.browsers);
    if (browsers.length === 0) return 'None';
    return browsers.sort((a, b) => b[1] - a[1])[0][0];
  };

  const getTopDevice = () => {
    const devices = Object.entries(analytics.deviceTypes);
    if (devices.length === 0) return 'None';
    return devices.sort((a, b) => b[1] - a[1])[0][0];
  };

  const exportAnalytics = () => {
    const csvContent = [
      ['Metric', 'Value'],
      ['Total Page Views', analytics.totalPageViews],
      ['Total Sessions', analytics.sessions],
      ['Total Submissions', analytics.totalSubmissions],
      ['Conversion Rate', `${analytics.conversionRate.toFixed(2)}%`],
      ['Average Time on Site', formatTime(analytics.averageTimeOnSite)],
      ['Bounce Rate', `${analytics.bounceRate.toFixed(2)}%`],
      ['Pages per Session', analytics.pagesPerSession.toFixed(2)],
      ['Average Load Time', `${analytics.averageLoadTime.toFixed(2)}ms`],
      ['Direct Traffic', analytics.directTraffic],
      ['Search Traffic', analytics.searchTraffic],
      ['Social Traffic', analytics.socialTraffic],
      ['Mobile Users', analytics.deviceTypes.mobile],
      ['Desktop Users', analytics.deviceTypes.desktop],
      ['Tablet Users', analytics.deviceTypes.tablet],
      ['Top Browser', getTopBrowser()],
      ['Last Submission', analytics.lastSubmissionDate || 'None']
    ];

    const csv = csvContent.map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dream-digital-analytics-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const resetAnalytics = () => {
    if (confirm('Are you sure you want to reset all analytics data? This cannot be undone.')) {
      localStorage.removeItem('dream_digital_analytics');
      localStorage.removeItem('dream_digital_session');
      window.location.reload();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{ 
        backgroundColor: '#000000'
      }}
    >
      <div 
        className="min-h-screen w-full p-0 border-4"
        style={{ 
          backgroundColor: '#000000',
          borderColor: '#00FFFF',
          boxShadow: `0 0 50px #00FFFF60`
        }}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between p-6 border-b-4"
          style={{ borderColor: '#00FFFF' }}
        >
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 flex items-center justify-center border-4"
              style={{ 
                backgroundColor: '#00FFFF',
                borderColor: '#000000',
                color: '#000000'
              }}
            >
              <BarChart3 size={24} />
            </div>
            <div>
              <h1 
                className="text-2xl font-black tracking-wide"
                style={{ color: '#00FFFF' }}
              >
                WEBSITE ANALYTICS
              </h1>
              <p 
                className="text-sm"
                style={{ color: '#00FFFF' }}
              >
                Comprehensive website performance metrics
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={exportAnalytics}
              className="flex items-center gap-2 px-4 py-2 border-2 font-black tracking-wide transition-all hover:scale-105"
              style={{
                backgroundColor: '#000000',
                borderColor: '#00FFFF',
                color: '#00FFFF'
              }}
            >
              <Download size={16} />
              EXPORT
            </button>

            <button
              onClick={resetAnalytics}
              className="flex items-center gap-2 px-4 py-2 border-2 font-black tracking-wide transition-all hover:scale-105"
              style={{
                backgroundColor: '#000000',
                borderColor: '#FF0033',
                color: '#FF0033'
              }}
            >
              <RefreshCw size={16} />
              RESET
            </button>
            
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center border-2 transition-all hover:scale-105"
              style={{
                backgroundColor: '#000000',
                borderColor: '#FF0033',
                color: '#FF0033'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b-4" style={{ borderColor: '#00FFFF' }}>
          {[
            { id: 'overview', label: 'OVERVIEW', icon: BarChart3 },
            { id: 'traffic', label: 'TRAFFIC', icon: Globe },
            { id: 'performance', label: 'PERFORMANCE', icon: Zap },
            { id: 'conversions', label: 'CONVERSIONS', icon: TrendingUp }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-6 py-4 font-black tracking-wide transition-all ${
                activeTab === id ? 'border-b-4' : 'opacity-60 hover:opacity-100'
              }`}
              style={{
                backgroundColor: '#000000',
                borderColor: activeTab === id ? '#00FFFF' : 'transparent',
                color: '#00FFFF'
              }}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div 
                  className="p-6 border-4"
                  style={{ 
                    backgroundColor: '#000000',
                    borderColor: '#00FFFF'
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-10 h-10 flex items-center justify-center"
                      style={{ backgroundColor: '#00FFFF', color: '#000000' }}
                    >
                      <Users size={20} />
                    </div>
                    <div>
                      <div className="text-sm opacity-60">TOTAL PAGE VIEWS</div>
                      <div className="text-2xl font-black" style={{ color: '#00FFFF' }}>
                        {formatNumber(analytics.totalPageViews)}
                      </div>
                    </div>
                  </div>
                </div>

                <div 
                  className="p-6 border-4"
                  style={{ 
                    backgroundColor: '#000000',
                    borderColor: '#00FFFF'
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-10 h-10 flex items-center justify-center"
                      style={{ backgroundColor: '#00FFFF', color: '#000000' }}
                    >
                      <Monitor size={20} />
                    </div>
                    <div>
                      <div className="text-sm opacity-60">TOTAL SESSIONS</div>
                      <div className="text-2xl font-black" style={{ color: '#00FFFF' }}>
                        {formatNumber(analytics.sessions)}
                      </div>
                    </div>
                  </div>
                </div>

                <div 
                  className="p-6 border-4"
                  style={{ 
                    backgroundColor: '#000000',
                    borderColor: '#00FFFF'
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-10 h-10 flex items-center justify-center"
                      style={{ backgroundColor: '#00FFFF', color: '#000000' }}
                    >
                      <DollarSign size={20} />
                    </div>
                    <div>
                      <div className="text-sm opacity-60">TOTAL SUBMISSIONS</div>
                      <div className="text-2xl font-black" style={{ color: '#00FFFF' }}>
                        {formatNumber(analytics.totalSubmissions)}
                      </div>
                    </div>
                  </div>
                </div>

                <div 
                  className="p-6 border-4"
                  style={{ 
                    backgroundColor: '#000000',
                    borderColor: '#00FFFF'
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-10 h-10 flex items-center justify-center"
                      style={{ backgroundColor: '#00FFFF', color: '#000000' }}
                    >
                      <TrendingUp size={20} />
                    </div>
                    <div>
                      <div className="text-sm opacity-60">CONVERSION RATE</div>
                      <div className="text-2xl font-black" style={{ color: '#00FFFF' }}>
                        {formatPercentage(analytics.conversionRate)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Device & Browser Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div 
                  className="p-6 border-4"
                  style={{ 
                    backgroundColor: '#000000',
                    borderColor: '#00FFFF'
                  }}
                >
                  <h3 className="text-lg font-black mb-4" style={{ color: '#00FFFF' }}>
                    DEVICE TYPES
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(analytics.deviceTypes).map(([device, count]) => (
                      <div key={device} className="flex items-center justify-between">
                        <span className="capitalize" style={{ color: '#00FFFF' }}>
                          {device}
                        </span>
                        <span className="font-black" style={{ color: '#00FFFF' }}>
                          {formatNumber(count)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div 
                  className="p-6 border-4"
                  style={{ 
                    backgroundColor: '#000000',
                    borderColor: '#00FFFF'
                  }}
                >
                  <h3 className="text-lg font-black mb-4" style={{ color: '#00FFFF' }}>
                    TOP BROWSERS
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(analytics.browsers)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 5)
                      .map(([browser, count]) => (
                        <div key={browser} className="flex items-center justify-between">
                          <span style={{ color: '#00FFFF' }}>
                            {browser}
                          </span>
                          <span className="font-black" style={{ color: '#00FFFF' }}>
                            {formatNumber(count)}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'traffic' && (
            <div className="space-y-8">
              {/* Traffic Sources */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div 
                  className="p-6 border-4"
                  style={{ 
                    backgroundColor: '#000000',
                    borderColor: '#00FFFF'
                  }}
                >
                  <h3 className="text-lg font-black mb-4" style={{ color: '#00FFFF' }}>
                    DIRECT TRAFFIC
                  </h3>
                  <div className="text-3xl font-black" style={{ color: '#00FFFF' }}>
                    {formatNumber(analytics.directTraffic)}
                  </div>
                </div>

                <div 
                  className="p-6 border-4"
                  style={{ 
                    backgroundColor: '#000000',
                    borderColor: '#00FFFF'
                  }}
                >
                  <h3 className="text-lg font-black mb-4" style={{ color: '#00FFFF' }}>
                    SEARCH TRAFFIC
                  </h3>
                  <div className="text-3xl font-black" style={{ color: '#00FFFF' }}>
                    {formatNumber(analytics.searchTraffic)}
                  </div>
                </div>

                <div 
                  className="p-6 border-4"
                  style={{ 
                    backgroundColor: '#000000',
                    borderColor: '#00FFFF'
                  }}
                >
                  <h3 className="text-lg font-black mb-4" style={{ color: '#00FFFF' }}>
                    SOCIAL TRAFFIC
                  </h3>
                  <div className="text-3xl font-black" style={{ color: '#00FFFF' }}>
                    {formatNumber(analytics.socialTraffic)}
                  </div>
                </div>
              </div>

              {/* User Behavior */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  className="p-6 border-4"
                  style={{ 
                    backgroundColor: '#000000',
                    borderColor: '#00FFFF'
                  }}
                >
                  <h3 className="text-lg font-black mb-4" style={{ color: '#00FFFF' }}>
                    USER BEHAVIOR
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span style={{ color: '#00FFFF' }}>Average Time on Site</span>
                      <span className="font-black" style={{ color: '#00FFFF' }}>
                        {formatTime(analytics.averageTimeOnSite)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span style={{ color: '#00FFFF' }}>Bounce Rate</span>
                      <span className="font-black" style={{ color: '#00FFFF' }}>
                        {formatPercentage(analytics.bounceRate)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span style={{ color: '#00FFFF' }}>Pages per Session</span>
                      <span className="font-black" style={{ color: '#00FFFF' }}>
                        {analytics.pagesPerSession.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div 
                  className="p-6 border-4"
                  style={{ 
                    backgroundColor: '#000000',
                    borderColor: '#00FFFF'
                  }}
                >
                  <h3 className="text-lg font-black mb-4" style={{ color: '#00FFFF' }}>
                    TRAFFIC INSIGHTS
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span style={{ color: '#00FFFF' }}>Top Device</span>
                      <span className="font-black capitalize" style={{ color: '#00FFFF' }}>
                        {getTopDevice()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span style={{ color: '#00FFFF' }}>Top Browser</span>
                      <span className="font-black" style={{ color: '#00FFFF' }}>
                        {getTopBrowser()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span style={{ color: '#00FFFF' }}>Last Activity</span>
                      <span className="font-black" style={{ color: '#00FFFF' }}>
                        {analytics.lastSubmissionDate ? 
                          new Date(analytics.lastSubmissionDate).toLocaleDateString('en-US') : 
                          'None'
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="space-y-8">
              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  className="p-6 border-4"
                  style={{ 
                    backgroundColor: '#000000',
                    borderColor: '#00FFFF'
                  }}
                >
                  <h3 className="text-lg font-black mb-4" style={{ color: '#00FFFF' }}>
                    PAGE LOAD PERFORMANCE
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span style={{ color: '#00FFFF' }}>Average Load Time</span>
                      <span className="font-black" style={{ color: '#00FFFF' }}>
                        {analytics.averageLoadTime.toFixed(2)}ms
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span style={{ color: '#00FFFF' }}>Samples Collected</span>
                      <span className="font-black" style={{ color: '#00FFFF' }}>
                        {analytics.pageLoadTimes.length}
                      </span>
                    </div>
                  </div>
                </div>

                <div 
                  className="p-6 border-4"
                  style={{ 
                    backgroundColor: '#000000',
                    borderColor: '#00FFFF'
                  }}
                >
                  <h3 className="text-lg font-black mb-4" style={{ color: '#00FFFF' }}>
                    RECENT LOAD TIMES
                  </h3>
                  <div className="space-y-2">
                    {analytics.pageLoadTimes.slice(-5).map((time, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span style={{ color: '#00FFFF' }}>Load {index + 1}</span>
                        <span className="font-black" style={{ color: '#00FFFF' }}>
                          {time.toFixed(2)}ms
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'conversions' && (
            <div className="space-y-8">
              {/* Conversion Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div 
                  className="p-6 border-4"
                  style={{ 
                    backgroundColor: '#000000',
                    borderColor: '#00FFFF'
                  }}
                >
                  <h3 className="text-lg font-black mb-4" style={{ color: '#00FFFF' }}>
                    THIS MONTH
                  </h3>
                  <div className="text-3xl font-black" style={{ color: '#00FFFF' }}>
                    {formatNumber(analytics.submissionsThisMonth)}
                  </div>
                </div>

                <div 
                  className="p-6 border-4"
                  style={{ 
                    backgroundColor: '#000000',
                    borderColor: '#00FFFF'
                  }}
                >
                  <h3 className="text-lg font-black mb-4" style={{ color: '#00FFFF' }}>
                    THIS WEEK
                  </h3>
                  <div className="text-3xl font-black" style={{ color: '#00FFFF' }}>
                    {formatNumber(analytics.submissionsThisWeek)}
                  </div>
                </div>

                <div 
                  className="p-6 border-4"
                  style={{ 
                    backgroundColor: '#000000',
                    borderColor: '#00FFFF'
                  }}
                >
                  <h3 className="text-lg font-black mb-4" style={{ color: '#00FFFF' }}>
                    CONVERSION RATE
                  </h3>
                  <div className="text-3xl font-black" style={{ color: '#00FFFF' }}>
                    {formatPercentage(analytics.conversionRate)}
                  </div>
                </div>
              </div>

              {/* Conversion Insights */}
              <div 
                className="p-6 border-4"
                style={{ 
                  backgroundColor: '#000000',
                  borderColor: '#00FFFF'
                }}
              >
                <h3 className="text-lg font-black mb-4" style={{ color: '#00FFFF' }}>
                  CONVERSION INSIGHTS
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span style={{ color: '#00FFFF' }}>Total Submissions</span>
                    <span className="font-black" style={{ color: '#00FFFF' }}>
                      {formatNumber(analytics.totalSubmissions)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: '#00FFFF' }}>Last Submission</span>
                    <span className="font-black" style={{ color: '#00FFFF' }}>
                      {analytics.lastSubmissionDate ? 
                        new Date(analytics.lastSubmissionDate).toLocaleString('en-US') : 
                        'None'
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: '#00FFFF' }}>Views to Submission Ratio</span>
                    <span className="font-black" style={{ color: '#00FFFF' }}>
                      {analytics.totalPageViews > 0 ? 
                        `1:${Math.round(analytics.totalPageViews / analytics.totalSubmissions)}` : 
                        'N/A'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Corner accent */}
        <div 
          className="absolute bottom-0 right-0 w-8 h-8"
          style={{ backgroundColor: '#FF0033' }}
        ></div>
      </div>
    </div>
  );
}
