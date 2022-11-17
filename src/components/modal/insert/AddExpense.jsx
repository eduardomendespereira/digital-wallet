import * as React from "react";
import styles from "./AddExpense.css";
import { useParams } from "react-router-dom";
import api from "../../../services/api.jsx"; 
import { getCoins } from "../../../services/api.jsx"; 
import { v4 as uuidv4 } from "uuid";
import Modal from "@material-ui/core/Modal";
import { addExpense } from '../../../features/expenseSlice.js'
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function InsertModal() {
  const tag = ["Alimentação", "Lazer", "Trabalho", "Transporte", "Saúde"];
  const payment = ["Dinheiro", "Cartão de crédito", "Cartão de débito"];
  const [coins, setCoins] = React.useState([{}]);
  let listAllCoins = Object.keys(coins);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    value: '',
    description: '',
    coin: '',
    paymentMethod: '',
    tag: ''
  });
  

  const handleAddExpense = () => {
    // setValues({
    //   value: '',
    //   description: '',
    //   coin: '', 
    //   paymentMethod: '',
    //   tag: ''
    // });
    dispatch(addExpense({
      id: uuidv4(),
      value: values.value,
      description: values.description,
      coin: values.coin,
      paymentMethod: values.paymentMethod,
      tag: values.tag
    }))
  }

  function handleChange({ target: { name, value }}) {
    setValues((oldValues) => ({
      ...oldValues,
      [name]: value
    }))
  }

  async function getAllCoins() {
    const r = await getCoins();
    const data = r.data;
    setCoins(data);
    listAllCoins = Object.keys(coins);
  }

  React.useEffect(() => {
    getAllCoins();
  }, []);

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
              value={values.description}
              onChange={handleChange}
            />
            <div className="wrap-inputs-form-add-expense">
              <input
                type="number"
                name="value"
                placeholder="Valor"
                id="value-input-form-insert"
                required
                value={values.value}
                onChange={handleChange}
              />
              <select id="coin-input" className="select-coin">
                {listAllCoins.map((coin) => {
                  return (
                    <option key={coin.in} value={values.coin} onChange={handleChange}>
                      {coin}
                    </option>
                  );
                })}
              </select>
            </div>
            <select className="space-pay" id="paymentMethod-input-form-insert">
              {payment.map((pay) => {
                return (
                  <option key={pay.in} value={values.paymentMethod} onChange={handleChange}>
                    {pay}
                  </option>
                );
              })}
            </select>
            <h5 className="desc">Método de pagamento</h5>

            <select className="space" id="tag-input-form-insert">
              {tag.map((tags) => {
                return (
                  <option key={tags.in} value={values.tag} onChange={handleChange}>
                    {tags}
                  </option>
                );
              })}
            </select>
            <h5 className="desc-tag">Tags</h5>
            <button className="btn-submit" type="button" onClick={handleAddExpense}>
              Adicionar Despesa
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
