const bcryptjs = require ('bcrypt')
const jwt = require("jsonwebtoken");
const Rol = require('../models/models/rol-model');
const Usuario = require('../models/models/Usuario-model');
const { Op } = require('sequelize');

 // Asegúrate de que la ruta sea correcta


const crearUsuario = async (req, res) => {

    const {nombreEC, email, password, rol } = req.body;

    try {
       //7rae 7odos los usuarios con ese nombre i email (por que son campos unicos en el modelo)
        const user = await Usuario.findOne({
            where: {
              [Op.or]: [
                { nombre: nombreEC },
                { email: email }
              ]
            }
          });

        //pregun7amos si exis7e en la DB
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: "un usuario ya existe con ese correo o ese nombre"
            })
        }

     // Busca el rol por nombre
     const roles = await Rol.findOne({ where: { nombre: rol} });// para sequalize

     //si el rol no exis7e no le deja crear (versi es necesari realmen7e)
     if (!roles) {
       return res.status(400).json({
         ok: false,
         msg: `El rol con nombre ${rol} no se encontró.`,
       });
     }
    
    //encriptacion de contraseñas
    const salt = bcryptjs.genSaltSync(10);
    const hashPassword = bcryptjs.hashSync(password, salt);

    // Crea el usuario ia en la DB
    const nuevoUsuario = await Usuario.create({//para sequalize
    nombre: nombreEC,
      email,
      password: hashPassword,
    });

    // Asigna el rol al usuario a través de la relación definida en el modelo Usuario
    await nuevoUsuario.setRoles([roles]);  
        

        //generar nuestro JWT
        //se lo genera en el back y se guardara en el front en el localstorage
        const payload = {
            id: nuevoUsuario.id,
            email: nuevoUsuario.email,
            
        };

        //7oken expira en 2 hs consul7ar despues
        const token = jwt.sign(payload, process.env.SECRET_JWT, {
            expiresIn: "2h",
        });
        //enviamos la respues7a
        res.status(201).json({
            ok: true,
            id: nuevoUsuario.id,
            nonmbre: nuevoUsuario.nombre,
            token,
            msg: 'el usuario se guardo correctamente',

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "por favor contactarse con  el administrador"
        })
    }
}

const loginUsuario = async (req, res) => {


    const { email, password } = req.body;

    try {

        
        let user = await Usuario.findOne({
            where: { email: email } // Utiliza el objeto where para especificar el filtro
        });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "email no valido"
            })
        }

        const validarpassword = bcryptjs.compareSync(password, user.password);

        if (!validarpassword) {
            return res.status(400).json({
                ok: false,
                msg: 'contraseña validas'
            });
        }

        if (user.estado != false) {
            return res.status(400).json({
                ok: false,
                msg: 'usted esta inhabilitado, contactese con el administrador'
            });
        } //inhabilil de momen7o para ver despues como lo manejamos por diferencias de modelo

        // Buscar roles del usuario
        
        const roles = await user.getRoles(); // Deja el alias "roles" en lugar de "getRoles"
        let rolname=roles.map(role => role.nombre);//mapeo los roles que 7iene en un arreglo rolname

        //generar nuestro JWT
        const payload = { //pueden cambiar los da7os despues
            id: user.id,
            email: user.email,
            rol: rolname[0], // agarro el primer rol de los roles que 7iene
        };

        const token = jwt.sign(payload, process.env.SECRET_JWT, {
            expiresIn: "2h",
        });

        res.status(200).json({
            ok: true,
            id: user.id,
            email: user.email,
            nombre: user.nombre,
            rol: rolname[0],// agarro el primer rol de los roles que 7iene
            token,
            msg: 'el usario se logueo',
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "por favor contactarse con el administrador"
        })
    }
}
/*
const validarCorreo = async (req, res) => {
    const { email } = req.body;

    try {

        let user = await Usuario.findOne({ email })

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "el email ingresado no esta registrado"
            })
        }

        res.status(200).json({
            ok: true,
            email: user.email,
            server_id: process.env.EMAIL_SERVICE_ID,
            template_id: process.env.TEMPLATE_ID,
            public_key: process.env.PUBLIC_KEY,
            msg: 'se valido el email',
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "por favor contactarse cono  el administrador"
        })
    }
};*/

/*
const RestablecerPassword = async (req, res) => {

    const { email, password } = req.body;

    try {

        let user = await Usuario.findOne({ email })

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "el correo electronico no es valido"
            })
        }

        //encriptacion de contraseñas
        const salt = bcryptjs.genSaltSync(10);
        user.password = bcryptjs.hashSync(password, salt);

        await user.save();

        res.status(200).json({
            ok: true,
            id: user._id,
            name: user.name,
            rol: user.rol,
            msg: 'ah cambiado su contraseña',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador',
        });
    }
};*/

module.exports = {
    crearUsuario,
    loginUsuario,
    //validarCorreo,
    //RestablecerPassword,
};