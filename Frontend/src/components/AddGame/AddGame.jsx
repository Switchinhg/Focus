import React from 'react'
import { UsarGame } from '../Context/GameContext'
import moment from 'moment'

export default function AddGame() {
  const {AddGame} = UsarGame()
  const onSubmit = (e) =>{
    e.preventDefault()

      const name = e.target[0].value
      const img = {
        banner:e.target[1].value,
        store:e.target[2].value,
        gameFootage:e.target[3].value
      }
      const video = e.target[4].value
      const description = e.target[5].value
      const price = e.target[6].value
      const tags = ''
      const releaseDate = e.target[7].value
      const pcMinSpecs =  {processor:'ryzen 7 3200X',
      ram:'16gb',
      video:'1060 3gb'}


    AddGame(name,img,video,description,price,tags,pcMinSpecs,releaseDate)




  }
  return (
    <div className='addGameWrap'>
        <h4>Add a Game</h4>
        <form onSubmit={onSubmit}>
          <div className='flex'>
              <label htmlFor="name">Game Name</label>
            <input type="text" name="name" id="name" placeholder='* Name' required />
          </div>
          <div>
            <label htmlFor="banner">Images</label>
            <div>
              <input type="text" name='banner' id='banner' placeholder='* Banner (1096x460)' required/>
              <input type="text" name='store' id='store' placeholder='* Store (400x150)'required />
              <input type="text" name='gameFootage' id='gameFootage' placeholder='* Store (800x500)'required />
            </div>
          </div>
            <p>video</p>
            <input type="text" name='video' id='video' placeholder='Video - YT' />
            <textarea name="description" id="description" cols="30" rows="10" required placeholder='Description'></textarea>
            <div>
            <input type="number" name="price" id="price" placeholder='Price (0 if free)' required />

            <input type="date" name='date' id='date' placeholder='DATE' required />
            </div>

            <input type="submit" value="Add Game" />
        </form>
        

    </div>
  )
}
