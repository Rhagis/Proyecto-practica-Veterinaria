import userModel from '../models/user.models.js'
import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET;

const userLogin = async (req, res) => {
    try {
        const { usuario, password } = req.body;
        if (!usuario || !password) {
            return res.status(400).json({
                message: 'Username and password are required'
            });
        }

        const users = await userModel();

        const user = users.find(u => u.usuario === usuario && u.password_hash === password);
        if (user) {
            const token = jwt.sign({ id: user.id, usuario: user.usuario, rol: user.rol }, JWT_SECRET, { expiresIn: '1d' });
            res.cookie("token", token, {
                httpOnly: true,
                secure: false, // Cambia a true en producción
                sameSite: "lax",
                maxAge: 24 * 60 * 60 * 1000 // 1 día
            });
            res.status(200).json({ message: 'Logueado Correctamente', user: { id: user.id, usuario: user.usuario, rol: user.rol } });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error("Error en userLogin:", error);

        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
}

const comprobarUsuario = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.status(200).json({ valid:true, message: 'Token válido', user: decoded });
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
    
};

const cerrarSesion = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false, // Cambia a true en producción
        sameSite: "lax"
    });
    return res.status(200).json({ message: 'Sesión cerrada correctamente' });
};

export default {
    userLogin,
    comprobarUsuario,
    cerrarSesion
}