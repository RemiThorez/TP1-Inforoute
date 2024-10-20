import React, { Component } from "react";
import Vehicule from "./Vehicule";


class ManufactureVehicule
{
    constructor(props)
    {
        super(props);

    }

    CreerVehiculeVIN = async (vin, key) =>
    {
        axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended/${props.vin}?format=json`).then((reponse) =>
        {
            return <Vehicule key={key} fabricant={reponse.data.Results[0].Make} modele={reponse.data.Results[0].Model} annee={reponse.data.Results[0].ModelYear} />
        });
    };

    CreerVehicule(fabricant,modele,annee,key)
    {
        return <Vehicule key={key} fabricant={fabricant} modele={modele} annee={annee} />
    }
}

export default ManufactureVehicule