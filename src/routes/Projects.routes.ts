import express from 'express';
import ProjectsController from '../controllers/Projects.controller';
const router = express.Router();

const projectsController = new ProjectsController()

/**
 * @swagger
 * components:
 *  schemas:
 *      Projects:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: Nombre del usuario
 *          required:
 *              - name
 *          example:
 *              name: Proyecto 1     
 */


/**
 * @swagger 
 * /api/v1/projects/create:
 *  post:
 *      summary: Crea un nuevo proyecto en la base de datos.
 *      parameters:
 *                - in: body
 *                  name: body    
 *                  description: Body
 *                  schema:
 *                      $ref: '#/components/schemas/Projects'
 *      responses: 
 *          200:
 *             description: Project Created!
 *             content: 
 *             application/json:
 */
router.post('/create', projectsController.createProject);


/**
 * @swagger 
 * /api/v1/projects/getall:
 *  get:
 *      summary: Devuelve los proyectos de la empresa.
 *      responses: 
 *          200:
 *             description: Devuelve el objeto Projects, con todos los proyectos de la empresa!
 *             content: 
 *             application/json:
 */
router.get('/getAll', projectsController.getProjects);

module.exports = router;