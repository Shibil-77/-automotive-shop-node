import { Express, Request, Response } from "express";
import productSchema from "../models/productSchema";
const cloudinary = require("cloudinary");

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { product, price, stock, category, description } = req.body;
    if (req.body) {
      const newProduct = new productSchema({
        product,
        price,
        stock,
        category,
        description,
      });

      try {
        await newProduct.save();
      } catch (error) {
        res.status(500).json({ message: "data base error" });
      }

      res.status(200).json({ message: newProduct.id });
    }
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  console.log("hiiiii");

  try {
    const productData = await productSchema.find();
    if (productData) {
      res.status(200).json({ productData });
    }
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  console.log(req.params.id);
  try {
    const productData = await productSchema.findOneAndDelete({
      _id: req.params.id,
    });
    console.log(productData, "productData");
    if (productData) {
      res.status(200).json({ productData });
    }
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
};
