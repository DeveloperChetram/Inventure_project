import express from "express";
import { protect } from '../middleware/auth.middleware.js';
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';

export const productRouter = express.Router();

productRouter.route('/')
    .get(getProducts)
    .post(protect, createProduct);

productRouter.route('/:id')
    .get(getProduct)
    .put(protect, updateProduct)
    .delete(protect, deleteProduct);