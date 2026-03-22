import { useState, useEffect } from 'react';

const ShipmentList = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/shipments');
        if (!response.ok) {
          throw new Error('Failed to fetch shipments');
        }
        const data = await response.json();
        setShipments(data.shipments);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchShipments();
  }, []);

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'delivered': return '#10b981';
      case 'in transit': return '#3b82f6';
      case 'pending': return '#f59e0b';
      default: return '#94a3b8';
    }
  };

  return (
    <section className="glass-panel" style={{ padding: '2rem', minHeight: '400px', marginTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ margin: 0 }}>Live Shipment Tracker</h3>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>Refresh</button>
      </div>
      
      {error && <div style={{ color: '#f43f5e', marginBottom: '1rem' }}>Error: {error}</div>}
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }} className="text-secondary">
          Loading shipments...
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <th style={{ padding: '1rem', color: '#94a3b8', fontWeight: '500' }}>Shipment ID</th>
                <th style={{ padding: '1rem', color: '#94a3b8', fontWeight: '500' }}>Status</th>
                <th style={{ padding: '1rem', color: '#94a3b8', fontWeight: '500' }}>Location</th>
                <th style={{ padding: '1rem', color: '#94a3b8', fontWeight: '500', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((shipment, index) => (
                <tr key={index} style={{ 
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  transition: 'background-color 0.2s'
                }} className="table-row-hover">
                  <td style={{ padding: '1rem', fontWeight: '500' }}>{shipment.id}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      color: getStatusColor(shipment.status),
                      background: `${getStatusColor(shipment.status)}20`,
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.85rem',
                      fontWeight: '600'
                    }}>
                      {shipment.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }} className="text-secondary">{shipment.last_location}</td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <button className="btn btn-glass" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Track</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default ShipmentList;
