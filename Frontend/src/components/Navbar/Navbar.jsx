import React from 'react'
import { Link} from 'react-router-dom'
import { UsarAuth } from '../Context/UserContext'

export default function Navbar() {
  const {delog} = UsarAuth()
  const {usuarioActivo} = UsarAuth()
  return (
    <section className='navbar' >
      <nav>
        <ul>
          <li className='logo'>
            <Link to='/'>FocusG</Link>
          </li>
          <li> {usuarioActivo? <p>Hola {usuarioActivo.email}</p> :null}</li>
          {/* Tienda */}
          {/* Sobre la tienda */}
          <li>
            {usuarioActivo? <button onClick={()=>delog()}>Salirse</button>:
            <Link to="/login">Entrar</Link>
          }
          </li>
          
        </ul>
      </nav>
    </section>
  )
}
