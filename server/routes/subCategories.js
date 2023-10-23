import {
  createSubCategory,
  deleteSubCategory,
  getAllSubCategory,
  getSubCategory,
  updateSubCategory,
} from "../controllers/subCategories.js";
import express from "express";
import upload from "../middleware/upload.js";
const router = express.Router();

router.post(`/`, getAllSubCategory);
router.get("/:id", getSubCategory);
router.post("/", upload.single("icon"), createSubCategory);
router.put("/:id", upload.single("icon"), updateSubCategory);
router.delete("/:id", deleteSubCategory);
export default router;
