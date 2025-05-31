import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { LocationProvider } from "@/context/LocationContext";
import { BreadcrumbProvider } from "@/context/BreaderCrumbContext";


// Main Pages
import DashboardLayout from "./pages/DashboardLayout";
import Dashboard from "./pages/Dashboard/Dashboard"
import NotFound from "./pages/NotFound";
import AlertForm from "./pages/Dashboard/CreateAlert";
import DisasterAlerts from "./pages/Dashboard/DisasterAlerts";
import OurPastAlerts from "./pages/Dashboard/OurPastAlerts";
import HelpPage from "./pages/Dashboard/Help";


function App() {
  

  return (
    <LocationProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path='/dashboard' element={<BreadcrumbProvider><DashboardLayout /></BreadcrumbProvider>}>
              <Route index element={<Dashboard />} />
              <Route path='alerts' element={<DisasterAlerts />} />
              <Route path='create-alert' element={<AlertForm />} />
              <Route path='our-alerts' element={<OurPastAlerts />} />     
              <Route path='help' element={<HelpPage />} />     
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </LocationProvider>
  )
}

export default App
