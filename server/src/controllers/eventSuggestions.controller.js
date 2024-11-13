import asyncHandler from 'express-async-handler';
import Event from '../models/Event.js';
import Booking from '../models/Booking.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';


export const getRecommendations = asyncHandler(async (req, res) => {

        const pastBookings = await Booking.find({ user: req.user?._id }).populate('event');

        if (!pastBookings.length) {
            throw new ApiError(404, "No past bookings found to generate recommendations");
        }

        // Collect preferred categories and locations
        const preferredCategories = new Set();
        const preferredLocations = new Set();
        
        pastBookings.forEach(booking => {
            if (booking.event.categories) {
                preferredCategories.add(booking.event.categories);
            }
            if (booking.event.location) {
                preferredLocations.add(booking.event.location);
            }
        });

        // Convert Sets to Arrays for querying
        const categoryArray = Array.from(preferredCategories);
        const locationArray = Array.from(preferredLocations);

        // Find recommended events matching the preferred categories and locations
        const recommendedEvents = await Event.find({
            $or: [
                { categories: { $in: categoryArray } },
                { location: { $in: locationArray } }
            ],
            availableSeats: { $gt: 0 } 
        });

        if (!recommendedEvents.length) {
            throw new ApiError(404, "No recommended events found based on your preferences");
        }

        res.status(200).json(new ApiResponse(200, recommendedEvents, "Recommendations fetched successfully"));
});


export default {
    getRecommendations
};
