import {Router} from 'express';
const AuthLogin = require('../controllers/AuthLoginController');


const router = Router();
/**
 * @swagger
 * components:
 *  schemas:
 *      Login:
 *          type: object
 *          properties:
 *              username:
 *                  type: string
 *                  description: Nombre del usuario
 *          required:
 *              - username
 *          example:
 *              username: Miguel.garcia
 */


/**
 * @swagger 
 * /api/v1/authorization/login:
 *  post:
 *      summary: Inicia sesión con un nombre de usuario, el servidor devolvera un token si el usuario existe en la base de datos
 *      parameters:
 *                - in: body
 *                  name: body    
 *                  description: Body
 *                  schema:
 *                      $ref: '#/components/schemas/Login'
 *      responses: 
 *          200:
 *             description: Autenticación correcta
 *             content: 
 *             application/json:
 */
router.post('/login', AuthLogin)

module.exports = router;