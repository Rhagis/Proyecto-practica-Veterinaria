import db from '../config/db.js'

const obtenerProductos = () => {
    const {rows} = db.query('SELECT * FROM productos')
}

const obtenerProductoPorId = (id) => {
    const {rows} = db.query('SELECT * FROM productos WHERE id=productos.id')
}

const añadirProductoADB = () => {

}

const eliminarProductoEnDB = () => {

}

export default obtenerProductoPorId, obtenerProductos, añadirProductoADB, eliminarProductoEnDB