import express from 'express';
import DedicationController from '../controllers/Dedication.controller';
const router = express.Router();

const dedicationController = new DedicationController()

/**
 * @swagger
 * components:
 *  schemas:
 *      Dedication:
 *          type: object
 *          properties:
 *              projectId:
 *                  type: string
 *                  description: Id del proyecto
 *              userId:
 *                  type: string
 *                  description: Id del usuario
 *              percentage:
 *                  type: number
 *                  description: Porcentaje de dedicación
 *          required:
 *              - projectId
 *              - userId
 *              - percentage
 *          example:
 *              projectId: e13e12c4-d565-4331-8dae-c4e0bf6f9d57  
 *              userId: e13e12c4-d565-4331-8dae-c4e0bf6f9d45
 *              percentage: 20  
 */


/**
 * @swagger 
 * /api/v1/dedications/create:
 *  post:
 *      summary: Crea un nuevo reporte de dedicación.
 *      parameters:
 *                - in: body
 *                  name: body    
 *                  description: Body
 *                  schema:
 *                      $ref: '#/components/schemas/Dedication'
 *      responses: 
 *          200:
 *             description: Report Created!
 *             content: 
 *             application/json:
 */
router.post('/create', dedicationController.createDedication);


/**
 * @swagger 
 * /api/v1/dedications/get-dedication/{username}:
 *  get:
 *      summary: Devuelve los reportes de dedicación de un usuario en especifico.
 *      responses: 
 *          200:
 *             description: Devuelve el objeto Dedications, con todos los reportes del usuario.
 *             content: 
 *             application/json:
 */
router.get('/get-dedication/:username', dedicationController.getDedicationByUser);


/**
 * @swagger 
 * /api/v1/dedications/update/{id}:
 *  put:
 *      summary: Actualizar un reporte de dedicación.
 *      responses: 
 *          200:
 *             description: Report updated!
 *             content: 
 *             application/json:
 */
 router.put('/update/:id', dedicationController.updateDedication);

 /**
 * @swagger 
 * /api/v1/generate-report/{id}:
 *  post:
 *      summary: Generar un reporte de dedicación.
 *      parameters:
 *                - in: body
 *                  name: body    
 *                  description: Body
 *                  schema:
 *                      $ref: '#/components/schemas/Dedication'
 *      responses: 
 *          200:
 *             description: Report Generated!
 *             content: 
 *             application/json:
 */
router.post('/generate-report/:id', dedicationController.generateReportByUser);

 /**
 * @swagger 
 * /api/v1/upload-report/{id}:
 *  post:
 *      summary: Sube un archivo con varios reportes de dedicación.
 *      parameters:
 *                - in: body
 *                  name: body    
 *                  description: Body
 *     
 *      responses: 
 *          200:
 *             description: Report Uploaded!
 *             content: 
 *             application/json:
 */
  router.post('/upload-report/:id', dedicationController.uploadReportByUser);

module.exports = router;