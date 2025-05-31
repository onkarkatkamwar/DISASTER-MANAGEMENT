
import React, { useEffect, useRef } from 'react';
import { AlertTriangle, MapPin } from 'lucide-react';

interface DisasterMapProps {
  location: { lat: number; lng: number; address: string };
}

const DisasterMap: React.FC<DisasterMapProps> = ({ location }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  // Mock disaster data
  const disasters = [
    {
      id: 1,
      type: 'Earthquake',
      severity: 'High',
      location: 'Near Tokyo',
      magnitude: '6.2',
      distance: '45km',
      color: 'red'
    },
    {
      id: 2,
      type: 'Flood Warning',
      severity: 'Medium',
      location: 'Coastal Areas',
      magnitude: 'Moderate',
      distance: '12km',
      color: 'orange'
    },
    {
      id: 3,
      type: 'Storm Watch',
      severity: 'Low',
      location: 'Northern Region',
      magnitude: 'Category 1',
      distance: '85km',
      color: 'yellow'
    }
  ];

  useEffect(() => {
    // In a real implementation, this would initialize a proper map (Mapbox, Leaflet, etc.)
    console.log('Map initialized for location:', location);
  }, [location]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-orange-500';
      case 'Low': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="h-96 bg-gray-100 rounded-lg relative overflow-hidden">
      {/* Map Container */}
      <div 
        ref={mapRef} 
        className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 relative"
      >
        {/* Mock Map Background */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 400 300">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#ccc" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* User Location Marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              Your Location
            </div>
          </div>
        </div>

        {/* Disaster Markers */}
        {disasters.map((disaster, index) => (
          <div 
            key={disaster.id}
            className="absolute"
            style={{
              top: `${20 + index * 15}%`,
              left: `${30 + index * 20}%`
            }}
          >
            <div className="relative group cursor-pointer">
              <div className={`w-6 h-6 ${getSeverityColor(disaster.severity)} rounded-full border-2 border-white shadow-lg flex items-center justify-center`}>
                <AlertTriangle className="h-3 w-3 text-white" />
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-gray-900 text-white text-xs rounded-lg p-2 whitespace-nowrap">
                  <div className="font-semibold">{disaster.type}</div>
                  <div>Severity: {disaster.severity}</div>
                  <div>Distance: {disaster.distance}</div>
                  <div>Details: {disaster.magnitude}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <div className="text-sm font-semibold mb-2">Alert Levels</div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>High Risk</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span>Medium Risk</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Low Risk</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <span>Your Location</span>
          </div>
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 space-y-2">
        <button className="bg-white hover:bg-gray-50 p-2 rounded shadow-lg text-gray-700">
          <MapPin className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default DisasterMap;
