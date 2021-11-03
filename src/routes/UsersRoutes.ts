import express from 'express';
const router = express.Router();
const {createUser} = require('../controllers/UsersController')

/**
 * @swagger
 * components:
 *  schemas:
 *      Usuario:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: Nombre del usuario
 *          required:
 *              - name
 *              
 *          example:
 *              username: Miguel.garcia
 *              
 */




/**
 * @swagger 
 * /api/v1/users/create:
 *  post:
 *      summary: Crea un nuevo usuario en la base de datos.
 *      parameters:
 *                - in: body
 *                  name: body    
 *                  description: Body
 *                  schema:
 *                      $ref: '#/components/schemas/Usuario'
 *      responses: 
 *          200:
 *             description: Usuario creado correctamente.
 *             content: 
 *             application/json:
 */
router.post('/create', createUser);


module.exports = router;