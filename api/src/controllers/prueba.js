ControllerDogs: const axios = require ("axios"); 
const {Dog, Temperament} = require ("../db"); 
const {Op} = require ("sequelize"); 
const {API_KEY} = process.env; 



const cleanArrayDogs = (arr) => 

arr.map ((elem) => {
    return {
        id: elem.id,
        name: elem.name, 
        image: elem.image.url,
        height_min_cms: parseInt(elem.height.metric.split("-")[0]),
        height_max_cms: parseInt(elem.height.metric.split("-")[1]),
        weight_min_kg: parseInt(elem.height.metric.split("-")[0]),
        weight_max_kg: parseInt(elem.height.metric.split("-")[1]),
        lifeSpan: elem.life_span, 
        created: false, 
        temperament: elem.temperament? elem.temperament.split(", ").join(", "):["No tiene temperamento"],
    }    
})

const cleanArrayDogsDb = (array) => 

    array.map((dog) => {
        return  {
            id: dog.id,
            name: dog.name,
            image: dog.image,
            height_min_cms: dog.height_min_cms,
            height_max_cms: dog.height_max_cms,
            weight_min_kg: dog.weight_min_kg,
            weight_max_kg: dog.weight_max_kg,
            lifeSpan: dog.lifeSpan,
            temperament: (dog.map(temperament=>temperament.name)),
            created: dog.created
        }
    })

        
const getAllDogs = async () => {
    
    const dataBaseDogs = await Dog.findAll({include: {
        model: Temperament, 
        attributes: ["name"],
        through: {attributes: []},
    }}); 

    const cleanDogsData = []; 

    cleanArrayDogsDb (dataBaseDogs); 

    cleanDogsData.push(cleanArrayDogsDb); 
    

    
    const url = "https://api.thedogapi.com/v1/breeds"; 
    const requestUrl = `${url}?api_key=${API_KEY}`; 
    
    const apiDogsRaw = (await axios.get(requestUrl)).data; 
    
    const apiDogsClean = cleanArrayDogs (apiDogsRaw); 
    
    return [...cleanDogsData, ... apiDogsClean]; 
}; 
    
    
const getDogById = async (id, source) => {
    
    const cleanArrayDogsById = (arr) => 

        arr.map ((elem) => {
            return {
                id: elem.id,
                name: elem.name, 
                image: elem.image.url,
                height_min_cms: parseInt(elem.height.metric.split("-")[0]),
                height_max_cms: parseInt(elem.height.metric.split("-")[1]),
                weight_min_kg: parseInt(elem.height.metric.split("-")[0]),
                weight_max_kg: parseInt(elem.height.metric.split("-")[1]),
                lifeSpan: elem.life_span, 
                created: false, 
                temperament: elem.temperament? elem.temperament.split(", "):["No tiene temperamento"],
    }
    
    
})  
    
       const cleanData = []; 
    
       const url = `https://api.thedogapi.com/v1/breeds/${id}`;
       const requestUrl= `${url}?api_key=${API_KEY}`; 
    
        const apiDataRaw = (await axios.get (requestUrl)).data; 
    
        cleanData.push(apiDataRaw); 
    
    
        const dataDogsClean = source === "API" ? 
    
        await cleanArrayDogsById(cleanData) : 
    
        await Dog.findByPk(id, {
            include: {
                model: Temperament, 
                attributes: ["name"],
                through: {attributes: []},
            }
        })

        // let response = await dataDogsClean?.map((dog) => {
        //     return{
        //         id: dog.id,
        //         name: dog.name,
        //         image: dog.image,
        //         height_min_cms: dog.height_min_cms,
        //         height_max_cms: dog.height_max_cms,
        //         weight_min_kg: dog.weight_min_kg,
        //         weight_max_kg: dog.weight_max_kg,
        //         lifeSpan: dog.lifeSpan,
        //         temperament: dog.temperaments?.map(temperament=>temperament.name),
        //         created: dog.created
        //     }
        // })
        
    
        return dataDogsClean; 
}




const getDogByName = async (name) => {

    const dataBaseDogs = await Dog.findAll(
        
        { 
            where:{
            
                [Op.or]: [{name: {[Op.iLike]:`%${name}%`}}]                   
            },

            include: {
                model: Temperament, 
                attributes: ["name"],
                through: {attributes: []},
    }}); 

            
    
    const url = "https://api.thedogapi.com/v1/breeds"
    const requestUrl = `${url}?api_key=${API_KEY}`
    const apiDogsRaw = (await axios.get(requestUrl)).data; 

    const apiDogs = cleanArrayDogs(apiDogsRaw); 
    const regex = new RegExp(name, "i"); 

    const filteredApi = apiDogs.filter((dog)=> regex.test(dog.name)); 

    return [...dataBaseDogs, ...filteredApi]
}


const createDog = async (name, image, height_min_cms, height_max_cms, weight_min_kg, weight_max_kg, lifeSpan, temperamentName) => {
    try {
      const newDog = await Dog.create({
        name,
        image,
        height_min_cms,
        height_max_cms,
        weight_min_kg,
        weight_max_kg,
        lifeSpan,
      });
  
      
      const [temperamentObj, created] = await Temperament.findAll({
        where: { name: temperamentName },
      });
  
      
      await newDog.addTemperament(temperamentObj);
  
      return newDog;
    } catch (error) {
      console.error(error);
      throw new Error('Error al crear el perro');
    }
  };
  

const deleteDog = async (id) => {
    const dogToDelete = await Dog.findByPk(id);
    await dogToDelete.destroy(); 
    return dogToDelete; 
}


module.exports = {

    getAllDogs,
    getDogById,
    getDogByName,
    createDog,
    deleteDog
}
HandlerDogs: const {getDogByName, getAllDogs, getDogById, createDog, deleteDog} = require ("../controllers/dogsControllers"); 
const {Temperament} = require ("../db"); 


const getDogsHandler = async (req, res) => {

    const {name} = req.query; 

    try {
        const results = name ? await getDogByName(name) : await getAllDogs(); 
        
        if (results.length == 0) {
            throw new Error ("Raza no existe")
        } else {
            res.status(200).json(results); 
        }

    } catch (error) {
        res.status(400).json({error: error.message}); 
    }
}; 


const getDogByIdHandler = async (req, res) => {

    const {id, imageId} = req.params;

    const source = isNaN(id) ? "BDD" : "API"

    try {
        const dogById = await getDogById(id, source, imageId); 
        res.status(200).json(dogById); 
    } catch (error) {
        res.status(400).json({error: error.message}); 
    }
}; 

const createDogHandler = async (req, res) => {
    const { name, image, height_min_cms, height_max_cms, weight_min_kg, weight_max_kg, lifeSpan, temperamentId } = req.body;
  
    try {
      const newDog = await createDog(
        name,
        image,
        height_min_cms,
        height_max_cms,
        weight_min_kg,
        weight_max_kg,
        lifeSpan,
        temperamentId
      );
  
      res.status(201).json(newDog);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

const dogToDeleteHandler = async (req, res) => {

    const {id} = req.params; 

    try {
        const deleted = await deleteDog(id); 
        res.status(200).json(deleted)
    } catch (error) {
        res.status(400).json({error: error.message}); 
    }
}

module.exports = {
    getDogsHandler,
    getDogByIdHandler,
    createDogHandler,
    dogToDeleteHandler
}