const AWS = require('aws-sdk')
import moment from 'moment'


AWS.config.update({
    region: "us-east-1"
});

let table = process.env.TABLEDYNAMO

const docClient = new AWS.DynamoDB.DocumentClient();


export default class DaoUsers {

    /** 
     * obtiene un usuario por el id
     * @param {string} username
    */ 
    public async getUserByUsername(username: string) {

        return new Promise<void>(async (resolve, reject) => {
            
            let params = {
                Key: {
                    "username": `${username}`
                        
                },
                TableName: table 
            }

            docClient.get(params, (err, data) => {
                if (err) {
                    console.error(`No se encontró el registro: ${username} , Error: `, JSON.stringify(err));
                    reject();
                } else {
                    console.log("Búsqueda realizada con éxito:");
                    resolve(data.Item);
                }
            })
            
        })
    }

  /** 
     * Crea un usuario en la tabla users
     * @param {any} user
    */ 
    public async createUser(user:any) {

        return new Promise<void>(async (resolve, reject) => {
            
            let params = {
                TableName: table,
                Item: {
                    "username": user.username,
                    "active": true,
                    "creation_date": moment().format("DD/MM/YYYY HH:mm:ss")
                }
            }
    
            console.log(`Adding a new item in ${table}...`);
    
            docClient.put(params, (err, data) => {
                if (err) {
                    console.error('No se pudo guardar el Item, Error: ', JSON.stringify(err));
                    reject();
                } else {
                    console.log("Item agregado con éxito:", JSON.stringify(data));
                    resolve();
                }
            })

            
            
        })
    }


}



