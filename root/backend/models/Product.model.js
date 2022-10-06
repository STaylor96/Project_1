// Import Statements
const mongoose = require('mongoose');

// Define schema
const Schema = mongoose.Schema;
const productSchema = new Schema({
    manufacturer: String,                                          // Brand
    name: String,                                                  // Product  - These could possibly be rolled into one
    category: {                                                    // To support advanced search features at a later date
        type: String,
        enum: ['Guitar', 'Bass', 'Amplifier/Effect', 'Accessory']  // This validation method requires the value of "category" to be one of these
    },
    price: Number,                                                      
    size: Number                                                   // Amount of warehouse storage space the product occupies
});

// Generate and export "Product"
const Product = mongoose.model('Product', productSchema, 'Products');
module.exports = Product;