import {Table, TableBody, TableHead, TableRow, TableCell, Button} from '@mui/material';
import axios from 'axios';
import { useEffect, useState} from 'react';
import { ProductForm } from '../Form/ProductForm';

const Product = ({product: {_id, manufacturer, name, category, price, size}}) => {
    return(
        <>
        <TableRow>
            <Button>Edit</Button>
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
                    <TableCell></TableCell>
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