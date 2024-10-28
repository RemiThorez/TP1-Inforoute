import React, { Component } from 'react';
import Calendar from 'react-calendar';
import GestionVehicule from '../gestionVehicule/GestionVehicule';
import { connect } from 'react-redux';
import { obtenirVehiculesAPI } from '../actions/ActionsVehicules';
import { obtenirMecaniciensAPI, obtenirRdvsAPI,obtenirHeureDispoMecaniciensAPI,obtenirDatesDisponiblesAPI,ajouterRdvAPI,effectuerPaimentAPI,enregistreInfoPaimentAPI } from '../actions/ActionsRdvs';
import Rdv from '../gestionRdv/Rdv';
import axios from 'axios';
import '../css/App.css';

class PageClient extends Component 
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
            dialogPaimentOuvert: false,
            rdvId:-1,
        };
    }

    componentDidMount()
    {
        this.obtenirVehiculesClient();
        this.obtenirMecaniciens();
        this.obtenirRendezVous();
    };

    ouvrirDialogPaiment = (rdvId) => 
    {
        this.setState({
            dialogPaimentOuvert: true,
            rdvId: rdvId,
        });
    };

    fermerDialogPaiment = () => 
    {
        this.setState({
            dialogPaimentOuvert: false,
            rdvId: -1,
        });
    };

    gererPaiment = (e) =>
    {
        e.preventDefault();
        const donneeFormulaire = new FormData(e.target);
        const infoPaiment = {
            numero: donneeFormulaire.get("numero"),
            expiration: donneeFormulaire.get("expiration"),
            cvv: donneeFormulaire.get("cvv")
        };

        if(donneeFormulaire.get("enregistrer"))
        {
            this.props.enregistreInfoPaimentAPI(infoPaiment);
        }

        this.props.effectuerPaimentAPI(infoPaiment, this.props.rdvs.find(rdv => rdv.rdvId == this.state.rdvId).idMecanicien);
        this.props.setEstPayer(this.state.rdvId);
        
        this.fermerDialogPaiment();
    }

    obtenirHoraireDispos()
    {
        let url = "https://dummyjson.com/c/f3cc-3442-4c30-b4a0"; //Avec notre "vrai" api nous ajouterions l'id du mécaniciens pour obtenir seulement son horaire spécifique
        this.props.obtenirHeureDispoMecaniciensAPI(url);
        url = "https://dummyjson.com/c/744a-1dde-457f-acff" //Avec notre "vrai" api nous ajouterions l'id du mécaniciens pour obtenir seulement son horaire spécifique
        this.props.obtenirDatesDisponiblesAPI(url);
    };

    obtenirMecaniciens()
    {
        this.props.obtenirMecaniciensAPI();
    };

    obtenirRendezVous()
    {
        const url = "https://dummyjson.com/c/8e46-5801-45bc-8167";//Avec notre "vrai" api nous ajouterions l'id de l'utilisateur pour obtenir seulement ses rendez-vous
        this.props.obtenirRdvsAPI(url);
    };

    obtenirVehiculesClient() 
    {
        const url = "https://dummyjson.com/c/d8db-c2db-4187-85d5" //Avec notre "vrai" api nous ajouterions l'id de l'utilisateur pour obtenir seulement ses véhicules
        this.props.obtenirVehiculesAPI(url);
    };

    gererChangementMecanicien = () =>
    {
        this.obtenirHoraireDispos();
    }

    envoiDemandeRdv = (e) => 
    {
        e.preventDefault();
        const donneeFormulaire = new FormData(e.target);
        const formattedDate = this.state.dateSelectionnee.toISOString().split('T')[0]; 

        if(this.props.datesDisponibles.map(date => date.date).includes(formattedDate))
        {
            const vehicule = this.props.vehicules.find(v => v.idVehicule == donneeFormulaire.get("vehicule"));
            const rdv = {
                client:this.props.user.firstName,
                clientId:this.props.user.id,
                idVehicule:donneeFormulaire.get("vehicule"),
                infoVehicule: vehicule.fabricant + ", " +vehicule.modele +", " +vehicule.annee,
                besoins:donneeFormulaire.get("besoins"),
                mecanicien: this.props.mecaniciens.find(m => m.idMecanicien == donneeFormulaire.get("mecanicien")).nom,
                mecanicienId:donneeFormulaire.get("mecanicien"),
                date:formattedDate,
                heure:donneeFormulaire.get("heure"),
                rdvId:this.props.indexRdv,
                confirmer:false,
                etat: true
            };

            this.props.ajouterRdvAPI(rdv);

            this.setState({ message: "Demande de rendez-vous effectué avec succès" , erreur:false});
        }
        else
        {
            this.setState({ message: "Cette date n'est présentement pas disponible." , erreur:true});
        }
    };

    modifierOngletActif = (e) => 
    {
        this.setState({ ongletActif: e.target.name, message: ""});
    };

    gererChangementDate = (date) => 
    {
        const formattedDate = date.toISOString().split('T')[0];
        if(this.props.datesDisponibles.map(date => date.date).includes(formattedDate))
        {
            this.setState({dateSelectionnee: date, message: ""});
        }
        else
        {
            this.setState({message: "Cette date n'est présentement pas disponible.", erreur: true});
        }
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

    formatAffichageDate = ({ date, view }) => 
    {
        const datesDiponibles = this.props.datesDisponibles.map(date => date.date);
        const formattedDate = date.toISOString().split('T')[0];
        
        if (view === 'month' && !datesDiponibles.includes(formattedDate)) 
        {
            return 'date-indisponible';
        }
        return 'date-disponible';
    }

    render() 
    {
        return (
            <>
            {this.state.dialogPaimentOuvert && (
                <div className='dialog-paiment'>
                    <div className='dialog-paiment-contenu'>
                    <h3>Entrez les informations de paiement</h3>
                    <form onSubmit={this.gererPaiment}>
                    <input type="text" name="numero" placeholder="0000000000000000" defaultValue={this.props.infoPaiment && this.props.infoPaiment.numero}required pattern="\d{16}"/>
                        <input type="text" name="expiration" placeholder="MM/YY" defaultValue={this.props.infoPaiment && this.props.infoPaiment.expiration} required pattern="^(0[1-9]|1[0-2])/(\d{2})$"/>
                        <input type="text" name="cvv"placeholder="123" defaultValue={this.props.infoPaiment && this.props.infoPaiment.cvv} required pattern="\d{3}"/>
                        <input type='checkbox' id='enregistrer' name='enregistrer'/>
                        <label htmlFor="enregistrer">Enregistrer les informations de paiement</label>
                        <button type="submit">Confirmer le paiement</button>
                    </form>
                    <button onClick={this.fermerDialogPaiment}>Annuler</button>
                    </div>
                </div>
            )}
            <div className="client-container">
                

                <div>
                    <h2>Bienvenue {this.props.user.firstName} {this.props.user.lastName} dans votre espace Client</h2>
                </div>

                <nav style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
                    <button name="modifierProfil" onClick={this.modifierOngletActif}>Modifier mon profil</button>
                    <button name="prendreRdv" onClick={this.modifierOngletActif}>Prise de rendez-vous</button>
                    <button name="mesRdvs" onClick={this.modifierOngletActif}>Mes rendez-vous</button>
                    <button name="gestionVehicule" onClick={this.modifierOngletActif}>Mes véhicules</button>
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

                    {this.state.ongletActif === 'prendreRdv' && (
                    <div>
                        <h3>Prendre un rendez-vous</h3>
                        <form onSubmit={this.envoiDemandeRdv}>
                            <label>Véhicule :</label>
                            <select name="vehicule" defaultValue={""} required>
                                <option value="" disabled>Sélectionnez un véhicule</option>
                                {this.props.vehicules.map((vehicule) => (<option key={vehicule.idVehicule} value={vehicule.idVehicule}>{vehicule.fabricant}, {vehicule.modele}, {vehicule.annee}</option>))}
                            </select>
                        
                            <label>Mécanicien :</label>
                            <select name="mecanicien" defaultValue={""} onChange={this.gererChangementMecanicien} required>
                                <option value="" disabled>Sélectionnez un mécanicien</option>
                                {this.props.mecaniciens.map((m) => (<option key={m.idMecanicien} value={m.idMecanicien}>{m.nom}</option>))}
                            </select>
                        
                            <label>Date :</label>
                            <Calendar tileClassName={this.formatAffichageDate} onChange={this.gererChangementDate} value={this.state.dateSelectionnee} locale="fr-FR" />
                        
                            <label>Heure :</label>
                            <select name="heure" defaultValue={""} required>
                                {this.props.heuresDispos.length != 0 && <option value="" disabled>Sélectionnez une heure</option>}
                                {this.props.heuresDispos.map((h) => (<option key={h.heure} value={h.heure}>{h.heure}</option>))}
                            </select>
                            <label>Raison :</label>
                            <textarea name="besoins" required />
                        
                            <button type="submit">Prendre rendez-vous</button>
                        </form>
                        {this.state.message && this.state.erreur && <p style={{ color: 'red' }}>{this.state.message}</p>}
                        {this.state.message && !this.state.erreur && <p style={{ color: 'green' }}>{this.state.message}</p>}
                    </div>
                    )}

                    {this.state.ongletActif === 'mesRdvs' && (
                    <div>
                        <h3>Mes rendez-vous</h3>
                        <div className='contenant-debordant'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Heure</th>
                                    <th>Durée</th>
                                    <th>Mécanicien</th>
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
                                    estClient={true}
                                    cout={rdv.cout}
                                    estPayer={rdv.estPayer}
                                    ouvrirDialogPaiment={this.ouvrirDialogPaiment}
                                />
                            ))}
                            </tbody>
                        </table>
                        </div>
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
            </>
        );
    }
}

const mapStateToProps = (state) => ({
  vehicules: state.vehicules,
  user: state.user,
  mecaniciens: state.mecaniciens,
  rdvs: state.rdvs,
  heuresDispos: state.heuresDispos,
  indexRdv: state.indexRdv,
  datesDisponibles: state.datesDisponibles,
  infoPaiment: state.infoPaiment
});

const mapDispatchToProps = (dispatch) => ({
    setUser: (user) => dispatch({type: 'SET_USER',payload:user}),
    setEstPayer: (rdvId) => dispatch({type: 'SET_ESTPAYER',payload: rdvId}),
    obtenirVehiculesAPI: (url) => dispatch(obtenirVehiculesAPI(url)),
    obtenirMecaniciensAPI: () => dispatch(obtenirMecaniciensAPI()),
    obtenirRdvsAPI: (url) => dispatch(obtenirRdvsAPI(url)),
    obtenirHeureDispoMecaniciensAPI: (url) => dispatch(obtenirHeureDispoMecaniciensAPI(url)),
    obtenirDatesDisponiblesAPI: (url) => dispatch(obtenirDatesDisponiblesAPI(url)),
    ajouterRdvAPI: (rdv) => dispatch(ajouterRdvAPI(rdv)),
    enregistreInfoPaimentAPI: (infoPaiment) => dispatch(enregistreInfoPaimentAPI(infoPaiment)),
    effectuerPaimentAPI: (infoPaiment, idMecanicien) => dispatch(effectuerPaimentAPI(infoPaiment, idMecanicien)),
});

export default connect(mapStateToProps,mapDispatchToProps)(PageClient);
