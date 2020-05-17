const express = require('express');
const path = require('path');
const app = express();
const bodyParse = require('body-parser');

const productsRouter = require('./routes/views/products');
const productsApiRouter = require('./routes/api/products');

// middlewares globales
app.use(bodyParse.json());

// Registrar middleware de archivos estaticos
app.use('/static', express.static(path.join(__dirname, 'public')));

// Configurar motor de plantillas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// // Registrar las rutas de la aplicación
app.use('/products', productsRouter);
app.use('/api/products', productsApiRouter);

// Redireccionar al Home del sitio
app.get('/', function(req, res){
  res.redirect('/products')
})

// Inicializar el servidor
const server = app.listen(3000, () => {
  console.log(`Listen to port ${server.address().port} !!`)
});
