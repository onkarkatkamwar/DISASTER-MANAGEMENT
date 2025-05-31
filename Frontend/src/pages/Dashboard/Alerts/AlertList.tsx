'use client';

import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

import { Card} from "@/components/ui/card";
import fire from '@/assets/fire.jpg';
import earthquick from '@/assets/earthQuick.jpg';
import landSlide from '@/assets/landslide.jpg';
import flood from '@/assets/flood.jpg';
import other from '@/assets/other.jpg';
import { AlertDialogAction } from '@radix-ui/react-alert-dialog';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, X } from 'lucide-react';

interface Alert {
  id: string;
  name: string;
  phone: string;
  city: string;
  date: string;
  disasterType: 'flood' | 'earthquick' | 'fire' | 'landslide' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: {
    latitude: number;
    longitude: number;
  };
  description: string;
  mediaUrl?: string;
  governmentEmails: string[];
}

const alerts: Alert[] = [
  {
    id: "1",
    name: "John Doe",
    phone: "+1234567890",
    city: "Pune",
    date: "2025-05-31T10:00:00Z",
    disasterType: "flood",
    severity: "high",
    location: { latitude: 18.5204, longitude: 73.8567 },
    description: "Severe flooding observed in low-lying areas. Roads are blocked and people are stranded.",
    mediaUrl: "",
    governmentEmails: ["disaster@maharashtra.gov.in", "emergency@india.gov.in"],
  },
  // Add more alerts...
];

export default function AlertList() {
  const [alert, setSelectedAlert] = useState<Alert>(alerts[0]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-4">
        <AlertDialog key={alert.id}>
          <AlertDialogTrigger asChild>
            <Card
            onClick={() => setSelectedAlert(alert)}
            className="py-0 group hover:shadow-xl cursor-pointer transition border rounded-xl overflow-hidden"
            >
            {
                alert.mediaUrl ? (
                    <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                    {alert.mediaUrl.endsWith('.mp4') ? (
                        <video
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        >
                        <source src={alert.mediaUrl} type="video/mp4" />
                        </video>
                    ) : (
                        <img
                        src={alert.mediaUrl}
                        alt="Alert"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                    )}
                    </div>
                )
                :
                <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                    <img src={
                        alert.disasterType==="flood"?flood:
                        alert.disasterType==="fire"?fire:
                        alert.disasterType==="earthquick"?earthquick:
                        alert.disasterType==="landslide"?landSlide:
                        other
                    } alt="img" className='w-full h-full'/>
                </div>
            }

            <div className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">{alert.name}</h3>
                <span className="text-sm text-gray-500">
                    {new Date(alert.date).toLocaleDateString()}
                </span>
                </div>

                <p className="text-sm text-gray-600">
                <strong>City:</strong> {alert.city}
                </p>

                <p className="text-sm text-gray-700 line-clamp-3">
                {alert.description}
                </p>
            </div>
            </Card>

          </AlertDialogTrigger>

          <AlertDialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-start">
                <AlertDialogHeader className="flex-1">
                <AlertDialogTitle className="text-xl font-bold">
                    {alert.disasterType} Alert - {alert.city}
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                    alert.severity === 'critical' ? 'bg-red-100 text-red-800' :
                    alert.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                    alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                    }`}>
                    {alert.severity.toUpperCase()}
                    </span>
                </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogCancel className="h-8 w-8 p-0 rounded-full border-none hover:bg-gray-100">
                <X className="h-4 w-4" />
                </AlertDialogCancel>
            </div>

            <div className="overflow-y-auto pr-4 py-2 space-y-4 text-sm text-gray-800">
                <div className="grid grid-cols-2 gap-4">
                <div>
                    <h3 className="font-semibold text-gray-900">Reporter Details</h3>
                    <p className="mt-1">{alert.name}</p>
                    <p className="text-gray-600">{alert.phone}</p>
                </div>
                
                <div>
                    <h3 className="font-semibold text-gray-900">Alert Details</h3>
                    <p className="mt-1">
                    {new Date(alert.date).toLocaleString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                    </p>
                </div>
                </div>

                <div>
                <h3 className="font-semibold text-gray-900">Location</h3>
                <div className="mt-1 flex gap-2">
                    <span className="inline-flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    {alert.location.latitude.toFixed(4)}, {alert.location.longitude.toFixed(4)}
                    </span>
                    <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 px-2 text-xs"
                    onClick={() => navigator.clipboard.writeText(`${alert.location.latitude},${alert.location.longitude}`)}
                    >
                    Copy
                    </Button>
                </div>
                </div>

                <div>
                <h3 className="font-semibold text-gray-900">Description</h3>
                <p className="mt-1 text-gray-700 whitespace-pre-line">{alert.description}</p>
                </div>

                {alert.mediaUrl && (
                <div>
                    <h3 className="font-semibold text-gray-900">Evidence</h3>
                    <div className="mt-2 border rounded-lg overflow-hidden">
                    {alert.mediaUrl.endsWith(".mp4") ? (
                        <div className="relative">
                        <video controls className="w-full max-h-64">
                            <source src={alert.mediaUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <a 
                            href={alert.mediaUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="absolute bottom-2 right-2 bg-black/50 text-white rounded px-2 py-1 text-xs hover:bg-black/70"
                        >
                            Open Fullscreen
                        </a>
                        </div>
                    ) : (
                        <a href={alert.mediaUrl} target="_blank" rel="noopener noreferrer">
                        <img
                            src={alert.mediaUrl}
                            alt="Disaster Evidence"
                            className="w-full h-auto max-h-64 object-contain rounded"
                        />
                        </a>
                    )}
                    </div>
                </div>
                )}

                <div>
                <h3 className="font-semibold text-gray-900">Sent To Authorities</h3>
                <ul className="mt-1 space-y-1">
                    {alert.governmentEmails.map((email) => (
                    <li key={email} className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">{email}</span>
                    </li>
                    ))}
                </ul>
                </div>
            </div>

            <AlertDialogFooter className="mt-4">
                <AlertDialogAction asChild>
                <Button className="w-full">Acknowledge Alert</Button>
                </AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
  );
}
