// src/App.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';  // Assurez-vous que le chemin vers le fichier CSS est correct

const App = () => {
    const [courriel, setCourriel] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [erreur, setErreur] = useState('');
    const navigate = useNavigate();

    const handleConnexion = (e) => {
        e.preventDefault();
        let utilisateurs = JSON.parse(localStorage.getItem('utilisateurs')) || [];
        const utilisateur = utilisateurs.find(u => u.courriel === courriel && u.motDePasse === motDePasse);
        if (utilisateur) {
            utilisateur.role === 'client' ? navigate('/pageclient') : navigate('/pagemecanicien');
        } else {
            setErreur('Identifiants incorrects.');
        }
    };

    const handleInscription = () => {
        navigate('/inscription'); // Redirige vers la page d'inscription
    };

    return (
        <div className="login-container">
            <h1>Connexion</h1>
            <form onSubmit={handleConnexion} className="login-form">
                <input type="email" value={courriel} onChange={e => setCourriel(e.target.value)} placeholder="Courriel" required />
                <input type="password" value={motDePasse} onChange={e => setMotDePasse(e.target.value)} placeholder="Mot de passe" required />
                <button type="submit">Se connecter</button>
                {erreur && <p className="error-message">{erreur}</p>}
                <button type="button" onClick={handleInscription} className="signup-button">Inscrivez-vous</button>
            </form>
        </div>
    );
};

export default App;
