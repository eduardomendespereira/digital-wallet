import React, {useState} from 'react';
import trashIcon from "../../../assets/trash-Icon.png";
import styles from "./DeleteModal.css";
// import {removeExpense} from "../../../services/localstorage"
import imageDelExpense from "../../../assets/imageDelExpense.png";
import Modal from "@material-ui/core/Modal";

const getRow = 0;

export default function DeleteModal(getRow){
    const [open, setOpen] = useState(false);

    const deleteExpense = (id) => {
        // removeExpense(id);
        window.location.reload();
    }
    
  return (
    <div>
      <button className="delete-button" onClick={() => setOpen(true)}><img src={trashIcon}/></button>
      <Modal className="modal-del" open={open} onClose={() => setOpen(false)}>
        <form className="form-del-expense">
          <div className="modal-delete-container">
            <img className="image-del-expense" src={imageDelExpense} />
            <h1 className="title-del-form">Deletar Despesa</h1>
            <h1 className="text-del">Você tem certeza que deseja deleta esta despesa??</h1>
            <hr width="500"/>
            <button className="btn-submit" type="button" onClick={() => deleteExpense(getRow.id)}>
              Deletar Despesa
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
