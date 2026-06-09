import db from '../config/db.js'

const obtenerProductos = async () => {
    const {rows} = await db.query('SELECT * FROM productos ORDER BY id ASC')
    return rows
}

const obtenerProductoPorId = async (id) => {
    const {rows} = await db.query(`SELECT * FROM productos WHERE id = ${id}`)
    return rows
}

const añadirProductoADB = async (categoria,nombre,descripcion,costo,venta,stockActual,stockMinimo,ventaAlPublico) => {
    const query = `
        INSERT INTO productos (
            id_categoria,
            nombre,
            descripcion,
            precio_costo,
            precio_venta,
            stock_actual,
            stock_minimo,
            venta_al_publico
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
    `;

    const result = await db.query(query, [
        categoria,
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

const eliminarProductoEnDB = async (id) => {
        const result = await db.query(
        'DELETE FROM productos WHERE id = $1 RETURNING *',
        [id]
    );

}

export default {obtenerProductoPorId, obtenerProductos, añadirProductoADB, eliminarProductoEnDB}

