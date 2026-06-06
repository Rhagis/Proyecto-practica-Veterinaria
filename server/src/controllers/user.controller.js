import userModel from '../models/user.models.js'

const userLogin = async (req, res) => {
    try {
        
        const { usuario, password } = req.body;
        if (!usuario || !password) {
            return res.status(400).json({
                message: 'Username and password are required'
            });
        }
        const users = await userModel();
        const user = users.find(u => u.usuario === usuario && u.password === password);
        if (user) {
            res.status(200).json({ message: 'Login successful'});
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    }catch (error) {
    console.error("Error en userLogin:", error);

    res.status(500).json({
        message: 'Server error',
        error: error.message
    });
}
}

export default {
    userLogin
}