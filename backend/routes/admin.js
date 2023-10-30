const express = require('express');
//const { crearProducto, editarProducto, eliminarProducto, cargarProducto, cargarUsuarios, cargarPedidos, confirmarPedido, inhabilitarUsuario, cargarProducto_Aleatorio } = require('../controllers/admin');

const { check } = require('express-validator');
const { validarCampos } = require('../Midelwares/ValidarCampos');
const { crearRol, cargarUsuarios, cargar_un_Usuario, cargar_roles_x_usuario, cargar_usuario_x_rol, editarUsuario, cambiarRolUsuario, asignarNuevoRol, eliminarRolDeUsuario } = require('../controllers/admin');


//const { validarJWTAdmin } = require('../Midelwares/validarJwtAdmin');

const routerAdmin = express.Router();


routerAdmin.post( 
  '/new-rol', /*validarJWTAdmin,*/ [ //la ruta para crear un nuevo rol

  check("nombre", "el nombre del nuevo rol es obligatorio").not().isEmpty(),
  
  validarCampos,



], crearRol
);



routerAdmin.put(
  '/edit-nombre', /*validarJWTAdmin*/ [ //la ruta seria /admin/edit para editar productos

  check("nombre", "el nombre es obligatorio").not().isEmpty(),
  //check("precio", "el precio es obligatorio").not().isEmpty(),
  //check("cantidad", "la cantidad es obligatoria").not().isEmpty(),
  //check("detalle", "el detalle es obligatorio").not().isEmpty(),
  //check("categoria", "la categoria es obligatoria").not().isEmpty(),
  //validarCampos,

], editarUsuario
);

routerAdmin.put('/cambiar-rol-us', /*validarJWTAdmin,*/ cambiarRolUsuario);

routerAdmin.put('/asignar-rol-us', /*validarJWTAdmin,*/ asignarNuevoRol);

routerAdmin.delete('/usuarios/:usId/rol/:rolId', eliminarRolDeUsuario);

routerAdmin.delete('/eliminar/:id', /*validarJWTAdmin, eliminarProducto*/);

routerAdmin.get('/productos', /*cargarProducto*/);//no lleva validar token asi los usuarios no logueados puedan ver la tienda

routerAdmin.get('/productos/aleatorios', /*cargarProducto_Aleatorio*/);

routerAdmin.get('/usuarios', /*validarJWTAdmin,*/ cargarUsuarios);

routerAdmin.get('/usuario/:id', /*validarJWTAdmin,*/ cargar_un_Usuario);//usuario por id /:id/roles

routerAdmin.get('/usuario/:id/roles', /*validarJWTAdmin,*/ cargar_roles_x_usuario);//cuántos roles tiene un usuario 

routerAdmin.get('/rol/:id/usuarios', /*validarJWTAdmin,*/ cargar_usuario_x_rol);//cuántos usuarios tiene un rol 

routerAdmin.get('/pedidos', /*validarJWTAdmin, cargarPedidos*/);

routerAdmin.put('/confirmar', /*validarJWTAdmin, confirmarPedido*/);

routerAdmin.put('/Deshabilitar', /*validarJWTAdmin, inhabilitarUsuario*/);


//aclaras que se exporta todo lo trabajado con router
module.exports = routerAdmin;