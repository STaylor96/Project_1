// Import statements
const mongoose = require('mongoose');
const router = require('express').Router();
const { findAllWarehouses, findWarehouseById, updateWarehouse, createWarehouse} = require('../controllers/warehouse.controller.js');

// Middleware function
const validateObjectId = (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){  // If the object Id is invalid,
        res.status(204).send();                           // Send an HTTP 204 response
    } else {                                              // Otherwise,
        next();                                           // Proceed to warehouse-specific get or put request
    }
}

// GET request - Reads all warehouses
router.get('/', async (req, res) => {
    try {
        const warehouses = await findAllWarehouses();
        res.json(warehouses);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try{
        const warehouse = await createWarehouse(req.body);
        res.status(201).json(warehouse);
    } catch (err){
        res.status(err?.status ?? 500).json(err);
    }
});

// GET request - Reads an extant warehouse by Id
router.get('/:id', validateObjectId, async (req, res) => {
    try {
        const warehouse = await findWarehouseById(req.params.id);
        res.json(warehouse);
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

// PUT request - Updates an extant warehouse by Id
router.put('/:id', validateObjectId, async (req, res) => {
    try {
        const warehouse = await updateWarehouse(req.params.id, req.body);
        res.json();
    } catch {
        res.status(err?.status ?? 500).json(err);
    }
});

// Export statements
module.exports = router;