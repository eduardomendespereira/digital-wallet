import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
} from "@material-ui/core";
import editIcon from "../../assets/edit-Icon.png";
import DeleteModal from "../modal/delete/DeleteModal";
import Style from "./ExpenseTable.css";

const rows = []

const columns = [
  {
    id: "description",
    label: "DESCRIÇÃO",
    minWidth: 170,
    align: "center",
  },
  {
    id: "value",
    label: "VALOR",
    minWidth: 100,
    align: "center",
  },
  {
    id: "coin",
    label: "MOEDA",
    minWidth: 170,
    align: "center",
  },
  {
    id: "paymentMethod",
    label: "MÉTODO DE PAGAMENTO",
    minWidth: 170,
    align: "center",
  },
  {
    id: "tag",
    label: "TAG",
    minWidth: 170,
    align: "center",
  },
  {
    id: "actions",
    label: "AÇÕES",
    align: "center",
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function ExpenseTable() {
  const classes = useStyles();
  return (
    <Paper className={classes.root} style={{ borderRadius: 5 }}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  className="table-align"
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
                        {column.id === "actions" ? [DeleteModal(row)] : null}
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
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
