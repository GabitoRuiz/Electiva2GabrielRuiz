const express = require('express')
const bodyParser = require('body-parser');
const app = express()

// Middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(bodyParser.json());

app.use('/api/v1', require("./routers/taskRouter"))

app.listen(3000, ()=> {
  console.log('server running')
});
