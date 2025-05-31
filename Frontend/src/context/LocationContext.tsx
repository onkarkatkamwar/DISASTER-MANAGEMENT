import React, { createContext, useState, ReactNode } from "react";
import { useContext } from "react";

// Type for coordinates
interface Coordinates {
  latitude: number;
  longitude: number;
}

// Context type
interface LocationContextType {
  location: Coordinates | null;
  fetchUserLocation: () => Promise<void>;
}

// Create the context
export const LocationContext = createContext<LocationContextType>({
  location: null,
  fetchUserLocation: async () => {},
});

// Provider Props
interface LocationProviderProps {
  children: ReactNode;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const [location, setLocation] = useState<Coordinates | null>(null);

  const fetchUserLocation = async () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported.");
      return;
    }

    return new Promise<void>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          resolve();
        },
        (error) => {
          console.error("Failed to get location:", error);
          reject(error);
        }
      );
    });
  };

  return (
    <LocationContext.Provider value={{ location, fetchUserLocation }}>
      {children}
    </LocationContext.Provider>
  );
};


export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};

