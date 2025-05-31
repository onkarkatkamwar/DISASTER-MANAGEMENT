
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock, MapPin, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AlertsFeedProps {
  location: { latitude: number; longitude: number};
}

const AlertsFeed: React.FC<AlertsFeedProps> = ({ location }) => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock alerts data
  const mockAlerts = [
    {
      id: 1,
      type: 'Earthquake',
      severity: 'High',
      title: 'Magnitude 6.2 Earthquake Detected',
      description: 'Strong earthquake detected 45km northeast of your location. Tsunami alert issued for coastal areas.',
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      distance: '45km NE',
      source: 'USGS',
      region: 'Pacific Ring of Fire'
    },
    {
      id: 2,
      type: 'Flood',
      severity: 'Medium',
      title: 'Flash Flood Warning',
      description: 'Heavy rainfall expected to cause flash flooding in low-lying areas. Residents advised to avoid travel.',
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      distance: '12km SW',
      source: 'National Weather Service',
      region: 'River Valley'
    },
    {
      id: 3,
      type: 'Storm',
      severity: 'Low',
      title: 'Severe Thunderstorm Watch',
      description: 'Conditions favorable for severe thunderstorms with potential for large hail and damaging winds.',
      timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
      distance: '85km N',
      source: 'Local Weather Authority',
      region: 'Northern Plains'
    },
    {
      id: 4,
      type: 'Wildfire',
      severity: 'Medium',
      title: 'Wildfire Smoke Advisory',
      description: 'Smoke from nearby wildfires may affect air quality. Sensitive individuals should limit outdoor activities.',
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      distance: '67km W',
      source: 'Forest Service',
      region: 'Mountain Region'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setAlerts(mockAlerts);
      setIsLoading(false);
    }, 1000);
  }, [location]);

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      case 'Low': return 'secondary';
      default: return 'outline';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'High': return '🔴';
      case 'Medium': return '🟠';
      case 'Low': return '🟡';
      default: return '⚪';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Earthquake': return '🌍';
      case 'Flood': return '🌊';
      case 'Storm': return '⛈️';
      case 'Wildfire': return '🔥';
      default: return '⚠️';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 60) {
      return `${diffMins} minutes ago`;
    } else if (diffMins < 1440) {
      const diffHours = Math.floor(diffMins / 60);
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
      const diffDays = Math.floor(diffMins / 1440);
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {alerts.length === 0 ? (
        <div className="text-center py-8">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4" />
          <p>No active alerts in your area</p>
          <p className="text-sm">Stay safe and check back regularly</p>
        </div>
      ) : (
        alerts.map((alert) => (
          <Card key={alert.id} className="border-l-4 border-l-red-500 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getTypeIcon(alert.type)}</span>
                  <Badge variant={getSeverityVariant(alert.severity)} className="text-xs">
                    {getSeverityIcon(alert.severity)} {alert.severity}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {alert.type}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <Clock className="h-3 w-3" />
                  {formatTimestamp(alert.timestamp)}
                </div>
              </div>
              
              <h3 className="font-semibold mb-2">{alert.title}</h3>
              <p className="text-sm mb-3">{alert.description}</p>
              
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {alert.distance}
                  </div>
                  <div>{alert.region}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span>Source: {alert.source}</span>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default AlertsFeed;
