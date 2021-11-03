import { Request, Response } from "express"
import DaoProjects from "../dao/Projects.dao"
import VerifyToken from "../middlewares/verifyToken"
import ConsoleApp from "../utils/Console";

const daoProjects = new DaoProjects();
const verifyToken = new VerifyToken();
const consoleApp = new ConsoleApp();

export default class ProjectsController {

    public async createProject(req, res) {

        try {
            let { body } = req
            if (!body.name || body.name.length == 0) {
                return res.status(500).send('Debe ingresar el nombre del proyecto')
            }
            await verifyToken.verify(req.token)
            await daoProjects.createProject(body)
            return res.status(200).send('Project Created!')

        } catch (error) {
            consoleApp.error(JSON.stringify(error))
            return res.status(500).json({ message: "Ha ocurrido un error interno" })
        }


    }

    public async getProjects(req, res) {

        try {
            await verifyToken.verify(req.token)
            let responseDao = await daoProjects.getAllProjects()
            return res.status(200).json({projects:responseDao})
        } catch (error) {
            consoleApp.error(JSON.stringify(error))
            return res.status(500).json({ message: "Ha ocurrido un error interno" })
        }

    }

}