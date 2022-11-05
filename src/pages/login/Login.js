import React from 'react';
import { Link } from 'react-router-dom';
import css from './Login.css';
import backgroundImg from '../../assets/background-login.png'

const Login = () => {
    return (
        <div class="container" id="container">
            <div class="form-container sign-in-container">
                <form>
                    <h1 className='login-title'>Login para continuar</h1>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Senha" />
                    <button className='login-button'>Login</button>
                </form>
            </div>
            <div class="overlay-container">
                <img className='background-login-image' src={backgroundImg} />
            </div>
        </div>
    );
}

export default Login;