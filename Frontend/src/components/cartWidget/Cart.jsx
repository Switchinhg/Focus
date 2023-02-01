import React from 'react'
import { useEffect , useState} from 'react';
import { usarCart } from '../Context/CartContext';
/* Sweet alert */
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Cart() {
    const [cart,setCart] = useState(JSON.parse(localStorage.getItem('cart')) || [])
    const [infoGames,setInfoGames] = useState()
    const {totalCost,clearCart} = usarCart()
    const MySwal = withReactContent(Swal)

    useEffect(() => {
        document.title = 'Cart - FocusG';
        async function getProds(cart){
            const gamesID = cart.map(game=>game.game)
            


            const resp = await fetch(`${import.meta.env.VITE_APP_FETCH}/api/games/cart`,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body:JSON.stringify({
                    gamesID
                    })
              })
              const newResp = await resp.json()
              setInfoGames(newResp)
        }
        getProds(cart)
      }, []);


      const hacerCompra = () =>{
             MySwal.fire({
            title: "Compra realizada",
            html: `<p>Gracias por comprar ${infoGames.map(
              (i) =>  " " + i.name + " "
            )} </p> `,
            icon: "success",
            confirmButtonText: "Continuar",
          })
          setInfoGames('')
          localStorage.removeItem('cart')
          clearCart()
      }
      const borrarCompra = () =>{
          setInfoGames('')
          localStorage.removeItem('cart')
          clearCart()
      }

  return (
    <div className='CartContainer'>
        <h1>Cart</h1>
        <div className='gamelist'>
            {infoGames && infoGames.length>0? 
            <>
            {infoGames.map(e=>
            <>
            <div key={e._id} className='game'>
              <h4>{e.name}</h4>
              <p style={{color:'green'}}>U$S {e.price}</p>
            </div>
            <hr />
            </>
            )}
            <div className='buttonwrap'>
              <div>

                <button className='button' onClick={()=>borrarCompra()}>Clear Cart</button>
                <button className='button' onClick={()=>hacerCompra()}>Buy</button>
              </div>
                <p>Total: <span style={{color:'green'}}> U$S {totalCost(infoGames)}</span></p>
            </div>
            </>
            :<h4>Cart is empty</h4>}
        </div>
    </div>
  )
}
