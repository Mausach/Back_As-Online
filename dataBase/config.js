const { Sequelize } = require('sequelize');


  // Configuración de conexión a la base de datos
const sequelize = new Sequelize('mau-prueba', 'postgres', 'mauro123', { //esos da7os deberian es7ar en el env
  host: 'localhost', // El host de tu servidor PostgreSQL
  dialect: 'postgres', // El dialecto de la base de datos (en este caso, PostgreSQL)
  define: {
    freezeTableName: true, // Deshabilita la búsqueda automática de nombres de tablas
    timestamps: false, // Si no necesitas marcas de tiempo
  },


});

/*
const dbConeccion = async () => {
  // Prueba de conexión a la base de datos
sequelize
.authenticate()
.then(() => {
  console.log('Conexión a la base de datos establecida con éxito.');
})
.catch((error) => {
  console.error('Error al conectar con la base de datos:', error);
  //aqui va la coneccion a la DB local
});

}
*/


  

// Exporta la instancia de Sequelize configurada
module.exports = sequelize;


