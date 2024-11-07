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
        ticketCount: ticketCount + 1,
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





const cancelEventBooking = asyncHandler(async (req, res) => {
    const { bookingId } = req.params;

    if (booking.user.toString() !== req.user._id.toString()) {
        throw new ApiError(403, 'You are not authorized to cancel this booking');
    }

    const booking = await Bookings.findById(bookingId).populate('event');
    if (!booking) throw new ApiError(404, "Booking not found")

    const bookingDeletionResult = await booking.deleteOne();
    if (!bookingDeletionResult) {
        throw new ApiError(500, 'Something went wrong while deleting the booking');
    }

    const eventId = booking.event._id;
    const updatedEventSeatCount = await Event.findByIdAndUpdate(eventId, { $inc: { availableSeats: +1 } });
    if (!updatedEventSeatCount) {
        throw new ApiError(500, 'Something went wrong while updating event seat count');
    }

    res.status(200).json(
        new ApiResponse(200, booking, "Event booking canceled successfully")
    )
})





const getUserBookings = asyncHandler(async (req, res) => {
    // Find bookings for the authenticated user
    const bookings = await Bookings.aggregate([
        {
            $match: { user: req.user._id }
        },
        {
            $lookup: {
                from: 'events',
                localField: 'event',
                foreignField: '_id',
                as: 'eventDetails'
            }
        },
        {
            $unwind: '$eventDetails'
        },
        {
            $project: {
                _id: 1,
                event: 1,
                ticketCount: 1,
                qrCode: 1,
                paymentStatus: 1,
                checkedIn: 1,
                'eventDetails.title': 1,
                'eventDetails.date': 1,
                'eventDetails.location': 1
            }
        }
    ]);

    if (!bookings.length) {
        throw new ApiError(404, 'No bookings found');
    }

    res.status(200).json(
        new ApiResponse(200, bookings, 'User bookings retrieved successfully')
    );
});






export {
    bookEvent,
    cancelEventBooking,
    getUserBookings
}