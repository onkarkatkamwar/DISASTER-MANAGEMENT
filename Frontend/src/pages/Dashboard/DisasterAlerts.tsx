'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { AlertCircle, Clock, Calendar, MapPin, Search } from 'lucide-react';
import { Label } from '@radix-ui/react-dropdown-menu';

interface DisasterAlert {
  id: string;
  title: string;
  location: string;
  type: 'earthquake' | 'flood' | 'wildfire' | 'hurricane' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  startDate: Date;
  endDate?: Date;
  description: string;
  distanceFromUser?: number;
}

export default function DisasterAlertsDashboard() {
  const [timeRange, setTimeRange] = useState<'1' | '3' | '6' | '12'>('3');
  const [locationFilter, setLocationFilter] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [disasterTypeFilter, setDisasterTypeFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'ongoing' | 'past' | 'all'>('ongoing');
  const [alerts, setAlerts] = useState<DisasterAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockAlerts: DisasterAlert[] = [
      {
        id: '1',
        title: 'Coastal Flood Warning',
        location: 'Mumbai, Maharashtra',
        type: 'flood',
        severity: 'high',
        startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        description: 'Heavy rains causing flooding in low-lying areas',
        distanceFromUser: 12.5
      },
      {
        id: '2',
        title: 'Earthquake Alert',
        location: 'Delhi NCR',
        type: 'earthquake',
        severity: 'critical',
        startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
        endDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        description: 'Magnitude 5.8 earthquake reported',
        distanceFromUser: 45.2
      },
      // Add more mock alerts...
    ];

    // Simulate API call
    setTimeout(() => {
      setAlerts(mockAlerts);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  const filteredAlerts = alerts.filter(alert => {
    // Time range filter
    const monthsAgo = new Date();
    monthsAgo.setMonth(monthsAgo.getMonth() - parseInt(timeRange));
    
    if (alert.startDate < monthsAgo) return false;
    
    // Location filter
    if (locationFilter && !alert.location.toLowerCase().includes(locationFilter.toLowerCase())) {
      return false;
    }
    
    // Disaster type filter
    if (disasterTypeFilter !== 'all' && alert.type !== disasterTypeFilter) {
      return false;
    }
    
    // Tab filter
    const now = new Date();
    const tenDaysAgo = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000);
    
    if (activeTab === 'ongoing') {
      return !alert.endDate || alert.endDate > now;
    } else if (activeTab === 'past') {
      return alert.startDate < tenDaysAgo;
    }
    
    return true;
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="text-red-500" />
          Disaster Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="space-y-2">
            <Label>Time Range</Label>
            <Select value={timeRange} onValueChange={(value: '1' | '3' | '6' | '12') => setTimeRange(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select months" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Last 1 Month</SelectItem>
                <SelectItem value="3">Last 3 Months</SelectItem>
                <SelectItem value="6">Last 6 Months</SelectItem>
                <SelectItem value="12">Last 12 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Disaster Type</Label>
            <Select value={disasterTypeFilter} onValueChange={setDisasterTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="earthquake">Earthquake</SelectItem>
                <SelectItem value="flood">Flood</SelectItem>
                <SelectItem value="wildfire">Wildfire</SelectItem>
                <SelectItem value="hurricane">Hurricane</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Location Search</Label>
            <div className="relative">
              <Input 
                placeholder="Enter location..." 
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />
              <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Sort By</Label>
            <Button variant="outline" className="w-full" onClick={() => {
              // Implement sort logic
            }}>
              {userLocation ? 'Distance from Me' : 'Recent First'}
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'ongoing' | 'past' | 'all')} >
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="ongoing">
              <Clock className="h-4 w-4 mr-2" />
              Ongoing
            </TabsTrigger>
            <TabsTrigger value="past">
              <Calendar className="h-4 w-4 mr-2" />
              Past Disasters
            </TabsTrigger>
            <TabsTrigger value="all">
              <AlertCircle className="h-4 w-4 mr-2" />
              All Alerts
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="ongoing" className="pt-4">
            {isLoading ? (
              <div className="flex justify-center py-8">Loading alerts...</div>
            ) : filteredAlerts.length > 0 ? (
              <div className="space-y-4">
                {filteredAlerts.map(alert => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No ongoing disaster alerts found
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="pt-4">
            {/* Similar content for past disasters */}
          </TabsContent>
          
          <TabsContent value="all" className="pt-4">
            {/* Similar content for all alerts */}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function AlertCard({ alert }: { alert: DisasterAlert }) {


    const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getDisasterIcon = (type: string) => {
    switch (type) {
      case 'earthquake': return '🌍';
      case 'flood': return '🌊';
      case 'wildfire': return '🔥';
      case 'hurricane': return '🌀';
      default: return '⚠️';
    }
  };



  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{getDisasterIcon(alert.type)}</span>
          <div>
            <CardTitle className="text-lg">{alert.title}</CardTitle>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              {alert.location}
              {alert.distanceFromUser && (
                <span className="ml-2">• {alert.distanceFromUser.toFixed(1)} km away</span>
              )}
            </div>
          </div>
        </div>
        <div className={`h-3 w-3 rounded-full ${getSeverityColor(alert.severity)}`} />
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-3">{alert.description}</p>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            Started: {alert.startDate.toLocaleDateString()}
          </span>
          {alert.endDate ? (
            <span>
              Ended: {alert.endDate.toLocaleDateString()}
            </span>
          ) : (
            <span className="text-red-500">Ongoing</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}