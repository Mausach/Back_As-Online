const sequelize = require('../../dataBase/config');
const { DataTypes } = require('sequelize');


const Sucursal = sequelize.define('Sucursal',{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_Empresa: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_Sindicato: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_localidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
  
} );



// Asociación con el modelo Rol
//Nota: la asociasion solo se hace en el modelo que consideramos pincipal en este caso usuario a roles 
/*
Sucursal.belongsToMany(sequelize.models.Empleado, {
    through: 'Empleado-Sucursal', // Tabla intermedia para la relación
    as: 'sucursales', // Alias para la relación
    foreignKey: 'empleadoId', // Clave foránea en la tabla intermedia
  });
*/
// Establece la relación muchos a muchos con Rol
//Usuario.belongsToMany(Rol, { through: 'UsuarioRol' });

// Sincroniza el modelo con la base de datos (esto crea la tabla si no existe)
Sucursal.sync();


module.exports = Sucursal;