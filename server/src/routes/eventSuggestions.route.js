import { Router } from 'express'
import { getRecommendations } from '../controllers/eventSuggestions.controller.js'


const router = Router()

router.route('/suggestion').get(getRecommendations)


export default router