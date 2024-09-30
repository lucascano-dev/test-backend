const Producto = require('../models/producto-model');

const listaProductos = async (req, res) => {
  const listaProductos = await Producto.find();

  try {
    res.status(200).json({ todos_los_productos: listaProductos });
  } catch (error) {
    res.status(500).json({ msg: 'Hubo un error al obtener los productos. Contactarse con el administrador' });
  }
};

const crearProducto = async (req, res) => {
  const { codigo, nombre, precio, descripcion, categoria, stock } = req.body;

  if (!codigo || !nombre || !precio || !descripcion || !categoria || !stock) {
    return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
  }

  try {
    let producto = await Producto.findOne({ codigo });
    if (producto) {
      return res.status(400).json({ msg: 'El código del producto ya existe' });
    }

    // Transformar la propiedad nombre a mayúsculas
    const nombreMayusculas = nombre.toUpperCase();

    // Crear el producto con el nombre en mayúsculas
    // const nuevoProducto = new Producto({
    //   codigo,
    //   nombre: nombreMayusculas,
    //   precio,
    //   descripcion,
    //   categoria,
    //   stock
    // });

    const nuevoProducto = new Producto({
      ...req.body,
      nombre: nombreMayusculas,
    });

    // Guardar el nuevo proyecto
    await nuevoProducto.save();

    res.status(201).json({ msg: 'Producto creado' });
  } catch (error) {
    res.status(500).json({ msg: 'Hubo un error al crear producto. Contactarse con el administrador' });
  }
};

const eliminarProducto = async (req, res) => {
  try {
    // const  productoEliminar = await Producto.findByIdAndDelete(req.params.id);
    const productoEliminar = await Producto.findById(req.params.id); // Buscar el producto por su ID: id es el nombre del comodin que definimos en adminRouter :id
    // console.log(productoEliminar)

    if (!productoEliminar) {
      //si es null
      return res.status(404).json({ msg: 'El producto no existe' });
    }

    await Producto.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: `El producto '${productoEliminar.nombre}' ha sido eliminado` });
  } catch (error) {
    res
      .status(500)
      .json({ msg: 'Hubo un error al eliminar el producto. Contactarse con el administrador', msgError: error });
  }
};

const editarProducto = async (req, res) => {
  try {
    const productoEditar = await Producto.findById(req.body._id);

    if (!productoEditar) {
      return res.status(404).json({ msg: 'El proyecto no existe' });
    }

    // Transformar la propiedad nombre a mayúsculas
    const nombreMayusculas = req.body.nombre.toUpperCase();
    req.body.nombre = nombreMayusculas;

    // Actualizar el proyecto
    await Producto.findByIdAndUpdate(req.body._id, req.body);
    res.status(200).json({ msg: `El producto '${productoEditar.nombre}' ha sido actualizado` });
  } catch (error) {
    res
      .status(500)
      .json({ msg: 'Hubo un error al editar el producto. Contactarse con el administrador', msgError: error });
  }
};

module.exports = { crearProducto, listaProductos, eliminarProducto, editarProducto };
