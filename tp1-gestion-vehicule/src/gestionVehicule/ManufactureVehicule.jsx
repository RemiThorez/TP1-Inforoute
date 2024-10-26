import axios from 'axios'

class ManufactureVehicule
{
    CreerVehiculeVIN = async (vin, idVehicule) =>
    {
        const reponse = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended/${vin}?format=json`)
        return {idVehicule: idVehicule,fabricant: reponse.data.Results[0].Make,modele: reponse.data.Results[0].Model,annee: reponse.data.Results[0].ModelYear};
    };

    CreerVehicule(fabricant,modele,annee,idVehicule)
    {
        return {idVehicule:idVehicule, fabricant:fabricant, modele:modele, annee:annee}
    };
}

export default ManufactureVehicule