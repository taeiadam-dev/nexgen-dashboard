import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet marker icons in React
import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const ShipmentMap = () => {
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

  // Center the map roughly on the UAE/Saudi region
  const defaultCenter = [24.5, 54.0];

  return (
    <section className="glass-panel" style={{ padding: '2rem', marginTop: '2rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ margin: 0 }}>Live Fleet Geographic Map</h3>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>Refresh Map</button>
      </div>

      {error && <div style={{ color: '#f43f5e', marginBottom: '1rem' }}>Error: {error}</div>}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }} className="text-secondary">
          Loading fleet positions...
        </div>
      ) : (
        <div style={{ 
          height: '400px', 
          width: '100%', 
          borderRadius: '12px', 
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
        }}>
          <MapContainer center={defaultCenter} zoom={5} style={{ height: '100%', width: '100%' }}>
            {/* You can use standard OpenStreetMap tiles or a darker theme tile if you prefer */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {shipments.map((shipment) => {
              if (shipment.latitude && shipment.longitude) {
                return (
                  <Marker key={shipment.id} position={[shipment.latitude, shipment.longitude]}>
                    <Popup>
                      <div style={{ padding: '0.2rem' }}>
                        <strong style={{ display: 'block', fontSize: '1.1rem', marginBottom: '0.2rem' }}>{shipment.id}</strong>
                        <span style={{ 
                          display: 'inline-block',
                          color: '#fff',
                          background: getStatusColor(shipment.status),
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                          marginBottom: '0.4rem'
                        }}>
                          {shipment.status}
                        </span>
                        <br />
                        Last Location: <strong>{shipment.last_location}</strong>
                      </div>
                    </Popup>
                  </Marker>
                );
              }
              return null;
            })}
          </MapContainer>
        </div>
      )}
    </section>
  );
};

export default ShipmentMap;
