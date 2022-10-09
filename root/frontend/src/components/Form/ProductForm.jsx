import axios from 'axios';
import { useState } from 'react';

// Populates the drop-down list
const category = [
    <option>Select a category...</option>,
    <option>Guitar</option>,
    <option>Bass</option>,
    <option>Amplifier/Effect</option>,
    <option>Accessory</option>
];

// Called to prevent invalid user data
class InputError extends Error {
    name = 'InputError';
}

export const ProductForm = ({setProductList}) => {

    const [productData, setProductData] = useState({
        productID: "",
        productManufacturer: '',
        productName: '',
        productCategory: '',
        productPrice: 0.00,
        productSize: 0
    })

    // Represents the state of the toggle box
    const [isEdit, setIsEdit] = useState(false);
    
    const handleSubmit = async (event) => {
        //Prevent refresh
        event.preventDefault();
        let res = '';
        try{
            // This will block invalid data 
            if(productData.productCategory === "Select a category..." || productData.productName === '' || productData.productManufacturer === ''
                || productData.productPrice <= 0 || productData.productSize <= 0)
            {
                throw new InputError("Invalid data");
            }
            
            // Path for adding a new product, occurs if edit is unchecked
            if(!isEdit){
                // Fire off post request to database
                res = await axios.post('http://localhost:9000/products', {
                    manufacturer: productData.productManufacturer,
                    name: productData.productName,
                    category: productData.productCategory,
                    price: productData.productPrice,
                    size: productData.productSize
                });
                // Re-set state
                setProductList(productList => [...productList, res.data]);
            }
            // Path for editing a product, occurs if edit is checked
            else{
                // Generate apporiate URL for put request
                const axiosURL = `http://localhost:9000/products/${productData.productID}`
                // Fire off put request to database
                res = await axios.put(axiosURL, {
                    manufacturer: productData.productManufacturer,
                    name: productData.productName,
                    category: productData.productCategory,
                    price: productData.productPrice,
                    size: productData.productSize
                });
                // Re-set state
                axios.get('http://localhost:9000/products')
                .then(res => setProductList(res.data))
                .catch(err => console.error(err));
            }
            
            //Reset and clear forms
            event.target.reset();
            handleClear();
        } catch (err) {
            console.log(err);
        }
    }

    const handleClear = () => {
        setProductData({
            productManufacturer: '',
            productName: '',
            productPrice: 0.00,
            productSize: 0
        });
    }

    const handleToggle = () => {
        setIsEdit(!isEdit);
    }

    return (
        <>
        <h2>Product Controls</h2>
        <form onSubmit={handleSubmit}>
        
            <div>
                <input type="checkbox" id="add" onChange={handleToggle}/>
                <label htmlFor="add">Toggle Edit</label>  
            </div>
            <div>
                <label htmlFor="product-id">Id: </label>
            </div>
            <div>
                <input
                    id="product-id"
                    value={productData.ID}
                    onChange={e => setProductData({...productData, productID: e.target.value})}
                    placeholder="FOR EDITING ONLY"
                />
            </div>
            <div>
                <label htmlFor="product-manufacturer">Manufacturer: </label>
            </div>
            <div>
                <input 
                    id="product-manufacturer"
                    value={productData.productManufacturer}
                    onChange={e => setProductData({...productData, productManufacturer: e.target.value})}
                />
            </div>
            <div>
                <label htmlFor="product-name">Name: </label>
            </div>
            <div>
                <input 
                    id="product-name"
                    value={productData.productName}
                    onChange={e => setProductData({...productData, productName: e.target.value})}
                />
            </div>
            <div>
                <label htmlFor="product-category">Category: </label>
            </div>
            <div>
                <select id="product-category" onChange={e => setProductData({...productData, productCategory: e.target.value})}>
                    {category}
                </select>
            </div>
            <div>
                <label htmlFor="product-price">Price: </label>
            </div>
            <div>
                <input 
                    id="product-price"
                    type="number"
                    value={productData.productPrice}
                    onChange = {e => setProductData({...productData, productPrice: e.target.value})}
                />
            </div>
            <div>
                <label htmlFor="product-size">Size: </label>
            </div>
            <div>
                <input 
                    id="product-size"
                    type="number"
                    value={productData.productSize}
                    onChange = {e => setProductData({...productData, productSize: e.target.value})}
                />
            </div>
            <div>
                <button class="buttons" type="reset" onClick={handleClear}>Reset</button>
                <button class="buttons">Submit</button>
            </div>
            
        </form>
       </>
    );
}