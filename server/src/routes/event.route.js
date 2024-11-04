import { Router } from "express";
import { verfiyJWT } from '../middlewares/auth.mw.js'
import { createEvent } from "../controllers/event.controller.js";

const router = Router()

router.route('/create').post(verfiyJWT, createEvent)


export default router