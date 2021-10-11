import mongoose from "mongoose";
import Users from '../models/Users'

const validateUser = async (username: string) => {
    return new Promise<void>(async (resolve, reject) => {

        try {
            let response = await Users.findOne({ username: username }).exec();
            
            if(response != null) {
                
                resolve()
            } else {
                reject("Lo sentimos no existe el usuario.")
            }
        } catch (error) {
            reject(error)
        }



    })

}

module.exports = validateUser;