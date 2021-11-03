const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser')
const CONFIG = require('../index.json')
const routerUsers = require('./routes/UsersRoutes')
const routerAuth = require('./routes/AuthLogin')
const routerProjects = require('./routes/Projects.routes')
const routerDedication = require('./routes/Dedication.routes')
const validaToken = require('./middlewares/validateToken')
const fileUpload = require('express-fileupload')
import ConsoleApp from './utils/Console';


let consoleApp = new ConsoleApp()

//Swagger
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const options = require('../swaggerOptions.js')


//Configurar swagger jsdoc
const specs = swaggerJsDoc(options)


app.use(bodyParser.json())
app.use(fileUpload({
    
}))


//Inicializa el servidor de express
let server = app.listen(process.env.PORT, () => {
    consoleApp.start(`Server on port ${process.env.PORT}`)
})


// Principal Route
app.get('/', (request:any, response:any) => {
    response.status(200).send(`${CONFIG.Appname} - Service Up
    ${new Date().toLocaleString()}`);
});

//Routes Users
app.use('/api/v1/users',validaToken, routerUsers);

//Routes Authorization
app.use('/api/v1/authorization', routerAuth);

//Routes Projects
app.use('/api/v1/projects',validaToken, routerProjects);

//Routes Dedication
app.use('/api/v1/dedications',validaToken, routerDedication);

//Routes Swagger API
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(specs));


module.exports = app;
