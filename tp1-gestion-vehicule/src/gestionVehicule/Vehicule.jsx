import React, { Component, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons';

class Vehicule extends Component
{   
    constructor(props)
    {
        super(props);
        this.state = 
        { 
            key: props.key,
            fabricant: props.fabricant || "N/A",
            modele: props.modele || "N/A",
            annee: props.annee || NaN,
            formulaireActif: false,
            cacher: false
        };
    };

    modifierEtatFormulaire = () =>
    {
        this.setState({formulaireActif: !this.state.formulaireActif});
    };

    modifierFabricant = (e) => 
    {
        this.setState({fabricant: e.target.value})
    }
    modifierModele = (e) => 
    {
        this.setState({modele: e.target.value})
    }
    modifierAnnee = (e) => 
    {
        this.setState({annee :e.target.value})
    }
    
    render()
    {
        const options = [];
    
        for (let i = 1900; i <= 2024; ++i) 
        {
            options.push(<option value={i}>{i}</option>);
        }
        return(
            <>
                {this.state.formulaireActif ?
                    (
                        <form>
                                <label>Fabricant</label>
                                <input type="text" name='fabricant' value={this.state.fabricant} onChange={this.modifierFabricant}></input>

                                <label>Modèle</label>
                                <input type="text" name='modele' value={this.state.modele} onChange={this.modifierModele}></input>

                                <label>Années de fabrication</label>
                                <select value={this.state.annee} onChange={this.modifierAnnee}>
                                    {options}
                                </select>
                                <button type='submit' onClick={this.modifierEtatFormulaire}>Confirmer</button>
                        </form>
                    )
                :
                    (
                        <>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', columnGap:"15px"}}>
                            <h3>Fabricant: {this.state.fabricant}</h3>
                            <h3>Modèle: {this.state.modele}</h3>
                            <h3>Années de fabrication: {this.state.annee}</h3>

                            <button style={{width: "40px",height: "40px",display: "flex",alignItems: "center",justifyContent: "center", margin:0}} onClick={this.modifierEtatFormulaire}><FontAwesomeIcon icon={faPen} /></button>
                        </div>
                        
                        </>
                    )
                }
           </>
        );
    }
}

export default Vehicule;