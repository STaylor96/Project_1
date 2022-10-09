import axios from 'axios';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export const WarehouseForm = ({warehouseLocation, warehouseManager, warehousePhone, warehouseInventory, warehouseCapacityMax, warehouseCapacityCur, setWarehouse}) => {

    // Gather URL for axios requests
    const url = useLocation();
    const axiosURL = `http://localhost:9000${url.pathname}`;

    const [productData, setProductData] = useState({
        product: "",
        quantity: 0,
    }, [])

    // State of toggle box
    const [isEdit, setIsEdit] = useState(false)

    // Will be called in case of invalid data submissions
    class InputError extends Error {
        name = 'InputError';
    }

    const handleSubmit = async (event) => {
        // Prevent automatic refresh
        event.preventDefault();
        let res = '';

        // Prevent invalid data
        try {
            if(productData.quantity < 0) { //invalid ID ???
                throw new InputError("Invalid data");
            }

            // Prevent exceeding capacity
            let count = 0;
            for (let product of warehouseInventory)
            {
                count += product.quantity;
            }
            // Count is now the current inventory level

            if(!isEdit) //Add product
            {
                // Prevent new product from breaking capacity
                if ( count + productData.quantity > warehouseCapacityMax)
                    throw new InputError(`Cannot exceed capacity. Current inventory is ${count}. Please insert amount of ${warehouseCapacityMax - count} or less.`);
                // Scan warehouse and prevent "adding" a duplicate entry
                for (let product of warehouseInventory)
                {
                    if(product.product === productData.product)
                        throw new InputError("Invalid data");
                }
                // Fire off put request to database
                res = await axios.put(axiosURL, {
                    manager: warehouseManager,
                    phone: warehousePhone,
                    location: warehouseLocation,
                    capacity: {
                        current: warehouseCapacityCur,
                        maximum: warehouseCapacityMax
                    },
                    inventory: [...warehouseInventory, productData]
                });
            // Edit product
            } else {
                let index = 0;          // Index for upcoming loop
                let productIndex = 0;   // Index for product location in warehouse array
                let willDelete = false; // Flag for deletion 
                
                //Scan warehouse
                for (let product of warehouseInventory)
                {
                    // If the product found is the selected one
                    if(product.product === productData.product)
                    {  
                        // Set a placeholder value
                        let oldCount = count - product.quantity;

                        console.log(oldCount);
                        console.log(productData.quantity);
                        console.log(warehouseCapacityMax);
                        if ( oldCount + productData.quantity > warehouseCapacityMax)
                        {
                            throw new InputError(`Cannot exceed capacity. Maximum capacity is ${warehouseCapacityMax}. This product's quantity cannot currently exceed ${warehouseCapacityMax - oldCount}.`)
                        }

                        // Update the quantity
                        product.quantity = productData.quantity
                        // And if it's 0, set deletion flag to 0 and record product's index
                        if (product.quantity === 0)
                        {
                            willDelete = true;
                            productIndex = index;
                        }
                    } 
                    index++; 
                }
                // Now, if the deletion flag was checked
                if (willDelete)
                {
                    // Remove that product from inventory
                    warehouseInventory.splice(productIndex, 1);
                    // And reset the flag
                    willDelete = false;
                }
                
                // Fire off put request with appropriate data
                res = await axios.put(axiosURL, {
                    manager: warehouseManager,
                    phone: warehousePhone,
                    location: warehouseLocation,
                    capacity: {
                        current: warehouseCapacityCur,
                        maximum: warehouseCapacityMax
                    },
                    inventory: [...warehouseInventory]
                });   
            }
            // Re-fetch data
            axios.get(axiosURL)
                .then(res => setWarehouse(res.data))
                .catch(err => console.error(err));

            // Reset and clear form
            event.target.reset();
            handleClear();
        } catch (err) {
            console.log(err);
        }

    }

    const handleClear = () => {
        setProductData({
            quantity: 0
        });
    }

    const handleToggle = () => {
        setIsEdit(!isEdit);
    }


    return (
        <>
            <h2>Inventory Controls</h2>
            <form onSubmit={handleSubmit}>
            <div>
                <input type="checkbox" id="add" onChange={handleToggle}/>
                <label htmlFor="add">Toggle Edit</label>  
            </div>
            <div>
                <div>
                    <label htmlFor="product-id">Id: </label>
                    <input
                    id="product-id"
                    value={productData.product}
                    onChange={e => setProductData({...productData, product: e.target.value})}
                    />
                </div>
                <label htmlFor="quantity">Quantity: </label>
                <input 
                    id="quantity"
                    type="number"
                    value={productData.quantity}
                    onChange={e => setProductData({...productData, quantity: e.target.value})}
                    />
            </div>
            <div>
                <button type="reset" onClick={handleClear}>Reset</button>
                <button>Submit</button>
            </div>
            </form>
        </>
    );
}