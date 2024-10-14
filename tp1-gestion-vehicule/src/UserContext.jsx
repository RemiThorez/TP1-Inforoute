// src/UserContext.js
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [rendezVous, setRendezVous] = useState([]);

    const ajouterUtilisateur = utilisateur => {
        setUtilisateurs(prevUtilisateurs => [...prevUtilisateurs, utilisateur]);
    };

    const prendreRendezVous = nouveauRendezVous => {
        setRendezVous(prevRendezVous => [...prevRendezVous, nouveauRendezVous]);
    };

    const actualiserRendezVous = (id, statut) => {
        setRendezVous(prevRendezVous =>
            prevRendezVous.map(rv => rv.id === id ? { ...rv, statut } : rv)
        );
    };

    const mecaniciensDisponibles = () => {
        return utilisateurs.filter(utilisateur => utilisateur.role === 'mecanicien');
    };

    const rendezVousMecanicien = (courrielMecanicien) => {
        return rendezVous.filter(rv => rv.mecanicien === courrielMecanicien);
    };

    return (
        <UserContext.Provider value={{
            utilisateurs,
            ajouterUtilisateur,
            rendezVous,
            prendreRendezVous,
            actualiserRendezVous,
            mecaniciensDisponibles,
            rendezVousMecanicien
        }}>
            {children}
        </UserContext.Provider>
    );
};
