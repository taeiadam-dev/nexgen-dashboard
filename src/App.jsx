import { useState } from 'react'
import './App.css'
import ShipmentList from './components/ShipmentList'
import ShipmentMap from './components/ShipmentMap'

function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Revenue', value: '$124,500', trend: '+14%' },
    { label: 'Active Users', value: '8,234', trend: '+5.2%' },
    { label: 'New Signups', value: '456', trend: '-2.1%' },
    { label: 'Conversion Rate', value: '3.8%', trend: '+0.4%' }
  ];

  return (
    <>
      <div className="glow-orb glow-orb-1"></div>
      <div className="glow-orb glow-orb-2"></div>
      
      <div className="app-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <h2 className="text-gradient">NexGen</h2>
          <p className="text-secondary" style={{ marginBottom: '2rem', fontSize: '0.875rem' }}>Dashboard Pro</p>
          
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {['overview', 'analytics', 'campaigns', 'settings'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-glass'}`}
                style={{ justifyContent: 'flex-start', textTransform: 'capitalize' }}
              >
                {tab}
              </button>
            ))}
          </nav>

          <div style={{ marginTop: 'auto' }}>
            <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
              <h4 style={{ fontSize: '0.9rem' }}>Pro Plan</h4>
              <p className="text-secondary" style={{ fontSize: '0.75rem', marginBottom: '1rem' }}>4 days remaining</p>
              <button className="btn btn-primary" style={{ width: '100%', padding: '0.5rem' }}>Upgrade</button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content animate-fade-in">
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <div>
              <h1 style={{ fontSize: '2rem' }}>Welcome back, Alex</h1>
              <p className="text-secondary">Here's what's happening with your projects today.</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn btn-glass">Export Report</button>
              <button className="btn btn-primary">Create Campaign</button>
            </div>
          </header>

          {/* KPI Cards */}
          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            {stats.map((stat, i) => (
              <div className="glass-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                <p className="text-secondary" style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>{stat.label}</p>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                  <h3 style={{ fontSize: '1.75rem', margin: 0 }}>{stat.value}</h3>
                  <span style={{ 
                    color: stat.trend.startsWith('+') ? '#10b981' : '#f43f5e',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}>
                    {stat.trend}
                  </span>
                </div>
              </div>
            ))}
          </section>

          {/* Main Content Area */}
          <ShipmentMap />
          <ShipmentList />
        </main>
      </div>
    </>
  )
}

export default App
