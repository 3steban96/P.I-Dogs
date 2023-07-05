// import React from "react";
// import './SearchBar.css'

// export default function SearchBar() {
//     const handleSearch = () => console.log("buscando");
//   return (
//     <div className="containerS">      
//         <input type="text" className="input-style" placeholder="Ingresa la raza" />        
//         <button className="buttonS"onClick={handleSearch}>Buscar</button>     
//     </div>
//   );
// }
import React, { useState } from "react";
import './SearchBar.css';
import { useDispatch } from "react-redux";
import { searchByName } from "../redux/actions";
import imageHome from "./images/imageHome.png"

export default function SearchBar() {
  
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const handleSearch = () => {
    dispatch(searchByName(searchValue));
  };
  const handleHome= ()=>{
    window.location='/home'
  }
  const handleForm= ()=>{
    window.location='/form'
  }

  return (
    <div className="containerS">
      <h1 className="titleH">Dogs</h1>
        <img src={imageHome} alt="imageHome" className="imageHome"/>
        <button onClick={handleHome} className="buttonH">Inicio</button>
        <button onClick={handleForm} className="buttonAdd">Agregar Perro</button>
          
      <input
        type="text"
        className="input-style"
        placeholder="Ingresa la raza"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />        
      <button className="buttonS" onClick={handleSearch}>Buscar</button>     
    </div>
  );
}


