import React from "react";
import { Link } from "react-router-dom";
import css from "./Login.css";
import backgroundImg from "../../assets/background-login.png";
import {useNavigate} from "react-router-dom";

const Login = () => {

  let email;
  let password;

  function handleChangeLogin() {
    console.log('oi')
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    if (email) {
      if (!validateEmail()) {
        generateNotification(
          "Formato de email inválido",
          "notification-invalid-email",
          false
        );
      } else {
        clearNotification("notification-invalid-email");
      }
    }

    if (password) {
      if (!validatePassword()) {
        generateNotification(
          "A senha deve conter no mínimo 8 caracteres letras maiúsculas, minúsculas e pelo menos 1 caracter especial",
          "notification-invalid-password",
          false
        );
      } else {
        clearNotification("notification-invalid-password");
      }
    }
  }

  function handleLogin() {
    if (validateEmail() && validatePassword()) {
      navigate('/wallet')
    }
  }

  function generateNotification(message, nameElement, delay = true) {
    document.getElementById(nameElement).innerText = message;
    if (delay) {
      setTimeout(clearNotification, 2 * 1000, nameElement);
    }
  }

  function clearNotification(nameElement) {
    document.getElementById(nameElement).innerHTML = null;
  }

  function validateEmail() {
    var regerxEmail = /^[^\s@]+@[^\s@]+.[^\s@]+$/;

    if (regerxEmail.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  function validatePassword() {
    var regexPassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*\W){8,}/;

    if (regexPassword.test(password)) {
      return true;
    } else {
      return false;
    }
  }

  window.addEventListener("keyup", handleChangeLogin);

  const navigate = useNavigate();

  return (
    <section className="login-body">
      <div className="container" id="container">
        <div className="form-container sign-in-container">
          <form className={css}>
            <h1 className="login-title">Login para continuar</h1>
            <div id="notification-error" className="notificatiob-error"></div>
            <input id="email" type="email" placeholder="Email" />
            <div
              className="notification-invalid"
              id="notification-invalid-email"
            ></div>
            <input
              id="password"
              type="password"
              placeholder="Senha"
              pattern="(?=.*[a-z])(?=.*[A-Z]).{8,}"
            />
            <div
              className="notification-invalid"
              id="notification-invalid-password"
            ></div>
            <button
              className={css.button}
              type="button"
              id="login"
              onClick={handleLogin}
            >
              Login
            </button>
          </form>
        </div>
        <div className="overlay-container">
          <img className="background-login-image" src={backgroundImg} />
        </div>
      </div>
    </section>
  );
};

export default Login;
