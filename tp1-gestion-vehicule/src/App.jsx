import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/App.css';

const App = () => 
{
    const navigate = useNavigate();

    const gererBtnInscription=() =>
    {
        navigate("./inscription");
    }
    const gererBtnClient=() =>
    {
        navigate("./pageconnexionclient");
    }
    const gererBtnMecanicien=() =>
    {
        navigate("./pageconnexionmecanicien");
    }

    return (
        <div className="login-container">
            <h1>Bienvenue</h1>
            <button onClick={gererBtnInscription}>Inscription</button>
            <button onClick={gererBtnClient}>Connexion Client</button>
            <button onClick={gererBtnMecanicien}>Connexion Mécanicien</button>
        </div>
    );
};

export default App;
