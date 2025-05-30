import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// Authentication 
import LandigPage from "./pages/LandigPage"
import AuthenticateLayout from "./pages/Auth/AuthLayout"
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import ForgotPassword from "./pages/Auth/ForgotPassword"

// Main Pages
import DashboardLayout from "./pages/DashboardLayout";
import Dashboard from "./pages/HR/Dashboard"


import { BreadcrumbProvider } from "./context/BreaderCrumbContext";

function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route index element={<LandigPage />} />
          <Route path="/login" element={<AuthenticateLayout><Login /></AuthenticateLayout>} />
          <Route path="/register" element={<AuthenticateLayout><Register /></AuthenticateLayout>} />
          <Route path="/login/forgotPassword" element={<AuthenticateLayout><ForgotPassword /></AuthenticateLayout>} />

          {/* HR Dashboard */}
          <Route path='/hr' element={<BreadcrumbProvider><DashboardLayout /></BreadcrumbProvider>}>
              <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
