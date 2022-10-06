import {Table, TableBody, TableHead, TableRow, TableCell} from '@mui/material';

export const WarehouseTable = () => {
    return(
        <>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Location</TableCell>
                    <TableCell>Manager</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Capacity_Current</TableCell>
                    <TableCell>Capacity_Max</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>

            </TableBody>
        </Table>
        </>
    )
}