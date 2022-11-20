import editIcon from "../../assets/edit-Icon.png";
import { useSelector } from "react-redux";
import style  from "./ExpenseTable.css"
import {deleteExpense} from "../../features/expenseSlice.js";
import { useDispatch } from "react-redux";
import React, {useState} from 'react';
import DeleteModal from "../modal/delete/DeleteModal";

function ExpenseTable(){
    
    const rows = useSelector(store => store.expenses);
    const dispatch = useDispatch();

    const handleRemoveExpense = (id) => {
        dispatch(deleteExpense({ id }));
    }

    return(
        <table className="table">
            <thead className="table-head">
                <tr>
                    <th className="row-head">DESCRIÇÃO</th>
                    <th className="row-head">VALOR</th>
                    <th className="row-head">MOEDA</th>
                    <th className="row-head">MÉTODO DE PAGAMENTO</th>
                    <th className="row-head">TAG</th>
                    <th className="row-head">OPÇÕES</th>
                </tr>
            </thead>
            <tbody className="table-body">   
                {rows.map((row) => 
                    <tr className="table-row" key={row}>
                    <th className="row">{row.description}</th>
                    <th className="row">{parseFloat(row.value).toFixed(2)}</th>
                    <th className="row">{row.coin}</th>
                    <th className="row">{row.paymentMethod}</th>
                    <th className="row">{row.tag}</th>
                    <th className="row">
                        <button className="delete-button" onClick={() => handleRemoveExpense(row.id)}><img src={require("../../assets/trash-Icon.png")}/></button>
                    </th>
                </tr>
                )}
            </tbody>
            
        </table>
    );
}

export default ExpenseTable;