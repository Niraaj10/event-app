import { Router } from "express";
import { verfiyJWT } from '../middlewares/auth.mw.js'
import { createEvent, deleteEvent, getEventById, getEventByTitle, updateEvent } from "../controllers/event.controller.js";

const router = Router()

router.route('/create').post(verfiyJWT, createEvent)
router.route('/delete/:eventId').delete(verfiyJWT, deleteEvent);
router.route('/updateEvent/:eventId').patch(verfiyJWT, updateEvent);
router.route('/byTitle/:title').get(verfiyJWT, getEventByTitle);
router.route('/byId/:id').get(verfiyJWT, getEventById);



export default router