const jwt = require('jsonwebtoken');
const config = require('../../index.json');


export default class VerifyToken {


    /**
     * Verifica si el token es valido.
     * @param {string} token
    */  
    public verify(token:string) {
        
        return new Promise((resolve:any, reject:any) => {
          
            jwt.verify(token, config.SecretKey, (err:any, data:any) => {
                if (err) {
                    console.log(err)
                    reject()
                } else {
                    resolve()
                }
            });
        })

    }
}
