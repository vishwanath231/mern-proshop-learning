import { Router } from "express";
import { register, login, getUserProfile, updateUserProfile } from "../controllers/userController.js";
const router = Router();
import protect from '../middleware/authMiddleware.js';


router.route('/').post(register)
router.route('/login').post(login)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)


export default router;