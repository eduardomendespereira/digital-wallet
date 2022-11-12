import './App.css';

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Wallet from "./pages/wallet/Wallet.jsx";
import Login from "./pages/login/Login.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;