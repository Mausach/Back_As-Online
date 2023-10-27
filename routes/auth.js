const express = require('express');
const {  loginUsuario , /*, validarCorreo, RestablecerPassword*/ 
crearUsuario} = require('../controllers/auth');

const { check } = require('express-validator');
const { validarCampos } = require('../Midelwares/ValidarCampos');
//const { validarJWTAdmin } = require('../Midelwares/validarJwtAdmin');
const routerAuth = express.Router();

 //auth de autenticacion en general para todos


 routerAuth.post('/new', [// para nuevo US 
  
  check("email", "el email es obligatorio").not().isEmpty(),
  check("password", "la pasword debe ser de minimo 5").isLength({
      min: 5,
  }),
  check("rol", "el rol es obligatorio").not().isEmpty(),
  validarCampos
], crearUsuario);


//para logear usuario
routerAuth.post('/login',
  [ //cuando usamos varios midelwar van dentro de corchetes verifican que los campos existan y despues va recien el validar

      check("email", "el email es obligatorio").not().isEmpty(),
      check("password", "la pasword es obligatoria").not().isEmpty(),
      validarCampos

  ], loginUsuario);

/*
//para enviar email
routerAuth.post('/validar_email',
  [ //cuando usamos varios midelwar van dentro de corchetes verifican que los campos existan y despues va recien el validar

      check("email", "el email es obligatorio").not().isEmpty(),
      validarCampos

  ], validarCorreo);

//para restablecer la contraseña
routerAuth.put('/Restablecer', [

  check("email", "el email es obligatorio").not().isEmpty(),
  check("password", "la pasword es obligatoria").not().isEmpty(),
  validarCampos

], RestablecerPassword);
*/

module.exports = routerAuth;