import * as React from "react";
import styles from "./Wallet.css";
import { useNavigate, useParams } from "react-router-dom";
import { getExpenseById, getListExpenses } from "../../services/localstorage";
import { getCoins } from "../../services/api.jsx"; //Important
import { useForm } from "../../hooks/useForm"; //Important
import ExpenseTable from "../../components/table/ExpenseTable.jsx";
import InsertModal from "../../components/modal/insert/InsertModal";

function Wallet() {
  const [coins, setCoins] = React.useState([{}]);
  let listAllCoins = Object.keys(coins);

  async function getAllCoins() {
    const r = await getCoins();
    const data = r.data;
    setCoins(data);
    listAllCoins = Object.keys(coins);

    let listExpenses = getListExpenses();
    for (let x in listExpenses) {
      amount += data[listExpenses[x].coin].bid * listExpenses[x].value;
    }
    localStorage.setItem("total", amount / 2);
  }

  React.useEffect(() => {
    getAllCoins();
    calculateAmount();
  }, []);

  let [amount, setAmount] = React.useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const { setForm } = useForm({
    value: "",
    description: "",
    coin: "",
    paymentMethod: "",
    tag: "",
  });

  React.useEffect(() => {
    if (id) {
      const expense = getExpenseById(id);
      setForm(expense);
    }
  }, [id]);

  function calculateAmount() {
    let listExpenses = getListExpenses();
  }

  const getAmount = JSON.parse(localStorage.getItem("total"));
  let getFinalAmount = getAmount.toFixed(2).toString();

  return (
    <section className="wallet-body">
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
              <h1 className="text-result">R$ {getFinalAmount}</h1>
            </div>
          </div>
        </div>

        <div className="insert-container-wallet">
          <div className="buttons">
            <InsertModal />
          </div>
        </div>
        <div className="table-expense">
          <ExpenseTable />
        </div>
      </div>
    </section>
  );
}

export default Wallet;
