import React from 'react'
import bg from "../assets/temp.png"
import { Link } from 'react-router-dom';

export const Hero = () => {
    const uniName = localStorage.getItem('uniName');
  return (
    <div className='flex w-screen h-screen'>
        <img src={bg} className='w-screen h-screen'></img>
        <div className='w-screen h-screen absolute' style={{backgroundColor: "#000", opacity: 0.87}}>
        </div>
        <div className='w-screen h-screen absolute text-white flex justify-center'>
            <div className='flex flex-col justify-center items-center gap-4'>
                <div className='text-6xl font-serif font-bold'>EduSchedular</div>
                {
                    uniName ? <Link to="/home"><div className='bg-black w-fit py-2 px-5 rounded-lg'>Explore More </div></Link>
                    : <Link to="/login"><div className='bg-black w-fit py-2 px-5 rounded-lg'>Explore More </div></Link>
                }
            </div>
        </div>
    </div>
  )
}
