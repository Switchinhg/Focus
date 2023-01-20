import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <section className='formLogin'>
      <form>
          <h1 style={{textAlign:'center'}}>ENTRAR</h1>
          <div> 
            <input type="email" name="email" id="email" placeholder='Email'/>
          </div>
          <div> 
            <input type="password" name="password" id="password" placeholder='Password' />
          </div>
          <input className='BtnLogin' type="submit" value="LOG IN NOW" />
      <div>
        <Link to="/registro">sign up</Link>
      </div>
      </form>  
    </section>
  )
}
