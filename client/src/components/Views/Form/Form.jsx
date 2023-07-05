import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postForm } from "../../../redux/actions";
import './Form.css'
import imageHome from "../../images/imageHome.png"
export default function Form(){
    const dispatch = useDispatch()
    const [name, setName]= useState('');
    const [height, setHeight]= useState('');
    const [weight, setWeight]= useState('');
    const [yearsOflife, setYearsOflife]= useState('');
    const [temper, setTemper]= useState('');
    const [image, setImage]= useState('');

    const handlePostDog = (event) => {
        // event.preventDefault(); 
    
        const postData = {
          name: name,
          height: height,
          weight: weight,
          yearsOflife: yearsOflife,
          temper: temper,
          image: image
        };
        dispatch(postForm(postData));
    };    
    const handleName= (event)=>{
        setName(event.target.value);
    };
    const handleHeight= (event)=>{
        setHeight(event.target.value);
    };
    const handleWeight= (event)=>{
        setWeight(event.target.value);
    };
    const handleYearsOflife= (event)=>{
        setYearsOflife(event.target.value);
    };
    const handleTemper= (event)=>{
        setTemper(event.target.value);
    };
    const handleImage= (event)=>{
        setImage(event.target.value);
    };
    const handleHome= ()=>{
        window.location='/home'
      }
    return(
        <div className='containerForm'>
            <div className="topSectionF">
               <h1 className="titleH">Dogs</h1>
               <img src={imageHome} alt="imageHomeF" className="imageHomeF"/>
                <button onClick={handleHome} className="buttonHF">Inicio</button>
            </div> 
            <form className='formP'>
                <p className="titleForm">Añadir Perro</p>
                <div className="flexForm">
                    <div className="input-groupForm">            
                        <label className="labelForm">Nombre de la raza:</label>
                        <input type="text" onChange={handleName}required="" autoComplete="off" className="inputForm"/>             
                    </div>
                    <div className="input-groupForm">            
                        <label className="labelForm">Altura en medida imperial:</label>
                        <input type="text" onChange={handleHeight}required="" autoComplete="off" className="inputForm"/>             
                    </div>
                    <div className="input-groupForm">            
                        <label className="labelForm">Peso en medida imperial:</label>
                        <input type="text" onChange={handleWeight}required="" autoComplete="off" className="inputForm"/>             
                    </div>
                    <div className="input-groupForm">            
                        <label className="labelForm">Años de vida:</label>
                        <input type="text" onChange={handleYearsOflife}required="" autoComplete="off" className="inputForm"/>             
                    </div>
                    <div className="input-groupForm">            
                        <label className="labelForm">Temperamento:</label>
                        <input type="text" onChange={handleTemper}required="" autoComplete="off" className="inputForm"/>             
                    </div>
                    <div className="input-groupForm">            
                        <label className="labelForm">Imagen:</label>
                        <input type="text" onChange={handleImage}required="" autoComplete="off" className="inputForm"/>             
                    </div>
                    <div >
                        <button className="buttonForm" onClick={handlePostDog}>Agregar</button>
                    </div>                                         
                </div>
            </form>                     
        </div>
    );
};