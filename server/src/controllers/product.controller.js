import productModel from "../models/product.model.js";

const añadirProducto = () => {
    

}

const editarProducto = () => {

}

const eliminarProducto = () => {

}

const listaProducto = async (req,res) => {
    const datos = await productModel.obtenerProductos()
    if(datos.length < 1){
        res.status(401).json({message:"no existen datos"})
    }
    res.status(200).json(datos,{message:'datos obtenidos con exito'})
}

const productoPorId = async (req, res) => {
    const {id} = req.params
    const datos = await productModel.obtenerProductoPorId(id)
    console.log(datos)
    if(datos.length < 1){
        res.status(401).json({message: "no existen datos con esa id"})
    }
    res.status(200).json(datos,{message: 'Producto obtenido exitosamente'})
} 

export default {listaProducto,
                productoPorId,
                eliminarProducto,
                editarProducto,
                añadirProducto
}