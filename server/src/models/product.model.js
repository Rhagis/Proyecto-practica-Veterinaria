import db from '../config/db.js'

const obtenerProductos = () => {
    const {rows} = db.query('SELECT * FROM productos')
    return rows
}

const obtenerProductoPorId = (id) => {
    const {rows} = db.query(`SELECT * FROM productos WHERE ${id} =productos.id`)
    return rows
}

const añadirProductoADB = (nombre,descripcion,costo,venta,stockActual,stockMinimo,ventaAlPublico) => {
    const query = `
        INSERT INTO productos (
            nombre,
            descripcion,
            precio_costo,
            precio_venta,
            stock_actual,
            stock_minimo,
            venta_al_publico,
            fecha_ingreso
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
    `;

    const result = await db.query(query, [
        nombre,
        descripcion,
        costo,
        venta,
        stockActual,
        stockMinimo,
        ventaAlPublico
    ]);

    return result.rows[0];

}

const eliminarProductoEnDB = (id) => {
        const result = await db.query(
        'DELETE FROM productos WHERE id = $1 RETURNING *',
        [id]
    );

}

export default {obtenerProductoPorId, obtenerProductos, añadirProductoADB, eliminarProductoEnDB}

