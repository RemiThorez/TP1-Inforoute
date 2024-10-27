import { configureStore } from '@reduxjs/toolkit';

const etatInitial = 
{
    cacher: false,
    supprimer: false,
    vehicules: [],
    rdvs: [],
    indexRdv: 0,
    indexVehicule: 0,
    user: null,
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
        case "SUPPRIMER_VEHICULE":
            return{...state, vehicules: state.vehicules.filter(v=> v.idVehicule !== action.payload)};
        case "MODIFIER_VEHICULE":
            return {...state,vehicules: state.vehicules.map(v => v.idVehicule === action.payload.idVehicule ? { ...v, ...action.payload }: v)};
        case "SET_INDEX_VEHICULE":
            return{...state, indexVehicule:action.payload};
        case "SET_INDEX_RDV":
            return{...state, indexRdv:action.payload};
        case "SET_USER":
            return{...state, user:action.payload};
        case "SET_VEHICULES_EXISTANT":
            if(action.payload.length === 0)
            {
                return{...state};
            }
            return{...state, vehicules: action.payload};
        case "MODIFIER_RDV":
            return {...state,rdvs: state.rdvs.map(rdv => rdv.rdvId === action.payload.rdvId ? { ...v, ...action.payload }: v)};
        case "AJOUTER_RDV":
            return{...state, rdv:[...state.rdv,action.payload], indexRdv: state.indexRdv + 1};
        case "SET_RDVS_EXISTANT":
            if(action.payload.length === 0)
            {
                return{...state};
            }
            return{...state, rdvs: action.payload};
        default:
            return state;
    }
};

const store = configureStore({reducer:reducer});
export default store;