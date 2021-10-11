import express from 'express';
const router = express.Router();
const {createUser, updateUser, deleteUser, activeUser, getUser} = require('../controllers/UsersController')

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
 *              
 *              active:
 *                  type: boolean
 *                  description: Estado del usuario
 *          required:
 *              - name
 *              - active
 *          example:
 *              username: Miguel.garcia
 *              active: false
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

//Route update user
/**
 * @swagger 
 * /api/v1/users/put/{id}:
 *  put:
 *      summary: Actualiza la info de un usuario.
 *      parameters:
 *                - in: body
 *                  name: username    
 *                  description: username
 *                - in: path
 *                  name: id
 *                  description: id del usuario
 *                  
 *      responses: 
 *          200:
 *             description: Usuario actualizado correctamente.
 *             content: 
 *             application/json:
 */
router.put('/put/:id', updateUser);

//Route delete user
/**
 * @swagger 
 * /api/v1/users/delete/{id}:
 *  delete:
 *      summary: elimina el registro de un usuario.
 *      parameters:
 *                - in: path
 *                  name: id
 *                  description: id del usuario
 *      responses: 
 *        200:
 *           description: Usuario eliminado correctamente.
 *           content: 
 *           application/json:
 */
router.delete('/delete/:id', deleteUser);

//Route patch user
/**
 * @swagger 
 * /api/v1/users/active/{id}:
 *  patch:
 *      summary: Cambia el estado del usuario en activo.
 *      parameters:
 *                - in: path
 *                  name: id
 *                  description: ID de usuario
 *                
 *              
 *      responses: 
 *        200:
 *           description: Usuario activado correctamente.
 *           content: 
 *           application/json:
 */
router.patch('/active/:id', activeUser);

module.exports = router;