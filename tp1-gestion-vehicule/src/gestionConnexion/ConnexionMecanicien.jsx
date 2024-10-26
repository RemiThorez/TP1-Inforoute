import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const mecaniciens = [
  { id: 1, username: "kminchelle", password: "kminchellepass" },
  { id: 2, username: "atuny0", password: "atunypass" },
  { id: 3, username: "hbingley1", password: "hbingley1" },
  { id: 4, username: "darvink", password: "darvinkpass" },
];

const PageConnexionMecanicien = () => {
  const [messageErreur, setMessageErreur] = useState('');
  const navigate = useNavigate();

  const gererConnexion = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.mdp.value;

    const mecanicienValide = mecaniciens.find(
      (m) => m.username === username && m.password === password
    );

    if (mecanicienValide) {
      localStorage.setItem('mecanicien', JSON.stringify(mecanicienValide));
      navigate('/pagemecanicien');
    } else {
      setMessageErreur("Nom d'utilisateur ou mot de passe incorrect !");
    }
  };

  return (
    <div className="login-container">
      <h1>Connexion Mécanicien</h1>
      <form onSubmit={gererConnexion} className="login-form">
        <input type="text" name="username" placeholder="Nom d'utilisateur" required />
        <input type="password" name="mdp" placeholder="Mot de passe" required />
        <button type="submit">Se connecter</button>
        {messageErreur && <p className="error-message">{messageErreur}</p>}
      </form>
    </div>
  );
};

export default PageConnexionMecanicien;
