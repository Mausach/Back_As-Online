const { DataTypes } = require('sequelize');
const sequelize = require('../../dataBase/config');
const Sucursal = require('./Sucursal-model');



const Empleado = sequelize.define('Empleado',{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cuil: {
      type: DataTypes.STRING,
      allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
} );

// Asociación con el modelo Rol
//Nota: la asociasion solo se hace en el modelo que consideramos pincipal en este caso usuario a roles 

Empleado.belongsToMany(Sucursal, {
  through: 'EmpleadoSucursal', // Nombre de la tabla intermedia
  foreignKey: 'empleadoId', // Clave foránea en la tabla intermedia
  as: 'sucursales', // Alias para la relación
});


// Establece la relación muchos a muchos con Rol
//Usuario.belongsToMany(Rol, { through: 'UsuarioRol' });

// Sincroniza el modelo con la base de datos (esto crea la tabla si no existe)
Empleado.sync();


module.exports = Empleado;