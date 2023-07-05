import axios from 'axios';

export const obtDogs = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/dogs"); 
      // console.log("Datos obtenidos:", response.data);
      dispatch({ 
        type: "Obt_Dog", 
        payload: response.data });
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };
};
export const searchByName= (name)=>{
  return async (dispatch)=>{
    try {
      const response = await axios.get(`http://localhost:3001/search?name=${name}`);
      // console.log("Datos de busqueda",response);
      dispatch({
        type: "Search",
        payload:response.data});
    } catch (error) {
      console.log("Error en la busqueda: ",error)
    }
  };
};
export const details =(id) =>{
  return async ( dispatch)=>{
    try {
      const response = await axios.get(`http://localhost:3001/dogs/`+id);
      // console.log("Data detalles",response.data);
      dispatch ({
        type:"Details",
        payload:response.data
      });
    } catch (error) {
      console.log("Error al obtener detalles", error)
    };
  };
};
export const postForm= (payload)=>{
  return async (dispatch)=>{
    try {
      const response = await axios.post(`http://localhost:3001/dogs`,payload);
      const addDog= response.data
      // console.log("Raza creada",addDog);
      return addDog
    } catch (error) {
      console.log("Error al agregar raza de perro", error)
    }
  }
}