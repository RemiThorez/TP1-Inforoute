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
            vehicules: props.vehicules || [],
            ajouterVehiculeActif: false,
            ajouterVehiculeVINActif: false,
            ajouterVehiculeComplexeActif: false,
        }

        this.manufactureVehicule = new ManufactureVehicule();
    }


    gererBtnAjouterVehicule = (e) =>
    {
        this.setState({
            ajouterVehiculeActif: true,
            ajouterVehiculeVINActif: false,
            ajouterVehiculeComplexeActif: false
        })
    }
    gererBtnAjouterVehiculeVIN = (e) =>
    {
        this.setState({
            ajouterVehiculeActif: false,
            ajouterVehiculeVINActif: true,
            ajouterVehiculeComplexeActif: false
        })
    }
    gererBtnAjouterVehiculeComplexe = (e) =>
    {
        this.setState({
            ajouterVehiculeActif: false,
            ajouterVehiculeVINActif: false,
            ajouterVehiculeComplexeActif: true
        })
    }

    creerVehicule = (e) =>
    {
        const vehicule = this.manufactureVehicule.CreerVehicule(fabricant,modele,annee,++this.state.vehicules.length)
        
        this.setState((state => ({vehicules:[...state.vehicules, vehicule]})));
    }
    //"JS2YB5A20A6300765"
    creerVehiculeVIN = async (e) =>
    {
        const vehicule = await this.manufactureVehicule.CreerVehiculeVIN(vin, ++this.state.vehicules.length)
        if(vehicule)
        {
            this.setState((state => ({vehicules:[...state.vehicules, vehicule]})));
        }
    }


    render()
    {
        const optionsAnnee = [];
    
        for (let i = 1900; i <= 2024; ++i) 
        {
            optionsAnnee.push(<option value={i}>{i}</option>);
        }

        return(
            <>
                <div>
                    <button onClick={this.creerVehicule}>Ajouter véhicule</button>
                    <button onClick={this.creerVehiculeVIN}>Ajouter véhicule avec VIN</button>
                    <button onClick={undefined}>Ajouter véhicule complexe</button>
                </div>
           
                <div> 
                    {this.state.ajouterVehiculeActif && 
                    <form>
                        <h2>Ajouter véhicule</h2>
                        <label>Fabricant: </label>
                        <input type="text" name='fabricant' value=""></input>
                        <label>Modèle: </label>
                        <input type="text" name='modele' value=""></input>
                        <label>Année de fabrication: </label>
                        <select name="annee" value="">
                                    {optionsAnnee}
                        </select>
                        <button type="submit" onClick={this.creerVehicule}>Ajouter</button>
                    </form>}
                </div>
            
                <div>
                    {this.state.ajouterVehiculeVINActif &&
                    <form>
                        <h2>Ajouter véhicule avec VIN</h2>
                        <label>VIN du véhicule: </label>
                        <input type="text" name='vin' value=""></input>
                        <button type="submit" onClick={this.creerVehiculeVIN}>Ajouter</button>
                    </form>}
                </div>

                <div>
                    {this.state.ajouterVehiculeComplexeActif &&
                    <form>
                        <h2>Ajouter véhicule avec informations manquantes</h2>
                        <button type="submit" onClick={undefined}>Ajouter</button>
                    </form>}
                </div>
                {this.state.vehicules.map((vehicule) => vehicule)}
            </>
        );
    }
}

export default GestionVehicule;