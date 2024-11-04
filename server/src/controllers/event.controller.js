import { Event } from "../models/event.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const createEvent = asyncHandler( async (req, res) => {
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
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, event, "User registered successfully")
    )

})





export {
    createEvent,

}