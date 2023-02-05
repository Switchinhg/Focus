import React from 'react'
import { useState } from 'react'

export default function CartWidget() {
  const [isShown, setIsShown] = useState(false)

  return (
    <div className='cart' 
    onMouseEnter={()=>setIsShown(true)}
    onMouseLeave={()=>setIsShown(false)}
    > 

    {isShown?
      <img className='gif' src="./cart.gif" alt="" />
      
      :
      <img className='static' src="./cart.png" alt="" />

    }

    </div>
  )
}
