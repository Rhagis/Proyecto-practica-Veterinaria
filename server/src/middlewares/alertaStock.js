//Archivo para generar alertas por bajo stock
import obtenerLotesVentas from '../models/ventas.model.js'

const verificarBajoStock = (id) => {
    const producto = obtenerLotesVentas(id)
    if (producto.stock < 10) {
        return 1
    }
    return 0
}

export default verificarBajoStock