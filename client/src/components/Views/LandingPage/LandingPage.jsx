import React from "react";
import {useHistory} from 'react-router-dom';
import landing from '../../images/Dog-Facts-remove.png'
import './Landing.css'
export default function Landing(){
    const history = useHistory();
    const handleRedirect=()=>{
        history.push('/home');
    }
    return(
        <div className="containerLanding">
            <div className="content">
                <img src={landing} alt="Landing"/>
                <button className ="button_top"onClick={handleRedirect}>Ingresar</button>
            </div>
        </div>
    )
}