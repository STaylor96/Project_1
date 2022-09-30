// Import statements
const Product = require('../models/Product.model.js');

// Read all products
const findAllProducts = async () => await Product.find();

// Read a specific product by ID
const findProductById = async id => {
    try {
        const product = await Product.findById(id);

        if (product == null){
            throw {status: 204, msg: 'Unable to find product.'}
        }
        return product;
    } catch (err) {
        throw err;
    }
};

// Create new product
const createProduct = async productToSave => {
    try {
        const product = new Product(productToSave);
        await product.save();
        return product;
    } catch (err) {
        throw err;
    }
}

// Update extant product
const updateProduct = async (id, productToUpdate) => {
    try {
        const product = await Product.findByIdAndUpdate(id, productToUpdate);
        return product;
    } catch (err) {
        throw { status: 400, msg: err };
    }
};

// Delete product
const deleteProductById = async id => await Product.findByIdAndDelete(id);

// Export statements
module.exports = { findAllProducts, findProductById, createProduct, updateProduct, deleteProductById };