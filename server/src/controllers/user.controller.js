import userModel from '../models/user.models.js'

const userLogin = async (req, res) => {
    try {
        const users = await userModel();
        const { username, password } = req.body;
        const user = users.find(u => u.usuario === username && u.password === password);
        if (user) {
            res.status(200).json({ message: 'Login successful', user });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

export default {
    userLogin
}