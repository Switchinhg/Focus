import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import {BrowserRouter as Router, Routes, Route }from 'react-router-dom'
import Home from './components/Home/Home'
import Login from './components/RegisterLogin/Login'
import Register from './components/RegisterLogin/Register'
import './css/procesado.css'
import { UsarAuth } from './components/Context/UserContext'
import RPLogin, { Admin } from './components/RutasProtegidas/RPLogin'
import { useEffect } from 'react'
import AddGame from './components/AddGame/AddGame'
import GameCatalogue from './components/GameCatalogue/GameCatalogue'
import GameDetail from './components/GameCatalogue/GameDetail/GameDetail'
import Cart from './components/cartWidget/Cart'
import Footer from './components/Footer/Footer'
import GameLibrary from './components/GameLibrary/GameLibrary'
import RPLibrary from './components/RutasProtegidas/RPLibrary'

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
          {/* Game Catalogue */}
          <Route path='/games' element={<GameCatalogue />}/>
          {/* Game Detail */}
          <Route path='/game/:id' element={<GameDetail/>}/>
          {/* User Game Library  */}
          <Route path='/library' element={<RPLibrary usuarioActivo={usuarioActivo}><GameLibrary /></RPLibrary>}/>
          {/* Cart */}
          <Route path='/cart' element={<RPLibrary usuarioActivo={usuarioActivo}><Cart/></RPLibrary>}/>
          {/* Admin Add Games */}
          <Route path='/addGames' element={<Admin usuarioActivo={usuarioActivo}><AddGame/></Admin>}/>



          {/* Not Found */}
          <Route path='*' element={<h1>NO ENCONTRADO</h1>} />
        </Routes>
          {/* Footer */}
        <Footer />

      </Router>

    </div>
    }
    </>

  )
}

export default App
