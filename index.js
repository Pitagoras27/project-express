const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send({ hello: 'world' })
})

const server = app.listen(3000, () => {
  console.log(`Listen to port ${server.address().port} !!`)
})