import { Router } from 'express'
import { registerUser } from '../controllers/user.controller.js'

const router = Router()

router.route('/sign-up').post(registerUser)


export default router