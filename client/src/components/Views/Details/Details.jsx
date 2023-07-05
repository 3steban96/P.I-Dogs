import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { details } from "../../../redux/actions";
import './Details.css'
import imageHome from "../../images/imageHome.png"
export default function Details(props){
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(details(props.match.params.id));
    },[dispatch,props.match.params.id])

    const detail = useSelector((state)=>state.detail);
    const handleHome= ()=>{
        window.location='/home'
      }
    return(
        <div className="containerDetails">
            <div className="topSection">
                <h1 className="titleH">Dogs</h1>
                <img src={imageHome} alt="imageHome" className="imageHome"/>
                <button onClick={handleHome} className="buttonD">Inicio</button>
            </div>        
            <div className="flex">            
                    <div className="formDetails">
                        <h2 className="title">Detalles</h2>
                        <div  >
                        <h3 class="label">Id: {detail.id}</h3> 
                        </div>
                        <div  >
                            <h3 class="label">Name: {detail.name}</h3>
                        </div>
                        <div  className='img-container'>
                            <img  src={detail.image} alt="imagen"/>
                        </div>
                        <div  >
                            <h3 class="label">Altura: {detail.height} In(pulgadas)</h3>
                        </div>
                        <div  >
                            <h3 class="label">Peso: {detail.weight}LB</h3>
                        </div>                    
                        <div >
                            <h3 class="label">Años de vida: {detail.yearsOflife}</h3>
                        </div>                    
                        <div >
                            <h3 class="label">Temperamentos: {detail.temper}</h3>
                        </div>
                    </div>
            </div>            
        </div>
    )
}