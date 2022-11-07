import React from "react";
import css from "./Wallet.css";
import { Link } from "react-router-dom";
import logoWallet from "../../assets/logo-wallet.png";
import exitIcon from "../../assets/exit-icon.png";
import moneyIcon from "../../assets/money-icon.png";

const Wallet = () => {
  return (
    <section className="wallet-body">
      <div>
        <header className="header">
          <nav className="navbar">
            <a className="logo-wallet" href="">
              <img src={logoWallet} />
            </a>
            <h1>CARTEIRA</h1>
            <a className="exit-icon" href="">
              <img src={exitIcon} />
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
            <button className="btn-insert" type="button">
              Cadastrar Despesa
            </button>
          </div>
        </div>
        <h1>Wallet</h1>
      </div>
    </section>
  );
};

export default Wallet;
