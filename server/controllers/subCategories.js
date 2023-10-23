import Category from "../models/Category.js";
import SubCategory from "../models/SubCategory.js";
import fs from "fs";
export const createSubCategory = async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ message: "No icon found" });
  const fileName = file.filename;
  let category = new SubCategory({
    name: req.body.name,
    icon: fileName,
    color: req.body.color,
    category: req.body.category,
    description: req.body.description,
  });
  category = await category.save();

  if (!category)
    return res.status(400).json({ message: "the category cannot be created!" });

  res.status(201).json(category);
};
export const getSubCategory = async (req, res) => {
  const category = await SubCategory.findById(req.params.id);
  if (!category) {
    res
      .status(500)
      .json({ message: "The category with the given ID was not found." });
  }
  res.status(200).json(category);
};
export const getAllSubCategory = async (req, res) => {
  const { id } = req.body;
  const categoryList = await SubCategory.find({ category: id });

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.status(200).json(categoryList);
};
export const updateSubCategory = async (req, res) => {
  const oldCategory = await SubCategory.findById(req.params.id);
  let iconToSet;
  const file = req.file;
  if (file) {
    const fileName = file.filename;
    if (fileName) {
      fs.unlinkSync("./public/uploads/" + oldCategory.icon);
      iconToSet = fileName;
    }
  } else {
    iconToSet = req.body.icon;
  }
  const category = await SubCategory.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: iconToSet,
      color: req.body.color,
      category: req.body.category,
      description: req.body.description,
    },
    { new: true }
  );

  if (!category)
    return res.status(400).json({ message: "the category cannot be created!" });
  res.status(201).json(category);
};
export const deleteSubCategory = async (req, res) => {
  SubCategory.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (category) {
        return res
          .status(200)
          .json({ success: true, message: "the category is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "category not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
};
