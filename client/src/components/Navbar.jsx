import React from 'react'

const Navbar = () => {
  return (
    <>
      <div className='navbar m-5 border rounded-2xl bg-nav text-white'>

        <div className='flex justify-between items-center p-4 px-12'>
            <div className="pr-14 font-bold text-lg">Events</div>
            <div className="logo-font font-extrabold text-5xl">Eventura</div>
            <div className="flex gap-2 justify-center items-center">
              <button className='border-2 p-2 px-4 rounded-lg'>Login</button>
              <button className='bg-white text-[#892eff] font-bold p-2 px-4 rounded-lg'>Signup</button>
            </div>
        </div>

      </div>
    </>
  )
}

export default Navbar
