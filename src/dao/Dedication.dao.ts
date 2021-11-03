import { DocumentClient } from "aws-sdk/clients/dynamodb";
import moment, { Moment } from "moment";
import { v4 as uuidv4 } from 'uuid';
import ConsoleApp from "../utils/Console";

const _ = require('lodash');
const docClient = new DocumentClient()
const consoleApp = new ConsoleApp();
const table: any = process.env.TABLEDYNAMODEDICATION



export default class DaoDedication {
    /**
     * Crea un reporte de dedicación.
     * @param {object} body
    */  
    public async createDedication(body: any) {

        return new Promise<void>(async (resolve, reject) => {
            let id_dedication = uuidv4();

            let params = {
                TableName: table,
                Item: {
                    "id_dedication": id_dedication,
                    "projectId": body.projectId,
                    "userId": body.userId,
                    "percentage": body.percentage,
                    "creation_date": moment().format("DD/MM/YYYY HH:mm:ss")
                }
            }
            consoleApp.info(`Adding a new item in ${table}...`);

            docClient.put(params, (err, data) => {
                if (err) {
                    consoleApp.error(`No se pudo guardar el Item, Error: ${err}`);
                    reject();
                } else {
                    consoleApp.info("Item agregado con éxito:", JSON.stringify(data));
                    resolve();
                }
            })
        })

    }

    /**
     * obtiene un reporte de dedicación por el id del usuario.
     * @param {string} username
    */ 
    public async getDedicationByUser(username: string) {

        return new Promise<void>(async (resolve: any, reject) => {

            let params = {
                TableName: table

            }
            consoleApp.info(`Scan in table ${table}...`);

            docClient.scan(params, (err, data) => {
                if (err) {
                    consoleApp.error(`Ocurrió un error al realizar Scan, Error: ${err}`);
                    reject();
                } else {
                    consoleApp.info("Scan Succesfull");
                    let filterData: [] = _.filter(data.Items, { "userId": username });
                    resolve(filterData);
                }
            })
        })

    }

    /**
     * Actualiza un reporte de dedicación por el id del usuario.
     * @param {string} username
     * @param {number} percentage
    */ 
    public async updateDedication(id: string, percentage: number) {

        return new Promise<void>(async (resolve, reject) => {


            let params = {
                TableName: table,
                Key: {
                    "id_dedication": id
                },
                UpdateExpression: "set percentage = :r",
                ExpressionAttributeValues: {
                    ":r": percentage
                },
                ReturnValues: "UPDATED_NEW"
            }
            consoleApp.info(`Update item in ${table}...`);

            docClient.update(params, (err, data) => {
                if (err) {
                    consoleApp.error(`No se pudo actualizar el Item, Error: ${err}`);
                    reject();
                } else {
                    consoleApp.info("Item actualizado con éxito:", JSON.stringify(data));
                    resolve();
                }
            })
        })

    }

     /**
     * Consulta la tabla Dedication por id de usuario.
     * @param {string} id
    */ 
    public async getDateCreationReport(id: string) {

        return new Promise<[]>(async (resolve: any, reject) => {

            let params = {
                TableName: table,
                KeyConditionExpression: "#id = :i",
                ExpressionAttributeNames: {
                    "#id": "id_dedication"
                },
                ExpressionAttributeValues: {
                    ":i": id
                }
            }
            consoleApp.info(`Query in table ${table}...`);

            docClient.query(params, (err, data) => {
                if (err) {
                    consoleApp.error(`No se pudo Consultar la tabla, Error: ${err}`);
                    reject();
                } else {
                    consoleApp.info("query Succesfull");
                    resolve(data.Items)
                    
                }
            })
        })

    }


    /** 
     * Consulta todos los reportes de dedicación por id de usuario.
     * @param {string} userId
    */ 
    public async getReportsByUser(userId:string) {

        return new Promise<[]>(async (resolve: any, reject) => {

            let params = {
                TableName: table,
                FilterExpression: "userId = :val",
                ExpressionAttributeValues: {
                    ":val":userId
                } 
                
            }
            consoleApp.info(`Scanning table ${table}...`);

            docClient.scan(params, (err, data) => {
                if (err) {
                    consoleApp.error(`No se pudo Scannear la tabla, Error: ${err}`);
                    reject();
                } else {
                    consoleApp.info("Scan Succesfull");
                    resolve(data.Items);
                }
            })
        })

    }

    /** 
     * Consulta todos los reportes de dedicación por id de usuario, entre dos fechas establecidas por el cliente.
     * @param {string} userId
     * @param {string} startDate
     * @param {string} finishDate
    */ 
    public async getReportsByDate(userId:string, startDate:string, finishDate:string) {

        return new Promise<[]>(async (resolve: any, reject) => {

            let params = {
                TableName: table,
                FilterExpression: "userId = :val and creation_date between :date1 and :date2",
                ExpressionAttributeValues: {
                    ":val":userId,
                    ":date1":startDate,
                    ":date2":finishDate
                } 
                
            }
            consoleApp.info(`Scanning table ${table}...`);

            docClient.scan(params, (err, data) => {
                if (err) {
                    consoleApp.error(`No se pudo Scannear la tabla, Error: ${err}`);
                    reject();
                } else {
                    consoleApp.info("Scan Succesfull");
                    resolve(data.Items);
                }
            })
        })

    }


}