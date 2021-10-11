import express from 'express';
const router = express.Router();
const sendMessage = require('../controllers/MqttController')

/**
 * @swagger
 * components:
 *  schemas:
 *      Message:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *                  description: Cuerpo del mensaje
 *              
 *              user:
 *                  type: string
 *                  description: Id de usuario
 *          required:
 *              - message
 *              - user
 *          example:
 *              message: Hola desde Postman
 *              user: 6163738e667f0ba07be664f3
 */



//Route post message
/**
 * @swagger 
 * /mqtt/messages/send:
 *  post:
 *      summary: Enviar mensajes mediante el protocolo MQTT.
 *      parameters:
 *                - in: body
 *                  name: body
 *                  description: Body  
 *                  schema: 
 *                      $ref: '#/components/schemas/Message'
 *                          
 *      responses: 
 *        200:
 *           description: Mensaje enviado
 *        500: 
 *           description: Ha ocurrido un error al enviar el mensaje
 */
router.post('/messages/send', sendMessage)

module.exports = router;