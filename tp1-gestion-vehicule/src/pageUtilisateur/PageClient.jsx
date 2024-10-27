import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import GestionVehicule from '../gestionVehicule/GestionVehicule';
import { connect } from 'react-redux';
import axios from 'axios';
import { obtenirVehiculesAPI } from '../actions/ActionsVehicules';

const mecaniciens = [
  { id: 1, firstName: "Kurtis", lastName: "Minchelle" },
  { id: 2, firstName: "Anabelle", lastName: "Tuney" },
  { id: 3, firstName: "Henry", lastName: "Bingley" },
  { id: 4, firstName: "Darvin", lastName: "Kinsley" },
];

class PageClient extends Component 
{
    constructor(props) 
    {
        super(props);
        this.state = {
            ongletActif: "modifierProfil",
            dateSelectionnee: new Date(),
            rdvs: JSON.parse(localStorage.getItem('rdvs')) || [],
            datesReservees: JSON.parse(localStorage.getItem('datesReservees')) || [],
            message: "",
            erreur: false,
        };
    }

    componentDidMount()
    {
        this.obtenirVehiculesClient();
    };

    obtenirVehiculesClient() 
    {
        const url = "https://dummyjson.com/c/d8db-c2db-4187-85d5" //Avec notre "vrai" api nous ajouterions l'id de l'utilisateur pour obtenir seulement ses véhicules
        this.props.obtenirVehiculesAPI(url);
    };

    componentDidUpdate() 
    {
        localStorage.setItem('rdvs', JSON.stringify(this.state.rdvs));
        localStorage.setItem('datesReservees', JSON.stringify(this.state.datesReservees));
    };

    envoiDemandeRdv = (e) => 
    {
        e.preventDefault();
        const data = new FormData(e.target);
        const { user } = this.state;

        const rdv = {
            userId: user.id,
            clientNom: user.firstName,
            clientPrenom: user.lastName,
            date: this.state.dateSelectionnee.toLocaleDateString('fr-FR'),
            heure: data.get('heure'),
            mecanicienId: parseInt(data.get('mecanicien')),
            vehicule: data.get('vehicule'),
            besoin: data.get('besoin'),
            statut: 'En attente de confirmation par le mécanicien',
            commentaire: "",
        };

        if (this.state.datesReservees.includes(rdv.date)) 
        {
            this.setState({ message: "Date déjà réservée" });
        } 
        else 
        {
            this.setState((prevState) => ({
                rdvs: [...prevState.rdvs, rdv],
                datesReservees: [...prevState.datesReservees, rdv.date],
                message: "Rendez-vous pris avec succès !",
            }));
        }
    };

     modifierOngletActif = (e) => 
    {
        this.setState({ ongletActif: e.target.name, message: ""});
    };

    handleDateChange = (date) => 
    {
        if (this.state.datesReservees.includes(date.toLocaleDateString('fr-FR'))) 
        {
            this.setState({ message: "Date déjà réservée" });
        } 
        else 
        {
            this.setState({ dateSelectionnee: date, message: "" });
        }
    };

    getUserRdvs = () => 
    {
      const { user, rdvs } = this.state;
      return rdvs.filter((rdv) => rdv.userId === user.id);
    };

    annulerRdv = (index) => 
    {
        this.setState((prevState) => 
        {
            const rdvs = [...prevState.rdvs];
            rdvs[index].statut = 'En attente de validation par le mécanicien';
            return { rdvs };
        });
    };

    sauvegarderNouvelleInfo = async (e) => 
    {
        e.preventDefault();
        const donneeFormulaire = new FormData(e.target);
        
        let utilisateur = {
            lastName: donneeFormulaire.get('nom'),
            firstName: donneeFormulaire.get('prenom'),
            phone: donneeFormulaire.get('tel'),
            address: { adresse: donneeFormulaire.get('adresse') },
        };

        const reponse = await axios.patch(`https://dummyjson.com/users/${this.props.user.id}`,utilisateur);

        if(reponse.status !== 200)
        {
            this.setState({message: "Modification du profil à échoué!"});
        }
        else
        {
            this.setState({message: "Modification du profil réussi !"});
        }

        utilisateur = {...this.props.user};
        utilisateur.lastName = donneeFormulaire.get('nom');
        utilisateur.firstName = donneeFormulaire.get('prenom');

        this.props.setUser(utilisateur);
    };

    render() 
    {
        const userRdvs = this.getUserRdvs();

        return (
            <div>
                <div>
                    <h2>Bienvenue {this.props.user.firstName} {this.props.user.lastName} dans votre espace Client</h2>
                </div>

                <nav style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
                    <button name="modifierProfil" onClick={this.modifierOngletActif} style={tabButtonStyle}>Modifier mon profil</button>
                    <button name="prendreRdv" onClick={this.modifierOngletActif} style={tabButtonStyle}>Prise de rendez-vous</button>
                    <button name="mesRdvs" onClick={this.modifierOngletActif} style={tabButtonStyle}>Mes rendez-vous</button>
                    <button name="gestionVehicule" onClick={this.modifierOngletActif} style={tabButtonStyle}>Mes véhicules</button>
                </nav>

                <div>
                    {this.state.ongletActif === 'modifierProfil' && (
                    <div>
                        <h3>Modifier mon profil</h3>
                        <form onSubmit={this.sauvegarderNouvelleInfo}>
                            <input type="text" name="nom" placeholder="Nom" required style={inputStyle} />
                            <input type="text" name="prenom" placeholder="Prénom" required style={inputStyle} />
                            <input type="tel" name="tel" placeholder="Téléphone" required style={inputStyle} />
                            <input type="text" name="adresse" placeholder="Adresse" required style={inputStyle} />
                            <button type="submit" style={submitButtonStyle}>Sauvegarder</button>
                        </form>
                        {this.state.message && <p style={{ color: 'green' }}>{this.state.message}</p>}
                    </div>
                    )}

                    {this.state.ongletActif === 'prendreRdv' && (
                    <div>
                        <h3>Prendre un rendez-vous</h3>
                        <form onSubmit={this.envoiDemandeRdv}>
                            <label>Véhicule :</label>
                            <select name="vehicule" required style={inputStyle}>
                                {this.props.vehicules.map((vehicule) => (<option key={vehicule.idVehicule}>{vehicule.fabricant}, {vehicule.modele}, {vehicule.annee}</option>))}
                            </select>
                        
                            <label>Mécanicien :</label>
                            <select name="mecanicien" required style={inputStyle}>
                                {mecaniciens.map((m) => (<option key={m.id} value={m.id}>{m.firstName} {m.lastName}</option>))}
                            </select>
                        
                            <label>Date :</label>
                            <Calendar onChange={this.handleDateChange} value={this.state.dateSelectionnee} locale="fr-FR" />
                        
                            <label>Heure :</label>
                            <input type="time" name="heure" required style={inputStyle} />
                            <label>Raison :</label>
                            <textarea name="besoin" required style={inputStyle} />
                        
                            <button type="submit" style={submitButtonStyle}>Prendre rendez-vous</button>
                        </form>
                        {this.state.message && this.state.erreur && <p style={{ color: 'red' }}>{this.state.message}</p>}
                        {this.state.message && <p style={{ color: 'green' }}>{this.state.message}</p>}
                    </div>
                    )}

                    {this.state.ongletActif === 'mesRdvs' && (
                    <div>
                        <h3>Mes rendez-vous</h3>
                        <table style={tableStyle}>
                            <thead>
                                <tr style={headerRowStyle}>
                                    <th style={headerCellStyle}>Date</th>
                                    <th style={headerCellStyle}>Heure</th>
                                    <th style={headerCellStyle}>Mécanicien</th>
                                    <th style={headerCellStyle}>Véhicule</th>
                                    <th style={headerCellStyle}>Raison</th>
                                    <th style={headerCellStyle}>Statut</th>
                                    <th style={headerCellStyle}>Commentaire</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userRdvs.map((rdv, index) => (
                                    <tr key={index} style={index % 2 ? rowStyleOdd : rowStyleEven}>
                                    <td style={cellStyle}>{rdv.date}</td>
                                    <td style={cellStyle}>{rdv.heure}</td>
                                    <td style={cellStyle}>
                                        {mecaniciens.find(m => m.id === rdv.mecanicienId)?.firstName} {mecaniciens.find(m => m.id === rdv.mecanicienId)?.lastName}
                                    </td>
                                    <td style={cellStyle}>{rdv.vehicule}</td>
                                    <td style={cellStyle}>{rdv.besoin}</td>
                                    <td style={cellStyle}>{rdv.statut}</td>
                                    <td style={cellStyle}>{rdv.commentaire}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    )}

                    {this.state.ongletActif === 'gestionVehicule' &&
                    <div>
                        <h3>Mes véhicules</h3>
                        <div>
                            <GestionVehicule></GestionVehicule>
                        </div>
                    </div>
                    }
                </div>
            </div>
        );
    }
}

const tabButtonStyle = {
  padding: '10px',
  cursor: 'pointer',
  border: 'none',
  backgroundColor: '#2196F3',
  color: 'white',
  borderRadius: '5px',
};

const inputStyle = {
  margin: '5px 0',
  padding: '10px',
  width: '100%',
};

const submitButtonStyle = {
  marginTop: '10px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
};

const headerRowStyle = { backgroundColor: '#f4f4f4' };
const headerCellStyle = { padding: '10px', border: '1px solid #ddd' };
const rowStyleEven = { backgroundColor: '#fff' };
const rowStyleOdd = { backgroundColor: '#f9f9f9' };
const cellStyle = { padding: '10px', border: '1px solid #ddd' };

const mapStateToProps = (state) => ({
  vehicules: state.vehicules,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
    setUser: (user) => dispatch({type: 'SET_USER',payload:user}),
    obtenirVehiculesAPI: (url) => dispatch(obtenirVehiculesAPI(url)),
});

export default connect(mapStateToProps,mapDispatchToProps)(PageClient);
