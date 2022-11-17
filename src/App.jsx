import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Wallet from "./pages/wallet/Wallet.jsx";
import Login from "./pages/login/Login.jsx";
import { Provider } from 'react-redux';
import { store } from './store.js';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/wallet" element={<Wallet />} />
                    <Route path="/" element={<Login />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;