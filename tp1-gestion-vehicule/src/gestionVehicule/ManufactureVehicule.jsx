import React, { Component } from "react";
import Vehicule from "./Vehicule";
import axios from 'axios'


class ManufactureVehicule
{
    CreerVehiculeVIN = async (vin, key) =>
    {
        const reponse = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended/${vin}?format=json`)
        return <Vehicule key={key} fabricant={reponse.data.Results[0].Make} modele={reponse.data.Results[0].Model} annee={reponse.data.Results[0].ModelYear} />
    };

    CreerVehicule(fabricant,modele,annee,key)
    {
        return <Vehicule key={key} fabricant={fabricant} modele={modele} annee={annee} />
    };
}

export default ManufactureVehicule