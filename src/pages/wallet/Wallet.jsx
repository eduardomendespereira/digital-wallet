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

const Wallet = () => {

  const listCoins = []
  const navigate = useNavigate();
  const { id } = useParams();
  const [ showAlert, setShowAlert ] = useState(false);
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
    e.preventDefault();
    id ? editExpense(id, inputValues) : addExpense({ id: uuidv4(), ...inputValues });
    resetForm();
  };

  const coins = () => {
     api.get()
        .then((response) => {
          const datas = response.data
          // listCoins.push(response.data)
          // for(var x in datas){
          //   listCoins.push(x)
          // }
          console.log(datas)
        })
  }

  function insertExpense(){

  }

  const teste = async () => {
    console.log(listCoins);
  }

  const InsertModal = () => {
    const [open, setOpen] = useState(false)
    return (
        <div>
          <button className="btn-insert" type="button" onClick={() => setOpen(true)}>Cadastrar Despesa</button>
          <Modal className="modal" open={open} onClose={() => setOpen(false)}>
            <form className="form-add-expense">
              <img className="image-add-expense" src={imageAddExpense} />
              <h1 className="title-insert-form">Cadastrar Despesa</h1>
              <input className="description-input-form-insert" placeholder="Descrição"/>
              <div className="wrap-inputs-form-add-expense">
                <input placeholder="Valor"/>
                <input className="coin-input" placeholder="Moeda"/>
              </div>
              <input placeholder="Método de Pagamento"/>
              <input placeholder="Tag"/>
              <button className="btn-submit" type="button" onClick={coins}>Adicionar Despesa</button>
            </form>
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
              <h1 className="text-result">R$ 0,00</h1>
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
