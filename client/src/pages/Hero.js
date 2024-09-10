import React from 'react'
import bg from "../assets/temp.png"

export const Hero = () => {
    const uniName = localStorage.getItem('uniName');
  return (
    <div className='flex w-screen h-screen'>
        <img src={bg} className='w-screen h-screen'></img>
        <div className='w-screen h-screen absolute' style={{backgroundColor: "#000", opacity: 0.87}}>

        </div>
    </div>
  )
}
