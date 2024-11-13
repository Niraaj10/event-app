import { Router } from 'express'
import { getRecommendations } from '../controllers/eventSuggestions.controller'


const router = Router()

router.route('/eventSuggestion').post(getRecommendations)


export default router