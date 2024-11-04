import { Router } from "express";
import { verfiyJWT } from '../middlewares/auth.mw.js'
import { createEvent, deleteEvent } from "../controllers/event.controller.js";

const router = Router()

router.route('/create').post(verfiyJWT, createEvent)

router.route('/delete').delete(verfiyJWT, deleteEvent);


export default router