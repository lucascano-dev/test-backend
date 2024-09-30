const express = require('express');
const {
  listaProductos,
  crearProducto,
  eliminarProducto,
  editarProducto,
} = require('../controllers/adminProductosControllers');

const { listaUsuarios, editarUsuario, eliminarUsuario } = require('../controllers/adminUsuariosControllers');

const routerAdmin = express.Router();

//Admin Productos
routerAdmin.get('/listaProductos', listaProductos);
routerAdmin.post('/crearProducto', crearProducto);
routerAdmin.put('/editarProducto', editarProducto);
routerAdmin.delete('/eliminarProducto/:id', eliminarProducto);

//Admnin Usuarios
routerAdmin.get('/listaUsuarios', listaUsuarios);
routerAdmin.put('/editarUsuario', editarUsuario);
routerAdmin.delete('/eliminarUsuario/:id', eliminarUsuario);

module.exports = routerAdmin;
