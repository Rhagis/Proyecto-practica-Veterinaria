//importaciones necesarias
import userController from '../controllers/user.controller.js'
import express from 'express'
const router = express.Router()


router.post('/login', userController.userLogin)

export default router