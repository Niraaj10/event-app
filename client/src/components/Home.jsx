import React from 'react'
import bg from '../assets/Images/pablo-heimplatz-ZODcBkEohk8-unsplash (1).jpg'
import EventCard from './EventCard'

const Home = () => {
  return (
    <>
      <div className='Home md:mx-10 lg:mx-10'>
        {/* Home */}

        <div className='group'>      

        <div className='relative z-0 '>
          <div className='absolute w-full text-white flex justify-center items-center z-10 mt-20'>
            <h1 className='text-logo logo-font text-[500px]'>Eventura</h1>
            {/* <p className='w-60'>Ignite Your Upcoming Memorable Event Experience</p> */}
          </div>
          <img src={bg} alt="HomeBg" className='w-[100vw] h-[30vh] md:h-[80vh] lg:h-[80vh] md:rounded-2xl lg:rounded-2xl object-cover z-0 static' />
        </div>

        <div className='flex justify-center items-center'>

          <div className='p-2 lg:p-9 bg-white mt-[-95px] md:mt-[-155px] lg:mt-[-155px] w-[88vw] md:w-[70vw] lg:w-[70vw] relative z-10 border rounded-xl flex gap-2 md:gap-4 lg:gap-4 justify-center  opacity-0 group-hover:opacity-100 transition-opacity duration-900'>
            <input type="text" placeholder='Enter your location' className='p-2 border w-[40vw] rounded-lg'/>
            <button className='bg-nav p-2 md:px-7 lg:px-7 text-white rounded-lg font-bold hover:scale-105 transition-transform duration-300 text-xs md:text-base lg:text-base'>Search Events In Your City </button>
          </div>

        </div>
        </div>

        <div className='Card-Section m-2 p-5  md:py-10 lg:py-10 flex flex-col gap-3 justify-center'>

          <div className='ml-4 font-bold text-gray-700 text-2xl'>The Best of Live Events</div>

          <div className='flex gap-2 md:gap-12 lg:gap-12 flex-wrap justify-start items-center'>
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
