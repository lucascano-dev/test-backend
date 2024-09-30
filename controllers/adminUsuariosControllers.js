const Usuario = require('../models/usuario-model');
const bcrypt = require('bcrypt');

const listaUsuarios = async (req, res) => {
  const listaUsuarios = await Usuario.find();

  try {
    // Excluir la propiedad "password" de cada usuario
    const usuariosSinPassword = listaUsuarios.map((usuario) => {
      const { password, ...usuarioSinPassword } = usuario._doc; // _doc se usa porque Mongoose incluye los datos en ese objeto
      return usuarioSinPassword;
    });
    res.status(200).json({ todos_los_usuarios: usuariosSinPassword });
  } catch (error) {
    res.status(500).json({ msg: 'Hubo un error al obtener los usuarios. Contactarse con el administrador' });
  }
};

const editarUsuario = async (req, res) => {
  try {
    const usuarioEditar = await Usuario.findById(req.body._id);

    if (!usuarioEditar) {
      return res.status(404).json({ msg: 'El usuario no existe' });
    }

    // Transformar la propiedad nombre a mayúsculas
    const nombreMayusculas = req.body.nombre.toUpperCase();
    const apellidoMayusculas = req.body.apellido.toUpperCase();
    req.body.nombre = nombreMayusculas;
    req.body.apellido = apellidoMayusculas;

    // Actualizar el proyecto
    await Usuario.findByIdAndUpdate(req.body._id, req.body);
    res.status(200).json({ msg: `El usuario '${usuarioEditar.nombre} ${usuarioEditar.apellido}	' ha sido actualizado` });
  } catch (error) {
    res
      .status(500)
      .json({ msg: 'Hubo un error al editar el usuario. Contactarse con el administrador', msgError: error });
    console.log(error);
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const usuarioEliminar = await Usuario.findById(req.params.id); // Buscar el producto por su ID: id es el nombre del comodin que definimos en adminRouter :id
    // console.log(productoEliminar)

    if (!usuarioEliminar) {
      //si es null
      return res.status(404).json({ msg: 'El usuario no existe' });
    }

    await Usuario.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: `El usuario '${usuarioEliminar.nombre}' ha sido eliminado` });
  } catch (error) {
    res
      .status(500)
      .json({ msg: 'Hubo un error al eliminar el usuario. Contactarse con el administrador', msgError: `${error}` });
  }
};

module.exports = { listaUsuarios, editarUsuario, eliminarUsuario };
