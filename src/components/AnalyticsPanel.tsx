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
        return 'text-green-400';
      case 'negative':
        return 'text-red-500';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className={`border-4 border-cyan-400 bg-black p-6 shadow-[0_0_20px_#00FFFF40] hover:shadow-[0_0_30px_#00FFFF60] transition-all duration-300 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="border-2 border-cyan-400 p-2 shadow-[0_0_10px_#00FFFF]">
          {icon}
        </div>
        {change && (
          <div className={`text-sm font-black tracking-wider ${getChangeColor()}`}>
            {change}
          </div>
        )}
      </div>
      
      <div>
        <div className="text-3xl font-black text-cyan-400 mb-2 tracking-wider">
          {value}
        </div>
        <div className="text-sm text-gray-400 uppercase tracking-wider font-black">
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
    <div className="border-b-4 border-gray-800 bg-black">
      <div className="flex">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-8 py-4 border-r-4 border-gray-800 transition-all duration-200 uppercase tracking-wider font-black ${
                isActive
                  ? 'bg-black text-cyan-400 border-b-4 border-b-cyan-400 shadow-[0_0_20px_#00FFFF40]'
                  : 'bg-black text-gray-500 hover:text-cyan-400 hover:shadow-[0_0_10px_#00FFFF20]'
              }`}
            >
              <Icon className="h-5 w-5" />
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

  console.log('🔍 AnalyticsPanel Debug - isOpen:', isOpen, 'analytics:', analytics);

  if (!isOpen) return null;

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
      className="fixed inset-0 z-50 overflow-y-auto bg-black"
    >
      <div 
        className="min-h-screen w-full border-4 border-cyan-400 shadow-[0_0_50px_#00FFFF60]"
      >
        {/* Header */}
        <div className="border-b-4 border-cyan-400 bg-black p-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center gap-4">
              <div className="border-4 border-cyan-400 p-2 shadow-[0_0_20px_#00FFFF]">
                <BarChart3 className="h-8 w-8 text-cyan-400" />
              </div>
              <h1 className="text-2xl tracking-wider uppercase text-cyan-400 font-black">
                WEBSITE ANALYTICS
              </h1>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <button 
                onClick={exportAnalytics}
                className="border-4 border-cyan-400 px-6 py-2 bg-black text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-200 shadow-[0_0_15px_#00FFFF] hover:shadow-[0_0_25px_#00FFFF] uppercase tracking-wider font-black"
              >
                <Download className="inline h-4 w-4 mr-2" />
                EXPORT
              </button>
              <button 
                onClick={resetAnalytics}
                className="border-4 border-red-500 px-6 py-2 bg-black text-red-500 hover:bg-red-500 hover:text-black transition-all duration-200 shadow-[0_0_15px_#FF0033] hover:shadow-[0_0_25px_#FF0033] uppercase tracking-wider font-black"
              >
                <RefreshCw className="inline h-4 w-4 mr-2" />
                RESET
              </button>
              <button 
                onClick={onClose}
                className="border-4 border-red-500 px-4 py-2 bg-black text-red-500 hover:bg-red-500 hover:text-black transition-all duration-200 shadow-[0_0_15px_#FF0033] hover:shadow-[0_0_25px_#FF0033]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content */}
        <div className="p-8">
          {activeTab === 'OVERVIEW' && (
            <div className="space-y-8">
              {/* Main Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <MetricCard
                  title="Total Page Views"
                  value={formatNumber(analytics.totalPageViews)}
                  icon={<Eye className="h-6 w-6 text-cyan-400" />}
                  change="+8.3%"
                  changeType="positive"
                />
                <MetricCard
                  title="Total Sessions"
                  value={formatNumber(analytics.sessions)}
                  icon={<Users className="h-6 w-6 text-cyan-400" />}
                  change="+12.5%"
                  changeType="positive"
                />
                <MetricCard
                  title="Total Submissions"
                  value={formatNumber(analytics.totalSubmissions)}
                  icon={<DollarSign className="h-6 w-6 text-cyan-400" />}
                  change="+15.7%"
                  changeType="positive"
                />
                <MetricCard
                  title="Conversion Rate"
                  value={formatPercentage(analytics.conversionRate)}
                  icon={<TrendingUp className="h-6 w-6 text-cyan-400" />}
                  change="+0.5%"
                  changeType="positive"
                />
              </div>

              {/* Secondary Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <MetricCard
                  title="Avg. Session Duration"
                  value={formatTime(analytics.averageTimeOnSite)}
                  icon={<Clock className="h-6 w-6 text-cyan-400" />}
                  change="+0:18"
                  changeType="positive"
                />
                <MetricCard
                  title="Bounce Rate"
                  value={formatPercentage(analytics.bounceRate)}
                  icon={<MousePointer className="h-6 w-6 text-cyan-400" />}
                  change="-2.1%"
                  changeType="positive"
                />
                <MetricCard
                  title="Desktop Users"
                  value={formatPercentage((analytics.deviceTypes.desktop / (analytics.deviceTypes.desktop + analytics.deviceTypes.mobile + analytics.deviceTypes.tablet)) * 100)}
                  icon={<Monitor className="h-6 w-6 text-cyan-400" />}
                  change="-1.3%"
                  changeType="negative"
                />
                <MetricCard
                  title="Mobile Users"
                  value={formatPercentage((analytics.deviceTypes.mobile / (analytics.deviceTypes.desktop + analytics.deviceTypes.mobile + analytics.deviceTypes.tablet)) * 100)}
                  icon={<Smartphone className="h-6 w-6 text-cyan-400" />}
                  change="+1.3%"
                  changeType="positive"
                />
              </div>

              {/* System Status */}
              <div className="border-4 border-cyan-400 bg-black p-6 shadow-[0_0_20px_#00FFFF40]">
                <h2 className="text-xl font-black text-cyan-400 mb-6 uppercase tracking-wider">
                  SYSTEM STATUS
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-green-400 shadow-[0_0_10px_#00FF00] animate-pulse"></div>
                    <span className="text-gray-300 font-black tracking-wider">ANALYTICS: ACTIVE</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-green-400 shadow-[0_0_10px_#00FF00] animate-pulse"></div>
                    <span className="text-gray-300 font-black tracking-wider">TRACKING: ENABLED</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-yellow-400 shadow-[0_0_10px_#FFFF00] animate-pulse"></div>
                    <span className="text-gray-300 font-black tracking-wider">DATA: COLLECTING</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'TRAFFIC' && (
            <div className="space-y-8">
              {/* Traffic Sources */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard
                  title="Direct Traffic"
                  value={formatNumber(analytics.directTraffic)}
                  icon={<Globe className="h-6 w-6 text-cyan-400" />}
                  change="+5.2%"
                  changeType="positive"
                />
                <MetricCard
                  title="Search Traffic"
                  value={formatNumber(analytics.searchTraffic)}
                  icon={<Globe className="h-6 w-6 text-cyan-400" />}
                  change="+12.8%"
                  changeType="positive"
                />
                <MetricCard
                  title="Social Traffic"
                  value={formatNumber(analytics.socialTraffic)}
                  icon={<Globe className="h-6 w-6 text-cyan-400" />}
                  change="+3.1%"
                  changeType="positive"
                />
              </div>

              {/* Device & Browser Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="border-4 border-cyan-400 bg-black p-6 shadow-[0_0_20px_#00FFFF40]">
                  <h3 className="text-lg font-black mb-4 text-cyan-400 uppercase tracking-wider">
                    DEVICE TYPES
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(analytics.deviceTypes).map(([device, count]) => (
                      <div key={device} className="flex items-center justify-between">
                        <span className="capitalize text-cyan-400 font-black tracking-wider">
                          {device}
                        </span>
                        <span className="font-black text-cyan-400">
                          {formatNumber(count)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-4 border-cyan-400 bg-black p-6 shadow-[0_0_20px_#00FFFF40]">
                  <h3 className="text-lg font-black mb-4 text-cyan-400 uppercase tracking-wider">
                    TOP BROWSERS
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(analytics.browsers)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 5)
                      .map(([browser, count]) => (
                        <div key={browser} className="flex items-center justify-between">
                          <span className="text-cyan-400 font-black tracking-wider">
                            {browser}
                          </span>
                          <span className="font-black text-cyan-400">
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
            <div className="space-y-8">
              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MetricCard
                  title="Average Load Time"
                  value={`${analytics.averageLoadTime.toFixed(2)}ms`}
                  icon={<Zap className="h-6 w-6 text-cyan-400" />}
                  change="-15ms"
                  changeType="positive"
                />
                <MetricCard
                  title="Samples Collected"
                  value={analytics.pageLoadTimes.length}
                  icon={<Zap className="h-6 w-6 text-cyan-400" />}
                  change="+3"
                  changeType="positive"
                />
              </div>

              {/* Recent Load Times */}
              <div className="border-4 border-cyan-400 bg-black p-6 shadow-[0_0_20px_#00FFFF40]">
                <h3 className="text-lg font-black mb-4 text-cyan-400 uppercase tracking-wider">
                  RECENT LOAD TIMES
                </h3>
                <div className="space-y-2">
                  {analytics.pageLoadTimes.slice(-5).map((time, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-cyan-400 font-black tracking-wider">Load {index + 1}</span>
                      <span className="font-black text-cyan-400">
                        {time.toFixed(2)}ms
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'CONVERSIONS' && (
            <div className="space-y-8">
              {/* Conversion Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard
                  title="This Month"
                  value={formatNumber(analytics.submissionsThisMonth)}
                  icon={<Target className="h-6 w-6 text-cyan-400" />}
                  change="+8"
                  changeType="positive"
                />
                <MetricCard
                  title="This Week"
                  value={formatNumber(analytics.submissionsThisWeek)}
                  icon={<Target className="h-6 w-6 text-cyan-400" />}
                  change="+2"
                  changeType="positive"
                />
                <MetricCard
                  title="Conversion Rate"
                  value={formatPercentage(analytics.conversionRate)}
                  icon={<TrendingUp className="h-6 w-6 text-cyan-400" />}
                  change="+0.5%"
                  changeType="positive"
                />
              </div>

              {/* Conversion Insights */}
              <div className="border-4 border-cyan-400 bg-black p-6 shadow-[0_0_20px_#00FFFF40]">
                <h3 className="text-lg font-black mb-4 text-cyan-400 uppercase tracking-wider">
                  CONVERSION INSIGHTS
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-400 font-black tracking-wider">Total Submissions</span>
                    <span className="font-black text-cyan-400">
                      {formatNumber(analytics.totalSubmissions)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-400 font-black tracking-wider">Last Submission</span>
                    <span className="font-black text-cyan-400">
                      {analytics.lastSubmissionDate ? 
                        new Date(analytics.lastSubmissionDate).toLocaleString('en-US') : 
                        'None'
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-400 font-black tracking-wider">Views to Submission Ratio</span>
                    <span className="font-black text-cyan-400">
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
