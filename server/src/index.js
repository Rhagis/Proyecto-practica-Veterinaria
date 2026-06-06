import express from 'express';
// import routes from './routes/user.routes.js'; // Tu compañero deberá usar el .js al final
import db from './config/db.js'; // <-- ¡Acá el .js al final es obligatorio!
import userRoutes from './routes/user.routes.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/users', userRoutes);




const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${PORT}`);
});