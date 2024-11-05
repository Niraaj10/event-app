import { ApiError } from "../utils/ApiError.js"
import { Bookings } from '../models/bookings.model.js'
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { Event } from "../models/event.model.js";




const checkAvailableSeats = async (eventId) => {
    const event = await Event.findById(eventId);
    if (!event) throw new Error('Event not found');
    return event.availableSeats > 0;
};


const bookEvent = asyncHandler(async (req, res) => {
    const { eventId } = req.params;
    
    // Check seat availability
    const hasAvailableSeats = await checkAvailableSeats(eventId);
    if (!hasAvailableSeats) throw new ApiError(400, "Event is fully booked")

    // Proceed with booking
    const booking = await Bookings.create({
      user: req.user?._id,
      event: eventId,
      ticketCount: ticketCount+1,
      paymentStatus: 'pending',
    });

    if (!booking) {
        throw new ApiError(500, "Something went wrong while creating event")
    }

    // Update event available seats
     const updatedEventSeatCount = await Event.findByIdAndUpdate(eventId, { $inc: { availableSeats: -1 } });

     if (!updatedEventSeatCount) {
        throw new ApiError(500, "Something went wrong while Updating Event Seats Count")
    }


    res.status(201).json(
        new ApiResponse(200, booking, "Event booked successfully")
    )
})





export {
    bookEvent
}