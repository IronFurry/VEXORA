import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Scissors,
  UserCheck,
  Package,
  Star,
  Ticket,
  BarChart3,
  Settings,
  Bell,
  Search,
  TrendingUp,
  Clock
} from 'lucide-react';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Overview', active: true },
  { icon: Clock, label: 'Live Queue', badge: '4' },
  { icon: Users, label: 'Customers' },
  { icon: Scissors, label: 'Services' },
  { icon: UserCheck, label: 'Staff' },
  { icon: Package, label: 'Inventory' },
  { icon: Star, label: 'Reviews' },
  { icon: Ticket, label: 'Coupons' },
  { icon: BarChart3, label: 'Analytics' },
  { icon: Settings, label: 'Settings' },
];

export const SalonDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <section id="salons" className="section-spacing">
      <div className="container-wide">
        {/* Editorial Header */}
        <div style={{ maxWidth: '820px', marginBottom: '64px' }} className="container">
          <span className="eyebrow">FOR SALONS</span>
          <h2 className="section-headline">
            Run the salon.<br />
            Not the waiting room.
          </h2>
          <p className="section-description">
            VEXORA gives salon owners and managers one place to manage bookings, staff, queues, customers, services, inventory and performance.
          </p>
        </div>

        {/* High-Fidelity Monochrome SaaS Dashboard Shell */}
        <div style={{
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-white)',
          boxShadow: 'var(--shadow-dashboard)',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          minHeight: '720px'
        }}
        className="saas-dashboard-shell"
        >
          {/* Sidebar */}
          <aside style={{
            borderRight: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-subtle)',
            padding: '24px 16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              {/* Salon Brand in Sidebar */}
              <div style={{
                padding: '0 12px 24px 12px',
                borderBottom: '1px solid var(--border-subtle)',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    background: 'var(--bg-black)',
                    color: 'var(--text-white)',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.85rem',
                    fontWeight: 700
                  }}>
                    V
                  </div>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      Looks & Co.
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      TERMINAL #01
                    </div>
                  </div>
                </div>
                <span className="badge-mono badge-live" style={{ padding: '2px 6px', fontSize: '0.62rem' }}>
                  ONLINE
                </span>
              </div>

              {/* Navigation Items */}
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  const isCurrent = activeTab === item.label;

                  return (
                    <button
                      key={item.label}
                      onClick={() => setActiveTab(item.label)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.86rem',
                        fontWeight: isCurrent ? 600 : 400,
                        color: isCurrent ? 'var(--text-primary)' : 'var(--text-secondary)',
                        backgroundColor: isCurrent ? 'var(--bg-white)' : 'transparent',
                        border: isCurrent ? '1px solid var(--border-subtle)' : '1px solid transparent',
                        boxShadow: isCurrent ? 'var(--shadow-sm)' : 'none',
                        transition: 'all 0.15s ease',
                        textAlign: 'left',
                        width: '100%',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Icon size={16} strokeWidth={isCurrent ? 2 : 1.5} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.65rem',
                          padding: '1px 6px',
                          background: 'var(--bg-black)',
                          color: 'var(--text-white)',
                          borderRadius: '10px'
                        }}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Sidebar Bottom Profile */}
            <div style={{
              padding: '14px 12px',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Vikram Malhotra
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Lead Manager
                </div>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                v2.4
              </span>
            </div>
          </aside>

          {/* Main Content Area */}
          <main style={{ padding: '32px 36px', overflowY: 'auto' }}>
            {/* Topbar: Greeting + Search + System Action */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '36px',
              paddingBottom: '24px',
              borderBottom: '1px solid var(--border-subtle)'
            }}>
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.6rem',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  color: 'var(--text-primary)',
                  marginBottom: '4px'
                }}>
                  Good morning, VEXORA
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  OPERATIONAL LOG · TUESDAY, 08:30 AM · ALL 4 STATIONS ACTIVE
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.82rem',
                  color: 'var(--text-muted)'
                }}>
                  <Search size={14} strokeWidth={1.5} />
                  <span>Search tickets, staff, SKU...</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', border: '1px solid var(--border-medium)', padding: '1px 5px', borderRadius: '3px' }}>
                    ⌘K
                  </span>
                </div>

                <button style={{
                  padding: '8px',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-primary)',
                  cursor: 'pointer'
                }}>
                  <Bell size={16} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Metrics Strip */}
            <div style={{ marginBottom: '36px' }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                letterSpacing: '0.12em',
                color: 'var(--text-muted)',
                marginBottom: '14px',
                textTransform: 'uppercase'
              }}>
                TODAY'S OVERVIEW
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '16px'
              }}
              className="dashboard-metrics-grid"
              >
                {/* Metric 1: Customers */}
                <div style={{
                  padding: '20px',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-surface)'
                }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Served Today</span>
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.9rem',
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    color: 'var(--text-primary)',
                    margin: '6px 0'
                  }}>
                    128 Customers
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <TrendingUp size={12} strokeWidth={1.5} />
                    <span>+18% vs yesterday</span>
                  </div>
                </div>

                {/* Metric 2: Avg Wait */}
                <div style={{
                  padding: '20px',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-surface)'
                }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Queue Latency</span>
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.9rem',
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    color: 'var(--text-primary)',
                    margin: '6px 0'
                  }}>
                    14 min Avg. Wait
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Target: &lt; 20 min
                  </div>
                </div>

                {/* Metric 3: Revenue */}
                <div style={{
                  padding: '20px',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-surface)'
                }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Gross Intake</span>
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.9rem',
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    color: 'var(--text-primary)',
                    margin: '6px 0'
                  }}>
                    ₹12,400 Revenue
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    UPI / Card / Cash Synced
                  </div>
                </div>

                {/* Metric 4: Capacity */}
                <div style={{
                  padding: '20px',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-surface)'
                }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Station Utilization</span>
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.9rem',
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    color: 'var(--text-primary)',
                    margin: '6px 0'
                  }}>
                    86% Capacity
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Optimal load balance
                  </div>
                </div>
              </div>
            </div>

            {/* Live Queue Table inside SaaS Dashboard */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px'
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  letterSpacing: '0.12em',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase'
                }}>
                  STATION ALLOCATION & LIVE QUEUE DISPATCH
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn-secondary btn-sm" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>
                    Export CSV
                  </button>
                  <button className="btn-primary btn-sm" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>
                    + Walk-in Client
                  </button>
                </div>
              </div>

              <div style={{
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.84rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)' }}>
                      <th style={{ padding: '12px 18px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>CHAIR</th>
                      <th style={{ padding: '12px 18px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>STYLIST</th>
                      <th style={{ padding: '12px 18px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>CUSTOMER</th>
                      <th style={{ padding: '12px 18px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>SERVICE</th>
                      <th style={{ padding: '12px 18px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>TIME LEFT</th>
                      <th style={{ padding: '12px 18px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'right' }}>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '14px 18px', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>01</td>
                      <td style={{ padding: '14px 18px', fontWeight: 500 }}>Vikram M.</td>
                      <td style={{ padding: '14px 18px' }}>Rahul S. (#104)</td>
                      <td style={{ padding: '14px 18px', color: 'var(--text-secondary)' }}>Precision Scissor Cut</td>
                      <td style={{ padding: '14px 18px', fontFamily: 'var(--font-mono)' }}>09 min</td>
                      <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                        <span className="badge-mono badge-black" style={{ fontSize: '0.7rem' }}>Complete</span>
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '14px 18px', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>02</td>
                      <td style={{ padding: '14px 18px', fontWeight: 500 }}>Sameer K.</td>
                      <td style={{ padding: '14px 18px' }}>Akash P. (#105)</td>
                      <td style={{ padding: '14px 18px', color: 'var(--text-secondary)' }}>Beard Sculpting</td>
                      <td style={{ padding: '14px 18px', fontFamily: 'var(--font-mono)' }}>04 min</td>
                      <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                        <span className="badge-mono badge-black" style={{ fontSize: '0.7rem' }}>Complete</span>
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '14px 18px', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>03</td>
                      <td style={{ padding: '14px 18px', fontWeight: 500 }}>Anita D.</td>
                      <td style={{ padding: '14px 18px' }}>Priya K. (#106)</td>
                      <td style={{ padding: '14px 18px', color: 'var(--text-secondary)' }}>Charcoal Detox Facial</td>
                      <td style={{ padding: '14px 18px', fontFamily: 'var(--font-mono)' }}>22 min</td>
                      <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                        <span className="badge-mono badge-black" style={{ fontSize: '0.7rem' }}>Complete</span>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '14px 18px', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>04</td>
                      <td style={{ padding: '14px 18px', fontWeight: 500 }}>Rohan V.</td>
                      <td style={{ padding: '14px 18px', color: 'var(--text-muted)' }}>Standby for #107 Neha</td>
                      <td style={{ padding: '14px 18px', color: 'var(--text-muted)' }}>Classic Layered Cut</td>
                      <td style={{ padding: '14px 18px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>Ready</td>
                      <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                        <span className="badge-mono" style={{ fontSize: '0.7rem' }}>Call Next</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>

      <style>{`
        @media (max-width: 1040px) {
          .saas-dashboard-shell {
            grid-template-columns: 1fr !important;
          }
          .dashboard-metrics-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .dashboard-metrics-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
