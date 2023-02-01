import React from 'react'

export default function Loading({height}) {
    console.log(height)
    if(height) return <div style={{minHeight:height}}>Loading...</div>
  return (
    <div className='loadingWrap'>Loading...</div>
  )
}
