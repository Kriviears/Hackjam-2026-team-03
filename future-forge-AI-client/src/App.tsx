import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Onboarding from './pages/onBoarding'
import Dashboard from './pages/dashboard'
import { Roadmap } from './pages/roadmap'

function App() {
   return (
     <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Onboarding WITHOUT sidebar */}
        <Route path="/onboarding" element={<Onboarding />} />

        {/* Dashboard WITH sidebar */}
        <Route path="/dashboard" element={<Dashboard /> }/>
        <Route path="/roadmap" element={<Roadmap /> }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App