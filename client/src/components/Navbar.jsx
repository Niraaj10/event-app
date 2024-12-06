import React from 'react'

const Navbar = () => {
  return (
    <>
      <div className='Navbar m-2 md:m-5 lg:m-5 border rounded-2xl bg-nav text-white'>

        <div className='flex justify-between items-center p-4 md:px-12 lg:px-12'>
            <div className="md:pr-14 lg:pr-14 font-semibold lg:font-bold text-sm md:text-lg lg:text-lg">Events</div>
            <div className="logo-font font-extrabold text-2xl md:text-5xl lg:text-5xl">Eventura</div>
            <div className="flex gap-2 justify-center items-center">
              <button className='border-2 p-2 px-4 rounded-lg text-sm lg:text-base hidden md:block lg:block'>Login</button>
              <button className='bg-white text-[#892eff] font-semibold text-sm lg:text-base lg:font-bold p-1 md:p-2 lg:p-2 md:px-4 lg:px-4 rounded-lg'>Signup</button>
            </div>
        </div>

      </div>
    </>
  )
}

export default Navbar
