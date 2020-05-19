const express = require('express');
const path = require('path');
const boom = require('@hapi/boom');
const bodyParse = require('body-parser');

const app = express();

const productsRouter = require('./routes/views/products');
const productsApiRouter = require('./routes/api/products');
const authApiRouter = require('./routes/api/auth');

const {
  logErrors,
  clientErrorHandler,
  wrapErrors,
  errorHandler
} = require('./utils/middleware/errorHandlers');
const isRequestAjaxOrApi = require('./utils/isRequestAjaxOrApi');
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
app.use('/api/auth', authApiRouter);

// Redireccionar al Home del sitio
app.get('/', function(req, res){
  res.redirect('/products')
})

app.use(function(req, res, next) {
  if (isRequestAjaxOrApi(req)) {
    const {
      output: { statusCode, payload }
    } = boom.notFound();

    res.status(statusCode).json(payload);
  }

  res.status(404).render('404');
});

app.use(logErrors);
app.use(clientErrorHandler);
app.use(wrapErrors);
app.use(errorHandler);

// Inicializar el servidor
const server = app.listen(3000, () => {
  console.log(`Listen to port ${server.address().port} !!`)
});
