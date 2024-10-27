import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const PageConnexionMecanicien = () => 
{	
  	const [messageErreur, setMessageErreur] = useState('');
  	const navigate = useNavigate();

  	const gererConnexion = async (e) =>
	{
		e.preventDefault();
		const donneeFormulaire = new FormData(e.target);

		try 
		{
			const reponse = await axios.post('https://dummyjson.com/users/login', 
			{
				username: donneeFormulaire.get('username'),
				password: donneeFormulaire.get('mdp'),
			});

			if (reponse.status === 200) 
			{
				navigate('/pagemecanicien');
			} 
			else 
			{
				setMessageErreur("Erreur lors de la connexion!");
			}
		} 
		catch (error) 
		{
			setMessageErreur("Erreur lors de la connexion!");
		}
	};

  	return(
  	  <div className="login-container">
  	    <h1>Connexion Mécanicien</h1>
  	    <form onSubmit={gererConnexion} className="login-form">
  	      <input type="text" name="username" placeholder="Nom d'utilisateur" required />
  	      <input type="password" name="mdp" placeholder="Mot de passe" required />
  	      <button type="submit">Se connecter</button>
  	      {messageErreur && <p className="error-message">{messageErreur}</p>}
  	    </form>
  	  </div>
  	);
};

export default PageConnexionMecanicien;
