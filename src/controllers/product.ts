import { Express, Request, Response } from "express";
import productSchema from "../models/productSchema";
const cloudinary = require("cloudinary");

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { product, price, stock, category, description,images } = req.body.formData;
    if (req.body) {
      const newProduct = new productSchema({
        product,
        price,
        stock,
        category,
        description,
        userId: req.body.userId,
        images
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
  try {
    const productData = await productSchema.find({userId: req.body.userId});
    if (productData) {
      res.status(200).json({ productData });
    }
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productData = await productSchema.findOneAndDelete({
      _id: req.params.id,
    });
    if (productData) {
      res.status(200).json({ productData });
    }
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
};

export const getProductData = async (req: Request, res: Response) => {
  try {
    const productData = await productSchema.findOne({
      _id: req.params.id,
    });
    if (productData) {
      res.status(200).json({ productData });
    }
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
};

export const editProductData = async (req: Request, res: Response) => {
  try {
    const productData = await productSchema.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (productData) {
      res.status(200).json({ productData });
    }
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
};
