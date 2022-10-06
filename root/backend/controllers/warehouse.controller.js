// Import statements
const Warehouse = require('../models/Warehouse.model.js');

// Read all warehouses
const findAllWarehouses = async () => await Warehouse.find().populate('inventory');

const createWarehouse = async warehouseToSave => {
    try {
        const warehouse = new Warehouse(warehouseToSave);
        await warehouse.save();
        return warehouse;
    } catch (err) {
        throw err;
    }
}

// Read a specific warehouse by ID number
const findWarehouseById = async id => {
    try {
        const warehouse = await Warehouse.findById(id).populate('inventory');

        if (product == null){
            throw {status: 204, msg: 'Unable to find warehouse.'}
        }
        return warehouse;
    } catch (err) {
        throw err;
    }
};

// Update extant warehouse
const updateWarehouse = async (id, warehouseToUpdate) => {
    try {
        const warehouse = await Warehouse.findByIdAndUpdate(id, warehouseToUpdate);
        return warehouse;
    } catch (err) {
        throw { status: 400, msg: err };
    }
};

// Export statements
module.exports = { findAllWarehouses, findWarehouseById, updateWarehouse, createWarehouse }