import './App.css';

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home.js";
import Login from "./pages/login/Login.js";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;