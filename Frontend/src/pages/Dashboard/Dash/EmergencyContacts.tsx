
import React from 'react';
import { Phone, MapPin, Clock, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface EmergencyContactsProps {
  location: { latitude: number; longitude: number };
}

const EmergencyContacts: React.FC<EmergencyContactsProps> = () => {
  const emergencyServices = [
    {
      name: 'Emergency Services',
      number: '911',
      description: 'Police, Fire, Medical emergencies',
      available: '24/7',
      priority: 'Critical'
    },
    {
      name: 'Poison Control',
      number: '1-800-222-1222',
      description: 'Poison emergencies and information',
      available: '24/7',
      priority: 'High'
    },
    {
      name: 'Red Cross Emergency',
      number: '1-800-733-2767',
      description: 'Disaster relief and assistance',
      available: '24/7',
      priority: 'High'
    },
    {
      name: 'Local Emergency Management',
      number: '(555) 123-4567',
      description: 'Local disaster coordination',
      available: 'Business Hours',
      priority: 'Medium'
    }
  ];

  const shelters = [
    {
      name: 'Community Center',
      address: '123 Main Street',
      distance: '2.3 miles',
      capacity: 'High',
      status: 'Open'
    },
    {
      name: 'High School Gymnasium',
      address: '456 School Road',
      distance: '3.7 miles',
      capacity: 'Medium',
      status: 'Open'
    },
    {
      name: 'City Recreation Center',
      address: '789 Park Avenue',
      distance: '4.1 miles',
      capacity: 'High',
      status: 'Standby'
    }
  ];

  const safetyTips = [
    "Keep emergency kit ready with water, food, flashlight, and radio",
    "Know your evacuation routes and meeting points",
    "Stay informed through official emergency alerts",
    "Have emergency contact numbers saved offline",
    "Keep important documents in waterproof container"
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'destructive';
      case 'High': return 'default';
      case 'Medium': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-green-100 text-green-800';
      case 'Standby': return 'bg-yellow-100 text-yellow-800';
      case 'Full': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Emergency Numbers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <Phone className="h-5 w-5" />
            Emergency Contacts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {emergencyServices.map((service, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm">{service.name}</span>
                  <Badge variant={getPriorityColor(service.priority)} className="text-xs">
                    {service.priority}
                  </Badge>
                </div>
                <p className="text-xs mb-1">{service.description}</p>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  {service.available}
                </div>
              </div>
              <Button 
                size="sm" 
                className="ml-3"
                onClick={() => window.open(`tel:${service.number}`)}
              >
                <Phone className="h-4 w-4 mr-1" />
                {service.number}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Emergency Shelters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-600">
            <MapPin className="h-5 w-5" />
            Nearby Shelters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {shelters.map((shelter, index) => (
            <div key={index} className="p-3 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm">{shelter.name}</span>
                <Badge className={`text-xs ${getStatusColor(shelter.status)}`}>
                  {shelter.status}
                </Badge>
              </div>
              <p className="text-xs mb-1">{shelter.address}</p>
              <div className="flex items-center justify-between text-xs">
                <span>{shelter.distance} away</span>
                <span>Capacity: {shelter.capacity}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Safety Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-600">
            <AlertTriangle className="h-5 w-5" />
            Safety Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {safetyTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-orange-600 font-bold">•</span>
                <span className="">{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyContacts;
