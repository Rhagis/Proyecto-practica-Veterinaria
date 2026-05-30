const express = require('express');
import routes from './routes/user.routes';
const app = express();


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(routes)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
