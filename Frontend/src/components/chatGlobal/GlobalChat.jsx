import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { UsarAuth } from '../Context/UserContext';

export default function GlobalChat() {  
  const [mensajes,setMensajes] = useState([])
  const [error,setError] = useState()
  const {usuarioActivo} = UsarAuth()


  document.title = `Chat - FocusG`;
  const socketRef = useRef();
  const messagesContainerRef = useRef(null)

  const sendMessage = (e) => {
    e.preventDefault();
    if(e.target[0].value.length !== 0){
      socketRef.current.emit('mensaje', { sender:usuarioActivo.email,mensaje: e.target[0].value });
      e.target[0].value = '';
      setError('')
    }else{
      setError('Can\'t send an empty message.')
    }

  }

  useEffect(() => {
    socketRef.current = io(`${import.meta.env.VITE_APP_FETCH}`);
    socketRef.current.on('historial',(data) => {
      console.log(data)
      setMensajes(data)
    })
  },[])
  useEffect(() => {
    socketRef.current.on('mensajes',(data)=>{
      setMensajes([...mensajes, data]);
    })
  })
  useEffect(() => {
    messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
  },[mensajes])


const randdom = () =>{
  return Math.floor(Math.random() * 10000000)
}
  
  return (
    <div className='chat'>
      <div className="chatWrap">

      <div className='messeges' ref={messagesContainerRef}>
        
        {
          mensajes.map(msg=>
            <div key={randdom()} style={{display:'flex',paddingLeft:10}}>
              <p style={{color:'green'}}>{msg.sender}</p>
              <p>&nbsp; &gt;&gt; &nbsp;</p>
              <p> {msg.mensaje} </p>
              
            </div>
            
          )
        }
      </div>

      <form onSubmit={sendMessage}>
        <p style={{color:"red"}}>{error}</p>
        <input type="text" name="" id="" />
      </form>

      </div>
    </div>
  )
}
