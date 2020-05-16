const express = require('express');
const app = express();

const expressJSX = require('./express-jsx');

// registra el motor de plantillas, en este caso custom
// primer parámetro la extensión q queramos, segundo 1 callback
app.engine('jsx', expressJSX);
// como primer parámetro views ya q se trata de un engine
// EL segundo parámetro contiene la ruta donde ha de leer ese index pasado a render
app.set('views', './views');
app.set('view engine', 'jsx');

app.get('/', function(req, res) {
  res.render('index', {
    hello: 'hola',
    world: 'mundo genial'
  })
})

const server = app.listen(3000, () => {
  console.log(`Listen to port ${server.address().port}`)
})