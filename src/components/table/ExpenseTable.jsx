import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {getListExpenses, removeExpense} from "../../services/localstorage";
import {Button} from "@material-ui/core";

const columns = [
    {
        id: 'value',
        label: 'VALOR',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'description',
        label: 'DESCRIÇÃO',
        minWidth: 100,
        align: 'center'
    },
    {
        id: 'coin',
        label: 'MOEDA',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'paymentMethod',
        label: 'MÉTODO DE PAGAMENTO',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'tag',
        label: 'TAG',
        minWidth: 170,
        align: 'center',
    },
    {
        id: "actions",
        label: 'AÇÕES',
    },
];

const rows = getListExpenses();

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

export default function ExpenseTable() {

    const deleteExpense = (id) => {
        removeExpense(id);
    }

    const classes = useStyles();
    return (
            <Paper className={classes.root} style={{borderRadius: 5}}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.id === 'actions' ? [<Button id="table_icons">Edit</Button>
                                                        , <Button id="table_icons" onClick={() => deleteExpense(row.id)}>Rem</Button>] : null}
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
    );
}
