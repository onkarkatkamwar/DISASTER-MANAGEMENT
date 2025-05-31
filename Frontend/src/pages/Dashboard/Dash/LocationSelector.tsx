
import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface LocationSelectorProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
  currentLocation: { lat: number; lng: number; address: string } | null;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ 
  onLocationSelect, 
  currentLocation 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  // Demo locations for quick selection
  const quickLocations = [
    { name: 'Tokyo, Japan', lat: 35.6762, lng: 139.6503 },
    { name: 'San Francisco, USA', lat: 37.7749, lng: -122.4194 },
    { name: 'Mumbai, India', lat: 19.0760, lng: 72.8777 },
    { name: 'Istanbul, Turkey', lat: 41.0082, lng: 28.9784 },
    { name: 'Mexico City, Mexico', lat: 19.4326, lng: -99.1332 },
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    // Simulate geocoding API call
    setTimeout(() => {
      const randomLat = (Math.random() - 0.5) * 180;
      const randomLng = (Math.random() - 0.5) * 360;
      
      onLocationSelect({
        lat: randomLat,
        lng: randomLng,
        address: searchQuery
      });
      
      setSearchQuery('');
      setIsSearching(false);
    }, 1000);
  };

  const selectQuickLocation = (location: any) => {
    onLocationSelect({
      lat: location.lat,
      lng: location.lng,
      address: location.name
    });
  };

  return (
    <div className="relative">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="pr-10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        <Button 
          onClick={handleSearch}
          disabled={isSearching || !searchQuery.trim()}
          size="sm"
        >
          {isSearching ? 'Searching...' : 'Search'}
        </Button>
      </div>

      {/* Quick Location Suggestions */}
      <Card className="absolute top-full left-0 right-0 mt-2 z-50 bg-white shadow-lg">
        <CardContent className="p-2">
          <div className="text-xs text-gray-500 mb-2 px-2">Quick locations:</div>
          <div className="space-y-1">
            {quickLocations.map((location, index) => (
              <button
                key={index}
                onClick={() => selectQuickLocation(location)}
                className="w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded flex items-center gap-2"
              >
                <MapPin className="h-3 w-3 text-gray-400" />
                {location.name}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationSelector;
