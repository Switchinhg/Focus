import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import {BrowserRouter as Router, Routes, Route, Navigate }from 'react-router-dom'
import Home from './components/Home/Home'
import Login from './components/RegisterLogin/Login'
import Register from './components/RegisterLogin/Register'
import './css/procesado.css'

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
      
        <Routes>
          {/* HOMe */}
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/registro' element={<Register/>}/>



          {/* Not Found */}
          <Route path='*' element={<h1>NO ENCONTRADO</h1>} />
        </Routes>
          {/* Footer */}
      </Router>

    </div>
  )
}

export default App
