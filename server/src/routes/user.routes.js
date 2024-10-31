import { Router } from 'express'
import { changeCurrentPassword, getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetails, uploadProfilePicture } from '../controllers/user.controller.js'
import { verfiyJWT } from '../middlewares/auth.mw.js'
import upload from '../middlewares/multer.mw.js'

const router = Router()

router.route('/sign-up').post(registerUser)
router.route('/sign-in').post(loginUser)
router.route('/logout').post(verfiyJWT, logoutUser)

router.route('/refreshtoken').post(refreshAccessToken)
router.route('/changepassword').post(verfiyJWT, changeCurrentPassword)
router.route('/currentuser').get(verfiyJWT, getCurrentUser)
router.route('/updateuser').patch(verfiyJWT, updateAccountDetails)
router.route('/uploadProfilePicture').patch(verfiyJWT, upload.single("profilePicture"), uploadProfilePicture)





export default router