import React, {createContext,useState,useContext, useEffect} from 'react'

/* Creamos el contexto */
const CartContext = createContext([]);
/* Funcion para usar el contexto del cart*/
export const usarCart = () => useContext(CartContext);

export default function CartContextP({children}) {
    const [cart,setCart] = useState(JSON.parse(localStorage.getItem('cart')) || [])



    /* AddToCart */
    function addToCart(game){
        setCart([...cart, {game}])
        localStorage.setItem('cart',JSON.stringify([...cart,{game}]))
        
        return true
    }
    /* BorrarProd */
    function deleteProd(game){
        const  cart2  = cart.filter(e=>e.game !== game)
        setCart(cart2)
        localStorage.setItem('cart',JSON.stringify(cart2))

    }
    /* Total */
    function totalCost(infogames){
        return infogames.reduce((acum, i) => acum + i.price, 0);

    }
    /* BorrarCarrito */
    function clearCart(){
        setCart([])
    }





    const value = {
        cart,
        addToCart,
        clearCart,
        deleteProd,
        totalCost
    }

  return (
    <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
  )
}
