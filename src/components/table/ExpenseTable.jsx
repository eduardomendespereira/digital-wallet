import editIcon from "../../assets/edit-Icon.png";
import { useSelector } from "react-redux";
import style  from "./ExpenseTable.css"
import {deleteExpense} from "../../features/expenseSlice.js";
import { useDispatch } from "react-redux";
import React, {useState} from 'react';
import trashIcon from "../../assets/trash-Icon.png"
import imageDelExpense from "../../assets/imageDelExpense.png";
import Modal from "@material-ui/core/Modal";

function ExpenseTable(){
    
    const rows = useSelector(store => store.expenses);
    const dispatch = useDispatch();

    const handleRemoveExpense = (id) => {
        dispatch(deleteExpense({ id }));
    }

    return(
        <table className="table">
            <thead>
                <tr>
                    <th>DESCRIÇÃO</th>
                    <th>VALOR</th>
                    <th>MOEDA</th>
                    <th>MÉTODO DE PAGAMENTO</th>
                    <th>TAG</th>
                    <th>OPÇÕES</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => 
                    <tr key={row}>
                    <th>{row.description}</th>
                    <th>{parseFloat(row.value).toFixed(2)}</th>
                    <th>{row.coin}</th>
                    <th>{row.paymentMethod}</th>
                    <th>{row.tag}</th>
                    <th>
                        <button onClick={() => handleRemoveExpense(row.id)}>deletar</button>
                    </th>
                </tr>
                )}
            </tbody>
            
        </table>
    );
}

export default ExpenseTable;