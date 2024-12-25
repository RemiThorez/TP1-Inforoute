import axios from 'axios';

export const obtenirHeureDispoMecaniciensAPI = () =>
{
    return async (dispatch) =>
        {
            try 
            {
                const heuresDipos = [{heure: 8},{heure: 9},{heure: 10},{heure: 11},{heure: 13},{heure: 14},{heure: 15},{heure: 16}];
    
                dispatch({ type: "SET_HEURES_DISPOS_EXISTANT", payload: heuresDipos });
    
            }
            catch (error) 
            {
                console.error("Erreur lors de la récupération des mécaniciens :", error);
            }
        }
}

export const obtenirMecaniciensAPI = (jeton) =>
{
    return async (dispatch) =>
    {
        try 
        {
            const reponse = await axios.get("https://api-rest-tp2.onrender.com/mecanicien/obtenir/",
                {
                    headers:{
                        'Authorization': `Token ${jeton}`
                    },
                }
            );
            const mecanos = reponse.data.map(m => ({nom: m.first_name, idMecanicien: m.id}));

            dispatch({ type: "SET_MECANICIENS_EXISTANT", payload: mecanos });

        }
        catch (error) 
        {
            console.error("Erreur lors de la récupération des mécaniciens :", error);
        }
    }
}


export const obtenirRdvsAPI = (estClient,id,jeton) => 
{
    return async (dispatch) => 
    {
        try 
        {
            let reponse = undefined;
            if(estClient)
            {
                reponse = await axios.get(`https://api-rest-tp2.onrender.com/rendezvous/obtenirRendezvousClient/${id}`,
                {
                    headers:{
                        'Authorization': `Token ${jeton}`
                    },
                });
            }
            else
            {
                reponse = await axios.get(`https://api-rest-tp2.onrender.com/rendezvous/obtenirRendezvousMecanicien/${id}`,
                    {
                        headers:{
                            'Authorization': `Token ${jeton}`
                        },
                    }
                );
            }

            const rdvs = reponse.data.map(rdv => ({
                client:rdv.client,
                clientId:rdv.idClient,
                idVehicule:rdv.idVehicule,
                infoVehicule:rdv.infoVehicule,
                besoins:rdv.besoins,
                mecanicien:rdv.mecanicien,
                mecanicienId:rdv.idMecanicien,
                date:rdv.date,
                heure:rdv.heure,
                duree:rdv.duree,
                rdvId:rdv.id,
                commentaire:rdv.commentaire,
                confirmer:rdv.confirmer,
                etat:rdv.etat,
                cout:rdv.cout,
                estPayer: rdv.estPayer
            }));

            dispatch({ type: "SET_RDVS_EXISTANT", payload: rdvs });
        }
        catch (error) 
        {
            console.error("Erreur lors de la récupération des rendez-vous :", error);
        }
    };
};

export const modifierRdvAPI = (rdv,jeton) =>
{
    return async (dispatch) => 
    {
        try
        {
            const reponse = await axios.patch("https://api-rest-tp2.onrender.com/rendezvous/modifier/",rdv,
                {
                    headers:{
                        'Authorization': `Token ${jeton}`
                    },
                }
            );

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
            console.error("Erreur lors de la modification du rendez-vous :", error);
        }
    }
};

export const supprimerRdvAPI = (rdv,jeton) =>
{
    return async (dispatch) => 
    {
        try
        {
            const reponse = await axios.delete("https://api-rest-tp2.onrender.com/rendezvous/supprimer/",rdv,
                {
                    headers:{
                        'Authorization': `Token ${jeton}`
                    },
                }
            ); 

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

export const ajouterRdvAPI = (rdv) =>
{
    return async (dispatch) => 
    {  
        try
        {
            const reponse = await axios.post("https://dummyjson.com/c/2817-93cb-433f-b76f",rdv);

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

export const enregistreInfoPaimentAPI = (infoPaiment) =>
{
    console.log("Ajout effectuée avec succès!");
    dispatch({ type: 'AJOUTER_INFO_PAIMENT', payload: infoPaiment });
    /* 
    return async (dispatch) => 
    {  
        try
        {
            const reponse = await axios.post("https://dummyjson.com/c/3558-afde-4f60-8e5d",infoPaiment);

            if(reponse.status === 200)
            {
                console.log("Ajout effectuée avec succès!");
                dispatch({ type: 'AJOUTER_INFO_PAIMENT', payload: infoPaiment });
            }
            else
            {
                console.log("Erreur lors de la ajout des informations de paiment :", reponse.message, "\nStatus: ", reponse.status);            
            }
        }
        catch (error) 
        {
            console.error("Erreur lors de la ajout des informations de paiment :", error);
        }
    }*/
};

export const effectuerPaimentAPI = (infoPaiment, idMecanicien) =>
{
    console.log("Paiement effectuée avec succès!");
    /*
    return async () => 
    {  
        try
        {
            const reponse = await axios.post("https://dummyjson.com/c/a6e2-6f44-4c98-a6d5",infoPaiment,idMecanicien); // Appele a l'api en charge de gérer le paiement

            if(reponse.status === 200)
            {
                console.log("Paiement effectuée avec succès!");
            }
            else
            {
                console.log("Erreur lors du paiement :", reponse.message, "\nStatus: ", reponse.status);            
            }
        }
        catch (error) 
        {
            console.error("Erreur lors du paiement :", error);
        }
    }*/
};