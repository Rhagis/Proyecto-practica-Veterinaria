import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/Logo Veterinaria.png'

const navItems = [
  { label: 'Productos', path: '/productos' },
  { label: 'Ventas', path: '/ventas' },
  { label: 'Clientes', path: '/clientes' },
  { label: 'Mascotas', path: '/mascotas' },
  { label: 'Historias Clínicas', path: '/historias-clinicas' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const currentUser = { name: 'Dr. X', avatar: '👨‍⚕️' }

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
    </header>
  )
}
