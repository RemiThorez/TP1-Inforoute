import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; 

const App = () => {

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
        <>
            <button onClick={gererBtnInscription}>Inscription</button>
            <button onClick={gererBtnClient}>Connexion Client</button>
            <button onClick={gererBtnMecanicien}>Connexion Mécanicien</button>
        </>
    );
};

export default App;
