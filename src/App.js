import logo from './logo.svg';
import './App.css';
import { Suspense } from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Index from './Compnent/Index';
import Login from './Compnent/Login';
import Register from './Compnent/Register';
// import Accueil from './Compnent/Accueil';
import Profile from './Compnent/Profile';
import Transaction from './Compnent/Transaction';
import Configuration from './Compnent/Configuration';
import HistoriqueTransaction from './Compnent/HistoriqueTransaction';
import HistoriqueReception from './Compnent/HistoriqueReception';

function App() {
  return (
    <Router >
        <Suspense fallback={<div className={"chargement"}>Loading...</div> }>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* <Route path="/accueil" element={<Accueil />} /> */}
                <Route path="/profile" element={<Profile />} />
                <Route path="/transaction" element={<Transaction />} />
                <Route path="/configuration" element={<Configuration />} />
                <Route path="/historiqueTransaction" element={<HistoriqueTransaction />} />
                <Route path="/historiqueReception" element={<HistoriqueReception />} />
            </Routes>
        </Suspense>
    </Router>
  );
}

export default App;
