import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: 'seagreen' }}>
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          VitalAndina
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/alimentos" className="nav-link">
                Alimentos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/guia" className="nav-link">
                Nutrición
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/recetas" className="nav-link">
                Recetas
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
