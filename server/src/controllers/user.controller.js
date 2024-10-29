import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from '../models/user.model.js'
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"




const generateAccessandRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        // console.log("refreshToken :", refreshToken )
        // console.log("accessToken :", accessToken )

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        
        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh token")
    }
}




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



const loginUser = asyncHandler( async (req, res) => {
    
    const { email, password, username } = req.body

    if ( !(email || username) ) {
        throw new ApiError(400, "Username or email required")
    }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if(!user) {
        throw new ApiError(404, "User not found")
    }
    
    const isPasswordCorrectt = await user.isPasswordCorrect(password)
    
    if(!isPasswordCorrectt) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const { accessToken, refreshToken } = await generateAccessandRefreshToken(user._id)

    const loggedUser = await User.findById(user._id).select("-password -refreshToken")

    // cookies security
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedUser,
                accessToken,
                refreshToken
            },
            "User logged in successfully"
        )
    )
    
})



export {
    registerUser,
    loginUser,
}