import { configureStore } from '@reduxjs/toolkit';

const etatInitial = 
{
    cacher: false,
    supprimer: false,
    vehicules: [],
    indexVehicule: 0,
}

const reducer = (state = etatInitial,action) =>
{
    switch (action.type)
    {
        case "CACHER":
            return{...state, cacher: true};
        case "AFFICHER":
            return{...state, cacher: false};
        case "AJOUTER_VEHICULE":
            return{...state, vehicules:[...state.vehicules,action.payload], indexVehicule: state.indexVehicule + 1};
        case "MODIFIER_VEHICULE":
            return{...state}
        case "SUPPRIMER_VEHICULE":
            return{...state, vehicules: state.vehicules.filter(v=> v.idVehicule !== action.payload)}
        default:
            return state;
    }
};

const store = configureStore({reducer:reducer});
export default store;