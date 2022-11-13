import React, {useEffect, useState} from "react";
import styles from "./Wallet.css";
import logoWallet from "../../assets/logo-wallet.png";
import imageAddExpense from "../../assets/imageAddExpense.png"
import { useNavigate, useParams } from 'react-router-dom';
import exitIcon from "../../assets/exit-icon.png";
import moneyIcon from "../../assets/money-icon.png";
import ExpenseTable from "../../components/table/ExpenseTable.jsx";
import Modal from '@material-ui/core/Modal';
import api from '../../services/api.jsx';
import {useForm} from "../../hooks/useForm";
import {addExpense, editExpense, getExpenseById} from "../../services/localstorage";
import {v4 as uuidv4} from 'uuid';
import {addListener} from "@reduxjs/toolkit";

const Wallet = () => {
  let amount = 0;
  const [coins, setCoins] = useState([{}])
  const navigate = useNavigate();
  const { id } = useParams();
  const { inputValues, handleInputChange, resetForm, setForm } = useForm({
    value: '',
    description: '',
    coin: '',
    paymentMethod: '',
    tag: ''
  });

  useEffect(() => {
    if (id) {
      const expense = getExpenseById(id);
      setForm(expense);
    }
  }, [id]);

  const handleSubmit = (e) => {
    inputValues.value = document.getElementById("description-input-form-insert").value
    inputValues.description = document.getElementById("value-input-form-insert").value
    inputValues.coin = document.getElementById("coin-input").value
    inputValues.paymentMethod = document.getElementById("paymentMethod-input-form-insert").value
    inputValues.tag = document.getElementById("tag-input-form-insert").value
    addExpense({ id: uuidv4(), ...inputValues });
    resetForm();
    window.location.reload();
  };

  // const getCoins = () => {
  //   api.get()
  //       .then((response) => {
  //         setCoins(response.data)
  //       })
  // }

  function getAllCoins () {
      api.get()
          .then((response) => {
            setCoins(response.data)
          })
  };

  React.useEffect(() => {
    getAllCoins();
  }, []);

  function test(){
    console.log(coins)
  }

  const InsertModal = () => {
    const [open, setOpen] = useState(false)
    return (
        <div>
          <button className="btn-insert" type="button" onClick={() => setOpen(true)}>Cadastrar Despesa</button>
          <Modal className="modal" open={open} onClose={() => setOpen(false)}>
            <div className="insert-modal-container">
            <form className="form-add-expense">
              <img className="image-add-expense" src={imageAddExpense} />
              <h1 className="title-insert-form">Cadastrar Despesa</h1>
              <input
                  name="description"
                  id="description-input-form-insert"
                  placeholder="Descrição"
                  type="text"
              />
              <div className="wrap-inputs-form-add-expense">
                <input
                    name="value"
                    placeholder="Valor"
                    id="value-input-form-insert"
                />
                <input
                    name="coin"
                    id="coin-input"
                    placeholder="Moeda"
                    type="text"
                />
              </div>
              <input
                  name="paymentMethod"
                  placeholder="Método de Pagamento"
                  type="text"
                  id="paymentMethod-input-form-insert"
              />
              <input
                  name="tag"
                  placeholder="Tag"
                  type="text"
                  id="tag-input-form-insert"
              />

              <select>

              </select>
              <button className="btn-submit" type="button" onClick={handleSubmit}>Adicionar Despesa</button>
            </form>
            </div>
          </Modal>
        </div>
    );
  }

    return (
    <section className="wallet-body">
      <div>
        <header className="header">
          <nav className="navbar">
            <a className="logo-wallet" href="">
              <img src={logoWallet} />
            </a>
            <h1>CARTEIRA</h1>
            <button type="button" onClick={test}></button>
            <a className="exit-icon" onClick={() => navigate('/')}>
              <img src={exitIcon}/>
            </a>
          </nav>
        </header>

        <div className="container-activ">
          <div className="activates">
            <div className="icon-activates">
              <img className="icon-img" src={moneyIcon} />
            </div>
            <h1 className="text-activates">Total de Despesas</h1>

            <div>
              <h1 className="text-result">R$ {amount}</h1>
            </div>
          </div>
        </div>

        <div className="insert-container-wallet">
          <div className="buttons">
            <InsertModal></InsertModal>
          </div>
        </div>
        <div className="table-expense">
          <ExpenseTable/>
        </div>
      </div>
    </section>
  );
};



export default Wallet;
