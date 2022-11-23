import * as React from "react";
import styles from "./Wallet.css";
import { useNavigate, useParams } from "react-router-dom";
import ExpenseTable from "../../components/table/ExpenseTable.jsx";
import AddExpense from "../../components/modal/insert/AddExpense";
import {useSelector} from "react-redux";
import {useEffect} from "react";


function Wallet() {
  let [amount, setAmount] = React.useState(0);
  const navigate = useNavigate();
  const [coins, setCoins] = React.useState([{}]);
  let listAllCoins = Object.keys(coins);
  let listExpenses = useSelector(store => store.expenses);

  React.useEffect(() => {
    const fetchData = async() => {
        try {
            const res = await fetch('https://economia.awesomeapi.com.br/json/all')
            const json = await res.json()
            setCoins(json)
            amount = 0;
            for (let x in listExpenses){
              amount += coins[listExpenses[x].coin].bid * listExpenses[x].value
            }
            setAmount(amount)
        } catch (error) {
            console.log(error)
        }
        
    }
    fetchData()
}, [listExpenses])

  return (
    <section className="wallet-body" data-testid='wallet-id'>
      <div>
        <header className="header">
          <nav className="navbar">
            <a className="logo-wallet" href="">
              <img src={require("../../assets/logo-wallet.png")} />
            </a>
            <h1>CARTEIRA</h1>
            <a className="exit-icon" onClick={() => navigate("/")}>
              <img src={require("../../assets/exit-icon.png")} />
            </a>
          </nav>
        </header>

        <div className="container-activ">
          <div className="activates">
            <div className="icon-activates">
              <img
                className="icon-img"
                src={require("../../assets/money-icon.png")}
              />
            </div>
            <h1 className="text-activates">Total de Despesas</h1>

            <div>
              <h1 className="text-result">R$ {amount.toFixed(2)}</h1>
            </div>
          </div>
        </div>

        <div className="insert-container-wallet">
          <div className="buttons">
            <AddExpense />
          </div>
        </div>
        <div className="table-expense">
          <ExpenseTable/>
        </div>
      </div>
    </section>
  );
}

export default Wallet;
