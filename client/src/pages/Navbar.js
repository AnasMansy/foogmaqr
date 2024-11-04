import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../images/icon.jpeg';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('تم تسجيل الخروج');
    navigate('/login');
  };

  return (
    <nav className="app-header navbar navbar-expand bg-body">
      <div className="container-fluid">
        {/* Sidebar Toggle */}
        <ul className="navbar-nav">
          
          <li className="nav-item d-none d-md-block">
            <NavLink to="/" className="nav-link" activeClassName="active"> الرئيسيه</NavLink>
          </li>
          <li className="nav-item d-none d-md-block">
            <NavLink to="/visitor-form" className="nav-link" activeClassName="active">سجل الزوار</NavLink>
          </li>
          <li className="nav-item d-none d-md-block">
            <NavLink to="/view-visitors" className="nav-link" activeClassName="active">عرض الزوار</NavLink>
          </li>
          <li className="nav-item d-none d-md-block">
            <NavLink to="/events" className="nav-link" activeClassName="active">إدارة الفعاليات</NavLink>
          </li>
          <li className="nav-item d-none d-md-block">
            <NavLink to="/dashboard" className="nav-link" activeClassName="active">دليل الموظفين والمكاتب</NavLink>
          </li>
          <li className="nav-item d-none d-md-block">
            <NavLink to="/reports" className="nav-link" activeClassName="active">التقارير والتحليلات</NavLink>
          </li>
        </ul>

        {/* Right Side Icons and Logout */}
        <ul className="navbar-nav ms-auto">
          
          <li className="nav-item">
            <button onClick={handleLogout} className="btn btn-logout">
              تسجيل الخروج
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
