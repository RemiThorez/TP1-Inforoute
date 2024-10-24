import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { connect  } from 'react-redux';

class Vehicule extends Component
{   
    constructor(props)
    {
        super(props);
        this.state = 
        { 
            fabricant: props.fabricant || "N/A",
            modele: props.modele || "N/A",
            annee: props.annee || NaN,
            formulaireActif: false,
            idVehicule: props.idVehicule,
        };
    };
    
    gererBtnSupprimerVehicule = () =>
    {
        this.props.supprimerVehicule(this.state.idVehicule)
    }

    modifierEtatFormulaire = () =>
    {
        this.setState({formulaireActif: !this.state.formulaireActif});
        if(this.props.cacher)
        {
            this.props.afficher();
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
        const options = [];
    
        for (let i = 1900; i <= 2024; ++i) 
        {
            options.push(<option key={i} value={i}>{i}</option>);
        }
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
    supprimerVehicule: (idVehicule) => dispatch({type:'SUPPRIMER_VEHICULE',payload: idVehicule}),
});

export default connect(mapStateToProps,mapDispatchToProps)(Vehicule);