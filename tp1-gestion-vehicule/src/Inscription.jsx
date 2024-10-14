import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Inscription.css';  // Assurez-vous que le CSS est bien importé

const PageInscription = () => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [courriel, setCourriel] = useState('');
    const [numeroTelephone, setNumeroTelephone] = useState('');
    const [adresse, setAdresse] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [confirmationMotDePasse, setConfirmationMotDePasse] = useState('');
    const [role, setRole] = useState('client');
    const [messageErreur, setMessageErreur] = useState('');
    const navigate = useNavigate();

    const gererSoumission = (e) => {
        e.preventDefault();
        if (motDePasse !== confirmationMotDePasse) {
            setMessageErreur('Les mots de passe ne correspondent pas.');
            return;
        }
        let utilisateurs = JSON.parse(localStorage.getItem('utilisateurs')) || [];
        utilisateurs.push({ nom, prenom, courriel, numeroTelephone, adresse, motDePasse, role });
        localStorage.setItem('utilisateurs', JSON.stringify(utilisateurs));
        navigate('/'); // Redirection vers la page principale ou de connexion
    };

    return (
        <div className="inscription-container">
            <h2>Inscription</h2>
            <form onSubmit={gererSoumission}>
                <input type="text" value={nom} onChange={e => setNom(e.target.value)} placeholder="Nom" required />
                <input type="text" value={prenom} onChange={e => setPrenom(e.target.value)} placeholder="Prénom" required />
                <input type="email" value={courriel} onChange={e => setCourriel(e.target.value)} placeholder="Adresse e-mail" required />
                <input type="tel" value={numeroTelephone} onChange={e => setNumeroTelephone(e.target.value)} placeholder="Numéro de téléphone" required />
                <input type="text" value={adresse} onChange={e => setAdresse(e.target.value)} placeholder="Adresse" required />
                <input type="password" value={motDePasse} onChange={e => setMotDePasse(e.target.value)} placeholder="Mot de passe" required />
                <input type="password" value={confirmationMotDePasse} onChange={e => setConfirmationMotDePasse(e.target.value)} placeholder="Confirmer le mot de passe" required />
                <select value={role} onChange={e => setRole(e.target.value)} required>
                    <option value="client">Client</option>
                    <option value="mecanicien">Mécanicien</option>
                </select>
                {messageErreur && <p className="error-message">{messageErreur}</p>}
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
};

export default PageInscription;
