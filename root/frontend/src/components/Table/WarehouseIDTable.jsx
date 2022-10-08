import {Table, TableBody, TableHead, TableRow, TableCell } from '@mui/material';
import axios from 'axios';
import { useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { WarehouseForm } from '../Form/WarehouseForm';

const Warehouse = ({warehouse: {_id, manager, phone, location, capacity}}) => {
    return(
            <TableRow>
                <TableCell>{location}</TableCell>
                <TableCell>{manager}</TableCell>
                <TableCell>{phone}</TableCell>
                <TableCell>{capacity?.current}</TableCell>
                <TableCell>{capacity?.maximum}</TableCell>
            </TableRow>
    )
}

const Product = ({inventory: {product, quantity}}) => {
    return (
        <TableRow>
            <TableCell>{product}</TableCell>
            <TableCell>{quantity}</TableCell>
        </TableRow>
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
                console.log(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    return(
        <>
            <h3>Warehouse #{warehouse._id}</h3>
            <Table>
                <TableHead>
                    <TableCell>Location</TableCell>
                    <TableCell>Manager</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Capacity (Used)</TableCell>
                    <TableCell>Capacity (Max)</TableCell>
                </TableHead>
                <TableBody>
                    <Warehouse key={warehouse._id} warehouse={warehouse}></Warehouse>
                </TableBody>
            </Table>
            
            <h3>Inventory: </h3>
            <Table>
                <TableHead>
                    <TableCell>Product ID</TableCell>
                    <TableCell>Quantity</TableCell>
                </TableHead>
                <TableBody>
                    {warehouse && warehouse.inventory? warehouse.inventory.map(product => {
                        return (
                            <Product key={product._id} inventory={product}></Product>
                        )
                    }) : null}
                </TableBody>
            </Table>

            <WarehouseForm warehouseLocation={warehouse.location} warehouseManager={warehouse.manager} warehousePhone={warehouse.phone} 
                warehouseCapacityMax={warehouse.capacity?.maximum} warehouseCapacityCur={warehouse.capacity?.current} warehouseInventory={warehouse.inventory} 
                setWarehouse={setWarehouse} />
        </>
    )
}