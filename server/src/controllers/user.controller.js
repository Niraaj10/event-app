import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from '../models/user.model.js'
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { uploadOnCloudi } from "../utils/cloudinary.js"




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



const logoutUser = asyncHandler( async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            // $set: {
            //      refreshToken: undefined,
            // }
            $unset: {
                 refreshToken: 1,
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(
            200,
            {},
            "User logged out successfully"
        )
    )
})




const refreshAccessToken  = asyncHandler( async (req, res) => {

    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    
    try {
        const decodedRefToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
        
        const user = await User.findById(decodedRefToken?._id)
        
        if(!user) {
            throw new ApiError(401, "unauthorized request")
        }
    
        if ( incomingRefreshToken !== user?.refreshToken ) {
            throw new ApiError(401, "Refresh token is expired or used") 
        }
    
        const { accessToken, refreshToken } = await generateAccessandRefreshToken(user._id)
    
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
                { accessToken, refreshToken },
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh Token")
    }

})




const changeCurrentPassword = asyncHandler( async (req, res) => {
    const { oldPassword, newPassword } = req.body

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if(!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    return res
    .status(200)
    .json(
        new ApiResponse(200, {}, "Password changed successfully")
    )

})




const getCurrentUser = asyncHandler( async (req, res) => {
    return res
    .status(200)
    .json(
        new ApiResponse(200, req.user, "Current user fetched successfully") 
    )
})


const updateAccountDetails = asyncHandler( async (req, res) => {
    const { fullname, email } = req.body

    if(!fullname || !email) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullname,
                email
            }
        },
        {
            new: true
        }
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(200, user, "Account Details updated successfully")
    )
})



const uploadProfilePicture = asyncHandler( async (req, res) => {
    // console.log(req.files)
    
    // const profilPic = req.files
    const profilPic = req.file?.path

    if(!profilPic) {
        throw new ApiError(400, "Profile picture file is missing")
    }

    const profile =  await uploadOnCloudi(profilPic)

    if(!profile.url) {
        throw new ApiError(400, "Error while uploading Profile picture")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                profilePicture: profile.url
            }
        },
        { new: true }
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user,
            "Profile picture updated successfully"
        )
    )

})




const updateUserRole = asyncHandler( async (req, res) => {
    const { newRole } = req.body; 
    if (!['attendee', 'organizer'].includes(newRole)) {
      return res.status(400).json({ message: 'Invalid role. Use "attendee" or "organizer".' });
    }

      const user = await User.findById(req.user._id);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      user.role = newRole;
      await user.save();

      return res
      .status(200)
      .json(
          new ApiResponse(
              200,
              user,
              'User role updated successfully'
          )
      )
  });




  const userEventHistory = asyncHandler( async (req, res) => {
    //////

    
  })



export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails, 
    uploadProfilePicture,
    updateUserRole
}