import { Router } from 'express'
import { loginUser, logoutUser, registerUser } from '../controllers/user.controller.js'
import { verfiyJWT } from '../middlewares/auth.mw.js'

const router = Router()

router.route('/sign-up').post(registerUser)
router.route('/sign-in').post(loginUser)
router.route('/logout').post(verfiyJWT, logoutUser)





export default router