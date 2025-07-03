// src/components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import '../App.css';

function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-custom sticky-top shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-white" to="/">Vital Andina</Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setOpen(!open)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${open ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/') ? 'active-link' : ''}`} to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/alimentos') ? 'active-link' : ''}`} to="/alimentos">Alimentos</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/guia') ? 'active-link' : ''}`} to="/guia">Guía</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/recetas') ? 'active-link' : ''}`} to="/recetas">Recetas</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
