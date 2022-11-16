import * as React from "react";
import styles from "./InsertModal.css";
import { useParams } from "react-router-dom";
import {
  addExpense,
  getExpenseById,
  getListExpenses,
} from "../../../services/localstorage";
import api from "../../../services/api.jsx"; //Important
import { getCoins } from "../../../services/api.jsx"; //Important
import { useForm } from "../../../hooks/useForm"; //Important
import { v4 as uuidv4 } from "uuid";
import Modal from "@material-ui/core/Modal";

export default function InsertModal() {
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
  }, []);

  let [amount, setAmount] = React.useState(0);
  const { id } = useParams();
  const tag = ["Alimentação", "Lazer", "Trabalho", "Transporte", "Saúde"];
  const payment = ["Dinheiro", "Cartão de crédito", "Cartão de débito"];
  const { inputValues, handleInputChange, resetForm, setForm } = useForm({
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

  const handleSubmit = (e) => {
    inputValues.value = document.getElementById(
      "value-input-form-insert"
    ).value;
    inputValues.description = document.getElementById(
      "description-input-form-insert"
    ).value;
    inputValues.coin = document.getElementById("coin-input").value;
    inputValues.paymentMethod = document.getElementById(
      "paymentMethod-input-form-insert"
    ).value;
    inputValues.tag = document.getElementById("tag-input-form-insert").value;
    addExpense({ id: uuidv4(), ...inputValues });
    resetForm();
    amount = inputValues.value;
    window.location.reload();
  };

  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <button
        className="btn-insert"
        type="button"
        onClick={() => setOpen(true)}
      >
        Cadastrar Despesa
      </button>
      <Modal className="modal" open={open} onClose={() => setOpen(false)}>
        <div className="insert-modal-container">
          <form className="form-add-expense">
            <img
              className="image-add-expense"
              src={require("../../../assets/imageAddExpense.png")}
            />
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
                required
              />
              <select id="coin-input" className="select-coin">
                {listAllCoins.map((coin) => {
                  return (
                    <option key={coin.in} value={inputValues.code}>
                      {coin}
                    </option>
                  );
                })}
              </select>
            </div>
            <select className="space-pay" id="paymentMethod-input-form-insert">
              {payment.map((pay) => {
                return (
                  <option key={pay.in} value={inputValues.code}>
                    {pay}
                  </option>
                );
              })}
            </select>
            <h5 className="desc">Método de pagamento</h5>

            <select className="space" id="tag-input-form-insert">
              {tag.map((tags) => {
                return (
                  <option key={tags.in} value={inputValues.code}>
                    {tags}
                  </option>
                );
              })}
            </select>
            <h5 className="desc-tag">Tags</h5>
            <button className="btn-submit" type="button" onClick={handleSubmit}>
              Adicionar Despesa
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
