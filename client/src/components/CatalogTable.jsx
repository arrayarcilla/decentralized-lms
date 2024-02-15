import React from 'react';
import SideBar from './Sidebar';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableHeaderCell,
    TableRow
} from 'semantic-ui-react';

function CatalogTable() {
    return (
        <>
            <SideBar />
            <div class="content">
                <h1>Catalog table</h1>

                <Table singleLine>

                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>Id</TableHeaderCell>
                            <TableHeaderCell>Title</TableHeaderCell>
                            <TableHeaderCell>Type</TableHeaderCell>
                            <TableHeaderCell>Authors</TableHeaderCell>
                            <TableHeaderCell>Publisher</TableHeaderCell>
                            <TableHeaderCell>Identifiers</TableHeaderCell>
                            <TableHeaderCell>Call No.</TableHeaderCell>
                            <TableHeaderCell>Copies</TableHeaderCell>
                            <TableHeaderCell>Actions</TableHeaderCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableBody>

                </Table>
            </div>
            
        </>
    );
}

export default CatalogTable;