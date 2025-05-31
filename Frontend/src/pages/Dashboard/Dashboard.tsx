import { Button } from '@/components/ui/button';
import disasterImage from '@/assets/UserImage.jpg';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Spinner } from '@/components/Spinner';
import { Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import { AlertTriangle, Droplets, Wind, Thermometer, MapPin, Search, Rss} from 'lucide-react';
import { useLocation } from '@/context/LocationContext';
import UserLocationMap from './Dash/UserLocation';
import { Badge } from '@/components/ui/badge';
import AlertsFeed from './Dash/AlertsFeed';
import SocialMediaFeed from './Dash/SocialMediaFeed';
import EmergencyContacts from './Dash/EmergencyContacts';
import NewsFeed from './Dash/NewsFeed';

interface WeatherData {
  temp: number;
  humidity: number;
  windSpeed: number;
  conditions: string;
  alerts?: string[];
  location: string;
}

const Dashboard = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const {location, fetchUserLocation} = useLocation();
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const getCurrentLocation = async() => {
    setIsLoadingLocation(true);
    await fetchUserLocation();
    setIsLoadingLocation(false);
  };


  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    setLoading(true);

    if(!location){
      await fetchUserLocation();
    }

    if(!location){
      console.log('Location request denied');
      return;
    }

    console.log(location);

    try {
      // const res = await axios.get(
      //   `https://api.ambeedata.com/weather/latest/by-lat-lng?lat=${location?.latitude}&lng=${location?.longitude}`,
      //   {
      //     headers: {
      //       "x-api-key": "d65128baaadace801677d4aedd6ce9f9e00d6519f501725a8d3b2a2b3b2430b7",
      //       "Content-type": "application/json"
      //     }
      //   }
      // );

      // console.log(res);


      const mockWeatherData: WeatherData = {
        temp: 28.5,
        humidity: 65,
        windSpeed: 12,
        conditions: "Partly Cloudy",
        alerts: ["Heat Advisory", "Air Quality Alert"],
        location: "Mumbai, IN"
      };
      
      setTimeout(() => {
        setWeatherData(mockWeatherData);
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
      setLoading(false);
    }
  };


    if (loading) {
      return (
        <div className="flex justify-center items-center w-full h-screen">
          <Spinner />
        </div>
      );
    }


  return (
    <div className='p-4'>
      <div className='flex flex-col lg:flex-row gap-4 md:gap-6 w-full'>        
        
        {/* Main Disaster Management Card */}
        <div className='border shadow-sm w-full lg:w-8/12 px-4 sm:px-5 py-6 rounded-md flex flex-col sm:flex-row gap-6 sm:gap-10 '>
          <div className='w-full sm:w-7/12 flex flex-col gap-3 sm:gap-4'>
            <h1 className='text-xl sm:text-2xl font-semibol'> 
              Disaster Alert System 🚨<br/>
              Stay informed and prepared for<br />
              emergency situations
            </h1>
            <p className='text-xs sm:text-sm'>
              Report incidents, view weather alerts, and access emergency resources in your area.
            </p>
            <div className='flex gap-3'>
              <Link to='/dashboard/create-alert' className='w-fit'>
                <Button className='bg-red-600 hover:bg-red-700'>Report Incident</Button>
              </Link>
              <Link to='/emergency-resources' className='w-fit'>
                <Button variant="outline">Emergency Resources</Button>
              </Link>
            </div>
          </div>

          <div className='max-w-[300px] sm:w-6/12 flex justify-center sm:justify-end'>
            <img 
              src={disasterImage} 
              alt="Disaster Management" 
              className='w-[300px] sm:w-[300px] md:w-[270px] object-contain rounded-lg'
            />
          </div>
        </div>

        {/* Weather Information Card */}
        <div className='w-full lg:w-4/12'>
          {
            weatherData ?
            <Card className='h-full'>
            <div className='pb-2 px-4 texl-xl font-semibold'>
                <div className='text-red-500' />
                Weather Alerts
            </div>

            <CardContent className='space-y-2'>
              {weatherData ? (
                <>
                  <div className='grid grid-cols-2 gap-3'>
                    <div className='flex items-center gap-2'>
                      <Thermometer className='h-5 w-5 text-orange-500' />
                      <div>
                        <p className='text-xs text-gray-500'>Temperature</p>
                        <p className='font-medium'>{weatherData.temp}°C</p>
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Droplets className='h-5 w-5 text-blue-500' />
                      <div>
                        <p className='text-xs text-gray-500'>Humidity</p>
                        <p className='font-medium'>{weatherData.humidity}%</p>
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Wind className='h-5 w-5 text-cyan-500' />
                      <div>
                        <p className='text-xs text-gray-500'>Wind Speed</p>
                        <p className='font-medium'>{weatherData.windSpeed} km/h</p>
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <AlertTriangle className='h-5 w-5 text-yellow-500' />
                      <div>
                        <p className='text-xs text-gray-500'>Conditions</p>
                        <p className='font-medium'>{weatherData.conditions}</p>
                      </div>
                    </div>
                  </div>

                  {weatherData.alerts && weatherData.alerts.length > 0 && (
                    <div className='mt-4 p-3 rounded-md border border-red-100'>
                      <h3 className='text-sm font-medium text-red-700 flex items-center gap-2'>
                        <AlertTriangle className='h-4 w-4' />
                        Active Alerts
                      </h3>
                      <ul className='mt-2 space-y-1 text-xs text-red-600'>
                        {weatherData.alerts.map((alert, index) => (
                          <li key={index}>• {alert}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <div className='flex justify-center py-4'>
                  <Spinner />
                </div>
              )}
            </CardContent>

          </Card>

          :

          <h1>Please provide Location access!</h1>

          }
        </div>
      </div>

      {/* Emergency Quick Actions */}
      <div className='mt-6 grid grid-cols-2 md:grid-cols-4 gap-4'>
        <Button variant="outline" className='flex flex-col h-24 gap-2'>
          <AlertTriangle className='text-red-500' />
          <span>Send SOS</span>
        </Button>
        <Button variant="outline" className='flex flex-col h-24 gap-2'>
          <MapPin className='text-blue-500' />
          <span>Shelter Locations</span>
        </Button>
        <Button variant="outline" className='flex flex-col h-24 gap-2'>
          <Droplets className='text-cyan-500' />
          <span>Water Sources</span>
        </Button>
        <Button variant="outline" className='flex flex-col h-24 gap-2'>
          <Wind className='text-green-500' />
          <span>Evacuation Routes</span>
        </Button>
      </div>

      <div className="mt-8 bg-sidebar">
        {/* Header */}
        <header className="shadow-lg border-b-4 border-red-500">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500 rounded-lg">
                  <AlertTriangle className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Disaster Information Hub
                  </h1>
                  <p className="">Real-time alerts and emergency information</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Button 
                  onClick={getCurrentLocation}
                  disabled={isLoadingLocation}
                  variant="outline"
                  size="sm"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  {isLoadingLocation ? 'Detecting...' : 'My Location'}
                </Button>
              </div>
            </div>
            
            {location && (
              <div className="mt-4 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">
                    Monitoring: {location.latitude},{location.longitude}
                  </span>
                  <Badge variant="secondary" className="ml-2">
                    Active
                  </Badge>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Main Dashboard */}
        <main className="container mx-auto px-4 py-8">
          <div>
            <UserLocationMap />
          </div>
        </main>
      </div>

        {
          location &&
          <div className="py-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column - Map and Alerts */}
            <div className="lg:col-span-2 space-y-6">
              {/* Active Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    Active Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AlertsFeed location={location} />
                </CardContent>
              </Card>

              {/* News Feed */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Rss className="h-5 w-5 text-green-600" />
                    Latest News
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <NewsFeed location={location} />
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Social Media and Emergency Info */}
            <div className="space-y-6">
              {/* Emergency Contacts */}
              <EmergencyContacts location={location} />

              {/* Social Media Feed */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-purple-600" />
                    Social Media Reports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SocialMediaFeed location={location} />
                </CardContent>
              </Card>
            </div>
          </div>
        }
    </div>
  );
};

export default Dashboard;