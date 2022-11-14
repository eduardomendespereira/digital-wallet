import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {getListExpenses, removeExpense} from "../../services/localstorage";
import {Button} from "@material-ui/core";
import Style from "./ExpenseTable.css"
import trashIcon from "../../assets/trash-Icon.png";
import editIcon from "../../assets/edit-Icon.png";


const columns = [
    
    {
        id: 'description',
        label: 'DESCRIÇÃO',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'value',
        label: 'VALOR',
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
        align: 'center',
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
        window.location.reload();
    }

    const classes = useStyles();
    return (
            <Paper className={classes.root} style={{borderRadius: 5}}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table" >
                        <TableHead>
                            <TableRow >
                                {columns.map((column) => (
                                    <TableCell className='table-align'
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
                                                    {column.id === 'actions' ? [<button className="edit-button" id="table_icons"><img src={editIcon}/></button>
                                                        , <button className="delete-button"  onClick={() => deleteExpense(row.id)}><img src={trashIcon}/></button>] : null}
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
