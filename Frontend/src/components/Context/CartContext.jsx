import React, {createContext,useState,useContext, useEffect} from 'react'

/* Creamos el contexto */
const CartContext = createContext([]);
/* Funcion para usar el contexto del cart*/
export const usarCart = () => useContext(CartContext);

export default function CartContextP({children}) {
    const [cart,setCart] = useState(JSON.parse(localStorage.getItem('cart')) || [])

    useEffect(()=>{
        console.log(cart)
    },[cart])


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
    function totalCost(){
        // cart.reduce((acc, cv)=>acc+ cv.price, 0)
        // console.log(cart.reduce((acc, cv)=>acc+ cv, 0))
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
