const Ddjj = require("../models/models/Ddjj-model");
const DdjjC = require("../models/models/DdjjC-model");
const Empleado = require("../models/models/Empleado-model");
const Empresa = require("../models/models/Empresa-model");
const Sucursal = require("../models/models/Sucursal-model");


//fal7a fron7 - al7a empresa
const AltaEmpresa = async (req, res) => {
    const { id_Esutdio_Conable ,cuit, razonsocial,nombrefantasia,telefono } = req.body;

    try {
        // Verifica si la empresa ya existe por cuit
        let empresaExistente = await Empresa.findOne({ where: { cuit } });

        if (empresaExistente) {
            return res.status(400).json({
                ok: false,
                msg: 'ya existe una empresa con ese cuit',
            });
        }

        // da de alta la nueva empresa
        const nuevaEmp = await Empresa.create({ id_Esutdio_Conable, cuit, razonsocial,nombrefantasia,telefono }); //o req.bodi creo que funcionaria igual
        
        let id_Empresa=nuevaEmp.id;
        
        let Sucu = await Sucursal.findOne({ where: { id_Empresa } });//es7a mal plan7eado, si me doi de al7a como emp nueva nunca habra una sucursal

        if (!Sucu) {
            let id_localidad=2;//cambiar luego por id de loclidad
            let id_Sindicato=0;//por defec7o i hacer que el usuario con7 seleccione el sindica7o luego
           // AltaCasaCen(id_Empresa,nuevaEmp.nombrefantasia,id_Sindicato,id_localidad);
            res.status(201).json({
                ok: true,
                id: id_Empresa,
                nombre: nuevaEmp.nombrefantasia,
                id_localidad: id_localidad,
                msg: 'se  debe dear de alta la sucursal central',
            });
        }else{
            //ver de agregar un me7odo que cargue da7os como sucursal-cen7ral au7oma7icamen7e si no 7iene ninguna
        res.status(201).json({
            ok: true,
            id: nuevaEmp.id,
            nombre: nuevaEmp.nombrefantasia,
            estado: nuevaEmp.telefono,
            msg: 'se ah dado de alta una nueva empresa',
        });

        }
        
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor, contactarse con el administrador.',
        });
    }
};

//al7a casa cen7ral
const AltaCasaCen = async (id_Empresa, nombre, id_Sindicato,id_localidad) => {
    try {

         // da de alta la nueva empresa
         const nuevaSuc = await Sucursal.create({id_Empresa,nombre,id_Sindicato,id_localidad}); //o req.bodi creo que funcionaria igual

      
    } catch (error) {
      console.log(error);
      return false
    }
  };

//fal7a fron7 - al7a empresa
const AltaSucursal = async (req, res) => {
    const { id_Empresa, nombre,id_Sindicato,id_localidad } = req.body;

    try {
        // Verifica si la sucursal exis7e por nombre i localidad
        let sucursalExistente = await Sucursal.findOne({ where: { nombre,id_localidad } });

        if (sucursalExistente) {
            return res.status(400).json({
                ok: false,
                msg: 'la sucursal ya existe',
            });
        }

        // da de alta la nueva sucursal
        const nuevaSuc = await Sucursal.create(req.body); //o req.bodi creo que funcionaria igual

        res.status(201).json({
            ok: true,
            id: nuevaSuc.id,
            nombre: nuevaSuc.nombre,
            estado: nuevaSuc.id_localidad,
            msg: 'se ah dado de alta una nueva sucursal',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor, contactarse con el administrador.',
        });
    }
};

//fal7a fron7 - al7a empresa
const AltaEmpleado = async (req, res) => {
    const { dni, cuil,nombre,apellido,sucuId } = req.body;

    try {
        // Verifica si la empresa ya existe por cuit
        let empleadoExistente = await Empleado.findOne({ where: { dni } });

        if (empleadoExistente) {

            // Verifica si el empleado ya está asociado a la sucursal
            const existentEnSuc = await empleadoExistente.hasSucursales(sucuId);
            

            if (!existentEnSuc) {
                // Asigna la sucursal al empleado si no está asociado
                const nuevaSuc = await Sucursal.findByPk(sucuId);
                await empleadoExistente.addSucursales(nuevaSuc);

                return res.status(200).json({
                    ok: true,
                    msg: 'El empleado ya existe y se le ha asignado  a la nueva sucursal.',
                });
            }else{
                return res.status(400).json({
                    ok: false,
                    msg: 'el empleado ya existe en la sucursal',
                });

            }

            
        }

        

    // Encuentra la sucursal a la cual per7ence el empleado el empleado
      const nuevaSuc = await Sucursal.findByPk(sucuId);
  
      if (!nuevaSuc) {
        return res.status(404).json({
          ok: false,
          msg: "sucursal no encontrada",
        });
      }

      // da de alta la nueva empresa
      const nuevoEmp = await Empleado.create(req.body); //o req.bodi creo que funcionaria igual
  
      // Asigna el nuevo rol al usuario usando la relación muchos a muchos
      await nuevoEmp.addSucursales([nuevaSuc]);
      
      res.status(200).json({
        ok: true,
        id: nuevoEmp.id,
        nombre: nuevoEmp.nombre,
        msg: `sucusal ${nuevaSuc.nombre} se le a asignado el nuevo empleado ${nuevoEmp.nombre} y se ah dado de alta `,
      });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor, contactarse con el administrador.',
        });
    }
};

//fal7a fron7
const cargar_una_Sucursal = async (req, res) => {

    try {

        // Supongamos que tenemos el ID del usuario

        let emp = await Sucursal.findByPk(req.params.id); // Utiliza findByPk para buscar una empresa por su ID

    if (emp) {
        res.status(200).json({
            ok: true,
            msg: "Sucursal cargada",
            emp,

        });
    } else {
      res.status(404).json({
        ok: false,
        msg: 'Sucursal no encontrada',
      });
    }

    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "contactese con el administrador",
        })
    }
};

//cargar es mos7rar

//fal7a fron7
const cargarSucursales = async (req, res) => {

    try {

        //carga 7odos los usuarios
        const sucursales = await Sucursal.findAll();

        res.status(200).json({
            ok: true,
            msg: "Sucursales cargadas",
            sucursales,

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "contactese con el administrador",
        })
    }
};

//fal7a fron7
const cargarSucursales_x_empresa = async (req, res) => { //carga las empresas de un id 

    try {

        const empresaId = req.params.id; // Suponiendo que el ID del usuario está en req.params

        // Realiza una consulta para obtener todas las sucursales relacionadas con ese ID de empresa
        const sucursales = await Sucursal.findAll({
            where: {
                id_Empresa: empresaId, // Suponiendo que "empresaId" es la columna que relaciona las sucursales con los empresas
            },
        });

        if (sucursales.length === 0) {
            res.status(400).json({
                ok: false,
                msg: "No hay sucursales disponibles, diríjase a Menu para dar de alta su sucursal central",
            });

        }else{
            res.status(200).json({
                ok: true,
                msg: "Sucursales cargadas",
                sucursales,
    
            });

        }

        

        //hacer un me7odo que ordene i agrupe las sucursales por sindica7o o id de sindica7o para mandarlos al fron7 i mos7rar

        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "contactese con el administrador",
        })
    }
};


//fal7a fron7
const cargar_una_Empresa = async (req, res) => {

    try {

        // Supongamos que tenemos el ID del usuario

        let emp = await Empresa.findByPk(req.params.id); // Utiliza findByPk para buscar una empresa por su ID

    if (emp) {
        res.status(200).json({
            ok: true,
            msg: "Empresa cargada",
            emp,

        });
    } else {
      res.status(404).json({
        ok: false,
        msg: 'empresa no encontrada',
      });
    }

    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "contactese con el administrador",
        })
    }
};

//fal7a fron7
const cargarEmpresas = async (req, res) => { //carga las empresas de un id 

    try {

        const usuarioId = req.params.id; // Suponiendo que el ID del usuario está en req.params

        // Realiza una consulta para obtener todas las empresas relacionadas con ese ID de usuario
        const empresas = await Empresa.findAll({
            where: {
                id_Esutdio_Conable: usuarioId, // Suponiendo que "usuarioId" es la columna que relaciona las empresas con los usuarios
            },
        });

        res.status(200).json({
            ok: true,
            msg: "Sucursales cargadas",
            empresas,

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "contactese con el administrador",
        })
    }
};

//fal7a fron7
const cargar_sucursal_x_empleado = async (req, res) => {//en cuántas sucursales trabaja un empleado

    
    try {

        const empleado = await Empleado.findByPk(req.params.id, {
            include:'sucursales', // Carga la relación de roles con el nombre del alias de la relacion echa en el usuario-model
          });
      
          if (!empleado) {
            return res.status(404).json({
                ok: false,
                 msg: 'empleado no encontrado' 
                });
          }
      
          // La propiedad "Roles" contendrá un array de los roles relacionados con el usuario
          const cantidadDeSucursales = empleado.sucursales.length;

          // Mapea los nombres de los roles en un array
    const nombresDeSucursales = empleado.sucursales.map(Sucursal => Sucursal.nombre);
      
          res.status(200).json({

            ok: true,
            msg: "Sucursales del empleado",
            cantidadDeSucursales,
            nombresDeSucursales 
            });

    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "contactese con el administrador",
        })
    }
};

//fal7a fron7
const cargar_empleado_x_sucursal = async (req, res) => {//empleados por sucursal

    
    try {

        const sucursalId = req.params.id; // ID de la sucursal que quieres consultar

        let suc = await Sucursal.findByPk(sucursalId); // Utiliza findByPk para buscar una esucursal por su ID

        if (!suc) {
            res.status(200).json({
                ok: false,
                msg: "Sucursal no encon7rada",
                
    
            });
        } else{
            // Consulta para obtener los empleados asociados a una sucursal específica
    const empleados = await Empleado.findAll({
        include: [
          {
            model: Sucursal,
            as:'sucursales',
            where: { id: sucursalId }, // Filtra por la sucursal específica
          },
        ],
      });
  
      //const cantidadEmpleados =empleados.length;
  /*
      const empleadoss = empleados.map((empleado) => {//re7ornamos a la variable los da7os que se desean
        return {
            empleado
          //nombre: empleado.nombre,
          //apellido: empleado.apellido,
        };
      }); */
        
            res.status(200).json({
  
              ok: true,
              msg: `Empleados en la sucursal con ID ${sucursalId}:`,
             //cantidadEmpleados,
             //nombresYApellidos 
             empleados //pasare el arreglo en7ero de empleados
              });

        }

    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "contactese con el administrador",
        })
    }
};

//debe recibir un arreglode obje7os empleados con 7oda la info desde el fron7 i 7ambn la info del resumen o cabezera
const GuardarDeclaracionJurada = async (req, res) => {
    
    try {
        const { periodo,cuit,fechapresentacion,fechapago,fechaprocesamiento,fechabaja,totaldescley,totaldescvolunt } = req.body;

        const { ddjjC } = req.body;//recibo lo mismo de arriba pero en un obje7o

        const datosEmpleados = req.body.empleados; // datosEmpleados es un arreglo de objetos, cada uno representa un empleado

        const cabezera= await DdjjC.create(ddjjC);
        
        // Itera a través de los datos de los empleados y crea una declaración jurada para cada uno
        const declaracionesJuradas = await Promise.all(datosEmpleados.map(async (empleado) => {
            //falan calculos i algunos elemen7os i ver que hacer con la cabezera
            const nuevaDdjj = await Ddjj.create({
                id_cabezera:cabezera.id,
                periodo: empleado.periodo,
                cuit: empleado.cuit,
                cuil_empleado: empleado.cuil_empleado,
                sueldo: empleado.sueldo,
                acuerdo: empleado.acuerdo,
                descley: empleado.descley,
                descvolunt: empleado.descvolunt,
                rectificacion: empleado.rectificacion,
                cargafamiliar: empleado.cargafamiliar,
                jubilado: empleado.jubilado,
                estado: empleado.estado,
                fechabaja: empleado.fechabaja
            });

            return nuevaDdjj;
        }));

        res.status(200).json({
            ok: true,
            msg: 'Declaraciones Juradas guardadas con éxito',
            ddjj: declaracionesJuradas
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor, contactarse con el administrador.',
        });
    }
};

//fal7a fron7
const cargar_un_resumenDdjc = async (req, res) => {

    try {

        // Supongamos que tenemos el ID del usuario

        let emp = await DdjjC.findByPk(req.params.id); // Utiliza findByPk para buscar una empresa por su ID

    if (emp) {
        res.status(200).json({
            ok: true,
            msg: "resumen cargado",
            emp,

        });
    } else {
      res.status(404).json({
        ok: false,
        msg: 'Sucursal no encontrada',
      });
    }

    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "contactese con el administrador",
        })
    }
};

//fal7a fron7
const cargar_resumenesDdjc = async (req, res) => {

    try {
        const { cuit } = req.body;


        // Supongamos que tenemos el ID del usuario

        const emp = await DdjjC.findAll({
            where: { cuit: cuit }
          });

    if (emp) {
        res.status(200).json({
            ok: true,
            msg: "resumenes cargados",
            emp,

        });
    } else {
      res.status(404).json({
        ok: false,
        msg: 'resumenes no encontrados',
      });
    }

    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "contactese con el administrador",
        })
    }
};

//fal7a fron7
const cargar_Declaraciones_DdjC = async (req, res) => {//carga 7odas las declaraciones de un resumen cabezera

    try {
        const { id_cabezera } = req.body;


        //tenemos el ID de DdjC

        const emp = await Ddjj.findAll({
            where: { id_cabezera: id_cabezera  }
          });

    if (emp) {
        res.status(200).json({
            ok: true,
            msg: "declaraciones cargadas",
            emp,

        });
    } else {
      res.status(404).json({
        ok: false,
        msg: 'declaraciones no encontradas',
      });
    }

    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "contactese con el administrador",
        })
    }
};

const cargar_una_declaracion = async (req, res) => {

    try {
        

        // Supongamos que tenemos el ID del usuario

        let emp = await Ddjj.findByPk(req.body.id); // Utiliza findByPk para buscar una declaracion por su ID

    if (emp) {
        res.status(200).json({
            ok: true,
            msg: "Empresa cargada",
            emp,

        });
    } else {
      res.status(404).json({
        ok: false,
        msg: 'empresa no encontrada',
      });
    }

    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "contactese con el administrador",
        })
    }
};

//fal7a fron7
const cargar_usuario_x_rol = async (req, res) => {//cuántos usuarios tienen un mismo rol

    const rolId = req.params.id; // Supongo que estás pasando el ID del rol en los parámetros de la solicitud

    
    try {

        
    const usuarios = await Usuario.findAll({
      include: [
        {
          model: Rol, // Modelo de la relación (Rol)
          as: 'roles', // Alias de la relación en Usuario
          where: { id: rolId }, // Condición para filtrar por ID de rol
        },
      ],
    });

    if (!usuarios || usuarios.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: 'No se encontraron usuarios con este rol.',
      });
    }
      
    // La propiedad "roles" contendrá un array de los usuarios relacionados con el rol    
    const cantidadDeUsuarios = usuarios.length;

    // Mapea los nombres de los usuarios en un array
    const nombresDeUsuarios = usuarios.map((usuario) => usuario.nombre);
      
          res.status(200).json({

            ok: true,
            msg: "usuarios con ese rol",
            cantidadDeUsuarios,//devuelve solo la can7idad
            nombresDeUsuarios, //devuelve solo los nombres
            usuarios//devuelve 7odo el obje7o
            });

    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "contactese con el administrador",
        })
    }
};

const editarUsuario = async (req, res) => {
    //aqui va la logica de editar producto

    try {

        let usuario = await Usuario.findByPk(req.body.id); // Utiliza findByPk para buscar un usuario por su ID

        if (!usuario) {
            res.status(404).json({
                ok: false,
                msg: "No existe ningun usuario con este Id",
                usuario,
            });
        }


        
        await usuario.update(req.body);//edi7a con 7odo el bodi es decir 7odos los campos de la 7abla


        res.status(200).json({
            ok: true,
            msg: 'usuario editado',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador',
        });
    }
};

const cambiarRolUsuario = async (req, res) => {
    try {
      const { userId, newRoleId } = req.body; // envías el ID del usuario y el ID del nuevo rol en la solicitud con esos nombres de variables userId, newRoleId
  
      // Encuentra el usuario por su ID
      const usuario = await Usuario.findByPk(userId);
  
      if (!usuario) {
        return res.status(404).json({
          ok: false,
          msg: 'Usuario no encontrado',
        });
      }
  
      // Encuentra el nuevo rol por su ID
      const nuevoRol = await Rol.findByPk(newRoleId);
  
      if (!nuevoRol) {
        return res.status(404).json({
          ok: false,
          msg: 'Nuevo rol no encontrado',
        });
      }
  
      // Actualiza la relación de roles para el usuario
      await usuario.setRoles([nuevoRol]);
  
      res.status(200).json({
        ok: true,
        msg: 'Rol del usuario actualizado correctamente',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Error al cambiar el rol del usuario. Contacta al administrador',
      });
    }
};
  
const asignarNuevoRol = async (req, res) => {
    const { userId, newRoleId } = req.body; // envías el ID del usuario y el ID del nuevo rol en la solicitud con esos nombres de variables userId, newRoleId
  
    try {
      // Encuentra el usuario por su ID
      const usuario = await Usuario.findByPk(userId);
  
      if (!usuario) {
        return res.status(404).json({
          ok: false,
          msg: "Usuario no encontrado",
        });
      }
  
      // Encuentra el nuevo rol por su ID
      const nuevoRol = await Rol.findByPk(newRoleId);
  
      if (!nuevoRol) {
        return res.status(404).json({
          ok: false,
          msg: "Rol no encontrado",
        });
      }
  
      // Asigna el nuevo rol al usuario usando la relación muchos a muchos
      await usuario.addRoles(nuevoRol);
  
      res.status(200).json({
        ok: true,
        msg: `Rol ${nuevoRol.nombre} asignado al usuario ${usuario.nombre}`,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Error al asignar el rol al usuario",
      });
    }
};

const eliminarRolDeUsuario = async (req, res) => {
    try {
      const usId = req.params.usId; // ID del usuario
      const rolId = req.params.rolId; // ID del rol que deseas eliminar
  
      // Encuentra el usuario por su ID
      const usuario = await Usuario.findByPk(usId);
  
      if (!usuario) {
        return res.status(404).json({
          ok: false,
          msg: 'Usuario no encontrado',
        });
      }
  
      // Encuentra el rol por su ID
      const rol = await Rol.findByPk(rolId);
  
      if (!rol) {
        return res.status(404).json({
          ok: false,
          msg: 'Rol no encontrado',
        });
      }
  
      // Utiliza el método removeRole para eliminar el rol del usuario
      await usuario.removeRoles(rol);
  
      res.status(200).json({
        ok: true,
        msg: 'Rol eliminado del usuario',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Error al eliminar el rol del usuario',
      });
    }
  };
  
/*
const eliminarProducto = async (req, res) => {

    //aqui va la logica de eliminar producto

    try {
        const productoEliminar = await Producto.findById(req.params.id);

        if (!productoEliminar) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un producto con este ID',
            });
        }

        await Producto.findByIdAndDelete(req.params.id);

        res.status(200).json({
            ok: true,
            msg: 'Producto Eliminado',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador',
        });
    }
};
*/

/*
const confirmarPedido = async (req, res) => {
    try {
        const pedidoConfirmar = await Pedido.findById(req.body._id);

        if (!pedidoConfirmar) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun Producto con este Id',
            });
        }

        pedidoConfirmar.estado = 'Realizado';

        await pedidoConfirmar.save();

        res.status(200).json({
            ok: true,
            msg: 'pedido confirmado',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador',
        });
    }
};
*/

/*
const inhabilitarUsuario = async (req, res) => {

    try {
        const usuarioInactivo = await Usuario.findById(req.body._id);

        if (!usuarioInactivo) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun usuario con este Id',
            });
        }

        usuarioInactivo.estado = 'Inactivo';

        await usuarioInactivo.save();

        res.status(200).json({
            ok: true,
            msg: 'usuario deshabilitado',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador',
        });
    }
};
*/

/*
const cargarProducto = async (req, res) => {

    try {

        //el find sirve para recorrer en la base de dato todos los productos llevandose des esquema importado
        const productos = await Producto.find();

        res.status(200).json({
            ok: true,
            msg: "productos cargados",
            productos,

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "contactese con el administrador",
        })
    }

};
*/

/*
const cargarProducto_Aleatorio = async (req, res) => {

    try {

        //el find sirve para recorrer en la base de dato todos los productos llevandose des esquema importado
        const productos = await Producto.aggregate([{ $sample: { size: 3 } }]);

        res.status(200).json({
            ok: true,
            msg: "productos cargados",
            productos,

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "contactese con el administrador",
        })
    }
};
*/



/*
const cargarPedidos = async (req, res) => {

    try {

        //el find sirve para recorrer en la base de dato todos los productos llevandose des esquema importado
        const pedidos = await Pedido.find();

        res.status(200).json({
            ok: true,
            msg: "pedidos cargados",
            pedidos,

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "contactese con el administrador",
        })
    }

};
*/

module.exports = {
    
    AltaEmpresa,
    AltaSucursal,
    cargar_una_Sucursal,
    cargarSucursales,
    AltaEmpleado,
    GuardarDeclaracionJurada,
    cargar_un_resumenDdjc,
    cargar_resumenesDdjc,
    cargar_Declaraciones_DdjC,
    cargar_una_declaracion,
    cargarSucursales_x_empresa,
    //editarUsuario,
    //asignarNuevoRol,
    //eliminarProducto,
    //cargarProducto,
    //cambiarRolUsuario,
    //cargarUsuarios,
    cargar_una_Empresa,
    cargarEmpresas,
    cargar_sucursal_x_empleado,
    cargar_empleado_x_sucursal,
    //eliminarRolDeUsuario
    //cargarPedidos,
    //confirmarPedido,
    //inhabilitarUsuario,
    //cargarProducto_Aleatorio
};