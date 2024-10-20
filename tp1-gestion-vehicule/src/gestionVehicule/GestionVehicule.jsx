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


    render()
    {
        return(
            <>
                {this.state.vehicules.map((vehicule,i) => <Vehicule key={i} fabricant={vehicule.fabricant} modele={vehicule.modele} annee={vehicule.annee}/>)}
            </>
        );
    }
}

export default GestionVehicule;