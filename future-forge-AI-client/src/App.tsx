import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Onboarding from './pages/onBoarding'
import Dashboard from './pages/dashboard'
import { Roadmap } from './pages/roadmap'
import Portal from './pages/portal'
import { TechNetworkGroups } from './pages/techNetworkGroups'
import Navbar from './components/navbar/Navbar'

function AppContent() {
  const location = useLocation();
  const showNavbar = !['/login', '/onboarding'].includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <main className={showNavbar ? 'pt-16' : ''}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="/techNetworkGroups" element={<TechNetworkGroups />} />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App