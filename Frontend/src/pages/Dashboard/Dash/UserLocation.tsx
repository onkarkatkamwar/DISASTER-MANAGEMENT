'use client';

import { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useLocation } from '@/context/LocationContext';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '8px',
};

export default function MapComponent() {
  const { location } = useLocation();

  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if (location) {
      setCurrentLocation({
        lat: location.latitude,
        lng: location.longitude,
      });
    }
  }, [location]);

  const renderMarker = () => {
    if (typeof window !== 'undefined' && window.google) {
      return {
        url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
        scaledSize: new window.google.maps.Size(40, 40),
      };
    }
    return undefined;
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      {!currentLocation ? (
        <div className="text-center text-gray-600">
          Getting your location...
        </div>
      ) : (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentLocation}
            zoom={15}
            options={{
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
            <Marker
              position={currentLocation}
              title="Your Location"
              icon={renderMarker()}
            />
          </GoogleMap>
        </LoadScript>
      )}
    </div>
  );
}






// 'use client';

// import { useState, useEffect } from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// import { useLocation } from '@/context/LocationContext';

// const containerStyle = {
//   width: '80%',
//   height: '400px',
//   borderRadius: '8px'
// };

// export default function MapComponent() {
//   const { location } = useLocation();
//   const [currentLocation, setCurrentLocation] = useState({
//     lat: 19.0760,  // Default to Mumbai coordinates
//     lng: 72.8777
//   });
//   const [mapLoaded, setMapLoaded] = useState(false);

//   useEffect(() => {
//     if (location) {
//       setCurrentLocation({
//         lat: location.latitude,
//         lng: location.longitude
//       });
//     }
//   }, [location]);

//   return (
//     <div className="w-full h-full">
//       <LoadScript 
//         googleMapsApiKey={'AIzaSyDwVTRKadnAxjs5Go4T2nO9l0ETxySHlTo'}
//         onLoad={() => setMapLoaded(true)}
//       >
//         {mapLoaded && (
//           <GoogleMap
//             mapContainerStyle={containerStyle}
//             center={currentLocation}
//             zoom={15}
//             options={{
//               streetViewControl: false,
//               mapTypeControl: false,
//               fullscreenControl: false
//             }}
//           >
//             <Marker 
//               position={currentLocation} 
//               title="Your Location"
//               icon={{
//                 url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
//                 scaledSize: new google.maps.Size(40, 40)
//               }}
//             />
//           </GoogleMap>
//         )}
//       </LoadScript>
//     </div>
//   );
// }