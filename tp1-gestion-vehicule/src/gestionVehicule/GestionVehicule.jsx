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


    gererBtnAjouterVehicule = () =>
    {
        this.setState({
            ajouterVehiculeActif: true,
            ajouterVehiculeVINActif: false,
            ajouterVehiculeComplexeActif: false
        })
    }
    gererBtnAjouterVehiculeVIN = () =>
    {
        this.setState({
            ajouterVehiculeActif: false,
            ajouterVehiculeVINActif: true,
            ajouterVehiculeComplexeActif: false
        })
    }
    gererBtnAjouterVehiculeComplexe = () =>
    {
        this.setState({
            ajouterVehiculeActif: false,
            ajouterVehiculeVINActif: false,
            ajouterVehiculeComplexeActif: true
        })
    }

    gererBtnAnnulerAjoutVehicule = () =>
    {
        this.setState({ajouterVehiculeActif: false})
    }
    gererBtnAnnulerAjoutVehiculeVIN = () =>
    {
        this.setState({ajouterVehiculeVINActif: false})
    }
    gererBtnAnnulerAjoutVehiculeComplexe = () =>
    {
        this.setState({ajouterVehiculeComplexeActif: false})
    }

    creerVehicule = (e) =>
    {
        e.preventDefault();
        const donneeFormulaire = new FormData(e.target);
        const fabricant = donneeFormulaire.get("fabricant");
        const modele = donneeFormulaire.get("modele");
        const annee = donneeFormulaire.get("annee");
        const vehicule = this.manufactureVehicule.CreerVehicule(fabricant,modele,annee,++this.state.vehicules.length)
        
        this.setState((state => ({vehicules:[...state.vehicules, vehicule], ajouterVehiculeActif: false})));
    }
    //"JS2YB5A20A6300765"
     creerVehiculeVIN = async (e) =>
    {
        e.preventDefault();
        const donneeFormulaire = new FormData(e.target);
        const vin = donneeFormulaire.get("vin");

        const vehicule = await this.manufactureVehicule.CreerVehiculeVIN(vin, ++this.state.vehicules.length)

        if(vehicule)
        {
            this.setState((state => ({vehicules:[...state.vehicules, vehicule], ajouterVehiculeVINActif: false})));
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
                    <button onClick={this.gererBtnAjouterVehicule}>Ajouter véhicule</button>
                    <button onClick={this.gererBtnAjouterVehiculeVIN}>Ajouter véhicule avec VIN</button>
                    <button onClick={this.gererBtnAjouterVehiculeComplexe}>Ajouter véhicule complexe</button>
                </div>
           
                <div> 
                    {this.state.ajouterVehiculeActif && 
                    <form onSubmit={this.creerVehicule}>
                        <h2>Ajouter véhicule</h2>
                        <label>Fabricant: </label>
                        <input type="text" name='fabricant'></input>
                        <label>Modèle: </label>
                        <input type="text" name='modele'></input>
                        <label>Année de fabrication: </label>
                        <select name="annee">
                                    {optionsAnnee}
                        </select>
                        <button type="submit">Ajouter</button>
                        <button onClick={this.gererBtnAnnulerAjoutVehicule}>Annuler</button>
                    </form>}
                </div>
            
                <div>
                    {this.state.ajouterVehiculeVINActif &&
                    <form onSubmit={this.creerVehiculeVIN}>
                        <h2>Ajouter véhicule avec VIN</h2>
                        <label>VIN du véhicule: </label>
                        <input type="text" name='vin'></input>
                        <button type="submit">Ajouter</button>
                        <button onClick={this.gererBtnAnnulerAjoutVehiculeVIN}>Annuler</button>
                    </form>}
                </div>

                <div>
                    {this.state.ajouterVehiculeComplexeActif &&
                    <form onSubmit={""}>
                        <h2>Ajouter véhicule avec informations manquantes</h2>
                        <button type="submit">Ajouter</button>
                        <button onClick={this.gererBtnAnnulerAjoutVehiculeComplexe}>Annuler</button>
                    </form>}
                </div>
                {this.state.vehicules.map((vehicule) => vehicule)}
            </>
        );
    }
}

export default GestionVehicule;