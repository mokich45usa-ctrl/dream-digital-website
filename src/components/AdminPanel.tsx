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

  if (!isOpen) {
    return null;
  }

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
              <div>
                <h1 style={{ 
                  fontSize: '24px', 
                  letterSpacing: '0.1em', 
                  textTransform: 'uppercase', 
                  color: '#00FFFF', 
                  fontWeight: '900',
                  margin: 0
                }}>
                  LEAD MANAGEMENT PANEL
                </h1>
                <p style={{ fontSize: '14px', color: '#00FFFF', margin: 0 }}>
                  Overview of all submitted project requests
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button 
                onClick={exportLeads}
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
                onClick={loadLeads}
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
                <RefreshCw style={{ display: 'inline', height: '16px', width: '16px', marginRight: '8px' }} />
                REFRESH
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

        {/* Statistics */}
        <div style={{ borderBottom: '4px solid #333333', backgroundColor: '#000000', padding: '24px' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '24px' 
          }}>
            <div style={{
              border: '4px solid #00FFFF',
              backgroundColor: '#000000',
              padding: '24px',
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)',
              transition: 'all 0.3s'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ border: '2px solid #00FFFF', padding: '8px', boxShadow: '0 0 10px #00FFFF' }}>
                  <Users style={{ height: '24px', width: '24px', color: '#00FFFF' }} />
                </div>
              </div>
              <div>
                <div style={{ fontSize: '48px', fontWeight: '900', color: '#00FFFF', marginBottom: '8px', letterSpacing: '0.1em' }}>
                  {stats.total}
                </div>
                <div style={{ fontSize: '14px', color: '#999999', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '900' }}>
                  TOTAL LEADS
                </div>
              </div>
            </div>

            <div style={{
              border: '4px solid #00FFFF',
              backgroundColor: '#000000',
              padding: '24px',
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)',
              transition: 'all 0.3s'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ border: '2px solid #00FFFF', padding: '8px', boxShadow: '0 0 10px #00FFFF' }}>
                  <Clock style={{ height: '24px', width: '24px', color: '#00FFFF' }} />
                </div>
              </div>
              <div>
                <div style={{ fontSize: '48px', fontWeight: '900', color: '#00FFFF', marginBottom: '8px', letterSpacing: '0.1em' }}>
                  {stats.thisMonth}
                </div>
                <div style={{ fontSize: '14px', color: '#999999', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '900' }}>
                  THIS MONTH
                </div>
              </div>
            </div>

            <div style={{
              border: '4px solid #00FFFF',
              backgroundColor: '#000000',
              padding: '24px',
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)',
              transition: 'all 0.3s'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ border: '2px solid #00FFFF', padding: '8px', boxShadow: '0 0 10px #00FFFF' }}>
                  <Clock style={{ height: '24px', width: '24px', color: '#00FFFF' }} />
                </div>
              </div>
              <div>
                <div style={{ fontSize: '48px', fontWeight: '900', color: '#00FFFF', marginBottom: '8px', letterSpacing: '0.1em' }}>
                  {stats.thisWeek}
                </div>
                <div style={{ fontSize: '14px', color: '#999999', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '900' }}>
                  THIS WEEK
                </div>
              </div>
            </div>

            <div style={{
              border: '4px solid #00FFFF',
              backgroundColor: '#000000',
              padding: '24px',
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)',
              transition: 'all 0.3s'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ border: '2px solid #00FFFF', padding: '8px', boxShadow: '0 0 10px #00FFFF' }}>
                  <DollarSign style={{ height: '24px', width: '24px', color: '#00FFFF' }} />
                </div>
              </div>
              <div>
                <div style={{ fontSize: '48px', fontWeight: '900', color: '#00FFFF', marginBottom: '8px', letterSpacing: '0.1em' }}>
                  {stats.conversion.toFixed(1)}%
                </div>
                <div style={{ fontSize: '14px', color: '#999999', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '900' }}>
                  CONVERSION
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div style={{ padding: '24px' }}>
          <div style={{ border: '4px solid #00FFFF', backgroundColor: '#000000', boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)' }}>
            <div style={{ borderBottom: '4px solid #333333', padding: '16px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#00FFFF', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
                LEADS TABLE
              </h2>
            </div>
            
            <div style={{ maxHeight: 'calc(100vh - 400px)', overflow: 'auto' }}>
              <table style={{ width: '100%' }}>
                <thead style={{ borderBottom: '4px solid #333333' }}>
                  <tr>
                    <th style={{ padding: '16px', textAlign: 'left', color: '#00FFFF', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }}>ID</th>
                    <th style={{ padding: '16px', textAlign: 'left', color: '#00FFFF', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Name/Company</th>
                    <th style={{ padding: '16px', textAlign: 'left', color: '#00FFFF', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Contacts</th>
                    <th style={{ padding: '16px', textAlign: 'left', color: '#00FFFF', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Pricing</th>
                    <th style={{ padding: '16px', textAlign: 'left', color: '#00FFFF', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Date</th>
                    <th style={{ padding: '16px', textAlign: 'left', color: '#00FFFF', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} style={{ borderBottom: '2px solid #333333' }}>
                      <td style={{ padding: '16px', color: '#00FFFF', fontWeight: '900', letterSpacing: '0.1em' }}>
                        {lead.id.slice(-6)}
                      </td>
                      <td style={{ padding: '16px', color: '#00FFFF', fontWeight: '900', letterSpacing: '0.1em' }}>
                        {lead.name}
                      </td>
                      <td style={{ padding: '16px', color: '#00FFFF' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <div style={{ fontWeight: '900', letterSpacing: '0.1em' }}>{lead.phone}</div>
                          {lead.email && (
                            <div style={{ fontSize: '14px', color: '#999999' }}>{lead.email}</div>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: '16px', color: '#00FFFF', fontWeight: '900', letterSpacing: '0.1em' }}>
                        {lead.pricingType || 'Not selected'}
                      </td>
                      <td style={{ padding: '16px', color: '#00FFFF', fontWeight: '900', letterSpacing: '0.1em' }}>
                        {new Date(lead.date).toLocaleDateString('en-US')}
                      </td>
                      <td style={{ padding: '16px' }}>
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as Lead['status'])}
                          style={{
                            backgroundColor: '#000000',
                            border: '2px solid #00FFFF',
                            color: '#00FFFF',
                            padding: '4px 12px',
                            fontWeight: '900',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            outline: 'none'
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
              
              {leads.length === 0 && (
                <div style={{ padding: '32px', textAlign: 'center' }}>
                  <div style={{ color: '#00FFFF', fontWeight: '900', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    No leads found
                  </div>
                  <div style={{ color: '#999999', fontSize: '14px', marginTop: '8px' }}>
                    Submit a form to see leads here
                  </div>
                </div>
              )}
            </div>
          </div>
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
