import { Router } from "express";
import { verfiyJWT } from '../middlewares/auth.mw.js'
import { bookEvent } from "../controllers/bookings.controller.js";

const router = Router()

router.route('/bookEvent/:eventId').post(verfiyJWT, bookEvent)



export default router