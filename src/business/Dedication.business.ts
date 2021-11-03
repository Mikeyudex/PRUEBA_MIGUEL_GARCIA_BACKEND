import moment from "moment";
import DaoDedication from "../dao/Dedication.dao"
import ConsoleApp from "../utils/Console";
import { S3 } from "aws-sdk";


const fs = require('fs/promises')
const ObjectsToCsv = require('objects-to-csv');
const path = require('path');
const csv = require('csvtojson');


const daoDedication = new DaoDedication();
const consoleApp = new ConsoleApp();
const s3 = new S3({
    region: "us-east-1"
});


const BUCKET: any = process.env.BUCKETNAME

export default class BusinessDedication {

    /** 
     * Valida si el usuario edita el reporte dentro del mismo mes calendario
     * @param {string} id
    */ 
    public async validateMonth(id: string) {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                let monthNow: number = moment().month()

                let item: any = await daoDedication.getDateCreationReport(id);

                let creationDate: string = item[0].creation_date
                let monthCreation: number = moment(creationDate, "DD/MM/YYYY HH:mm:ss").month();
                if (monthNow == monthCreation) {
                    resolve(true)
                } else {
                    resolve(false)
                }

            } catch (error) {
                consoleApp.error(JSON.stringify(error))
                reject()
            }

        })
    }

    /** 
     * Valida si un usuario no debe poder reportar dos veces la misma semana-proyecto.
     * @param {string} userId
     * @param {string} projectId
    */ 
    public async validateWeek(userId: string, projectId: string) {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                let weekNow: number = moment().isoWeeks();
                let weekReceived: number;
                let responseDao: any = await daoDedication.getReportsByUser(userId);
                responseDao.forEach(element => {
                    weekReceived = moment(element.creation_date, "DD/MM/YYYY HH:mm:ss").isoWeeks()
                    if (weekNow == weekReceived && projectId == element.projectId) {
                        resolve(false)
                    }
                });

                resolve(true)

            } catch (error) {
                consoleApp.error(JSON.stringify(error))
                reject()
            }

        })
    }

    /** 
     * Genera reporte de dedicacion en formato csv, se sube el archivo a s3
     * @param {string} userId
     * @param {string} startDate
     * @param {string} finishDate
    */ 
    public async generateReport(userId: string, startDate: string, finishDate: string) {
        return new Promise<string>(async (resolve, reject) => {
            try {
                let date = moment().format("DDMMYYYYHHmmss")
                let responseDao = await daoDedication.getReportsByDate(userId, startDate, finishDate)
                
                const csv = new ObjectsToCsv(responseDao)

                let route: string = __dirname + "/"
                let fileName: string = "report-" + date + "-" + userId + ".csv"
                consoleApp.info(`Generando Archivo de reporte en : ${route + fileName}`)
                await csv.toDisk(route + fileName)
                let urlFile: string = await this.sendS3(route + fileName, fileName)
                resolve(urlFile)

            } catch (error) {
                consoleApp.error(JSON.stringify(error))
                reject()
            }

        })
    }

    /** 
     * Envia el archivo generado a S3
     * @param {string} filePath
     * @param {string} fileName
    */ 
    private async sendS3(filePath: string, fileName: string) {
        return new Promise<string>(async (resolve, reject) => {

            try {
                let fileContent: any = await fs.readFile(filePath, 'utf8');
                let params = {
                    Bucket: BUCKET,
                    Key: `${fileName}`,
                    Body: fileContent,
                    ACL: 'public-read'
                }

                s3.upload(params, (err, data) => {
                    if (err) {
                        consoleApp.error(JSON.stringify(err))
                        reject()
                    }
                    console.log(data.Location)
                 
                    resolve(data.Location)
                })
            } catch (error) {
                consoleApp.error(JSON.stringify(error))
                reject()
            }
        })

    }

    /** 
     * Crea los reportes de dedicación que se suben por archivo csv
     * @param {string} userId
     * @param {any} fileBuffer
     * @param {string} fileName
    */ 
    public async uploadReport(userId: string, fileBuffer:any, fileName:string) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                let filePath:string = path.join(__dirname, fileName);

                await fileBuffer.mv(filePath)
                let jsonArray:[] = await csv().fromFile(filePath);

                consoleApp.start('Iniciando creación de reportes...')
                
                jsonArray.forEach(async(body:object) => {
                    let user = {
                        userId: userId
                    }
                    let newBody = {
                        ...user,
                        ...body
                    }
                    await daoDedication.createDedication(newBody)
                });
                consoleApp.end('Reportes Guardados correctamente...')
                
                await fs.unlink(filePath);

                resolve()

            } catch (error) {
                consoleApp.error(JSON.stringify(error))
                reject()
            }

        })
    }




}