import React, { Component } from 'react';
import { obtenirRdvsAPI } from '../actions/ActionsRdvs';
import Rdv from '../gestionRdv/Rdv';
import { connect } from 'react-redux';
import axios from 'axios';

class PageMecanicien extends Component
{
    constructor(props) 
    {
        super(props);
        this.state = 
        {
            ongletActif: "modifierProfil",
            dateSelectionnee: new Date(),
            message: "",
            erreur: false,
            benefices:0,
        };
    }

    componentDidMount()
    {
        this.obtenirRendezVous();
    };

    calculerBenefice = (e) =>
    {
        const totalCouts = this.props.rdvs.reduce((total, rdv) => total + (typeof rdv.cout === 'number' ? rdv.cout : parseFloat(rdv.cout) || 0), 0);
        const benefices = Math.round(totalCouts * 0.15);
        this.setState({ benefices: benefices});
        this.modifierOngletActif(e);
    }

    obtenirRendezVous()
    {
        const url = "https://dummyjson.com/c/8e46-5801-45bc-8167";//Avec notre "vrai" api nous ajouterions l'id de l'utilisateur pour obtenir seulement ses rendez-vous
        this.props.obtenirRdvsAPI(url);
    };

    modifierOngletActif = (e) => 
    {
        this.setState({ ongletActif: e.target.name, message: ""});
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
                this.setState({message: "Modification du profil à échoué!",erreur:true});
            }
            else
            {
                this.setState({message: "Modification du profil réussi !",erreur:false});
            }
    
            utilisateur = {...this.props.user};
            utilisateur.lastName = donneeFormulaire.get('nom');
            utilisateur.firstName = donneeFormulaire.get('prenom');
    
            this.props.setUser(utilisateur);
    };

    render()
    {
        return (
            <div className="client-container">
                <div>
                    <h2>Bienvenue {this.props.user.firstName} {this.props.user.lastName} dans votre espace de Mécanicien</h2>
                </div>

                <nav style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
                    <button name="modifierProfil" onClick={this.modifierOngletActif}>Modifier mon profil</button>
                    <button name="mesRdvs" onClick={this.modifierOngletActif}>Mes rendez-vous</button>
                    <button name="mesBenefices" onClick={this.calculerBenefice}>Mes bénéfices</button>
                </nav>

                <div>
                    {this.state.ongletActif === 'modifierProfil' && (
                    <div>
                        <h3>Modifier mon profil</h3>
                        <form onSubmit={this.sauvegarderNouvelleInfo}>
                            <input type="text" name="nom" placeholder="Nom" required />
                            <input type="text" name="prenom" placeholder="Prénom" required />
                            <input type="tel" name="tel" placeholder="Téléphone" required />
                            <input type="text" name="adresse" placeholder="Adresse" required />
                            <button type="submit">Sauvegarder</button>
                        </form>
                        {this.state.message && <p style={{ color: 'green' }}>{this.state.message}</p>}
                    </div>
                    )}

                    {this.state.ongletActif === 'mesRdvs' && (
                    <div>
                        <h3>Mes rendez-vous</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Heure</th>
                                    <th>Durée</th>
                                    <th>Client</th>
                                    <th>Véhicule</th>
                                    <th>Raison</th>
                                    <th>Statut</th>
                                    <th>Coût</th>
                                    <th>Commentaire</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.props.rdvs.map(rdv => (
                                <Rdv
                                    key={rdv.rdvId}
                                    client={rdv.client}
                                    clientId={rdv.clientId}
                                    idVehicule={rdv.idVehicule}
                                    infoVehicule={rdv.infoVehicule}
                                    besoins={rdv.besoins}
                                    mecanicien={rdv.mecanicien}
                                    mecanicienId={rdv.mecanicienId}
                                    date={rdv.date}
                                    heure={isNaN(rdv.heure) ? ("Not specified") : (rdv.heure)}
                                    duree={isNaN(rdv.duree) ? ("Not specified") : (rdv.duree)}
                                    rdvId={rdv.rdvId}
                                    commentaire={rdv.commentaire}
                                    confirmer={rdv.confirmer}
                                    etat={rdv.etat}
                                    estClient={false}
                                    cout={rdv.cout}
                                    estPayer={rdv.estPayer}
                                />
                            ))}
                            </tbody>
                        </table>
                    </div>
                    )}
                    {this.state.ongletActif === 'mesBenefices' &&
                    <div>
                        <h3>Mes bénéfices</h3>
                        <h4>{this.state.benefices} $</h4>
                    </div>
                    }
                </div>
            </div>
        )
    };
};

const mapStateToProps = (state) => ({
  user: state.user,
  rdvs: state.rdvs,
});

const mapDispatchToProps = (dispatch) => ({
    setUser: (user) => dispatch({type: 'SET_USER',payload:user}),
    obtenirRdvsAPI: (url) => dispatch(obtenirRdvsAPI(url)),
});

export default connect(mapStateToProps,mapDispatchToProps)(PageMecanicien);
