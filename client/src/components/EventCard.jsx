import React from 'react'
import EventImg from "../assets/Images/redd-francisco-qMFSP1xYVTQ-unsplash.jpg"

const EventCard = () => {
  return (
    <>
      <div className='EventCard w-[42vw] md:w-[20vw] lg:w-[20vw] p-2 shadow1 h-[41vh] md:h-[65vh] lg:h-[65vh] rounded-2xl cursor-pointer overflow-hidden'>
      {/* <div className='EventCard w-[20vw] p-1 h-[50vh] border rounded-2xl bg-nav'> */}
        {/* <div className='bg-white w-full h-full rounded-xl p-1'> */}
            <img src={EventImg} alt="" className=' rounded-xl object-cover h-[30vh] md:h-[50vh] lg:h-[50vh] w-[38vw] md:w-[19vw] lg:w-[19vw] ' />
            <div className='md:p-2 lg:p-2 md:px-4 lg:px-4 flex flex-col md:gap-2 lg:gap-2 text-gray-500'>
                <div className='font-semibold md:font-bold lg:font-bold text-sm lg:text-base text-gray-800'>All Star Standup Comedy</div>
                <div className='flex text-sm md:text-base lg:text-base justify-between'>
                    <div>Pune</div>
                    <div>Sat, 11 Oct</div>
                </div>
                <div className='font-semibold'>₹ 599</div>
            </div>
        {/* </div> */}
      </div>
    </>
  )
}

export default EventCard
