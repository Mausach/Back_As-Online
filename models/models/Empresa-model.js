const sequelize = require('../../dataBase/config');
const { DataTypes } = require('sequelize');


const Empresa = sequelize.define('Empresa',{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_Esutdio_Conable: {
    type: DataTypes.INTEGER,
    allowNull:false
  },
  cuit: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  razonsocial: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nombrefantasia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false
  }
  
} );



// Asociación con el modelo Rol
//Nota: la asociasion solo se hace en el modelo que consideramos pincipal en este caso usuario a roles 
/*
Usuario.belongsToMany(sequelize.models.Rol, {
  through: 'UsuarioRol', // Tabla intermedia para la relación
  as: 'roles', // Alias para la relación
  foreignKey: 'usuarioId', // Clave foránea en la tabla intermedia
});
*/

// Establece la relación muchos a muchos con Rol
//Usuario.belongsToMany(Rol, { through: 'UsuarioRol' });

// Sincroniza el modelo con la base de datos (esto crea la tabla si no existe)
Empresa.sync();


module.exports = Empresa;