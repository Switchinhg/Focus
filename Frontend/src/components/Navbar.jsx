import React from 'react'
import { Link} from 'react-router-dom'

export default function Navbar() {
  return (
    <section>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to="/login">Entrar</Link>
          </li>
          <li>
            <Link to="/registro">Registrarse</Link>
          </li>
        </ul>
      </nav>
    </section>
  )
}
