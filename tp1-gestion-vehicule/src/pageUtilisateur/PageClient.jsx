import React, { Component } from 'react';
import '../css/Client.css';
import GestionVehicule from '../gestionVehicule/GestionVehicule';
import { connect } from 'react-redux';
import axios from 'axios';
import { obtenirVehicules } from '../actions/ActionsVehicules';

class PageClient extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            ongletActif: "modifierProfil"
        };

        // Appelle avec redux-thunk afin de peupler les différents dropdown button
    }

    componentDidMount()
    {
      this.obtenirVehiculesClient();
    }

    obtenirVehiculesClient() 
    {
      const url = "https://dummyjson.com/c/d8db-c2db-4187-85d5" //Avec notre "vrai" api nous ajouterions l'id de l'utilisateur pour obtenir seulement ses véhicules
      this.props.obtenirVehicules(url);
    }

    sauvegarderNouvelleInfo = async (e) =>
    {
        e.preventDefault();
        const donneeFormulaire = new FormData(e.target);
        
        const utilisateur = {
            lastName: donneeFormulaire.get('nom'),
            firstName: donneeFormulaire.get('prenom'),
            phone: donneeFormulaire.get('tel'),
            address: { adresse: donneeFormulaire.get('adresse') },
        };
        const reponse = await axios.patch(`https://dummyjson.com/users/${this.props.user.id}`,utilisateur);
        console.log(reponse);
    }

    envoiDemandeRdv = (e) =>
    {

    }

    chargerHoraireMecano = (e) =>
    {

    }

    modifierOngletActif = (e) =>
    {
        this.setState({ongletActif: e.target.name});
    }

    render()
    {
        return (
        <div>
        <div className="client-container">
          <nav className="tabs">
                <button name='modifierProfil' onClick={this.modifierOngletActif}>Modifier mon profils</button>
                <button name='prendreRdv' onClick={this.modifierOngletActif}>Prise de rendez-vous</button>
                <button name='mesRdvs' onClick={this.modifierOngletActif}>Mes rendez-vous</button>
                <button name='gestionVehicule' onClick={this.modifierOngletActif}>Mes véhicules</button>
          </nav>
    
          <div className="content">
            {this.state.ongletActif === 'modifierProfil' && (
              <div className="profile-tab">
                <h3>Modifier mon profil</h3>

                <form onSubmit={this.sauvegarderNouvelleInfo}>
                    <input type="text"placeholder="Entrez le nouveau nom" name="nom" required/>
                    <input type="text"placeholder="Entrez le nouveau prénom" name="prenom" required/>
                    <input type="tel"placeholder="Entrez le nouveau numéro de téléphone" name="tel" required/>
                    <input type="text"placeholder="Entrez la nouvelle adresse" name="adresse" required/>
                    <button type="submit">Sauvegarder</button>
                </form>
              </div>
            )}
    
            {this.state.ongletActif === 'prendreRdv' && (
              <div className="rendezvous-tab">
                <h3>Prendre un rendez-vous</h3>

                <form onSubmit={this.envoiDemandeRdv}>
                    <label>Véhicule :</label>
                    <select name='vehicule' required>
                        {this.props.vehicules.map((vehicule) => (<option key={vehicule.idVehicule}> {vehicule.fabricant}, {vehicule.modele}, {vehicule.annee}</option>))}
                    </select>

                    <label>Mécanicien</label>
                    <select name='mecanicien' value={""} onChange={this.chargerHoraireMecano}>
                        {/* this.state.mecanicien? depend de comment fonctionne thunk */}
                    </select>
                
                    <label>Besoin :</label>
                    <textarea name="besoin" placeholder="Entrez les symptômes ou les services souhaités (changement d’huile, remplacement des pneus, etc.)"required/>
                
                    <button type="submit">Envoyer demande</button>
                </form>
              </div>
            )}
             {this.state.ongletActif === 'mesRdvs' && (
              <div className="rendezvous-tab">
                <h3>Mes rendez-vous</h3>
              </div>
            )}
            {this.state.ongletActif === 'gestionVehicule' &&
                <div>
                <h3>Mes véhicules</h3>
                <div>
                <GestionVehicule /*argsVehicules={vehicules}*/></GestionVehicule>
              </div>
              </div>
            }
          </div>
        </div>
        </div>
      );
    }
}
     
const mapStateToProps = (state) => ({
    vehicules: state.vehicules,
    user: state.user,
});

const mapDispatchToProps = {
  obtenirVehicules,
};


export default connect(mapStateToProps,mapDispatchToProps)(PageClient);
    