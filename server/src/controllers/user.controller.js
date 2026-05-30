//importaciones necesarias
import userModel from '../models/user.models.js'


const userLogin = (req, res) => {
    const { username, contraseña } = req.body
    const users = userModel()
    if (!username || !contraseña) {
        return res.status(400).json({ message: 'Faltan campos obligatorios' })
    }
    const user = users.find(user => user.username === username && user.contraseña === contraseña)
    if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' })
    }
    res.status(200).json({ message: 'Logeado correctamente'})
}


export default {
  userLogin
}