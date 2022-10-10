import {Table, TableBody, TableHead, TableRow, TableCell} from '@mui/material';
import axios from 'axios';
import { useEffect, useState} from 'react';
import { ProductForm } from '../Form/ProductForm';

// This represents an individual row on the product table
const Product = ({product: {_id, manufacturer, name, category, price, size}}) => {
    return(
        <>
        <TableRow>
            <TableCell>{_id}</TableCell>
            <TableCell>{manufacturer}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{category}</TableCell>
            <TableCell>{price}</TableCell>
            <TableCell>{size}</TableCell>
        </TableRow>
        </>
    )
}

export const ProductTable = () => {

    // State
    const [productList, setProductList] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:9000/products')
            .then(res => setProductList(res.data))
            .catch(err => console.error(err));
    }, []);

    return(
        <>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Manufacturer</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Size</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {productList.map(product => <Product key={product._id} product={product}/>)}
            </TableBody>
        </Table>

        <ProductForm setProductList={setProductList} />
        </>
    );
}