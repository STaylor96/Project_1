import {Table, TableBody, TableHead, TableRow, TableCell} from '@mui/material';
import axios from 'axios';
import { useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';

const Warehouse = ({warehouse: {_id, manager, phone, location, capacity}}) => {
    return(
        <>
            <TableRow>
                <TableCell>{location}</TableCell>
                <TableCell>{manager}</TableCell>
                <TableCell>{phone}</TableCell>
                <TableCell>{capacity?.current}</TableCell>
                <TableCell>{capacity?.maximum}</TableCell>
            </TableRow>
        </>
    )
}

const Product = ({product: {_id, manufacturer, name, category, price, size}}, {warehouse: quantity}) => {
    return(
        <>
            <TableRow>
                <TableCell>{manufacturer}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{category}</TableCell>
                <TableCell>{price}</TableCell>
                <TableCell>{size}</TableCell>
                <TableCell>{quantity}</TableCell>
            </TableRow>
        </>
    )
}

export const WarehouseIDTable = () => {

    const url = useLocation();
    const axiosURL = `http://localhost:9000${url.pathname}`;

    const [warehouse, setWarehouse] = useState([]);
    useEffect(() => {
        axios.get(axiosURL)
            .then(res => {
                setWarehouse(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    return(
        <>
            <label>This Warehouse:</label>
            <Table>
                <TableHead>
                    <TableCell>Manufacturer</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Size</TableCell>
                </TableHead>
                <TableBody>
                    <Warehouse key={warehouse._id} warehouse={warehouse}></Warehouse>
                </TableBody>
            </Table>
            
            <label>Inventory: </label>
            <Table>
                <TableHead>
                    <TableCell>Manufacturer</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Quantity</TableCell>
                </TableHead>
                <TableBody>

                </TableBody>
            </Table>
        </>
    )
}