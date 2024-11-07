import { Router } from "express";
import { verfiyJWT } from '../middlewares/auth.mw.js'
import { bookEvent, cancelEventBooking, getUserBookings } from "../controllers/bookings.controller.js";

const router = Router()

router.route('/bookEvent/:eventId').post(verfiyJWT, bookEvent)
router.route('/cancelBookedEvent/:bookingId').delete(verfiyJWT, cancelEventBooking)
router.route('/getUserBookedEvent').get(verfiyJWT, getUserBookings)



export default router