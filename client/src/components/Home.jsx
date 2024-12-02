import React from 'react'
import bg from '../assets/Images/pablo-heimplatz-ZODcBkEohk8-unsplash (1).jpg'

const Home = () => {
  return (
    <>
      <div>
        {/* Home */}

        <div className='flex justify-center '>
          <img src={bg} alt="" className='w-[90vw] h-[70vh] rounded-2xl object-cover' />
        </div>

      </div>
    </>
  )
}

export default Home
