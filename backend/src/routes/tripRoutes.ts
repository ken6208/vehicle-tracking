import express from 'express'
import * as MapController from '../controllers/MapController'
const router = express.Router()

router.get('/trips', MapController.trips)
router.get('/trip/:id', MapController.trip)
router.post('/trip/new', MapController.createTrip)
router.put('/trip/:id', MapController.updateTrip)
router.delete('/trip/:id', MapController.deleteTrip)

export default router
