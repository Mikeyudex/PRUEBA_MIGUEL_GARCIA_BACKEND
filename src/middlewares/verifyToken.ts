const jwt = require('jsonwebtoken');
const config = require('../../index.json');

class VerifyToken {

    public verify(token:string) {

        return new Promise((resolve:any, reject:any) => {
          
            jwt.verify(token, config.SecretKey, (err:any, data:any) => {
                if (err) {
                    reject()
                } else {
                    resolve()
                }
            });
        })

    }
}

module.exports = VerifyToken;