
const sequelize = require('../../dataBase/config');
const { DataTypes } = require('sequelize');

const Rol = sequelize.define('Rol', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      estado: {
        type: DataTypes.BOOLEAN, //ac7ivo o no
        allowNull: false,
        defaultValue: false,
      },

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
Rol.sync();



// Exporta el modelo para su uso en otras partes de la aplicación
module.exports = Rol;