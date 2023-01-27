import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link} from 'react-router-dom'
import { UsarAuth } from '../Context/UserContext'

export default function Navbar() {
  const [username, setUsername] = useState()
  const {delog} = UsarAuth()
  const {usuarioActivo} = UsarAuth()

  useEffect(()=>{
    if(usuarioActivo){
      setUsername(usuarioActivo.email.split('@')[0])
    }
  },[usuarioActivo])

  return (
    <section className='navbar' >
      <nav>
        <ul>
          <div className='flex align'>

              <li className='logo'>
                <Link to='/'>FocusG</Link>
              </li>
              
              {/* Tienda */}
              <li>
                <Link to="/games">Games</Link>
              </li>
              {/* Sobre la tienda */}
          </div>
          <li>
            {usuarioActivo? 
            <div className='flex'>
              {usuarioActivo.role === 'admin'?<Link to="/AddGames">Admin</Link>:null}
              {/* CART */}
              <Link to={`/cart`}>Carrito</Link>
              {/*------*/}
              <p>Logged as {username}</p>
              <button onClick={()=>delog()}>Salirse</button>
            </div>
            :
              <Link to="/login">Entrar</Link>
          }
          </li>
          
        </ul>
      </nav>
    </section>
  )
}
