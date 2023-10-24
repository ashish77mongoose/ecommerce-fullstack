import {
  createSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getAllSubCategory,
  getSubCategory,
  updateSubCategory,
} from "../controllers/subCategories.js";
import express from "express";
import upload from "../middleware/upload.js";
const router = express.Router();

router.get(`/`, getAllSubCategories);
router.post(`/`, getAllSubCategory);
router.post("/add", upload.single("icon"), createSubCategory);
router.get("/:id", getSubCategory);
router.put("/:id", upload.single("icon"), updateSubCategory);
router.delete("/:id", deleteSubCategory);
export default router;
