const express = require('express');
const path = require('path');
const app = express();

const productsRouter = require('./routes/products');
const productsApiRouter = require('./routes/api/products.js')

// el primer parámetro es un alias por defautl 'static' se va agregar a la ruta 
// donde se encuentran los assets cundo importe el css en el head del pug layout
app.use('/static', express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/products', productsRouter);
//
app.use("/api/products", productsApiRouter);

const server = app.listen(3000, () => {
  console.log(`Listen to port ${server.address().port} !!`)
})