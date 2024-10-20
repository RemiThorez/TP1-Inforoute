import React, {Component, useState} from 'react'
import Vehicule from './Vehicule';


class GestionVehicule extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        { 
            cacherVehicule: false,
            vehicules: props.vehicules 
        }
    }


    creerVehicule = () =>
    {

    }

    creerVehiculeVIN = () =>
    {
        
    }

    render()
    {
        return(
            <>
            <div>
                <button onClick={this.creerVehicule}>Ajouter vehicule</button>
                <button onClick={this.creerVehiculeVIN}>Ajouter vehicule avec VIN</button>
                <button onClick={undefined}>Ajouter vehicule complexe</button>
            </div>
                {this.state.vehicules.map((vehicule) => vehicule)}
            </>
        );
    }
}

export default GestionVehicule;