import express from 'express';
import { addFlight } from '../controllers/flightController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addFlight);

export default router;
