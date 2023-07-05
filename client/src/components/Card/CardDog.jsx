import React from "react";  
import './Card.css'
export default function CardDog({image, name, temper,weight}){
    return(
        <div>
            <div className="card">
                <div className="containerImg" >
                    <img className="img" src={image} alt=""/>
                </div>
                <div className="card_content">
                    <div className="card_title">
                        <h1>Nombre: {name}</h1>
                        <h1>Temperamentos: {temper}</h1> 
                        <h1>Peso: {weight}LB</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}