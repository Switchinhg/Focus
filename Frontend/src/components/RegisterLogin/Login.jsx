import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Login() {
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

    fetch('http://localhost:8080/api/users',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        email,
        password,
        action:"login"
      })
    }).then(e=>e.json())
    .then(d=>{ 
      if(d.success === true){
        navigate('/')
        localStorage.setItem('JWT', d.JasonWebToken)
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
