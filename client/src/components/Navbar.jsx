import React from 'react'

const Navbar = () => {
  return (
    <>
      <div className='Navbar mb-7 mx-8 border-b'>

        <div className='flex justify-between items-center p-4 md:px-3 lg:px-3'>
            <div className="logo-font text-logo font-extrabold text-2xl md:text-5xl lg:text-5xl">Eventura</div>
            <div className="flex gap-2 justify-center items-center">
            <div className="pr-4 text-sm md:text-lg lg:text-lg">Events</div>
              <button className=' bg-nav text-white p-2 px-4 rounded-lg text-sm lg:text-base hidden md:block lg:block'>Login</button>
              <button className='bg-white p-1 md:p-2 lg:p-2 md:px-4 lg:px-4 rounded-lg'>Signup</button>
            </div>
        </div>

      </div>
    </>
  )
}

export default Navbar
