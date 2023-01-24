import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {UsarAuth} from '../Context/UserContext'


export default function Login() {

  /* UserContext */
    const {usuarioActivo,Login} = UsarAuth()

    /* navigate */
    const navigate = useNavigate()

  const [err,setErr] = useState()


  

  
  const onSubmit = (e) =>{
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value

    if(/\s/.test(password)){
      setErr('la contraseña no puede contener espacios')
      return
    }
    if(password.length  < 6){
      setErr('la contraseña tiene que tener mas de 6 caracteres')
      return
    }
    setErr('')

    /* funcion Login en context */
    Login(email,password)
    .then(resp=>{ 
      console.log('entrene then')
      if(resp.success === true){
        console.log('entrene resp')
        navigate('/')
        localStorage.setItem('JWT', resp.JasonWebToken)
      }
      setErr('Contraseña o email incorrecto')
    })
  }
  return (
    <section className='formLogin'>
      <form onSubmit={onSubmit}>
          <h1 style={{textAlign:'center'}}>ENTRAR</h1>
          <div> 
            <input type="email" name="email" id="email" placeholder='Email' required/>
          </div>
          <div> 
            <input type="password" name="password" id="password" placeholder='Password' required/>
          </div>
          <input className='BtnLogin' type="submit" value="LOG IN NOW" />
          <p style={{color:'red'}}>{err}</p>
      <div>
        <Link to="/registro">sign up</Link>
      </div>
      </form>  
    </section>
  )
}
