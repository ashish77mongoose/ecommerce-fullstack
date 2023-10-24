import Category from "../models/Category.js";
import fs from "fs";
export const createCategory = async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ message: "No icon found" });
  const fileName = file.filename;
  let category = new Category({
    name: req.body.name,
    icon: fileName,
    color: req.body.color,
    description: req.body.description,
  });
  category = await category.save();

  if (!category)
    return res.status(400).json({ message: "the category cannot be created!" });

  res.status(201).json(category);
};
export const getCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res
      .status(500)
      .json({ message: "The category with the given ID was not found." });
  }
  res.status(200).json(category);
};
export const getAllCategory = async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.status(200).json(categoryList);
};
export const updateCategory = async (req, res) => {
  const oldCategory = await Category.findById(req.params.id);
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
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: iconToSet,
      color: req.body.color,
      description: req.body.description,
    },
    { new: true }
  );

  if (!category)
    return res.status(400).json({ message: "the category cannot be created!" });
  res.status(201).json(category);
};
export const deleteCategory = async (req, res) => {
  const oldCategory = await Category.findById(req.params.id);
  if (oldCategory) {
    fs.unlinkSync("./public/uploads/" + oldCategory.icon);
  }
  Category.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (category) {
        return res
          .status(200)
          .json({ success: true, message: "The category is deleted!" });
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
