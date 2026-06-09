import {obtenerProductos, obtenerProductoPorId, añadirProductoADB, eliminarProductoEnDB} from "../models/product.model";

const añadirProducto = () => {

}

const editarProducto = () => {

}

const eliminarProducto = () => {

}

const listaProducto = () => {
    return obtenerProductos()
}

const productoPorId = (req, res) => {
    const {id} = req.params
    const datos = obtenerProductoPorId(id)
    return datos
} 