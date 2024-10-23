import React, {Component, useState} from 'react'
import Vehicule from './Vehicule';
import ManufactureVehicule from './ManufactureVehicule';
import axios from 'axios';


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
            optionsModeles: [],
            optionsFabricants: []
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
    
    creerVehiculeComplexe = async (e) =>
    {
        e.preventDefault();

        const donneeFormulaire = new FormData(e.target);

        const fabricant = donneeFormulaire.get("fabricant");
        const modele = donneeFormulaire.get("modele");

        if(fabricant != "" && modele != "" && modele != 0)
        {
            //Ajout du véhicule
            const vehicule = this.manufactureVehicule.CreerVehicule(fabricant,modele,donneeFormulaire.get("annee"),++this.state.vehicules.length)
        
            this.setState((state => ({vehicules:[...state.vehicules, vehicule], ajouterVehiculeComplexeActif: false})));
        }
        else if(fabricant == "") 
        {
            // On cherche le fabricant
            if(modele == "")
            {
                alert("Le modèle et le fabricant sont vides !\n Merci d'entrer au moins une de c'est deux informations.");
            }
            else
            {
                const reponse = await axios.get()
            }
        }
        else
        {
            // On cherche le modèle
            const reponse = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${fabricant}/modelyear/${donneeFormulaire.get("annee")}?format=json`)
            let optionsModele = reponse.data.Results.map((modele)=> <option value={modele.Model_Name}>{modele.Model_Name}</option>);
            if(optionsModele.length == 0)
            {
                optionsModele.push(<option value={0}>Aucun modèle trouvé pour cette date et ce fabricant.</option>)
            }
            this.setState({optionsModeles: optionsModele});
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
            {!this.state.cacherVehicule &&
            <div>
                <div>
                    <button onClick={this.gererBtnAjouterVehicule}>Ajouter véhicule</button>
                    <button onClick={this.gererBtnAjouterVehiculeVIN}>Ajouter véhicule avec VIN</button>
                    <button onClick={this.gererBtnAjouterVehiculeComplexe}>Ajouter véhicule avec informations manquantes</button>
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
                    <form onSubmit={this.creerVehiculeComplexe}>
                        <h2>Ajouter véhicule avec informations manquantes</h2>
                        <label>Fabricant: </label>
                        {this.state.optionsFabricants.length == 0 ?
                        (
                            <input type="text" name='fabricant'></input>
                        ):
                        (
                            <select name="fabricant">
                                {this.state.optionsFabricants}
                            </select> 
                        )
                        }
                        
                        <label>Modèle: </label>
                        {this.state.optionsModeles.length == 0 ?
                        (
                            <input type="text" name='modele'></input>
                        ):
                        (
                            <select name="modele">
                                {this.state.optionsModeles}
                            </select> 
                        )
                        }
                        <label>Année de fabrication: </label>
                        <select name="annee" required>
                                    {optionsAnnee}
                        </select>
                        <button type="submit">Ajouter</button>
                        <button onClick={this.gererBtnAnnulerAjoutVehiculeComplexe}>Annuler</button>
                    </form>}
                </div>
                </div>}
                {this.state.vehicules.map((vehicule) => vehicule)}
                
            </>
        );
    }
}

export default GestionVehicule;