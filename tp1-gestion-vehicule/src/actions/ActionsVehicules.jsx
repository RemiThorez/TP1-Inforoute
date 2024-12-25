import axios from 'axios';

export const obtenirVehiculesAPI = (idClient,jeton) => 
{
    return async (dispatch) => 
    {
        try 
        {
            const reponse = await axios.get(`https://api-rest-tp2.onrender.com/vehicule/obtenirVehiculeClient/${idClient}`,
                {
                    headers:{
                        'Authorization': `Token ${jeton}`
                    },
                }
            );
            const vehicules = reponse.data.map(v =>({
                idVehicule: v.id,
                fabricant: v.fabricant,
                modele: v.modele,
                annee: v.annee
            }));

            dispatch({ type: "SET_VEHICULES_EXISTANT", payload: vehicules });
        }
        catch (error) 
        {
            console.error("Erreur lors de la récupération des véhicules :", error);
        }
    };
};

export const modifierVehiculeAPI = (vehicule,jeton) =>
{
    return async (dispatch) => 
    {
        try
        {
            const reponse = await axios.patch("https://api-rest-tp2.onrender.com/vehicule/modifier/",vehicule,
                {
                    headers:{
                        'Authorization': `Token ${jeton}`
                    },
                }
            );

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

export const supprimerVehiculeAPI = (vehicule,jeton) =>
{
    return async (dispatch) => 
    {
        try
        {
            const reponse = await axios.delete("https://api-rest-tp2.onrender.com/vehicule/supprimer/",vehicule,
                {
                    headers:{
                        'Authorization': `Token ${jeton}`
                    },
                }
            ); // Dans notre api finale nous ajouterons le vehicule dans le body

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

export const ajouterVehiculeAPI = (vehicule,jeton) =>
{
    return async (dispatch) => 
    {
        try
        {
            const reponse = await axios.post("https://api-rest-tp2.onrender.com/vehicule/ajouter/",vehicule,
                {
                    headers:{
                        'Authorization': `Token ${jeton}`
                    },
                }
            ); 

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