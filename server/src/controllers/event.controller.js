import { Event } from "../models/event.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const createEvent = asyncHandler(async (req, res) => {
    // res.status(201).json({
    //     message: "OKKK",
    // })

    // console.log(req.body)
    const { title, description, location, date, categories, ticketPrice, totalSeats } = req.body

    //validation checks - not empty
    if (
        [title, description, location, date, categories, ticketPrice, totalSeats].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const event = await Event.create({
        title,
        description,
        location,
        date,
        organizer: req.user._id,
        categories,
        ticketPrice,
        totalSeats,
        availableSeats: totalSeats
    })

    if (!event) {
        throw new ApiError(500, "Something went wrong while creating the event")
    }

    return res.status(201).json(
        new ApiResponse(200, event, "Event created successfully")
    )

})



const getEventById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Search for events with a case-insensitive title match
    const event = await Event.findById(id)

    if (!event) throw new ApiError(500, "event not find")

    res.status(200).json(
        new ApiResponse(200, event, "Event get by titles")
    );
})





const getEventByTitle = asyncHandler(async (req, res) => {
    const { title } = req.params;

    // Search for events with a case-insensitive title match
    const event = await Event.findOne({
      title: { $regex: new RegExp(`^${title}$`, 'i') } // exact match, case-insensitive
    });

    if (!event) throw new ApiError(500, "event not find")

    res.status(200).json(
        new ApiResponse(200, event, "Event get by titles")
    );
})



const updateEvent = asyncHandler(async (req, res) => {
    const { location, date, ticketPrice, totalSeats } = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(
        req.params.eventId,
        {
            $set: {
                location,
                date,
                ticketPrice,
                totalSeats
            }
        },
        {
            new: true
        }
    );

    if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });

    res.status(200).json(
        new ApiResponse(200, updateEvent, "Event updated successfully")
    );
})


const deleteEvent = asyncHandler(async (req, res) => {
    console.log(req.params.eventId)
    const event = await Event.findById(req.params.eventId);
    if (!event) throw new ApiError(404, "Event not found")

    // Check if the event date has passed
    const currentDate = new Date();
    if (event.date < currentDate) {
        await Event.findByIdAndDelete(req.params.eventId);
        return res.status(200).json(
            new ApiResponse(200, event, "Event date has passed and it was automatically deleted")
        );
    }

    // If the event is still upcoming, perform the regular delete
    const deletedEvent = await Event.findByIdAndDelete(req.params.eventId);
    res.status(200).json(new ApiResponse(200, deletedEvent, "Event deleted successfully"));

})






export {
    createEvent,
    deleteEvent,
    getEventByTitle,
    getEventById,
    updateEvent
}