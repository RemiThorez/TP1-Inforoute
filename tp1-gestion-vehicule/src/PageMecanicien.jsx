import React, { useState } from 'react';
import './css/Mecanicien.css';

const PageMecanicien = ({ rendezVous = [] }) => {
  const [ongletActif, setOngletActif] = useState('profil');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [adresse, setAdresse] = useState('');
  const [messageSauvegarde, setMessageSauvegarde] = useState('');
  const [rendezVousState, setRendezVousState] = useState(rendezVous);

  const accepterRendezVous = (index) => {
    const updatedRendezVous = [...rendezVousState];
    updatedRendezVous[index].statut = 'Accepté';
    setRendezVousState(updatedRendezVous);
  };

  const refuserRendezVous = (index) => {
    const updatedRendezVous = [...rendezVousState];
    updatedRendezVous[index].statut = 'Refusé';
    setRendezVousState(updatedRendezVous);
  };

  const sauvegarderProfil = () => {
    if (nom && prenom && telephone && adresse) {
      // Logique pour sauvegarder le profil
      setMessageSauvegarde('Profil sauvegardé avec succès !');
    }
  };

  const formEstValide = nom && prenom && telephone && adresse; // Vérifie que tous les champs sont remplis

  return (
    <div className="mecanicien-container">
      <nav className="tabs">
        <ul>
          <li className={ongletActif === 'profil' ? 'active' : ''} onClick={() => setOngletActif('profil')}>
            Modifier mon profil
          </li>
          <li className={ongletActif === 'gererRendezVous' ? 'active' : ''} onClick={() => setOngletActif('gererRendezVous')}>
            Gérer les rendez-vous
          </li>
        </ul>
      </nav>

      <div className="content">
        {ongletActif === 'profil' && (
          <div className="profile-tab">
            <h2>Modifier mon profil</h2>
            <input
              type="text"
              placeholder="Entrez le nouveau nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Entrez le nouveau prénom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Entrez le nouveau numéro de téléphone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Entrez la nouvelle adresse"
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              required
            />
            <button onClick={sauvegarderProfil} disabled={!formEstValide}>
              Sauvegarder
            </button>
            {messageSauvegarde && <p style={{ color: 'green' }}>{messageSauvegarde}</p>}
          </div>
        )}

        {ongletActif === 'gererRendezVous' && (
          <div className="rendezvous-tab">
            <h2>Gérer les rendez-vous</h2>
            {rendezVousState.length > 0 ? (
              rendezVousState.map((rv, index) => (
                <div key={index}>
                  <p>Client : {rv.client}</p>
                  <p>Service : {rv.service}</p>
                  <p>Date : {rv.date}</p>
                  <p>Statut : {rv.statut}</p>
                  <button onClick={() => accepterRendezVous(index)}>Accepter</button>
                  <button onClick={() => refuserRendezVous(index)}>Refuser</button>
                </div>
              ))
            ) : (
              <p>Vous n'avez aucun rendez-vous en attente.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageMecanicien;
