import { DocumentClient } from "aws-sdk/clients/dynamodb";
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';
import ConsoleApp from "../utils/Console";

const docClient = new DocumentClient()
const consoleApp = new ConsoleApp();
const table:any = process.env.TABLEDYNAMOPROJECTS 



export default class DaoProjects {

    /** 
     * Crea un registro en la tabla project
     * @param {any} body
    */ 
    public async createProject(body:any) {

        return new Promise<void>(async (resolve, reject) => {
            let id_project = uuidv4();
            
            let params = {
                TableName: table,
                Item: {
                    "id_project": id_project,
                    "name": body.name,
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
     * Consulta todos los registros en la tabla project
    */ 
    public async getAllProjects() {

        return new Promise<void>(async (resolve:any, reject) => {
            
            
            let params = {
                TableName: table,
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