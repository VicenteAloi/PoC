const express = require('express');
const morgan = require('morgan');
const router = require('../router/product.router.js');

const app = express();

app.use(morgan("dev"))

app.get('/', (req, res) => {
  res.send('This is Express');

});
app.use(express.json()) //middleware para poder leer las peticiones HTTP
app.use('/api/v1', router)
// app.use('/api/v1', router)

module.exports = app;