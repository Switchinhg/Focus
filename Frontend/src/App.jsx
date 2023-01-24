import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import {BrowserRouter as Router, Routes, Route, Navigate  }from 'react-router-dom'
import Home from './components/Home/Home'
import Login from './components/RegisterLogin/Login'
import Register from './components/RegisterLogin/Register'
import './css/procesado.css'
import { UsarAuth } from './components/Context/UserContext'
import RPLogin from './components/RutasProtegidas/RPLogin'
import { useEffect } from 'react'

function App() {
  const [loading,setLoading]= useState(true)
  const {usuarioActivo} = UsarAuth()

  useEffect(() => {


    setLoading(false)
  
  }, [])
  
      
  return (
    <>
    {!loading &&
    <div className="App">
      <Router>
        <Navbar />
      
        <Routes>
          {/* HOMe */}
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={ <RPLogin usuarioActivo={usuarioActivo}> <Login /> </RPLogin>}/>
          <Route path='/registro' element={<RPLogin usuarioActivo={usuarioActivo}> <Register/> </RPLogin>}/>



          {/* Not Found */}
          <Route path='*' element={<h1>NO ENCONTRADO</h1>} />
        </Routes>
          {/* Footer */}
      </Router>

    </div>
    }
    </>

  )
}

export default App
