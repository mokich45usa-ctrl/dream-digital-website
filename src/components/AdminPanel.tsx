import { useState, useEffect } from 'react';
import { X, Download, RefreshCw, BarChart3, Users, Clock, DollarSign } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  pricingType: string;
  date: string;
  status: 'new' | 'contacted' | 'converted' | 'lost';
}

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    thisMonth: 0,
    thisWeek: 0,
    conversion: 0
  });

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = () => {
    const savedLeads = localStorage.getItem('dream_digital_leads');
    if (savedLeads) {
      const parsedLeads = JSON.parse(savedLeads);
      setLeads(parsedLeads);
      calculateStats(parsedLeads);
    }
  };

  const calculateStats = (leadsData: Lead[]) => {
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    const thisWeek = getWeekNumber(now);

    const thisMonthLeads = leadsData.filter(lead => {
      const leadDate = new Date(lead.date);
      return leadDate.getMonth() === thisMonth && leadDate.getFullYear() === thisYear;
    });

    const thisWeekLeads = leadsData.filter(lead => {
      const leadDate = new Date(lead.date);
      return getWeekNumber(leadDate) === thisWeek && leadDate.getFullYear() === thisYear;
    });

    const convertedLeads = leadsData.filter(lead => lead.status === 'converted').length;
    const conversionRate = leadsData.length > 0 ? (convertedLeads / leadsData.length) * 100 : 0;

    setStats({
      total: leadsData.length,
      thisMonth: thisMonthLeads.length,
      thisWeek: thisWeekLeads.length,
      conversion: conversionRate
    });
  };

  const getWeekNumber = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const updateLeadStatus = (leadId: string, newStatus: Lead['status']) => {
    const updatedLeads = leads.map(lead => 
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    );
    setLeads(updatedLeads);
    localStorage.setItem('dream_digital_leads', JSON.stringify(updatedLeads));
    calculateStats(updatedLeads);
  };

  const exportLeads = () => {
    const csvContent = [
      ['ID', 'Name/Company', 'Phone/WhatsApp', 'Email', 'Pricing Type', 'Date', 'Status'],
      ...leads.map(lead => [
        lead.id,
        lead.name,
        lead.phone,
        lead.email || 'Not provided',
        lead.pricingType || 'Not selected',
        new Date(lead.date).toLocaleDateString('en-US'),
        lead.status
      ])
    ];

    const csv = csvContent.map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dream-digital-leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

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
              <div>
                <h1 className="text-2xl tracking-wider uppercase text-cyan-400 font-black">
                  LEAD MANAGEMENT PANEL
                </h1>
                <p className="text-sm text-cyan-400">
                  Overview of all submitted project requests
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <button 
                onClick={exportLeads}
                className="border-4 border-cyan-400 px-6 py-2 bg-black text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-200 shadow-[0_0_15px_#00FFFF] hover:shadow-[0_0_25px_#00FFFF] uppercase tracking-wider font-black"
              >
                <Download className="inline h-4 w-4 mr-2" />
                EXPORT
              </button>
              <button 
                onClick={loadLeads}
                className="border-4 border-cyan-400 px-6 py-2 bg-black text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-200 shadow-[0_0_15px_#00FFFF] hover:shadow-[0_0_25px_#00FFFF] uppercase tracking-wider font-black"
              >
                <RefreshCw className="inline h-4 w-4 mr-2" />
                REFRESH
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

        {/* Statistics */}
        <div className="border-b-4 border-gray-800 bg-black p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border-4 border-cyan-400 bg-black p-6 shadow-[0_0_20px_#00FFFF40] hover:shadow-[0_0_30px_#00FFFF60] transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="border-2 border-cyan-400 p-2 shadow-[0_0_10px_#00FFFF]">
                  <Users className="h-6 w-6 text-cyan-400" />
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-cyan-400 mb-2 tracking-wider">
                  {stats.total}
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider font-black">
                  TOTAL LEADS
                </div>
              </div>
            </div>

            <div className="border-4 border-cyan-400 bg-black p-6 shadow-[0_0_20px_#00FFFF40] hover:shadow-[0_0_30px_#00FFFF60] transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="border-2 border-cyan-400 p-2 shadow-[0_0_10px_#00FFFF]">
                  <Clock className="h-6 w-6 text-cyan-400" />
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-cyan-400 mb-2 tracking-wider">
                  {stats.thisMonth}
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider font-black">
                  THIS MONTH
                </div>
              </div>
            </div>

            <div className="border-4 border-cyan-400 bg-black p-6 shadow-[0_0_20px_#00FFFF40] hover:shadow-[0_0_30px_#00FFFF60] transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="border-2 border-cyan-400 p-2 shadow-[0_0_10px_#00FFFF]">
                  <Clock className="h-6 w-6 text-cyan-400" />
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-cyan-400 mb-2 tracking-wider">
                  {stats.thisWeek}
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider font-black">
                  THIS WEEK
                </div>
              </div>
            </div>

            <div className="border-4 border-cyan-400 bg-black p-6 shadow-[0_0_20px_#00FFFF40] hover:shadow-[0_0_30px_#00FFFF60] transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="border-2 border-cyan-400 p-2 shadow-[0_0_10px_#00FFFF]">
                  <DollarSign className="h-6 w-6 text-cyan-400" />
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-cyan-400 mb-2 tracking-wider">
                  {stats.conversion.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider font-black">
                  CONVERSION
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="p-6">
          <div className="border-4 border-cyan-400 bg-black shadow-[0_0_20px_#00FFFF40]">
            <div className="border-b-4 border-gray-800 p-4">
              <h2 className="text-xl font-black text-cyan-400 uppercase tracking-wider">
                LEADS TABLE
              </h2>
            </div>
            
            <div className="max-h-[calc(100vh-400px)] overflow-y-auto">
              <table className="w-full">
                <thead className="border-b-4 border-gray-800">
                  <tr>
                    <th className="p-4 text-left text-cyan-400 font-black tracking-wider uppercase">ID</th>
                    <th className="p-4 text-left text-cyan-400 font-black tracking-wider uppercase">Name/Company</th>
                    <th className="p-4 text-left text-cyan-400 font-black tracking-wider uppercase">Contacts</th>
                    <th className="p-4 text-left text-cyan-400 font-black tracking-wider uppercase">Pricing</th>
                    <th className="p-4 text-left text-cyan-400 font-black tracking-wider uppercase">Date</th>
                    <th className="p-4 text-left text-cyan-400 font-black tracking-wider uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-b-2 border-gray-800 hover:bg-gray-900 transition-colors">
                      <td className="p-4 text-cyan-400 font-black tracking-wider">
                        {lead.id.slice(-6)}
                      </td>
                      <td className="p-4 text-cyan-400 font-black tracking-wider">
                        {lead.name}
                      </td>
                      <td className="p-4 text-cyan-400">
                        <div className="space-y-1">
                          <div className="font-black tracking-wider">{lead.phone}</div>
                          {lead.email && (
                            <div className="text-sm text-gray-400">{lead.email}</div>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-cyan-400 font-black tracking-wider">
                        {lead.pricingType || 'Not selected'}
                      </td>
                      <td className="p-4 text-cyan-400 font-black tracking-wider">
                        {new Date(lead.date).toLocaleDateString('en-US')}
                      </td>
                      <td className="p-4">
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as Lead['status'])}
                          className="bg-black border-2 border-cyan-400 text-cyan-400 px-3 py-1 font-black tracking-wider uppercase focus:outline-none focus:shadow-[0_0_10px_#00FFFF]"
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
              
              {leads.length === 0 && (
                <div className="p-8 text-center">
                  <div className="text-cyan-400 font-black tracking-wider uppercase">
                    No leads found
                  </div>
                  <div className="text-gray-400 text-sm mt-2">
                    Submit a form to see leads here
                  </div>
                </div>
              )}
            </div>
          </div>
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
