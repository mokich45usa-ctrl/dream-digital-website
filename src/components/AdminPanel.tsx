import { useState, useEffect } from 'react';
import { X, Download, RefreshCw, BarChart3, Users, Clock, DollarSign } from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LeadData {
  id: string;
  name: string;
  phone: string;
  email: string;
  pricingType: string;
  date: string;
  status: 'new' | 'contacted' | 'converted' | 'lost';
}

export function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [leads, setLeads] = useState<LeadData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    converted: 0,
    lost: 0,
    thisMonth: 0,
    thisWeek: 0,
    // Extended analytics
    conversionRate: 0,
    avgResponseTime: 0,
    topPricingType: '',
    revenue: 0,
    avgProjectValue: 0
  });

  // Загрузка данных из localStorage (в реальном проекте это будет API)
  useEffect(() => {
    if (isOpen) {
      loadLeads();
    }
  }, [isOpen]);

  const loadLeads = () => {
    setIsLoading(true);
    try {
      const savedLeads = localStorage.getItem('dream_digital_leads');
      const leadsData: LeadData[] = savedLeads ? JSON.parse(savedLeads) : [];
      setLeads(leadsData);
      calculateStats(leadsData);
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (leadsData: LeadData[]) => {
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    const thisWeek = getWeekNumber(now);

    const stats = {
      total: leadsData.length,
      new: leadsData.filter(lead => lead.status === 'new').length,
      contacted: leadsData.filter(lead => lead.status === 'contacted').length,
      converted: leadsData.filter(lead => lead.status === 'converted').length,
      lost: leadsData.filter(lead => lead.status === 'lost').length,
      thisMonth: leadsData.filter(lead => {
        const leadDate = new Date(lead.date);
        return leadDate.getMonth() === thisMonth && leadDate.getFullYear() === thisYear;
      }).length,
      thisWeek: leadsData.filter(lead => {
        const leadDate = new Date(lead.date);
        return getWeekNumber(leadDate) === thisWeek && leadDate.getFullYear() === thisYear;
      }).length
    };

    setStats(stats);
  };

  const getWeekNumber = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const updateLeadStatus = (leadId: string, newStatus: LeadData['status']) => {
    const updatedLeads = leads.map(lead => 
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    );
    setLeads(updatedLeads);
    localStorage.setItem('dream_digital_leads', JSON.stringify(updatedLeads));
    calculateStats(updatedLeads);
  };

  const exportLeads = () => {
    const csvContent = [
      ['ID', 'Name/Company', 'Phone', 'Email', 'Pricing', 'Date', 'Status'],
      ...leads.map(lead => [
        lead.id,
        lead.name,
        lead.phone,
        lead.email || 'Not provided',
        lead.pricingType || 'Not selected',
        lead.date,
        lead.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `dream_digital_leads_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status: LeadData['status']) => {
    switch (status) {
      case 'new': return '#00FFFF';
      case 'contacted': return '#FFA500';
      case 'converted': return '#00FF00';
      case 'lost': return '#FF0033';
      default: return '#717182';
    }
  };

  const getStatusText = (status: LeadData['status']) => {
    switch (status) {
      case 'new': return 'New';
      case 'contacted': return 'Contacted';
      case 'converted': return 'Converted';
      case 'lost': return 'Lost';
      default: return 'Unknown';
    }
  };

  if (!isOpen) return null;

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


        {/* Admin Header */}
        <div 
          className="relative p-8 border-b-4"
          style={{ 
            backgroundColor: '#F5F5F5',
            borderBottomColor: '#00FFFF'
          }}
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 
                className="text-4xl font-black tracking-wide mb-2"
                style={{ 
                  fontFamily: 'monospace',
                  color: '#000000'
                }}
              >
                DREAM DIGITAL ADMIN
              </h2>
              <p 
                className="text-sm opacity-70"
                style={{ 
                  color: '#717182',
                  fontFamily: 'monospace'
                }}
              >
                Lead Management Panel
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={loadLeads}
                disabled={isLoading}
                className="p-2 border-2 transition-all duration-300 hover:scale-105 disabled:opacity-50"
                style={{ 
                  borderColor: '#00FFFF',
                  color: '#00FFFF'
                }}
              >
                <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={exportLeads}
                className="p-2 border-2 transition-all duration-300 hover:scale-105"
                style={{ 
                  borderColor: '#FF0033',
                  color: '#FF0033'
                }}
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 border-2 transition-all duration-300 hover:scale-105"
                style={{ 
                  borderColor: '#FF0033',
                  color: '#FF0033'
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

                 {/* Statistics Grid */}
         <div className="p-8 pb-4">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Total Leads */}
            <div 
              className="p-6 border-2 text-center"
              style={{ 
                backgroundColor: 'transparent',
                borderColor: '#00FFFF',
                boxShadow: `0 0 20px #00FFFF40`
              }}
            >
              <Users className="w-8 h-8 mx-auto mb-3" style={{ color: '#00FFFF' }} />
              <div 
                className="text-3xl font-black mb-2"
                style={{ 
                  fontFamily: 'monospace',
                  color: '#F5F5F5'
                }}
              >
                {stats.total}
              </div>
              <div 
                className="text-sm"
                style={{ color: '#717182' }}
              >
                Total Leads
              </div>
            </div>

            {/* This Month */}
            <div 
              className="p-6 border-2 text-center"
              style={{ 
                backgroundColor: 'transparent',
                borderColor: '#FF0033',
                boxShadow: `0 0 20px #FF003340`
              }}
            >
              <BarChart3 className="w-8 h-8 mx-auto mb-3" style={{ color: '#FF0033' }} />
              <div 
                className="text-3xl font-black mb-2"
                style={{ 
                  fontFamily: 'monospace',
                  color: '#F5F5F5'
                }}
              >
                {stats.thisMonth}
              </div>
              <div 
                className="text-sm"
                style={{ color: '#717182' }}
              >
                This Month
              </div>
            </div>

            {/* This Week */}
            <div 
              className="p-6 border-2 text-center"
              style={{ 
                backgroundColor: 'transparent',
                borderColor: '#00FFFF',
                boxShadow: `0 0 20px #00FFFF40`
              }}
            >
              <Clock className="w-8 h-8 mx-auto mb-3" style={{ color: '#00FFFF' }} />
              <div 
                className="text-3xl font-black mb-2"
                style={{ 
                  fontFamily: 'monospace',
                  color: '#F5F5F5'
                }}
              >
                {stats.thisWeek}
              </div>
              <div 
                className="text-sm"
                style={{ color: '#717182' }}
              >
                This Week
              </div>
            </div>

            {/* Conversion Rate */}
            <div 
              className="p-6 border-2 text-center"
              style={{ 
                backgroundColor: 'transparent',
                borderColor: '#FF0033',
                boxShadow: `0 0 20px #FF003340`
              }}
            >
              <DollarSign className="w-8 h-8 mx-auto mb-3" style={{ color: '#FF0033' }} />
              <div 
                className="text-3xl font-black mb-2"
                style={{ 
                  fontFamily: 'monospace',
                  color: '#F5F5F5'
                }}
              >
                {stats.total > 0 ? Math.round((stats.converted / stats.total) * 100) : 0}%
              </div>
              <div 
                className="text-sm"
                style={{ color: '#717182' }}
              >
                Conversion
              </div>
            </div>
          </div>

          {/* Status Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { key: 'new', label: 'New', count: stats.new },
              { key: 'contacted', label: 'Contacted', count: stats.contacted },
              { key: 'converted', label: 'Converted', count: stats.converted },
              { key: 'lost', label: 'Lost', count: stats.lost }
            ].map(({ key, label, count }) => (
              <div 
                key={key}
                className="p-4 border-2 text-center"
                style={{ 
                  backgroundColor: 'transparent',
                  borderColor: getStatusColor(key as LeadData['status']),
                  boxShadow: `0 0 15px ${getStatusColor(key as LeadData['status'])}40`
                }}
              >
                <div 
                  className="text-2xl font-black mb-1"
                  style={{ 
                    fontFamily: 'monospace',
                    color: getStatusColor(key as LeadData['status'])
                  }}
                >
                  {count}
                </div>
                <div 
                  className="text-sm"
                  style={{ color: '#717182' }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Leads Table */}
          <div className="border-2" style={{ borderColor: '#00FFFF' }}>
            <div 
              className="p-4 border-b-2"
              style={{ 
                backgroundColor: '#F5F5F5',
                borderBottomColor: '#00FFFF'
              }}
            >
              <h3 
                className="text-xl font-black tracking-wide"
                style={{ 
                  fontFamily: 'monospace',
                  color: '#000000'
                }}
              >
                All Leads ({leads.length})
              </h3>
            </div>
            
                         <div className="max-h-[calc(100vh-400px)] overflow-y-auto">
              {leads.length === 0 ? (
                <div 
                  className="p-8 text-center"
                  style={{ color: '#717182' }}
                >
                  No leads yet
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr 
                      className="border-b-2"
                      style={{ borderBottomColor: '#717182' }}
                    >
                      <th 
                        className="p-3 text-left font-black tracking-wide"
                        style={{ 
                          fontFamily: 'monospace',
                          color: '#F5F5F5'
                        }}
                      >
                        Date
                      </th>
                      <th 
                        className="p-3 text-left font-black tracking-wide"
                        style={{ 
                          fontFamily: 'monospace',
                          color: '#F5F5F5'
                        }}
                      >
                        Name/Company
                      </th>
                      <th 
                        className="p-3 text-left font-black tracking-wide"
                        style={{ 
                          fontFamily: 'monospace',
                          color: '#F5F5F5'
                        }}
                      >
                        Contacts
                      </th>
                      <th 
                        className="p-3 text-left font-black tracking-wide"
                        style={{ 
                          fontFamily: 'monospace',
                          color: '#F5F5F5'
                        }}
                      >
                        Pricing
                      </th>
                      <th 
                        className="p-3 text-left font-black tracking-wide"
                        style={{ 
                          fontFamily: 'monospace',
                          color: '#F5F5F5'
                        }}
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr 
                        key={lead.id}
                        className="border-b border-gray-800 hover:bg-gray-900 transition-colors"
                      >
                        <td 
                          className="p-3 text-sm"
                          style={{ color: '#717182' }}
                        >
                          {new Date(lead.date).toLocaleDateString('en-US')}
                        </td>
                        <td 
                          className="p-3 font-black tracking-wide"
                          style={{ 
                            fontFamily: 'monospace',
                            color: '#F5F5F5'
                          }}
                        >
                          {lead.name}
                        </td>
                        <td 
                          className="p-3 text-sm"
                          style={{ color: '#F5F5F5' }}
                        >
                          <div>{lead.phone}</div>
                          {lead.email && (
                            <div style={{ color: '#717182' }}>{lead.email}</div>
                          )}
                        </td>
                        <td 
                          className="p-3 text-sm"
                          style={{ color: '#717182' }}
                        >
                          {lead.pricingType || 'Not selected'}
                        </td>
                        <td className="p-3">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadData['status'])}
                            className="bg-transparent border-2 px-2 py-1 text-sm font-black tracking-wide"
                            style={{ 
                              fontFamily: 'monospace',
                              borderColor: getStatusColor(lead.status),
                              color: getStatusColor(lead.status)
                            }}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="converted">Converted</option>
                            <option value="lost">Lost</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* Corner Accents */}
        <div 
          className="absolute top-0 left-0 w-8 h-8"
          style={{ backgroundColor: '#FF0033' }}
        ></div>
        <div 
          className="absolute top-0 right-0 w-8 h-8"
          style={{ backgroundColor: '#00FFFF' }}
        ></div>
        <div 
          className="absolute bottom-0 left-0 w-8 h-8"
          style={{ backgroundColor: '#00FFFF' }}
        ></div>
                 <div 
           className="absolute bottom-0 right-0 w-8 h-8"
           style={{ backgroundColor: '#FF0033' }}
         ></div>
       </div>
     </div>
   );
 }
