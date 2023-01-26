import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import CartContextP from './components/Context/CartContext'
import GameContextProvider from './components/Context/GameContext'
import UserContext from './components/Context/UserContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <GameContextProvider>
      <UserContext>
        <CartContextP>
         <App />
        </CartContextP>
      </UserContext>
    </GameContextProvider>
  // </React.StrictMode>,
)
