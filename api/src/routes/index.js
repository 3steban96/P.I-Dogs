const { Router } = require('express');
const { callApi, getId, searchName,postDogs,getTemperaments, callDbTemp } = require('../controllers/controllers');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/dogs', callApi);
router.get('/dogs/:id', getId);
router.get('/search', searchName);
router.post('/dogs',postDogs);
router.get('/temperaments',getTemperaments)
router.get('/temp',callDbTemp)


module.exports = router;
