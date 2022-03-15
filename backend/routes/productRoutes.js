import { Router } from "express";
const router = Router();
import { protect, admin } from '../middleware/authMiddleware.js';
import { 
    getProductById,
    getProducts, 
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview 
} from "../controllers/productController.js";


router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id/review').post(protect, createProductReview)
router.
route('/:id')
.get(getProductById)
.delete(protect, admin, deleteProduct)
.put(protect, admin, updateProduct)


export default router;