
const sequelize = require('../../dataBase/config');
const { DataTypes } = require('sequelize');


const Usuario = sequelize.define('Usuario',{
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
} );



// Asociación con el modelo Rol
//Nota: la asociasion solo se hace en el modelo que consideramos pincipal en este caso usuario a roles 

Usuario.belongsToMany(sequelize.models.Rol, {
  through: 'UsuarioRol', // Tabla intermedia para la relación
  as: 'roles', // Alias para la relación
  foreignKey: 'usuarioId', // Clave foránea en la tabla intermedia
});


// Establece la relación muchos a muchos con Rol
//Usuario.belongsToMany(Rol, { through: 'UsuarioRol' });

// Sincroniza el modelo con la base de datos (esto crea la tabla si no existe)
Usuario.sync();


module.exports = Usuario;