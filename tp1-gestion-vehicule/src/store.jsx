import { configureStore } from '@reduxjs/toolkit';

const etatInitial = 
{
    cacher: false,
    supprimer: false,
    vehicules: [],
}

const reducer = (state = etatInitial,action) =>
{
    switch (action.type)
    {
        case "CACHER":
            return{...state, cacher: true};
        case "AFFICHER":
            return{...state, cacher: false};
        default:
            return state;
    }
};

const store = configureStore({reducer:reducer});
export default store;