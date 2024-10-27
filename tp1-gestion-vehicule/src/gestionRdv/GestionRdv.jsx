import React, {Component} from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import Rdv from './Rdv';


class GestionRdv extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            
        }
    }

    render()
    {
        return(
            <>
                {this.props.rdvs.map((rdv) => (<Rdv key={rdv.idVehicule} idVehicule={rdv.idVehicule} fabricant={vehicule.fabricant} modele={vehicule.modele} annee={vehicule.annee}/>))}
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    cacher: state.cacher,
    rdvs: state.rdvs,
    indexVehicule: state.indexVehicule,
    user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
    ajouterVehicule: (vehicule) => dispatch({ type: 'AJOUTER_VEHICULE', payload: vehicule }),
    setIndex: (index) => dispatch({type: 'SET_INDEX',payload:index}),
});

export default connect(mapStateToProps,mapDispatchToProps)(GestionRdv);