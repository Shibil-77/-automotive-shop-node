import express from "express";
import {
  addProduct,
  getAllProducts,
  deleteProduct,
  getProductData,
  editProductData,
} from "../controllers/product";

const authMiddleware = require("../middlewares/authMiddlewares");

const router = express.Router();

router.post("/addProduct", authMiddleware, addProduct);

router.get("/getAllProducts", authMiddleware, getAllProducts);

router.delete("/removeProduct/:id", authMiddleware, deleteProduct);
  
router.get("/getProductData/:id", authMiddleware, getProductData);

router.post("/editProduct/:id", authMiddleware, editProductData);

export default router;
