import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App'; // Page de connexion
import PageInscription from './gestionConnexion/inscription';
import PageClient from './PageClient'; // Page client
import PageMecanicien from './PageMecanicien'; // Page mécanicien
import { Provider } from 'react-redux';
import store from './store';
import PageConnexionClient from './gestionConnexion/connexionClient';
import PageConnexionMecanicien from './gestionConnexion/connexionMecanicien';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/inscription" element={<PageInscription />} />
      <Route path="/pageconnexionclient" element={<PageConnexionClient/>}/>
      <Route path="/pageclient" element={<PageClient />} />
      <Route path="/pageconnexionmecanicien" element={<PageConnexionMecanicien/>}/>
      <Route path="/pagemecanicien" element={<PageMecanicien />} />
    </Routes>
  </Router>
  </Provider>
);