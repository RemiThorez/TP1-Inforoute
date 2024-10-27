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
            etat: props.etat || "Attente" //Signifie attente de la confirmation par le mécanicien
        };
    };
    
    gererBtnAnnulerRdv = () =>
    {
        this.props.annulerRdv(this.state.idVehicule)
        this.props.annulerRdvAPI(this.state.idVehicule);
    }

    modifierEtatFormulaire = () =>
    {
        this.setState({formulaireActif: !this.state.formulaireActif});
        if(this.props.cacher)
        {
            this.props.afficher();
            this.props.modifierRdvAPI({fabricant: this.state.fabricant, modele: this.state.modele, annee: this.state.annee, idVehicule: this.state.idVehicule,});
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
                        <h2>Modifier un véhicule</h2>
                            <label>Fabricant</label>
                            <input type="text" name='fabricant' value={this.state.fabricant} onChange={this.gererModification}></input>

                            <label>Modèle</label>
                            <input type="text" name='modele' value={this.state.modele} onChange={this.gererModification}></input>

                            <label>Années de fabrication</label>
                            <select value={this.state.annee} name='annee' onChange={this.gererModification}>
                                {options}
                            </select>
                            <button type='submit'>Confirmer</button>
                    </form>
                }
                {!this.props.cacher &&
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', columnGap:"15px"}}>
                        <h3>Fabricant: {this.state.fabricant}</h3>
                        <h3>Modèle: {this.state.modele}</h3>
                        <h3>Années de fabrication: {this.state.annee}</h3>

                        <button style={{width: "40px",height: "40px",display: "flex",alignItems: "center",justifyContent: "center", margin:0}} onClick={this.modifierEtatFormulaire}><FontAwesomeIcon icon={faPen} /></button>
                        <button style={{width: "40px",height: "40px",display: "flex",alignItems: "center",justifyContent: "center", margin:0}} onClick={this.gererBtnSupprimerVehicule}><FontAwesomeIcon icon={faTrashCan} /></button>
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
    annulerRdv: (idVehicule) => dispatch({type:'SUPPRIMER_VEHICULE',payload: idVehicule}),
    modifierRdvAPI,
    annulerRdvAPI,
});

export default connect(mapStateToProps,mapDispatchToProps)(Rdv);