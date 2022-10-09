import {Table, TableBody, TableHead, TableRow, TableCell } from '@mui/material';
import axios from 'axios';
import { useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { WarehouseForm } from '../Form/WarehouseForm';

// Row on the upper "Table", containing warehouse information
const Warehouse = ({warehouse: {_id, manager, phone, location, capacity}}) => {
    return(
            <TableRow>
                <TableCell>{location}</TableCell>
                <TableCell>{manager}</TableCell>
                <TableCell>{phone}</TableCell>
                <TableCell>{capacity?.maximum}</TableCell>
            </TableRow>
    )
}

// Rows on the lower table, displaying inventory
const Product = ({inventory: {product, quantity}}) => {
    return (
        <TableRow>
            <TableCell>{product}</TableCell>
            <TableCell>{quantity}</TableCell>
        </TableRow>
    )
}

export const WarehouseIDTable = () => {

    // Generate appropriate URL for axios request
    const url = useLocation();
    const axiosURL = `http://localhost:9000${url.pathname}`;

    const [warehouse, setWarehouse] = useState([]);
    useEffect(() => {
        axios.get(axiosURL)
            .then(res => setWarehouse(res.data))
            .catch(err => console.error(err));
    }, []);

    /*
        Note: if the ternary operator is removed from inside the TableBody, the table rows will NOT display.
        This seems to be a timing issue with axios requests? I am not entirely sure
    */
    return(
        <>
            <h3>Warehouse: </h3>
            <Table>
                <TableHead>
                    <TableCell>Location</TableCell>
                    <TableCell>Manager</TableCell>
                    <TableCell>Phone</TableCell>
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
                warehouseCapacityMax={warehouse.capacity?.maximum} warehouseCapacityCur={warehouse.capacity?.current} 
                warehouseInventory={warehouse.inventory} 
                setWarehouse={setWarehouse} />
        </>
    )
}