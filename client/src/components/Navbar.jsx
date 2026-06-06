import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/Logo Veterinaria.png'
import axios from 'axios'

const navItems = [
  { label: 'Productos', path: '/productos' },
  { label: 'Ventas', path: '/ventas' },
  { label: 'Clientes', path: '/clientes' },
  { label: 'Mascotas', path: '/mascotas' },
  { label: 'Historias Clínicas', path: '/historias-clinicas' },
]



export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [usuario, setUsuario] = useState(null);
  const currentUser = { name: 'Dr. X', avatar: '👨‍⚕️' }
  const navigate = useNavigate();


  
  const cerrarSesion = () => {

    axios.post('http://localhost:3000/users/logout',{},{withCredentials: true})
      .then(
        () => {
          navigate('/login');
        }
      )
  }

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="Logo Veterinaria" className="brand-logo" />
        <span>Veterinaria</span>
      </div>

      <NavLink to="/" className={({ isActive }) => `nav-link nav-link-home${isActive ? ' active' : ''}`}>
        Home
      </NavLink>

      <button
        type="button"
        className={`navbar-toggle${menuOpen ? ' open' : ''}`}
        aria-expanded={menuOpen}
        aria-label="Abrir menú"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
      </button>

      <nav className={`navbar-nav${menuOpen ? ' open' : ''}`} aria-label="Principal">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `nav-link${isActive ? ' active' : ''}`
            }
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="user-section">
        <span className="user-avatar">{currentUser.avatar}</span>
        <span className="user-name">{currentUser.name}</span>
      </div>
      <button className="logout-button" onClick={cerrarSesion}>
        Cerrar Sesión
      </button>
    </header>
  )
}
