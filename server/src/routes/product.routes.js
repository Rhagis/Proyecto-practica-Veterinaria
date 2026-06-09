import express from 'express'
import productController from '../controllers/product.controller.js'

const router = express.Router()

router.get('/', productController.listaProducto )
router.get('/product/:id', productController.productoPorId)
router.post('/product/add',productController.añadirProducto)


export default router