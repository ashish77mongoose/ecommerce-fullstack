import express from "express";
const router = express.Router();
import upload from "../middleware/upload.js";
import { createProduct, deleteProduct, deleteProductImage, getAllProduct, getProduct, updateProduct, updateProductImages } from "../controllers/products.js";


router.get(`/`, getAllProduct)
router.get(`/:id`, getProduct)
router.post(`/`, upload.array('images',10), createProduct)
router.post(`/`, upload.array('images',10), createProduct)
router.put('/:id', updateProduct)
router.delete('/:id',deleteProduct)
router.put('/images/:id', upload.array('images', 10), updateProductImages)
router.put('/delete-product-image/:id', deleteProductImage)




export default router;