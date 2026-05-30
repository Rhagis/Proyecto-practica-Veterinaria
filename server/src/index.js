import express from 'express';
import userRoutes from './routes/user.routes.js';

const app = express();
app.use(express.json());
app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
