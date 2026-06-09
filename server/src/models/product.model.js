import db from '../config/db.js'

const obtenerProductos = async () => {
    const {rows} = await db.query('SELECT * FROM productos ORDER BY id ASC')
    return rows
}

const obtenerProductoPorId = async (id) => {
    const {rows} = await db.query(`SELECT * FROM productos WHERE id = ${id}`)
    return rows
}

const añadirProductoADB = async (categoria,nombre,descripcion,codigo_barra,costo,venta,stockActual,stockMinimo,ventaAlPublico, fecha_de_vencimiento) => {
    const query = `
        INSERT INTO productos (
            id_categoria,
            nombre,
            descripcion,
            codigo_barras,
            precio_costo,
            precio_venta,
            stock_actual,
            stock_minimo,
            venta_al_publico,
            fecha_de_vencimiento
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
    `;

    const result = await db.query(query, [
        categoria,
        nombre,
        descripcion,
        codigo_barra,
        costo,
        venta,
        stockActual,
        stockMinimo,
        ventaAlPublico,
        fecha_de_vencimiento,
    ]);

    return result.rows[0];

}

const eliminarProductoEnDB = async (id) => {
        const result = await db.query(
        'DELETE FROM productos WHERE id = $1 RETURNING *',
        [id]
    );

}

const editarProductoEnDB = async (precio_costo,precio_venta,stock_actual,fecha_de_vencimiento) =>{

}

export default {obtenerProductoPorId, obtenerProductos, añadirProductoADB, eliminarProductoEnDB}

