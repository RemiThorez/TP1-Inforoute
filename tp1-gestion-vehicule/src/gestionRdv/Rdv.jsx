import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { connect  } from 'react-redux';
import { modifierRdvAPI,annulerRdvAPI } from '../actions/ActionsVehicules';

class Rdv extends Component
{   
    constructor(props)
    {
        super(props);
        this.state = 
        { 
            client: props.client || null,
            clientId: props.clientId ||-1,
            idVehicule: props.idVehicule || -1,
            infoVehicule: props.infoVehicule || "",
            besoins: props.besoins || "",
            mecanicien: props.mecanicien || null,
            mecanicienId: props.mecanicienId ||-1,
            date:props.date || new Date(),
            heure: props.heure || NaN,
            duree: props.duree || NaN,
            rdvId: props.rdvId || -1,
            confirmer: props.confirmer || false, //Signifie attente de la confirmation par le mécanicien
            etat: props.etat || true // Détermine si le rdv existe ou s'il est annuler. 
        };
    };
    
    gererBtnAnnulerRdv = () =>
    {
        this.setState({confirmer: false, etat: false});
        this.props.annulerRdv(this.state.rdvId);
        this.props.annulerRdvAPI(this.state.rdvId);
        this.props.modifierRdvAPI({client: this.state.client,clientId: this.state.clientId,idVehicule: this.state.idVehicule,infoVehicule: this.state.infoVehicule,besoins: this.state.besoins,mecanicien: this.state.mecanicien,mecanicienId: this.state.mecanicienId,date: this.state.date,heure: this.state.heure,duree: this.state.duree,rdvId: this.state.rdvId,etat: false,confirmer: this.state.confirmer});
        this.props.modifierVehicule({client: this.state.client,clientId: this.state.clientId,idVehicule: this.state.idVehicule,infoVehicule: this.state.infoVehicule,besoins: this.state.besoins,mecanicien: this.state.mecanicien,mecanicienId: this.state.mecanicienId,date: this.state.date,heure: this.state.heure,duree: this.state.duree,rdvId: this.state.rdvId,etat: false,confirmer: this.state.confirmer});
    }

    modifierEtatFormulaire = () =>
    {
        this.setState({formulaireActif: !this.state.formulaireActif});
        if(this.props.cacher)
        {
            this.props.afficher();
            this.props.modifierRdvAPI({client: this.state.client,clientId: this.state.clientId,idVehicule: this.state.idVehicule,infoVehicule: this.state.infoVehicule,besoins: this.state.besoins,mecanicien: this.state.mecanicien,mecanicienId: this.state.mecanicienId,date: this.state.date,heure: this.state.heure,duree: this.state.duree,rdvId: this.state.rdvId,etat: false,confirmer: this.state.confirmer});
            this.props.modifierVehicule({client: this.state.client,clientId: this.state.clientId,idVehicule: this.state.idVehicule,infoVehicule: this.state.infoVehicule,besoins: this.state.besoins,mecanicien: this.state.mecanicien,mecanicienId: this.state.mecanicienId,date: this.state.date,heure: this.state.heure,duree: this.state.duree,rdvId: this.state.rdvId,etat: false,confirmer: this.state.confirmer});
        }
        else
        {
            this.props.modifierCacher();
        }
    };

    gererModification = (e) =>
    {
        this.setState({[e.target.name]: e.target.value})
    }

    render()
    {
        return(
            <>
                {this.state.formulaireActif &&
                    <form onSubmit={this.modifierEtatFormulaire}>
                        <h2>Modifier mes besoins:</h2>
                            <input type="textarea" name='besoins' value={this.state.besoins} onChange={this.gererModification}></input>
                            <button type='submit'>Confirmer</button>
                    </form>
                }
                {!this.props.cacher &&
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', columnGap:"15px"}}>
                        <h3>Fabricant: {this.state.fabricant}</h3>
                        <h3>Modèle: {this.state.modele}</h3>
                        <h3>Années de fabrication: {this.state.annee}</h3>

                        <button style={{width: "40px",height: "40px",display: "flex",alignItems: "center",justifyContent: "center", margin:0}} onClick={this.modifierEtatFormulaire}><FontAwesomeIcon icon={faPen} /></button>
                        <button style={{width: "40px",height: "40px",display: "flex",alignItems: "center",justifyContent: "center", margin:0}} onClick={this.gererBtnAnnulerRdv}><FontAwesomeIcon icon={faTrashCan} /></button>
                    </div>
                }
           </>
        );
    }
}

const mapStateToProps = (state) => ({
    cacher: state.cacher,
});

const mapDispatchToProps = (dispatch) => ({
    modifierCacher: () => dispatch({ type: 'CACHER' }),
    afficher: () => dispatch({ type: 'AFFICHER' }),
    annulerRdv: (idVehicule) => dispatch({type:'ANNULER_RDV',payload: idVehicule}),
    modifierRdv: (rdv) => dispatch({type: 'MODIFIER_RDV',payload: rdv}),
    modifierRdvAPI: (rdv) => dispatch(modifierRdvAPI(rdv)),
    annulerRdvAPI: (rdvId) => dispatch(annulerRdvAPI(rdvId)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Rdv);