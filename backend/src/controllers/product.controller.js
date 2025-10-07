import { Product } from '../models/product.model.js';

// Create Product
export const createProduct = async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
};

// Get Products with Pagination (no search)
export const getProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const products = await Product.find().limit(limit).skip((page - 1) * limit);
    const count = await Product.countDocuments();
    res.json({ products, totalPages: Math.ceil(count / limit), currentPage: page });
};

// Get a single product
export const getProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
};

// Update a product
export const updateProduct = async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
};

// Delete a product
export const deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).send();
};