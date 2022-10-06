// Import statements
const mongoose = require('mongoose');

// Define schema
const Schema = mongoose.Schema;
const warehouseSchema = new Schema({
    manager: String,                       // The name of the warehouse manager
    phone: String,                         // Contact information for the warehouse 
    location: String,
    capacity: {                             
        type: {
            current: Number,                    // Current storage occupied
            maximum: Number                     // Maximum storage capacity
        }
    },
    inventory: [{                           
        product: {
            type: mongoose.Types.ObjectId,  // This references the Product.model schema
            ref: 'Product'
        },
        quantity: Number                    // # of product stored at this warehouse
    }]
});

// Generate and export "Warehouse"
const Warehouse = mongoose.model('Warehouse', warehouseSchema, 'Warehouses');
module.exports = Warehouse;