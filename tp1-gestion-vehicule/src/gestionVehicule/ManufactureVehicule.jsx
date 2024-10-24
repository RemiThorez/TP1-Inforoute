import React, { Component } from "react";
import Vehicule from "./Vehicule";
import axios from 'axios'


class ManufactureVehicule
{
    CreerVehiculeVIN = async (vin, id) =>
    {
        const reponse = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended/${vin}?format=json`)
        return {id: id,fabricant: reponse.data.Results[0].Make,modele: reponse.data.Results[0].Model,annee: reponse.data.Results[0].ModelYear};
    };

    CreerVehicule(fabricant,modele,annee,id)
    {
        return {id:id, fabricant:fabricant, modele:modele, annee:annee}
    };
}

export default ManufactureVehicule