// app/(dashboard)/alerts/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AlertList from './Alerts/AlertList';
import { AlertCircle, Clock, ArrowDownUp, Search } from 'lucide-react';
import { useLocation } from '@/context/LocationContext';
import { Separator } from '@/components/ui/separator';

interface DisasterAlert {
  id: string;
  title: string;
  location: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  date: Date;
  coordinates?: { lat: number; lng: number };
  distance?: number;
}

export default function AlertsPage() {
  const [timeRange, setTimeRange] = useState<number>(3); // Default to 3 months
  const [sortBy, setSortBy] = useState<'recent' | 'distance'>('recent');
  const [alerts, setAlerts] = useState<DisasterAlert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const {location} = useLocation();

  // Fetch alerts based on time range
  const fetchAlerts = async (months: number) => {
    setLoading(true);
    try {
      // Replace with actual API call
      const response = await fetch(`/api/alerts?months=${months}`);
      const data = await response.json();
      
      // Calculate distances if user location is available
      const alertsWithDistance = data.map((alert: DisasterAlert) => {
        if (location && alert.coordinates) {
          const distance = calculateDistance(
            location.latitude,
            location.longitude,
            alert.coordinates.lat,
            alert.coordinates.lng
          );
          return { ...alert, distance };
        }
        return alert;
      });

      setAlerts(alertsWithDistance);
    } catch (error) {
      console.error("Failed to fetch alerts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchAlerts(3);
  }, []);

  // Sort alerts
  const sortedAlerts = [...alerts].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      if (a.distance === undefined) return 1;
      if (b.distance === undefined) return -1;
      return a.distance - b.distance;
    }
  });

  // Helper function to calculate distance between coordinates
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <AlertCircle className="h-8 w-8 text-red-500" />
          <h1 className="text-3xl font-bold">Disaster Alerts</h1>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <Select 
              value={timeRange.toString()} 
              onValueChange={(value) => {
                const months = parseInt(value);
                setTimeRange(months);
                fetchAlerts(months);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Last 1 Month</SelectItem>
                <SelectItem value="3">Last 3 Months</SelectItem>
                <SelectItem value="6">Last 6 Months</SelectItem>
                <SelectItem value="9">Last 9 Months</SelectItem>
                <SelectItem value="12">Last 12 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button onClick={()=>{
            fetchAlerts(timeRange);
          }}>
            <Search />
            Search
          </Button>
        </div>
      </div>

      <div className="">

        <div className='flex justify-between mt-10'>
          <div className="flex justify-center gap-4">
            <Button 
              variant="outline"
              onClick={() => fetchAlerts(timeRange)}
              disabled={loading}
            >
              {loading ? 'Refreshing...' : 'Refresh Alerts'}
            </Button>

            <div className="flex items-center gap-2">
              <ArrowDownUp className="h-5 w-5 text-muted-foreground" />
              <Select 
                value={sortBy} 
                onValueChange={(value: 'recent' | 'distance') => setSortBy(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem 
                    value="distance" 
                    disabled={!location}
                  >
                    {location ? 'Near From Me' : 'Enable Location'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator className='my-2'/>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
          </div>
        ) : (
          <AlertList />
        )}
      </div>
    </div>
  );
}