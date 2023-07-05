const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      type: DataTypes.INTEGER,

      primaryKey:true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type: DataTypes.STRING,

    },
    height:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    weight:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    yearsOflife:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fromDB: {
      type: DataTypes.BOOLEAN,
      defaultValue: false 
    }
  }, {
    hooks: {
      beforeCreate: (dog, options) => {
        dog.fromDB = true; 
      },
      beforeBulkCreate: (dogs, options) => {
        dogs.forEach((dog) => {
          dog.fromDB = true; 
        });
      }
    }
  });
};
