
import db from '../config/db.js';

const userModel = async () => {
    const { rows } = await db.query('SELECT * FROM usuarios');
    return rows;
}


export default userModel