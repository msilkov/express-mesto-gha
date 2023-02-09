const app = require('./app');
const { cors } = require('./middlewares/cors');

const { PORT = 3000 } = process.env;

app.use(cors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
