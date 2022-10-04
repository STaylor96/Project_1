// Import statements
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize the application
const app = express();
app.use(cors());
app.use(express.json());

// Initialize the application routing
app.use('/products', require('./routes/product.route.js'));
app.use('/warehouses', require('./routes/warehouse.route.js'));


/*
**************************************************************************************
* NOTE: The following code relies on a .env file to supply the following variables:  *
* MONGO_URI - A connection string for the specified MongoDB instance                 *
* PORT      - The port to which the HTTP requests will be listed - 9000 for this app *
**************************************************************************************
*/

// Connect to the database
const connectToMongo = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);    //If connection succeeds
        console.log('Successfully connected to MongoDB.') //Print message
    } catch (err) {                                       // If connection fails
        console.error(err);                               // Log error message
        process.exit(1);                                  // Immediately kill the server
    }
}
connectToMongo();

// Define the port used by the app
app.listen(process.env.PORT || 8080, () => {
    console.log(`Listening on port ${process.env.PORT || 8080}`);
});