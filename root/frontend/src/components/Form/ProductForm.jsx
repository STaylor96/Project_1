import { useState } from 'react';
import * as yup from 'yup';

const category = [
    <option>Select category...</option>,
    <option>Guitar</option>,
    <option>Bass</option>,
    <option>Amplifier/Effect</option>,
    <option>Accessory</option>
];

export const ProductForm = () => {

    const productSchema = yup.object().shape({
        productManufacturer: yup
            .string()
            .required(),
        productName: yup
            .string()
            .required(),
        productCategory: yup
            .string()
            .required(),
        productPrice: yup
            .number()
            .required()
            .positive(),
        productSize: yup
            .number()
            .required()
            .positive()
    });

    const [productData, setProductData] = useState({
        productManufacturer: '',
        productName: '',
        productCategory: '',
        productPrice: 0.00,
        productSize: 0
    })
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Success!');
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Product...</h2>
            <div>
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
                onChange = {e => setProductData({... productData, productSize: e.target.value})}
                />
            </div>
            <button>Submit</button>
        </form>
    )
}