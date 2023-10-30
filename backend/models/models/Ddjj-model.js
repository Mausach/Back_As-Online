const sequelize = require('../../dataBase/config');
const { DataTypes } = require('sequelize');

const Ddjj = sequelize.define('Ddjj', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_cabezera: {
        type: DataTypes.INTEGER,
        
      },
      periodo: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      cuit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      //PREGUNTAR ESTE CAMPOs
      cuil_empleado: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sueldo: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      acuerdo: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
        allowNull: false,
      },
      descley: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      descvolunt: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      rectificacion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cargafamiliar: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      jubilado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      fechabaja: {
        type: DataTypes.DATE,
        allowNull: false,
      }
});

// Asociación con el modelo Usuario
// Sincroniza el modelo con la base de datos (esto crea la tabla si no existe)
Ddjj.sync();



// Exporta el modelo para su uso en otras partes de la aplicación
module.exports = Ddjj;