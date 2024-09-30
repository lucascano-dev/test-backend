const Usuario = require('../models/usuario-model');
const bcrypt = require('bcrypt');

const crearUsuario = async (req, res) => {
  const { nombre, apellido, email, domicilio, password, rol } = req.body;

  if (!nombre || !apellido || !email || !domicilio || !password) {
    return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
  }

  try {
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({ msg: 'El email de usuario ya existe' });
    }

    usuario = new Usuario(req.body);

    //encriptamos la contraseña
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    usuario.password = hash; //con esto modifico solo el dato de password que viene en el objeto usuario y le pongo el hash

    // Guardar el nuevo proyecto
    await usuario.save();

    res.status(201).json({ msg: 'Usuario registrado correctamente' });
  } catch (error) {
    res
      .status(500)
      .json({ msgError: `${error}`, msg: 'Hubo un error al crear el usuario. Contactarse con el administrador' });
  }
};

const loginUsuario = async (req, res) => {
  const { email, password } = req.body;
  console.log('MIS DATOS', email, password);

  if (!email || !password) {
    return res.status(400).json({ modal: 'error', msg: 'Todos los campos son obligatorios' });
  }

  //analizamos si el correo ingresado no esta registrado
  let usuario = await Usuario.findOne({ email });
  if (!usuario) {
    return res.status(400).json({ modal: 'error', msg: 'El usuario o contraseña son incorrectos' });
  }

  //validamos la contraseña
  const validPassword = bcrypt.compareSync(password, usuario.password);
  if (!validPassword) {
    return res.status(400).json({ modal: 'error', msg: 'El usuario o contraseña son incorrectos' });
  }

  //si todo sale bien
  res.status(200).json({ modal: 'success', msg: 'Usuario logueado correctamente' });
};

module.exports = { crearUsuario, loginUsuario };
