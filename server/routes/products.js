import express from "express";
const router = express.Router();
import upload from "../middleware/upload.js";
import {
  createProduct,
  deleteProduct,
  deleteProductImage,
  getAllProduct,
  getBrands,
  getFeaturedProduct,
  getProduct,
  getStats,
  updateProduct,
} from "../controllers/products.js";

router.get(`/`, getAllProduct);
router.get(`/featured`, getFeaturedProduct);
router.get(`/stats`, getStats);
router.get(`/brands`, getBrands);
router.get(`/:id`, getProduct);
router.post(`/`, upload.array("images", 10), createProduct);
router.put("/:id",upload.array("images", 10), updateProduct);
router.delete("/:id", deleteProduct);
router.put("/delete-product-image/:id", deleteProductImage);

export default router;
