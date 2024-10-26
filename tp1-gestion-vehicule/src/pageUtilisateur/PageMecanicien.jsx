import React, { useState, useEffect } from 'react';

const mecaniciens = [
  { id: 1, username: "kminchelle", firstName: "Kurtis", lastName: "Minchelle", phone: "123-456-7890", address: "1234 Maple St." },
  { id: 2, username: "atuny0", firstName: "Anabelle", lastName: "Tuney", phone: "234-567-8901", address: "2345 Oak St." },
  { id: 3, username: "hbingley1", firstName: "Henry", lastName: "Bingley", phone: "345-678-9012", address: "3456 Pine St." },
  { id: 4, username: "darvink", firstName: "Darvin", lastName: "Kinsley", phone: "456-789-0123", address: "4567 Birch St." },
];

const PageMecanicien = () => {
  const [mecanicien, setMecanicien] = useState(mecaniciens[0]); // Définir un mécanicien par défaut
  const [rendezVousState, setRendezVousState] = useState([]);
  const [ongletActif, setOngletActif] = useState('profil');
  const [commentaireRefus, setCommentaireRefus] = useState('');

  useEffect(() => {
    const allRendezVous = JSON.parse(localStorage.getItem('rdvs')) || [];
    if (mecanicien) {
      const filteredRendezVous = allRendezVous.filter(rdv => rdv.mecanicienId === mecanicien.id);
      setRendezVousState(filteredRendezVous);
    }
  }, [mecanicien]);

  const sauvegarderProfil = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedMecanicien = {
      ...mecanicien,
      firstName: formData.get('prenom'),
      lastName: formData.get('nom'),
      phone: formData.get('telephone'),
      address: formData.get('adresse')
    };
    setMecanicien(updatedMecanicien);
    alert("Profil mis à jour avec succès.");
  };

  const refuserRendezVous = (index) => {
    const updatedRendezVous = [...rendezVousState];
    updatedRendezVous[index].statut = 'Refusé';
    updatedRendezVous[index].commentaire = commentaireRefus;
    setRendezVousState(updatedRendezVous);
    localStorage.setItem('rdvs', JSON.stringify(updatedRendezVous));
  };

  return (
    <div className="mecanicien-container" style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: 'auto' }}>
      <div className="user-info">
        <h2>Bienvenue {mecanicien.firstName} {mecanicien.lastName} dans votre espace Mécanicien</h2>
        <p><strong>Téléphone :</strong> {mecanicien.phone || "Non disponible"}</p>
        <p><strong>Adresse :</strong> {mecanicien.address || "Non disponible"}</p>
      </div>
      <nav className="tabs" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button style={{ cursor: 'pointer' }} className={ongletActif === 'profil' ? 'active' : ''} onClick={() => setOngletActif('profil')}>
          Modifier mon profil
        </button>
        <button style={{ cursor: 'pointer' }} className={ongletActif === 'gererRendezVous' ? 'active' : ''} onClick={() => setOngletActif('gererRendezVous')}>
          Gérer les rendez-vous
        </button>
      </nav>

      <div className="content">
        {ongletActif === 'profil' && (
          <form onSubmit={sauvegarderProfil}>
            <input type="text" name="prenom" placeholder="Prénom" defaultValue={mecanicien.firstName} />
            <input type="text" name="nom" placeholder="Nom" defaultValue={mecanicien.lastName} />
            <input type="text" name="telephone" placeholder="Téléphone" defaultValue={mecanicien.phone} />
            <input type="text" name="adresse" placeholder="Adresse" defaultValue={mecanicien.address} />
            <button type="submit">Sauvegarder</button>
          </form>
        )}
        {ongletActif === 'gererRendezVous' && (
          <div className="rendezvous-tab">
            <h2>Gérer les rendez-vous</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f2f2f2', borderBottom: '1px solid #ddd' }}>
                  <th style={{ padding: '8px', border: '1px solid #ddd' }}>Client</th>
                  <th style={{ padding: '8px', border: '1px solid #ddd' }}>Service</th>
                  <th style={{ padding: '8px', border: '1px solid #ddd' }}>Date</th>
                  <th style={{ padding: '8px', border: '1px solid #ddd' }}>Statut</th>
                  <th style={{ padding: '8px', border: '1px solid #ddd' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rendezVousState.map((rv, index) => (
                  <tr key={index}>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{rv.client}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{rv.service}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{rv.date}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{rv.statut}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                      <button onClick={() => accepterRendezVous(index)}>Accepter</button>
                      <input type="text" placeholder="Commentaire de refus" value={commentaireRefus} onChange={e => setCommentaireRefus(e.target.value)} />
                      <button onClick={() => refuserRendezVous(index)}>Refuser</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageMecanicien;
