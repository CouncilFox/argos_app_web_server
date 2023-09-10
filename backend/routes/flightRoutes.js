import express from 'express';
import { addFlight, getUserFlights } from '../controllers/flightController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addFlight);

router.route('/user/:userId').get(protect, getUserFlights);


export default router;
