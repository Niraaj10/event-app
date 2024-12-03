import React from 'react'
import bg from '../assets/Images/pablo-heimplatz-ZODcBkEohk8-unsplash (1).jpg'

const Home = () => {
  return (
    <>
      <div className='mx-10'>
        {/* Home */}

        <div className='flex justify-center relative z-0'>
          <img src={bg} alt="" className='w-[90vw] h-[80vh] rounded-2xl object-cover z-0 static' />
        </div>

        <div className='flex justify-center items-center'>

          <div className='p-9 bg-white mt-[-155px] w-[70vw] relative z-10 border rounded-xl flex gap-4 justify-center'>
            <input type="text" placeholder='Enter your location' className='p-2 border w-[40vw] rounded-lg'/>
            <button className='bg-nav p-3 px-7 text-white rounded-lg font-bold hover:scale-105 transition-transform duration-300'>Search Events In Your City </button>
          </div>

        </div>
      </div>
    </>
  )
}

export default Home
