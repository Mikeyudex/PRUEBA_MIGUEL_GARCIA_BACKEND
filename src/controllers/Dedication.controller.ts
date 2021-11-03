import DaoDedication from "../dao/Dedication.dao";
import VerifyToken from "../middlewares/verifyToken"
import ConsoleApp from "../utils/Console";
import BusinessDedication from "../business/Dedication.business";
import { v4 as uuidv4 } from 'uuid';

const daoDedication = new DaoDedication();
const verifyToken = new VerifyToken();
const consoleApp = new ConsoleApp();
const businessDedication = new BusinessDedication();

const path = require('path');
const fs = require('fs');
const csv = require('csvtojson');


export default class DedicationController {

    public async createDedication(req, res) {

        try {
            let { body } = req
            if (!body.projectId || body.projectId.length == 0 || !body.userId || body.userId.length == 0) {
                return res.status(500).send('Debe ingresar el id del proyecto y el id del usuario')
            }
            if (typeof (body.percentage) != 'number') {
                return res.status(500).send('El tipo de dato del porcentaje no es válido, debe ser de tipo int')
            }
            await verifyToken.verify(req.token)

            let responseBusiness: boolean = await businessDedication.validateWeek(body.userId, body.projectId);

            if (responseBusiness) {
                await daoDedication.createDedication(body)
                return res.status(200).send('Report Created!')
            } else {
                return res.status(401).json({ message: "Ya tienes un reporte creado para este proyecto, te esperamos la proxima semana!" })
            }

        } catch (error) {
            consoleApp.error(JSON.stringify(error))
            return res.status(500).json({ message: "Ha ocurrido un error interno" })
        }
    }

    public async getDedicationByUser(req, res) {

        try {
            let { username } = req.params
            await verifyToken.verify(req.token)
            let responseDao = await daoDedication.getDedicationByUser(username)
            return res.status(200).json({ Reports: responseDao })
        } catch (error) {
            consoleApp.error(JSON.stringify(error))
            return res.status(500).json({ message: "Ha ocurrido un error interno" })
        }

    }

    public async updateDedication(req, res) {

        try {
            let { id } = req.params
            let { percentage } = req.body
            if (typeof (percentage) != 'number') {
                return res.status(500).send('El tipo de dato del porcentaje no es válido, debe ser de tipo int')
            }
            await verifyToken.verify(req.token)

            let responseBusiness: boolean = await businessDedication.validateMonth(id);

            if (responseBusiness) {

                await daoDedication.updateDedication(id, percentage)
                return res.status(200).send('Report updated!');

            } else {
                return res.status(401).json({ message: "El reporte que deseas actualizar no es del mes actual." })
            }

        } catch (error) {
            consoleApp.error(JSON.stringify(error))
            return res.status(500).json({ message: "Ha ocurrido un error interno" })
        }

    }

    public async generateReportByUser(req, res) {

        try {
            let { id } = req.params
            let { startDate, finishDate } = req.body

            await verifyToken.verify(req.token);

            let responseDao = await businessDedication.generateReport(id, startDate, finishDate);

            return res.status(200).json({ UrlFile: responseDao })
        } catch (error) {
            consoleApp.error(JSON.stringify(error))
            return res.status(500).json({ message: "Ha ocurrido un error interno" })
        }

    }

    public async uploadReportByUser(req, res) {

        try {
            let { id } = req.params
            let fileBuffer = req.files.reporte
            let fileName:string = uuidv4() + "-" + req.files.reporte.name
            
            await verifyToken.verify(req.token);

            await businessDedication.uploadReport(id, fileBuffer, fileName);

            return res.status(200).json({ message: "File Uploaded succesfull" });
        } catch (error) {
            consoleApp.error(JSON.stringify(error))
            return res.status(500).json({ message: "Ha ocurrido un error interno" })
        }

    }

}