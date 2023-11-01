import Category from "../models/Category.js";
import SubCategory from "../models/SubCategory.js";
import Product from "../models/Product.js";
import fs from "fs";
import mongoose from "mongoose";
export const createProduct = async (req, res) => {
  const category = await SubCategory.findById(req.body.subCategory);
  if (!category) return res.status(400).send("Invalid Category");
  const files = req.files;
  if (!files) return res.status(400).json({ message: "No images uploaded" });
  let imagesPaths = [];
  if (files) {
    files.map((file) => {
      imagesPaths.push(file.filename);
    });
  }
  let product = new Product({
    ...req.body,
    images: imagesPaths,
  });

  product = await product.save();

  if (!product)
    return res.status(500).json({ message: "Unable to create product" });
  res.status(201).json(product);
};
export const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id).populate("subCategory");

  if (!product) {
    res.status(500).json({ message: "Product not found" });
  }
  res.status(200).json(product);
};
export const getFeaturedProduct = async (req, res) => {
  const product = await Product.find({ isFeatured: true }).populate(
    "subCategory"
  );

  if (!product) {
    res.status(500).json({ message: "Product not found" });
  }
  res.status(200).json(product);
};
export const getBrands = async (req, res) => {
  const product = await Product.aggregate([
    {
        $group: {
          _id: "$brand",
        //   detail: { $push : "$$ROOT" },
        },
      },
      { 
        $addFields: { brandName: "$_id" }
      },
      {
        $project: { _id: 0 }
      }
     
  ]);

  if (!product) {
    res.status(500).json({ message: "Products not found" });
  }
  res.status(200).json(product);
};
export const getStats = async (req, res) => {
    const productCount = await Product.find().countDocuments();
  const brands = await Product.aggregate([
    {
        $group: {
          _id: "$brand",
        },
        
      },
      {
        "$count": "total"
      }
      
     
  ]);

  if (!brands) {
    res.status(500).json({ message: "Products not found" });
  }
  res.status(200).json({totalProduct:productCount,totalBrands:brands});
};
export const getAllProduct = async (req, res) => {
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }

  const productList = await Product.find(filter).populate("subCategory");

  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.status(200).json(productList);
};
export const updateProduct = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid Product Id" });
  }
  const oldProduct = await Product.findOne({ _id: req.params.id });
  const oldImages = oldProduct.images;
  const files = req.files;
  let imagesPaths = [...oldImages];
  if (files) {
    let totalImages = files.length + oldImages.length;
    if (totalImages > 10) {
      res.status(500).json({ message: "Total 10 Images are allowed " });
    } else {
      files.map((file) => {
        imagesPaths.push(file.filename);
      });
    }
  }
  let data = { ...req.body };
  delete data.images;
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      ...data,
      images: imagesPaths,
    },
    { new: true }
  );
  if (!product)
    return res.status(500).json({ message: "The product cannot be updated!" });

  res.status(201).json(product);
};
export const deleteProduct = async (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (product) {
        return res.status(200).json({
          success: true,
          message: "the product is deleted!",
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "product not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
};
export const deleteProductImage = async (req, res) => {
  const imgPath = req.body.imgPath;
  const oldProduct = await Product.findOne({ _id: req.params.id });
  const oldImages = oldProduct.images;
  const imagesPaths = oldImages.filter((file) => {
    if (file === imgPath) {
      fs.unlinkSync("./public/uploads/" + file);
      return false;
    } else {
      return true;
    }
  });
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      images: imagesPaths,
    },
    { new: true }
  );
  if (!product) return res.status(500).send("The images cannot be deleted!");
  res.status(200).json({ success: true });
};
