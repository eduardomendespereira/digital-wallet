import * as React from "react";
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
import {addExpense, editExpense, getExpenseById, getListExpenses} from "../../services/localstorage";
import {v4 as uuidv4} from 'uuid';
import { getCoins } from "../../services/api.jsx";

function Wallet() {
  const [coins, setCoins] = React.useState([{}])
  let listAllCoins = Object.keys(coins)

  async function getAllCoins() {
    const r = await getCoins();
    const data = r.data
    setCoins(data)
    listAllCoins = Object.keys(coins)

    let listExpenses = getListExpenses()
    for (let x in listExpenses) {
      amount += data[listExpenses[x].coin].bid * listExpenses[x].value
    }
    localStorage.setItem('total', amount/2)
  };

  React.useEffect(() => {
    getAllCoins();
    calculateAmount();
  }, []);

  let [amount, setAmount] = React.useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const tag = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde']
  const payment = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito']
  const { inputValues, handleInputChange, resetForm, setForm } = useForm({
    value: '',
    description: '',
    coin: '',
    paymentMethod: '',
    tag: ''
  });

  React.useEffect(() => {
    if (id) {
      const expense = getExpenseById(id);
      setForm(expense);
    }
  }, [id]);

  const handleSubmit = (e) => {
    inputValues.value = document.getElementById("value-input-form-insert").value
    inputValues.description = document.getElementById("description-input-form-insert").value
    inputValues.coin = document.getElementById("coin-input").value
    inputValues.paymentMethod = document.getElementById("paymentMethod-input-form-insert").value
    inputValues.tag = document.getElementById("tag-input-form-insert").value
    addExpense({ id: uuidv4(), ...inputValues });
    resetForm();
    amount = inputValues.value
    window.location.reload();
  };



  function calculateAmount(){
    let listExpenses = getListExpenses()
    // for (let x in listExpenses) {
    //   amount += coins[listExpenses[x].coin].bid * listExpenses[x].value
    // }

  }

  const InsertModal = () => {
    const [open, setOpen] = React.useState(false)
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
                    type="number"
                    name="value"
                    placeholder="Valor"
                    id="value-input-form-insert"
                />
                <select id="coin-input" className="select-coin">
                  {listAllCoins.map((coin) => {
                    return(
                        <option  key={coin.in} value={inputValues.code}>{coin}</option>
                    );
                  })}
                </select>
              </div>
              <select className="space-pay" id="paymentMethod-input-form-insert">
                {payment.map((pay) => {
                  return (
                      <option key={pay.in} value={inputValues.code}>{pay}</option>
                  );
                })}
              </select>
              <h5 className="desc">Método de pagamento</h5>

              <select className="space" id="tag-input-form-insert">
                {tag.map((tags) => {
                  return (
                      <option key={tags.in} value={inputValues.code}>{tags}</option>
                  );
                })}
              </select>
              <h5 className="desc-tag">Tags</h5>
              <button className="btn-submit" type="button" onClick={handleSubmit}>Adicionar Despesa</button>
            </form>
            </div>
          </Modal>
        </div>
    );
  }

    const getAmount = JSON.parse(localStorage.getItem('total'))
    let getFinalAmount = (getAmount.toFixed(2).toString())

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
              <h1 className="text-result">R$ {getFinalAmount}</h1>
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
