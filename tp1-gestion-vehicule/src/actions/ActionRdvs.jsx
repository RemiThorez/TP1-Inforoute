import axios from 'axios';

export const obtenirRdvsAPI = (url) => 
{
    return async (dispatch) => 
    {
        try 
        {
            const reponse = await axios.get(url);
            const rdvs = reponse.data.voiture.map(v =>({
                idrdvs: v.idrdvs,
                fabricant: v.fabricant,
                modele: v.modele,
                annee: v.annee
            }));
            console.log(rdvs);
            dispatch({ type: "SET_RDVS_EXISTANT", payload: rdvs });
            const index = vehicules[vehicules.length-1].idVehicule;
            if(index > 0)
            {
                dispatch({type: 'SET_INDEX_RDV',payload:index});
            }
        }
        catch (error) 
        {
            console.error("Erreur lors de la récupération des rendez-vous :", error);
        }
    };
};

export const modifierRdvAPI = (rdv) =>
{
    return async (dispatch) => 
    {
        try
        {
            const reponse = await axios.patch("https://dummyjson.com/c/9728-3e79-499c-97e9",rdv);

            if(reponse.status === 200)
            {
                console.log("Modification effectuée avec succès!");
                dispatch({ type: "MODIFIER_RDV", payload: rdv });
            }
            else
            {
                console.log("Erreur lors de la modification du rendez-vous :", reponse.message, "\nStatus: ", reponse.status);            
            }
        }
        catch (error) 
        {
            console.error("Erreur lors de la modification du véhicule :", error);
        }
    }
};

export const supprimerRdvAPI = (idRdv) =>
{
    return async (dispatch) => 
    {
        try
        {
            const reponse = await axios.patch("https://dummyjson.com/c/8c5e-a0a8-43cb-959f",idRdv); 

            if(reponse.status === 200)
            {
                console.log("Suppression effectuée avec succès!");
                dispatch({ type: "SUPPRIMER_RDV", payload: idRdv });
            }
            else
            {
                console.log("Erreur lors de la suppression du rendez-vous :", reponse.message, "\nStatus: ", reponse.status);            
            }
        }
        catch (error) 
        {
            console.error("Erreur lors de la suppression du rendez-vous :", error);
        }
    }
}

export const annulerRdvAPI = (idRdv) =>
{
    return async (dispatch) => 
    {
        try
        {
            const reponse = await axios.patch("https://dummyjson.com/c/97cd-88f6-470b-950f",idRdv); 

            if(reponse.status === 200)
            {
                console.log("Demande d'annulation effectuée avec succès!");
                dispatch({ type: "ANNULER_RDV", payload: idRdv });
            }
            else
            {
                console.log("Erreur lors de la demande d'annulation du rendez-vous :", reponse.message, "\nStatus: ", reponse.status);            
            }
        }
        catch (error) 
        {
            console.error("Erreur lors de la demande d'annulation du rendez-vous :", error);
        }
    }
}

export const ajouterRdvAPI = (rdv) =>
{
    return async (dispatch) => 
    {  
        try
        {
            const reponse = await axios.patch("https://dummyjson.com/c/c0dd-d82d-42bf-9137",rdv);

            if(reponse.status === 200)
            {
                console.log("Ajout effectuée avec succès!");
                dispatch({ type: 'AJOUTER_RDV', payload: rdv });
            }
            else
            {
                console.log("Erreur lors de la ajout du rendez-vous :", reponse.message, "\nStatus: ", reponse.status);            
            }
        }
        catch (error) 
        {
            console.error("Erreur lors de la ajout du rendez-vous :", error);
        }
    }
};