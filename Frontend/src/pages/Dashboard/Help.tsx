// components/HelpPage.tsx
import React, { useEffect, useState } from 'react';
import { useLocation } from '@/context/LocationContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { DownloadIcon, PhoneIcon } from 'lucide-react';

interface EmergencyService {
  name: string;
  address: string;
  phone: string;
  type: 'Hospital' | 'Police Station' | 'Fire Station';
}

interface GovernmentContact {
  department: string;
  contactPerson: string;
  phone: string;
  email: string;
}

interface DisasterAlert {
  type: string;
  severity: string;
  description: string;
  date: string;
}

const HelpPage: React.FC = () => {
  const { location } = useLocation();
  const [emergencyServices, setEmergencyServices] = useState<EmergencyService[]>([]);
  const [governmentContacts, setGovernmentContacts] = useState<GovernmentContact[]>([]);
  const [disasterAlerts, setDisasterAlerts] = useState<DisasterAlert[]>([]);

  useEffect(() => {
    if (location) {
      // Fetch nearby emergency services
      fetch(`/api/emergency-services?lat=${location.latitude}&lng=${location.longitude}`)
        .then((res) => res.json())
        .then((data) => setEmergencyServices(data))
        .catch((err) => console.error(err));

      // Fetch government contacts
      fetch(`/api/government-contacts?lat=${location.latitude}&lng=${location.longitude}`)
        .then((res) => res.json())
        .then((data) => setGovernmentContacts(data))
        .catch((err) => console.error(err));

      // Fetch disaster alerts
      fetch(`/api/disaster-alerts?lat=${location.latitude}&lng=${location.longitude}`)
        .then((res) => res.json())
        .then((data) => setDisasterAlerts(data))
        .catch((err) => console.error(err));
    }
  }, [location]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Help & Emergency Services</h1>

      {/* Emergency Services */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Nearby Emergency Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {emergencyServices.map((service, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{service.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">{service.address}</p>
                <p className="text-sm text-gray-700 flex items-center mt-2">
                  <PhoneIcon className="w-4 h-4 mr-2" />
                  {service.phone}
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  Type: <span className="font-medium">{service.type}</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Government Contacts */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Government Emergency Contacts</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {governmentContacts.map((contact, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{contact.department}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">Contact Person: {contact.contactPerson}</p>
                <p className="text-sm text-gray-700 flex items-center mt-2">
                  <PhoneIcon className="w-4 h-4 mr-2" />
                  {contact.phone}
                </p>
                <p className="text-sm text-gray-700 mt-2">Email: {contact.email}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Survival Resources */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Survival Resources & Guides</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Flood Preparedness Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 mb-4">
                Learn how to prepare for floods and stay safe during flood situations.
              </p>
              <Button variant="outline" className="flex items-center">
                <DownloadIcon className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </CardContent>
          </Card>
          {/* Add more guides as needed */}
        </div>
      </section>

      <Separator />

      {/* Real-Time Disaster Alerts */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Real-Time Disaster Alerts</h2>
        <div className="space-y-4">
          {disasterAlerts.map((alert, index) => (
            <Alert key={index} variant="destructive">
              <AlertTitle>
                {alert.type} - Severity: {alert.severity}
              </AlertTitle>
              <AlertDescription>
                {alert.description} <br />
                <span className="text-sm text-gray-500">Date: {alert.date}</span>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HelpPage;
