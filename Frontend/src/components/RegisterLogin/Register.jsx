import React from 'react'
import { Link } from 'react-router-dom'


export default function Register() {
  return (
    <section className='formLogin'>
    <form>
        <h1 style={{textAlign:'center'}}>REGISTER</h1>
        <div> 
          <input type="email" name="email" id="email" placeholder='Email'/>
        </div>
        <div> 
          <input type="password" name="password" id="password" placeholder='Password' />
        </div>
        <input className='BtnLogin' type="submit" value="REGISTER NOW" />
    <div>
      <Link to="/login">sign in</Link>
    </div>
    </form>  
  </section>
  )
}
