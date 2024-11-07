import { Router } from "express";
import { verfiyJWT } from '../middlewares/auth.mw.js'
import { bookEvent, cancelEventBooking } from "../controllers/bookings.controller.js";

const router = Router()

router.route('/bookEvent/:eventId').post(verfiyJWT, bookEvent)
router.route('/bookEvent/:eventId').delete(verfiyJWT, cancelEventBooking)



export default router