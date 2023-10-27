const sequelize = require('../../dataBase/config');
const { DataTypes } = require('sequelize');

const DdjjC = sequelize.define('DdjjC', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      periodo: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      cuit: {
          type: DataTypes.STRING,
          allowNull: false
      },
      fechapresentacion: {
          type: DataTypes.DATE,
          allowNull: false
      },
      fechapago: {
          type: DataTypes.DATE,
          allowNull: false
      },
      fechaprocesamiento: {
          type: DataTypes.DATE,
          allowNull: false
      },
      fechabaja: {
          type: DataTypes.DATE,
          allowNull: false
      },
      totaldescley: {
          type: DataTypes.FLOAT,
          allowNull: false
      },
      totaldescvolunt: {
          type: DataTypes.FLOAT,
          allowNull: false
      }

});



// Asociación con el modelo Usuario

/*
Rol.belongsToMany(Usuario, {
  through: 'UsuarioRol', // Tabla intermedia para la relación
  as: 'usuarios', // Alias para la relación
  foreignKey: 'rolId', // Clave foránea en la tabla intermedia
});
*/



// Establece la relación muchos a muchos con Usuario
//Rol.belongsToMany(Usuario, { through: 'UsuarioRol' });

// Sincroniza el modelo con la base de datos (esto crea la tabla si no existe)
DdjjC.sync();



// Exporta el modelo para su uso en otras partes de la aplicación
module.exports = DdjjC;