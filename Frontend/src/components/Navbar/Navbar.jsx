import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link} from 'react-router-dom'
import { UsarAuth } from '../Context/UserContext'
import {useNavigate} from 'react-router-dom'


export default function Navbar() {
  const [username, setUsername] = useState()
  const {delog} = UsarAuth()
  const {usuarioActivo} = UsarAuth()

  /* redirect */
  const redirect = useNavigate()


  useEffect(()=>{
    if(usuarioActivo){
      setUsername(usuarioActivo.email.split('@')[0])
    }
  },[usuarioActivo])


  const salirse = () =>{
    delog()


    setTimeout(() => {
      redirect('/login')
    }, 1000);
  }

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
            <div className='flex' style={{alignItems:'center'}}>
              {usuarioActivo.role === 'admin'?<Link to="/AddGames">Admin</Link>:null}
              {/* CART */}
              <Link to={`/cart`}>Cart</Link>
              {/*------*/}
              <p>Hi {username}!</p>
              <button className='btn' onClick={()=>salirse()}>Log Out</button>
            </div>
            :
              <Link to="/login" className='btn'>Log In</Link>
          }
          </li>
          
        </ul>
      </nav>
    </section>
  )
}
