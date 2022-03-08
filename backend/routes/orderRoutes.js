import { Router } from "express";
import { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders } from "../controllers/orderController.js";
const router = Router();
import { protect }from '../middleware/authMiddleware.js';


router.route('/').post(protect, addOrderItems)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)


export default router;