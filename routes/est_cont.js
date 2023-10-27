const express = require('express');
const { validarCampos } = require('../Midelwares/ValidarCampos');
const { AltaEmpresa, cargar_una_Empresa, AltaSucursal, cargar_una_Sucursal, cargarSucursales, AltaEmpleado, cargar_sucursal_x_empleado, cargar_empleado_x_sucursal, cargarEmpresas, GuardarDeclaracionJurada, cargar_un_resumenDdjc, cargar_resumenesDdjc, cargar_Declaraciones_DdjC, cargar_una_declaracion, cargarSucursales_x_empresa } = require('../controllers/est_cont');
//const { crearProducto, editarProducto, eliminarProducto, cargarProducto, cargarUsuarios, cargarPedidos, confirmarPedido, inhabilitarUsuario, cargarProducto_Aleatorio } = require('../controllers/admin');

const { check } = require('express-validator');
//const { validarCampos } = require('../Midelwares/validarCampos');

//const { validarJWTAdmin } = require('../Midelwares/validarJwtAdmin');

const routerEstCont = express.Router();


routerEstCont.post( 
  '/new-al-em', /*validarJWTAdmin,*/ [ //la ruta para crear empresa

  check("cuit", "el cuit es obligatorio").not().isEmpty(),
  check("razonsocial", "la razonsocial es obligatoria").not().isEmpty(),
  check("nombrefantasia", "el nombrefantasia es obligatoria").not().isEmpty(),
  check("telefono", "el numero de telefono es obligatorio").not().isEmpty(),
  validarCampos,

], AltaEmpresa
);

routerEstCont.post( 
  '/new-sucursal', /*validarJWTAdmin,*/ [ //la ruta para crear sucursal

 // check("cuit", "el cuit es obligatorio").not().isEmpty(),
  //check("razonsocial", "la razonsocial es obligatoria").not().isEmpty(),
  check("nombre", "el nombrefantasia es obligatoria").not().isEmpty(),
  //check("telefono", "el numero de telefono es obligatorio").not().isEmpty(),
  validarCampos,

], AltaSucursal
);

routerEstCont.post( 
  '/new-al-emp', /*validarJWTAdmin,*/ [ //la ruta para crear empleado

  check("dni", "el DNI es obligatorio").not().isEmpty(),
  check("cuil", "el CUIL es obligatorio").not().isEmpty(),//como upda7e podriamos agregar el me7odo que 7e calcule solo el cuil
  check("nombre", "el nombre es obligatorio").not().isEmpty(),
  check("apellido", "el apellido es obligatorio").not().isEmpty(),
  validarCampos,

], AltaEmpleado
);

//pregun7ar bien da7os indispensables
routerEstCont.post( 
  '/new-ddj', /*validarJWTAdmin,*/ [ //la ruta para crear una delaracion jurada

  check("ddjjC", "los da7os del resumen son obliga7orios").not().isEmpty(),
  check("empleados", "los datos Empleados es obligatorio").not().isEmpty(),
  validarCampos,

], GuardarDeclaracionJurada
);


routerEstCont.get('/em/:id', /*validarJWTAdmin,*/ cargar_una_Empresa);//empresa por id 

routerEstCont.get('/empresas/:id', /*validarJWTAdmin,*/ cargarEmpresas);//carga las empresas de un id 

routerEstCont.get('/suc/:id', /*validarJWTAdmin,*/ cargar_una_Sucursal);//sucursal x id

routerEstCont.get('/sucursales/:id', /*validarJWTAdmin,*/ cargarSucursales_x_empresa);//carga 7odas las sucursales de un id de empresa

routerEstCont.get('/sucursales', /*validarJWTAdmin,*/ cargarSucursales);//carga 7odas las sucursales

routerEstCont.get('/empleado/:id/sucursales', /*validarJWTAdmin,*/ cargar_sucursal_x_empleado);//en cuántas sucursales es7a un empleado

routerEstCont.get('/sucursal/:id/empleados', /*validarJWTAdmin,*/cargar_empleado_x_sucursal);//cuántos empleados tiene una sucursal pasando su id

routerEstCont.get('/resumenDdjc/:id', /*validarJWTAdmin,*/ cargar_un_resumenDdjc);//carga un rsuumen cabezera por id

routerEstCont.get('/resumenesDdjc', /*validarJWTAdmin,*/ cargar_resumenesDdjc);//carga los resumenes po cui7 de empresa

routerEstCont.get('/dec-DdjC', /*validarJWTAdmin,*/ cargar_Declaraciones_DdjC);//carga las declaraciones de un resumen cabezera

routerEstCont.get('/decl', /*validarJWTAdmin,*/ cargar_una_declaracion);//carga las declaraciones de un resumen cabezera

//routerEstCont.put('/cambiar-estado-empl', /*validarJWTAdmin,*/ cambiarRolUsuario);

//aclaras que se exporta todo lo trabajado con router
module.exports = routerEstCont;