import { createCategory, deleteCategory, getAllCategory, getCategory, updateCategory } from "../controllers/categories.js";
import express from "express";
import upload from "../middleware/upload.js";
const router = express.Router();

router.get(`/`,   getAllCategory )
router.get('/:id', getCategory)
router.post('/',upload.single('icon'),createCategory )
router.put('/:id',upload.single('icon'),updateCategory)
router.delete('/:id', deleteCategory)
export default router;