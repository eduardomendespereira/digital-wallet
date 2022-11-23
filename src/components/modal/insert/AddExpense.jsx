import * as React from "react";
import styles from "./AddExpense.css";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Modal from "@material-ui/core/Modal";
import { addExpense } from '../../../features/expenseSlice.js'
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

export default function AddExpense() {
  const tags = ["Alimentação", "Lazer", "Trabalho", "Transporte", "Saúde"];
  const payment = ["Dinheiro", "Cartão de crédito","Cartão de débito"];
  const [coins, setCoins] = React.useState([{}]);
  let listAllCoins = Object.keys(coins);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialState = {
    value: '',
    description: '',
    coin: 'USD',
    paymentMethod: 'Dinheiro',
    tag: 'Alimentação'
  }
  const [values, setValues] = useState(initialState);
  

  const handleAddExpense = () => {
    dispatch(addExpense({
      id: uuidv4(),
      ...values
    }))
    setValues(initialState)
  }

  function handleChange({ target: { name, value }}) {
    setValues((oldValues) => ({
      ...oldValues,
      [name]: value
    }))
  }

  React.useEffect(() => {
    const fetchData = async() => {
        try {
            const res = await fetch('https://economia.awesomeapi.com.br/json/all')
            const json = await res.json()
            setCoins(json)
            listAllCoins = Object.keys(coins);
        } catch (err) {
            console.log(err)
        }
        
    }
    fetchData()
}, [])

  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <button
        className="btn-insert"
        data-testid='insert-expense-button'
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
              data-testid='description-input-id'
              value={values.description}
              onChange={handleChange}
            />
            <div className="wrap-inputs-form-add-expense">
              <input
                type="number"
                name="value"
                placeholder="Valor"
                id="value-input-form-insert"
                data-testid='value-input-id'
                required
                value={values.value}
                onChange={handleChange}
              />
              <select id="coin-input" className="select-coin" name="coin" onChange={handleChange}>
                {listAllCoins.map((coin) => {
                  return (
                    <option data-testid='coin-input-id' key={coin} value={coin}>
                      {coin}
                    </option>
                  );
                })}
              </select>
            </div>
            <select className="space-pay" name="paymentMethod" id="paymentMethod-input-form-insert" onChange={handleChange}>
              {payment.map((pay) => {
                return (
                  <option data-testid='payment-input-id' key={pay} value={pay}>
                    {pay}
                  </option>
                );
              })}
            </select>
            <h5 className="desc">Método de pagamento</h5>

            <select className="space" name="tag" id="tag-input-form-insert" onChange={handleChange}>
              {tags.map((tag) => {
                return (
                  <option data-testid='tag-input-id' key={tag} value={tag}>
                    {tag}
                  </option>
                );
              })}
            </select>
            <h5 className="desc-tag">Tags</h5>
            <button data-testid='save-expense-button' className="btn-submit" type="button" onClick={handleAddExpense}>
              Adicionar Despesa
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
