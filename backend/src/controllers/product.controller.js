import { Product } from '../models/product.model.js';

// Create Product
export const createProduct = async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
};

// Get Products with Pagination (no search)
export const getProducts = async (req, res) => {
    const { page = 1, limit = 10, search = '' } = req.query;

    // Create a query object. If search exists, use regex for a case-insensitive search.
    const query = search ? { name: { $regex: search, $options: "i" } } : {};

    const products = await Product.find(query)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

    const count = await Product.countDocuments(query);

    res.json({
        products,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page),
    });
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