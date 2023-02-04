import React from 'react'

export default function Loading({height}) {
    console.log(height)
    if(height) return <div style={{minHeight:height}}></div>
  return (
    <div className='loadingWrap'></div>
  )
}
