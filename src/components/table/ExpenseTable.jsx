import editIcon from "../../assets/edit-Icon.png";
import { useSelector } from "react-redux";
import style  from "./ExpenseTable.css"
import DeleteModal from "../modal/delete/DeleteModal.jsx"

function ExpenseTable(){
    
    const rows = useSelector(store => store.expenses);

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
                     <tr>
                        <th>{row.description}</th>
                        <th>{parseFloat(row.value).toFixed(2)}</th>
                        <th>{row.coin}</th>
                        <th>{row.paymentMethod}</th>
                        <th>{row.tag}</th>
                        <th>
                            <button onClick={''}>deletar</button>
                        </th>
                    </tr>
                    )}
              
            </tbody>
            
        </table>
    );
}

export default ExpenseTable;