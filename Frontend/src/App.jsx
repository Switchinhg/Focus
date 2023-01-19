import { useState } from 'react'
import Navbar from './components/Navbar'
import {BrowserRouter as Router, Routes, Route, Navigate }from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
      
        <Routes>
          <Route path='/' element={<h1>Hla</h1>}/>
        </Routes>
      </Router>

    </div>
  )
}

export default App
