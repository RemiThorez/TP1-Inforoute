import React, { useState } from 'react';
import './Client.css';
import Vehicule from './gestionVehicule/Vehicule';
import GestionVehicule from './gestionVehicule/GestionVehicule';

const PageClient = () => {
  const [ongletActif, setOngletActif] = useState('profil');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [adresse, setAdresse] = useState('');
  const [rendezVous, setRendezVous] = useState([]);
  const [messageSauvegarde, setMessageSauvegarde] = useState('');
  const [vehicule, setVehicule] = useState('');
  const [symptomes, setSymptomes] = useState('');
  const [date, setDate] = useState('');
  const [heure, setHeure] = useState('');

  const prendreRendezVous = (mecanicien) => {
    const nouveauRendezVous = {
      mecanicien,
      vehicule,
      symptomes,
      date,
      heure,
      statut: 'En attente',
    };
    setRendezVous([...rendezVous, nouveauRendezVous]);
    setMessageSauvegarde('Rendez-vous pris avec succès !');
  };

  const sauvegarderProfil = () => {
    if (nom && prenom && telephone && adresse) {
      setMessageSauvegarde('Profil sauvegardé avec succès !');
    }
  };

  const formEstValide = nom && prenom && telephone && adresse; // Validation du formulaire

  return (
    <div>
    <div className="client-container">
      <nav className="tabs">
        <ul>
          <li className={ongletActif === 'profil' ? 'active' : ''} onClick={() => setOngletActif('profil')}>
            Modifier mon profil
          </li>
          <li className={ongletActif === 'prendreRendezVous' ? 'active' : ''} onClick={() => setOngletActif('prendreRendezVous')}>
            Prendre un rendez-vous
          </li>
          <li className={ongletActif === 'annulerRendezVous' ? 'active' : ''} onClick={() => setOngletActif('annulerRendezVous')}>
            Annuler un rendez-vous
          </li>
          <li className={ongletActif === 'gestionVehicule' ? 'active' : ''} onClick={() => setOngletActif('gestionVehicule')}>
            Gérer mes véhicules
          </li>
        </ul>
      </nav>

      <div className="content">
        {ongletActif === 'profil' && (
          <div className="profile-tab">
            <h3>Modifier mon profil</h3>
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

        {ongletActif === 'prendreRendezVous' && (
          <div className="rendezvous-tab">
            <h3>Prendre un rendez-vous</h3>

            <label>Véhicule :</label>
            <select value={vehicule} onChange={(e) => setVehicule(e.target.value)} required>
              <option value="">Sélectionner un véhicule</option>
              <option value="Voiture">Voiture</option>
              <option value="Moto">Moto</option>
              <option value="Camion">Camion</option>
            </select>

            <label>Date :</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

            <label>Heure :</label>
            <input type="time" value={heure} onChange={(e) => setHeure(e.target.value)} required />

            <label>Symptômes / Services :</label>
            <textarea
              placeholder="Entrez les symptômes ou les services souhaités (changement d’huile, remplacement des pneus, etc.)"
              value={symptomes}
              onChange={(e) => setSymptomes(e.target.value)}
              required
            />

            <button onClick={() => prendreRendezVous('Mécanicien X')}>
              Confirmer le rendez-vous
            </button>

            {messageSauvegarde && <p style={{ color: 'green' }}>{messageSauvegarde}</p>}
          </div>
        )}

        {ongletActif === 'annulerRendezVous' && (
          <div className="cancel-tab">
            <h3>Annuler un rendez-vous</h3>
            {rendezVous.length > 0 ? (
              rendezVous.map((rv, index) => (
                <div key={index}>
                  <p>Mécanicien : {rv.mecanicien}</p>
                  <p>Véhicule : {rv.vehicule}</p>
                  <p>Date : {rv.date}</p>
                  <p>Heure : {rv.heure}</p>
                  <p>Statut : {rv.statut}</p>
                  <button
                    onClick={() => {
                      const updatedRendezVous = rendezVous.filter((_, i) => i !== index);
                      setRendezVous(updatedRendezVous);
                    }}
                  >
                    Annuler
                  </button>
                </div>
              ))
            ) : (
              <p>Vous n'avez aucun rendez-vous.</p>
            )}
          </div>
        )}

        {ongletActif === 'gestionVehicule' && (
            <div>
            <h3>Mes véhicules</h3>
            <div>
            <GestionVehicule vehicules={
                [<Vehicule fabricant="Suzuki" modele="SX4" annee={2010} key={0} />,
                <Vehicule fabricant="Suzuki" modele="SX4" annee={2008} key={1}/>,
                <Vehicule fabricant="Suzuki" modele="SX4" annee={2009} key={2}/>,
                <Vehicule fabricant="Suzuki" modele="SX4" annee={2010} key={3}/>]}>
            </GestionVehicule>
          </div>
          </div>
        )}

      </div>
    </div>

        </div>
  );
};

export default PageClient;
