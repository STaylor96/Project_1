// Import Statements
const mongoose = require('mongoose');
const router = require('express').Router();
const { findAllProducts, findProductById, createProduct, updateProduct, deleteProductById} = require('../controllers/products.controller.js');

// Middleware function
const validateObjectId = (req, res, next) => {             
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){   // If the object Id is invalid,
        res.status(204).send();                            // Send an HTTP 204 response
    } else {                                               // Otherwise,
        next();                                            // Proceed to product-specific get, put, or delete request
    }
}

// GET request - Reads all products
router.get('/', async (req, res) => {
    const products = await findAllProducts();
    res.json(products);
});

// GET request - Reads a specific product by Id
router.get('/:id', validateObjectId, async (req, res) => {
    try {
        const product = await findProductById(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

// POST request - Creates a new product
router.post('/', async (req, res) => {
    try{
        const product = await createProduct(req.body);
        res.status(201).json(product);
    } catch (err){
        res.status(err?.status ?? 500).json(err);
    }
});

// PUT request - Updates an extant product by Id
router.put('/:id', validateObjectId, async (req, res) => {
    try {
        const product = await updateProduct(req.params.id, req.body);
        res.json();
    } catch {
        res.status(err?.status ?? 500).json(err);
    }
});

// DELETE request - Deletes an extant product by Id
router.delete('/:id', validateObjectId, async (req, res) => {
    try{
        await deleteProductById(req.params.id);
        res.send();
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

// Export statements
module.exports = router;