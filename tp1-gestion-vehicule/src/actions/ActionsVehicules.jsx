import axios from 'axios';

export const obtenirVehiculesAPI = (url) => 
{
    return async (dispatch) => 
    {
        try 
        {
            const reponse = await axios.get(url);
            const vehicules = reponse.data.voiture.map(v =>({
                idVehicule: v.idVehicule,
                fabricant: v.fabricant,
                modele: v.modele,
                annee: v.annee
            }));
            console.log(vehicules);
            dispatch({ type: "SET_VEHICULES_EXISTANT", payload: vehicules });
            const index = vehicules[vehicules.length-1].idVehicule;
            if(index > 0)
            {
                dispatch({type: 'SET_INDEX_VEHICULE',payload:index})
            }
        }
        catch (error) 
        {
            console.error("Erreur lors de la récupération des véhicules :", error);
        }
    };
};

export const modifierVehiculeAPI = async (vehicule) =>
{
    return async (dispatch) => 
    {
            try
        {
            const reponse = await axios.patch("https://dummyjson.com/c/9728-3e79-499c-97e9",vehicule);

            if(reponse.status === 200)
            {
                console.log("Modification effectuée avec succès!");
                dispatch({ type: "MODIFIER_VEHICULE", payload: vehicule });
            }
            else
            {
                console.log("Erreur lors de la modification du véhicule :", reponse.message, "\nStatus: ", reponse.status);            
            }
        }
        catch (error) 
        {
            console.error("Erreur lors de la modification du véhicule :", error);
        }
    }
    
};

export const supprimerVehiculeAPI = async (idVehicule) =>
{
    return async (dispatch) => 
    {
        try
        {
            const reponse = await axios.patch("https://dummyjson.com/c/8c5e-a0a8-43cb-959f",idVehicule); // Dans notre api finale nous ajouterons le vehicule dans le body

            if(reponse.status === 200)
            {
                console.log("Suppression effectuée avec succès!");
                dispatch({ type: "SUPPRIMER_VEHICULE", payload: idVehicule });
            }
            else
            {
                console.log("Erreur lors de la suppression du véhicule :", reponse.message, "\nStatus: ", reponse.status);            
            }
        }
        catch (error) 
        {
            console.error("Erreur lors de la suppression du véhicule :", error);
        }
    }
}   

export const ajouterVehiculeAPI = async (vehicule) =>
{
    return async (dispatch) => 
    {
        try
        {
            const reponse = await axios.patch("https://dummyjson.com/c/c0dd-d82d-42bf-9137",vehicule); // Dans notre api finale nous ajouterons le vehicule dans le body

            if(reponse.status === 200)
            {
                console.log("Ajout effectuée avec succès!");
                dispatch({ type: 'AJOUTER_VEHICULE', payload: vehicule });
            }
            else
            {
                console.log("Erreur lors de la ajout du véhicule :", reponse.message, "\nStatus: ", reponse.status);            
            }
        }
        catch (error) 
        {
            console.error("Erreur lors de la ajout du véhicule :", error);
        }
    }
};