import express from "express";
const router = express.Router();

import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    logUserActivity
 } from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js"; 


router.post('/auth', authUser);
router.post('/', registerUser);
router.post('/logout', logoutUser);
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

// Add protect middleware to logUserActivity route
router.route('/activity').post(protect, logUserActivity);

export default router;