import {Table, TableBody, TableHead, TableRow, TableCell} from '@mui/material';

export const ProductTable = () => {
    return(
        <>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Manufacturer</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Size</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>

            </TableBody>
        </Table>
        </>
    )
}