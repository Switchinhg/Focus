import React from 'react'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { UsarAuth } from '../Context/UserContext'

export default function Register() {
  /* userContext */
    const {usuarioActivo, Register} = UsarAuth()
  
  const navigate = useNavigate()
  const [err,setErr] = useState()

  useEffect(() => {

    if(usuarioActivo){
      navigate('/')
    }
  
    
  }, [])


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

    Register(email,password)
    .then(resp=>{ 
      
      if(resp.success === true){
        navigate('/')
        localStorage.setItem('JWT', resp.JasonWebToken)
      }
      setErr(resp.err)
    })

  }

  return (
    <section className='formLogin'>
    <form onSubmit={onSubmit}>
        <h1 style={{textAlign:'center'}}>REGISTER</h1>
        <div> 
          <input type="email" name="email" id="email" placeholder='Email' required/>
        </div>
        <div> 
          <input type="password" name="password" id="password" placeholder='Password' required/>
        </div>
        <input className='BtnLogin' type="submit" value="REGISTER NOW" />
        <p style={{color:'red'}}>{err}</p>
    <div>
      <Link to="/login">sign in</Link>
    </div>
    </form>  
  </section>
  )
}
