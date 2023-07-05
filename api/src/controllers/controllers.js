const axios = require('axios');
const e = require('express');
const { Op,where,Sequelize}= require('sequelize');
const {Dog, Temperament} = require('../db.js');

/////////////////////// Ruta GetAll///////////////////////////////////
async function callApi(req,res){
    try {
        const {api_key}= process.env
        const response = await axios.get('https://api.thedogapi.com/v1/breeds', {
        headers: {
            'x-api-key': api_key
        }      
        })
        const apiMapData = response.data.map(dog=>{
            const obj ={
                id:dog.id,
                name : dog.name,
                image: dog.image.url,
                weight: dog.weight.imperial,
                height: dog.height.imperial,
                yearsOflife: dog.life_span,
                temper: dog.temperament
            }
            return obj;
        });
        const db = await Dog.findAll({include: [{model: Temperament}]});
        const suma= [apiMapData, ...db];
        res.status(200).json(suma.flat(Infinity))
    } catch (error) {
        console.error('error al obtener los datos de la api',error)
        res.status(500).json({error:'Ocurrio un error al obtener los datos'})
    }    
}
////////////Get dogs:idRaza///////////////////////

async function getId(req,res){
    try {
        const {api_key}= process.env
        const id = req.params.id;
        const dog = await Dog.findByPk(id);
        if(dog){
            return res.json({
                dog: dog,
            });
        }
        if(!dog){
            const apiResponse = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`, {
                headers: {
                  'x-api-key': api_key
                }      
              });        
        if(!apiResponse.data){
            return res.status(404).json({error:'No se ha encontrado la raza'})
        }
        return res.json({
            id: apiResponse.data.id,
            name: apiResponse.data.name,
            image: `https://cdn2.thedogapi.com/images/${apiResponse.data.reference_image_id}.jpg`, 
            weight: apiResponse.data.weight.imperial,
            height: apiResponse.data.height.imperial,
            yearsOflife: apiResponse.data.life_span,
            temper: apiResponse.data.temperament,
          });            
    }
    return res.status(404).json({ error: 'No se ha encontrado la raza solicitada' });
    } catch (error) {
        console.error(error);
      return res.status(500).json({ error: 'Ha ocurrido un error al obtener la raza' });
    }
}
//////////////// Get dogs/name?=.../////////////
// async function searchName(req, res) {
//   try {
//     const name = req.query.name;
//     const { api_key } = process.env;

//     const apiResponse = await axios.get(`https://api.thedogapi.com/v1/breeds/search`, {
//       headers: {
//         'x-api-key': api_key
//       },
//       params: {
//         q: name
//       }
//     });
    
//     const dogs = apiResponse.data;
//     if (!dogs.length) {
//       return res.status(404).json({ error: 'No se han encontrado razas de perro con ese nombre' });
//     }

//     const transformedDogs = dogs.map(dog => ({
//       id: dog.id,
//       name: dog.name,
//       image: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`,
//       weight: dog.weight.imperial,
//       height: dog.height.imperial,
//       yearsOflife: dog.life_span,
//       temper: dog.temperament
//     }));

//     return res.json(transformedDogs);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Ha ocurrido un error al obtener las razas de perros' });
//   }
// }


async function searchName(req, res) {
  try {
    const name = req.query.name;
    const { api_key } = process.env;

    // Buscar en la API "The Dog API"
    const dogApiResponse = await axios.get(`https://api.thedogapi.com/v1/breeds/search`, {
      headers: {
        'x-api-key': api_key
      },
      params: {
        q: name
      }
    });

    const apiDogs = dogApiResponse.data;

    // Buscar en la base de datos Dog
    
    const response = await Dog.findAll({
      where: {
        name: name
      }
    });
    const dogs = [...apiDogs, ...response];

    if (!dogs.length) {
      return res.status(404).json({ error: 'No se han encontrado razas de perro con ese nombre' });
    }

    const transformedDogs = dogs.map(dog => ({
      id: dog.id,
      name: dog.name,
      image: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`,
      weight: dog.weight.imperial,
      height: dog.height.imperial,
      yearsOflife: dog.life_span,
      temper: dog.temperament
    }));

    return res.json(transformedDogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ha ocurrido un error al obtener las razas de perros' });
  }
}

////////////////////Post//////////////////

async function postDogs(req, res) {
    try {
      const { name, height, weight, yearsOflife, temper, image } = req.body;
  
      if (!name || !height || !weight || !yearsOflife || !temper || !image) {
        return res.status(400).json({ error: 'Faltan campos obligatorios en la solicitud' });
      }
  
      let dog = await Dog.findOne({
        where: {
          name: name,
        },
      });
  
      if (dog) {
        return res.status(400).json({ error: 'La raza de perro ya existe' });
      }
  
      const createdDog = await Dog.create({
        name,
        height,
        weight,
        yearsOflife,
        image
      });
      const temperaments = await Temperament.findAll({
        where: {
          temper: temper,
        },
      });
  
      if (temperaments.length === 0) {
        return res.status(400).json({ error: 'El temperamento no existe' });
      }
  
      await createdDog.setTemperaments(temperaments);
  
      return res.status(200).json({ message: 'Raza de perro creada exitosamente' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'No se pudo crear la raza de perro' });
    }
  }
  
//////////////Get/temperaments/////////////////////////

async function getTemperaments(req,res) {
    try {
      const { api_key } = process.env;
  
      const response = await axios.get('https://api.thedogapi.com/v1/breeds', {
        headers: {
          'x-api-key': api_key,
        },
      });
  
      const apiTemperaments = response.data.reduce((temperaments, dog) => {
        if (dog.temperament) {
          const dogTemperaments = dog.temperament
            .split(', ')
            .map((temperament) => temperament.trim());
  
          dogTemperaments.forEach((temperament) => {
            if (!temperaments.includes(temperament)) {
              temperaments.push(temperament);
            }
          });
        }
        return temperaments;
      }, []);
  
      const savedTemperaments = await Promise.all(
        apiTemperaments.map((temperament) =>
          Temperament.findOrCreate({
            where: { temper: temperament },
            defaults: { temper: temperament },
          })
        )
      );
      
      console.log('Temperaments saved successfully.');
      if (savedTemperaments.length === apiTemperaments.length) {
        console.log('Extraction and saving of temperaments completed.');
       return res.status(200).json({ message: 'Temperamento guardado exitosamente' }); 
      } else {
        console.log('Extraction and saving of temperaments partially completed.');
      }
    } catch (error) {
      console.error('Error saving temperaments from API:', error);
    }
  }  
/////////////////callDb 
async function callDbTemp(req,res){
  try {
    const dataDbTemp = await Temperament.findAll();
    res.status(200).json(dataDbTemp)
  } catch (error) {
    console.error('Error al obtener los datos', error);
    res.status(500).json({error:'Ocurrio un error al obtener los datos'});
  }
}
  
module.exports={callApi, getId, searchName, postDogs,getTemperaments,callDbTemp}


