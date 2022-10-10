import {Table, TableBody, TableHead, TableRow, TableCell, Button} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Represents a single row on the table
const Warehouse = ({warehouse: {_id, manager, phone, location, capacity}}) => {
    return(
        <>
            <TableRow>
                <TableCell><Button><Link to={`${_id}`}>{location}</Link></Button></TableCell>
                <TableCell>{manager}</TableCell>
                <TableCell>{phone}</TableCell>
                <TableCell>{capacity?.maximum}</TableCell>
            </TableRow>
        </>
    )
}

export const WarehouseTable = () => {

    const [warehouseList, setWarehouseList] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:9000')
            .then(res => setWarehouseList(res.data))
            .catch(err => console.error(err));
    }, []);

    return(
        <>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Location</TableCell>
                    <TableCell>Manager</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Maximum Capacity</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {warehouseList.map(warehouse => <Warehouse key={warehouse._id} warehouse={warehouse}/>)}
            </TableBody>
        </Table>
        </>
    )
}