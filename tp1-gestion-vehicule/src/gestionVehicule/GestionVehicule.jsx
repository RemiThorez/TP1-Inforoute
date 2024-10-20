import React, {Component, useState} from 'react'
import Vehicule from './Vehicule';
import ManufactureVehicule from './ManufactureVehicule';


class GestionVehicule extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        { 
            cacherVehicule: false,
            vehicules: props.vehicules || []
        }

        this.manufactureVehicule = new ManufactureVehicule();
    }


    creerVehicule = () =>
    {
        const vehicule = this.manufactureVehicule.CreerVehicule("Suzuki","SX4","2008",++this.state.vehicules.length)
        
        this.setState((state => ({vehicules:[...state.vehicules, vehicule]})));
    }

    creerVehiculeVIN = async () =>
    {
        const vehicule = await this.manufactureVehicule.CreerVehiculeVIN("JS2YB5A20A6300765", ++this.state.vehicules.length)
        if(vehicule)
        {
            this.setState((state => ({vehicules:[...state.vehicules, vehicule]})));
        }
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