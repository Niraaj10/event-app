import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from '../models/user.model.js'
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"


const registerUser = asyncHandler( async (req, res) => {
    // res.status(201).json({
    //     message: "OKKK",
    // })
    
    // console.log(req.body)
    const { username, email, password } = req.body
    //  console.log("username: ", username)
    
    //validation checks - not empty
    if (
        [username, email, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    
    const existedUser = await User.findOne({
        $or: [{ username }, { email }],
    })

    if (existedUser) {
        throw new ApiError(409, "Username or email already exists")
    }

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password,
    })

    const createdUser = await User.findById(user._id).select(
        // to remove this field
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, user, "User registered successfully")
    )

})

export {
    registerUser
}