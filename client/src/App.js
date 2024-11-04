// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import LoginPage from './pages/LoginScreen';
import VisitorForm from './pages/VisitorForm';
import ViewVisitors from './pages/ViewVisitors';
import ReportsPage from './pages/ReportsPage';
import Dashboard from './pages/Dashboard';  // Import your Dashboard component
import EventManager from './pages/EventManager';

import './styles/variables.css';   

function App() {
  // مكون فرعي للتحقق من المسار
  const Layout = () => {
    const location = useLocation();

    // إخفاء الـ Navbar في صفحة تسجيل الدخول فقط
    const hideNavbar = location.pathname === '/login';

    return (
      <>
        {!hideNavbar && <Navbar />}  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventManager/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/visitor-form" element={<VisitorForm />} />
          <Route path="/view-visitors" element={<ViewVisitors />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/dashboard" element={<Dashboard />} />  {/* New route for the Dashboard */}
        </Routes>
      </>
    );
  };

  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
