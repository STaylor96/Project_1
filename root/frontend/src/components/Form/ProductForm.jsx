import axios from 'axios';
import { useState } from 'react';

const category = [
    <option>Select a category...</option>,
    <option>Guitar</option>,
    <option>Bass</option>,
    <option>Amplifier/Effect</option>,
    <option>Accessory</option>
];

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

    const [isEdit, setIsEdit] = useState(false);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        let res = '';
        try{
            if(productData.productCategory === "Select a category..." || productData.productName === '' || productData.productManufacturer === ''
                || productData.productPrice <= 0 || productData.productSize <= 0)
            {
                throw new InputError("Invalid data");
            }
            
            if(!isEdit){
                    res = await axios.post('http://localhost:9000/products', {
                    manufacturer: productData.productManufacturer,
                    name: productData.productName,
                    category: productData.productCategory,
                    price: productData.productPrice,
                    size: productData.productSize
                });
                setProductList(productList => [...productList, res.data]);
            }
            else{
                const axiosURL = `http://localhost:9000/products/${productData.productID}`
                    res = await axios.put(axiosURL, {
                    manufacturer: productData.productManufacturer,
                    name: productData.productName,
                    category: productData.productCategory,
                    price: productData.productPrice,
                    size: productData.productSize
                });
                axios.get('http://localhost:9000/products')
                .then(res => setProductList(res.data))
                .catch(err => console.error(err));
            }

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
        <form onSubmit={handleSubmit}>
            <h2>Add/Edit Product</h2>
            <h3>Currently: {isEdit ? 'Edit' : 'Add'}</h3>
            <div>
                <input type="checkbox" id="add" onChange={handleToggle}/>
                <label htmlFor="add">Toggle Edit</label>  
            </div>
            <div>
                <div>
                    <label htmlFor="product-id">Id: </label>
                    <input
                    id="product-id"
                    value={productData.ID}
                    onChange={e => setProductData({...productData, productID: e.target.value})}
                    placeholder="FOR EDITING ONLY"
                    />
                </div>
                <label htmlFor="product-manufacturer">Manufacturer: </label>
                <input 
                    id="product-manufacturer"
                    value={productData.productManufacturer}
                    onChange={e => setProductData({...productData, productManufacturer: e.target.value})}
                    />
            </div>
            <div>
                <label htmlFor="product-name">Name: </label>
                <input 
                    id="product-name"
                    value={productData.productName}
                    onChange={e => setProductData({...productData, productName: e.target.value})}
                    />
            </div>
            <div>
                <label htmlFor="product-category">Category: </label>
                <select id="product-category" onChange={e => setProductData({...productData, productCategory: e.target.value})}>
                    {category}
                </select>
            </div>
            <div>
                <label htmlFor="product-price">Price: </label>
                <input 
                id="product-price"
                type="number"
                value={productData.productPrice}
                onChange = {e => setProductData({...productData, productPrice: e.target.value})}
                />
            </div>
            <div>
                <label htmlFor="product-size">Size: </label>
                <input 
                id="product-size"
                type="number"
                value={productData.productSize}
                onChange = {e => setProductData({...productData, productSize: e.target.value})}
                />
            </div>
            <div>
                <button type="reset" onClick={handleClear}>Reset</button>
                <button>Submit</button>
            </div>
            
        </form>
    );
}