import { Router } from "express";
import { 
    register, 
    login, 
    getUserProfile, 
    updateUserProfile, 
    getUsers,
    deleteUser 
} from "../controllers/userController.js";
const router = Router();
import { protect, admin } from '../middleware/authMiddleware.js';


router.route('/').post(register).get(protect, admin, getUsers)
router.route('/login').post(login)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/:id').delete(protect, admin, deleteUser)


export default router;