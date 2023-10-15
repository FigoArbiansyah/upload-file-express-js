import express from "express";
import {
  getProducts,
  getProductById,
  saveProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/ProductController.js";
import { PRODUCT_URL } from "../helpers/utils.js";

const router = express.Router();

router.get(`${PRODUCT_URL}`, getProducts);
router.get(`${PRODUCT_URL}/:id`, getProductById);
router.post(`${PRODUCT_URL}`, saveProduct);
router.patch(`${PRODUCT_URL}/:id`, updateProduct);
router.delete(`${PRODUCT_URL}/:id`, deleteProduct);

export default router;
