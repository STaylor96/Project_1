import axios from 'axios';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export const WarehouseForm = ({warehouseLocation, warehouseManager, warehousePhone, warehouseInventory, warehouseCapacityMax, warehouseCapacityCur, setWarehouse}) => {


    const url = useLocation();
    const axiosURL = `http://localhost:9000${url.pathname}`;

    const [productData, setProductData] = useState({
        product: "",
        quantity: 0,
    }, [warehouseLocation])

    const [isEdit, setIsEdit] = useState(false)

    class InputError extends Error {
        name = 'InputError';
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let res = '';
        try {
            if(productData.quantity < 0) { //invalid ID ???
                throw new InputError("Invalid data");
            }

            if(!isEdit) //Add product
            {
                for (let product of warehouseInventory)
                {
                    if(product.product === productData.product)
                        throw new InputError("Invalid data");
                }
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

            } else {
                let index = 0;
                let productIndex = 0;
                let willDelete = false;
                for (let product of warehouseInventory)
                {
                    if(product.product === productData.product)
                    {  
                        product.quantity = productData.quantity
                        if (product.quantity === 0)
                        {
                            willDelete = true;
                            productIndex = index;
                        }
                    } 
                    index++; 
                }
                if (willDelete)
                {
                    warehouseInventory.splice(productIndex, 1);
                    willDelete = false;
                }
            
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
            axios.get(axiosURL)
                .then(res => setWarehouse(res.data))
                .catch(err => console.error(err));

            event.target.reset();
            handleClear();
        } catch (err) {
            console.log(err);
        }

    }

    const handleClear = () => {
        console.log(warehouseInventory);
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