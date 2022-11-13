import React, { useState } from "react";
import styles from "./DeleteModal.css";
import imageDelExpense from "../../assets/imageDelExpense.png";
import Modal from "@material-ui/core/Modal";

export default function DeleteModal() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        className="btn-delete"
        type="button"
        onClick={() => setOpen(true)}
      >
        X
      </button>
      <Modal className="modal-del" open={open} onClose={() => setOpen(false)}>
        <form className="form-del-expense">
          <div className="modal-delete-container">
            <img className="image-del-expense" src={imageDelExpense} />
            <h1 className="title-del-form">Deletar Despesa</h1>
            <h1 className="text-del">Você tem certeza que deseja deleta esta despesa??</h1>
            <hr width="500"/>
            <button className="btn-submit" type="button">
              Deletar Despesa
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
