import React from 'react'
import EventImg from "../assets/Images/redd-francisco-qMFSP1xYVTQ-unsplash.jpg"

const EventCard = () => {
  return (
    <>
      <div className='EventCard w-[20vw] p-2 shadow1 h-[65vh] rounded-2xl cursor-pointer'>
      {/* <div className='EventCard w-[20vw] p-1 h-[50vh] border rounded-2xl bg-nav'> */}
        {/* <div className='bg-white w-full h-full rounded-xl p-1'> */}
            <img src={EventImg} alt="" className=' rounded-xl object-cover h-[50vh] w-[19vw] ' />
            <div className='p-2 px-4 flex flex-col gap-2 text-gray-500'>
                <div className='font-bold text-gray-800'>All Star Standup Comedy</div>
                <div className='flex justify-between'>
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
