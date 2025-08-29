import { useState, useEffect } from 'react';
import { X, Download, RefreshCw, BarChart3, Users, Clock, DollarSign, TrendingUp, Monitor, Smartphone, Globe, Zap, Eye, MousePointer, Target } from 'lucide-react';
import { AnalyticsData } from '../hooks/useAnalytics';

interface AnalyticsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  analytics: AnalyticsData;
}

// MetricCard Component
interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  className?: string;
}

function MetricCard({ title, value, icon, change, changeType = 'neutral', className = '' }: MetricCardProps) {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return '#4ade80';
      case 'negative':
        return '#ef4444';
      default:
        return '#9ca3af';
    }
  };

  return (
    <div style={{
      border: '4px solid #00FFFF',
      backgroundColor: '#000000',
      padding: '24px',
      boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)',
      transition: 'all 0.3s'
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ border: '2px solid #00FFFF', padding: '8px', boxShadow: '0 0 10px #00FFFF' }}>
          {icon}
        </div>
        {change && (
          <div style={{ fontSize: '14px', fontWeight: '900', letterSpacing: '0.1em', color: getChangeColor() }}>
            {change}
          </div>
        )}
      </div>
      
      <div>
        <div style={{ fontSize: '48px', fontWeight: '900', color: '#00FFFF', marginBottom: '8px', letterSpacing: '0.1em' }}>
          {value}
        </div>
        <div style={{ fontSize: '14px', color: '#999999', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '900' }}>
          {title}
        </div>
      </div>
    </div>
  );
}

// Navigation Component
interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const tabs = [
    { id: 'OVERVIEW', label: 'OVERVIEW', icon: Eye },
    { id: 'TRAFFIC', label: 'TRAFFIC', icon: Globe },
    { id: 'PERFORMANCE', label: 'PERFORMANCE', icon: Zap },
    { id: 'CONVERSIONS', label: 'CONVERSIONS', icon: Target },
  ];

  return (
    <div style={{ borderBottom: '4px solid #333333', backgroundColor: '#000000' }}>
      <div style={{ display: 'flex' }}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 32px',
                borderRight: '4px solid #333333',
                transition: 'all 0.2s',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: '900',
                backgroundColor: '#000000',
                color: isActive ? '#00FFFF' : '#6b7280',
                borderBottom: isActive ? '4px solid #00FFFF' : 'none',
                boxShadow: isActive ? '0 0 20px rgba(0, 255, 255, 0.4)' : 'none',
                cursor: 'pointer',
                outline: 'none'
              }}
              onMouseOver={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#00FFFF';
                  e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 255, 255, 0.2)';
                }
              }}
              onMouseOut={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#6b7280';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              <Icon style={{ height: '20px', width: '20px' }} />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function AnalyticsPanel({ isOpen, onClose, analytics }: AnalyticsPanelProps) {
  const [activeTab, setActiveTab] = useState('OVERVIEW');

  if (!isOpen) {
    return null;
  }

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    if (minutes > 0) {
      return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
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
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        zIndex: 9999,
        overflow: 'auto'
      }}
    >
      <div 
        style={{
          minHeight: '100vh',
          width: '100%',
          border: '4px solid #00FFFF',
          boxShadow: '0 0 50px rgba(0, 255, 255, 0.6)',
          backgroundColor: '#000000'
        }}
      >
        {/* Header */}
        <div style={{ borderBottom: '4px solid #00FFFF', backgroundColor: '#000000', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Logo and Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ border: '4px solid #00FFFF', padding: '8px', boxShadow: '0 0 20px #00FFFF' }}>
                <BarChart3 style={{ height: '32px', width: '32px', color: '#00FFFF' }} />
              </div>
              <h1 style={{ 
                fontSize: '24px', 
                letterSpacing: '0.1em', 
                textTransform: 'uppercase', 
                color: '#00FFFF', 
                fontWeight: '900',
                margin: 0
              }}>
                WEBSITE ANALYTICS
              </h1>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button 
                onClick={exportAnalytics}
                style={{
                  border: '4px solid #00FFFF',
                  padding: '8px 24px',
                  backgroundColor: '#000000',
                  color: '#00FFFF',
                  transition: 'all 0.2s',
                  boxShadow: '0 0 15px #00FFFF',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: '900',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#00FFFF';
                  e.currentTarget.style.color = '#000000';
                  e.currentTarget.style.boxShadow = '0 0 25px #00FFFF';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#000000';
                  e.currentTarget.style.color = '#00FFFF';
                  e.currentTarget.style.boxShadow = '0 0 15px #00FFFF';
                }}
              >
                <Download style={{ display: 'inline', height: '16px', width: '16px', marginRight: '8px' }} />
                EXPORT
              </button>
              <button 
                onClick={resetAnalytics}
                style={{
                  border: '4px solid #FF0033',
                  padding: '8px 24px',
                  backgroundColor: '#000000',
                  color: '#FF0033',
                  transition: 'all 0.2s',
                  boxShadow: '0 0 15px #FF0033',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: '900',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#FF0033';
                  e.currentTarget.style.color = '#000000';
                  e.currentTarget.style.boxShadow = '0 0 25px #FF0033';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#000000';
                  e.currentTarget.style.color = '#FF0033';
                  e.currentTarget.style.boxShadow = '0 0 15px #FF0033';
                }}
              >
                <RefreshCw style={{ display: 'inline', height: '16px', width: '16px', marginRight: '8px' }} />
                RESET
              </button>
              <button 
                onClick={onClose}
                style={{
                  border: '4px solid #FF0033',
                  padding: '16px',
                  backgroundColor: '#000000',
                  color: '#FF0033',
                  transition: 'all 0.2s',
                  boxShadow: '0 0 15px #FF0033',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#FF0033';
                  e.currentTarget.style.color = '#000000';
                  e.currentTarget.style.boxShadow = '0 0 25px #FF0033';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#000000';
                  e.currentTarget.style.color = '#FF0033';
                  e.currentTarget.style.boxShadow = '0 0 15px #FF0033';
                }}
              >
                <X style={{ height: '16px', width: '16px' }} />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content */}
        <div style={{ padding: '32px' }}>
          {activeTab === 'OVERVIEW' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {/* Main Metrics Grid */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '24px' 
              }}>
                <MetricCard
                  title="Total Page Views"
                  value={formatNumber(analytics.totalPageViews)}
                  icon={<Eye style={{ height: '24px', width: '24px', color: '#00FFFF' }} />}
                  change="+8.3%"
                  changeType="positive"
                />
                <MetricCard
                  title="Total Sessions"
                  value={formatNumber(analytics.sessions)}
                  icon={<Users style={{ height: '24px', width: '24px', color: '#00FFFF' }} />}
                  change="+12.5%"
                  changeType="positive"
                />
                <MetricCard
                  title="Total Submissions"
                  value={formatNumber(analytics.totalSubmissions)}
                  icon={<DollarSign style={{ height: '24px', width: '24px', color: '#00FFFF' }} />}
                  change="+15.7%"
                  changeType="positive"
                />
                <MetricCard
                  title="Conversion Rate"
                  value={formatPercentage(analytics.conversionRate)}
                  icon={<TrendingUp style={{ height: '24px', width: '24px', color: '#00FFFF' }} />}
                  change="+0.5%"
                  changeType="positive"
                />
              </div>

              {/* Secondary Metrics */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '24px' 
              }}>
                <MetricCard
                  title="Avg. Session Duration"
                  value={formatTime(analytics.averageTimeOnSite)}
                  icon={<Clock style={{ height: '24px', width: '24px', color: '#00FFFF' }} />}
                  change="+0:18"
                  changeType="positive"
                />
                <MetricCard
                  title="Bounce Rate"
                  value={formatPercentage(analytics.bounceRate)}
                  icon={<MousePointer style={{ height: '24px', width: '24px', color: '#00FFFF' }} />}
                  change="-2.1%"
                  changeType="positive"
                />
                <MetricCard
                  title="Desktop Users"
                  value={formatPercentage((analytics.deviceTypes.desktop / (analytics.deviceTypes.desktop + analytics.deviceTypes.mobile + analytics.deviceTypes.tablet)) * 100)}
                  icon={<Monitor style={{ height: '24px', width: '24px', color: '#00FFFF' }} />}
                  change="-1.3%"
                  changeType="negative"
                />
                <MetricCard
                  title="Mobile Users"
                  value={formatPercentage((analytics.deviceTypes.mobile / (analytics.deviceTypes.desktop + analytics.deviceTypes.mobile + analytics.deviceTypes.tablet)) * 100)}
                  icon={<Smartphone style={{ height: '24px', width: '24px', color: '#00FFFF' }} />}
                  change="+1.3%"
                  changeType="positive"
                />
              </div>

              {/* System Status */}
              <div style={{ border: '4px solid #00FFFF', backgroundColor: '#000000', padding: '24px', boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#00FFFF', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  SYSTEM STATUS
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '16px', height: '16px', backgroundColor: '#4ade80', boxShadow: '0 0 10px #00FF00', animation: 'pulse 2s infinite' }}></div>
                    <span style={{ color: '#d1d5db', fontWeight: '900', letterSpacing: '0.1em' }}>ANALYTICS: ACTIVE</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '16px', height: '16px', backgroundColor: '#4ade80', boxShadow: '0 0 10px #00FF00', animation: 'pulse 2s infinite' }}></div>
                    <span style={{ color: '#d1d5db', fontWeight: '900', letterSpacing: '0.1em' }}>TRACKING: ENABLED</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '16px', height: '16px', backgroundColor: '#fbbf24', boxShadow: '0 0 10px #FFFF00', animation: 'pulse 2s infinite' }}></div>
                    <span style={{ color: '#d1d5db', fontWeight: '900', letterSpacing: '0.1em' }}>DATA: COLLECTING</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'TRAFFIC' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {/* Traffic Sources */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
                <MetricCard
                  title="Direct Traffic"
                  value={formatNumber(analytics.directTraffic)}
                  icon={<Globe style={{ height: '24px', width: '24px', color: '#00FFFF' }} />}
                  change="+5.2%"
                  changeType="positive"
                />
                <MetricCard
                  title="Search Traffic"
                  value={formatNumber(analytics.searchTraffic)}
                  icon={<Globe style={{ height: '24px', width: '24px', color: '#00FFFF' }} />}
                  change="+12.8%"
                  changeType="positive"
                />
                <MetricCard
                  title="Social Traffic"
                  value={formatNumber(analytics.socialTraffic)}
                  icon={<Globe style={{ height: '24px', width: '24px', color: '#00FFFF' }} />}
                  change="+3.1%"
                  changeType="positive"
                />
              </div>

              {/* Device & Browser Info */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
                <div style={{ border: '4px solid #00FFFF', backgroundColor: '#000000', padding: '24px', boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '16px', color: '#00FFFF', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    DEVICE TYPES
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {Object.entries(analytics.deviceTypes).map(([device, count]) => (
                      <div key={device} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ textTransform: 'capitalize', color: '#00FFFF', fontWeight: '900', letterSpacing: '0.1em' }}>
                          {device}
                        </span>
                        <span style={{ fontWeight: '900', color: '#00FFFF' }}>
                          {formatNumber(count)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ border: '4px solid #00FFFF', backgroundColor: '#000000', padding: '24px', boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '16px', color: '#00FFFF', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    TOP BROWSERS
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {Object.entries(analytics.browsers)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 5)
                      .map(([browser, count]) => (
                        <div key={browser} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ color: '#00FFFF', fontWeight: '900', letterSpacing: '0.1em' }}>
                            {browser}
                          </span>
                          <span style={{ fontWeight: '900', color: '#00FFFF' }}>
                            {formatNumber(count)}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'PERFORMANCE' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {/* Performance Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
                <MetricCard
                  title="Average Load Time"
                  value={`${analytics.averageLoadTime.toFixed(2)}ms`}
                  icon={<Zap style={{ height: '24px', width: '24px', color: '#00FFFF' }} />}
                  change="-15ms"
                  changeType="positive"
                />
                <MetricCard
                  title="Samples Collected"
                  value={analytics.pageLoadTimes.length}
                  icon={<Zap style={{ height: '24px', width: '24px', color: '#00FFFF' }} />}
                  change="+3"
                  changeType="positive"
                />
              </div>

              {/* Recent Load Times */}
              <div style={{ border: '4px solid #00FFFF', backgroundColor: '#000000', padding: '24px', boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '16px', color: '#00FFFF', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  RECENT LOAD TIMES
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {analytics.pageLoadTimes.slice(-5).map((time, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ color: '#00FFFF', fontWeight: '900', letterSpacing: '0.1em' }}>Load {index + 1}</span>
                      <span style={{ fontWeight: '900', color: '#00FFFF' }}>
                        {time.toFixed(2)}ms
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'CONVERSIONS' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {/* Conversion Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
                <MetricCard
                  title="This Month"
                  value={formatNumber(analytics.submissionsThisMonth)}
                  icon={<Target style={{ height: '24px', width: '24px', color: '#00FFFF' }} />}
                  change="+8"
                  changeType="positive"
                />
                <MetricCard
                  title="This Week"
                  value={formatNumber(analytics.submissionsThisWeek)}
                  icon={<Target style={{ height: '24px', width: '24px', color: '#00FFFF' }} />}
                  change="+2"
                  changeType="positive"
                />
                <MetricCard
                  title="Conversion Rate"
                  value={formatPercentage(analytics.conversionRate)}
                  icon={<TrendingUp style={{ height: '24px', width: '24px', color: '#00FFFF' }} />}
                  change="+0.5%"
                  changeType="positive"
                />
              </div>

              {/* Conversion Insights */}
              <div style={{ border: '4px solid #00FFFF', backgroundColor: '#000000', padding: '24px', boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '16px', color: '#00FFFF', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  CONVERSION INSIGHTS
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: '#00FFFF', fontWeight: '900', letterSpacing: '0.1em' }}>Total Submissions</span>
                    <span style={{ fontWeight: '900', color: '#00FFFF' }}>
                      {formatNumber(analytics.totalSubmissions)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: '#00FFFF', fontWeight: '900', letterSpacing: '0.1em' }}>Last Submission</span>
                    <span style={{ fontWeight: '900', color: '#00FFFF' }}>
                      {analytics.lastSubmissionDate ? 
                        new Date(analytics.lastSubmissionDate).toLocaleString('en-US') : 
                        'None'
                      }
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: '#00FFFF', fontWeight: '900', letterSpacing: '0.1em' }}>Views to Submission Ratio</span>
                    <span style={{ fontWeight: '900', color: '#00FFFF' }}>
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
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '32px',
            height: '32px',
            backgroundColor: '#FF0033'
          }}
        ></div>
      </div>
    </div>
  );
}
