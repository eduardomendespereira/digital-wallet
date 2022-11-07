import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import css from '../table/ExpenseTable.css';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(id, value, description, coin, paymentMethod, tag) {
    return {id, value, description, coin, paymentMethod, tag };
}

const rows = [
    createData(1,590, "compras do mes", "URL", "cartão de crédito", "alimentação"),
    createData(2,800, "compra bicicleta", "URL", "dinheiro", "lazer"),
    createData(3,100, "gasolina","URL", "cartão de crédito", "transporte"),
];

export default function DenseTable() {
    const classes = useStyles();

    return (
        <div className="main-container">
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Valor</TableCell>
                            <TableCell align="center">Descrição</TableCell>
                            <TableCell align="center">Moeda</TableCell>
                            <TableCell align="center">Método de Pagamento</TableCell>
                            <TableCell align="center">Tag</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.value}
                                </TableCell>
                                <TableCell align="center">{row.description}</TableCell>
                                <TableCell align="center">{row.coin}</TableCell>
                                <TableCell align="center">{row.paymentMethod}</TableCell>
                                <TableCell align="center">{row.tag}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}