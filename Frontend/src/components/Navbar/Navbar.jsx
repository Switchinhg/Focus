import React from 'react'
import { Link} from 'react-router-dom'

export default function Navbar() {
  return (
    <section className='navbar' >
      <nav>
        <ul>
          <li className='logo'>
            <Link to='/'>FocusG</Link>
          </li>
          {/* Tienda */}
          {/* Sobre la tienda */}
          <li>
            <Link to="/login">Entrar</Link>
          </li>
          
        </ul>
      </nav>
    </section>
  )
}
