import axios from 'axios';
import { useState, useEffect } from 'react';

const productTypes = [
    <option>Select Category</option>,
    <option>Guitar</option>,
    <option>Bass</option>,
    <option>Amplifier/Effect</option>,
    <option>Accessory</option>
];

const Product = ({product: {manufacturer, name, category, price, size}}) => {
    return (
        <tr>
            <td className="row-item">{manufacturer}</td>
            <td className="row-item">{name}</td>
            <td className="row-item">{category}</td>
            <td className="row-item">{price?.cost}</td>
            <td className="row-item">{price?.sale_price}</td>
            <td className="row-item">{size}</td>
        </tr>
    )
}

export const ProductList = () => {

    const [productList, setProductList] = useState([]);
   
    useEffect(() => {
        axios.get('http://localhost:9000/products')
        .then(res => {setProductList(res.data); console.log(res.data)})
        .catch(err => console.error(err));
    }, []);

    return (
        <>
        <table>
            <thead>
                <tr>
                    <th>Manufacturer</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Cost</th>
                    <th>Sale_Price</th>
                    <th>Size</th>
                </tr>
            </thead>
            <tbody>
            {productList.map(product => <Product key={product._id} product={product}/>)}
            </tbody>
        </table>
        </>
    );
}