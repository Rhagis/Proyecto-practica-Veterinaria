import fs from 'fs';
import PATH from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = PATH.dirname(__filename);
const ubicacionDatos = PATH.join(__dirname, '../data/datosPrueba.json');
const datos = fs.readFileSync(ubicacionDatos, 'utf-8');
const datosParseados = JSON.parse(datos);

const userModel = () => {
    return datosParseados.usuarios
}


export default userModel