const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser')
const CONFIG = require('../index.json')
const routerUsers = require('./routes/UsersRoutes')
const routerAuth = require('./routes/AuthLogin')
const routerMqtt = require('./routes/MqttService')
const validaToken = require('./middlewares/validateToken')
const db = require('./connectors/mongodb')

import ConsoleApp from './utils/Console';

//Swagger
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const options = require('../swaggerOptions.js')


//Configurar swagger jsdoc
const specs = swaggerJsDoc(options)


app.use(bodyParser.json())



//Inicializa el servidor de express
let server = app.listen(process.env.PORT, () => {
    ConsoleApp.start(`Server on port ${process.env.PORT}`)
})

//Inicializa la conexión a la base de datos
db();

//Routes
app.get('/', (request:any, response:any) => {
    response.status(200).send(`${CONFIG.Appname} - Service Up
    ${new Date().toLocaleString()}`);
});

//Routes Users
app.use('/api/v1/users',validaToken, routerUsers);

//Routes Authorization
app.use('/api/v1/authorization', routerAuth)

//Routes Authorization
app.use('/mqtt',validaToken, routerMqtt)

//Routes Swagger API
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(specs));


module.exports = app;
